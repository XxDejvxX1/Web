import { process } from "@/content/site";
import { PixelImage } from "@/components/ui/PixelImage";

/**
 * Pinned horizontal scroller, after motion.dev's scroll-pinning example.
 *
 *   track — one viewport of height per step. Scrolling through it is what
 *           advances the rail.
 *   pin   — sticky and one viewport tall, so the section holds still.
 *   rail  — a row of full-width panels, translated left as the track advances.
 *
 * Driven by a CSS scroll-progress timeline rather than a library, so it costs
 * nothing in JS. Browsers without scroll timelines — and anyone who asks for
 * reduced motion — get the panels stacked vertically instead; see globals.css.
 *
 * The artwork is square and deliberately small. These panels are a heading and
 * a paragraph with a picture beside them, not a picture with a caption.
 */
export function Process() {
  return (
    <section id="process" className="py-24 sm:py-28 lg:py-32">
      <div className="process-track">
        <div className="process-pin">
          <header className="mx-auto w-full max-w-[var(--container-page)] px-4">
            <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
              {process.heading}
            </h2>
          </header>

          <ol className="process-rail">
            {process.steps.map((step, index) => (
              <li key={step.title} className="process-panel">
                {/* Same container as the heading, so each panel's copy starts on
                    the same left edge rather than floating in a narrower
                    centred column. */}
                <div className="mx-auto w-full max-w-[var(--container-page)] px-4">
                  <div className="flex max-w-2xl items-center gap-5 sm:gap-10">
                    <PixelImage
                      src={step.image}
                      alt={step.alt}
                      width={420}
                      height={420}
                      sizes="192px"
                      className="size-20 shrink-0 sm:size-32 lg:size-40"
                    />

                    <div className="min-w-0">
                      <span
                        className="font-display text-heading leading-none text-signal-blue"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-4 text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-black">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-body text-smoke">{step.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="process-progress-track mx-auto w-full max-w-[var(--container-page)] px-4">
            <div
              className="h-[3px] w-full overflow-hidden rounded-full bg-ink-black/10"
              aria-hidden="true"
            >
              <div className="process-progress h-full w-full rounded-full bg-signal-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
