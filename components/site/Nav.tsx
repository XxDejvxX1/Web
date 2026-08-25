"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/navigation";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { PillButton } from "@/components/ui/PillButton";

/**
 * Floating capsule rather than a full-width bar (DESIGN.md — "Floating Nav
 * Capsule ... replaces a traditional full-width header bar"). It sits over the
 * hero art, where the white pill reads cleanly against the deep blue sky.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet on navigation — the landing-page links are anchors, which
  // do not unmount anything on their own.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the sheet is open, hold the page still and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
      <div className="mx-auto max-w-[var(--container-page)]">
        <div className="flex items-center justify-between gap-4 rounded-nav bg-paper-white/95 py-2 pl-3 pr-2 shadow-glow backdrop-blur-md">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2"
            aria-label={`${site.name} — home`}
          >
            <img
              src="/images/brand-mark.webp"
              alt=""
              width={128}
              height={128}
              className="size-8 rounded-[9px]"
            />
            <span className="flex flex-col leading-none">
              <span className="text-heading-sm font-semibold uppercase tracking-[0.09em] text-ink-black">
                {site.name}
              </span>
              <span className="mt-1 hidden text-micro uppercase tracking-[0.14em] text-smoke sm:block">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-body-sm font-medium text-ink-black transition-opacity duration-200 hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <PillButton href="/contact/" size="sm">
              Start a Project
            </PillButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-xl text-ink-black transition-colors hover:bg-ash-mist md:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="mt-2 overflow-hidden rounded-nav bg-paper-white p-3 shadow-glow md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-body font-medium text-ink-black transition-colors hover:bg-ash-mist"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 px-1 pb-1">
              <PillButton href="/contact/" className="w-full justify-center">
                Start a Project
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
