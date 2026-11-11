import type { CatalogEntry } from "@/content/service-catalog";
import { getServiceHref, serviceBySlug } from "@/content/service-catalog";
import { servicePageCopy } from "@/content/page-copy/index";

export type DetailCard = { title: string; items: string[] };
export type DetailStep = { n: string; title: string; copy: string };
export type DetailMetric = { title: string; copy: string };
export type DetailRelated = { href: string; title: string; copy: string; cta: string };
export type DetailFaq = { q: string; a: string };

export type ServiceDetailModel = {
  eyebrow: string;
  title: string;
  lede: string;
  crumbLabel: string;
  crumbs: { label: string; href?: string }[];
  inquiryLabel: string;
  fitTitle: string;
  fitGood: string[];
  fitNot: string[];
  deliverables: DetailCard[];
  stages: DetailStep[];
  evidenceTitle: string;
  metrics: DetailMetric[];
  noPromise: string;
  pricingNote: string;
  faqs: DetailFaq[];
  related: DetailRelated[];
  showSerpVisual: boolean;
  overview?: string;
  fitHeading?: string;
  scopeHeading?: string;
  processHeading?: string;
};

const stages: DetailStep[] = [
  { n: "1", title: "Audit", copy: "We review your current situation and the constraints that matter. You share access to the systems and people we need." },
  { n: "2", title: "Plan", copy: "We agree priorities, deliverables and what to do first. You review and approve the plan in writing." },
  { n: "3", title: "Improve", copy: "We make or brief the changes in stages. You review key points before we move on." },
  { n: "4", title: "Report", copy: "We share what moved and what comes next. You join a regular review." },
];

const seoOverride: Partial<ServiceDetailModel> = {
  title: "SEO services that help the right customers find your business.",
  lede: "For businesses with a website that is not being found. We improve how your site appears in search results, so more relevant people visit and get in touch.",
  fitGood: [
    "Your website exists, but few relevant visitors find it.",
    "Search is an important source of enquiries or sales.",
    "You are launching or redesigning a site and want it found.",
    "Competitors appear above you for terms that matter.",
    "You want clear reporting, not vague promises.",
  ],
  fitNot: [
    "You do not have a website or a clear offer. Start with Design or Development.",
    "You need a guaranteed ranking by a fixed date. No honest agency can promise this.",
    "You cannot approve changes to your site.",
  ],
  deliverables: [
    { title: "Audit and plan", items: ["Technical and content audit", "Keyword and competitor research", "A prioritised action plan"] },
    { title: "Technical SEO", items: ["Crawling and indexing fixes", "Page speed and mobile usability", "Site structure and internal links"] },
    { title: "Content and on-page SEO", items: ["Page titles and descriptions", "Improvements to existing content", "Recommendations for new pages"] },
    { title: "Reporting and next steps", items: ["Monthly summary in plain English", "Visits and enquiries from search", "Clear next actions"] },
  ],
  stages: [
    { n: "1", title: "Audit", copy: "We review your site and how it appears in search. You share access to your website and analytics." },
    { n: "2", title: "Plan", copy: "We agree priorities and what to do first. You review and approve the plan." },
    { n: "3", title: "Improve", copy: "We make or brief the changes. You review key changes before they go live." },
    { n: "4", title: "Report", copy: "We share what moved and what comes next. You join a regular review." },
  ],
  evidenceTitle: "SEO work in context",
  metrics: [
    { title: "Visibility", copy: "How often you appear for search terms that matter to your business." },
    { title: "Visits", copy: "How many people arrive from search, and which pages they land on." },
    { title: "Enquiries", copy: "Contact forms, calls or sales that start from search." },
    { title: "Site health", copy: "Errors fixed, page speed and mobile usability." },
  ],
  noPromise:
    "Guaranteed rankings or a fixed number of visitors. Search results depend on competition, your site’s history and changes made by search engines. We report what changed and why.",
  pricingNote: "Pricing depends on the size of your site, your competition and your goals.",
  faqs: [
    { q: "How long does SEO take to show results?", a: "It usually takes months, not days. The timing depends on your competition, your site’s history and how much needs fixing. We agree what to expect during planning." },
    { q: "Do you guarantee rankings?", a: "No. Nobody can promise a position in search results. We commit to the work in the agreed scope and to clear reporting." },
    { q: "What access do you need?", a: "Access to your website and analytics. We tell you exactly what is needed during the audit." },
    { q: "Will you rewrite my website?", a: "Not unless it helps. We start with fixes and improvements to what you have, and recommend new pages where there are gaps." },
    { q: "Can you work with my developer or platform?", a: "Yes. We can make changes ourselves or give your developer a clear, prioritised brief." },
    { q: "How will I see progress?", a: "Through a regular plain-English report covering visibility, visits, enquiries and next actions." },
  ],
  showSerpVisual: true,
};

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function relatedFromService(entry: CatalogEntry): DetailRelated[] {
  if (entry.kind !== "service") {
    const services = entry.kind === "pillar" ? entry.pillar.categories.flatMap((c) => c.services).slice(0, 3) : entry.category!.services.slice(0, 3);
    return services.map((s) => ({
      href: getServiceHref(s.slug),
      title: s.name,
      copy: s.intent,
      cta: `Explore ${s.name}`,
    }));
  }
  const related = entry.service!.related
    .map((slug) => serviceBySlug.get(slug))
    .filter(Boolean)
    .slice(0, 3) as CatalogEntry[];
  if (related.length) {
    return related.map((r) => ({
      href: r.href,
      title: r.service!.name,
      copy: r.service!.intent,
      cta: `Explore ${r.service!.name}`,
    }));
  }
  // Fall back to sibling services
  return entry
    .category!.services.filter((s) => s.slug !== entry.service!.slug)
    .slice(0, 3)
    .map((s) => ({
      href: getServiceHref(s.slug),
      title: s.name,
      copy: s.intent,
      cta: `Explore ${s.name}`,
    }));
}

export function buildServiceDetailModel(entry: CatalogEntry): ServiceDetailModel {
  const { pillar, category, service, kind } = entry;
  const name = kind === "service" ? service!.name : kind === "category" ? category!.name : `${pillar.name} services`;
  const short = name.replace(/ services$/i, "");

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    ...(kind !== "pillar" ? [{ label: pillar.name, href: `/services/${pillar.slug}` }] : []),
    ...(kind === "service" ? [{ label: category!.name, href: `/services/${pillar.slug}/${category!.slug}` }] : []),
    { label: name },
  ];

  let deliverables: DetailCard[];
  if (kind === "service") {
    deliverables = service!.deliverables.map((d, i) => ({
      title: d,
      items: [
        i === 0 ? "Defines the foundation before downstream work." : i === 1 ? "Turns direction into a reviewable working asset." : "Supports review, ownership and next decisions.",
        service!.useCases[i] ?? service!.outcome,
      ],
    }));
    while (deliverables.length < 4) {
      deliverables.push({
        title: "Reporting and next steps",
        items: ["Plain-English progress summary", "What changed and why", "Clear next actions"],
      });
    }
    deliverables = deliverables.slice(0, 4);
  } else if (kind === "category") {
    const services = category!.services;
    deliverables = chunk(services, Math.max(1, Math.ceil(services.length / Math.min(4, services.length))))
      .slice(0, 4)
      .map((group, i) => ({
        title: i === 0 ? "Services in this category" : `More ${short} options`,
        items: group.map((s) => s.name),
      }));
  } else {
    deliverables = pillar.categories.slice(0, 4).map((c) => ({
      title: c.name,
      items: c.services.slice(0, 4).map((s) => s.name),
    }));
  }

  const fitGood =
    kind === "service"
      ? service!.useCases
      : kind === "category"
        ? category!.services.slice(0, 5).map((s) => s.intent)
        : pillar.categories.map((c) => c.problem);

  const base: ServiceDetailModel = {
    eyebrow: kind === "service" ? pillar.name : kind === "category" ? `${pillar.name} services` : "Serptrix services",
    title:
      kind === "service"
        ? `${service!.name} to ${service!.intent.charAt(0).toLowerCase()}${service!.intent.slice(1).replace(/\.$/, "")}.`
        : kind === "category"
          ? `${category!.name} for the problem in front of you.`
          : `${pillar.name} services, organised around clear business problems.`,
    lede: kind === "service" ? service!.outcome : kind === "category" ? `${category!.description} ${category!.problem}` : `${pillar.description} ${pillar.promise}`,
    crumbLabel: name,
    crumbs,
    inquiryLabel: name,
    fitTitle: `${short} is a good fit if`,
    fitGood: fitGood.slice(0, 5),
    fitNot: [
      "You do not yet have a clear problem or decision to improve.",
      "You need a guaranteed outcome by a fixed date that no honest scope can promise.",
      kind === "service" ? service!.considerations : "You cannot provide the access, owners or materials needed to do the work.",
    ].map((x) => (x.length > 160 ? x.slice(0, 157) + "…" : x)),
    deliverables,
    stages,
    evidenceTitle: `${short} work in context`,
    metrics: [
      { title: "Clarity", copy: "Whether the problem, scope and owners are explicit enough to judge the work." },
      { title: "Delivery", copy: "Whether agreed outputs were completed and reviewed in stages." },
      { title: "Evidence", copy: "What changed, what was checked, and what decision comes next." },
      { title: "Handover", copy: "Whether your team can own and operate the result after delivery." },
    ],
    noPromise: "Guaranteed rankings, revenue, or timelines that ignore competition, access and dependencies. We commit to the agreed scope and to clear reporting.",
    pricingNote: "Pricing depends on current state, access, risk, and the deliverables you need.",
    faqs: [
      { q: `How do I know ${short} is the right starting point?`, a: kind === "service" ? `This is usually a fit when ${service!.intent.charAt(0).toLowerCase()}${service!.intent.slice(1)} The first conversation tests that assumption before a scope is proposed.` : "Start with the business problem. Serptrix can help distinguish this option from adjacent services before a scope is proposed." },
      { q: "What will the engagement include?", a: kind === "service" ? `A proposal will select from the relevant work—${service!.deliverables.join(", ").toLowerCase()}—and define acceptance criteria, inputs, and review ownership.` : "The exact mix depends on the selected service, current state, dependencies, and the decision the work needs to improve." },
      { q: "What affects scope, timing and investment?", a: kind === "service" ? service!.considerations : "Current systems, readiness of content or data, stakeholder access, integrations, risk, and review speed all affect the effort required." },
      { q: "What access do you need?", a: "Access to the people and materials that explain the current state, a clear decision owner, timely review, and any technical or compliance constraints." },
      { q: "Can this connect with another Serptrix service?", a: `Yes. ${name} can be scoped independently or connected to a complementary discipline when the same business problem crosses experience, technology, operations, or demand.` },
      { q: "How will I see progress?", a: "Through staged reviews and plain-English reporting covering what changed, what was checked, and what comes next." },
    ],
    related: relatedFromService(entry),
    showSerpVisual: pillar.slug === "digital-marketing" && (category?.slug === "seo" || service?.slug === "seo-services"),
  };

  const copy = servicePageCopy[entry.href];
  const withCopy: ServiceDetailModel =
    copy && service?.slug !== "seo-services"
      ? {
          ...base,
          title: copy.h1 ?? base.title,
          lede: copy.lede ?? base.lede,
          overview: copy.overview,
          fitHeading: copy.fitHeading,
          fitTitle: copy.fitTitle ?? base.fitTitle,
          fitGood: copy.fitGood ?? base.fitGood,
          fitNot: copy.fitNot ?? base.fitNot,
          scopeHeading: copy.scopeHeading,
          deliverables: copy.deliverables ?? base.deliverables,
          processHeading: copy.processHeading,
          stages: copy.stages ?? base.stages,
          evidenceTitle: copy.evidenceTitle ?? base.evidenceTitle,
          metrics: copy.metrics ?? base.metrics,
          noPromise: copy.noPromise ?? base.noPromise,
          pricingNote: copy.pricingNote ?? base.pricingNote,
          faqs: copy.faqs ?? base.faqs,
        }
      : base;

  if (service?.slug === "seo-services") {
    return { ...withCopy, ...seoOverride, crumbs: base.crumbs, crumbLabel: base.crumbLabel, inquiryLabel: "SEO Services", related: base.related.length ? base.related : seoOverride.related ?? base.related };
  }
  return withCopy;
}
