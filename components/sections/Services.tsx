import { services } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TechLogo } from "@/components/ui/TechLogos";

/**
 * Deliverables and stack — the two things "What we do" does not already say.
 *
 * This section previously opened with four discipline cards (Product Strategy,
 * UI/UX, Frontend, Backend) that restated the bento above it almost line for
 * line. Between them and the Process steps, the page sold the same four
 * services three separate times. The cards are gone; these two panels are what
 * was actually load-bearing.
 */
export function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {services.heading}
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-card bg-paper-white p-7 shadow-glow">
              <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-black">
                Deliverables
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {services.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      size={18}
                      className="mt-0.5 shrink-0 text-signal-blue"
                    />
                    <span className="text-body-sm text-graphite">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliberately not a card. The deliverables are one list and read
                as a single panel; the stack is a set of discrete things, so each
                one is its own small square sitting on the canvas. Logos rather
                than wordmarks — the name still reaches assistive tech and hover
                through the label/title on each tile. */}
            <div className="lg:py-1">
              <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-black">
                Built with
              </h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {services.stack.map((tech) => (
                  <li key={tech}>
                    <span
                      title={tech}
                      aria-label={tech}
                      role="img"
                      className="flex size-14 items-center justify-center rounded-2xl bg-paper-white text-graphite shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <TechLogo name={tech} className="size-7" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
