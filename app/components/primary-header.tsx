"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { servicePillars } from "@/content/service-catalog";
import { Breadcrumbs } from "./breadcrumbs";

export function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) setServicesOpen(false);
      if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (servicesOpen && !headerRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.body.classList.toggle("nav-open", menuOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen, servicesOpen]);

  const active = (href: string) => path === href || (href !== "/" && path.startsWith(href));

  return (
    <header className="site3-header" ref={headerRef}>
      <div className="site3-shell site3-nav">
        <Link className="site3-logo" href="/" aria-label="Serptrix home">
          <Image src="/Serptrix-header.svg" alt="" width={2000} height={600} priority />
        </Link>
        <button
          ref={toggleRef}
          className="site3-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site3-primary-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav
          id="site3-primary-nav"
          className={menuOpen ? "is-open" : ""}
          aria-label="Primary navigation"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setMenuOpen(false);
              setServicesOpen(false);
            }
          }}
        >
          <div className="site3-services">
            <button type="button" aria-expanded={servicesOpen} aria-controls="site3-services-menu" onClick={() => setServicesOpen((value) => !value)}>
              Services <span aria-hidden="true">⌄</span>
            </button>
            <div id="site3-services-menu" className={servicesOpen ? "is-open" : ""}>
              <div className="site3-services-intro">
                <p>Choose the problem you need to solve.</p>
                <Link href="/services">View all services <span aria-hidden="true">→</span></Link>
              </div>
              {servicePillars.map((pillar) => (
                <div className="site3-service-group" key={pillar.slug}>
                  <Link className="site3-service-group-title" href={`/services/${pillar.slug}`}>{pillar.name} <span aria-hidden="true">↗</span></Link>
                  <p>{pillar.description}</p>
                  {pillar.categories.map((category) => <Link key={category.slug} href={`/services/${pillar.slug}/${category.slug}`}>{category.name}</Link>)}
                </div>
              ))}
            </div>
          </div>
          <Link className={active("/case-studies") ? "active" : ""} href="/case-studies">Work</Link>
          <Link className={active("/about") ? "active" : ""} href="/about">About</Link>
          <Link className={active("/blog") ? "active" : ""} href="/blog">Insights</Link>
          <Link className="site3-nav-cta" href="/contact#calendly-booking">Book a strategy call <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  accent,
  copy,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="interior-hero shell">
      {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
      <p className="eyebrow"><span /> {eyebrow}</p>
      <h1>{title}<br /><em>{accent}</em></h1>
      <p>{copy}</p>
    </section>
  );
}
