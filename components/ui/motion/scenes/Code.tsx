"use client";

import { MotionStage } from "../MotionStage";
import { MOTION, timeline } from "../timeline";
import { C, PxCells, PxFrame, PxRect, PxRule, arcPts, q, qn } from "../pixel";

/**
 * Modern, Performant Code — 1:1. Code writes itself, collapses into a bundle,
 * then the bundle opens into a load waterfall that shrinks.
 */
const W = 1080;
const H = 1080;

const { CUES, total } = timeline([
  { name: "Write", dur: 2.2 },
  { name: "Compile", dur: 1.8 },
  { name: "Measure", dur: 2.4 },
  { name: "Hold", dur: 1.6 },
]);

/** Waterfall settled at its short lengths, gauge swept round. */
const STILL = 6.2;

const WIN = { x: 156, y: 228, w: 768, h: 624 };
const CODE_X = WIN.x + 48;
const CODE_Y = WIN.y + 120;
const LINE_H = 36;

/** [indent, width, tone] — tone indexes TONES below. A zero width is a blank line. */
const LINES: [number, number, number][] = [
  [0, 300, 3],
  [0, 420, 1],
  [1, 384, 0],
  [1, 300, 0],
  [2, 264, 3],
  [2, 336, 0],
  [1, 204, 1],
  [0, 0, 0],
  [0, 360, 3],
  [1, 420, 0],
  [1, 336, 0],
  [2, 240, 1],
  [1, 180, 0],
  [0, 216, 2],
];

const TONES = [C.hair, C.mid, C.ink, C.accent];

/** [full width, weight] per waterfall row; each shrinks to 28% of its width. */
const WATER: [number, number][] = [
  [564, 0.92],
  [420, 0.66],
  [300, 0.5],
  [228, 0.34],
  [156, 0.22],
];

function CodePiece({ T }: { T: number }) {
  const compile = MOTION.draw(0, 1, CUES.Compile + 0.15, CUES.Compile + 1.25)(T);
  const measure = MOTION.enter(0, 1, CUES.Measure, CUES.Measure + 0.7)(T);
  const measureOut = MOTION.draw(0, 1, CUES.Hold + 0.35, CUES.Hold + 1.15)(T);
  const panel = measure - measureOut;

  // The bundle pops out of the collapsing code, then hands off to the panel.
  const bundle =
    MOTION.pop(0, 1, CUES.Compile + 0.7, CUES.Compile + 1.5)(T) -
    MOTION.draw(0, 1, CUES.Measure - 0.15, CUES.Measure + 0.5)(T);

  const bx = 540;
  const by = 540;
  const gauge = MOTION.draw(0, 0.94, CUES.Measure + 0.35, CUES.Measure + 1.8)(T);
  // A playhead that keeps sweeping the timeline for the whole loop.
  const pulse = ((T / total) * 3) % 1;

  return (
    <>
      <PxFrame x={WIN.x} y={WIN.y} w={WIN.w} h={WIN.h} fill={C.sheet} stroke={C.hair} />
      <PxRect x={WIN.x} y={WIN.y + 60} w={WIN.w} h={12} fill={C.hair} />
      {[0, 1, 2].map((i) => (
        <PxRect key={i} x={WIN.x + 36 + i * 36} y={WIN.y + 24} w={24} h={24} fill={C.hair} />
      ))}
      <PxRect x={WIN.x + 156} y={WIN.y + 24} w={180} h={24} fill={C.hair} />

      {/* Lines type in one after another, then all slide into the bundle. */}
      <g opacity={1 - compile}>
        {LINES.map((l, i) => {
          if (!l[1]) return null;
          const s = 0.3 + i * 0.11;
          const w = MOTION.enter(0, l[1], s, s + 0.5)(T);
          if (w < 4) return null;
          const y0 = CODE_Y + i * LINE_H;
          const x0 = CODE_X + l[0] * 36;
          return (
            <PxRect
              key={i}
              x={x0 + (bx - 132 - x0) * compile}
              y={y0 + (by - 12 - y0) * compile}
              w={w * (1 - 0.55 * compile)}
              h={12}
              fill={TONES[l[2]]}
              opacity={1 - 0.4 * compile}
            />
          );
        })}
      </g>

      {bundle > 0.02 && (
        <g opacity={Math.min(1, bundle)}>
          <PxRect
            x={bx - qn(96 * bundle)}
            y={by - qn(96 * bundle)}
            w={qn(192 * bundle)}
            h={qn(192 * bundle)}
            fill={C.accent}
          />
          {bundle > 0.85 && (
            <g>
              <PxRect x={bx - 48} y={by - 24} w={96} h={12} fill={C.sheet} opacity={0.95} />
              <PxRect x={bx - 48} y={by + 12} w={60} h={12} fill={C.sheet} opacity={0.7} />
            </g>
          )}
        </g>
      )}

      <g opacity={Math.max(0, panel)}>
        <PxRule x={WIN.x + 60} y={360} len={WIN.w - 120} fill={C.hair} />
        <PxRect
          x={q(WIN.x + 60 + pulse * (WIN.w - 120))}
          y={348}
          w={12}
          h={36}
          fill={C.ink}
          opacity={0.55}
        />
        {WATER.map((wd, i) => {
          const s = CUES.Measure + 0.25 + i * 0.14;
          const w = MOTION.draw(wd[0], wd[0] * 0.28, s, s + 0.8)(T);
          const y = 408 + i * 60;
          return (
            <g key={i}>
              <PxRect x={WIN.x + 60} y={y} w={wd[0]} h={24} fill={C.hair} />
              <PxRect
                x={WIN.x + 60}
                y={y}
                w={w}
                h={24}
                fill={C.accent}
                opacity={0.6 + 0.4 * wd[1]}
              />
            </g>
          );
        })}

        {/* Score dial: a full ring in hairline, overdrawn to `gauge`. */}
        <PxCells
          pts={arcPts(WIN.x + WIN.w - 168, 720, 72, -Math.PI / 2, Math.PI * 1.5, 5)}
          fill={C.hair}
        />
        <PxCells
          pts={arcPts(
            WIN.x + WIN.w - 168,
            720,
            72,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * gauge,
            5
          )}
          fill={C.accent}
        />
        {gauge > 0.1 && <PxRect x={WIN.x + WIN.w - 180} y={708} w={24} h={24} fill={C.accent} />}

        <PxRect x={WIN.x + 60} y={708} w={264} h={24} fill={C.ink} opacity={0.85} />
        <PxRect x={WIN.x + 60} y={744} w={168} h={12} fill={C.hair} />
      </g>
    </>
  );
}

export function CodeMotion({ label, className }: { label: string; className?: string }) {
  return (
    <MotionStage
      width={W}
      height={H}
      total={total}
      still={STILL}
      label={label}
      className={className}
      render={(T) => <CodePiece T={T} />}
    />
  );
}
