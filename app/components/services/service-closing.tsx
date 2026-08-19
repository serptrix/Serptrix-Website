"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { casesFor, insightsFor, relatedPages, type ServicePageContent } from "@/content/service-pages";
import { MagneticButton } from "../motion/magnetic-button";
import { ScrollReveal } from "../motion/scroll-reveal";
import { motionTokens } from "../motion/tokens";

export function ProofSection({ page }: { page: ServicePageContent }) {
  const studies = casesFor(page.caseSlugs);
  const insights = insightsFor(page.insightSlugs);
  const study = studies[0];
  return (
    <section className="sv-proof" id="proof" aria-labelledby="sv-proof-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Trust and application</p>
          <h2 id="sv-proof-title">Relevant work, labeled honestly.</h2>
        </ScrollReveal>
        {study ? (
          <article className="sv-case">
            <div className="sv-case-visual" aria-hidden="true">
              <span>CMS case-study template</span>
              <strong>{study.result}</strong>
              <small>Unverified project-data placeholder</small>
            </div>
            <div>
              <p className="section-index">Project</p>
              <h3>{study.project}</h3>
              <p>
                <b>Challenge.</b> {study.challenge}
              </p>
              <p>
                <b>Relevant services.</b> {study.services.join(" · ")}
              </p>
              <p>
                <b>Approach.</b> {study.summary}
              </p>
              <p>
                <b>Outcome.</b> {study.result} — not presented as a verified client result.
              </p>
              <Link className="srx-line-link sv-dark-link" href={`/case-studies/${study.slug}`} data-cursor="view">
                Open case-study template <span>↗</span>
              </Link>
            </div>
          </article>
        ) : null}
        {insights.length ? (
          <div className="sv-insights">
            <p className="section-index">Related thinking</p>
            {insights.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`}>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
                <b>Read ↗</b>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function RelatedServices({ page }: { page: ServicePageContent }) {
  const related = relatedPages(page.related);
  return (
    <section className={`sv-related is-${page.relatedPattern}`} aria-labelledby="sv-related-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Related services</p>
          <h2 id="sv-related-title">{page.relatedIntro}</h2>
        </ScrollReveal>
        <div className="sv-related-list">
          {related.map((item, index) => (
            <Link href={`/services/${item.slug}`} key={item.slug} data-cursor="view">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.lede}</p>
              <b>Continue ↗</b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFAQ({ page }: { page: ServicePageContent }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <section className="sv-faq" aria-labelledby="sv-faq-title">
      <div className="shell sv-faq-grid">
        <div>
          <p className="section-index">Questions</p>
          <h2 id="sv-faq-title">What teams usually ask before starting.</h2>
        </div>
        <div>
          {page.faqs.map(([question, answer], index) => {
            const expanded = open === index;
            return (
              <div className="sv-faq-item" key={question}>
                <h3>
                  <button
                    type="button"
                    id={`${base}-q-${index}`}
                    aria-expanded={expanded}
                    aria-controls={`${base}-a-${index}`}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    {question}
                    <span aria-hidden="true">{expanded ? "–" : "+"}</span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={`${base}-a-${index}`}
                      role="region"
                      aria-labelledby={`${base}-q-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.premium }}
                    >
                      <p>{answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServiceFinalCTA({ page }: { page: ServicePageContent }) {
  return (
    <section className="sv-final" aria-labelledby="sv-final-title">
      <div className="shell">
        <ScrollReveal type="scale">
          <p className="section-index light">Next step</p>
          <h2 id="sv-final-title">
            {page.ctaTitle[0]} <em>{page.ctaTitle[1]}</em>
          </h2>
          <p>{page.ctaCopy}</p>
        </ScrollReveal>
        <div className="sv-final-actions">
          <MagneticButton href="/contact" className="srx-button srx-button-gold">
            Book a Strategy Call
          </MagneticButton>
          <Link className="btn btn-outline sv-final-quiet" href="/contact#project-inquiry">
            Start a Project <span>↗</span>
          </Link>
        </div>
        <p className="sv-final-links">
          <Link href="/about">About Serptrix</Link>
          <Link href="/contact">Contact</Link>
          {page.parent ? <Link href={page.parent.href}>{page.parent.name}</Link> : <Link href="/services">All services</Link>}
        </p>
      </div>
    </section>
  );
}
