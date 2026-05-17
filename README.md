# 🔍 TruthLens — AI Credibility Investigation Tool

> Open a case. Scan the evidence. Get the truth.

TruthLens is an AI-powered internet detective that analyzes claims, tweets, article snippets, and rumors — then generates a full credibility investigation report with verdict, score, evidence, red flags, and source analysis.

![TruthLens](https://via.placeholder.com/800x400/030508/00d4ff?text=TruthLens+—+AI+Credibility+Investigation)

---

## ✨ Features

- 🔎 **AI Evidence Scan** — Extracts individual factual claims automatically
- 🌐 **Live Web Search** — Searches real sources via Tavily API
- 📊 **Credibility Score** — 0–100 animated meter with explanation
- ⚠️ **Risk Signal Detection** — Flags manipulation tactics and red flags
- 🗂️ **Case History** — Saves investigations to your browser (localStorage)
- 📥 **Downloadable Reports** — Export as .txt files
- 📋 **Copy Report** — One-click clipboard copy
- 🔐 **Secure** — API keys never exposed to the browser

---

## 🛠️ Tech Stack

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

## 🚀 Quick Start (Local Development)

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

## 📱 Deploy from Your Phone (Vercel)

### Step 1: Push to GitHub (from phone)

1. Go to [github.com](https://github.com) on your phone
2. Tap **+** → **New repository**
3. Name it `truthlens`, set to **Public**, tap **Create repository**
4. On your computer/Replit/Codespaces, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TruthLens"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/truthlens.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (from phone)

1. Go to [vercel.com](https://vercel.com) on your phone
2. Sign in with GitHub
3. Tap **Add New Project**
4. Select your `truthlens` repository
5. Tap **Environment Variables** and add:
   - `GEMINI_API_KEY` = your Gemini key
   - `TAVILY_API_KEY` = your Tavily key
6. Tap **Deploy**

Your app will be live at `https://truthlens-xxx.vercel.app` in ~2 minutes! 🎉

---

## 🌐 Deploy via Replit (Alternative)

1. Go to [replit.com](https://replit.com) on your phone
2. Create a new Repl → Import from GitHub → paste your repo URL
3. Add secrets (environment variables) in the Secrets tab
4. Click **Run**

---

## 📁 Project Structure

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
├── .env.example                  ← Example env vars (safe to commit)
├── .env.local                    ← Your real keys (NEVER commit this)
├── .gitignore                    ← Files excluded from Git
└── README.md                     ← This file
```

---

## 🔑 Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `GEMINI_API_KEY` | ✅ Yes | [aistudio.google.com](https://aistudio.google.com) |
| `TAVILY_API_KEY` | Optional | [tavily.com](https://tavily.com) |
| `SERPAPI_API_KEY` | Optional | [serpapi.com](https://serpapi.com) |

**Security Note:** These variables are loaded on the server only. They are NEVER sent to the browser. This is enforced by Next.js — variables in `.env.local` without the `NEXT_PUBLIC_` prefix stay server-side.

---

## ⚠️ Disclaimer

TruthLens is an AI-assisted analysis tool. It is **not** a substitute for professional fact-checking. AI can make mistakes. Always verify important claims through primary sources.

---

## 📄 License

MIT — free to use, modify, and deploy.
