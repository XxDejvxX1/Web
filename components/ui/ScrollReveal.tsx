import type { CSSProperties, ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Matches the container's border-radius so the clip keeps rounded corners. */
  radius?: number;
  className?: string;
};

/**
 * Scroll-linked curtain reveal — the same clipPath effect as motion.dev's
 * scroll image reveal, driven by a CSS scroll-progress timeline instead of a
 * JS library. See `.scroll-reveal` in globals.css for the timing.
 *
 * No "use client" and no runtime: this stays a server component, and the whole
 * effect costs nothing in JS.
 *
 * Firefox has not shipped scroll-driven animations, so the @supports guard
 * leaves the panel simply visible there rather than animating it.
 */
export function ScrollReveal({
  children,
  radius = 40,
  className = "",
}: ScrollRevealProps) {
  return (
    <div
      className={["scroll-reveal", className].filter(Boolean).join(" ")}
      style={{ "--scroll-reveal-radius": `${radius}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
