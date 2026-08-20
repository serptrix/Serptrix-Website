"use client";

import type { ServicePageContent } from "@/content/service-pages";
import { ServiceHero } from "./service-hero";
import { CapabilityExplorer, DoesSection, OutcomeSection, ProblemSection, ProcessJourney, TechMethod, WhySerptrix } from "./service-sections-core";
import { ProofSection, RelatedServices, ServiceFAQ, ServiceFinalCTA } from "./service-closing";
import { UniqueExperiences } from "./unique-experiences";

export function ServiceExperience({ page }: { page: ServicePageContent }) {
  return (
    <article className={`sv-page is-${page.slug}`}>
      <ServiceHero page={page} />
      <ProblemSection page={page} />
      <DoesSection page={page} />
      <OutcomeSection page={page} />
      <CapabilityExplorer page={page} />
      <ProcessJourney page={page} />
      <TechMethod page={page} />
      <UniqueExperiences page={page} />
      <ProofSection page={page} />
      <WhySerptrix page={page} />
      <RelatedServices page={page} />
      <ServiceFAQ page={page} />
      <ServiceFinalCTA page={page} />
    </article>
  );
}
