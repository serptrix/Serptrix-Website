"use client";

import { useEffect, useId, useRef, useState, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CapabilityPattern, ServicePageContent } from "@/content/service-pages";
import { createScopedGSAP, gsap, ScrollTrigger } from "../motion/gsap-runtime";
import { ScrollReveal } from "../motion/scroll-reveal";
import { motionTokens } from "../motion/tokens";
import { useMotionCapabilities } from "../motion/use-motion-capabilities";

export function ProblemSection({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-problems" aria-labelledby="sv-problem-title">
      <div className="shell sv-problems-grid">
        <ScrollReveal type="fade-right">
          <p className="section-index">Business context</p>
          <h2 id="sv-problem-title">{page.problemTitle}</h2>
          <p>{page.problemLede}</p>
        </ScrollReveal>
        <ol className="sv-problem-list">
          {page.problems.map((item, index) => (
            <li key={item.title}>
              <ScrollReveal type="fade-left" delay={index * 0.06}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DoesSection({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-does dark-section" aria-labelledby="sv-does-title">
      <div className="shell">
        <ScrollReveal type="mask">
          <p className="section-index light">What Serptrix actually does</p>
          <h2 id="sv-does-title">{page.doesTitle}</h2>
          <p>{page.doesLede}</p>
        </ScrollReveal>
        <div className="sv-does-grid">
          {page.doesPoints.map((item, index) => (
            <ScrollReveal type="fade-up" delay={index * 0.07} key={item.title}>
              <article className={`sv-does-card is-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OutcomeSection({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-outcomes" aria-labelledby="sv-outcome-title">
      <div className="shell sv-outcomes-layout">
        <ScrollReveal type="fade-up">
          <p className="section-index">Business outcomes</p>
          <h2 id="sv-outcome-title">{page.outcomeTitle}</h2>
        </ScrollReveal>
        <div className="sv-outcome-track">
          {page.outcomes.map((item) => (
            <article key={item.label}>
              <span>{item.metric}</span>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tabs({ items }: { items: ServicePageContent["capabilities"] }) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  return (
    <div className="sv-cap-tabs">
      <div role="tablist" aria-label="Capabilities">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`${panelId}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${panelId}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
              event.preventDefault();
              const next = event.key === "ArrowRight" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
              setActive(next);
              document.getElementById(`${panelId}-tab-${next}`)?.focus();
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={items[active].title}
          id={`${panelId}-panel`}
          role="tabpanel"
          aria-labelledby={`${panelId}-tab-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.premium }}
        >
          <h3>{items[active].title}</h3>
          <p>{items[active].copy}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Accordion({ items }: { items: ServicePageContent["capabilities"] }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="sv-cap-accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                id={`${base}-h-${index}`}
                aria-expanded={expanded}
                aria-controls={`${base}-p-${index}`}
                onClick={() => setOpen(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            </h3>
            <div id={`${base}-p-${index}`} role="region" aria-labelledby={`${base}-h-${index}`} hidden={!expanded}>
              <p>{item.copy}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StickyCaps({ items }: { items: ServicePageContent["capabilities"] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="sv-cap-sticky">
      <div className="sv-cap-sticky-nav">
        {items.map((item, index) => (
          <button key={item.title} type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>
            {item.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.article
          key={items[active].title}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.4, ease: motionTokens.ease.premium }}
        >
          <span>{String(active + 1).padStart(2, "0")}</span>
          <h3>{items[active].title}</h3>
          <p>{items[active].copy}</p>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function Stack({ items }: { items: ServicePageContent["capabilities"] }) {
  return (
    <ol className="sv-cap-stack">
      {items.map((item, index) => (
        <li key={item.title} style={{ zIndex: items.length - index }}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function HoverList({ items }: { items: ServicePageContent["capabilities"] }) {
  return (
    <ul className="sv-cap-hover">
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>
          <p>{item.copy}</p>
        </li>
      ))}
    </ul>
  );
}

function Matrix({ items }: { items: ServicePageContent["capabilities"] }) {
  return (
    <div className="sv-cap-matrix">
      {items.map((item, index) => (
        <article key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

function Diagram({ items }: { items: ServicePageContent["capabilities"] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="sv-cap-diagram">
      <svg viewBox="0 0 640 240" aria-hidden="true">
        <path d="M40 120 H600" />
        {items.map((item, index) => {
          const x = 40 + (index * 560) / Math.max(items.length - 1, 1);
          return (
            <g key={item.title} onClick={() => setActive(index)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={120} r={active === index ? 16 : 10} className={active === index ? "is-on" : ""} />
            </g>
          );
        })}
      </svg>
      <div className="sv-cap-diagram-list">
        {items.map((item, index) => (
          <button key={item.title} type="button" className={active === index ? "is-on" : ""} onClick={() => setActive(index)}>
            {item.title}
          </button>
        ))}
      </div>
      <p>{items[active].copy}</p>
    </div>
  );
}

const patterns: Record<CapabilityPattern, (items: ServicePageContent["capabilities"]) => ReactElement> = {
  tabs: (items) => <Tabs items={items} />,
  accordion: (items) => <Accordion items={items} />,
  sticky: (items) => <StickyCaps items={items} />,
  stack: (items) => <Stack items={items} />,
  "hover-list": (items) => <HoverList items={items} />,
  matrix: (items) => <Matrix items={items} />,
  diagram: (items) => <Diagram items={items} />,
};

export function CapabilityExplorer({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-caps section" id="capabilities" aria-labelledby="sv-cap-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Core capabilities</p>
          <h2 id="sv-cap-title">Expertise assembled around the job.</h2>
        </ScrollReveal>
        {patterns[page.capabilityPattern](page.capabilities)}
      </div>
    </section>
  );
}

export function ProcessJourney({ page }: { page: ServicePageContent }) {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion, mobile } = useMotionCapabilities();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current || reducedMotion || mobile || page.processPattern !== "pin") return;
    return createScopedGSAP(ref, () => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top+=88",
        end: "+=140%",
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
      });
    });
  }, [mobile, page.processPattern, reducedMotion]);

  const active = Math.min(page.process.length - 1, Math.floor(progress * page.process.length));

  return (
    <section ref={ref} className={`sv-process is-${page.processPattern} dark-section`} id="approach" aria-labelledby="sv-process-title">
      <div className="shell">
        <ScrollReveal type="mask">
          <p className="section-index light">How the service works</p>
          <h2 id="sv-process-title">{page.processTitle}</h2>
        </ScrollReveal>
        <ol className="sv-process-list">
          {page.process.map((step, index) => (
            <li key={step.name} className={page.processPattern === "pin" && index === active ? "is-active" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.name}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TechMethod({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-method" aria-labelledby="sv-method-title">
      <div className="shell sv-method-grid">
        <ScrollReveal type="fade-up">
          <p className="section-index">Method and platforms</p>
          <h2 id="sv-method-title">{page.methodTitle}</h2>
          <p>{page.methodLede}</p>
        </ScrollReveal>
        <ul>
          {page.platforms.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhySerptrix({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-why" aria-labelledby="sv-why-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Why Serptrix</p>
          <h2 id="sv-why-title">{page.whyTitle}</h2>
        </ScrollReveal>
        <div className="sv-why-grid">
          {page.why.map((item, index) => (
            <ScrollReveal type="scale" delay={index * 0.05} key={item.title}>
              <article>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
