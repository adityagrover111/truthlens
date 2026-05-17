import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Investigative mono font for data/code feel
        mono: ["'IBM Plex Mono'", "monospace"],
        // Sharp display font for headings
        display: ["'Syne'", "sans-serif"],
        // Clean body font
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        // Dark investigative palette
        void: "#030508",
        ink: "#080d14",
        panel: "#0d1520",
        border: "#1a2535",
        muted: "#1e2d42",
        // Accent colors
        signal: "#00d4ff",      // electric blue - primary accent
        verify: "#00ff88",      // green - confirmed/true
        caution: "#ffb800",     // amber - unclear/warning
        threat: "#ff3d3d",      // red - false/danger
        // Text
        dim: "#4a6080",
        ghost: "#8aa0bc",
        pale: "#c8d8ea",
        bright: "#e8f4ff",
      },
      backgroundImage: {
        // Subtle grid pattern for dashboard feel
        "grid-pattern": "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        "scan-line": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 2s linear infinite",
        "flicker": "flicker 0.15s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0,212,255,0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.2)" },
        },
      },
      boxShadow: {
        "signal": "0 0 0 1px rgba(0,212,255,0.3), 0 0 20px rgba(0,212,255,0.1)",
        "verify": "0 0 0 1px rgba(0,255,136,0.3), 0 0 20px rgba(0,255,136,0.1)",
        "threat": "0 0 0 1px rgba(255,61,61,0.3), 0 0 20px rgba(255,61,61,0.1)",
        "caution": "0 0 0 1px rgba(255,184,0,0.3), 0 0 20px rgba(255,184,0,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
