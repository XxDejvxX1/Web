/**
 * The drawing half of the bento motion graphics.
 *
 * Everything snaps to a cell grid so edges stay crisp — no rounded corners, no
 * anti-aliased curves, no sub-cell strokes. That constraint is the whole look:
 * it is also why these scenes are drawn rather than filmed. A video codec has to
 * guess at hard one-pixel edges and smears them, which is what made the WebM
 * cuts shimmer; SVG rects on a 12-unit lattice are exact at any size.
 */

import type { ReactNode } from "react";

/** Cell size in viewBox units. Every scene coordinate is a multiple of this. */
export const PX = 12;

/** Snap a position to the lattice. */
export const q = (v: number) => Math.round(v / PX) * PX;
/** Snap a length to the lattice, never collapsing to nothing. */
export const qn = (v: number) => Math.max(1, Math.round(v / PX)) * PX;

const CRISP = "crispEdges";

type Fill = { fill: string; opacity?: number };
type Box = { x: number; y: number; w: number; h: number };

export function PxRect({ x, y, w, h, fill, opacity }: Box & Fill) {
  if (w <= 0 || h <= 0) return null;
  return (
    <rect
      x={q(x)}
      y={q(y)}
      width={qn(w)}
      height={qn(h)}
      fill={fill}
      opacity={opacity}
      shapeRendering={CRISP}
    />
  );
}

/** Four rects rather than a stroked rect: strokes straddle the lattice. */
export function PxFrame({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  t = 1,
  opacity,
}: Box & { fill?: string; stroke: string; t?: number; opacity?: number }) {
  const th = t * PX;
  const bx = q(x);
  const by = q(y);
  const bw = qn(w);
  const bh = qn(h);
  return (
    <g opacity={opacity}>
      {fill ? (
        <rect x={bx} y={by} width={bw} height={bh} fill={fill} shapeRendering={CRISP} />
      ) : null}
      <rect x={bx} y={by} width={bw} height={th} fill={stroke} shapeRendering={CRISP} />
      <rect x={bx} y={by + bh - th} width={bw} height={th} fill={stroke} shapeRendering={CRISP} />
      <rect x={bx} y={by} width={th} height={bh} fill={stroke} shapeRendering={CRISP} />
      <rect x={bx + bw - th} y={by} width={th} height={bh} fill={stroke} shapeRendering={CRISP} />
    </g>
  );
}

/**
 * Rows of full cells forming a blocky disc. Returned as an array so the same
 * geometry can be dropped straight into a `<clipPath>`.
 */
export function discRows(cx: number, cy: number, r: number, fill: string, keyPrefix = "d") {
  const out: ReactNode[] = [];
  const n = Math.max(1, Math.round(r / PX));
  for (let i = -n; i < n; i++) {
    const yy = (i + 0.5) * PX;
    const hw = Math.sqrt(Math.max(0, r * r - yy * yy));
    const cells = Math.round(hw / PX);
    if (cells < 1) continue;
    out.push(
      <rect
        key={keyPrefix + i}
        x={q(cx) - cells * PX}
        y={q(cy) + i * PX}
        width={cells * 2 * PX}
        height={PX}
        fill={fill}
        shapeRendering={CRISP}
      />
    );
  }
  return out;
}

export function PxDisc({
  cx,
  cy,
  r,
  fill,
  opacity,
}: { cx: number; cy: number; r: number } & Fill) {
  return <g opacity={opacity}>{discRows(cx, cy, r, fill, "r")}</g>;
}

export type Pt = [number, number];

/**
 * Dedupes sample points onto the lattice, one square per occupied cell. This is
 * how curves are drawn: sample densely, then let the grid quantise.
 */
export function PxCells({
  pts,
  fill,
  size = 1,
  opacity,
}: { pts: Pt[]; size?: number } & Fill) {
  const s = size * PX;
  const seen = new Set<string>();
  const out: ReactNode[] = [];
  for (const p of pts) {
    const x = Math.round(p[0] / PX) * PX;
    const y = Math.round(p[1] / PX) * PX;
    const k = x + "_" + y;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(
      <rect key={k} x={x} y={y} width={s} height={s} fill={fill} shapeRendering={CRISP} />
    );
  }
  return <g opacity={opacity}>{out}</g>;
}

/** Dotted rule: every other cell along a straight run. */
export function PxRule({
  x,
  y,
  len,
  vertical,
  fill,
  opacity,
}: { x: number; y: number; len: number; vertical?: boolean } & Fill) {
  const out: ReactNode[] = [];
  const cells = Math.round(len / PX);
  for (let i = 0; i < cells; i += 2) {
    out.push(
      <rect
        key={i}
        x={q(x) + (vertical ? 0 : i * PX)}
        y={q(y) + (vertical ? i * PX : 0)}
        width={PX}
        height={PX}
        fill={fill}
        shapeRendering={CRISP}
      />
    );
  }
  return <g opacity={opacity}>{out}</g>;
}

export function arcPts(
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  step = 6
): Pt[] {
  const pts: Pt[] = [];
  const n = Math.max(4, Math.round((Math.abs(a1 - a0) * r) / step));
  for (let i = 0; i <= n; i++) {
    const a = a0 + (a1 - a0) * (i / n);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return pts;
}

export function linePts(x0: number, y0: number, x1: number, y1: number, n = 40): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    pts.push([x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n]);
  }
  return pts;
}

/**
 * Scene palette. These are the site tokens under the names the scenes use:
 * `sheet` is paper-white, `ink` graphite, `mid` smoke, `accent` signal blue.
 * `hair` is the one value with no token — it is the lightest rule the pixel art
 * needs and sits between ash-mist and smoke.
 */
export const C = {
  sheet: "#ffffff",
  ink: "#3e3e3e",
  mid: "#636363",
  hair: "#d8d8d8",
  accent: "#007aff",
} as const;
