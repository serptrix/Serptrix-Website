"use client";

import Link from "next/link";
import type { ServicePageContent } from "@/content/service-pages";
import { ServiceHero } from "./service-hero";
import { CapabilityExplorer, DoesSection, OutcomeSection, ProblemSection, ProcessJourney, TechMethod, WhySerptrix } from "./service-sections-core";
import { ProofSection, RelatedServices, ServiceFAQ, ServiceFinalCTA } from "./service-closing";
import { UniqueExperiences } from "./unique-experiences";

export function ServiceExperience({ page }: { page: ServicePageContent }) {
  return (
    <article className={`sv-page is-${page.slug}`}>
      <nav className="breadcrumbs shell" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/services">Services</Link>
        {page.parent ? (
          <>
            <span>/</span>
            <Link href={page.parent.href}>{page.parent.name}</Link>
          </>
        ) : null}
        <span>/</span>
        <span aria-current="page">{page.name}</span>
      </nav>
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
