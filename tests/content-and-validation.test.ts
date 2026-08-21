import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import { POST } from "../app/api/contact/route";
import { siteConfig } from "../content/site-config";
import { servicePageSlugs, servicePages } from "../content/service-pages";
import { caseStudies, validateCaseStudy } from "../content/site-data";
import { sanitizeInquiry, validateInquiry } from "../lib/contact-validation";

const validInquiry = {
  name: "Test Person",
  email: "test@example.com",
  phone: "",
  company: "Example Co",
  website: "https://example.com",
  services: ["SEO Optimization"],
  goal: "Grow organic traffic",
  challenge: "Qualified traffic is not reaching the website.",
  details: "We need a search strategy and implementation roadmap.",
  budget: "$5,000 – $10,000",
  timeline: "1–3 months",
  referral: "Google Search",
  anythingElse: "",
  consent: true,
};

test("service page registry is complete and internally consistent", () => {
  assert.equal(servicePageSlugs.length, 12);
  assert.deepEqual(new Set(servicePageSlugs), new Set(Object.keys(servicePages)));
  for (const slug of servicePageSlugs) assert.equal(servicePages[slug].slug, slug);
});

test("all exported case studies pass the publication gate", () => {
  assert.equal(caseStudies.length, 3);
  for (const study of caseStudies) assert.equal(validateCaseStudy(study), study);
});

test("case-study gate rejects invalid placeholder and verified evidence", () => {
  const base = caseStudies[0];
  assert.throws(() => validateCaseStudy({ ...base, result: "42% improvement" }), /\[XX\]/);
  assert.throws(
    () => validateCaseStudy({ ...base, status: "verified", result: "42% improvement" }),
    /complete, approved evidence/,
  );
  assert.doesNotThrow(() =>
    validateCaseStudy({
      ...base,
      status: "verified",
      result: "42% qualified-pipeline improvement",
      evidence: {
        source: "Approved CRM report",
        baseline: "Previous 90 days",
        timeRange: "2026 Q1–Q2",
        attributionMethod: "CRM opportunity-source comparison",
        approved: true,
      },
    }),
  );
});

test("inquiry sanitizer bounds input and validation rejects forged choices", () => {
  const sanitized = sanitizeInquiry({
    ...validInquiry,
    services: ["x".repeat(500)],
    goal: "Fabricated goal",
    referral: "Fabricated referral",
  });
  assert.equal(sanitized.services[0].length, 120);
  const errors = validateInquiry(sanitized);
  assert.ok(errors.includes("Select a valid service area."));
  assert.ok(errors.includes("Choose a valid main goal."));
  assert.ok(errors.includes("Choose a valid referral source."));
});

test("contact API fails safely when delivery is not configured", { concurrency: false }, async () => {
  const previous = process.env.CONTACT_WEBHOOK_URL;
  delete process.env.CONTACT_WEBHOOK_URL;
  try {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
      body: JSON.stringify(validInquiry),
    });
    const response = await POST(request);
    assert.equal(response.status, 503);
    const result = await response.json();
    assert.equal(result.ok, false);
    assert.match(result.message, /email/i);
  } finally {
    if (previous === undefined) delete process.env.CONTACT_WEBHOOK_URL;
    else process.env.CONTACT_WEBHOOK_URL = previous;
  }
});

test("contact API reports success only after webhook delivery", { concurrency: false }, async () => {
  const previousUrl = process.env.CONTACT_WEBHOOK_URL;
  const previousFetch = globalThis.fetch;
  process.env.CONTACT_WEBHOOK_URL = "https://webhook.example.test/contact";
  globalThis.fetch = async () => new Response(null, { status: 204 });
  try {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.11" },
      body: JSON.stringify(validInquiry),
    });
    const response = await POST(request);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      ok: true,
      message: "Inquiry received.",
      fallbackEmail: siteConfig.contact.email,
    });
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.CONTACT_WEBHOOK_URL;
    else process.env.CONTACT_WEBHOOK_URL = previousUrl;
  }
});

test("contact API rejects declared oversized bodies before parsing", async () => {
  const request = new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": "70000" },
    body: "{}",
  });
  const response = await POST(request);
  assert.equal(response.status, 413);
});
