"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1700;

type TypewriterProps = {
  phrases: readonly string[];
  className?: string;
};

/**
 * Types each phrase out, holds, deletes, moves to the next, and loops.
 *
 * Accessibility: the animated span is aria-hidden, because a screen reader
 * would otherwise announce every single character change. The full list of
 * phrases is exposed once, visually hidden, so assistive tech gets the meaning
 * without the noise. Reduced-motion users get the same static list.
 */
export function Typewriter({ phrases, className = "" }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const phrase = phrases[index];

    if (deleting) {
      if (text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
        return;
      }
      const timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      return () => clearTimeout(timer);
    }

    if (text === phrase) {
      const timer = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(
      () => setText(phrase.slice(0, text.length + 1)),
      TYPE_MS
    );
    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, reduced]);

  if (reduced) {
    return <span className={className}>{phrases.join(", ")}</span>;
  }

  return (
    <>
      <span aria-hidden="true" className={className}>
        {text}
        <span className="typewriter-caret" />
      </span>
      <span className="sr-only">{phrases.join(", ")}</span>
    </>
  );
}
