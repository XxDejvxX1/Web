import { faq } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Native <details>/<summary> rather than a JS accordion: keyboard support,
 * screen-reader semantics and in-page find all work for free, and it needs no
 * client bundle.
 */
export function Faq() {
  return (
    <section id="faq" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-signal-blue-text">
              {faq.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
              {faq.heading}
            </h2>
          </Reveal>

          <Reveal className="flex flex-col gap-3">
            {faq.items.map((item) => (
              <details
                key={item.q}
                name="faq"
                className="group rounded-card bg-paper-white px-6 shadow-glow"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-body font-medium text-ink-black [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative size-4 shrink-0 text-smoke"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-body-sm text-smoke">{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
