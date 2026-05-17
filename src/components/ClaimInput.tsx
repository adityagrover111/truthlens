"use client";
// ============================================================
// src/components/ClaimInput.tsx
// The main input where users enter claims to investigate
// ============================================================

import { useState } from "react";
import { Search, Crosshair, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Example claims the user can click to pre-fill the input
const EXAMPLE_CLAIMS = [
  "The Great Wall of China is visible from space",
  "Eating carrots improves your night vision",
  "We only use 10% of our brains",
  "Napoleon Bonaparte was unusually short",
  "Lightning never strikes the same place twice",
  "Humans have only 5 senses",
];

interface ClaimInputProps {
  onSubmit: (claim: string) => void;
  isLoading: boolean;
}

export default function ClaimInput({ onSubmit, isLoading }: ClaimInputProps) {
  const [claim, setClaim] = useState("");

  // Handle form submission
  function handleSubmit() {
    const trimmed = claim.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  }

  // Allow submitting with Ctrl+Enter or Cmd+Enter
  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="space-y-4">
      {/* Textarea container */}
      <div className="relative corner-accent">
        <div className="glass rounded-lg overflow-hidden border border-border hover:border-signal/30 transition-colors focus-within:border-signal/50 focus-within:shadow-signal">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-panel/50">
            <div className="w-2 h-2 rounded-full bg-threat/60" />
            <div className="w-2 h-2 rounded-full bg-caution/60" />
            <div className="w-2 h-2 rounded-full bg-verify/60" />
            <span className="font-mono text-[10px] text-dim ml-2 tracking-widest uppercase">
              Evidence Input — Case File
            </span>
          </div>

          {/* Textarea */}
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter the claim, tweet, article snippet, or rumor you want to investigate..."
            disabled={isLoading}
            maxLength={5000}
            rows={4}
            className={cn(
              "w-full bg-transparent px-4 py-3 text-sm text-pale placeholder:text-dim",
              "resize-none outline-none font-body leading-relaxed",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-panel/30">
            <span className="font-mono text-[10px] text-dim">
              {claim.length}/5000 chars · ⌘+Enter to submit
            </span>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!claim.trim() || isLoading}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider",
                "transition-all duration-200",
                claim.trim() && !isLoading
                  ? "bg-signal text-void hover:bg-signal/90 shadow-signal"
                  : "bg-muted text-dim cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-3 h-3 border border-void/50 border-t-void rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Crosshair className="w-3 h-3" />
                  Open Case
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Example claims */}
      <div className="space-y-2">
        <p className="font-mono text-[10px] text-dim uppercase tracking-widest flex items-center gap-2">
          <Search className="w-3 h-3" />
          Example claims — click to investigate
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_CLAIMS.map((example) => (
            <button
              key={example}
              onClick={() => setClaim(example)}
              disabled={isLoading}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded border text-xs",
                "border-border text-ghost hover:border-signal/30 hover:text-pale hover:bg-signal/5",
                "transition-all duration-150 font-body disabled:opacity-50"
              )}
            >
              <ChevronRight className="w-3 h-3 shrink-0" />
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
