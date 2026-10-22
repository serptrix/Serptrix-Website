"use client";

import { useCallback, useRef } from "react";
import { FAQ } from "../faq";
import { ProjectForm } from "../project-form";
import { ScrollReveal } from "../motion/scroll-reveal";
import { CalendlyBooking } from "./calendly-booking";
import { ContactFinalCTA } from "./contact-final-cta";
import { ContactHero } from "./contact-hero";
import { ContactMethods } from "./contact-methods";
import { ContactProcess } from "./contact-process";

const contactFaqs = [
  [
    "What types of businesses does Serptrix work with?",
    "Serptrix works with businesses that need help across marketing, development, ecommerce, SaaS, AI, automation and digital strategy—from growth-stage teams to established companies looking to connect disconnected digital capabilities.",
  ],
  [
    "Can I contact Serptrix if I am not sure which service I need?",
    "Yes. The inquiry form and strategy call are designed to help identify the appropriate direction. You can select \"Not Sure Yet\" and describe your challenge—we will help clarify the best starting point.",
  ],
  [
    "Can Serptrix handle projects combining multiple services?",
    "Yes. Integrated engagements may combine marketing, development, AI, automation and strategy where appropriate. Serptrix is built for problems that span disciplines rather than fit inside a single silo.",
  ],
  [
    "How do I start a project?",
    "You have two primary options: send project details through the inquiry form on this page, or book a strategy call through Calendly to speak directly with the team.",
  ],
  [
    "What information should I provide?",
    "Helpful details include your business goals, main challenge, current website or platform, required services, approximate budget and timeline. The more context you share, the more useful the first conversation will be.",
  ],
] as const;

export function ContactExperience({ preselectedService }: { preselectedService?: string }) {
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToCalendly = useCallback(() => {
    document.getElementById("calendly-booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="contact-page">
      <ContactHero onStartProject={scrollToForm} onBookCall={scrollToCalendly} />
      <ContactMethods onBookCall={scrollToCalendly} />
      <section ref={formRef} id="project-inquiry" className="contact-form-section section" aria-labelledby="inquiry-title">
        <div className="shell">
          <ScrollReveal type="fade-up">
            <p className="section-index">PROJECT INQUIRY</p>
            <h2 id="inquiry-title">
              Tell us what you&apos;re working on. <em>We&apos;ll take it from there.</em>
            </h2>
            <p className="contact-form-lede">
              Five focused steps—about four minutes. Your answers help us understand your goals before we connect.
            </p>
          </ScrollReveal>
          <ProjectForm preselectedService={preselectedService} />
        </div>
      </section>
      <CalendlyBooking />
      <ContactProcess />
      <FAQ items={contactFaqs} title="Questions before you reach out" />
      <ContactFinalCTA onStartProject={scrollToForm} onBookCall={scrollToCalendly} />
    </div>
  );
}
