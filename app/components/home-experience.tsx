"use client";

import Link from "next/link";
import { articles } from "@/content/site-data";
import { trackContactEvent } from "@/lib/analytics";
import { Hero3DComposition } from "./hero-3d-composition";
import { ServiceNavigator } from "./service-navigator";

const process = [
  ["01", "Frame the decision", "We start with the business context, the people affected, and the decision the work needs to improve."],
  ["02", "Diagnose the constraint", "You bring goals, access, and practical context. We map the journey, evidence, systems, and risks."],
  ["03", "Design the right scope", "We turn findings into a focused plan with deliverables, responsibilities, measures, and review points."],
  ["04", "Build and validate", "Work moves in visible stages. We review the experience, technical quality, accessibility, and launch readiness."],
  ["05", "Launch and learn", "After release, agreed evidence informs what to maintain, improve, test, or build next."],
] as const;

const questions = [
  ["Who does Serptrix work with?", "Serptrix is built for established businesses, funded startups, SaaS companies, ecommerce brands, and professional-services teams that need marketing, product, technology, or operations to work together more clearly."],
  ["Can we start with one service?", "Yes. A focused SEO, website, ecommerce, SaaS, AI, automation, or strategy engagement can stand alone. The scope only expands when the problem genuinely crosses disciplines."],
  ["What if we are not sure what we need?", "Start with the business problem, not a technical label. A strategy call or project inquiry gives the team enough context to identify a sensible first step."],
  ["How does a project begin?", "You can book a strategy call or send a project inquiry. Serptrix reviews the context, clarifies fit and constraints, then defines the appropriate discovery or project scope."],
  ["How are scope, timing, and pricing established?", "They depend on the outcome, current state, integrations, content readiness, stakeholder access, and delivery risk. These are clarified before a project plan is agreed."],
  ["What happens after launch?", "The appropriate next step depends on the engagement. It may include measurement, optimization, operational support, or a clean handoff with the documentation your team needs."],
] as const;

function track(type: "homepage_primary_cta" | "homepage_secondary_cta" | "service_path_selected", detail: Record<string, unknown> = {}) {
  trackContactEvent(type, detail);
}

export default function HomeExperience() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <main className="home3">
      <section className="home3-hero" aria-labelledby="home3-title">
        <div className="home3-shell home3-hero-grid">
          <div className="home3-hero-copy">
            <p className="home3-kicker"><span /> Marketing, digital products, AI &amp; automation</p>
            <h1 id="home3-title">Turn digital friction into a clearer path to growth.</h1>
            <p className="home3-hero-lede">Serptrix helps ambitious teams attract qualified demand, build better digital experiences, and remove repetitive work—without forcing the problem into one discipline.</p>
            <div className="home3-actions">
              <Link className="home3-button home3-button-gold" href="/contact#calendly-booking" onClick={() => track("homepage_primary_cta", { destination: "calendly-booking" })}>
                Book a strategy call <span aria-hidden="true">↗</span>
              </Link>
              <Link className="home3-text-link home3-text-link-light" href="#service-paths" onClick={() => track("homepage_secondary_cta", { destination: "service-paths" })}>
                Choose a starting point <span aria-hidden="true">↓</span>
              </Link>
            </div>
            <p className="home3-action-note">Bring the problem you are trying to solve. We will help clarify the most useful next step.</p>
          </div>

          <Hero3DComposition />
        </div>
        <div className="home3-credibility home3-shell" aria-label="How Serptrix works">
          <p>One connected team from diagnosis through delivery.</p>
          <ul>
            <li>Commercial context before channel tactics</li>
            <li>Accessible, performance-aware delivery</li>
            <li>Measurement planned before launch</li>
          </ul>
        </div>
      </section>

      <ServiceNavigator />

      <section className="home3-proof" aria-labelledby="proof-title">
        <div className="home3-shell home3-proof-grid">
          <div className="home3-proof-copy">
            <p className="home3-index home3-index-light">What you can evaluate now</p>
            <h2 id="proof-title">Credibility should live in the work, not in unsupported claims.</h2>
            <p>Serptrix has not published client identities, attributed testimonials, or verified result metrics in this project yet. Rather than dress placeholders up as proof, the homepage shows the standards you can inspect before an engagement begins.</p>
            <Link className="home3-text-link home3-text-link-light" href="/about">Read how Serptrix thinks <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home3-proof-list">
            <article><span>01</span><div><h3>Scope follows the constraint</h3><p>The recommendation starts with the business decision, customer journey, and operating reality—not a predetermined deliverable.</p></div></article>
            <article><span>02</span><div><h3>Measures get context</h3><p>Baselines, data sources, timeframes, and attribution limits are defined before a result is presented as evidence.</p></div></article>
            <article><span>03</span><div><h3>Quality is part of delivery</h3><p>Accessibility, responsive behavior, performance, metadata, and launch readiness are treated as implementation requirements.</p></div></article>
            <article><span>04</span><div><h3>AI stays accountable</h3><p>Useful workflows define evaluation criteria, human review, exceptions, monitoring, and ownership—not only model output.</p></div></article>
          </div>
        </div>
      </section>

      <section className="home3-process" aria-labelledby="process-title">
        <div className="home3-shell">
          <div className="home3-section-head home3-section-head-compact">
            <p className="home3-index">Working together</p>
            <div><h2 id="process-title">A practical path from uncertainty to delivery.</h2><p>The exact shape changes by engagement. These are the decision points that keep strategy and execution connected.</p></div>
          </div>
          <ol className="home3-process-list">{process.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        </div>
      </section>

      <section className="home3-faq" aria-labelledby="faq-title">
        <div className="home3-shell home3-faq-grid">
          <div><p className="home3-index">Buying questions</p><h2 id="faq-title">Useful answers before you contact an agency.</h2><p>If your situation is not covered, send the context you do have. You do not need a finished brief.</p></div>
          <div className="home3-questions">
            {questions.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><i aria-hidden="true" /></summary><p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="home3-insights" aria-labelledby="insights-title">
          <div className="home3-shell">
            <div className="home3-section-head home3-section-head-compact">
              <p className="home3-index">Useful thinking</p>
              <div><h2 id="insights-title">Ideas for better digital decisions.</h2><Link className="home3-text-link" href="/blog">View all insights <span aria-hidden="true">→</span></Link></div>
            </div>
            <div className="home3-article-grid">
              {featuredArticles.map((article, index) => (
                <article key={article.slug}>
                  <div className={`home3-article-mark mark-${index + 1}`} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <p>{article.category} <span>{article.readingTime}</span></p>
                  <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <Link aria-label={`Read ${article.title}`} href={`/blog/${article.slug}`}>Read article <span aria-hidden="true">↗</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="home3-final" aria-labelledby="final-title">
        <div className="home3-shell home3-final-grid">
          <div><p className="home3-kicker"><span /> Your next useful step</p><h2 id="final-title">Bring the constraint. Leave with a clearer direction.</h2></div>
          <div><p>Choose the route that fits your level of readiness. A call is best for an initial conversation; an inquiry is best when you already have project context to share.</p>
            <div className="home3-final-actions">
              <Link className="home3-button home3-button-gold" href="/contact#calendly-booking" onClick={() => track("homepage_primary_cta", { destination: "calendly-booking", placement: "final" })}>Book a strategy call <span aria-hidden="true">↗</span></Link>
              <Link className="home3-button home3-button-outline" href="/contact#project-inquiry" onClick={() => track("homepage_secondary_cta", { destination: "project-inquiry", placement: "final" })}>Send a project inquiry <span aria-hidden="true">→</span></Link>
            </div>
            <small>Serptrix will review the context, clarify fit and constraints, and define an appropriate next step. Scope, timing, and pricing are established from the actual work required.</small>
          </div>
        </div>
      </section>
    </main>
  );
}
