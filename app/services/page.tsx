import Link from "next/link";
import { StructuredData } from "@/app/components/structured-data";
import { getServiceHref, servicePillars } from "@/content/service-catalog";

export const metadata = {
  title: "Design, Development, AI & Marketing Services | Serptrix",
  description: "Explore Serptrix design, development, AI, and digital marketing services. Compare focused options and find the right starting point for your business.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Serptrix Services", description: "Four connected service pillars for brands, products, operations, and demand.", url: "/services" },
};

export default function ServicesPage() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": "https://serptrix.com/services#page", url: "https://serptrix.com/services", name: "Serptrix Services", description: metadata.description }} />
    <main className="svc-page svc-directory">
      <section className="svc-hero"><div className="svc-shell svc-hero-grid"><div><p className="svc-eyebrow svc-eyebrow-light">Services directory</p><h1>Find the right expertise for the problem in front of you.</h1><p className="svc-hero-lede">Explore four connected pillars without having to translate your challenge into agency terminology first.</p><div className="svc-actions"><Link className="btn btn-primary" href="/contact#project-inquiry">Describe your project <span aria-hidden="true">→</span></Link><Link className="btn btn-secondary" href="/contact#calendly-booking">Book a strategy call <span aria-hidden="true">↗</span></Link></div></div><aside><span>How to use this directory</span><p>Start with the closest pillar. Category pages help compare adjacent options; every service page explains fit, scope, constraints, and next steps.</p><ul><li>Design clarifies the experience</li><li>Development builds the system</li><li>AI improves bounded workflows</li><li>Marketing connects demand and measurement</li></ul></aside></div></section>
      <section className="svc-section" aria-labelledby="directory-title"><div className="svc-shell"><header className="svc-section-head"><p>All capabilities</p><div><h2 id="directory-title">Four pillars, organized around customer needs.</h2><span>Every service below has a dedicated page. Platform specializations sit inside the work they support, not in a disconnected tool list.</span></div></header><div className="svc-directory-grid">{servicePillars.map((pillar, index) => <article key={pillar.slug}><header><span>0{index + 1}</span><h2><Link href={`/services/${pillar.slug}`}>{pillar.name} <i aria-hidden="true">↗</i></Link></h2><p>{pillar.description}</p></header>{pillar.categories.map((category) => <section key={category.slug}><h3><Link href={`/services/${pillar.slug}/${category.slug}`}>{category.name}</Link></h3><nav aria-label={`${category.name} services`}>{category.services.map((service) => <Link key={service.slug} href={getServiceHref(service.slug)}>{service.name}<span aria-hidden="true">→</span></Link>)}</nav></section>)}</article>)}</div></div></section>
      <section className="svc-close"><div className="svc-shell svc-close-grid"><div><p className="svc-eyebrow svc-eyebrow-light">Unsure where to start?</p><h2>Bring the business problem.</h2><p>Serptrix can help identify whether the first useful step belongs in design, development, AI, marketing, or a focused combination.</p></div><div className="svc-actions"><Link className="btn btn-primary" href="/contact#calendly-booking">Book a strategy call <span aria-hidden="true">↗</span></Link><Link className="btn btn-secondary" href="/contact#project-inquiry">Send a project inquiry <span aria-hidden="true">→</span></Link></div></div></section>
    </main>
  </>;
}
