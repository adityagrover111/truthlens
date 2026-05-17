// ============================================================
// src/components/EvidenceCard.tsx
// Displays a single piece of evidence (for or against)
// ============================================================

import { TrendingUp, TrendingDown, Shield, Newspaper, GraduationCap, MessageSquare, HelpCircle } from "lucide-react";
import { cn, getSourceTypeColor } from "@/lib/utils";
import { type EvidenceItem } from "@/types/investigation";

interface EvidenceCardProps {
  evidence: EvidenceItem;
  type: "supporting" | "contradicting";
  index: number;
}

// Icon for each source type
function SourceIcon({ sourceType }: { sourceType: string }) {
  const cls = "w-3 h-3";
  switch (sourceType) {
    case "Official":  return <Shield className={cls} />;
    case "News":      return <Newspaper className={cls} />;
    case "Academic":  return <GraduationCap className={cls} />;
    case "Social":    return <MessageSquare className={cls} />;
    default:          return <HelpCircle className={cls} />;
  }
}

export default function EvidenceCard({ evidence, type, index }: EvidenceCardProps) {
  const isSupporting = type === "supporting";

  return (
    <div
      className={cn(
        "evidence-card p-3 rounded border bg-panel/40 relative overflow-hidden",
        isSupporting
          ? "border-verify/20 hover:border-verify/40"
          : "border-threat/20 hover:border-threat/40"
      )}
    >
      {/* Left accent line */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-0.5",
          isSupporting ? "bg-verify/60" : "bg-threat/60"
        )}
      />

      <div className="pl-3 space-y-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          {/* Index + type indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "font-mono text-[10px] font-bold",
                isSupporting ? "text-verify" : "text-threat"
              )}
            >
              {isSupporting ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            </span>
            <span className="font-mono text-[10px] text-dim">
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Source type badge */}
          <span
            className={cn(
              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-mono font-medium",
              getSourceTypeColor(evidence.sourceType)
            )}
          >
            <SourceIcon sourceType={evidence.sourceType} />
            {evidence.sourceType}
          </span>
        </div>

        {/* Evidence text */}
        <p className="text-sm text-pale leading-relaxed">{evidence.point}</p>

        {/* Reliability score */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-dim">SOURCE RELIABILITY</span>
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                evidence.reliability >= 70 ? "bg-verify" :
                evidence.reliability >= 40 ? "bg-caution" : "bg-threat"
              )}
              style={{ width: `${evidence.reliability}%` }}
            />
          </div>
          <span
            className={cn(
              "font-mono text-[10px] font-bold",
              evidence.reliability >= 70 ? "text-verify" :
              evidence.reliability >= 40 ? "text-caution" : "text-threat"
            )}
          >
            {evidence.reliability}%
          </span>
        </div>
      </div>
    </div>
  );
}
