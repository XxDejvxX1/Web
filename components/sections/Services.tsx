import { services } from "@/content/site";
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
 * It is now an editorial index rather than a two-column sheet. The previous
 * layout paired a column of bare deliverable labels — each with a checkmark
 * against it — with a 4x2 grid of unlabelled logo tiles. Two problems: the
 * checkmark column is the generic pricing-table pattern, five things ticked off
 * with nothing to actually read, and the tiles carried more visual weight than
 * the deliverables while naming none of the technologies they stood for (the
 * name lived in a `title` attribute you had to hover to find).
 *
 * Restructured as a numbered index, in the Steep/Awesomic register: hairline
 * rules do the structural work instead of enclosure, each row earns its space
 * with a line of copy, and the stack drops to a footer strip of ghost tag pills
 * that read as typographic labels rather than badges.
 *
 * Index numerals stay in Inter. DESIGN.md is explicit that the display serif is
 * "display-only at 36px and above", and five serif numerals at row scale would
 * both break that rule and shout over the heading. Quiet tabular numerals are
 * what an index wants anyway. Process, whose four numerals do run at display
 * size, is where the serif treatment belongs.
 */
export function Services() {
  return (
    <section id="services" className="wash-warm px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <div className="rounded-panel bg-paper-white p-7 shadow-glow sm:p-10 lg:p-14">
            {/* Heading and lede sit on a shared baseline, magazine-masthead
                style, rather than the lede hanging under the heading. */}
            <div className="grid gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
                {services.heading}
              </h2>
              <p className="max-w-xl text-body text-smoke lg:pb-2">
                {services.lede}
              </p>
            </div>

            {/*
              The index. Three columns on wide screens — numeral, name,
              description — so the names align into a readable column of their
              own instead of each being trapped in a card.

              Below lg the description drops under the name and spans back to
              the numeral's gutter, which keeps the numerals as a clean left
              rail at every width.
            */}
            <ol className="mt-11 border-t border-black/[0.07] lg:mt-14">
              {services.deliverables.map((item, index) => (
                <li
                  key={item.name}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 border-b border-black/[0.07] py-6 sm:gap-x-6 lg:grid-cols-[auto_minmax(0,4fr)_minmax(0,6fr)] lg:gap-x-10 lg:py-7"
                >
                  {/* Decorative: the ordered list already numbers these for
                      assistive tech, and a read-aloud "01 Custom Website" is
                      just noise. */}
                  <span
                    aria-hidden="true"
                    className="text-caption font-medium tabular-nums text-smoke/70"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-heading-sm font-semibold text-ink-black">
                    {item.name}
                  </h3>

                  <p className="col-start-2 mt-2 text-body-sm text-smoke lg:col-start-3 lg:mt-0">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            {/*
              The stack, as labelled ghost pills. Hairline ring, no fill: they
              group without visual weight, so the eye still lands on the index
              above them. Each pill now says the name it used to hide.
            */}
            <div className="mt-10 lg:mt-12">
              <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-smoke">
                {services.stackLabel}
              </h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {services.stack.map((tech) => (
                  <li key={tech}>
                    <span className="flex items-center gap-2 rounded-pill border border-black/[0.09] py-1.5 pl-2.5 pr-3.5 text-body-sm text-graphite transition-colors duration-200 hover:border-black/20">
                      <TechLogo name={tech} className="size-4.5 shrink-0" />
                      {tech}
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
