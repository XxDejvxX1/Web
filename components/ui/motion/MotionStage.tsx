"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MotionStageProps = {
  width: number;
  height: number;
  /** Authored run time in seconds. The clock loops over it. */
  total: number;
  /**
   * The second of the timeline to hold still on.
   *
   * This is not a placeholder frame — it is the entire picture for anyone with
   * reduced motion on, and it is what the static export ships in its HTML. Each
   * scene points it at the beat where the idea has actually landed (the layout
   * built, the button snapped, the metrics up), so a still card still says what
   * the moving one says.
   */
  still: number;
  /** Announced in place of the artwork; these carry no text of their own. */
  label: string;
  className?: string;
  render: (T: number) => ReactNode;
};

/** Pixel art quantises away most in-between frames, so 30fps costs nothing visually. */
const FRAME_MS = 1000 / 30;

/**
 * Drives one scene's clock and draws it.
 *
 * The four bento scenes are ordinary SVG, so the first paint is server-rendered
 * at `still` and needs no JavaScript at all — the clock only ever adds movement
 * to a picture that is already correct. It runs solely while the card is on
 * screen and the tab is visible, and picks up where it left off rather than
 * restarting, so scrolling past the grid twice does not replay the intro.
 */
export function MotionStage({
  width,
  height,
  total,
  still,
  label,
  className,
  render,
}: MotionStageProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [T, setT] = useState(still);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Elapsed authored time, held across pauses so the loop resumes rather than
    // restarts. Starts at 0 so a card entering view opens on its first beat.
    let elapsed = 0;
    let last = 0;
    let frame = 0;
    let onScreen = false;
    let painted = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? now - last : 0;
      last = now;
      // A tab that was backgrounded returns one enormous dt; jumping the scene
      // forward by it would look like a glitch, so cap the step.
      elapsed += Math.min(dt, 100) / 1000;
      if (now - painted < FRAME_MS) return;
      painted = now;
      setT(elapsed % total);
    };

    const run = () => {
      if (frame || !onScreen || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const halt = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => (document.hidden ? halt() : run());
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "undefined") {
      onScreen = true;
      run();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
          if (onScreen) run();
          else halt();
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
    }

    return () => {
      halt();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [total]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      className={className}
    >
      {render(T)}
    </svg>
  );
}
