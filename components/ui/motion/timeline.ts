/**
 * The timing half of the bento motion graphics.
 *
 * Each scene is authored as a list of named beats. `timeline()` turns that list
 * into a cue table — beat name to the second it starts — so the scene bodies can
 * say `CUES.Compile + 0.7` instead of carrying hand-added offsets that drift the
 * moment a beat's duration changes.
 */

/**
 * Only the three curves the scenes actually reach for. They are named after the
 * gesture rather than the maths at the call site: `enter`, `draw`, `pop`.
 */
export const Easing = {
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  /** Overshoots past 1 before settling — the reason `pop` reads as a snap. */
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

type Tween = {
  from: number;
  to: number;
  start: number;
  end: number;
  ease: (t: number) => number;
};

/**
 * A single tween as a function of time. Holds `from` before `start` and `to`
 * after `end`, which is what lets a scene subtract one tween from another to get
 * a fade-in-then-out without tracking any state.
 */
export function animate({ from, to, start, end, ease }: Tween) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

/** The `enter` / `draw` / `pop` vocabulary every scene is written in. */
export const MOTION = {
  enter: (from: number, to: number, start: number, end: number) =>
    animate({ from, to, start, end, ease: Easing.easeOutCubic }),
  draw: (from: number, to: number, start: number, end: number) =>
    animate({ from, to, start, end, ease: Easing.easeInOutQuart }),
  pop: (from: number, to: number, start: number, end: number) =>
    animate({ from, to, start, end, ease: Easing.easeOutBack }),
};

type Beat = { name: string; dur: number };

/**
 * Cue table plus total run time. Typed off the literal beat names, so a typo in
 * `CUES.Complie` is a build error rather than a scene that silently animates at
 * NaN seconds.
 */
export function timeline<const S extends readonly Beat[]>(beats: S) {
  const CUES = {} as Record<S[number]["name"], number>;
  let t = 0;
  for (const beat of beats) {
    if (!(beat.name in CUES)) {
      (CUES as Record<string, number>)[beat.name] = Math.round(t * 1000) / 1000;
    }
    t += beat.dur;
  }
  return { CUES, total: Math.round(t * 1000) / 1000 };
}
