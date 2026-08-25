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
export function Footer() {
  const year = new Date().getFullYear();
  const socials = site.socials.filter((social) => social.href);

  return (
    <footer className="fixed inset-x-0 bottom-0 z-0 h-[var(--footer-height)] overflow-hidden">
      <PixelImage
        src="/images/footer.webp"
        alt={footer.alt}
        width={2172}
        height={724}
        pixelated
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover object-[70%_60%]"
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

      <div className="mx-auto flex h-full max-w-[var(--container-page)] flex-col justify-end px-6 pb-7 sm:pb-9">
        {/* Held to the left half so the artwork on the right stays visible. */}
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:max-w-3xl">
          <div className="max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2.5"
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
              className="mt-4 inline-block text-body-sm font-medium text-paper-white/90 underline-offset-4 hover:text-paper-white hover:underline"
            >
              {site.email}
            </a>
          </div>

          <div className="flex gap-12 sm:gap-16">
            {footer.columns.map((column) => (
              <div key={column.title}>
                {/* /70 not /60: at 12px over the artwork, /60 measured 4.64:1,
                    barely over the AA floor. */}
                <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-paper-white/70">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-paper-white/85 transition-colors hover:text-paper-white"
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

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
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
                    className="text-caption text-paper-white/70 transition-colors hover:text-paper-white"
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
