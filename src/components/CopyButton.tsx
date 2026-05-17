"use client";
// ============================================================
// src/components/CopyButton.tsx
// Button that copies text to clipboard with feedback
// ============================================================

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;         // Text to copy
  label?: string;       // Button label
  className?: string;
}

export default function CopyButton({ text, label = "Copy Report", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      // navigator.clipboard is the browser API for copying text
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono font-medium",
        "transition-all duration-200",
        copied
          ? "border-verify/40 text-verify bg-verify/10"
          : "border-border text-ghost hover:border-signal/30 hover:text-pale hover:bg-signal/5",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          {label}
        </>
      )}
    </button>
  );
}
