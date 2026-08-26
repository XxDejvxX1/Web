"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Matches the container's border-radius so the clip keeps rounded corners. */
  radius?: number;
  className?: string;
};

/**
 * Pinned scroll reveal.
 *
 * Three nested pieces:
 *
 *   track — taller than the viewport. Its extra height is pure scroll distance
 *           and is what makes the card feel heavy to scroll past. It also
 *           carries the view timeline, because the card itself is sticky and a
 *           timeline read from a pinned element would stall.
 *   pin   — sticky, one viewport tall, holding the card still while the track
 *           scrolls underneath it.
 *   card  — the clipped panel, opening as the track advances.
 *
 * Once the track is behind you, scrolling is ordinary again.
 *
 * The latch: a scroll-progress timeline maps position straight to progress, so
 * it runs backwards on the way up and would re-close the panel. CSS cannot
 * remember that an animation finished, so `data-revealed` is set on completion
 * and never unset. It is driven off the computed clip rather than off geometry,
 * which keeps it correct no matter how the range above is retuned.
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

    let frame = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const check = () => {
      frame = 0;

      /*
       * Read how open the clip actually is. Mid-reveal computes to
       * `inset(0% 32% round 40px)`; fully open drops the second value entirely,
       * and an unsupported browser reports `none`. Either of those means done.
       */
      const match = getComputedStyle(el).clipPath.match(/inset\(0%\s+([\d.]+)%/);

      if (!match || Number.parseFloat(match[1]) <= 0.5) {
        setRevealed(true);
        stop();
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    // Covers loading already scrolled past the card.
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return stop;
  }, []);

  return (
    <div className="scroll-reveal-track">
      <div className="scroll-reveal-pin">
        <div
          ref={ref}
          data-revealed={revealed ? "true" : undefined}
          className={["scroll-reveal", className].filter(Boolean).join(" ")}
          style={{ "--scroll-reveal-radius": `${radius}px` } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
