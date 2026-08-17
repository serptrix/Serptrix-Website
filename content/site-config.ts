/**
 * Central site configuration — contact details used across header, footer,
 * contact page, structured data, and CTAs.
 *
 * Set verified values via environment variables or edit defaults below.
 * Do not invent phone numbers or Calendly URLs.
 */

export const siteConfig = {
  url: "https://serptrix.com",
  name: "Serptrix",
  tagline: "Digital Growth, Engineered",
  contact: {
    /** Verified business email */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@serptrix.com",
    /** Verified business phone — leave empty until configured */
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    /** Verified Calendly scheduling URL */
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  },
  form: {
    budgetOptions: [
      "Under $2,500",
      "$2,500 – $5,000",
      "$5,000 – $10,000",
      "$10,000 – $25,000",
      "$25,000+",
      "Not sure yet",
    ] as const,
    timelineOptions: [
      "As soon as possible",
      "Within 1 month",
      "1–3 months",
      "3–6 months",
      "Just exploring options",
    ] as const,
    referralOptions: [
      "Google Search",
      "Social Media",
      "Referral",
      "LinkedIn",
      "Existing Client",
      "Other",
    ] as const,
    goalOptions: [
      "Grow organic traffic",
      "Generate more leads",
      "Increase online sales",
      "Build a website",
      "Build a SaaS platform",
      "Improve ecommerce performance",
      "Automate business operations",
      "Implement AI",
      "Improve digital strategy",
      "Other",
    ] as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;
