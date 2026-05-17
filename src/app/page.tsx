"use client";

import { useState } from "react";
import { Shield, Zap, Globe, Lock, ChevronRight } from "lucide-react";
import { type InvestigationReport as ReportData, type ApiResponse as ApiRes } from "@/types/investigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClaimInput from "@/components/ClaimInput";
import InvestigationReport from "@/components/InvestigationReport";
import LoadingInvestigation from "@/components/LoadingInvestigation";

const FEATURES = [
  { icon: Zap,    title: "AI Evidence Scan",   desc: "Extracts and evaluates factual claims automatically" },
  { icon: Globe,  title: "Live Web Search",     desc: "Searches real sources when Tavily API is configured" },
  { icon: Lock,   title: "Source Reliability",  desc: "Rates evidence by source type and credibility" },
  { icon: Shield, title: "Risk Detection",      desc: "Flags manipulation tactics and missing context" },
];

export default function HomePage() {
  const [isLoading, setIsLoading]       = useState(false);
  const [report, setReport]             = useState<ReportData | null>(null);
  const [isLiveSearch, setIsLiveSearch] = useState(false);
  const [currentClaim, setCurrentClaim] = useState("");
  const [error, setError]               = useState<string | null>(null);

  async function handleInvestigate(claim: string) {
    setIsLoading(true);
    setReport(null);
    setError(null);
    setCurrentClaim(claim);

    try {
      const response = await fetch("/api/investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });

      const data: ApiRes = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Investigation failed. Please try again.");
      }

      setReport(data.report!);
      setIsLiveSearch(data.isLiveSearch);

      setTimeout(() => {
        document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid-bg">
      <Navbar />
      <div className="fixed inset-0 scan-lines pointer-events-none z-0 opacity-50" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-24 pb-12">

        {/* HERO */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-signal/30 bg-signal/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-verify animate-pulse" />
            <span className="font-mono text-[11px] text-signal tracking-widest uppercase">
              Intelligence System Online
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-bright mb-4 leading-none tracking-tight">
            TRUTH<span className="text-signal glow-signal">LENS</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-ghost max-w-lg mx-auto mb-2 leading-relaxed">
            AI-powered credibility investigation. Open a case, scan the evidence,
            and get a full intelligence dossier on any claim.
          </p>

          <p className="font-mono text-xs text-dim uppercase tracking-widest">
            Not a chatbot. Not a search engine. An investigation tool.
          </p>
        </div>

        {/* INPUT */}
        <div className="mb-8">
          <ClaimInput onSubmit={handleInvestigate} isLoading={isLoading} />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-8 p-4 rounded-lg border border-threat/30 bg-threat/5 text-sm text-threat flex items-start gap-3">
            <span className="text-lg">⚠</span>
            <div>
              <p className="font-bold mb-1">Investigation Failed</p>
              <p className="text-threat/80">{error}</p>
            </div>
          </div>
        )}

        {/* LOADING */}
        {isLoading && (
          <div className="glass rounded-xl border border-border mb-8">
            <LoadingInvestigation />
          </div>
        )}

        {/* REPORT */}
        {report && !isLoading && (
          <div id="report">
            <InvestigationReport
              report={report}
              claim={currentClaim}
              isLiveSearch={isLiveSearch}
            />
          </div>
        )}

        {/* FEATURES */}
        {!report && !isLoading && !error && (
          <div className="mt-16">
            <p className="font-mono text-[10px] text-dim uppercase tracking-widest text-center mb-6">
              Intelligence Capabilities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass rounded-xl border border-border p-4 text-center hover:border-signal/20 transition-all">
                  <Icon className="w-6 h-6 text-signal mx-auto mb-2" />
                  <p className="font-display font-bold text-xs text-bright mb-1">{title}</p>
                  <p className="text-[11px] text-dim leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 glass rounded-xl border border-border p-5">
              <p className="font-mono text-[10px] text-dim uppercase tracking-widest mb-4">
                Investigation Protocol
              </p>
              <div className="space-y-2">
                {[
                  "Submit a claim, tweet, or article snippet",
                  "AI extracts individual factual claims",
                  "Live search scans for supporting and contradicting evidence",
                  "Risk signals and manipulation tactics are flagged",
                  "Full credibility dossier is compiled with score",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-signal bg-signal/10 border border-signal/20 w-5 h-5 rounded flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-ghost">{step}</span>
                    {i < 4 && <ChevronRight className="w-3 h-3 text-dim shrink-0 ml-auto hidden sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
