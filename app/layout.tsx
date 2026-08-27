import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EdgeLines } from "@/components/ui/EdgeLines";
import { meta, site } from "@/content/site";
import "./globals.css";

/**
 * Self-hosted at build time by next/font, so there is no render-blocking
 * request to Google and no layout shift from a late swap.
 *
 * Playfair Display is DESIGN.md's named substitute for Perfectly Nineties, and
 * is loaded at weight 400 only — the doc uses it for display headings alone.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: meta.title,
    template: `%s — ${site.name}`,
  },
  description: meta.description,
  applicationName: site.name,
  keywords: [
    "web design",
    "web development",
    "Next.js development",
    "web design studio",
    "custom websites",
    "web applications",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: meta.title,
    description: meta.description,
    // Pages that are not the homepage override this — otherwise every URL
    // would advertise itself to crawlers and social cards as "/".
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {/*
          .reveal starts at opacity 0 and is switched on by IntersectionObserver.
          Without this, a visitor with JS disabled would get a blank page.
        */}
        <noscript>
          {/* .scroll-reveal needs no entry here — it is pure CSS and works
              without JS on its own. */}
          <style>{`.reveal, .notification-pop { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-ink-black focus:px-5 focus:py-3 focus:text-body-sm focus:font-semibold focus:text-paper-white"
        >
          Skip to content
        </a>

        {/*
          Everything above the reveal footer lives in this wrapper. It must stay
          opaque and above the footer in the stacking order, because the footer
          is pinned behind it; the bottom margin is the extra scroll distance
          that uncovers the footer at the end of the page.
        */}
        {/* min-h-screen matters on short routes: without it the wrapper stops
            above the fold and the pinned footer shows through before the
            visitor has scrolled anywhere. */}
        <div className="relative z-10 mb-[var(--footer-height)] flex min-h-screen flex-col bg-ash-mist">
          <Nav />
          {/* flex-1 pushes EdgeLines to the bottom of the wrapper. Without it a
              short route leaves the closing hairlines floating mid-screen with
              dead canvas beneath them. Nav is absolute, so it stays out of the
              flex flow. */}
          <main id="main" className="flex-1">
            {children}
          </main>
          <EdgeLines />
        </div>

        <Footer />
      </body>
    </html>
  );
}
