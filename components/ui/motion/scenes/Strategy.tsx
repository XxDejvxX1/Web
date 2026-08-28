"use client";

import { MotionStage } from "../MotionStage";
import { MOTION, timeline } from "../timeline";
import { C, PxCells, PxDisc, PxFrame, PxRect, linePts, q, qn } from "../pixel";

/** Strategy & Design — 1:2. Points → grid → layout → dissolve. */
const W = 900;
const H = 1800;

const { CUES, total } = timeline([
  { name: "Scatter", dur: 1.5 },
  { name: "Align", dur: 1.8 },
  { name: "Frame", dur: 3 },
  { name: "Settle", dur: 1.7 },
]);

/** Layout built, inner content in, spacing measures up, nothing dissolving yet. */
const STILL = 5.9;

/** Deterministic scatter — the same points every render, server and client. */
function mkRng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const COL_X = [84, 276, 468, 660];
const COL_W = 156;

const NODES = (() => {
  const r = mkRng(20260827);
  const out = [];
  for (let row = 0; row < 6; row++) {
    for (let c = 0; c < 4; c++) {
      out.push({
        gx: COL_X[c] + COL_W / 2 - 6,
        gy: 300 + row * 240,
        sx: 72 + r() * (W - 168),
        sy: 180 + r() * (H - 384),
        ph: r() * Math.PI * 2,
      });
    }
  }
  return out;
})();

type Block = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "hero" | "text" | "card" | "media" | "bar";
  accent?: boolean;
};

const BLOCKS: Block[] = [
  { x: 84, y: 228, w: 732, h: 276, kind: "hero" },
  { x: 84, y: 528, w: 348, h: 192, kind: "text" },
  { x: 468, y: 528, w: 348, h: 192, kind: "text" },
  { x: 84, y: 744, w: 228, h: 168, kind: "card", accent: true },
  { x: 336, y: 744, w: 228, h: 168, kind: "card" },
  { x: 588, y: 744, w: 228, h: 168, kind: "card" },
  { x: 84, y: 936, w: 732, h: 324, kind: "media" },
  { x: 84, y: 1284, w: 492, h: 48, kind: "bar" },
  { x: 84, y: 1368, w: 732, h: 192, kind: "text" },
];

const bar = (x: number, y: number, w: number, h: number, fill: string) => (
  <PxRect key={x + "_" + y} x={x} y={y} w={w} h={h} fill={fill} />
);

/**
 * The contents of a wireframe block, once it has finished growing.
 *
 * `mark` is the block's own accent: signal blue on a white block, white on the
 * one block that is itself filled blue.
 */
function BlockInner({ b, mark, o }: { b: Block; mark: string; o: number }) {
  const pad = 24;

  if (b.kind === "hero") {
    return (
      <g opacity={o}>
        {bar(pad, 48, 468, 24, C.ink)}
        {bar(pad, 84, 384, 24, C.ink)}
        {bar(pad, 144, 300, 12, C.mid)}
        {bar(pad, 168, 240, 12, C.mid)}
        {bar(pad, 204, 168, 48, mark)}
      </g>
    );
  }

  if (b.kind === "card") {
    return (
      <g opacity={o}>
        <PxDisc cx={pad + 18} cy={42} r={20} fill={b.accent ? mark : C.mid} />
        {bar(pad, 78, 120, 12, C.mid)}
        {bar(pad, 102, 84, 12, C.hair)}
        {bar(pad, 132, 60, 12, C.hair)}
      </g>
    );
  }

  if (b.kind === "text") {
    const rows = [];
    for (let i = 0; i * 36 < b.h - 48; i++) {
      rows.push(
        bar(
          pad,
          36 + i * 36,
          q((b.w - pad * 2) * (i % 3 === 2 ? 0.55 : 0.92)),
          12,
          i === 0 ? C.ink : C.hair
        )
      );
    }
    return <g opacity={o}>{rows}</g>;
  }

  if (b.kind === "media") {
    return (
      <g opacity={o}>
        <PxRect x={pad} y={24} w={b.w - pad * 2} h={b.h - 108} fill={C.hair} />
        <PxRect x={pad} y={b.h - 156} w={b.w - pad * 2} h={48} fill={C.mid} opacity={0.26} />
        <PxDisc cx={b.w / 2} cy={(b.h - 96) / 2} r={36} fill={C.sheet} />
        <PxRect x={b.w / 2 - 12} y={(b.h - 96) / 2 - 24} w={12} h={48} fill={C.mid} />
        <PxRect x={b.w / 2} y={(b.h - 96) / 2 - 12} w={12} h={24} fill={C.mid} />
        {bar(pad, b.h - 72, 300, 12, C.mid)}
      </g>
    );
  }

  return <g opacity={o}>{bar(pad, b.h / 2 - 6, b.w - pad * 2, 12, C.hair)}</g>;
}

function StrategyPiece({ T }: { T: number }) {
  const p = T / total;
  const settle = CUES.Settle;

  // A slow rise and fall over the loop, so the tall canvas never sits dead still.
  const camY = q(-72 * Math.sin(Math.PI * p));

  const nodes = NODES.map((n, i) => {
    // Points snap to the grid one after another, then release in the same order.
    const s = CUES.Align + i * 0.032;
    const rs = settle + 0.35 + i * 0.014;
    const a = MOTION.draw(0, 1, s, s + 1)(T) - MOTION.draw(0, 1, rs, rs + 0.85)(T);
    const x = n.sx + (n.gx - n.sx) * a + 26 * Math.sin(2 * Math.PI * p + n.ph) * (1 - a);
    const y = n.sy + (n.gy - n.sy) * a + 20 * Math.cos(2 * Math.PI * p + n.ph) * (1 - a);
    // Dim once the blocks take over, back up as the layout dissolves.
    const dim =
      MOTION.draw(1, 0.35, CUES.Frame, CUES.Frame + 1)(T) +
      MOTION.draw(0, 0.65, settle + 0.2, settle + 0.8)(T);
    return { x, y, dim, key: i };
  });

  return (
    <g transform={`translate(0 ${camY})`}>
      {BLOCKS.map((b, i) => {
        const bs = CUES.Frame + i * 0.1;
        const be = bs + 0.72;
        const grow = MOTION.pop(0, 1, bs, be)(T);
        const out = MOTION.draw(1, 0, settle + 0.5, settle + 1.25)(T);
        if (grow <= 0.02 || out <= 0.001) return null;
        const inner = MOTION.enter(0, 1, bs + 0.4, be + 0.55)(T) * out;
        const gh = qn(b.h * Math.min(1, grow));
        return (
          <g key={i} opacity={out}>
            {b.accent ? (
              <PxRect x={b.x} y={b.y} w={b.w} h={gh} fill={C.accent} />
            ) : (
              <PxFrame x={b.x} y={b.y} w={b.w} h={gh} fill={C.sheet} stroke={C.hair} />
            )}
            {grow > 0.98 && (
              <g transform={`translate(${q(b.x)} ${q(b.y)})`}>
                <BlockInner b={b} mark={b.accent ? C.sheet : C.accent} o={inner} />
              </g>
            )}
          </g>
        );
      })}

      <g>
        {nodes.map((n) => (
          <PxRect key={n.key} x={n.x} y={n.y} w={24} h={24} fill={C.accent} opacity={n.dim} />
        ))}
      </g>

      {/* Spacing measures — the moment the layout stops being a sketch. */}
      <g
        opacity={
          MOTION.enter(0, 1, CUES.Frame + 1.75, CUES.Frame + 2.2)(T) -
          MOTION.draw(0, 1, settle + 0.35, settle + 0.9)(T)
        }
      >
        <PxCells pts={linePts(84, 708, 84, 768, 8)} fill={C.accent} />
        <PxCells pts={linePts(300, 708, 300, 768, 8)} fill={C.accent} />
        <PxCells pts={linePts(84, 732, 312, 732, 24)} fill={C.accent} />
        <PxCells pts={linePts(336, 708, 336, 768, 8)} fill={C.accent} />
        <PxRect x={312} y={732} w={24} h={12} fill={C.accent} />
        <PxCells pts={linePts(840, 228, 840, 504, 30)} fill={C.accent} />
        <PxRect x={816} y={228} w={48} h={12} fill={C.accent} />
        <PxRect x={816} y={492} w={48} h={12} fill={C.accent} />
      </g>
    </g>
  );
}

export function StrategyMotion({ label, className }: { label: string; className?: string }) {
  return (
    <MotionStage
      width={W}
      height={H}
      total={total}
      still={STILL}
      label={label}
      className={className}
      render={(T) => <StrategyPiece T={T} />}
    />
  );
}
