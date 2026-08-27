import { process } from "@/content/site";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four steps as a descending path.
 *
 * The sequence is carried by the composition rather than by the numerals: each
 * step sits lower than the one before it, so the eye walks down and to the
 * right the way it would read a route on a map. A hairline runs across the top
 * of every step with a filled marker where that step meets it, and because the
 * steps are offset those hairlines stack into a stair rather than a single rule.
 *
 * The offsets are lg-only. Below that the stagger would just be wasted vertical
 * space, so the steps stack plainly and the hairline becomes a divider.
 *
 * Written as static classes rather than an inline style because Tailwind has to
 * see the literal string to emit the rule.
 */
const STEP_OFFSET = ["lg:mt-0", "lg:mt-14", "lg:mt-28", "lg:mt-42"];

export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {process.heading}
          </h2>
        </Reveal>

        {/*
          pb on the list reclaims the space the last step's offset pushes into,
          so the section does not end with a tall gap under the shortest column.
        */}
        <ol className="mt-12 flex flex-col gap-12 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:pb-24">
          {process.steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 90}
              className={STEP_OFFSET[index]}
            >
              <li className="relative flex h-full flex-col">
                {/* The path: a rule across the step, and the marker sitting on
                    it. Decorative — the ordered list already carries the
                    sequence for assistive tech. */}
                <div aria-hidden="true" className="relative mb-7">
                  <span className="block h-px w-full bg-ink-black/10" />
                  <span className="absolute left-0 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-signal-blue" />
                </div>

                <PixelImage
                  src={step.image}
                  alt={step.alt}
                  width={420}
                  height={420}
                  sizes="(max-width: 640px) 30vw, 120px"
                  className="size-20 shrink-0 sm:size-24"
                />

                {/* Inter, not the display serif: DESIGN.md keeps the serif to
                    36px and up, and these sit well below it. */}
                <h3 className="mt-5 text-heading-sm font-semibold leading-[1.25] tracking-[-0.02em] text-ink-black">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-body-sm text-smoke">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
