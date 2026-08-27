import type { Metadata } from "next";
import { contact, site } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref, mailtoHref } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.intro,
  alternates: { canonical: "/contact/" },
  // Without this the page would inherit the layout's og:url and claim to be
  // the homepage.
  openGraph: {
    url: `${site.url}/contact/`,
    title: `Contact — ${site.name}`,
    description: contact.intro,
  },
};

/**
 * No form, by choice: a static export has no server to post to, and a real
 * inbox beats a form that silently drops enquiries. The mailto is pre-filled
 * with the brief structure so people send something useful the first time.
 */
export default function ContactPage() {
  return (
    <section className="px-4 pb-24 pt-36 sm:pb-28 sm:pt-44">
      <div className="mx-auto max-w-[var(--container-page)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,3.5rem)] leading-[1.03] text-ink-black">
              {contact.heading}
            </h1>

            <p className="mt-6 max-w-lg text-body text-smoke">{contact.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillButton href={mailtoHref()} withArrow>
                Email us
              </PillButton>
              <PillButton href={bookingHref()} variant="ghost">
                Book a Call
              </PillButton>
            </div>

            <div className="mt-10 border-t border-black/10 pt-8">
              <p className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-black">
                Direct
              </p>
              <a
                href={mailtoHref()}
                className="mt-3 inline-block text-heading-sm font-medium text-signal-blue-text underline-offset-4 hover:underline"
              >
                {site.email}
              </a>

              <p className="mt-6 flex items-center gap-2.5 text-body-sm text-smoke">
                <Icon name="clock" size={18} className="shrink-0" />
                {contact.responseNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-card bg-paper-white p-8 shadow-glow lg:p-10">
              <h2 className="text-heading-sm font-semibold text-ink-black">
                {contact.includeHeading}
              </h2>
              <p className="mt-3 text-body-sm text-smoke">
                The more you can tell us up front, the more useful our first reply will be.
              </p>

              <ul className="mt-7 flex flex-col gap-4">
                {contact.include.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      size={18}
                      className="mt-0.5 shrink-0 text-signal-blue"
                    />
                    <span className="text-body-sm text-graphite">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
