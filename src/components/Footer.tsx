// ============================================================
// src/components/Footer.tsx
// Simple footer (no "use client" needed — no interactivity)
// ============================================================

import { Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-signal" />
            <span className="font-display font-bold text-sm text-ghost tracking-wider">
              TRUTH<span className="text-signal">LENS</span>
            </span>
          </div>

          {/* Disclaimer */}
          <div className="flex items-center gap-2 text-xs text-dim text-center max-w-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-caution shrink-0" />
            <span>
              AI analysis only. Always verify critical claims from primary sources.{" "}
              <Link href="/about" className="text-signal hover:underline">
                Learn more
              </Link>
            </span>
          </div>

          {/* Version */}
          <span className="font-mono text-xs text-dim">
            v1.0.0 — TruthLens
          </span>
        </div>
      </div>
    </footer>
  );
}
