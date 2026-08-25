/**
 * Zero-dependency static server for ./out, so the real exported build can be
 * checked exactly as Cloudflare will serve it. `next start` does not work with
 * output: "export".
 *
 * Usage: npm run preview  (after npm run build)
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("out");
const PORT = Number(process.env.PORT) || 4321;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

async function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const target = path.join(ROOT, path.normalize(clean));
  // Containment check: refuse anything that resolves outside ./out.
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;

  try {
    const info = await stat(target);
    if (info.isDirectory()) return path.join(target, "index.html");
    return target;
  } catch {
    // Bare route with no trailing slash, e.g. /contact
    try {
      await stat(`${target}.html`);
      return `${target}.html`;
    } catch {
      return null;
    }
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url || "/");

  if (!file) {
    const notFound = path.join(ROOT, "404.html");
    try {
      res.writeHead(404, { "content-type": MIME[".html"] });
      res.end(await readFile(notFound));
    } catch {
      res.writeHead(404, { "content-type": MIME[".txt"] });
      res.end("404");
    }
    return;
  }

  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500, { "content-type": MIME[".txt"] });
    res.end("500");
  }
}).listen(PORT, () => {
  console.log(`Serving ./out on http://localhost:${PORT}`);
});
