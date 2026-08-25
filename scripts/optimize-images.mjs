/**
 * Turns the ~9.4 MB of source PNGs in assets/source/ into web-ready assets.
 *
 * Run with `npm run images`. Output is committed, so the Cloudflare build stays
 * a plain `next build` with no image step and no sharp dependency at build time.
 *
 * Two things matter for pixel art specifically:
 *   1. Downscale with lanczos3 (sharp's default). Nearest-neighbour on a
 *      non-integer downscale makes pixel art shimmer and alias badly.
 *      Upscaling is handled in CSS via `image-rendering: pixelated`, not here.
 *   2. Hard-edged art rings under aggressive lossy compression, so quality is
 *      set per asset rather than globally — highest for HeroWeb, which contains
 *      small UI text that has to stay legible.
 */
import sharp from "sharp";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/source";
const IMG_OUT = "public/images";
const APP_OUT = "app";

/** Art assets -> WebP in public/images/ */
const ART = [
  // Rendered full-bleed and upscaled on wide screens; CSS keeps it crisp.
  { file: "HeroBackground.png", out: "hero-background", width: 1536, quality: 84 },
  // Contains small UI text in the mockup — needs the highest quality here.
  // Alpha matters: the rounded corners are transparent, so it needs no frame.
  { file: "HeroWeb.png", out: "hero-web", width: 1536, quality: 90 },
  { file: "CardBackground.png", out: "card-background", width: 1536, quality: 84 },
  /*
   * Panoramic band revealed beneath the page on scroll.
   *
   * Cropped to the top 520 of 724 rows. The reveal should stop shortly past the
   * "Bye!" bubble (which ends at 48% of the height) rather than travelling the
   * whole image, and with object-cover the visible slice is governed by the
   * aspect ratio, not by the panel height — so the trim has to happen here.
   * 520 clears the robot; cutting nearer the bubble would slice it in half.
   */
  { file: "Footer.png", out: "footer", width: 2172, quality: 84, crop: { top: 0, height: 520 } },
  // Transparent art, rendered at or below native size.
  { file: "GridVertical.png", out: "grid-vertical", width: 720, quality: 88 },
  { file: "Grid1.png", out: "grid-1", width: 800, quality: 88 },
  { file: "Grid2.png", out: "grid-2", width: 800, quality: 88 },
  { file: "Grid3.png", out: "grid-3", width: 800, quality: 88 },
  // Brand mark for the nav capsule and footer.
  { file: "FavIcon.png", out: "brand-mark", width: 128, quality: 90 },
];

/**
 * App Router file conventions. Next auto-wires the <link rel="icon"> and
 * og:image tags from these filenames, so no manual <head> work is needed.
 */
const ICONS = [
  { file: "FavIcon.png", out: "icon.png", width: 512 },
  { file: "FavIcon.png", out: "apple-icon.png", width: 180 },
];

const KB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

async function run() {
  await mkdir(IMG_OUT, { recursive: true });

  const rows = [];
  let before = 0;
  let after = 0;

  for (const { file, out, width, quality, crop } of ART) {
    const src = path.join(SRC, file);
    const dest = path.join(IMG_OUT, `${out}.webp`);

    const meta = await sharp(src).metadata();
    // Never upscale: if the source is already narrower, keep it as-is.
    const target = Math.min(width, meta.width);

    const pipeline = sharp(src);
    if (crop) {
      pipeline.extract({
        left: 0,
        top: crop.top,
        width: meta.width,
        height: Math.min(crop.height, meta.height - crop.top),
      });
    }

    await pipeline
      .resize({ width: target, kernel: "lanczos3", withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(dest);

    const srcSize = await sizeOf(src);
    const outSize = await sizeOf(dest);
    before += srcSize;
    after += outSize;

    rows.push({
      asset: `${file} -> ${out}.webp`,
      dims: `${meta.width}x${meta.height} -> ${target}w`,
      from: KB(srcSize),
      to: KB(outSize),
      saved: `${(100 - (outSize / srcSize) * 100).toFixed(1)}%`,
    });
  }

  for (const { file, out, width } of ICONS) {
    await sharp(path.join(SRC, file))
      .resize({ width, height: width, kernel: "lanczos3" })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(APP_OUT, out));
  }

  /*
   * Social card, cropped from the hero art to 1200x630.
   *
   * JPEG, not PNG: the same crop as PNG lands around 1.3 MB, and several
   * platforms (WhatsApp most strictly, at ~300 KB) silently drop previews over
   * their limit. Palette quantisation is not an option either — the gradient
   * sky bands badly at 256 colours.
   */
  await sharp(path.join(SRC, "HeroBackground.png"))
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre", kernel: "lanczos3" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(APP_OUT, "opengraph-image.jpg"));

  console.table(rows);
  console.log(
    `\nArt total: ${KB(before)} -> ${KB(after)}  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`
  );
  console.log("Icons + OG image written to app/");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
