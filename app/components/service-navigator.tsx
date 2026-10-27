"use client";

import Link from "next/link";
import { getServiceHref, servicePillars } from "@/content/service-catalog";
import { trackContactEvent } from "@/lib/analytics";

const pillarDetails = [
  { note: "Brand and experience", featuredCount: 3, className: "design" },
  { note: "Web, commerce and software", featuredCount: 4, className: "development" },
  { note: "Practical AI systems", featuredCount: 4, className: "ai" },
  { note: "Demand and measurement", featuredCount: 3, className: "marketing" },
] as const;

type Pillar = (typeof servicePillars)[number];

function featuredServices(pillar: Pillar, count: number) {
  const firstFromEachCategory = pillar.categories.flatMap((category) =>
    category.services.slice(0, 1).map((service) => ({ category: category.name, service })),
  );
  const secondFromEachCategory = pillar.categories.flatMap((category) =>
    category.services.slice(1, 2).map((service) => ({ category: category.name, service })),
  );

  return [...firstFromEachCategory, ...secondFromEachCategory].slice(0, count);
}

function trackPillar(pillar: Pillar, destination: "pillar" | "service") {
  trackContactEvent("service_path_selected", {
    pillar: pillar.slug,
    location: "homepage_bento",
    destination,
  });
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const detail = pillarDetails[index];
  const featured = featuredServices(pillar, detail.featuredCount);

  return (
    <article className={`home-services-bento-card home-services-bento-${detail.className}`}>
      <div className="home-services-bento-motif" aria-hidden="true"><i /><i /><i /></div>

      <header>
        <p><span>0{index + 1}</span>{detail.note}</p>
        <h3>{pillar.name}</h3>
        <span>{pillar.description}</span>
      </header>

      <p className="home-services-bento-signal"><b>Start here when</b>{pillar.problem}</p>

      <nav aria-label={`Featured ${pillar.name} services`}>
        {featured.map(({ category, service }) => (
          <Link href={getServiceHref(service.slug)} key={service.slug} onClick={() => trackPillar(pillar, "service")}>
            <span><small>{category}</small>{service.name}</span>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </nav>

      <Link className="home-services-bento-cta" href={`/services/${pillar.slug}`} onClick={() => trackPillar(pillar, "pillar")}>
        Explore {pillar.name} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export function ServiceNavigator() {
  return (
    <section className="home-services" id="service-paths" aria-labelledby="service-navigator-title">
      <div className="home3-shell">
        <div className="home3-section-head home-services-intro">
          <p className="home3-index">Services</p>
          <div>
            <h2 id="service-navigator-title">Four ways to move the business forward.</h2>
            <p>Choose the discipline closest to the problem. Each path connects practical deliverables with the wider customer journey.</p>
          </div>
        </div>

        <div className="home-services-bento">
          {servicePillars.map((pillar, index) => <PillarCard pillar={pillar} index={index} key={pillar.slug} />)}
        </div>

        <footer className="home-services-assist">
          <p><b>Not sure where to start?</b> Describe the problem in plain language.</p>
          <div>
            <Link href="/services">View all services <span aria-hidden="true">→</span></Link>
            <Link href="/contact#project-inquiry">Send a project inquiry <span aria-hidden="true">→</span></Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
