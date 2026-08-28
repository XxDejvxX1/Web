"use client";

import { useId } from "react";

import { MotionStage } from "../MotionStage";
import { MOTION, timeline } from "../timeline";
import { C, type Pt, PxCells, PxFrame, PxRect, PxRule, arcPts, linePts, q, qn } from "../pixel";

/**
 * Launch & Ongoing Care — 1:1. A product lifts off an arc, lands and opens into
 * a live card, then is watched over.
 */
const W = 1080;
const H = 1080;

const { CUES, total } = timeline([
  { name: "Lift", dur: 2.2 },
  { name: "Land", dur: 1.6 },
  { name: "Watch", dur: 2.6 },
  { name: "Reset", dur: 1.6 },
]);

/** Card landed and open, rings out, all four health checks lit. */
const STILL = 5.8;

/** Quadratic flight path: ground, control point, landing. */
const P0 = { x: 168, y: 852 };
const P1 = { x: 384, y: 468 };
const P2 = { x: 540, y: 468 };

function bez(t: number) {
  const u = 1 - t;
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  };
}

function bezPts(t0: number, t1: number, n: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const b = bez(t0 + (t1 - t0) * (i / n));
    pts.push([b.x, b.y]);
  }
  return pts;
}

/** Health-check positions around the ring, in degrees. */
const DOTS = [-140, -60, 20, 100].map((a) => (a * Math.PI) / 180);

/** One period of the uptime trace, as [x, y] offsets. */
const BEAT: Pt[] = [
  [0, 0],
  [24, 0],
  [48, -12],
  [60, 24],
  [72, -36],
  [96, 12],
  [120, 0],
  [180, 0],
  [240, 0],
];

function LaunchPiece({ T }: { T: number }) {
  const clip = useId();
  const p = T / total;

  const flight =
    MOTION.draw(0, 1, 0.25, CUES.Land + 0.15)(T) -
    MOTION.draw(0, 1, CUES.Reset + 0.55, CUES.Reset + 1.5)(T);
  const fl = Math.max(0, Math.min(1, flight));
  const pos = bez(fl);

  // The tile grows from a chip into a card once it lands.
  const open =
    MOTION.pop(0, 1, CUES.Land + 0.15, CUES.Land + 0.95)(T) -
    MOTION.draw(0, 1, CUES.Reset + 0.05, CUES.Reset + 0.6)(T);
  const op = Math.max(0, Math.min(1, open));
  const cw = qn(72 + 240 * op);
  const ch = qn(72 + 132 * op);
  const cx0 = q(pos.x) - cw / 2;
  const cy0 = q(pos.y) - ch / 2;
  const inner =
    MOTION.enter(0, 1, CUES.Land + 0.6, CUES.Land + 1.3)(T) -
    MOTION.draw(0, 1, CUES.Reset, CUES.Reset + 0.45)(T);

  const watch =
    MOTION.enter(0, 1, CUES.Watch, CUES.Watch + 0.7)(T) -
    MOTION.draw(0, 1, CUES.Reset - 0.15, CUES.Reset + 0.5)(T);
  const w = Math.max(0, watch);
  const sweep = p * Math.PI * 4;

  // The trail draws itself behind the tile, and dims once monitoring takes over.
  const trail = Math.max(
    0,
    MOTION.draw(0, 1, 0.2, CUES.Land + 0.2)(T) -
      MOTION.draw(0, 1, CUES.Reset + 0.4, CUES.Reset + 1.4)(T)
  );

  const beatShift = q(-(p * 480));

  return (
    <>
      <defs>
        <clipPath id={clip}>
          <rect x={300} y={732} width={564} height={132} />
        </clipPath>
      </defs>

      <PxRule x={96} y={888} len={W - 192} fill={C.hair} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <PxRect key={i} x={144 + i * 132} y={900} w={12} h={24} fill={C.hair} />
      ))}

      <PxCells pts={bezPts(0, 1, 90)} fill={C.accent} opacity={0.22 * trail * (1 - w)} />
      {trail > 0.02 && (
        <PxCells pts={bezPts(0, trail, 90)} fill={C.accent} opacity={0.95 * (1 - 0.85 * w)} />
      )}

      <g opacity={w}>
        {/* Three rings chasing outward, each fading as it expands. */}
        {[0, 1, 2].map((i) => {
          const ph = (p * 3 + i / 3) % 1;
          return (
            <PxCells
              key={i}
              pts={arcPts(P2.x, P2.y, 144 + ph * 252, 0, Math.PI * 2, 6)}
              fill={C.accent}
              opacity={(1 - ph) * 0.6}
            />
          );
        })}

        <PxCells
          pts={linePts(
            P2.x,
            P2.y,
            P2.x + Math.cos(sweep - Math.PI / 2) * 252,
            P2.y + Math.sin(sweep - Math.PI / 2) * 252,
            40
          )}
          fill={C.accent}
          opacity={0.35}
        />

        {DOTS.map((a, i) => {
          const on = MOTION.pop(0, 1, CUES.Watch + 0.5 + i * 0.32, CUES.Watch + 1.0 + i * 0.32)(T);
          const s = on > 0.5 ? 36 : 24;
          return (
            <PxRect
              key={i}
              x={P2.x + Math.cos(a) * 252 - s / 2}
              y={P2.y + Math.sin(a) * 252 - s / 2}
              w={s}
              h={s}
              fill={on > 0.5 ? C.accent : C.hair}
              opacity={0.35 + 0.65 * on}
            />
          );
        })}

        {/* Uptime trace, scrolling continuously through a fixed window. */}
        <g clipPath={`url(#${clip})`}>
          <g transform={`translate(${beatShift} 0)`}>
            {[0, 1, 2, 3, 4].map((k) => {
              const pts: Pt[] = [];
              for (let j = 0; j < BEAT.length - 1; j++) {
                const a = BEAT[j];
                const b = BEAT[j + 1];
                pts.push(
                  ...linePts(324 + k * 240 + a[0], 792 + a[1], 324 + k * 240 + b[0], 792 + b[1], 14)
                );
              }
              return <PxCells key={k} pts={pts} fill={C.accent} opacity={0.85} />;
            })}
          </g>
        </g>
      </g>

      {op > 0.35 ? (
        <PxFrame x={cx0} y={cy0} w={cw} h={ch} fill={C.sheet} stroke={C.hair} />
      ) : (
        <PxRect x={cx0} y={cy0} w={cw} h={ch} fill={C.accent} />
      )}
      {inner > 0.02 && (
        <g opacity={Math.max(0, inner)}>
          <PxRect x={cx0 + 24} y={cy0 + 24} w={24} h={24} fill={C.accent} />
          <PxRect x={cx0 + 60} y={cy0 + 24} w={108} h={12} fill={C.ink} />
          <PxRect x={cx0 + 24} y={cy0 + 60} w={cw - 48} h={48} fill={C.hair} />
          <PxRect x={cx0 + 24} y={cy0 + 120} w={cw - 96} h={12} fill={C.hair} />
          <PxRect x={cx0 + 24} y={cy0 + 144} w={cw - 156} h={12} fill={C.hair} />
        </g>
      )}
    </>
  );
}

export function LaunchMotion({ label, className }: { label: string; className?: string }) {
  return (
    <MotionStage
      width={W}
      height={H}
      total={total}
      still={STILL}
      label={label}
      className={className}
      render={(T) => <LaunchPiece T={T} />}
    />
  );
}
