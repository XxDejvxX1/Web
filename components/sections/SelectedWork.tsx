import { caseStudies, selectedWork } from "@/content/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PillButton } from "@/components/ui/PillButton";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

const [project] = caseStudies.projects;

/**
 * The one real shipped project, on the homepage.
 *
 * Deliberately narrow in what it borrows: the screenshot, the summary, the meta
 * line and the services. `results` and `testimonial` stay behind on the case
 * study page, which carries its own notice that those figures are placeholders.
 * Putting invented numbers on the homepage would undo exactly the trust this
 * section exists to build.
 *
 * The screenshot sits in a BrowserFrame for the same reason it does on the case
 * study: a pale screenshot on a pale canvas has no edge, and the chrome makes it
 * obvious this is a real site rather than another illustration.
 */
export function SelectedWork() {
  return (
    <section id="work" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {selectedWork.heading}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <BrowserFrame className="mt-12 lg:mt-14">
            <PixelImage
              src={project.cover}
              alt={project.coverAlt}
              width={1600}
              height={762}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full"
            />
          </BrowserFrame>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              {/* Title first. The meta line reads as a caption underneath it
                  rather than a kicker over it — the heading carries its own
                  weight and does not need a label announcing it. */}
              <h3 className="text-heading-sm font-semibold text-ink-black">
                {project.title}
              </h3>

              <p className="mt-2 text-caption text-smoke">
                {project.category} · {project.year} · {project.location}
              </p>

              <p className="mt-4 text-body text-smoke">{project.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-pill bg-signal-blue/10 px-3.5 py-2 text-caption font-semibold text-signal-blue-text"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0">
              <PillButton href={selectedWork.cta.href} withArrow>
                {selectedWork.cta.label}
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
