import { process } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {process.heading}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            // Reveal sits inside the li: a div is not a valid child of ol.
            <li key={step.title} className="border-t border-black/10 pt-6">
              <Reveal delay={index * 90}>
                {/* Serif is display-only, so these sit at 36px+. */}
                <span
                  className="font-display text-heading leading-none text-signal-blue"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-heading-sm font-semibold text-ink-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-sm text-smoke">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
