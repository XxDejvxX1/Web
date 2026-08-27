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
 *   3. The sources are 1080px square for slots that render at 176 CSS px.
 *      Downscaling to 600 is still comfortably past 2x on a retina screen and
 *      is most of the size win: the densest clip goes 2537 KB -> ~317 KB.
 */
import { spawnSync } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const SRC = "assets/source/motion";
const VIDEO_OUT = "public/videos";
/** Poster frames land here for `npm run images` to pick up. */
const FRAME_OUT = "assets/source/motion/frames";

/** Key pure black back to transparent. See note 1 above before loosening this. */
const KEY = "colorkey=0x000000:0.08:0.06";

const CLIPS = [
  /*
   * strategy and care carry a drifting field of small bright dots, which is
   * noise as far as the codec is concerned and costs far more than their
   * sparse look suggests — at crf 32 they were 740 KB and 550 KB against
   * 150 KB for the much busier code clip. A slightly higher crf buys most of
   * that back with nothing visible on their thin linework.
   */
  { file: "StrategyAndDesign.mp4", out: "strategy", width: 600, crf: 34, poster: 6.0 },
  { file: "PixelPerfectInterfaces.mp4", out: "interfaces", width: 600, crf: 32, poster: 4.0 },
  { file: "ModernPerformantCode.mp4", out: "code", width: 600, crf: 32, poster: 2.0 },
  { file: "LaunchAndOngoingCare.mp4", out: "care", width: 600, crf: 34, poster: 6.0 },
];

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

  for (const { file, out, width, crf, poster } of CLIPS) {
    if (!present.has(file)) {
      console.warn(`skipping ${out}: ${path.join(SRC, file)} not found`);
      continue;
    }

    const src = path.join(SRC, file);
    const webm = path.join(VIDEO_OUT, `${out}.webm`);
    const frame = path.join(FRAME_OUT, `${out}.png`);

    // scale=W:-2 keeps the source ratio and rounds the height to an even
    // number, which yuv420p chroma subsampling requires.
    const chain = `${KEY},scale=${width}:-2`;

    run([
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", src,
      "-vf", `${chain},format=yuva420p`,
      "-c:v", "libvpx-vp9",
      "-pix_fmt", "yuva420p",
      "-auto-alt-ref", "0",
      "-b:v", "0",
      "-crf", String(crf),
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
      "-vf", chain,
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
      width: `${width}w`,
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
