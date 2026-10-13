"use client";
import { useEffect, useState } from "react";

export default function TableOfContents({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-80px 0px -65% 0px" });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);
  if (items.length < 2) return null;
  return (
    <nav aria-label="On this page" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto text-sm xl:block">
      <p className="mb-2 text-xs font-semibold text-slate-500">On this page</p>
      <ul className="space-y-1 border-l border-slate-200 dark:border-white/10">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined} className={`-ml-px block border-l-2 py-1 pl-3 leading-snug ${active === i.id ? "border-gold-500 font-semibold text-navy-800 dark:text-gold-300" : "border-transparent text-slate-500 hover:text-navy-800 dark:hover:text-white"}`}>{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
