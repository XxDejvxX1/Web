import Link from "next/link";
import { footer, site } from "@/content/site";
import { mailtoHref } from "@/lib/navigation";

export function Footer() {
  // Evaluated at build time — this is a server component in a static export,
  // so there is no client/server mismatch to worry about.
  const year = new Date().getFullYear();

  // Socials are optional in content/site.ts; skip any without a URL yet.
  const socials = site.socials.filter((social) => social.href);

  return (
    <footer className="border-t border-black/5 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-[var(--container-page)]">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <img
                src="/images/brand-mark.webp"
                alt=""
                width={128}
                height={128}
                className="size-8 rounded-[9px]"
              />
              <span className="text-heading-sm font-semibold uppercase tracking-[0.09em] text-ink-black">
                {site.name}
              </span>
            </Link>

            <p className="mt-5 text-body-sm text-smoke">{footer.blurb}</p>

            <a
              href={mailtoHref()}
              className="mt-5 inline-block text-body-sm font-medium text-signal-blue-text underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {footer.columns.map((column) => (
              <div key={column.title}>
                {/* h3, not h2: these are link-group labels, not page sections,
                    and should not sit alongside real headings in the outline. */}
                <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-black">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-graphite transition-colors hover:text-ink-black"
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

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-black/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-smoke">
            &copy; {year} {site.name}. All rights reserved.
          </p>

          {socials.length > 0 && (
            <ul className="flex items-center gap-5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caption text-smoke transition-colors hover:text-ink-black"
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
