import { site } from "@/content/site";

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Single source of truth for the nav, used by both the desktop capsule and the
 * mobile sheet.
 *
 * These are anchors into the landing page today. When a section grows into its
 * own route, create app/<name>/page.tsx, import the same section component, and
 * change the href here — nothing else needs to move.
 */
export const navItems: NavItem[] = [
  { label: "Product", href: "/" },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "Contact", href: "/contact/" },
];

/** Pre-fills a project enquiry so nobody has to stare at a blank email. */
export function mailtoHref(): string {
  const subject = encodeURIComponent(`Project enquiry — ${site.name}`);
  const body = encodeURIComponent(
    [
      "Hi Uebi,",
      "",
      "A bit about the project:",
      "",
      "- What we do:",
      "- What we need:",
      "- Deadline:",
      "- Rough budget:",
      "",
      "Thanks!",
    ].join("\n")
  );

  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/**
 * Falls back to email until a scheduling link is configured, so the button is
 * never a dead end.
 */
export function bookingHref(): string {
  return site.bookingUrl || mailtoHref();
}
