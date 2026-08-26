import type { Metadata } from "next";
import { caseStudies, site } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { PillButton } from "@/components/ui/PillButton";
import { PixelImage } from "@/components/ui/PixelImage";
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
  // Placeholder content — must not be indexed until it describes real work.
  robots: { index: false, follow: true },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="px-4 pb-16 pt-36 sm:pt-44">
        <div className="mx-auto max-w-[var(--container-page)]">
          <Reveal>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-signal-blue-text">
              {caseStudies.eyebrow}
            </p>

            <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.5rem,5.5vw,3.5rem)] leading-[1.03] text-ink-black">
              {caseStudies.heading}
            </h1>

            <p className="mt-6 max-w-xl text-body text-smoke">{caseStudies.intro}</p>

            {/*
              Deliberately loud and hard to miss. This page ships invented
              figures; nobody should be able to skim it and mistake them for
              real results.
            */}
            <p className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-4 text-body-sm text-amber-900">
              <Icon name="shield" size={18} className="mt-0.5 shrink-0" />
              <span>{caseStudies.placeholderNotice}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {caseStudies.projects.map((project) => (
        <article key={project.slug} className="px-4 pb-20">
          <div className="mx-auto max-w-[var(--container-page)]">
            <Reveal>
              <div className="overflow-hidden rounded-panel">
                <PixelImage
                  src={project.cover}
                  alt={project.coverAlt}
                  width={1600}
                  height={762}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="w-full"
                />
              </div>
            </Reveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] text-ink-black">
                  {project.title}
                </h2>

                <p className="mt-5 text-body text-graphite">{project.summary}</p>

                <h3 className="mt-10 text-heading-sm font-semibold text-ink-black">
                  The problem
                </h3>
                <p className="mt-3 text-body-sm text-smoke">{project.challenge}</p>

                <h3 className="mt-8 text-heading-sm font-semibold text-ink-black">
                  What we built
                </h3>
                <p className="mt-3 text-body-sm text-smoke">{project.solution}</p>

                <figure className="mt-10 border-l-2 border-signal-blue/40 pl-5">
                  <blockquote className="font-display text-[1.5rem] leading-snug text-ink-black">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-caption text-smoke">
                    {project.testimonial.attribution}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-card bg-paper-white p-7 shadow-glow">
                  <dl className="flex flex-col gap-5">
                    <div>
                      <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                        Category
                      </dt>
                      <dd className="mt-1.5 text-body-sm text-graphite">
                        {project.category}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                        Location
                      </dt>
                      <dd className="mt-1.5 text-body-sm text-graphite">
                        {project.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                        Year
                      </dt>
                      <dd className="mt-1.5 text-body-sm text-graphite">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                        Services
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-pill bg-ash-mist px-3 py-1 text-caption font-medium text-graphite"
                          >
                            {service}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7 border-t border-black/5 pt-6">
                    <p className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                      Results
                    </p>
                    <dl className="mt-4 flex flex-col gap-4">
                      {project.results.map((result) => (
                        <div key={result.label}>
                          <dd className="font-display text-heading leading-none text-ink-black">
                            {result.value}
                          </dd>
                          <dt className="mt-1.5 text-caption text-smoke">{result.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Stacked rather than a grid: these are wide screenshots at
                differing aspect ratios, and a three-up row would shrink them
                past the point of being readable. */}
            <ul className="mt-14 flex flex-col gap-6">
              {project.gallery.map((shot, index) => (
                <li key={shot.src}>
                  <Reveal delay={index * 60}>
                    <figure className="overflow-hidden rounded-card shadow-glow">
                      <PixelImage
                        src={shot.src}
                        alt={shot.alt}
                        width={1200}
                        height={640}
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className="w-full"
                      />
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}

      <section className="px-4 pb-24 sm:pb-28">
        <div className="mx-auto max-w-[var(--container-page)]">
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-panel bg-paper-white p-8 shadow-glow sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05] text-ink-black">
                  {caseStudies.ctaHeading}
                </h2>
                <p className="mt-3 text-body text-smoke">{caseStudies.ctaBody}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <PillButton href={mailtoHref()} withArrow>
                  {caseStudies.ctaLabel}
                </PillButton>
                <PillButton href={bookingHref()} variant="ghost">
                  Book a Call
                </PillButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
