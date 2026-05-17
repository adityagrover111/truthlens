// ============================================================
// src/app/history/page.tsx
// Case History page — shows all saved investigations
// ============================================================

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryPanel from "@/components/HistoryPanel";
import { History, FolderOpen } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="min-h-screen grid-bg">
      <Navbar />
      <div className="fixed inset-0 scan-lines pointer-events-none z-0 opacity-30" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-24 pb-12">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded border border-signal/40 bg-signal/10 flex items-center justify-center">
              <History className="w-4 h-4 text-signal" />
            </div>
            <h1 className="font-display font-black text-2xl text-bright tracking-tight">
              Case History
            </h1>
          </div>
          <p className="text-sm text-ghost ml-11">
            All saved investigations stored locally on your device.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-panel/30 mb-6">
          <FolderOpen className="w-4 h-4 text-signal shrink-0 mt-0.5" />
          <p className="text-xs text-ghost leading-relaxed">
            Cases are saved in your browser&apos;s local storage — they persist across sessions
            but are only accessible on this device and browser. Max 50 cases are stored.
          </p>
        </div>

        {/* History panel */}
        <HistoryPanel />
      </main>

      <Footer />
    </div>
  );
}
