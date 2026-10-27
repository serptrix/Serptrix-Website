"use client";

import Link from "next/link";
import { articles } from "@/content/site-data";
import { trackContactEvent } from "@/lib/analytics";
import { HeroSculpture } from "./hero-sculpture";
import { ServiceNavigator } from "./service-navigator";

const process = [
  ["01", "Frame the problem", "We align on the business decision, the people affected, the current evidence, and the constraints around the work."],
  ["02", "Define the right scope", "Serptrix maps the journey and dependencies, then turns the highest-value opportunity into clear deliverables and review points."],
  ["03", "Build and review", "Work moves in visible stages. Your team provides context and feedback while Serptrix validates experience, implementation, and launch readiness."],
  ["04", "Launch and improve", "After release, agreed evidence informs what to maintain, optimize, test, or build next. The exact support model follows the engagement."],
] as const;

const questions = [
  ["Who does Serptrix work with?", "Serptrix is built for established businesses, funded startups, SaaS companies, ecommerce brands, and professional-services teams that need marketing, product, technology, or operations to work together more clearly."],
  ["Can we start with one service?", "Yes. A focused design, development, AI, or digital marketing engagement can stand alone. The scope only expands when the problem genuinely crosses disciplines."],
  ["What if we are not sure what we need?", "Start with the business problem, not a technical label. A strategy call or project inquiry gives the team enough context to identify a sensible first step."],
  ["How does a project begin?", "You can book a strategy call or send a project inquiry. Serptrix reviews the context, clarifies fit and constraints, then defines the appropriate discovery or project scope."],
  ["How are scope, timing, and pricing established?", "They depend on the outcome, current state, integrations, content readiness, stakeholder access, and delivery risk. These are clarified before a project plan is agreed."],
  ["What happens after launch?", "The appropriate next step depends on the engagement. It may include measurement, optimization, operational support, or a clean handoff with the documentation your team needs."],
] as const;

const principles = [
  ["01", "The problem shapes the team", "Design, development, AI, and marketing stay connected when the customer journey crosses disciplines."],
  ["02", "Decisions come before deliverables", "The work begins with context, constraints, and the decision that needs to improve—not a predetermined output list."],
  ["03", "Quality is part of the scope", "Responsive behavior, accessibility, performance, metadata, and launch readiness are treated as implementation requirements."],
  ["04", "Evidence keeps its context", "Measures are defined with their source, baseline, timeframe, and limits before they are used to guide the next decision."],
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
            <p className="home3-kicker"><span /> Design · Development · AI · Digital Marketing</p>
            <h1 id="home3-title">Bring your next <span>digital move into focus.</span></h1>
            <p className="home3-hero-lede">Serptrix connects design, development, practical AI, and digital marketing to help ambitious businesses create clearer experiences, useful systems, and qualified demand.</p>
            <div className="home3-actions">
              <Link className="home3-button home3-button-gold" href="/contact#calendly-booking" onClick={() => track("homepage_primary_cta", { destination: "calendly-booking" })}>Book a strategy call <span aria-hidden="true">↗</span></Link>
              <Link className="home3-text-link home3-text-link-light" href="#service-paths" onClick={() => track("homepage_secondary_cta", { destination: "service-paths" })}>Explore services <span aria-hidden="true">↓</span></Link>
            </div>
            <p className="home3-action-note">Start with the business problem. We will help define the right next step.</p>
          </div>
          <HeroSculpture />
        </div>
        <div className="home3-credibility home3-shell" aria-label="How Serptrix works">
          <p>One connected team from diagnosis through delivery.</p>
          <ul><li>Commercial context before channel tactics</li><li>Accessible, performance-aware delivery</li><li>Measurement planned before launch</li></ul>
        </div>
      </section>

      <ServiceNavigator />

      <section className="home3-work" aria-labelledby="work-title">
        <div className="home3-shell">
          <div className="home3-section-head home3-section-head-compact">
            <p className="home3-index">Selected internal work</p>
            <div><h2 id="work-title">Working systems you can inspect right now.</h2><p>These are Serptrix-owned platform projects, not client case studies. Each links to the live deliverable so you can evaluate the thinking and implementation directly.</p></div>
          </div>
          <div className="home3-work-list">
            <article className="home3-work-item">
              <div className="home3-work-visual home3-work-visual-services" aria-hidden="true"><span className="home3-work-visual-label">Services / architecture</span><div className="home3-work-visual-title">Find the right starting point.</div><div className="home3-work-pillar-lines"><i /><i /><i /><i /></div></div>
              <div className="home3-work-copy">
                <p>Serptrix-owned platform · Service architecture</p>
                <h3>A four-pillar service ecosystem built around customer intent.</h3>
                <dl><div><dt>Problem</dt><dd>A large service catalogue can force buyers to decode agency terminology before they know where to start.</dd></div><div><dt>Contribution</dt><dd>Information architecture, distinct service journeys, accessible navigation, metadata, and contextual inquiry handoffs.</dd></div></dl>
                <Link className="home3-text-link" href="/services">Explore the service system <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="home3-work-item home3-work-item-reverse">
              <div className="home3-work-visual home3-work-visual-inquiry" aria-hidden="true"><span className="home3-work-visual-label">Inquiry / qualification</span><div className="home3-work-form-preview"><span>01 · Context</span><i /><i /><i className="short" /><b>Continue →</b></div></div>
              <div className="home3-work-copy">
                <p>Serptrix-owned platform · Conversion journey</p>
                <h3>A clearer route from service research to a qualified conversation.</h3>
                <dl><div><dt>Problem</dt><dd>Booking and inquiry are different levels of intent, but generic contact journeys often treat them as the same action.</dd></div><div><dt>Contribution</dt><dd>Separate call and project-inquiry paths, service preselection, progressive form steps, validation, and consent-aware conversion events.</dd></div></dl>
                <Link className="home3-text-link" href="/contact#project-inquiry">Inspect the inquiry journey <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="home3-proof" aria-labelledby="proof-title">
        <div className="home3-shell home3-proof-grid">
          <div className="home3-proof-copy">
            <p className="home3-index home3-index-light">Why Serptrix</p><h2 id="proof-title">The way the work is shaped matters.</h2>
            <p>Serptrix connects strategic context with hands-on delivery, so the recommendation, implementation, and evidence stay part of the same conversation.</p>
            <Link className="home3-text-link home3-text-link-light" href="/about">Read the Serptrix approach <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home3-proof-list">{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="home3-about" aria-labelledby="about-title">
        <div className="home3-shell home3-about-grid">
          <div className="home3-about-intro"><p className="home3-index">About Serptrix</p><h2 id="about-title">The people closest to the problem stay close to the work.</h2></div>
          <div className="home3-about-copy"><p>Serptrix is built for growth problems that sit between marketing, product, operations, and technology. The working model brings those perspectives around one brief, with direct communication and visible decisions from diagnosis through delivery.</p><div className="home3-about-disciplines" aria-label="Connected Serptrix disciplines"><span>Strategy</span><span>Experience</span><span>Technology</span><span>Growth</span></div><Link className="home3-text-link" href="/about">Meet the thinking behind Serptrix <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="home3-process" aria-labelledby="process-title">
        <div className="home3-shell">
          <div className="home3-section-head home3-section-head-compact"><p className="home3-index">How we work</p><div><h2 id="process-title">A practical path from uncertainty to delivery.</h2><p>The exact shape changes by engagement. These four decision points keep your context, Serptrix’s work, and review responsibilities connected.</p></div></div>
          <ol className="home3-process-list">{process.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        </div>
      </section>

      {featuredArticles.length > 0 && <section className="home3-insights" aria-labelledby="insights-title"><div className="home3-shell"><div className="home3-section-head home3-section-head-compact"><p className="home3-index">Useful thinking</p><div><h2 id="insights-title">Ideas for better digital decisions.</h2><Link className="home3-text-link" href="/blog">View all insights <span aria-hidden="true">→</span></Link></div></div><div className="home3-article-grid">{featuredArticles.map((article, index) => <article key={article.slug}><div className={`home3-article-mark mark-${index + 1}`} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div><p>{article.category} <span>{article.readingTime}</span></p><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link aria-label={`Read ${article.title}`} href={`/blog/${article.slug}`}>Read article <span aria-hidden="true">↗</span></Link></article>)}</div></div></section>}

      <section className="home3-faq" aria-labelledby="faq-title">
        <div className="home3-shell home3-faq-grid"><div><p className="home3-index">Buying questions</p><h2 id="faq-title">Useful answers before you contact an agency.</h2><p>If your situation is not covered, send the context you do have. You do not need a finished brief.</p></div><div className="home3-questions">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="home3-final" aria-labelledby="final-title">
        <div className="home3-shell home3-final-grid"><div><p className="home3-kicker"><span /> Your next useful step</p><h2 id="final-title">Bring the constraint. Leave with a clearer direction.</h2></div><div><p>Choose the route that fits your level of readiness. A call is best for an initial conversation; an inquiry is best when you already have project context to share.</p><div className="home3-final-actions"><Link className="home3-button home3-button-gold" href="/contact#calendly-booking" onClick={() => track("homepage_primary_cta", { destination: "calendly-booking", placement: "final" })}>Book a strategy call <span aria-hidden="true">↗</span></Link><Link className="home3-button home3-button-outline" href="/contact#project-inquiry" onClick={() => track("homepage_secondary_cta", { destination: "project-inquiry", placement: "final" })}>Send a project inquiry <span aria-hidden="true">→</span></Link></div><small>Serptrix will review the context, clarify fit and constraints, and define an appropriate next step. Scope, timing, and pricing are established from the actual work required.</small></div></div>
      </section>
    </main>
  );
}
