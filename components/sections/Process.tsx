import { process } from "@/content/site";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Alternating vertical rows, following the reference layout: artwork on one
 * side, a short text block on the other, flipping sides each step.
 *
 * The flip is done with `order` at lg and above only. Below that everything
 * stacks in source order, so each visual sits above its own copy rather than
 * next to the previous step's.
 *
 * The artwork is square and capped well below its column width — these rows are
 * a heading and a paragraph with a picture beside them, not a picture with a
 * caption.
 */
export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {process.heading}
          </h2>
        </Reveal>

        <ol className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-24">
          {process.steps.map((step, index) => {
            const flipped = index % 2 === 1;

            return (
              <li key={step.title}>
                <Reveal>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    <div
                      className={[
                        "flex justify-center",
                        flipped ? "lg:order-2" : undefined,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <PixelImage
                        src={step.image}
                        alt={step.alt}
                        width={420}
                        height={420}
                        sizes="(max-width: 1024px) 60vw, 300px"
                        className="size-44 sm:size-56 lg:size-72"
                      />
                    </div>

                    <div className={flipped ? "lg:order-1" : undefined}>
                      <span
                        className="font-display text-heading leading-none text-signal-blue"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Inter, not the display serif: these sit at 22-28px and
                          DESIGN.md keeps the serif to 36px and up. */}
                      <h3 className="mt-5 max-w-md text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-black">
                        {step.title}
                      </h3>

                      <p className="mt-4 max-w-md text-body text-smoke">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
