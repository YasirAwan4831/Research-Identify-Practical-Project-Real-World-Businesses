"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-600 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:text-slate-200 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-gold-300"
    >
      {/* Soft glow behind icon on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg bg-gold-400/0 transition-colors duration-300 group-hover:bg-gold-400/10"
      />

      {/* Sun icon (dark mode → click to go light) */}
      <Sun
        size={18}
        aria-hidden
        className={`absolute transition-all duration-300 ${
          mounted && dark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      {/* Moon icon (light mode → click to go dark) */}
      <Moon
        size={18}
        aria-hidden
        className={`absolute transition-all duration-300 ${
          mounted && !dark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}