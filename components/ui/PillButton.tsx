import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icons";

/**
 * Every interactive element in this system is a full 50px pill (DESIGN.md:
 * "Make every button a full pill at 50px border-radius with no exception").
 *
 * The two `*OnImage` variants exist because DESIGN.md forbids #000000 text on a
 * chromatic background — over the hero and feature-band art, buttons switch to
 * white fills and white outlines instead.
 */
type Variant = "primary" | "ghost" | "onImage" | "ghostOnImage" | "glass";

const variants: Record<Variant, string> = {
  /*
   * The fill is the darker `signal-blue-text`, not the `#007aff` accent.
   *
   * The accent is safe as a *fill* — a non-text component only needs 3:1. The
   * white label sitting on that fill is text, and at 14px/600 it needs 4.5:1;
   * white on #007aff measures 4.02:1 and fails. #0062cc takes the same pair to
   * 5.80:1, and the hover to 7.04:1. Nothing else about the accent changes.
   */
  primary:
    "bg-signal-blue-text text-paper-white shadow-button hover:bg-[#0056b3] active:translate-y-px",
  ghost:
    "border-[1.5px] border-ink-black text-ink-black hover:bg-ink-black hover:text-paper-white",
  onImage:
    "bg-paper-white text-ink-black shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] hover:bg-ash-mist active:translate-y-px",
  ghostOnImage:
    "border-[1.5px] border-white/45 text-paper-white backdrop-blur-sm hover:bg-white/15 hover:border-white/70",
  /*
   * Frosted glass over artwork: a translucent white fill plus a blur of what is
   * behind it, with a bright inner top edge to suggest a lit bevel.
   */
  glass:
    "bg-white/15 text-paper-white border border-white/30 backdrop-blur-md " +
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_8px_28px_-14px_rgba(0,0,0,0.6)] " +
    "hover:bg-white/25 hover:border-white/45 active:translate-y-px",
};

/**
 * Sizes are a prop rather than an overridable className: Tailwind resolves
 * conflicting utilities by stylesheet order, not by string order, so passing
 * `px-5` to override `px-6` would win or lose unpredictably.
 */
const sizes = {
  sm: "px-5 py-2.5 text-body-sm",
  md: "px-6 py-3.5 text-body-sm",
} as const;

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  className?: string;
};

export function PillButton({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
}: PillButtonProps) {
  const classes = [
    "group inline-flex items-center gap-2 rounded-pill",
    "font-semibold whitespace-nowrap",
    "transition-all duration-200 ease-out",
    sizes[size],
    variants[variant],
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {withArrow && (
        <Icon
          name="arrowRight"
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  // mailto: and external URLs must not go through the client-side router.
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
