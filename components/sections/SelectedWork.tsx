import { caseStudies, selectedWork } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { WorkRail, type WorkShot } from "@/components/ui/WorkRail";

const [project] = caseStudies.projects;

/**
 * The one real shipped project, on the homepage.
 *
 * Shown as a rail of its screens rather than a single hero shot. The case study
 * already argues each screen one at a time; this borrows the same four and lets
 * a visitor step through them without leaving the page, which is a far better
 * use of the space than one screenshot and a paragraph.
 *
 * Deliberately narrow in what it borrows: screens, summary, meta and services.
 * `results` and `testimonial` stay behind on the case study page, which carries
 * its own notice that those figures are placeholders. Putting invented numbers
 * on the homepage would undo exactly the trust this section exists to build.
 */
const shots: WorkShot[] = [
  {
    label: "Overview",
    blurb: project.summary,
    src: project.cover,
    alt: project.coverAlt,
    // The home page sets its headline hard against the left edge.
    position: "left-top",
  },
  ...project.decisions.map((decision) => ({
    label: decision.screen,
    blurb: decision.title,
    src: decision.src,
    alt: decision.alt,
  })),
];

export function SelectedWork() {
  return (
    <section id="work" className="wash-atmosphere px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {selectedWork.heading}
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <WorkRail
            shots={shots}
            project={project.title}
            meta={`${project.category} · ${project.year} · ${project.location}`}
            action={
              <PillButton href={selectedWork.cta.href} withArrow>
                {selectedWork.cta.label}
              </PillButton>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
