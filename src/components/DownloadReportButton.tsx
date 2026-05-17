"use client";
// ============================================================
// src/components/DownloadReportButton.tsx
// Downloads the investigation report as a .txt file
// ============================================================

import { Download } from "lucide-react";
import { type InvestigationReport } from "@/types/investigation";
import { getVerdictEmoji } from "@/lib/utils";

interface DownloadReportButtonProps {
  report: InvestigationReport;
  claim: string;
  caseId: string;
}

export default function DownloadReportButton({ report, claim, caseId }: DownloadReportButtonProps) {

  function handleDownload() {
    // Build the report as a plain text string
    const lines = [
      "================================================================",
      "  TRUTHLENS — CREDIBILITY INVESTIGATION REPORT",
      "================================================================",
      `Case ID:  ${caseId}`,
      `Date:     ${new Date().toLocaleString()}`,
      `Verdict:  ${getVerdictEmoji(report.verdict)} ${report.verdict.toUpperCase()}`,
      `Score:    ${report.credibilityScore}/100`,
      "================================================================",
      "",
      "ORIGINAL CLAIM:",
      `"${claim}"`,
      "",
      "CASE TITLE:",
      report.caseTitle,
      "",
      "SUMMARY:",
      report.summary,
      "",
      "CONFIDENCE EXPLANATION:",
      report.confidenceExplanation,
      "",
      "================================================================",
      "EXTRACTED CLAIMS:",
      "================================================================",
      ...report.extractedClaims.map((c, i) => `  ${i + 1}. ${c}`),
      "",
      "================================================================",
      "SUPPORTING EVIDENCE:",
      "================================================================",
      ...report.supportingEvidence.map((e, i) =>
        `  ${i + 1}. [${e.sourceType} | ${e.reliability}% reliable]\n     ${e.point}`
      ),
      "",
      "================================================================",
      "CONTRADICTING EVIDENCE:",
      "================================================================",
      ...report.contradictingEvidence.map((e, i) =>
        `  ${i + 1}. [${e.sourceType} | ${e.reliability}% reliable]\n     ${e.point}`
      ),
      "",
      "================================================================",
      "RISK SIGNALS:",
      "================================================================",
      ...report.redFlags.map((f, i) => `  ⚠ ${i + 1}. ${f}`),
      "",
      "================================================================",
      "MISSING CONTEXT:",
      "================================================================",
      ...report.missingContext.map((c, i) => `  • ${i + 1}. ${c}`),
      "",
      "================================================================",
      "SUGGESTED VERIFICATION SEARCHES:",
      "================================================================",
      ...report.suggestedSearchQueries.map((q, i) => `  ${i + 1}. ${q}`),
      "",
      "================================================================",
      "NEXT STEPS:",
      "================================================================",
      ...report.nextSteps.map((s, i) => `  ${i + 1}. ${s}`),
      "",
      "================================================================",
      "DISCLAIMER: This is an AI-assisted analysis. Always verify",
      "critical claims through primary sources and official records.",
      "TruthLens does not replace professional fact-checking.",
      "================================================================",
    ];

    const content = lines.join("\n");

    // Create a downloadable file using the Blob API
    // Blob = Binary Large Object, a way to create files in the browser
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); // Create a temporary URL for the blob

    // Create a hidden <a> tag and click it to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `truthlens-${caseId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono font-medium
                 border-border text-ghost hover:border-signal/30 hover:text-pale hover:bg-signal/5
                 transition-all duration-200"
    >
      <Download className="w-3.5 h-3.5" />
      Download Report
    </button>
  );
}
