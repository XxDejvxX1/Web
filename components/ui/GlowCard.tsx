import type { ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The system's depth language: a pale 5px ring rather than a drop shadow
 * (DESIGN.md — "Soft Glow Ring ... creates the sense of light emanating from
 * the element"). The ring needs margin around the card to be visible, so
 * parents leave gap space for it.
 */
export function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div
      className={[
        "rounded-card bg-paper-white shadow-glow",
        "transition-shadow duration-300",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
