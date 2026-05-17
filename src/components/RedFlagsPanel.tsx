// ============================================================
// src/components/RedFlagsPanel.tsx
// Shows warning signs and missing context
// ============================================================

import { AlertTriangle, Eye } from "lucide-react";

interface RedFlagsPanelProps {
  redFlags: string[];
  missingContext: string[];
}

export default function RedFlagsPanel({ redFlags, missingContext }: RedFlagsPanelProps) {
  const hasFlags = redFlags.length > 0;
  const hasContext = missingContext.length > 0;

  if (!hasFlags && !hasContext) return null;

  return (
    <div className="space-y-3">
      {/* Red Flags */}
      {hasFlags && (
        <div className="rounded border border-threat/30 bg-threat/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-threat/20 bg-threat/10">
            <AlertTriangle className="w-3.5 h-3.5 text-threat" />
            <span className="font-mono text-xs font-bold text-threat tracking-widest uppercase">
              Risk Signals ({redFlags.length})
            </span>
          </div>
          {/* Items */}
          <ul className="divide-y divide-threat/10">
            {redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-2.5">
                <span className="font-mono text-[10px] text-threat/60 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-pale/90 leading-relaxed">{flag}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Context */}
      {hasContext && (
        <div className="rounded border border-caution/30 bg-caution/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-caution/20 bg-caution/10">
            <Eye className="w-3.5 h-3.5 text-caution" />
            <span className="font-mono text-xs font-bold text-caution tracking-widest uppercase">
              Missing Context ({missingContext.length})
            </span>
          </div>
          <ul className="divide-y divide-caution/10">
            {missingContext.map((ctx, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-2.5">
                <span className="font-mono text-[10px] text-caution/60 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-pale/90 leading-relaxed">{ctx}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
