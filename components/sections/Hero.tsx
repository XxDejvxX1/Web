import { hero } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";
import { PixelImage } from "@/components/ui/PixelImage";

/**
 * Eased fade from the artwork into the page canvas.
 *
 * A plain two-stop `to bottom, transparent, #f7f7f7` bands visibly across a
 * gradient sky, because linear alpha does not match how the eye reads the
 * transition. These stops approximate an ease-in curve so the art dissolves
 * instead of stopping on an edge.
 */
const CANVAS_FADE =
  "linear-gradient(to bottom," +
  "rgba(247,247,247,0) 0%," +
  "rgba(247,247,247,0.07) 22%," +
  "rgba(247,247,247,0.26) 42%," +
  "rgba(247,247,247,0.52) 60%," +
  "rgba(247,247,247,0.78) 74%," +
  "rgba(247,247,247,0.94) 83%," +
  /*
   * Solid canvas from 88%, leaving roughly the last 45px of the fade as flat
   * colour.
   *
   * Converging only at the very end was the bug: the gradient was still
   * compositing ~3% of the artwork about 20px from the edge, which over a large
   * flat area is a 3-6 value shift against #f7f7f7 — subtle on its own, but it
   * meets pure canvas at the section boundary and the step reads as a hairline.
   * The tail has to reach canvas well before the edge, not asymptotically at it.
   */
  "rgb(247,247,247) 88%," +
  "rgb(247,247,247) 100%)";

export function Hero() {
  return (
    /*
     * Full-bleed: no inset and no rounded corners. The previous build sat the
     * artwork inside a 12px canvas margin, which read as a white outline
     * around the hero.
     */
    <section className="relative isolate overflow-hidden">
      <PixelImage
        src="/images/hero-background.webp"
        alt=""
        width={1536}
        height={1024}
        priority
        // Source art is 1536px wide, so it upscales on large monitors — keep
        // the pixels crisp rather than letting the browser blur them.
        pixelated
        className="absolute inset-0 -z-10 size-full object-cover object-[62%_45%]"
      />

      {/*
        Legibility scrim. White body copy over this sky measures 3.78:1 on its
        own — fine for the display headline, short of the 4.5:1 the subhead
        needs. Values measured against the real artwork: the headline crosses a bright
        pink cloud band, which at 45%/15% left it at only 3.35:1 versus the 3:1
        floor for large text.
      */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/25 to-transparent"
        aria-hidden="true"
      />

      {/* The fade itself, over the lower portion of the section. */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-[45%]"
        style={{ background: CANVAS_FADE }}
        aria-hidden="true"
      />

      {/*
        Solid backstop for the last few pixels. The section height is fractional
        (814.938px at the time of writing) and the display is retina, so the
        image and the gradient rasterise to device-pixel edges that can differ by
        a half pixel and leave a hairline of artwork showing. This sits entirely
        inside the region where the gradient is already solid canvas, so it is
        invisible — it just guarantees those rows are painted by a flat colour
        rather than by the tail of a gradient.
      */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-3 bg-ash-mist"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[var(--container-page)] px-6 pb-16 pt-32 text-center sm:pt-40 lg:pb-24">
        <h1 className="mx-auto max-w-4xl whitespace-pre-line font-display text-[clamp(2.5rem,6.2vw,4.5rem)] font-normal leading-[1.04] text-paper-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
          {hero.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-body text-paper-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
          {hero.subhead}
        </p>

        <div className="mt-9 flex justify-center">
          <PillButton href={hero.primaryCta.href} variant="onImage" withArrow>
            {hero.primaryCta.label}
          </PillButton>
        </div>

        {/*
          The mockup sits close under the copy, as in the reference. Its PNG
          already carries rounded corners on a transparent background, so it
          gets no frame — a white wrapper would reintroduce the outline.
        */}
        <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
          <PixelImage
            src="/images/hero-web.webp"
            alt={hero.mockupAlt}
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            // Three values only — the CSS drop-shadow() filter takes no spread,
            // and the fourth length silently voided the whole filter, so the
            // mockup was rendering with no shadow at all.
            className="w-full drop-shadow-[0_18px_34px_rgba(0,0,0,0.32)]"
          />
        </div>
      </div>
    </section>
  );
}
