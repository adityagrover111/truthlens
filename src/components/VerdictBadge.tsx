// ============================================================
// src/components/VerdictBadge.tsx
// Displays the verdict as a colored badge
// ============================================================

import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import { cn, getVerdictClasses, getVerdictEmoji } from "@/lib/utils";
import { type Verdict } from "@/types/investigation";

interface VerdictBadgeProps {
  verdict: Verdict;
  size?: "sm" | "md" | "lg";
}

// Maps verdict to its icon component
function VerdictIcon({ verdict, className }: { verdict: Verdict; className?: string }) {
  const props = { className };
  switch (verdict) {
    case "Trustworthy": return <CheckCircle2 {...props} />;
    case "Unclear":     return <HelpCircle {...props} />;
    case "Misleading":  return <AlertTriangle {...props} />;
    case "False":       return <XCircle {...props} />;
  }
}

export default function VerdictBadge({ verdict, size = "md" }: VerdictBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-2 gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border font-display font-bold tracking-wider uppercase",
        getVerdictClasses(verdict),
        sizeClasses[size]
      )}
    >
      <VerdictIcon verdict={verdict} className={iconSizes[size]} />
      {verdict}
    </span>
  );
}
