// src/app/layout.tsx


import type { Metadata } from "next";
import { Syne, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Load fonts from Google Fonts (free, no API key needed)
// Next.js handles this automatically and optimizes loading
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",  // CSS variable name
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600"],
});

// Metadata appears in browser tabs and social media link previews
export const metadata: Metadata = {
  title: "TruthLens — AI Credibility Investigation",
  description:
    "Open a case. Run the evidence. TruthLens uses AI to investigate claims, detect misinformation, and generate credibility dossiers on any statement.",
  keywords: "fact check, misinformation, AI, credibility, investigation",
  openGraph: {
    title: "TruthLens — AI Credibility Investigation",
    description: "Open a case. Run the evidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${syne.variable}
          ${dmSans.variable}
          ${ibmPlexMono.variable}
          font-body
          bg-void
          text-pale
          antialiased
          min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}
