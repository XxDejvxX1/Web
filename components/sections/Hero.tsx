import { hero } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";
import { PixelImage } from "@/components/ui/PixelImage";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { QuoteBubble } from "@/components/ui/QuoteBubble";
import { bookingHref } from "@/lib/navigation";

/**
 * Eased fade from the artwork into the page canvas.
 *
 * A plain two-stop `to bottom, transparent, #f7f7f7` bands visibly across a
 * gradient sky, because linear alpha does not match how the eye reads the
 * transition. These stops approximate an ease-in curve so the art dissolves
 * instead of stopping on an edge — this is the effect the reference site uses
 * and the one the brief called out.
 */
const CANVAS_FADE =
  "linear-gradient(to bottom," +
  "rgba(247,247,247,0) 0%," +
  "rgba(247,247,247,0.06) 24%," +
  "rgba(247,247,247,0.22) 44%," +
  "rgba(247,247,247,0.48) 62%," +
  "rgba(247,247,247,0.76) 78%," +
  "rgba(247,247,247,0.94) 90%," +
  "rgb(247,247,247) 100%)";

export function Hero() {
  return (
    <section className="relative">
      <div className="px-3 pt-3">
        <div className="relative isolate overflow-hidden rounded-panel">
          <PixelImage
            src="/images/hero-background.webp"
            alt=""
            width={1672}
            height={941}
            priority
            // Source art is 1672px wide, so this upscales past native on large
            // monitors — keep the pixels crisp rather than letting them blur.
            pixelated
            className="absolute inset-0 -z-10 size-full object-cover object-[50%_42%]"
          />

          {/* Legibility scrim: white text crosses the bright sunset band. */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/20 to-transparent"
            aria-hidden="true"
          />

          {/* The fade itself, over the lower half of the panel. */}
          <div
            className="absolute inset-x-0 bottom-0 -z-10 h-[62%]"
            style={{ background: CANVAS_FADE }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-[var(--container-page)] px-6 pb-40 pt-36 sm:px-10 lg:pb-64 lg:pt-44">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-pill border border-white/25 bg-white/10 px-3.5 py-1.5 text-caption font-medium uppercase tracking-[0.14em] text-paper-white/90 backdrop-blur-sm">
                {hero.eyebrow}
              </span>

              <h1 className="mt-6 whitespace-pre-line font-display text-[clamp(2.5rem,7vw,4.75rem)] font-normal leading-[1.02] text-paper-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                {hero.headline}
              </h1>

              <p className="mt-6 max-w-lg text-body text-paper-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:text-heading-sm">
                {hero.subhead}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <PillButton href={hero.primaryCta.href} variant="onImage" withArrow>
                  {hero.primaryCta.label}
                </PillButton>
                <PillButton href={bookingHref()} variant="ghostOnImage">
                  {hero.secondaryCta.label}
                </PillButton>
              </div>
            </div>

            <QuoteBubble quote={hero.quote} className="mt-20 lg:mt-28" />
          </div>

          <NotificationCard
            {...hero.notification}
            className="absolute right-8 top-32 hidden lg:flex"
          />
        </div>
      </div>

      {/*
        The device mockup overlaps the hero's faded lower edge (DESIGN.md — "a
        device mockup overlapping the bottom into a landscape silhouette").
        It lives outside the rounded panel because that panel clips its
        overflow. Overlap is reduced on small screens, where a deep pull-up
        would crowd the headline.
      */}
      <div className="relative z-10 -mt-24 px-4 sm:-mt-32 lg:-mt-52">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-media bg-paper-white p-1.5 shadow-lifted">
            <PixelImage
              src="/images/hero-web.webp"
              alt={hero.mockupAlt}
              width={1448}
              height={1086}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="w-full rounded-[24px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
