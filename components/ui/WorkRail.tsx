"use client";

import { useEffect, useId, useRef, useState } from "react";

import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PixelImage } from "@/components/ui/PixelImage";

export type WorkShot = {
  /** The rail's label for this screen. */
  label: string;
  /** One line under the active label. Kept short — the rail must not reflow. */
  blurb: string;
  src: string;
  alt: string;
  /**
   * Which edge of the shot to hold when the frame crops it. Centred screens
   * take the default; anything composed against one edge — the home page, whose
   * headline sits hard left — has to name that edge or the crop eats it.
   */
  position?: "top" | "left-top";
};

type WorkRailProps = {
  shots: WorkShot[];
  /** Sits above the rail: which project these screens belong to. */
  project: string;
  meta: string;
  /** Rendered under the rail — usually the case-study link. */
  action?: React.ReactNode;
};

/** How long each screen holds before the rail moves on. */
const DWELL = "6s";

/**
 * A vertical rail of screens beside the one that is showing.
 *
 * The rotation is driven entirely by the dwell bar's CSS animation — see
 * `.work-dwell` in globals.css — so there is no interval to drift, and pausing
 * the bar pauses the rail. It pauses whenever the pointer is over the rail,
 * whenever focus is inside it, and whenever the section is off screen, because a
 * carousel that cycles past an empty viewport is only burning battery.
 *
 * Implemented as a real tab list: arrow keys move between screens, Home and End
 * jump to the ends, and the panel is labelled by its tab. Without JavaScript the
 * first screen renders and the labels are inert — the section still shows a
 * project and reads correctly.
 */
export function WorkRail({ shots, project, meta, action }: WorkRailProps) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = railRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /** Automatic activation: moving through the rail shows the screen you land on. */
  const focusTab = (i: number) => {
    const next = (i + shots.length) % shots.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, i: number) => {
    const move: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: shots.length - 1,
    };
    if (!(event.key in move)) return;
    event.preventDefault();
    focusTab(move[event.key]);
  };

  const shot = shots[active];

  return (
    /*
     * DOM order is rail, panel, action, which is the order a phone needs: tap a
     * screen and the frame that changed is the next thing down. On lg the grid
     * lifts the action back under the rail without moving it in the document,
     * so the panel is never separated from the labels that drive it.
     */
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,11fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10">
      <div
        ref={railRef}
        className="lg:col-start-1 lg:row-start-1"
        data-paused={paused || !onScreen ? "true" : "false"}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        /*
         * React delegates onFocus/onBlur to focusin/focusout, which bubble, so
         * these fire for focus landing anywhere inside the rail — not just on
         * this div. That is the point: a keyboard visitor arrowing through the
         * screens should not have the rail rotate out from under them mid-read.
         */
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <p className="text-body-sm font-semibold text-ink-black">{project}</p>
        <p className="mt-1 text-caption text-smoke">{meta}</p>

        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Screens from this project"
          className="mt-7"
        >
          {shots.map((s, i) => {
            const selected = i === active;
            return (
              <div key={s.label} role="presentation">
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-controls={`${uid}-panel`}
                  aria-selected={selected}
                  aria-describedby={selected ? `${uid}-blurb-${i}` : undefined}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  className={[
                    "block w-full cursor-pointer pt-3.5 pb-1.5 text-left text-body transition-colors duration-200",
                    selected
                      ? "font-medium text-ink-black"
                      : "text-smoke hover:text-ink-black",
                  ].join(" ")}
                >
                  {s.label}
                </button>

                {/*
                  Only the active row carries a blurb, and the four differ by two
                  lines — left alone the rail would grow and shrink every six
                  seconds, walking each label below it up and down the page.
                  So the open slot holds all four stacked in one grid cell with
                  three of them merely invisible: the slot measures itself to the
                  tallest at whatever width the column happens to be, which a
                  fixed min-height can only approximate.
                */}
                {selected && (
                  <div className="grid pb-3">
                    {shots.map((other, j) => (
                      <p
                        key={other.label}
                        id={j === i ? `${uid}-blurb-${i}` : undefined}
                        aria-hidden={j === i ? undefined : true}
                        className={[
                          "col-start-1 row-start-1 max-w-[34ch] text-body-sm text-smoke",
                          j === i ? "" : "invisible",
                        ].join(" ")}
                      >
                        {other.blurb}
                      </p>
                    ))}
                  </div>
                )}

                {/* The rule under every row; on the active row it is the clock. */}
                <span className="block h-px w-full overflow-hidden bg-ink-black/10">
                  {selected && (
                    <span
                      key={active}
                      onAnimationEnd={() => setActive((n) => (n + 1) % shots.length)}
                      style={{ "--work-dwell": DWELL } as React.CSSProperties}
                      className="work-dwell block h-full w-full bg-ink-black"
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        aria-live="polite"
        className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
      >
        <BrowserFrame>
          {/*
            One 16:9 window for every screen, filled rather than letterboxed.
            The four shots run from 2.1:1 to 2.75:1; contained in a common frame
            they would each sit on a different band of white and the panel would
            look broken. Cropped to fill, the frame reads as what it is — a
            browser showing the top of a page — and its height never moves as the
            rail rotates, which is what keeps the two columns level.
          */}
          <div className="aspect-video w-full bg-ash-mist">
            <PixelImage
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 720px"
              className={[
                "size-full object-cover",
                shot.position === "left-top" ? "object-left-top" : "object-top",
              ].join(" ")}
            />
          </div>
        </BrowserFrame>
      </div>

      {action && (
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">{action}</div>
      )}
    </div>
  );
}
