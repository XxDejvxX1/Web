"use client";

import { useId } from "react";

import { MotionStage } from "../MotionStage";
import { MOTION, timeline } from "../timeline";
import { C, PX, PxCells, PxDisc, PxFrame, PxRect, discRows, linePts, q } from "../pixel";

/**
 * Pixel-Perfect Interfaces — 1:1. A blocky loupe finds a misaligned element and
 * it snaps onto the grid. Magnification is exactly 3x so the cells under the
 * lens stay square against the ones outside it.
 */
const W = 1080;
const H = 1080;
const K = 3;

const { CUES, total } = timeline([
  { name: "Survey", dur: 1.8 },
  { name: "Inspect", dur: 2.4 },
  { name: "Snap", dur: 2.2 },
  { name: "Release", dur: 1.6 },
]);

/** Loupe over the button, guides up, offset corrected. */
const STILL = 5.6;

const CARD = { x: 192, y: 252, w: 696, h: 576 };
const BTN = { x: 228, y: 720, w: 216, h: 60 };

const bar = (x: number, y: number, w: number, h: number, fill: string) => (
  <PxRect key={x + "_" + y} x={x} y={y} w={w} h={h} fill={fill} />
);

/** Drawn twice: once at 1x, once at 3x inside the loupe's clip. */
function UICard({ dx, dy }: { dx: number; dy: number }) {
  return (
    <g>
      <PxFrame x={CARD.x} y={CARD.y} w={CARD.w} h={CARD.h} fill={C.sheet} stroke={C.hair} />
      <PxDisc cx={252} cy={312} r={26} fill={C.mid} />
      {bar(288, 300, 192, 12, C.ink)}
      {bar(288, 324, 120, 12, C.hair)}
      <PxRect x={228} y={372} w={624} h={216} fill={C.hair} />
      <PxRect x={228} y={528} w={624} h={60} fill={C.mid} opacity={0.28} />
      <PxDisc cx={540} cy={468} r={42} fill={C.sheet} />
      <PxRect x={528} y={444} w={12} h={48} fill={C.mid} />
      <PxRect x={540} y={456} w={12} h={24} fill={C.mid} />
      <PxRect x={552} y={462} w={12} h={12} fill={C.mid} />
      {bar(228, 612, 564, 12, C.mid)}
      {bar(228, 648, 468, 12, C.hair)}
      {bar(228, 672, 384, 12, C.hair)}
      <PxRect x={BTN.x + dx} y={BTN.y + dy} w={BTN.w} h={BTN.h} fill={C.accent} />
      {bar(BTN.x + BTN.w + 36 + dx, BTN.y + 24 + dy, 144, 12, C.hair)}
    </g>
  );
}

function InterfacesPiece({ T }: { T: number }) {
  // Two ids so the loupe's clip cannot collide with another instance's.
  const clip = useId();

  // The loupe drifts in, dives onto the button, then travels back out.
  let lx = 780;
  let ly = 336;
  lx += MOTION.draw(0, -216, 0, CUES.Inspect)(T);
  lx += MOTION.draw(0, -312, CUES.Inspect, CUES.Inspect + 1.2)(T);
  lx += MOTION.draw(0, 528, CUES.Release + 0.3, CUES.Release + 1.5)(T);
  ly += MOTION.draw(0, 132, 0, CUES.Inspect)(T);
  ly += MOTION.draw(0, 252, CUES.Inspect, CUES.Inspect + 1.2)(T);
  ly += MOTION.draw(0, -384, CUES.Release + 0.3, CUES.Release + 1.5)(T);
  lx = q(lx);
  ly = q(ly);
  const lr = 168;

  // The button sits two cells out until it snaps, and drifts back for the loop.
  const snapped =
    MOTION.pop(0, 1, CUES.Snap + 0.45, CUES.Snap + 1.05)(T) -
    MOTION.draw(0, 1, CUES.Release + 0.85, CUES.Release + 1.4)(T);
  const off = PX * 2;
  const dx = q(off * (1 - snapped));
  const dy = q(off * 0.75 * (1 - snapped));

  const guides =
    MOTION.enter(0, 1, CUES.Snap, CUES.Snap + 0.5)(T) -
    MOTION.draw(0, 1, CUES.Release + 0.2, CUES.Release + 0.8)(T);

  // Hairline pixel grid, only under the lens, at the magnified pitch.
  const pitch = PX * K;
  const n = Math.ceil((lr + pitch) / pitch);
  const grid = [];
  for (let i = -n; i <= n; i++) {
    grid.push(
      <rect
        key={"v" + i}
        x={lx + i * pitch}
        y={ly - lr - pitch}
        width={1}
        height={lr * 2 + pitch * 2}
        fill={C.mid}
        opacity={0.28}
        shapeRendering="crispEdges"
      />,
      <rect
        key={"h" + i}
        x={lx - lr - pitch}
        y={ly + i * pitch}
        width={lr * 2 + pitch * 2}
        height={1}
        fill={C.mid}
        opacity={0.28}
        shapeRendering="crispEdges"
      />
    );
  }

  return (
    <>
      <defs>
        <clipPath id={clip}>{discRows(lx, ly, lr, "#000", "c")}</clipPath>
      </defs>

      <UICard dx={dx} dy={dy} />

      <g opacity={guides}>
        <PxCells pts={linePts(BTN.x, CARD.y + 24, BTN.x, CARD.y + CARD.h - 24, 60)} fill={C.accent} />
        <PxCells
          pts={linePts(CARD.x + 24, BTN.y, CARD.x + CARD.w - 24, BTN.y, 60)}
          fill={C.accent}
        />
        <PxCells
          pts={linePts(CARD.x + 24, BTN.y + BTN.h, CARD.x + CARD.w - 24, BTN.y + BTN.h, 60)}
          fill={C.accent}
        />
        <PxRect x={BTN.x} y={BTN.y - 36} w={48} h={12} fill={C.accent} />
        <PxRect x={BTN.x} y={BTN.y - 48} w={12} h={36} fill={C.accent} />
        <PxRect x={BTN.x + 36} y={BTN.y - 48} w={12} h={36} fill={C.accent} />
      </g>

      {/* Two discs make the lens rim: a dark ring with a light one inside it. */}
      <PxDisc cx={lx} cy={ly} r={lr + PX * 2} fill={C.ink} />
      <PxDisc cx={lx} cy={ly} r={lr + PX} fill={C.sheet} />
      <g clipPath={`url(#${clip})`}>
        <rect
          x={lx - lr - 24}
          y={ly - lr - 24}
          width={lr * 2 + 48}
          height={lr * 2 + 48}
          fill={C.sheet}
          shapeRendering="crispEdges"
        />
        <g transform={`translate(${lx} ${ly}) scale(${K}) translate(${-lx} ${-ly})`}>
          <UICard dx={dx} dy={dy} />
        </g>
        {grid}
      </g>
    </>
  );
}

export function InterfacesMotion({ label, className }: { label: string; className?: string }) {
  return (
    <MotionStage
      width={W}
      height={H}
      total={total}
      still={STILL}
      label={label}
      className={className}
      render={(T) => <InterfacesPiece T={T} />}
    />
  );
}
