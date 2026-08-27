/**
 * Turns the source .mp4s in assets/source/motion/ into web-ready WebM clips
 * with a real alpha channel, plus the transparent poster frame for each one.
 *
 * Run with `npm run video`, then `npm run images` to turn the poster frames
 * into .webp. Output is committed, so the Cloudflare build stays a plain
 * `next build` with no video step and no ffmpeg dependency at build time.
 *
 * Three things matter here:
 *
 *   1. The sources have no alpha. They are H.264, which cannot carry any, so
 *      the transparent background was flattened onto pure black on export.
 *      `colorkey` puts it back by keying that black out. The similarity is
 *      deliberately low (0.08): the artwork contains near-black text bars and
 *      outlines, and a looser key eats into them and leaves them washed out
 *      over the white card. A luma matte is the other obvious way to do this
 *      and it is worse for exactly that reason — measured on the interfaces
 *      clip it left 8299 dark pixels semi-transparent against 1594 here.
 *
 *   2. VP9 is the only web codec that carries alpha in a format anything but
 *      Safari will play, and libvpx needs `-auto-alt-ref 0` before it will
 *      encode `yuva420p` at all. Safari supports neither VP9 alpha nor any
 *      HEVC-with-alpha file this script could produce on Windows, so Safari
 *      holds the poster frame instead — which is why the poster has to be a
 *      real frame of the clip rather than a separate illustration.
 *
 *   3. Resolution and crf are set for linework, not for the byte count. An
 *      earlier pass ran 600px at crf 32-34, which is ample for flat colour but
 *      too coarse for hairline outlines: the encoder kept them on some frames
 *      and dropped them on others, so the shapes visibly shimmered. 900px at
 *      crf 24 holds them steady. The clips are lazy-loaded and never fetched
 *      under reduced motion, so the extra weight costs nothing until a card is
 *      actually on screen.
 */
import { spawnSync } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const SRC = "assets/source/motion";
const VIDEO_OUT = "public/videos";
/** Poster frames land here for `npm run images` to pick up. */
const FRAME_OUT = "assets/source/motion/frames";

/**
 * Key pure black back to transparent.
 *
 * Tolerance 0.01, i.e. almost nothing but true black. Measured across 0.01,
 * 0.03 and 0.06, every tolerance cleared the background completely — zero
 * leftover dark pixels — because the source really was flattened onto pure
 * black, so the tightest key costs nothing and keeps the most linework. The
 * soft 0.02 blend is worth keeping now that alpha is stored losslessly: the
 * anti-aliased edge it produces survives the encode exactly.
 */
const KEY = "colorkey=0x000000:0.01:0.02";

/**
 * 480px is chosen against the lossless cost curve, not against a quality
 * target. The square cards render at 176 CSS px, so 480 is still comfortably
 * past 2x on a retina screen, and it keeps the four clips near 7 MB where 600px
 * would be ~10 MB and 900px ~20 MB.
 */
const WIDTH = 480;

const CLIPS = [
  { file: "StrategyAndDesign.mp4", out: "strategy", poster: 6.0 },
  { file: "PixelPerfectInterfaces.mp4", out: "interfaces", poster: 4.0 },
  { file: "ModernPerformantCode.mp4", out: "code", poster: 2.0 },
  { file: "LaunchAndOngoingCare.mp4", out: "care", poster: 6.0 },
];

/**
 * Poster frames are cut at full width regardless of WIDTH. They compress to a
 * few KB as WebP either way, so there is no reason to hand the stills the
 * video's size budget.
 */
const POSTER_WIDTH = 900;

const KB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

function run(args) {
  const result = spawnSync(ffmpeg, args, { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed:\n${args.join(" ")}\n${result.stderr}`);
  }
}

async function main() {
  await mkdir(VIDEO_OUT, { recursive: true });
  await mkdir(FRAME_OUT, { recursive: true });

  const present = new Set(await readdir(SRC).catch(() => []));
  const rows = [];
  let before = 0;
  let after = 0;

  for (const { file, out, poster } of CLIPS) {
    if (!present.has(file)) {
      console.warn(`skipping ${out}: ${path.join(SRC, file)} not found`);
      continue;
    }

    const src = path.join(SRC, file);
    const webm = path.join(VIDEO_OUT, `${out}.webm`);
    const frame = path.join(FRAME_OUT, `${out}.png`);

    // scale=W:-2 keeps the source ratio and rounds the height to an even
    // number, which yuv420p chroma subsampling requires.
    const chain = `${KEY},scale=${WIDTH}:-2`;

    run([
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", src,
      "-vf", `${chain},format=yuva420p`,
      "-c:v", "libvpx-vp9",
      "-pix_fmt", "yuva420p",
      "-auto-alt-ref", "0",
      /*
       * Lossless, and this is the whole point of the file.
       *
       * VP9 stores alpha as a second compressed plane. Under any lossy setting
       * that plane is requantised independently each frame, and on hairline
       * artwork the edge alpha lands differently every time — so outlines
       * visibly wink on and off. Measured on the interfaces clip, the count of
       * partially transparent pixels swung 39.5% frame to frame at crf 24 and
       * 32.8% with a hard-edged key; lossless brings it to 2.3%, which reads as
       * steady. Raising the bitrate or tightening the key does not help,
       * because neither is the cause.
       */
      "-lossless", "1",
      "-row-mt", "1",
      "-cpu-used", "2",
      "-an",
      webm,
    ]);

    // -ss before -i seeks on keyframes, which is fine and much faster; the
    // clips are 8s loops so the exact frame is not critical.
    run([
      "-hide_banner", "-loglevel", "error", "-y",
      "-ss", String(poster),
      "-i", src,
      "-vf", `${KEY},scale=${POSTER_WIDTH}:-2`,
      "-frames:v", "1",
      "-pix_fmt", "rgba",
      frame,
    ]);

    const srcSize = await sizeOf(src);
    const outSize = await sizeOf(webm);
    before += srcSize;
    after += outSize;

    rows.push({
      clip: `${file} -> ${out}.webm`,
      width: `${WIDTH}w`,
      from: KB(srcSize),
      to: KB(outSize),
      saved: `${(100 - (outSize / srcSize) * 100).toFixed(1)}%`,
      poster: `${out}.png @ ${poster}s`,
    });
  }

  console.table(rows);
  console.log(
    `\nClip total: ${KB(before)} -> ${KB(after)}  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`
  );
  console.log("Poster frames written to assets/source/motion/frames/ — run `npm run images` next.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
