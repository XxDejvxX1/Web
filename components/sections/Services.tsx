import { services } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TechLogo } from "@/components/ui/TechLogos";

/**
 * Deliverables, each with the stack it is built from.
 *
 * The numbered index this replaces had the right copy in the wrong shape. The
 * deliverables read down the page while the technologies sat in a strip at the
 * foot of the section, so the stack was eight names a visitor had no way to
 * attach to anything above them. The pills are still labelled ghost pills —
 * that strip's fix, keeping the names out of a `title` attribute — they have
 * just moved onto the rows they belong to, which is the only reason anyone
 * cares what the stack is.
 *
 * The white panel goes with them. This section sits directly under the bento,
 * and a card holding a list under a grid of cards reads as more of the same
 * whatever the words say; out on the wash it reads as the page's plain answer
 * to what a project hands over.
 *
 * Index numerals stay in Inter, per DESIGN.md's display-only-at-36px rule, and
 * because a quiet tabular numeral is what an index wants. Process is where the
 * serif numerals belong.
 *
 * The last row is deliberately unlike the others: handover is not built from
 * anything — it is what you receive — so it takes the accent treatment rather
 * than logo pills, and that difference is the point of the row.
 */

const pillBase =
  "flex items-center gap-2 rounded-pill border py-1.5 pl-2.5 pr-3.5 text-body-sm transition-colors duration-200";

export function Services() {
  return (
    <section id="services" className="wash-warm px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          {/* Heading and lede sit on a shared baseline, magazine-masthead
              style, rather than the lede hanging under the heading. */}
          <div className="grid gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
              {services.heading}
            </h2>

            <p className="max-w-xl text-body text-smoke lg:pb-2">{services.lede}</p>
          </div>
        </Reveal>

        <ol className="mt-11 border-t border-black/[0.07] lg:mt-14">
          {services.deliverables.map((item, index) => (
            /* Reveal sits INSIDE the <li>: an <ol> may only contain <li>, and
               Reveal renders a div. */
            <li key={item.name} className="border-b border-black/[0.07]">
              <Reveal delay={index * 60}>
                {/*
                  Two columns of meaning: what it is on the left, what it is made
                  of on the right. `items-start`, not centre — the description
                  runs to three lines in its column and the pills belong level
                  with the name rather than floating halfway down it.
                */}
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-4 py-6 sm:gap-x-6 lg:grid-cols-[auto_minmax(0,5fr)_minmax(0,5fr)] lg:gap-x-10 lg:py-7">
                  <span
                    aria-hidden="true"
                    className="text-caption font-medium tabular-nums text-smoke/70"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-heading-sm font-semibold text-ink-black">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-body-sm text-smoke">{item.description}</p>
                  </div>

                  {/* Below lg the pills drop under the copy and start at the
                      copy's column, so they line up with the text instead of
                      indenting to nothing under the numeral. */}
                  <ul className="col-start-2 flex flex-wrap items-start gap-2 lg:col-start-3 lg:justify-end">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <span
                          className={`${pillBase} border-black/[0.09] text-graphite hover:border-black/20`}
                        >
                          <TechLogo name={tech} className="size-4.5 shrink-0" />
                          {tech}
                        </span>
                      </li>
                    ))}

                    {item.receives.map((thing) => (
                      <li key={thing}>
                        {/* signal-blue-text, not signal-blue: 14px is
                            normal-size text and needs 4.5:1, which the accent
                            does not clear. */}
                        <span
                          className={`${pillBase} border-signal-blue/25 bg-signal-blue/[0.06] text-signal-blue-text`}
                        >
                          <Icon name="check" size={16} className="shrink-0" />
                          {thing}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mt-7 text-body-sm text-smoke">{services.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
