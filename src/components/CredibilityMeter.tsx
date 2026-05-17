"use client";
// ============================================================
// src/components/CredibilityMeter.tsx
// Animated circular and bar meter showing credibility score
// ============================================================

import { useEffect, useState } from "react";
import { cn, getScoreColor } from "@/lib/utils";

interface CredibilityMeterProps {
  score: number; // 0-100
  explanation?: string;
}

export default function CredibilityMeter({ score, explanation }: CredibilityMeterProps) {
  // We animate from 0 to the actual score on mount
  const [displayScore, setDisplayScore] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    // Wait a tick before animating (so the animation is visible)
    const timeout = setTimeout(() => {
      setFilled(true);
      // Count up animation
      let current = 0;
      const increment = score / 60; // 60 steps
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 16); // ~60fps
    }, 300);

    return () => clearTimeout(timeout);
  }, [score]);

  // Determine color based on score
  const barColor = score >= 70 ? "#00ff88" : score >= 40 ? "#ffb800" : "#ff3d3d";
  const textColor = getScoreColor(score);

  // Labels for the score ranges
  const label =
    score >= 80 ? "HIGH CREDIBILITY" :
    score >= 60 ? "MODERATE CREDIBILITY" :
    score >= 40 ? "MIXED SIGNALS" :
    score >= 20 ? "LOW CREDIBILITY" :
    "VERY LOW CREDIBILITY";

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-dim uppercase tracking-widest">
          Credibility Score
        </span>
        <span className={cn("font-mono text-xs font-bold tracking-wider", textColor)}>
          {label}
        </span>
      </div>

      {/* Score Display + Bar */}
      <div className="flex items-center gap-4">
        {/* Big Number */}
        <div className={cn("font-display font-black text-4xl w-16 shrink-0", textColor)}>
          {displayScore}
          <span className="text-lg text-dim font-normal">/100</span>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 space-y-1">
          {/* Bar track */}
          <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
            {/* Filled portion — width animates via CSS transition */}
            <div
              className="h-full rounded-full transition-all duration-1500 ease-out relative"
              style={{
                width: filled ? `${score}%` : "0%",
                backgroundColor: barColor,
                boxShadow: filled ? `0 0 10px ${barColor}80` : "none",
                transition: "width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Shimmer effect on the bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* Scale markers */}
          <div className="flex justify-between">
            {[0, 25, 50, 75, 100].map((n) => (
              <span key={n} className="font-mono text-[9px] text-dim">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation text */}
      {explanation && (
        <p className="text-xs text-ghost leading-relaxed border-l-2 border-signal/30 pl-3">
          {explanation}
        </p>
      )}
    </div>
  );
}
