"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Inquiry = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  service?: string;
  goal?: string;
  challenge?: string;
  budget?: string;
  timeline?: string;
  contact?: string;
  details?: string;
};

function buildMailto(inquiry: Inquiry | null) {
  const subject = encodeURIComponent(
    inquiry?.company ? `Project inquiry — ${inquiry.company}` : "Serptrix project inquiry",
  );
  if (!inquiry) {
    return `mailto:hello@serptrix.com?subject=${subject}`;
  }
  const lines = [
    "Hello Serptrix,",
    "",
    "I'd like to continue the project conversation started on the website.",
    "",
    `Name: ${inquiry.name || "—"}`,
    `Email: ${inquiry.email || "—"}`,
    `Company: ${inquiry.company || "—"}`,
    inquiry.website ? `Website: ${inquiry.website}` : null,
    `Service interest: ${inquiry.service || "—"}`,
    `Preferred contact: ${inquiry.contact || "Email"}`,
    `Budget: ${inquiry.budget || "—"}`,
    `Timeline: ${inquiry.timeline || "—"}`,
    "",
    "Goal:",
    inquiry.goal || "—",
    "",
    "Challenge:",
    inquiry.challenge || "—",
    inquiry.details ? `\nAdditional details:\n${inquiry.details}` : null,
  ].filter((line) => line !== null);
  return `mailto:hello@serptrix.com?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function ThankYouExperience() {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("serptrix-inquiry");
      if (raw) setInquiry(JSON.parse(raw) as Inquiry);
    } catch {
      setInquiry(null);
    } finally {
      setReady(true);
    }
  }, []);

  const mailto = useMemo(() => buildMailto(inquiry), [inquiry]);

  return (
    <section className="thank-you shell">
      <p className="eyebrow">
        <span /> INQUIRY PREPARED
      </p>
      <h1>
        Your brief is ready.
        <br />
        <em>One email completes it.</em>
      </h1>
      <p>
        {ready && inquiry?.name
          ? `Thanks, ${inquiry.name}. We prepared a clear summary from your answers. Send it to hello@serptrix.com to start the conversation.`
          : "Your inquiry summary is ready to send. Email hello@serptrix.com to complete the handoff."}
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
            {inquiry.service && (
              <>
                <dt>Focus</dt>
                <dd>{inquiry.service}</dd>
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
          Complete by email <span>↗</span>
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
