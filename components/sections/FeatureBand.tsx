import { featureBand } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";
import { PixelImage } from "@/components/ui/PixelImage";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { QuoteBubble } from "@/components/ui/QuoteBubble";

/**
 * The Cofounder-reference panel: one big piece of artwork with a serif headline
 * and a pill CTA laid over it.
 *
 * Unlike the hero this panel is fully contained, so it keeps all four rounded
 * corners and does not fade into the canvas — a fade would erase the bottom
 * corners of a card that is meant to read as a discrete object.
 *
 * This artwork is far brighter than the hero art (pale sky, near-white paving),
 * so it needs two scrims rather than one to keep white text legible.
 */
export function FeatureBand() {
  return (
    <section className="px-3 py-8 sm:py-12">
      <div className="mx-auto max-w-[calc(var(--container-page)+2rem)]">
        <div className="relative isolate flex min-h-[520px] flex-col justify-between overflow-hidden rounded-panel p-8 sm:p-12 lg:min-h-[580px] lg:p-16">
          <PixelImage
            src="/images/card-background.webp"
            alt={featureBand.alt}
            width={1536}
            height={1024}
            pixelated
            sizes="(max-width: 1264px) 100vw, 1264px"
            className="absolute inset-0 -z-10 size-full object-cover object-center"
          />

          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="max-w-xl">
            <h2 className="whitespace-pre-line font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.03] text-paper-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
              {featureBand.headline}
            </h2>

            <p className="mt-6 max-w-md text-body text-paper-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
              {featureBand.body}
            </p>

            <div className="mt-9">
              <PillButton href={featureBand.cta.href} variant="onImage" withArrow>
                {featureBand.cta.label}
              </PillButton>
            </div>
          </div>

          <QuoteBubble quote={featureBand.quote} className="mt-16 max-w-sm" />

          <NotificationCard
            {...featureBand.notification}
            className="absolute right-8 top-8 hidden lg:flex"
          />
        </div>
      </div>
    </section>
  );
}
