import type { Metadata } from "next";
import { caseStudies, site } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref, mailtoHref } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Case Studies",
  description: caseStudies.intro,
  alternates: { canonical: "/case-studies/" },
  openGraph: {
    url: `${site.url}/case-studies/`,
    title: `Case Studies — ${site.name}`,
    description: caseStudies.intro,
  },
  // Nothing to index until there is real work here.
  robots: { index: false, follow: true },
};

/**
 * Placeholder for a studio with no shipped projects yet.
 *
 * Deliberately does not invent sample work — fabricated case studies would be
 * a liability the moment a client asked about one. Replace this file with a
 * real index once the first projects ship.
 */
export default function CaseStudiesPage() {
  return (
    <section className="px-4 pb-24 pt-36 sm:pb-28 sm:pt-44">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-signal-blue-text">
            {caseStudies.eyebrow}
          </p>

          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.5rem,5.5vw,3.5rem)] leading-[1.03] text-ink-black">
            {caseStudies.heading}
          </h1>

          <p className="mt-6 max-w-xl text-body text-smoke">{caseStudies.intro}</p>
          <p className="mt-5 max-w-xl text-body text-smoke">{caseStudies.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href={mailtoHref()} withArrow>
              {caseStudies.ctaLabel}
            </PillButton>
            <PillButton href={bookingHref()} variant="ghost">
              Book a Call
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
