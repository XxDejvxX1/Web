import { howItWorks } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icons";
import { PixelImage } from "@/components/ui/PixelImage";
import { Reveal } from "@/components/ui/Reveal";

const [feature, ...rest] = howItWorks.cards;

/**
 * Soft colour wash behind the artwork. The pixel art already carries its own
 * painted aura on a transparent background, so this only needs to ground it
 * against the white card — hence the low alphas.
 */
const GLOW =
  "radial-gradient(60% 55% at 50% 55%," +
  "rgba(123,126,216,0.20) 0%," +
  "rgba(201,138,181,0.16) 45%," +
  "rgba(232,168,124,0.10) 70%," +
  "transparent 100%)";

const cardShell =
  "relative flex flex-col overflow-hidden rounded-card bg-paper-white shadow-glow";

function CardHeader({
  icon,
  title,
  body,
}: {
  icon: IconName;
  title: string;
  body: string;
}) {
  return (
    <>
      <Icon name={icon} size={26} className="text-ink-black" />
      {/*
        Monad sets these titles in a serif, but DESIGN.md restricts the display
        serif to 36px and above, so they stay in Inter 600. To match the
        reference instead, swap to `font-display text-heading` here.
      */}
      <h3 className="mt-5 text-heading-sm font-semibold text-ink-black">{title}</h3>
      <p className="mt-3 text-body-sm text-smoke">{body}</p>
    </>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-signal-blue-text">
            {howItWorks.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {howItWorks.heading}
          </h2>
          <p className="mt-5 max-w-xl text-body text-smoke">{howItWorks.intro}</p>
        </Reveal>

        {/*
          The Monad bento: one tall card down the left, three wide cards stacked
          on the right. Collapses to a single column below lg.
        */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-3">
          <Reveal className="lg:row-span-3">
            <article className={`${cardShell} h-full p-7`}>
              <CardHeader icon={feature.icon} title={feature.title} body={feature.body} />

              <div className="relative mt-8 min-h-[300px] flex-1">
                <div
                  className="absolute inset-0 rounded-[20px]"
                  style={{ background: GLOW }}
                  aria-hidden="true"
                />
                <PixelImage
                  src={feature.image}
                  alt={feature.alt}
                  width={720}
                  height={1440}
                  sizes="(max-width: 1024px) 90vw, 340px"
                  className="absolute inset-0 m-auto max-h-full w-auto max-w-full object-contain"
                />
              </div>
            </article>
          </Reveal>

          {rest.map((card, index) => (
            <Reveal key={card.id} className="lg:col-span-2" delay={80 * (index + 1)}>
              <article
                className={`${cardShell} h-full gap-6 p-7 sm:flex-row sm:items-center`}
              >
                <div className="sm:flex-1">
                  <CardHeader icon={card.icon} title={card.title} body={card.body} />
                </div>

                <div className="relative h-40 shrink-0 sm:h-44 sm:w-[38%]">
                  <div
                    className="absolute inset-0 rounded-[20px]"
                    style={{ background: GLOW }}
                    aria-hidden="true"
                  />
                  <PixelImage
                    src={card.image}
                    alt={card.alt}
                    width={800}
                    height={800}
                    sizes="(max-width: 640px) 60vw, 300px"
                    className="absolute inset-0 m-auto max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
