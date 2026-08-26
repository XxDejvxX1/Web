"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Matches the container's border-radius so the clip keeps rounded corners. */
  radius?: number;
  className?: string;
};

/**
 * Scroll-linked curtain reveal, per motion.dev's scroll image reveal effect.
 *
 * clipPath opens from a closed centre line to the full box as the element
 * travels from entering the viewport to sitting at its middle. `round` is
 * carried in the inset so the panel keeps its rounded corners while opening —
 * a plain inset() would square them off mid-animation.
 *
 * Without JS the inline clipPath would leave this closed, i.e. invisible, so
 * layout.tsx ships a <noscript> rule that forces `clip-path: none`.
 */
export function ScrollReveal({
  children,
  radius = 40,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(0% 50% 0% 50% round ${radius}px)`,
      `inset(0% 0% 0% 0% round ${radius}px)`,
    ]
  );

  return (
    <motion.div
      ref={ref}
      style={{ clipPath }}
      className={["scroll-reveal", className].filter(Boolean).join(" ")}
    >
      {children}
    </motion.div>
  );
}
