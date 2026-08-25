import { services } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-signal-blue-text">
            {services.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.05] text-ink-black">
            {services.heading}
          </h2>
          <p className="mt-5 max-w-xl text-body text-smoke">{services.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.disciplines.map((discipline, index) => (
            <Reveal key={discipline.title} delay={index * 70}>
              <article className="h-full rounded-card bg-paper-white p-7 shadow-glow">
                <h3 className="text-heading-sm font-semibold text-ink-black">
                  {discipline.title}
                </h3>
                <p className="mt-3 text-body-sm text-smoke">{discipline.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-card bg-paper-white p-7 shadow-glow">
              <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-black">
                What you get
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {services.deliverables.map((item) => (
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

            <div className="rounded-card bg-paper-white p-7 shadow-glow">
              <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-black">
                Built with
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {services.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-pill bg-ash-mist px-3.5 py-1.5 text-body-sm font-medium text-graphite"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
