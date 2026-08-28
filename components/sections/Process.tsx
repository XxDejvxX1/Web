import { process } from "@/content/site";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four steps as a numbered editorial sequence.
 *
 * This used to be four equal columns pushed progressively down the page
 * (0 / 56 / 112 / 168px of top margin, plus a pb-24 counterweight to reclaim
 * the space the last one pushed into). The intent was a descending path, but
 * with no visible numerals the offsets read as misalignment rather than
 * progression — and below lg the stagger was dropped entirely, so the concept
 * only existed on wide screens. It cost roughly 270px of empty canvas to say
 * something the layout never actually said.
 *
 * Now the sequence is explicit: full-width rows, each opening with its numeral.
 * Same structure at every breakpoint, no offset compensation, and the body copy
 * gets a proper measure instead of a quarter-column.
 *
 * There is deliberately no connecting rail down the numerals. The row rules
 * already carry the structure, and the numerals are large enough to read as a
 * sequence on their own; a vertical line through them adds timeline chrome to a
 * system whose whole register is hairlines and quiet surfaces.
 *
 * The numerals are the one place the display serif earns its keep below a
 * heading — DESIGN.md restricts it to 36px and above, which is exactly where
 * these sit.
 */
export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          {/* Heading and lede share a baseline, masthead style, rather than the
              lede hanging beneath the heading. Matches Services. */}
          <div className="grid gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
              {process.heading}
            </h2>
            <p className="max-w-xl text-body text-smoke lg:pb-2">{process.lede}</p>
          </div>
        </Reveal>

        <ol className="mt-11 border-t border-black/[0.07] lg:mt-14">
          {process.steps.map((step, index) => (
            /*
              Reveal sits inside the <li>, not around it: an <ol> may only have
              <li> children, and wrapping each row in Reveal's <div> would break
              that. It carries the row's grid so there is no extra element.
            */
            <li key={step.title} className="border-b border-black/[0.07]">
              <Reveal
                delay={index * 90}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 py-8 sm:gap-x-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-14 lg:py-10"
              >
                {/* Decorative: the ordered list already carries the sequence
                    for assistive tech, and "01 Discovery" read aloud is noise. */}
                <span
                  aria-hidden="true"
                  className="font-display text-[2.25rem] leading-none text-ink-black/25 transition-colors duration-300 group-hover:text-signal-blue lg:text-[2.75rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="lg:max-w-2xl">
                  {/* Inter, not the display serif: DESIGN.md keeps the serif to
                      36px and up, and these sit well below it. */}
                  <h3 className="text-heading-sm font-semibold leading-[1.25] tracking-[-0.02em] text-ink-black">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-body text-smoke">{step.body}</p>
                </div>

                {/*
                  Artwork last in the source so the copy leads on narrow
                  screens, where it drops below the text in the numeral's
                  gutter. From lg it takes its own column and the rows read
                  numeral -> copy -> picture.
                */}
                <PixelImage
                  src={step.image}
                  alt={step.alt}
                  width={420}
                  height={420}
                  sizes="(max-width: 1024px) 30vw, 132px"
                  className="col-start-2 mt-6 size-24 shrink-0 lg:col-start-3 lg:mt-0 lg:size-33"
                />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
