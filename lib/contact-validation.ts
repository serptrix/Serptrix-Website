import { siteConfig } from "@/content/site-config";
import { services } from "@/content/site-data";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  services: string[];
  goal: string;
  challenge: string;
  details: string;
  budget: string;
  timeline: string;
  referral: string;
  anythingElse: string;
  consent: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 2000;
const MAX_SERVICE_LENGTH = 120;
const allowedServices = new Set([...services.map((service) => service.name), "Not Sure Yet"]);

function clean(value: unknown, max = MAX): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function sanitizeInquiry(raw: Record<string, unknown>): InquiryPayload {
  const services = Array.isArray(raw.services)
    ? raw.services
        .filter((s): s is string => typeof s === "string")
        .map((s) => s.trim().slice(0, MAX_SERVICE_LENGTH))
        .filter(Boolean)
        .slice(0, 12)
    : typeof raw.services === "string" && raw.services
      ? [raw.services.trim().slice(0, MAX_SERVICE_LENGTH)]
      : typeof raw.service === "string" && raw.service
        ? [raw.service.trim().slice(0, MAX_SERVICE_LENGTH)]
        : [];

  return {
    name: clean(raw.name, 120),
    email: clean(raw.email, 254),
    phone: clean(raw.phone, 40),
    company: clean(raw.company, 160),
    website: clean(raw.website, 300),
    services: [...new Set(services)],
    goal: clean(raw.goal, 200),
    challenge: clean(raw.challenge),
    details: clean(raw.details),
    budget: clean(raw.budget, 80),
    timeline: clean(raw.timeline, 80),
    referral: clean(raw.referral, 80),
    anythingElse: clean(raw.anythingElse),
    consent: raw.consent === true,
  };
}

export function validateInquiry(data: InquiryPayload): string[] {
  const errors: string[] = [];
  if (!data.name) errors.push("Enter your full name.");
  if (!EMAIL_RE.test(data.email)) errors.push("Enter a valid work email.");
  if (!data.company) errors.push("Enter your company or brand name.");
  if (data.website) {
    try {
      const website = new URL(data.website);
      if (website.protocol !== "http:" && website.protocol !== "https:") throw new Error("Invalid protocol");
    } catch {
      errors.push("Enter a valid website URL beginning with http:// or https://.");
    }
  }
  if (data.services.length === 0) errors.push("Select at least one service area.");
  if (data.services.some((service) => !allowedServices.has(service))) {
    errors.push("Select a valid service area.");
  }
  if (data.services.includes("Not Sure Yet") && data.services.length > 1) {
    errors.push('“Not Sure Yet” cannot be combined with another service area.');
  }
  if (!data.goal) errors.push("Select a main goal.");
  if (!data.challenge) errors.push("Describe your main challenge.");
  if (!data.details) errors.push("Tell us briefly what you would like Serptrix to help you achieve.");
  if (!data.budget) errors.push("Choose a budget range.");
  if (!data.timeline) errors.push("Choose an ideal start time.");
  if (!data.consent) errors.push("Confirm that Serptrix may respond to your inquiry.");
  if (data.budget && !siteConfig.form.budgetOptions.includes(data.budget as (typeof siteConfig.form.budgetOptions)[number])) {
    errors.push("Choose a valid budget range.");
  }
  if (data.timeline && !siteConfig.form.timelineOptions.includes(data.timeline as (typeof siteConfig.form.timelineOptions)[number])) {
    errors.push("Choose a valid timeline.");
  }
  if (data.goal && !siteConfig.form.goalOptions.includes(data.goal as (typeof siteConfig.form.goalOptions)[number])) {
    errors.push("Choose a valid main goal.");
  }
  if (data.referral && !siteConfig.form.referralOptions.includes(data.referral as (typeof siteConfig.form.referralOptions)[number])) {
    errors.push("Choose a valid referral source.");
  }
  return errors;
}
