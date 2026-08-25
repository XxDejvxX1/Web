# Uebi

Marketing site for **Uebi**, a web design and development studio.

Next.js 16 (App Router) exported to static HTML, styled with Tailwind CSS v4 against the
design system in [`DESIGN.md`](DESIGN.md). Deploys to Cloudflare's free tier.

---

## Before you launch

Open [`content/site.ts`](content/site.ts) and replace everything marked `TODO`:

| Value | What it is |
| --- | --- |
| `site.email` | The real business inbox. Every CTA funnels here. |
| `site.bookingUrl` | Cal.com / Calendly link. Until it is set, "Book a Call" falls back to email. |
| `site.url` | Your real domain. Drives metadata, canonical URLs, the sitemap and the social card. |
| `site.socials` | Add real profiles or delete the empty ones — blank entries are skipped automatically. |

All site copy lives in that one file. You should never need to open a component to fix a
typo or reword a heading.

---

## Local development

Requires **Node 22+** (see `.nvmrc`). npm 12 will not run on Node 20 at all.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `out/` |
| `npm run preview` | Serves the built `out/` on http://localhost:4321, exactly as Cloudflare will |
| `npm run images` | Regenerates `public/images/` from `assets/source/` |
| `npm run typecheck` | TypeScript, no emit |

---

## Images

Source PNGs live in `assets/source/` and are **not** served. `npm run images` converts them
into `public/images/*.webp` plus the favicon and social card.

That step takes the artwork from **9.4 MB to under 1 MB** — the site would feel broken
without it. Output is committed, so the Cloudflare build stays a plain `next build`.

Re-run it only when you change a source image:

```bash
npm run images
```

Two details worth knowing before you touch `scripts/optimize-images.mjs`:

- Downscaling uses **lanczos3**, not nearest-neighbour. Nearest on a non-integer downscale
  makes pixel art shimmer.
- The hero and feature-band art are narrower than a large monitor, so they upscale. The
  `.pixelated` CSS class keeps those crisp instead of letting the browser blur them. Grid
  art renders at or below native size and deliberately does not use it.

---

## Deploying to Cloudflare

Recommended path — **Cloudflare Pages + GitHub**, which redeploys on every push:

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pick the repository and use these settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | None |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Environment variable | `NODE_VERSION` = `22` |

4. Save and deploy.

> **The `NODE_VERSION` variable is not optional.** Cloudflare defaults to an older Node than
> this project supports, and the build fails without it.

To use a custom domain, add it under the project's **Custom domains** tab and point the DNS
at Cloudflare.

`wrangler.jsonc` is included if you would rather deploy from your machine with
`npx wrangler deploy`. Both routes are free for a static site.

---

## Project structure

```
app/                  routes, layout, global CSS, sitemap, robots
  contact/            the contact page
  case-studies/       placeholder until real projects ship (noindex)
components/
  site/               Nav, Footer
  sections/           one file per page section
  ui/                 buttons, cards, icons, typewriter, scroll reveal
content/site.ts       ALL site copy
lib/navigation.ts     nav items and the mailto/booking helpers
assets/source/        original artwork (not served)
public/images/        optimized WebP output (committed)
scripts/              image pipeline, static preview server, build fixup
```

### Two layout patterns worth knowing

**The nav is `absolute`, not fixed.** It scrolls away with the hero, which is
what lets it stay fully transparent — a fixed transparent bar would leave white
links stranded over the white canvas further down. It switches to dark text on
routes without a dark hero; that list is `LIGHT_NAV_ROUTES` in
`components/site/Nav.tsx`.

**The footer is revealed, not scrolled to.** It is pinned to the bottom of the
viewport behind the page, and the content wrapper in `app/layout.tsx` carries a
matching `margin-bottom: var(--footer-height)`. That margin is empty scroll
distance, so the last stretch of scrolling slides the content up and uncovers
the footer. This only works while the wrapper stays **opaque**, sits **above**
the footer in the stacking order, and keeps `min-h-screen` — drop any of the
three and the footer bleeds through the page. Change its height via
`--footer-height` in `app/globals.css`; the margin follows automatically.

### Adding a page later

The site is built so sections can graduate into their own routes without rework. Every
section component is standalone and route-agnostic. To turn Services into `/services`:

1. Create `app/services/page.tsx` and import the existing `<Services />` component.
2. Change that item's `href` in `lib/navigation.ts` from `/#services` to `/services/`.
3. Add the route to `app/sitemap.ts`.

Nothing else moves.

---

## Notes on the build

`npm run build` runs `next build` and then `scripts/flatten-rsc-payloads.mjs`.

That second step works around a Next.js 16 static-export quirk: for nested routes it writes
the client prefetch payload to `out/contact/__next.contact/__PAGE__.txt`, but the router
requests it dot-flattened as `/contact/__next.contact.__PAGE__.txt`. On a static host there
is nothing to rewrite the path, so without the fixup every page load logs a 404 and
navigating to `/contact` falls back to a full page reload. The script copies each payload to
the filename the router actually asks for. Remove it if a future Next release fixes this.

---

## Accessibility

The site targets WCAG 2.1 AA.

One thing to preserve if you edit colours: `DESIGN.md`'s accent `#007aff` measures **4.02:1**
on white, below the 4.5:1 that normal-size text requires. It remains the brand colour for
button fills, 36px+ display type and icons — all of which only need 3:1 — while a darker
`--color-signal-blue-text` (`#0062cc`, 5.8:1) carries small text such as eyebrow labels and
inline links. Use `text-signal-blue-text` for any new body-size blue text.
