// ============================================================
// src/types/investigation.ts
// All TypeScript types for TruthLens
// TypeScript types are like contracts — they tell us exactly
// what shape our data must have. This prevents bugs.
// ============================================================

// The four possible verdicts for any claim
export type Verdict = "Trustworthy" | "Unclear" | "Misleading" | "False";

// The types of sources evidence can come from
export type SourceType = "Official" | "News" | "Academic" | "Social" | "Unknown";

// A single piece of evidence (for or against a claim)
export interface EvidenceItem {
  point: string;           // What the evidence says
  sourceType: SourceType;  // What kind of source this is
  reliability: number;     // 0-100 score for how reliable this source is
}

// The full investigation report returned by the AI
export interface InvestigationReport {
  caseTitle: string;                    // Short title for the case
  verdict: Verdict;                     // Final verdict
  credibilityScore: number;             // 0-100 overall credibility score
  summary: string;                      // Plain English summary
  extractedClaims: string[];            // Individual factual claims found
  supportingEvidence: EvidenceItem[];   // Evidence that supports the claim
  contradictingEvidence: EvidenceItem[]; // Evidence against the claim
  redFlags: string[];                   // Warning signs found
  missingContext: string[];             // What context is missing
  suggestedSearchQueries: string[];     // Queries user can Google themselves
  confidenceExplanation: string;        // Why the score is what it is
  nextSteps: string[];                  // What the user should do next
}

// A saved investigation (stored in browser localStorage)
export interface SavedInvestigation {
  id: string;                    // Unique ID (timestamp-based)
  claim: string;                 // The original claim that was investigated
  report: InvestigationReport;   // The full report
  timestamp: number;             // When it was saved (Unix timestamp)
  isLiveSearch: boolean;         // Whether live search was used
}

// What the API route returns to the frontend
export interface ApiResponse {
  success: boolean;
  report?: InvestigationReport;
  error?: string;
  isLiveSearch: boolean;   // Tells frontend whether live search was used
}
