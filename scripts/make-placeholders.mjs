/**
 * Generates placeholder plates for sections that have no real photography yet.
 * Run with `npm run placeholders`.
 *
 * These are deliberately abstract gradients with a picture glyph — never
 * anything that could be mistaken for a real photograph. Replace the files in
 * public/images/<dir>/ with real images and delete this script once the shoot
 * is done.
 *
 * No text is drawn: SVG text rendering depends on system fonts being visible to
 * sharp, which is unreliable on Windows. Everything here is paths and shapes.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_ROOT = "public/images";

/** Palette pulled from the pixel art so the plates sit alongside it. */
const PALETTES = [
  ["#4a7ff2", "#7b7ed8", "#c98ab5"],
  ["#5b8ef4", "#8f86dd", "#e8a87c"],
  ["#3f6fe0", "#6f7fd6", "#b98fc4"],
  ["#6a93f0", "#9b8ada", "#e0a49a"],
];

function plate(width, height, [a, b, c], seed) {
  // A few soft blobs so each plate differs without looking like a photo.
  const blobs = Array.from({ length: 3 }, (_, i) => {
    const t = (seed + i * 37) % 100;
    const cx = (15 + ((t * 7) % 70)) / 100;
    const cy = (20 + ((t * 13) % 60)) / 100;
    const r = (18 + ((t * 3) % 22)) / 100;
    return `<circle cx="${(cx * width).toFixed(0)}" cy="${(cy * height).toFixed(0)}" r="${(r * Math.min(width, height)).toFixed(0)}" fill="rgba(255,255,255,0.07)"/>`;
  }).join("");

  const g = Math.min(width, height);
  const iconSize = Math.round(g * 0.16);
  const ix = Math.round(width / 2 - iconSize / 2);
  const iy = Math.round(height / 2 - iconSize / 2);
  const s = iconSize / 24;

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="55%" stop-color="${b}"/>
      <stop offset="100%" stop-color="${c}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  ${blobs}
  <g transform="translate(${ix} ${iy}) scale(${s})" fill="none"
     stroke="rgba(255,255,255,0.85)" stroke-width="1.4"
     stroke-linecap="round" stroke-linejoin="round">
    <rect x="1.5" y="3.5" width="21" height="17" rx="2.5"/>
    <circle cx="8" cy="9.5" r="1.8"/>
    <path d="M2.5 17.5 8.5 12l4 3.5 3.5-2.5 5 4.5"/>
  </g>
</svg>`);
}

const TARGETS = [
  { name: "teuta-cover", dir: "case-studies", width: 1600, height: 900, palette: 0 },
  { name: "teuta-1", dir: "case-studies", width: 900, height: 675, palette: 1 },
  { name: "teuta-2", dir: "case-studies", width: 900, height: 675, palette: 2 },
  { name: "teuta-3", dir: "case-studies", width: 900, height: 675, palette: 3 },

  // One per process step, until real screenshots exist.
  { name: "process-1", dir: "process", width: 1000, height: 750, palette: 0 },
  { name: "process-2", dir: "process", width: 1000, height: 750, palette: 1 },
  { name: "process-3", dir: "process", width: 1000, height: 750, palette: 2 },
  { name: "process-4", dir: "process", width: 1000, height: 750, palette: 3 },
];

async function run() {
  for (const [i, t] of TARGETS.entries()) {
    const outDir = path.join(OUT_ROOT, t.dir);
    await mkdir(outDir, { recursive: true });

    const dest = path.join(outDir, `${t.name}.webp`);
    await sharp(plate(t.width, t.height, PALETTES[t.palette], i * 17 + 5))
      .webp({ quality: 82, effort: 6 })
      .toFile(dest);

    console.log(`wrote ${dest}  (${t.width}x${t.height})`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
