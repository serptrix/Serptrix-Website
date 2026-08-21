"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/content/site-config";

type Inquiry = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  service?: string;
  services?: string[];
  goal?: string;
  challenge?: string;
  details?: string;
  budget?: string;
  timeline?: string;
  referral?: string;
  anythingElse?: string;
};

function serviceLabel(inquiry: Inquiry) {
  if (inquiry.services?.length) return inquiry.services.join(", ");
  return inquiry.service || "—";
}

function buildMailto(inquiry: Inquiry | null) {
  const email = siteConfig.contact.email;
  const subject = encodeURIComponent(
    inquiry?.company ? `Project inquiry — ${inquiry.company}` : "Serptrix project inquiry",
  );
  if (!inquiry) {
    return `mailto:${email}?subject=${subject}`;
  }
  const lines = [
    "Hello Serptrix,",
    "",
    "I'd like to continue the project conversation started on the website.",
    "",
    `Name: ${inquiry.name || "—"}`,
    `Email: ${inquiry.email || "—"}`,
    inquiry.phone ? `Phone: ${inquiry.phone}` : null,
    `Company: ${inquiry.company || "—"}`,
    inquiry.website ? `Website: ${inquiry.website}` : null,
    `Services: ${serviceLabel(inquiry)}`,
    `Budget: ${inquiry.budget || "—"}`,
    `Timeline: ${inquiry.timeline || "—"}`,
    inquiry.referral ? `Referral: ${inquiry.referral}` : null,
    "",
    "Goal:",
    inquiry.goal || "—",
    "",
    "Challenge:",
    inquiry.challenge || "—",
    "",
    "Project details:",
    inquiry.details || "—",
    inquiry.anythingElse ? `\nAdditional notes:\n${inquiry.anythingElse}` : null,
  ].filter((line) => line !== null);
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function ThankYouExperience() {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem("serptrix-inquiry");
        if (raw) setInquiry(JSON.parse(raw) as Inquiry);
      } catch {
        setInquiry(null);
      } finally {
        setReady(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const mailto = useMemo(() => buildMailto(inquiry), [inquiry]);

  return (
    <section className="thank-you shell">
      <p className="eyebrow">
        <span /> INQUIRY RECEIVED
      </p>
      <h1>
        Thanks — we&apos;ve received
        <br />
        <em>your project details.</em>
      </h1>
      <p>
        {ready && inquiry?.name
          ? `Thanks, ${inquiry.name}. Our team will review your inquiry and get back to you using the contact information you provided.`
          : "Our team will review your inquiry and get back to you using the contact information you provided."}
      </p>

      {ready && inquiry && (
        <div className="thank-you-summary" aria-live="polite">
          <p className="section-index">YOUR SUMMARY</p>
          <dl>
            {inquiry.company && (
              <>
                <dt>Company</dt>
                <dd>{inquiry.company}</dd>
              </>
            )}
            {(inquiry.services?.length || inquiry.service) && (
              <>
                <dt>Focus</dt>
                <dd>{serviceLabel(inquiry)}</dd>
              </>
            )}
            {inquiry.goal && (
              <>
                <dt>Goal</dt>
                <dd>{inquiry.goal}</dd>
              </>
            )}
            {inquiry.challenge && (
              <>
                <dt>Challenge</dt>
                <dd>{inquiry.challenge}</dd>
              </>
            )}
            {(inquiry.budget || inquiry.timeline) && (
              <>
                <dt>Scope</dt>
                <dd>
                  {[inquiry.budget, inquiry.timeline].filter(Boolean).join(" · ")}
                </dd>
              </>
            )}
          </dl>
        </div>
      )}

      <div className="actions">
        <a className="btn btn-primary" href={mailto}>
          Send a follow-up email <span>↗</span>
        </a>
        <Link className="text-link" href="/">
          Return home <span>→</span>
        </Link>
      </div>
      <p className="thank-you-note">
        Prefer to start over?{" "}
        <Link href="/contact">Return to the project form</Link>.
      </p>
    </section>
  );
}
