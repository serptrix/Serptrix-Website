"use client";

import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import { getServiceHref, servicePillars } from "@/content/service-catalog";
import { trackContactEvent } from "@/lib/analytics";

export function ServiceNavigator() {
  const [active, setActive] = useState(0);
  const current = servicePillars[active];

  const select = (index: number) => {
    setActive(index);
    trackContactEvent("service_path_selected", { pillar: servicePillars[index].slug, location: "homepage_navigator" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? servicePillars.length - 1 : event.key === "ArrowRight" ? (active + 1) % servicePillars.length : (active - 1 + servicePillars.length) % servicePillars.length;
    select(next);
    document.getElementById(`service-tab-${next}`)?.focus();
  };

  return (
    <section className="service-navigator" id="service-paths" aria-labelledby="service-navigator-title">
      <div className="home3-shell">
        <div className="home3-section-head">
          <p className="home3-index">Service navigator</p>
          <div><h2 id="service-navigator-title">Four disciplines. One clear starting point.</h2><p>Choose the area closest to your need. If the problem crosses disciplines, the related pages make the handoff visible.</p></div>
        </div>

        <div className="service-nav-desktop">
          <div className="service-nav-tabs" role="tablist" aria-label="Service pillars" onKeyDown={onKeyDown}>
            {servicePillars.map((pillar, index) => <button id={`service-tab-${index}`} key={pillar.slug} role="tab" aria-selected={active === index} aria-controls={`service-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => select(index)}><span>0{index + 1}</span>{pillar.name}</button>)}
          </div>
          <div id={`service-panel-${active}`} role="tabpanel" aria-labelledby={`service-tab-${active}`} className="service-nav-panel" key={current.slug}>
            <header><div><p>{current.problem}</p><h3>{current.name}</h3><span>{current.description}</span></div><Link href={`/services/${current.slug}`}>Explore {current.name} <i aria-hidden="true">→</i></Link></header>
            <div className="service-nav-groups">{current.categories.map((category) => <section key={category.slug}><div><h4>{category.name}</h4><Link href={`/services/${current.slug}/${category.slug}`} aria-label={`Compare ${category.name}`}>Compare <span aria-hidden="true">↗</span></Link></div><nav aria-label={`${category.name} services`}>{category.services.map((service) => <Link key={service.slug} href={getServiceHref(service.slug)}>{service.name}<span aria-hidden="true">→</span></Link>)}</nav></section>)}</div>
          </div>
        </div>

        <div className="service-nav-mobile">
          {servicePillars.map((pillar, index) => <details key={pillar.slug} open={index === 0}><summary><span>0{index + 1}</span><b>{pillar.name}</b><i aria-hidden="true" /></summary><div className="service-nav-mobile-body"><p>{pillar.description}</p>{pillar.categories.map((category) => <section key={category.slug}><h3><Link href={`/services/${pillar.slug}/${category.slug}`}>{category.name} <span aria-hidden="true">↗</span></Link></h3><nav>{category.services.map((service) => <Link key={service.slug} href={getServiceHref(service.slug)}>{service.name}</Link>)}</nav></section>)}<Link className="btn btn-secondary" href={`/services/${pillar.slug}`}>Explore {pillar.name}</Link></div></details>)}
        </div>

        <footer className="service-nav-footer"><p><b>Not sure which service fits?</b> Describe the problem in plain language and we will help identify a sensible first step.</p><div><Link href="/contact#project-inquiry">Send a project inquiry <span aria-hidden="true">→</span></Link><Link href="/services">View all services <span aria-hidden="true">↗</span></Link></div></footer>
      </div>
    </section>
  );
}
