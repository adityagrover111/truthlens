// ============================================================
// src/app/about/page.tsx
// About page — explains TruthLens and its limitations
// ============================================================

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Info, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen grid-bg">
      <Navbar />
      <div className="fixed inset-0 scan-lines pointer-events-none z-0 opacity-30" />

      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-12 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded border border-signal/40 bg-signal/10 flex items-center justify-center">
            <Info className="w-4 h-4 text-signal" />
          </div>
          <h1 className="font-display font-black text-2xl text-bright tracking-tight">
            About TruthLens
          </h1>
        </div>

        {/* What it is */}
        <div className="glass rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-signal" />
            <h2 className="font-display font-bold text-bright uppercase tracking-wider text-sm">
              What is TruthLens?
            </h2>
          </div>
          <p className="text-sm text-pale leading-relaxed mb-3">
            TruthLens is an AI-powered credibility investigation tool. It analyzes claims,
            statements, tweets, article snippets, and rumors — then generates a detailed
            investigation report with a credibility score, supporting and contradicting
            evidence, risk signals, and recommended next steps.
          </p>
          <p className="text-sm text-pale leading-relaxed">
            It uses Google&apos;s Gemini AI for analysis and, when configured, Tavily for
            live web search to find real sources. The goal is to help users think critically
            about the information they encounter online.
          </p>
        </div>

        {/* What it can do */}
        <div className="glass rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-verify" />
            <h2 className="font-display font-bold text-bright uppercase tracking-wider text-sm">
              What TruthLens Can Do
            </h2>
          </div>
          <ul className="space-y-2">
            {[
              "Extract individual factual claims from complex statements",
              "Provide supporting and contradicting evidence with source types",
              "Flag red flags like vague sourcing, emotional language, and unverifiable stats",
              "Identify missing context that changes the meaning of a claim",
              "Generate search queries so you can verify claims yourself",
              "Save investigation history locally for future reference",
              "Download investigation reports as text files",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-pale">
                <span className="text-verify shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations — CRITICAL */}
        <div className="glass rounded-xl border border-threat/30 p-6 bg-threat/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-threat" />
            <h2 className="font-display font-bold text-threat uppercase tracking-wider text-sm">
              Important Limitations
            </h2>
          </div>
          <ul className="space-y-2">
            {[
              "AI can make mistakes. Always verify important claims through primary sources.",
              "When live search is disabled, analysis is based on AI training data which has a knowledge cutoff.",
              "AI can be confidently wrong — a high credibility score does not guarantee truth.",
              "TruthLens is not a substitute for professional fact-checking organizations.",
              "The tool cannot access paywalled content, private documents, or classified information.",
              "Results may reflect biases present in the AI's training data.",
              "This tool is for educational and critical thinking purposes only.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-pale/90">
                <span className="text-threat shrink-0 mt-0.5">!</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What it cannot do */}
        <div className="glass rounded-xl border border-caution/30 p-6 bg-caution/5">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-4 h-4 text-caution" />
            <h2 className="font-display font-bold text-caution uppercase tracking-wider text-sm">
              What TruthLens Cannot Do
            </h2>
          </div>
          <ul className="space-y-2">
            {[
              "It cannot definitively prove something is true or false",
              "It cannot replace human judgment and critical thinking",
              "It cannot access real-time breaking news (without live search)",
              "It cannot verify visual content, images, or videos",
              "It cannot provide legal or professional advice",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-pale/90">
                <span className="text-caution shrink-0">×</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="glass rounded-xl border border-border p-6">
          <h2 className="font-display font-bold text-bright uppercase tracking-wider text-sm mb-4">
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Next.js 14", "App Router framework"],
              ["TypeScript", "Type-safe JavaScript"],
              ["Tailwind CSS", "Styling"],
              ["Google Gemini", "AI analysis"],
              ["Tavily", "Live web search"],
              ["Framer Motion", "Animations"],
              ["localStorage", "Local data storage"],
              ["Vercel", "Deployment"],
            ].map(([tech, desc]) => (
              <div key={tech} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                <span className="font-mono text-xs text-signal">{tech}</span>
                <span className="text-xs text-dim">— {desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="glass rounded-xl border border-border p-6">
          <h2 className="font-display font-bold text-bright uppercase tracking-wider text-sm mb-3">
            Privacy
          </h2>
          <p className="text-sm text-ghost leading-relaxed">
            TruthLens does not store your investigations on any server. All saved cases
            are stored exclusively in your browser&apos;s localStorage on your own device.
            Claims you submit are sent to Google&apos;s Gemini API for analysis — please
            review Google&apos;s privacy policy before submitting sensitive information.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
