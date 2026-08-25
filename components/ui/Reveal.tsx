"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger siblings by passing increasing values, in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Fade-and-rise on first scroll into view.
 *
 * Deliberately not a motion library — this is ~20 lines against ~40KB of
 * dependency for one effect. The starting `opacity: 0` lives in a CSS class
 * that a <noscript> block in layout.tsx overrides, so the page is never blank
 * for users without JS. `prefers-reduced-motion` is handled in globals.css.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Failsafe: never leave content stuck at opacity 0 on a browser without
    // IntersectionObserver. Invisible copy is far worse than a missing effect.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Anything already on screen at mount should not animate in late.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
