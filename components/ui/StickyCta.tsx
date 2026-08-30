"use client";

import { useEffect, useState } from "react";
import { stickyCta } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";

/**
 * A persistent way to act, for the stretch of the page that had none.
 *
 * The nav is deliberately `absolute` (see components/site/Nav.tsx — it scrolls
 * away so it can stay fully transparent over the hero), which means the only
 * route to Contact leaves the viewport at around 800px and never comes back.
 * This restores one, without reintroducing the fixed bar that transparency
 * decision was avoiding.
 *
 * It appears once the hero is behind the visitor and hides again once the
 * closing CTA is on screen — two buttons saying "Start a Project" stacked in
 * one viewport is a worse ending than one.
 */

/** Watches the closing CTA so the pill can get out of its way. */
const CLOSE_ID = "final-cta";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let atClose = false;

    /*
     * Roughly one viewport: the hero is full-bleed, so this is the point its own
     * CTA has left the screen. Cached rather than read per scroll event — the
     * viewport height cannot change without a resize firing.
     */
    let threshold = window.innerHeight * 0.9;

    const sync = () => setVisible(window.scrollY > threshold && !atClose);

    const onResize = () => {
      threshold = window.innerHeight * 0.9;
      sync();
    };

    const close = document.getElementById(CLOSE_ID);
    const observer = close
      ? new IntersectionObserver(
          ([entry]) => {
            atClose = entry.isIntersecting;
            sync();
          },
          // Fire a little before the card is fully in view, so the handover
          // happens while the visitor is still reading toward it.
          { rootMargin: "0px 0px -15% 0px" }
        )
      : null;

    if (close && observer) observer.observe(close);

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      // Hidden means hidden: without `inert` the pill stays in the tab order
      // while it is transparent, which is the same defect the footer had.
      inert={!visible}
      className={[
        "fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <PillButton href={stickyCta.href} withArrow>
        {stickyCta.label}
      </PillButton>
    </div>
  );
}
