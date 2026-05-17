"use client";
// ============================================================
// src/components/HistoryPanel.tsx
// Shows all saved investigations from localStorage
// ============================================================

import { useState, useEffect } from "react";
import { Trash2, ExternalLink, Search, Clock, Inbox } from "lucide-react";
import { type SavedInvestigation } from "@/types/investigation";
import { loadInvestigations, deleteInvestigation } from "@/lib/storage";
import { formatTimestamp, truncate } from "@/lib/utils";
import VerdictBadge from "./VerdictBadge";

export default function HistoryPanel() {
  const [investigations, setInvestigations] = useState<SavedInvestigation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Load investigations when component mounts
  // We check `mounted` to avoid hydration mismatch (server vs browser)
  useEffect(() => {
    setMounted(true);
    setInvestigations(loadInvestigations());
  }, []);

  // Delete a single investigation
  function handleDelete(id: string) {
    deleteInvestigation(id);
    setInvestigations(loadInvestigations()); // Reload from storage
  }

  // Filter by search query
  const filtered = investigations.filter((inv) =>
    inv.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.report.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.report.verdict.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return null; // Prevent server/client mismatch

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search case history..."
          className="w-full glass rounded-lg border border-border pl-9 pr-4 py-2.5 text-sm text-pale
                     placeholder:text-dim outline-none focus:border-signal/40 transition-colors font-body"
        />
      </div>

      {/* Count */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-dim">
          {filtered.length} {filtered.length === 1 ? "case" : "cases"} found
        </span>
        {investigations.length > 0 && (
          <span className="font-mono text-xs text-dim">
            {investigations.length} total saved
          </span>
        )}
      </div>

      {/* Empty state */}
      {investigations.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <Inbox className="w-12 h-12 text-dim mx-auto" />
          <p className="font-display font-bold text-ghost">No cases on record</p>
          <p className="text-sm text-dim">
            Run an investigation and save it to build your case history.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded border border-signal/30
                       text-signal text-sm font-mono hover:bg-signal/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open New Case
          </a>
        </div>
      )}

      {/* No results after filtering */}
      {investigations.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <Search className="w-8 h-8 text-dim mx-auto" />
          <p className="text-sm text-ghost">No cases match your search.</p>
        </div>
      )}

      {/* Investigation cards */}
      <div className="space-y-3">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            className="glass rounded-xl border border-border p-4 hover:border-signal/20 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] text-signal/60 bg-signal/10 border border-signal/20 px-1.5 py-0.5 rounded">
                  {inv.id}
                </span>
                <VerdictBadge verdict={inv.report.verdict} size="sm" />
              </div>
              <button
                onClick={() => handleDelete(inv.id)}
                className="p-1 rounded text-dim hover:text-threat hover:bg-threat/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete case"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Case title */}
            <h3 className="font-display font-bold text-sm text-bright mb-1">
              {inv.report.caseTitle}
            </h3>

            {/* Original claim */}
            <p className="text-xs text-ghost leading-relaxed mb-3">
              &ldquo;{truncate(inv.claim, 120)}&rdquo;
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-dim font-mono">
                <Clock className="w-3 h-3" />
                {formatTimestamp(inv.timestamp)}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-dim">
                  Score: <span className="text-ghost">{inv.report.credibilityScore}/100</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
