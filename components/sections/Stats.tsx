import { stats } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section aria-label="Studio at a glance" className="px-4 pt-24 sm:pt-28">
      <div className="mx-auto max-w-[var(--container-page)]">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-black/5 py-10 lg:grid-cols-4 lg:divide-x lg:divide-black/5 lg:gap-0">
            {stats.map((stat) => (
              <div key={stat.label} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                {/* Serif stays at display sizes only, per DESIGN.md. */}
                <dd className="font-display text-[2.5rem] leading-none text-ink-black">
                  {stat.value}
                  <span className="text-smoke">{stat.suffix}</span>
                </dd>
                <dt className="mt-3 text-body-sm text-smoke">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
