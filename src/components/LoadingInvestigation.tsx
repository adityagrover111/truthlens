"use client";
// ============================================================
// src/components/LoadingInvestigation.tsx
// Animated loading state shown while AI is processing
// ============================================================

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

// Steps that cycle through while loading — makes it feel alive
const SCAN_STEPS = [
  "Initializing case file...",
  "Extracting factual claims...",
  "Scanning evidence database...",
  "Cross-referencing sources...",
  "Analyzing contradictions...",
  "Detecting risk signals...",
  "Calculating credibility score...",
  "Compiling dossier...",
];

export default function LoadingInvestigation() {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState("");

  // Cycle through steps every 1.2 seconds
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SCAN_STEPS.length);
    }, 1200);

    // Animate dots: . .. ...
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      {/* Animated scanner */}
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-signal/20 animate-ping" />
        {/* Middle ring */}
        <div className="absolute inset-4 rounded-full border border-signal/30 animate-pulse" />
        {/* Inner circle */}
        <div className="absolute inset-8 rounded-full bg-signal/5 border border-signal/40 flex items-center justify-center">
          <Shield className="w-8 h-8 text-signal animate-pulse" />
        </div>
        {/* Rotating scan line */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-signal/60"
          style={{ animation: "spin 1.5s linear infinite" }}
        />
      </div>

      {/* Status text */}
      <div className="text-center space-y-2">
        <p className="font-mono text-sm text-signal">
          RUNNING INVESTIGATION{dots}
        </p>
        <p className="font-mono text-xs text-ghost animate-pulse">
          {SCAN_STEPS[stepIndex]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-0.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-signal rounded-full"
          style={{
            animation: "indeterminate 2s ease-in-out infinite",
            background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
          }}
        />
      </div>

      {/* Case file lines — decorative */}
      <div className="space-y-1.5 w-48 opacity-30">
        {[80, 60, 90, 50, 70].map((w, i) => (
          <div
            key={i}
            className="h-1.5 bg-signal/40 rounded-full"
            style={{
              width: `${w}%`,
              animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Inline keyframe for the indeterminate bar */}
      <style jsx>{`
        @keyframes indeterminate {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
