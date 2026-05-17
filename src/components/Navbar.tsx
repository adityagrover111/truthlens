"use client";
// ============================================================
// src/components/Navbar.tsx
// Navigation bar shown on all pages
// "use client" means this component can use React hooks and
// browser APIs (like useState). Without it, it's server-only.
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, History, Info, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",        label: "Investigate", icon: Crosshair },
  { href: "/history", label: "Case History", icon: History },
  { href: "/about",   label: "About",        icon: Info },
];

export default function Navbar() {
  // usePathname tells us which page we're on (for active link styling)
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded border border-signal/50 flex items-center justify-center bg-signal/10 group-hover:bg-signal/20 transition-colors">
            <Shield className="w-4 h-4 text-signal" />
          </div>
          <span className="font-display font-bold text-bright text-sm tracking-wider">
            TRUTH<span className="text-signal">LENS</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all",
                  isActive
                    ? "text-signal bg-signal/10 border border-signal/30"
                    : "text-ghost hover:text-pale hover:bg-muted/50"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
