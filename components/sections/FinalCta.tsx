import { finalCta } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/navigation";

/** Mirrors the closing bar in the studio mockup: rocket, one line, two pills. */
export function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-panel bg-paper-white p-8 shadow-glow sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
            <div className="flex items-start gap-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-signal-blue/10 text-signal-blue">
                <Icon name="rocket" size={24} />
              </span>
              <div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05] text-ink-black">
                  {finalCta.heading}
                </h2>
                <p className="mt-3 text-body text-smoke">{finalCta.body}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <PillButton href={finalCta.primaryCta.href} withArrow>
                {finalCta.primaryCta.label}
              </PillButton>
              <PillButton href={bookingHref()} variant="ghost">
                {finalCta.secondaryCta.label}
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
