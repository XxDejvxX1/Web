"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Matches the container's border-radius so the clip keeps rounded corners. */
  radius?: number;
  className?: string;
};

/**
 * Pinned scroll reveal.
 *
 *   track — taller than the viewport. The surplus height is scroll distance
 *           spent with the card held still, which is what gives it weight on
 *           the way in. It also carries the view timeline, since a timeline
 *           read from the sticky card would stall while the card is stuck.
 *   pin   — sticky, one viewport tall.
 *   card  — the clipped panel.
 *
 * The reveal happens exactly once. `data-revealed` goes on the track the moment
 * the clip finishes opening, and it does two things: it drops the animation, and
 * it collapses the track back to its natural height so the pin disappears
 * altogether. After that the card is an ordinary block — scrolling past it, or
 * back up through it, costs nothing extra in either direction.
 *
 * Collapsing removes real height from the document, so the scroll position is
 * corrected by the same amount in a layout effect, before the browser paints.
 * Without that the page would jump by the height of the pin.
 */
export function ScrollReveal({
  children,
  radius = 40,
  className = "",
}: ScrollRevealProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardTopBeforeCollapse = useRef<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const card = cardRef.current;
    if (!track || !card) return;

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
       * Read how open the clip actually is, rather than inferring it from
       * geometry. Mid-reveal computes to `inset(0% 32% round 40px)`; fully open
       * drops the second value, and a browser without scroll timelines reports
       * `none`. Either of those means there is nothing left to animate.
       */
      const match = getComputedStyle(card).clipPath.match(/inset\(0%\s+([\d.]+)%/);

      if (!match || Number.parseFloat(match[1]) <= 0.5) {
        // Capture where the card sits now, so the collapse can be cancelled out
        // against its own movement rather than the track's height change.
        cardTopBeforeCollapse.current = card.getBoundingClientRect().top;
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

  useLayoutEffect(() => {
    const before = cardTopBeforeCollapse.current;
    if (!revealed || before === null || !cardRef.current) return;

    /*
     * Runs after the collapse is in the DOM but before paint.
     *
     * Correcting by the card's own movement, not by the track's height change:
     * those are not the same number. The card is centred inside the pin, and
     * the latch fires a touch before the pin has fully run out, so the card
     * travels less than the track shrinks — using the track's delta overshot by
     * about 120px.
     *
     * `behavior: "instant"` matters too. html carries scroll-behavior: smooth
     * for anchor links, and without the override this correction would animate
     * over ~500ms, turning a frame-perfect fix into a visible slide.
     */
    const delta = cardRef.current.getBoundingClientRect().top - before;
    if (delta) window.scrollBy({ top: delta, behavior: "instant" });

    cardTopBeforeCollapse.current = null;
  }, [revealed]);

  return (
    <div
      ref={trackRef}
      data-revealed={revealed ? "true" : undefined}
      className="scroll-reveal-track"
    >
      <div className="scroll-reveal-pin">
        <div
          ref={cardRef}
          className={["scroll-reveal", className].filter(Boolean).join(" ")}
          style={{ "--scroll-reveal-radius": `${radius}px` } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
