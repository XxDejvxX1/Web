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
 *
 * They are now one panel rather than two. The previous layout put the
 * deliverables in a bordered card and the stack tiles loose on the canvas
 * beside it — two halves with no shared structure, which read as an unfinished
 * column next to a finished one. Held inside a single sheet with a rule down the
 * middle, they become what they actually are: a spec sheet with the work on one
 * side and what it is built from on the other.
 */
export function Services() {
  return (
    <section id="services" className="wash-warm px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <div className="rounded-panel bg-paper-white p-7 shadow-glow sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
              {/* Pushed apart rather than stacked: the heading holds the top of
                  the sheet and the stack sits on its floor, so the column reaches
                  the same depth as the list beside it instead of trailing off. */}
              <div className="flex flex-col justify-between gap-12">
                <h2 className="font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
                  {services.heading}
                </h2>

                <div>
                  <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                    Built with
                  </h3>

                  {/*
                    Ash-mist tiles, not white. The stack used to sit on the page
                    canvas where a white tile with a pale glow ring read as
                    raised; inside a white sheet that same tile would disappear,
                    so the recessed tone is the one that works here.

                    Four across, exactly two rows. Left to wrap, eight tiles
                    broke 5-and-3 against this column and the ragged row read as
                    an accident.
                  */}
                  <ul className="mt-5 grid w-max grid-cols-4 gap-2.5">
                    {services.stack.map((tech) => (
                      <li key={tech}>
                        <span
                          title={tech}
                          aria-label={tech}
                          role="img"
                          className="flex size-13 items-center justify-center rounded-2xl bg-ash-mist text-graphite transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <TechLogo name={tech} className="size-7" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* The rule is the sheet's spine on wide screens; below lg the
                  columns stack and it would be a line across the middle of
                  nothing, so it only exists from lg up. */}
              <ul className="divide-y divide-black/[0.07] border-t border-black/[0.07] lg:border-t-0 lg:border-l lg:border-black/[0.07] lg:pl-16">
                {services.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-6 py-5 lg:py-6 lg:first:pt-0"
                  >
                    <span className="text-heading-sm font-semibold text-ink-black">
                      {item}
                    </span>
                    <Icon
                      name="check"
                      size={16}
                      className="shrink-0 text-signal-blue"
                    />
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
