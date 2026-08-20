"use client";

import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { MagneticButton } from "../motion/magnetic-button";
import { Parallax } from "../motion/parallax";
import { ScrollReveal } from "../motion/scroll-reveal";
import { ServiceHeroVisual } from "./hero-visuals";
import type { ServicePageContent } from "@/content/service-pages";

export function ServiceHero({ page }: { page: ServicePageContent }) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    ...(page.parent ? [{ label: page.parent.name, href: page.parent.href }] : []),
    { label: page.name },
  ];
  return (
    <section className={`sv-hero is-${page.heroVisual}`} aria-labelledby="sv-hero-title">
      <Parallax type="opacity" className="sv-hero-grid" strength={20}>
        <span />
      </Parallax>
      <div className="shell sv-hero-shell">
        <Breadcrumbs items={crumbs} tone="dark" />
        <div className="sv-hero-layout">
          <div className="sv-hero-copy">
            <ScrollReveal type="mask" immediate>
              <p className="eyebrow">
                <span /> {page.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal type="fade-up" immediate>
              <h1 id="sv-hero-title">
                {page.h1[0]} {page.h1[1]}
              </h1>
            </ScrollReveal>
            <ScrollReveal type="blur" delay={0.16}>
              <p>{page.lede}</p>
            </ScrollReveal>
            <ScrollReveal type="stagger" delay={0.22} className="sv-hero-actions">
              <MagneticButton href="/contact" className="srx-button srx-button-gold">
                {page.primaryCta}
              </MagneticButton>
              {page.secondaryCta.href.startsWith("/") ? (
                <Link className="srx-line-link" href={page.secondaryCta.href}>
                  {page.secondaryCta.label} <span>↗</span>
                </Link>
              ) : (
                <a className="srx-line-link" href={page.secondaryCta.href}>
                  {page.secondaryCta.label} <span>↓</span>
                </a>
              )}
            </ScrollReveal>
            <ScrollReveal type="fade-up" delay={0.3}>
              <p className="sv-trust">{page.trustNote}</p>
            </ScrollReveal>
          </div>
          <ScrollReveal type="scale" delay={0.18} className="sv-hero-visual-wrap">
            <ServiceHeroVisual type={page.heroVisual} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
