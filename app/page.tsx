import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { FeatureBand } from "@/components/sections/FeatureBand";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Each section is standalone and route-agnostic. To promote one to its own page
 * later, create app/<name>/page.tsx, import the same component, and update the
 * href in lib/navigation.ts.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <FeatureBand />
      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
