"use client";
import { useEffect, useState } from "react";

export default function TypingLine({ lines }) {
  const [text, setText] = useState(lines[0] || "");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setText(lines[0] || "");
      setDone(true);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const full = lines[lineIdx] ?? "";
      charIdx += deleting ? -1 : 1;
      setText(full.slice(0, charIdx));

      let wait = deleting ? 22 : 55;

      if (!deleting && charIdx === full.length) {
        deleting = true;
        wait = 1600; // pause on complete line
      } else if (deleting && charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        wait = 380; // pause before next line
      }

      timer = setTimeout(tick, wait);
    };

    charIdx = 0;
    setText("");
    setDone(false);
    timer = setTimeout(tick, 400);

    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <p
      className="mt-4 flex min-h-[1.75rem] items-center font-mono text-base text-gold-300 dark:text-gold-300"
      aria-label={lines.join(". ")}
    >
      <span aria-hidden className="type-line">
        {text}
      </span>
      {/* Blinking caret when waiting for next line */}
      {!done && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-gold-400 align-middle"
        />
      )}
    </p>
  );
}