"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Matches the container's border-radius so the clip keeps rounded corners. */
  radius?: number;
  className?: string;
};

/**
 * Scroll-linked curtain reveal — the same clipPath effect as motion.dev's
 * scroll image reveal, driven by a CSS scroll-progress timeline (see
 * `.scroll-reveal` in globals.css).
 *
 * This component exists only to latch it. A scroll-progress timeline maps
 * scroll position straight to animation progress, so it is inherently
 * two-way: scrolling back up runs the reveal in reverse and closes the panel
 * again. CSS has no way to remember that the animation already finished, so
 * the one-shot behaviour needs a flag.
 *
 * Once the panel is open it gets `data-revealed`, which drops the animation
 * entirely and leaves it plainly visible. From then on scrolling in either
 * direction does nothing to it.
 */
export function ScrollReveal({
  children,
  radius = 40,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Without scroll timelines there is no animation to latch — the @supports
    // guard already leaves the panel visible.
    if (typeof CSS === "undefined" || !CSS.supports("animation-timeline", "view()")) {
      setRevealed(true);
      return;
    }

    let frame = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const check = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();

      /*
       * The CSS range ends at `cover 50%`, which is exactly the point where the
       * panel's centre meets the viewport's centre. The 6px is slack so the
       * latch can only ever land at or after the animation finishes — latching
       * a moment early would snap the last sliver open.
       */
      if (rect.top + rect.height / 2 <= window.innerHeight / 2 - 6) {
        setRevealed(true);
        stop();
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    // Covers loading already scrolled past the panel.
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return stop;
  }, []);

  return (
    <div
      ref={ref}
      data-revealed={revealed ? "true" : undefined}
      className={["scroll-reveal", className].filter(Boolean).join(" ")}
      style={{ "--scroll-reveal-radius": `${radius}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
