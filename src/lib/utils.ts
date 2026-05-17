// ============================================================
// src/lib/utils.ts
// Shared utility functions used across the app
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Verdict } from "@/types/investigation";

// Combines Tailwind CSS classes safely (handles conflicts)
// Example: cn("text-red-500", condition && "text-blue-500")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generates a unique ID based on current timestamp + random number
// Used for saving investigations to localStorage
export function generateCaseId(): string {
  const timestamp = Date.now().toString(36).toUpperCase(); // Base-36 timestamp
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TL-${timestamp}-${random}`;
}

// Returns the color class based on verdict
export function getVerdictColor(verdict: Verdict): string {
  switch (verdict) {
    case "Trustworthy": return "verify";    // Green
    case "Unclear":     return "caution";   // Amber
    case "Misleading":  return "caution";   // Amber
    case "False":       return "threat";    // Red
    default:            return "ghost";
  }
}

// Returns Tailwind classes for verdict badges
export function getVerdictClasses(verdict: Verdict): string {
  switch (verdict) {
    case "Trustworthy":
      return "bg-verify/10 text-verify border-verify/30 shadow-verify";
    case "Unclear":
      return "bg-caution/10 text-caution border-caution/30 shadow-caution";
    case "Misleading":
      return "bg-caution/10 text-caution border-caution/30 shadow-caution";
    case "False":
      return "bg-threat/10 text-threat border-threat/30 shadow-threat";
    default:
      return "bg-muted text-ghost border-border";
  }
}

// Returns emoji for verdict (used in reports)
export function getVerdictEmoji(verdict: Verdict): string {
  switch (verdict) {
    case "Trustworthy": return "✅";
    case "Unclear":     return "⚠️";
    case "Misleading":  return "🔶";
    case "False":       return "❌";
    default:            return "❓";
  }
}

// Formats a Unix timestamp to a readable date string
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Truncates text to a given length and adds "..."
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

// Returns color class for credibility score
export function getScoreColor(score: number): string {
  if (score >= 70) return "text-verify";
  if (score >= 40) return "text-caution";
  return "text-threat";
}

// Returns source type color
export function getSourceTypeColor(sourceType: string): string {
  switch (sourceType) {
    case "Official":  return "text-signal border-signal/30 bg-signal/10";
    case "News":      return "text-pale border-pale/30 bg-pale/10";
    case "Academic":  return "text-verify border-verify/30 bg-verify/10";
    case "Social":    return "text-caution border-caution/30 bg-caution/10";
    default:          return "text-ghost border-ghost/30 bg-ghost/10";
  }
}
