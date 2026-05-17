// ============================================================
// src/lib/storage.ts
// Handles saving/loading investigations from browser localStorage
//
// localStorage is a browser feature that lets us store data
// permanently on the user's device — no database needed!
// Data survives page refreshes and browser restarts.
// Max storage: ~5MB per domain.
// ============================================================

import { type SavedInvestigation } from "@/types/investigation";

// The key we use to store data in localStorage
// Think of it like a folder name
const STORAGE_KEY = "truthlens_investigations";

// Load all saved investigations from localStorage
export function loadInvestigations(): SavedInvestigation[] {
  // localStorage only works in the browser, not during server-side rendering
  if (typeof window === "undefined") return [];

  try {
    // Get the raw string from localStorage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return []; // Nothing saved yet

    // Parse the JSON string back into JavaScript objects
    // JSON.parse converts: '{"key":"value"}' → { key: "value" }
    const parsed = JSON.parse(raw) as SavedInvestigation[];

    // Sort by newest first (highest timestamp = most recent)
    return parsed.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    // If parsing fails (corrupted data), return empty array
    console.error("Failed to load investigations from localStorage");
    return [];
  }
}

// Save a new investigation to localStorage
export function saveInvestigation(investigation: SavedInvestigation): void {
  if (typeof window === "undefined") return;

  try {
    // Load existing investigations
    const existing = loadInvestigations();

    // Add the new one at the beginning of the array
    const updated = [investigation, ...existing];

    // Keep only the last 50 investigations (prevents storage overflow)
    const trimmed = updated.slice(0, 50);

    // Convert the array to a JSON string and save it
    // JSON.stringify converts: { key: "value" } → '{"key":"value"}'
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    console.error("Failed to save investigation to localStorage");
  }
}

// Delete a single investigation by its ID
export function deleteInvestigation(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const existing = loadInvestigations();
    // Filter out the one we want to delete
    const filtered = existing.filter((inv) => inv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    console.error("Failed to delete investigation from localStorage");
  }
}

// Clear ALL saved investigations
export function clearAllInvestigations(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
