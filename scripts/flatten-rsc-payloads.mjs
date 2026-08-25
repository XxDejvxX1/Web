/**
 * Works around a Next.js 16 static-export mismatch.
 *
 * For a nested route, `next build` writes the route's prefetch payload into a
 * directory:
 *
 *   out/contact/__next.contact/__PAGE__.txt
 *
 * but the client router requests it with the segments dot-joined into a single
 * filename:
 *
 *   GET /contact/__next.contact.__PAGE__.txt  ->  404
 *
 * On a static host there is nothing to rewrite the path, so every page load
 * logs a 404 and clicking through to that route falls back to a full document
 * navigation instead of a client-side one. Root routes are unaffected — Next
 * already writes those flat (out/__next.__PAGE__.txt).
 *
 * This copies each payload to the flat name alongside the directory, leaving
 * the originals in place. Safe to re-run; runs after every build.
 */
import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = "out";

async function walk(dir) {
  let copied = 0;

  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      // Flatten every payload in this directory up to its parent.
      const files = await readdir(full, { withFileTypes: true });

      for (const file of files) {
        if (!file.isFile()) continue;

        const flat = path.join(dir, `${entry.name}.${file.name}`);
        await copyFile(path.join(full, file.name), flat);
        copied += 1;
      }
    }

    copied += await walk(full);
  }

  return copied;
}

async function run() {
  try {
    await stat(ROOT);
  } catch {
    console.error(`flatten-rsc-payloads: ${ROOT}/ not found — run next build first.`);
    process.exit(1);
  }

  const copied = await walk(ROOT);
  console.log(`flatten-rsc-payloads: wrote ${copied} flat prefetch payload(s).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
