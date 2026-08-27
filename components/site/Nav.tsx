"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";
import { site } from "@/content/site";

/**
 * Routes whose hero is dark artwork, so the nav sets itself in white. Every
 * other route sits on the pale canvas and needs ink.
 */
const LIGHT_NAV_ROUTES = ["/"];

/*
 * Every nav target measured 31.5px tall on mobile, well under the 44px minimum
 * for a comfortable tap. Rather than pad the pills — which would repaint the
 * active pill noticeably taller — this stretches an invisible ::before box to
 * 44px, centred on the link. The painted pill is unchanged; only the hit area
 * grows. Siblings sit side by side, so the vertical growth never overlaps them.
 */
const HIT_AREA =
  "relative before:absolute before:inset-x-0 before:top-1/2 before:h-11 before:-translate-y-1/2 before:content-['']";

const tones = {
  light: {
    brand: "text-paper-white",
    link: "text-paper-white/75 hover:text-paper-white",
    active: "bg-white/15 text-paper-white",
  },
  dark: {
    brand: "text-ink-black",
    link: "text-graphite hover:text-ink-black",
    active: "bg-black/[0.07] text-ink-black",
  },
} as const;

export function Nav() {
  const pathname = usePathname();
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const tone = tones[LIGHT_NAV_ROUTES.includes(normalized) ? "light" : "dark"];

  /*
   * Absolute, not fixed — the nav scrolls away with the hero, which is what
   * lets it stay fully transparent. A fixed transparent bar would put white
   * links over the white canvas further down the page and disappear.
   */
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-5 py-6 sm:px-8 sm:py-7">
      <div className="mx-auto flex max-w-[var(--container-page)] items-center justify-between gap-4">
        <Link
          href="/"
          className={`flex items-center gap-2.5 rounded-xl ${HIT_AREA}`}
          aria-label={`${site.name} — home`}
        >
          <img
            src="/images/brand-mark.webp"
            alt=""
            width={128}
            height={128}
            className="size-8 rounded-[9px] sm:size-9"
          />
          <span
            className={`text-heading-sm font-semibold tracking-[-0.01em] ${tone.brand}`}
          >
            {site.name}
          </span>
        </Link>

        {/* Three links fit inline even at 375px, so there is no hamburger. */}
        <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1.5">
          {navItems.map((item) => {
            const target = item.href.endsWith("/") ? item.href : `${item.href}/`;
            const isCurrent = normalized === target;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={[
                  "rounded-pill px-2.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 sm:px-4 sm:text-body-sm",
                  HIT_AREA,
                  isCurrent ? tone.active : tone.link,
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
