"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site-config";
import { trackContactEvent } from "@/lib/analytics";
import { ScrollReveal } from "../motion/scroll-reveal";

type MethodId = "phone" | "email" | "calendly";

type Props = {
  onBookCall: () => void;
};

const methods: {
  id: MethodId;
  label: string;
  value?: string;
  href?: string;
  helper: string;
  cta?: string;
}[] = [
  {
    id: "phone",
    label: "Call Us",
    value: siteConfig.contact.phone || undefined,
    href: siteConfig.contact.phone ? `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` : undefined,
    helper: "Speak directly with our team about your project, goals, or current digital challenges.",
  },
  {
    id: "email",
    label: "Email Us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    helper: "Send us your brief, requirements, questions, or project details.",
  },
  {
    id: "calendly",
    label: "Book a Strategy Call",
    helper: "Choose a suitable time and speak directly with Serptrix about your goals.",
    cta: "View Available Times",
  },
];

export function ContactMethods({ onBookCall }: Props) {
  const [active, setActive] = useState<MethodId>("email");
  const visibleMethods = methods.filter((m) => m.id !== "phone" || m.value);

  const handleActivate = (id: MethodId) => {
    setActive(id);
    if (id === "calendly") onBookCall();
  };

  const handleLinkClick = (id: MethodId) => {
    if (id === "phone") trackContactEvent("contact_phone_clicked");
    if (id === "email") trackContactEvent("contact_email_clicked");
  };

  return (
    <section className="contact-methods section" aria-labelledby="contact-methods-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">HOW TO REACH US</p>
          <h2 id="contact-methods-title">
            Choose the path that fits <em>your pace.</em>
          </h2>
        </ScrollReveal>
        <div className="contact-methods-hub" role="list">
          {visibleMethods.map((method, index) => {
            const isActive = active === method.id;
            return (
              <article
                key={method.id}
                role="listitem"
                className={`contact-method-row ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setActive(method.id)}
                onFocus={() => setActive(method.id)}
              >
                <button
                  type="button"
                  className="contact-method-trigger"
                  aria-expanded={isActive}
                  onClick={() => handleActivate(method.id)}
                >
                  <span className="contact-method-index">0{index + 1}</span>
                  <span className="contact-method-label">{method.label}</span>
                  <span className="contact-method-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
                <div className="contact-method-panel" hidden={!isActive}>
                  <p>{method.helper}</p>
                  {method.href && method.value ? (
                    <a
                      href={method.href}
                      className="contact-method-value"
                      onClick={() => handleLinkClick(method.id)}
                    >
                      {method.value} <span>↗</span>
                    </a>
                  ) : method.id === "calendly" ? (
                    <button type="button" className="btn btn-primary contact-method-cta" onClick={onBookCall}>
                      {method.cta} <span>↗</span>
                    </button>
                  ) : null}
                </div>
                <i className="contact-method-accent" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
