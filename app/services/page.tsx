import Link from "next/link";
import { ServiceExplorer } from "../components/service-explorer";
import { MagneticButton } from "../components/motion/magnetic-button";
import { FAQ } from "../components/faq";
import { Breadcrumbs } from "../components/breadcrumbs";
import { divisions, services } from "@/content/site-data";
import { StructuredData } from "../components/structured-data";

export const metadata = {
  title: "Services",
  description: "Explore connected digital marketing, development, AI, automation, and strategy services from Serptrix.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Serptrix",
    description: "Explore connected digital marketing, development, AI, automation, and strategy services from Serptrix.",
  },
};

const faqs: [string, string][] = [
  ["Where should we start?", "Start with the business constraint rather than a predetermined deliverable. A focused diagnostic can identify the highest-leverage route."],
  ["Can we engage one service only?", "Yes. Every service has a clear standalone role, while the wider system remains available when adjacent constraints emerge."],
  ["Do you offer ongoing support?", "Engagements can be project-based, transformation programs, or continuous growth partnerships with defined priorities and review points."],
  ["How do you scope work?", "Scope follows the outcome, current evidence, dependencies, internal capacity, and the decisions that need to be resolved first."],
];

export default function Services() {
  return (
    <div className="sv-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Serptrix Services",
          description: "Connected digital marketing, development, AI and strategy services.",
          url: "https://serptrix.com/services",
        }}
      />
      <section className="sv-hub-hero shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <p className="eyebrow">
          <span /> Connected capabilities
        </p>
        <h1>
          Start with the problem.
          <br />
          <em>Build the right system.</em>
        </h1>
        <p>
          Serptrix combines marketing, development, AI and strategy around the commercial constraint—not a
          predetermined menu of deliverables.
        </p>
        <div className="sv-hero-actions">
          <MagneticButton href="/contact" className="srx-button srx-button-gold">
            Book a Strategy Call
          </MagneticButton>
          <a className="srx-line-link sv-dark-link" href="#divisions">
            Explore capabilities <span>↓</span>
          </a>
        </div>
      </section>
      <section className="challenge-explorer section shell">
        <div className="section-head">
          <p className="section-index">Explore your way</p>
          <div>
            <h2>
              Find the route by
              <br />
              <em>problem or outcome.</em>
            </h2>
            <p>You do not need to diagnose the service before speaking with us.</p>
          </div>
        </div>
        <ServiceExplorer />
      </section>
      <section className="hub-divisions dark-section" id="divisions">
        <div className="shell">
          <div className="section-head">
            <p className="section-index light">Three divisions</p>
            <div>
              <h2>
                Distinct disciplines.
                <br />
                <em>Shared direction.</em>
              </h2>
            </div>
          </div>
          <div className="hub-division-grid">
            {Object.entries(divisions).map(([slug, division], index) => (
              <article key={slug}>
                <span>0{index + 1}</span>
                <h3>{division.name}</h3>
                <p>{division.summary}</p>
                <ul>
                  {division.services.map((item) => (
                    <li key={item}>
                      <Link href={`/services/${item}`}>
                        {services.find((service) => service.slug === item)?.name}
                        <b>↗</b>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${slug}`}>
                  Explore the division <b>→</b>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="solution-combos section shell">
        <p className="section-index">Connected solutions</p>
        <h2>
          Some problems need
          <br />
          <em>more than one lens.</em>
        </h2>
        <div>
          {[
            ["Demand engine", "SEO + Performance Marketing + Website Development", "Connect discovery, acquisition and conversion around qualified intent."],
            ["Digital product launch", "Digital Strategy + SaaS Development + Performance Marketing", "Validate the product, build the experience and create a measurable route to market."],
            ["Intelligent operations", "AI Development + AI Automation + Digital Strategy", "Redesign a workflow, apply intelligence safely and connect the surrounding systems."],
          ].map((item) => (
            <article key={item[0]}>
              <h3>{item[0]}</h3>
              <b>{item[1]}</b>
              <p>{item[2]}</p>
            </article>
          ))}
        </div>
      </section>
      <FAQ items={faqs} />
      <section className="sv-final">
        <div className="shell">
          <p className="section-index light">Next step</p>
          <h2>
            Bring us the constraint. <em>We will find the system.</em>
          </h2>
          <p>We’ll help you identify the system behind the problem and the right place to begin.</p>
          <div className="sv-final-actions">
            <MagneticButton href="/contact" className="srx-button srx-button-gold">
              Book a Strategy Call
            </MagneticButton>
            <Link className="btn btn-outline sv-final-quiet" href="/contact#project-inquiry">
              Start a Project <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
