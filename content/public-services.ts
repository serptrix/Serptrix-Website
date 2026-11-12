export type PublicServiceLink = { name: string; href: string };
export type PublicServiceColumn = {
  index: string;
  name: string;
  href: string;
  description: string;
  links: PublicServiceLink[];
};

/** Live services. Anything outside this list stays in the catalog as a draft. */
export const publicServiceMenu: PublicServiceColumn[] = [
  {
    index: "01",
    name: "Design",
    href: "/services/design",
    description: "Visual identity, graphics and experience design that help your business communicate clearly.",
    links: [
      { name: "Graphic Design", href: "/services/design/brand-graphic-design/graphic-design" },
      { name: "Illustration", href: "/services/design/brand-graphic-design/illustration-design" },
      { name: "App Design", href: "/services/design/digital-product-experience-design/mobile-app-design" },
      { name: "UI/UX Design", href: "/services/design/digital-product-experience-design/ui-ux-design" },
      { name: "Branding", href: "/services/design/brand-graphic-design/brand-identity-design" },
    ],
  },
  {
    index: "02",
    name: "Development",
    href: "/services/development",
    description: "Websites, apps and business software built around how your customers and team work.",
    links: [
      { name: "Web Development", href: "/services/development/web-development" },
      { name: "SaaS Development", href: "/services/development/application-software-development/saas-development" },
      { name: "Ecommerce Development", href: "/services/development/ecommerce-development" },
      { name: "App Development", href: "/services/development/application-software-development/mobile-app-development" },
      { name: "Custom Software", href: "/services/development/application-software-development/custom-software-development" },
      { name: "Web Applications & Dashboards", href: "/services/development/application-software-development/web-application-development" },
    ],
  },
  {
    index: "03",
    name: "Artificial Intelligence",
    href: "/services/ai",
    description: "AI applications, conversational agents and automation for enquiries, workflows and repetitive work.",
    links: [
      { name: "AI Applications", href: "/services/ai/ai-products-strategy/custom-ai-application-development" },
      { name: "AI Chatbots", href: "/services/ai/conversational-ai/ai-chatbot-development" },
      { name: "AI Voice Agents", href: "/services/ai/conversational-ai/ai-voice-agents" },
      { name: "Custom AI Solutions", href: "/services/ai/agents-automation/custom-ai-agent-development" },
      { name: "Business Automation", href: "/services/ai/agents-automation/ai-workflow-automation" },
    ],
  },
  {
    index: "04",
    name: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "Search, paid advertising and measurement to reach relevant customers and understand what drives enquiries.",
    links: [
      { name: "Search Engine Optimization", href: "/services/digital-marketing/seo" },
      { name: "Meta Ads", href: "/services/digital-marketing/paid-advertising/meta-ads-management" },
      { name: "Google Ads", href: "/services/digital-marketing/paid-advertising/google-ads-management" },
      { name: "Social Media Marketing", href: "/services/digital-marketing/content-social/social-media-marketing" },
      { name: "Web Analytics & Data Tracking", href: "/services/digital-marketing/measurement-conversion/marketing-analytics-and-reporting" },
      { name: "Ecommerce Growth Marketing", href: "/services/digital-marketing/measurement-conversion/ecommerce-growth-marketing" },
      { name: "Email & SMS Marketing", href: "/services/digital-marketing/content-social/email-marketing-and-lifecycle-automation" },
      { name: "Content Strategy", href: "/services/digital-marketing/content-social/content-marketing" },
    ],
  },
  {
    index: "05",
    name: "Shopify",
    href: "/services/development/shopify",
    description: "Shopify design, development, CRO, checkout, SEO, migrations, apps and ongoing support.",
    links: [
      { name: "Shopify Store Design & Development", href: "/services/development/shopify/shopify-store-design-and-development" },
      { name: "Shopify Migrations", href: "/services/development/shopify/shopify-migrations" },
      { name: "Shopify Apps & Integrations", href: "/services/development/shopify/shopify-apps-and-integrations" },
      { name: "Shopify Headless & B2B", href: "/services/development/shopify/shopify-headless-and-b2b" },
      { name: "Shopify Ongoing Support", href: "/services/development/shopify/shopify-ongoing-support" },
      { name: "Shopify Performance", href: "/services/development/shopify/shopify-performance" },
      { name: "Shopify Conversion Rate Optimization", href: "/services/development/shopify/shopify-conversion-rate-optimization" },
      { name: "Shopify Checkout Optimization", href: "/services/development/shopify/shopify-checkout-optimization" },
      { name: "Shopify SEO", href: "/services/development/shopify/shopify-seo" },
    ],
  },
];

export const publishedHrefs = new Set(publicServiceMenu.flatMap((column) => [column.href, ...column.links.map((link) => link.href)]));

export function isPublishedHref(href: string) {
  return publishedHrefs.has(href);
}
