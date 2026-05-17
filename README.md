# TruthLens — AI Credibility Investigation Tool

TruthLens is an AI-powered internet detective that analyzes claims, tweets, article snippets, and rumors — then generates a full credibility investigation report with verdict, score, evidence, red flags, and source analysis.

##  Features

-  **AI Evidence Scan** — Extracts individual factual claims automatically
-  **Live Web Search** — Searches real sources via Tavily API
-  **Credibility Score** — 0–100 animated meter with explanation
-  **Risk Signal Detection** — Flags manipulation tactics and red flags
-  **Case History** — Saves investigations to your browser (localStorage)
-  **Downloadable Reports** — Export as .txt files
-  **Copy Report** — One-click clipboard copy

---

##  Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Google Gemini 1.5 Flash | AI analysis |
| Tavily API | Live web search |
| localStorage | Case history (no database needed) |
| Vercel | Deployment (free) |

---

##  Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- A free Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Then edit `.env.local` and add your API keys:
```
GEMINI_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here  # optional but recommended
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Project Structure

```
truthlens/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── investigate/
│   │   │       └── route.ts      ← Backend API (Gemini + Tavily)
│   │   ├── history/
│   │   │   └── page.tsx          ← Case history page
│   │   ├── about/
│   │   │   └── page.tsx          ← About page
│   │   ├── globals.css           ← Global styles
│   │   ├── layout.tsx            ← Root layout (fonts, metadata)
│   │   └── page.tsx              ← Homepage
│   ├── components/
│   │   ├── ClaimInput.tsx        ← Input form
│   │   ├── InvestigationReport.tsx ← Main report display
│   │   ├── VerdictBadge.tsx      ← Verdict badge
│   │   ├── CredibilityMeter.tsx  ← Animated score meter
│   │   ├── EvidenceCard.tsx      ← Evidence display
│   │   ├── RedFlagsPanel.tsx     ← Risk signals
│   │   ├── LoadingInvestigation.tsx ← Loading animation
│   │   ├── HistoryPanel.tsx      ← Saved cases
│   │   ├── CopyButton.tsx        ← Copy to clipboard
│   │   ├── DownloadReportButton.tsx ← Download .txt
│   │   ├── Navbar.tsx            ← Navigation
│   │   └── Footer.tsx            ← Footer
│   ├── lib/
│   │   ├── utils.ts              ← Utility functions
│   │   └── storage.ts            ← localStorage helpers
│   └── types/
│       └── investigation.ts      ← TypeScript types
├── .env.example                  
├── .env.local                   
├── .gitignore                    
└── README.md                     
```
##  License

MIT — free to use, modify, and deploy.
