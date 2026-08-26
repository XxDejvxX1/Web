import { featureBand } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";
import { PixelImage } from "@/components/ui/PixelImage";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { QuoteBubble } from "@/components/ui/QuoteBubble";
import { Typewriter } from "@/components/ui/Typewriter";

/**
 * The Cofounder-reference panel: one big piece of artwork with a serif headline
 * and a pill CTA laid over it.
 *
 * Sized to nearly fill the viewport with a narrow margin either side. It keeps
 * all four rounded corners and does not fade into the canvas — a fade would
 * erase the bottom corners of a card meant to read as a discrete object.
 */
export function FeatureBand() {
  return (
    <section className="px-3 py-10 sm:px-5 sm:py-16">
      <div className="relative isolate flex min-h-[88vh] flex-col justify-between overflow-hidden rounded-panel p-7 sm:p-12 lg:min-h-[92vh] lg:p-16">
        <PixelImage
          src="/images/card-background.webp"
          alt={featureBand.alt}
          width={1536}
          height={1024}
          pixelated
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover object-[64%_50%]"
        />

        {/* Two scrims: the sky is bright enough that one is not sufficient for
            white text at body size. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/25 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/20"
          aria-hidden="true"
        />

        <div className="max-w-2xl">
          <h2 className="whitespace-pre-line font-display text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.03] text-paper-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            {featureBand.headline}
          </h2>

          <p className="mt-7 text-body text-paper-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-heading-sm">
            {featureBand.typewriterPrefix}{" "}
            <Typewriter
              phrases={featureBand.typewriterPhrases}
              className="font-medium text-paper-white"
            />
          </p>

          <div className="mt-10">
            {/* Glass treatment: translucent white over the artwork rather than a
                solid fill, and a size down from the hero button. */}
            <PillButton
              href={featureBand.cta.href}
              variant="glass"
              size="sm"
              withArrow
            >
              {featureBand.cta.label}
            </PillButton>
          </div>
        </div>

        <QuoteBubble quote={featureBand.quote} className="mt-16 max-w-sm" />

        {/*
          xl, not sm. The headline is max-w-2xl from the left padding and this
          card is 300px off the right edge; below ~1200px those two overlap and
          the card lands on top of the words. It only clears from 1280 up.
        */}
        <NotificationCard
          {...featureBand.notification}
          className="absolute right-10 top-10 hidden xl:flex"
        />
      </div>
    </section>
  );
}
