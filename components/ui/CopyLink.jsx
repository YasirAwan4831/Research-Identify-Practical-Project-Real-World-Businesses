"use client";
import { useState, useRef, useEffect } from "react";
import { Link2, Check } from "lucide-react";

export default function CopyLink({ anchor, label }) {
  const [done, setDone] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    try {
      await navigator.clipboard.writeText(url);
      setDone(true);
      setShowTip(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setDone(false);
        setShowTip(false);
      }, 1800);
    } catch {
      /* clipboard blocked — silent fail */
    }
  };

  return (
    <span className="relative ml-2 inline-flex align-middle">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy link to ${label}`}
        title="Copy link"
        className={`group inline-flex h-6 w-6 items-center justify-center rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
          done
            ? "bg-gold-500/15 text-gold-600 dark:text-gold-300"
            : "text-slate-400 hover:bg-slate-100 hover:text-gold-600 dark:hover:bg-white/5 dark:hover:text-gold-300"
        }`}
      >
        {/* Icon swap with rotate + scale */}
        <span className="relative block h-4 w-4">
          <Link2
            size={16}
            aria-hidden
            className={`absolute inset-0 transition-all duration-200 ${
              done ? "rotate-45 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Check
            size={16}
            aria-hidden
            className={`absolute inset-0 transition-all duration-200 ${
              done ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-0 opacity-0"
            }`}
          />
        </span>
      </button>

      {/* Tooltip */}
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-navy-800 shadow-lg transition-all duration-200 dark:border-white/10 dark:bg-navy-900 dark:text-white ${
          showTip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        Link copied!
        <span
          aria-hidden
          className="absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-slate-200 bg-white dark:border-white/10 dark:bg-navy-900"
        />
      </span>
    </span>
  );
}