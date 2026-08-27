import { process } from "@/content/site";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four steps as one band.
 *
 * This was four full-width alternating rows with 288px artwork, which ran to
 * roughly 1800px — two full screens to say "discovery, design, build, launch".
 * That length was most of why the page read as repetitive: by the time a
 * visitor arrived here they had already been told what we do twice.
 *
 * As a single row the sequence is legible at a glance, which is all a process
 * list needs to do. The artwork shrinks to a token rather than an illustration,
 * because at this size it identifies the step instead of depicting it.
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

        <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {process.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <li className="flex h-full flex-col">
                <PixelImage
                  src={step.image}
                  alt={step.alt}
                  width={420}
                  height={420}
                  sizes="(max-width: 640px) 30vw, 120px"
                  className="size-20 shrink-0 sm:size-24"
                />

                <span
                  className="mt-5 font-display text-heading-sm leading-none text-signal-blue"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Inter, not the display serif: DESIGN.md keeps the serif to
                    36px and up, and these sit well below it. */}
                <h3 className="mt-2.5 text-heading-sm font-semibold leading-[1.25] tracking-[-0.02em] text-ink-black">
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
