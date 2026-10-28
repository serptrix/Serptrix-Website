import Link from "next/link";
import type { CatalogEntry, ServiceDefinition } from "@/content/service-catalog";
import { getServiceHref, inquiryHref, serviceBySlug } from "@/content/service-catalog";
import { approvedAgencyLogos } from "@/content/approved-logos";
import { Breadcrumbs } from "../breadcrumbs";
import { LogoMarquee } from "./logo-marquee";

const deliverySteps = [
  ["01", "Frame the decision", "We clarify the audience, current state, constraints, and evidence needed to judge the work."],
  ["02", "Shape the scope", "The proposal names deliverables, responsibilities, dependencies, review points, and material risks."],
  ["03", "Create and review", "Work moves in visible stages so your team can review the decisions that matter before they become expensive."],
  ["04", "Validate and hand over", "We complete the agreed checks, document the work, and make the next operating decision explicit."],
] as const;

const profiles = {
  design: {
    change: "From an inconsistent or difficult experience to a system people can recognize, navigate, and apply.",
    measures: ["Task clarity and completion", "Consistency across touchpoints", "Accessibility and usability findings", "Handoff quality and reuse"],
    inputs: ["Audience and journey context", "Existing brand or product materials", "Content and accessibility constraints", "Stakeholder review access"],
    tools: ["Research and journey mapping", "Wireframes and prototypes", "Responsive interface specifications", "Design-system documentation"],
  },
  development: {
    change: "From a limiting or fragile platform to a maintainable system with explicit requirements and operational ownership.",
    measures: ["Functional acceptance criteria", "Responsive and accessibility QA", "Performance and reliability checks", "Release readiness"],
    inputs: ["Requirements and user roles", "Existing architecture and integrations", "Content and data access", "Hosting and release constraints"],
    tools: ["Architecture and technical planning", "Version-controlled implementation", "Automated and manual QA", "Deployment and handover documentation"],
  },
  ai: {
    change: "From a promising AI idea to a bounded workflow with clear inputs, review points, and failure handling.",
    measures: ["Task-level evaluation quality", "Exception and escalation rate", "Human review effort", "Traceability and operating reliability"],
    inputs: ["Representative workflow examples", "Approved knowledge and data access", "Risk and permission boundaries", "Named human owners"],
    tools: ["Workflow and data mapping", "Prompt and retrieval evaluation", "Permission-aware integration", "Logging, review, and exception queues"],
  },
  "digital-marketing": {
    change: "From disconnected activity to a focused acquisition and measurement system tied to customer intent.",
    measures: ["Qualified demand and journey quality", "Conversion and cost signals", "Measurement coverage", "Learning by channel and message"],
    inputs: ["Audience and offer context", "Channel and analytics access", "Creative and landing experience", "Budget and commercial constraints"],
    tools: ["Demand and intent analysis", "Channel and campaign implementation", "Consent-aware measurement", "Reporting and optimization cadence"],
  },
} as const;

function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <header className="agency-section-head"><p>{eyebrow}</p><div><h2>{title}</h2>{copy && <span>{copy}</span>}</div></header>;
}

function Hero({ entry, title, lede }: { entry: CatalogEntry; title: string; lede: string }) {
  const crumbs = [{ label: "Services", href: "/services" }, ...(entry.kind !== "pillar" ? [{ label: entry.pillar.name, href: `/services/${entry.pillar.slug}` }] : []), ...(entry.kind === "service" ? [{ label: entry.category!.name, href: `/services/${entry.pillar.slug}/${entry.category!.slug}` }] : []), { label: title }];
  const eyebrow = entry.kind === "service" ? `${entry.pillar.name} / ${entry.category!.name}` : entry.kind === "category" ? `${entry.pillar.name} services` : "Service pillar";
  return <>
    <section className={`agency-hero agency-tone-${entry.pillar.slug}`}>
      <div className="agency-shell"><Breadcrumbs items={crumbs} tone="dark"/><div className="agency-hero-copy"><p className="agency-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lede}</p><div className="agency-actions"><Link className="btn btn-primary" href="/contact#calendly-booking">Book a strategy call <span aria-hidden="true">↗</span></Link><Link className="agency-link-light" href={entry.kind === "service" ? "#what-is-included" : "#compare-options"}>Explore the scope <span aria-hidden="true">↓</span></Link></div><small>Start with the problem. We will help shape the right scope.</small></div><div className="agency-decision-line" aria-hidden="true"><span>Problem</span><i/><span>Work</span><i/><span>Deliverable</span><i/><span>Evidence</span></div></div>
    </section>
    <LogoMarquee items={approvedAgencyLogos}/>
  </>;
}

function FinalCTA({ entry, noun }: { entry: CatalogEntry; noun: string }) {
  return <section className="agency-final"><div className="agency-shell agency-final-grid"><div><p>Start a useful conversation</p><h2>Let’s clarify what {noun} needs to change.</h2><span>Share the current situation, the decision in front of you, and any constraints already known. Serptrix will use that context to assess fit and shape a sensible next step.</span></div><div className="agency-actions"><Link className="btn btn-primary" href="/contact#calendly-booking">Book a strategy call <span aria-hidden="true">↗</span></Link><Link className="btn btn-secondary" href={inquiryHref(entry.service)}>Send a project inquiry <span aria-hidden="true">→</span></Link></div></div></section>;
}

function FAQ({ service, categoryName }: { service?: ServiceDefinition; categoryName: string }) {
  const name = service?.name ?? categoryName;
  const items = [
    ["How do I know whether this is the right starting point?", service ? `This is usually a fit when ${service.intent.charAt(0).toLowerCase()}${service.intent.slice(1)} The first conversation tests that assumption before a scope is proposed.` : "Start with the customer or operational problem. Serptrix can help distinguish this option from adjacent services before a scope is proposed."],
    ["What will the engagement include?", service ? `A proposal will select from the relevant work—${service.deliverables.join(", ").toLowerCase()}—and define acceptance criteria, inputs, and review ownership.` : "The exact mix depends on the selected service, current state, dependencies, and the decision the work needs to improve."],
    ["What affects scope, timing, and investment?", service?.considerations ?? "Current systems, readiness of content or data, stakeholder access, integrations, risk, and review speed all affect the effort required."],
    ["What does Serptrix need from our team?", "Access to the people and materials that explain the current state, a clear decision owner, timely review, and any technical or compliance constraints that could shape the work."],
    ["Who owns the work after handover?", "Ownership and usage rights are confirmed in the proposal. Handover covers the agreed files, implementation, documentation, and access required for the approved scope."],
    ["Can this connect with another Serptrix service?", `Yes. ${name} can be scoped independently or connected to a complementary discipline when the same business problem crosses experience, technology, operations, or demand.`],
  ];
  return <section className="agency-section agency-faq"><div className="agency-shell"><SectionHead eyebrow="Buying questions" title={`Questions teams ask before starting ${name}.`} copy="Clear scope comes before commitment."/><div className="agency-faq-list">{items.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>;
}

function PillarOrCategory({ entry }: { entry: CatalogEntry }) {
  const { pillar, category } = entry;
  const profile = profiles[pillar.slug];
  const isPillar = entry.kind === "pillar";
  const groups = isPillar ? pillar.categories : [category!];
  const title = isPillar ? `${pillar.name} services` : category!.name;
  const pillarLabel = pillar.name === "AI" ? "AI" : pillar.name.toLowerCase();
  const lede = isPillar ? `${pillar.description} ${pillar.promise}` : `${category!.description} ${category!.problem}`;
  return <main className="agency-page"><Hero entry={entry} title={title} lede={lede}/>
    <section className="agency-section agency-problem"><div className="agency-shell agency-split"><div><p className="agency-eyebrow">Recognize the need</p><h2>{isPillar ? pillar.problem : category!.problem}</h2></div><div className="agency-outcome"><span>What changes</span><p>{profile.change}</p><ul>{profile.measures.slice(0,3).map(x=><li key={x}>{x}</li>)}</ul></div></div></section>
    <section id="compare-options" className="agency-section agency-ink"><div className="agency-shell"><SectionHead eyebrow="Compare options" title={`Choose the ${pillarLabel} work that matches the constraint.`} copy="Each route explains fit, concrete scope, dependencies, and what the client receives."/><div className="agency-category-editorial">{groups.map((group,index)=><article key={group.slug}><header><span>0{index+1}</span><div><h3>{group.name}</h3><p>{group.description}</p>{isPillar&&<Link href={`/services/${pillar.slug}/${group.slug}`}>Compare {group.name} <i aria-hidden="true">→</i></Link>}</div></header><nav aria-label={`${group.name} services`}>{group.services.map(s=><Link key={s.slug} href={getServiceHref(s.slug)}><span><b>{s.name}</b><small>{s.intent}</small></span><i aria-hidden="true">↗</i></Link>)}</nav></article>)}</div></div></section>
    <section className="agency-section"><div className="agency-shell"><SectionHead eyebrow="Scope you can evaluate" title="The work is defined around decisions and tangible outputs." copy="A proposal selects the relevant parts rather than bundling everything by default."/><div className="agency-three-column"><article><span>Inputs</span><h3>What we need to understand</h3><ul>{profile.inputs.map(x=><li key={x}>{x}</li>)}</ul></article><article><span>Working method</span><h3>How the work becomes reviewable</h3><ul>{profile.tools.map(x=><li key={x}>{x}</li>)}</ul></article><article><span>Evidence</span><h3>How quality is judged</h3><ul>{profile.measures.map(x=><li key={x}>{x}</li>)}</ul></article></div></div></section>
    <section className="agency-section agency-approach"><div className="agency-shell agency-approach-grid"><div><p className="agency-eyebrow">Illustrative approach</p><h2>A visible chain from problem to evidence.</h2><p>This is a methodology example, not a client result. It shows how an engagement keeps the original business decision connected to the delivered work.</p></div><ol>{deliverySteps.map(([n,t,c])=><li key={n}><span>{n}</span><div><h3>{t}</h3><p>{c}</p></div></li>)}</ol></div></section>
    <section className="agency-section agency-engagement"><div className="agency-shell agency-split"><div><p className="agency-eyebrow">Engagement considerations</p><h2>Start focused. Expand only when the dependencies justify it.</h2></div><div><p>{isPillar ? pillar.promise : category!.description}</p><p>Scope, timing, and investment depend on the current state, stakeholder access, content or data readiness, integrations, risk, and the number of review cycles required.</p><Link href={inquiryHref()}>Describe your situation <span aria-hidden="true">→</span></Link></div></div></section>
    <FAQ categoryName={title}/><FinalCTA entry={entry} noun={isPillar ? "your next initiative" : `your ${category!.name.toLowerCase()} work`}/>
  </main>;
}

function ServicePage({ entry }: { entry: CatalogEntry }) {
  const { pillar, category, service } = entry;
  const s = service!;
  const profile = profiles[pillar.slug];
  const related = s.related.map(slug=>serviceBySlug.get(slug)).filter(Boolean) as CatalogEntry[];
  const problems = s.useCases.length >= 3 ? s.useCases : [...s.useCases, category!.problem];
  return <main className="agency-page"><Hero entry={entry} title={s.name} lede={`${s.intent} ${s.outcome}`}/>
    <section className="agency-section agency-familiar"><div className="agency-shell"><SectionHead eyebrow="Does this sound familiar?" title="The signals that make this work worth considering." copy="A useful scope begins with the consequence of the problem—not a predetermined deliverables list."/><div className="agency-situation-list">{problems.map((x,i)=><article key={x}><span>0{i+1}</span><h3>{x}</h3><p>{i===0 ? category!.problem : "Without a clear response, this can add friction, delay decisions, or make the current system harder to operate."}</p></article>)}</div></div></section>
    <section className="agency-section agency-change"><div className="agency-shell agency-change-grid"><div><p className="agency-eyebrow">What the service changes</p><h2>{s.outcome}</h2><p>{profile.change}</p></div><div className="agency-flow" aria-label={`Illustrative ${s.name} workflow`}><div><span>Current constraint</span><b>{s.useCases[0]}</b></div><i aria-hidden="true">→</i><div><span>Focused work</span><b>{s.intent}</b></div><i aria-hidden="true">→</i><div><span>Reviewable result</span><b>{s.outcome}</b></div></div></div></section>
    <section id="what-is-included" className="agency-section"><div className="agency-shell"><SectionHead eyebrow="What is included" title={`The core components of focused ${s.name.toLowerCase()}.`} copy="Each component exists to resolve a specific decision or implementation need."/><div className="agency-scope-list">{s.deliverables.map((x,i)=><article key={x}><span>0{i+1}</span><div><h3>{x}</h3><p>{i===0 ? "Defines the foundation and removes ambiguity before downstream work begins." : i===1 ? "Turns the agreed direction into a reviewable working asset or implementation." : "Checks the result, records key decisions, and supports a practical handover."}</p></div></article>)}</div></div></section>
    <section className="agency-section agency-ink"><div className="agency-shell agency-deliverable-band"><div><p className="agency-eyebrow">Tangible deliverables</p><h2>What your team can actually receive.</h2><p>Deliverables are agreed in the proposal. They are not the same as hoped-for business outcomes.</p></div><ul>{s.deliverables.map((x,i)=><li key={x}><span>{String(i+1).padStart(2,"0")}</span><div><b>{x}</b><small>Prepared for review, ownership, and use within the agreed scope.</small></div></li>)}</ul></div></section>
    <section className="agency-section agency-demo"><div className="agency-shell agency-demo-grid"><div className="agency-demo-visual" aria-hidden="true"><span>01</span><i/><span>02</span><i/><span>03</span></div><div><p className="agency-eyebrow">Illustrative deliverable</p><h2>A decision record, not decorative project theatre.</h2><p>This labeled methodology example shows how Serptrix can connect the initial constraint, the work completed, the review evidence, and the next operating decision. It is not presented as client work or a performance result.</p><Link href="#delivery-process">See the delivery process <span aria-hidden="true">↓</span></Link></div></div></section>
    <section id="delivery-process" className="agency-section agency-process"><div className="agency-shell"><SectionHead eyebrow="How we deliver" title="A service-specific path with visible review points." copy={`The exact sequence adapts to ${s.name.toLowerCase()}, its dependencies, and the risk of the decision.`}/><ol>{deliverySteps.map(([n,t,c],i)=><li key={n}><span>{n}</span><div><h3>{i===1 ? `Define the ${s.name.toLowerCase()} scope` : t}</h3><p>{c}</p></div></li>)}</ol></div></section>
    <section className="agency-section"><div className="agency-shell agency-evidence-grid"><div><p className="agency-eyebrow">How success is evaluated</p><h2>Use evidence appropriate to the service—not a universal vanity metric.</h2><p>{s.considerations}</p></div><ul>{profile.measures.map(x=><li key={x}><span aria-hidden="true">✓</span>{x}</li>)}</ul></div></section>
    <section className="agency-section agency-ecosystem"><div className="agency-shell"><SectionHead eyebrow="Tools, platforms, and integrations" title="Chosen for the workflow, not displayed as a decorative logo wall." copy="Specific products and access requirements are confirmed during scoping; no partnership or certification is implied."/><div className="agency-three-column">{profile.tools.map((x,i)=><article key={x}><span>0{i+1}</span><h3>{x}</h3><p>{profile.inputs[i] ?? profile.inputs[0]}</p></article>)}</div></div></section>
    <section className="agency-section agency-engagement"><div className="agency-shell agency-split"><div><p className="agency-eyebrow">Scope and timing</p><h2>A sensible starting point depends on readiness and risk.</h2></div><div><p>{s.considerations}</p><p>Serptrix confirms the recommended starting point, dependencies, review cadence, and commercial scope after understanding the current situation. No unverified fixed timeline or package is implied.</p><Link href={inquiryHref(s)}>Ask about this service <span aria-hidden="true">→</span></Link></div></div></section>
    {related.length > 0 && <section className="agency-section agency-related"><div className="agency-shell"><SectionHead eyebrow="Related services" title="Useful when the same problem crosses a boundary." copy="These are complementary options, not required add-ons."/><div>{related.slice(0,4).map(x=><Link key={x.href} href={x.href}><span>{x.pillar.name} / {x.category!.name}</span><b>{x.service!.name}</b><p>{x.service!.intent}</p><i aria-hidden="true">↗</i></Link>)}</div></div></section>}
    <FAQ service={s} categoryName={category!.name}/><FinalCTA entry={entry} noun={s.name.toLowerCase()}/>
  </main>;
}

export function ServiceArchitecturePage({ entry }: { entry: CatalogEntry }) {
  return entry.kind === "service" ? <ServicePage entry={entry}/> : <PillarOrCategory entry={entry}/>;
}
