import Link from "next/link";
import { footer, site } from "@/content/site";
import { mailtoHref } from "@/lib/navigation";
import { PixelImage } from "@/components/ui/PixelImage";

/**
 * Reveal footer.
 *
 * Pinned to the bottom of the viewport at a lower stacking level than the page
 * content, which carries a matching `margin-bottom: var(--footer-height)`. That
 * margin is pure empty scroll distance, so the last stretch of scrolling slides
 * the opaque content up and uncovers the footer underneath — the effect the
 * reference site uses.
 *
 * Two things this depends on, both set in app/layout.tsx: the content wrapper
 * must be opaque (otherwise the footer shows through the whole page) and must
 * sit above this in the stacking order.
 */
/*
 * Footer links measured 17px tall. The panel is a fixed 300-340px reveal, so
 * they cannot all become 44px without growing it and changing the reveal's
 * proportions. Two techniques instead:
 *
 *   - Horizontal rows (socials) take the same invisible 44px ::before box the
 *     nav uses; vertical growth cannot overlap a side-by-side sibling.
 *   - Vertical lists trade their `gap` for equivalent padding on the link. The
 *     spacing between text is identical, but the whitespace is now inside the
 *     tap target rather than dead between them.
 */
const HIT_AREA =
  "relative before:absolute before:inset-x-0 before:top-1/2 before:h-11 before:-translate-y-1/2 before:content-['']";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = site.socials.filter((social) => social.href);

  /*
   * Flattened for the mobile row. Built with an explicit type because `as const`
   * gives each column a distinct tuple type, which flatMap cannot unify on its
   * own.
   */
  const flatLinks: { label: string; href: string }[] = footer.columns.flatMap(
    (column) => column.links.map((link) => ({ label: link.label, href: link.href }))
  );

  return (
    <footer className="fixed inset-x-0 bottom-0 z-0 h-[var(--footer-height)] overflow-hidden">
      <PixelImage
        src="/images/footer.webp"
        alt={footer.alt}
        width={2172}
        height={440}
        // No `pixelated` here: at 2172px wide this art downscales on every
        // realistic viewport (still 0.88x at 1920), so nearest-neighbour would
        // only ever alias it.
        sizes="100vw"
        // Anchored right-of-centre so the "Bye!" bubble and the robot stay in
        // frame at every width, including the narrow slice mobile shows.
        className="absolute inset-0 -z-10 size-full object-cover object-[75%_50%]"
      />

      {/* The lake and sky on the left are pale; white text needs cover. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto flex h-full max-w-[var(--container-page)] flex-col justify-end px-6 pb-6 sm:pb-7">
        {/* Compact and held to the left so the artwork on the right stays
            visible, and so the whole block fits the shortened panel. */}
        <div className="flex flex-wrap items-end gap-x-12 gap-y-6 lg:max-w-3xl">
          <div className="max-w-xs">
            <Link
              href="/"
              className={`flex items-center gap-2.5 ${HIT_AREA}`}
              aria-label={`${site.name} — home`}
            >
              <img
                src="/images/brand-mark.webp"
                alt=""
                width={128}
                height={128}
                className="size-8 rounded-[9px]"
              />
              <span className="text-heading-sm font-semibold text-paper-white">
                {site.name}
              </span>
            </Link>

            <a
              href={mailtoHref()}
              className="mt-2 inline-block py-1 text-body-sm font-medium text-paper-white/90 underline-offset-4 hover:text-paper-white hover:underline"
            >
              {site.email}
            </a>
          </div>

          {/*
            Titled columns need two stacked rows at 375px, which overflows the
            shortened panel and clips the brand off the top. Below sm the links
            flatten into one wrapping row instead.
          */}
          <ul className="flex flex-wrap gap-x-5 sm:hidden">
            {flatLinks.map((link) => (
              <li key={`flat-${link.label}`}>
                <Link
                  href={link.href}
                  className="block py-1 text-body-sm text-paper-white/85 transition-colors hover:text-paper-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden gap-10 sm:flex sm:gap-14">
            {footer.columns.map((column) => (
              <div key={column.title}>
                {/* /70 not /60: at 12px over the artwork, /60 measured 4.64:1,
                    barely over the AA floor. */}
                <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-paper-white/70">
                  {column.title}
                </h3>
                <ul className="mt-2 flex flex-col">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="block py-1 text-body-sm text-paper-white/85 transition-colors hover:text-paper-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-paper-white/70">
            &copy; {year} {site.name}. {footer.signoff}
          </p>

          {socials.length > 0 && (
            <ul className="flex items-center gap-5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${HIT_AREA} text-caption text-paper-white/70 transition-colors hover:text-paper-white`}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
