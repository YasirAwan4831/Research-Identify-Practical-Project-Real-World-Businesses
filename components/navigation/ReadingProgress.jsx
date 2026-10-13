"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const next = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0;
        setPct(next);
        setVisible(h.scrollTop > 4);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Track */}
      <div className="h-full w-full bg-transparent">
        {/* Fill */}
        <div
          className="relative h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.55)] transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        >
          {/* Glowing head at the tip */}
          <span
            aria-hidden
            className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold-300 shadow-[0_0_14px_rgba(212,175,55,0.85)] ring-2 ring-gold-400/40"
          />
        </div>
      </div>
    </div>
  );
}