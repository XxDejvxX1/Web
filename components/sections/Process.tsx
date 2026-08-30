import { process } from "@/content/site";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four stations on one line.
 *
 * This reverses a decision the numbered-rows version made on purpose, so it is
 * worth saying why. That version argued there should be no connecting rail:
 * the row rules already carried the structure, the numerals read as a sequence
 * on their own, and a line through them was timeline chrome on a system built
 * from hairlines. All true — of a layout whose only job was the order.
 *
 * The rail is back because the section now carries something the numerals
 * cannot: how long each step takes. A duration is a length, and a length wants
 * an axis to sit on. The line is not decorating the sequence, it is the thing
 * the timings are measured against — and it is a hairline like every other rule
 * in the system, not a new kind of ornament.
 *
 * It runs horizontally from lg and turns vertical below it. Same journey along
 * whichever axis has the room: on a phone the stations run down the left edge,
 * which is the shape a timeline takes when it cannot go sideways. Unlike the
 * stagger this replaced, the concept survives at every breakpoint.
 */
export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <div className="grid gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
              {process.heading}
            </h2>

            <p className="max-w-xl text-body text-smoke lg:pb-2">{process.lede}</p>
          </div>
        </Reveal>

        <ol className="mt-12 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-10">
          {process.steps.map((step, index) => {
            const isLast = index === process.steps.length - 1;

            return (
              /*
                Below lg the station marker rides a left border running the
                height of the step, so the four of them stack into one unbroken
                vertical line. The `after` mask on the last step is what makes
                that line end on its final marker rather than run past it: the
                border belongs to the whole step, so the tail below the marker
                is painted back out in canvas. Same termination as the
                horizontal rail, which simply omits its last segment.
              */
              <li
                key={step.title}
                className="relative border-l border-ink-black/[0.14] pb-10 pl-7 last:pb-0 last:after:absolute last:after:-left-px last:after:bottom-0 last:after:top-[11px] last:after:w-px last:after:bg-ash-mist last:after:content-[''] lg:border-l-0 lg:pb-0 lg:pl-0 lg:last:after:hidden"
              >
                {/* Outside Reveal, which animates a transform — and a
                    transformed element becomes the containing block for its
                    absolutely positioned descendants, so inside it the marker
                    would hang off the wrong box. */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 size-[9px] rounded-full bg-signal-blue lg:hidden"
                />

                {/* Inside the <li>, not around it: an <ol> may only contain
                    <li>, and Reveal renders a div. */}
                <Reveal delay={index * 90}>
                  <PixelImage
                    src={step.image}
                    alt={step.alt}
                    width={420}
                    height={420}
                    sizes="(max-width: 1024px) 72px, 88px"
                    className="size-18 lg:size-22"
                  />

                  {/*
                    The rail: one hairline per station, each stretched by the
                    grid gap so it meets the next station's marker and the four
                    segments read as a single line. The last station has no
                    segment — the line ends where the journey does, rather than
                    running off the edge of the container.
                  */}
                  <div
                    aria-hidden="true"
                    className="relative mb-[30px] mt-[30px] hidden h-px lg:block"
                  >
                    {!isLast && (
                      <span className="absolute left-0 top-0 h-px w-[calc(100%+2.5rem)] bg-ink-black/[0.14]" />
                    )}
                    <span className="absolute -top-1 left-0 size-[9px] rounded-full bg-signal-blue" />
                  </div>

                  <span className="mt-5 block text-caption font-semibold tracking-[0.12em] text-signal-blue-text lg:mt-0">
                    {step.duration}
                  </span>

                  {/* Inter, not the display serif: DESIGN.md keeps the serif to
                      36px and up, and these sit well below it. The numerals
                      that did run at display size are gone — the rail carries
                      the sequence now, and a marker plus a duration says more
                      than a numeral did. */}
                  <h3 className="mt-3 text-heading-sm font-semibold leading-[1.25] tracking-[-0.02em] text-ink-black">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-body-sm text-smoke">{step.body}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
