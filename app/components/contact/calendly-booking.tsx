"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/content/site-config";
import { trackContactEvent } from "@/lib/analytics";
import { ScrollReveal } from "../motion/scroll-reveal";

const WIDGET_HEIGHT = 700;

function buildEmbedSrc(url: string, hostname?: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("embed_type", "Inline");
    if (hostname) parsed.searchParams.set("embed_domain", hostname);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function CalendlyBooking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [hostname, setHostname] = useState("");
  const calendlyUrl = siteConfig.contact.calendlyUrl;
  const embedSrc = useMemo(() => buildEmbedSrc(calendlyUrl, hostname), [calendlyUrl, hostname]);

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !calendlyUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackContactEvent("calendly_section_viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [calendlyUrl]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if ((event.data as { event?: string })?.event === "calendly.event_scheduled") {
        trackContactEvent("calendly_booking_completed");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="calendly-booking"
      className="contact-calendly section"
      aria-labelledby="calendly-title"
    >
      <div className="shell contact-calendly-shell">
        <ScrollReveal type="fade-up">
          <div className="contact-calendly-intro">
            <p className="section-index">PREFER TO TALK?</p>
            <h2 id="calendly-title">
              Book a strategy call at a time that <em>works for you.</em>
            </h2>
            <p className="contact-calendly-lede">
              Choose an available time and tell us briefly what you would like to discuss. We&apos;ll use the
              conversation to understand your goals, challenges and potential next steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="contact-calendly-frame" data-lenis-prevent>
          {!calendlyUrl ? (
            <div className="contact-calendly-fallback" role="status">
              <p>Scheduling is being configured. Use the project form or email us directly in the meantime.</p>
              <a className="btn btn-primary" href={`mailto:${siteConfig.contact.email}`}>
                Email {siteConfig.contact.email} <span>↗</span>
              </a>
            </div>
          ) : (
            <>
              {state === "loading" && (
                <div className="contact-calendly-loading" role="status" aria-live="polite">
                  <span className="contact-calendly-spinner" aria-hidden="true" />
                  Loading available times…
                </div>
              )}
              {state === "error" && (
                <div className="contact-calendly-fallback" role="alert">
                  <p>The scheduling widget could not load. Open the booking page directly instead.</p>
                  <a className="btn btn-primary" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Open Scheduling Page <span>↗</span>
                  </a>
                </div>
              )}
              {state !== "error" && hostname && (
                <iframe
                  className="contact-calendly-iframe"
                  src={embedSrc}
                  title="Book a strategy call with Serptrix"
                  loading="lazy"
                  width="100%"
                  height={WIDGET_HEIGHT}
                  frameBorder="0"
                  onLoad={() => {
                    setState("ready");
                    trackContactEvent("calendly_booking_started");
                  }}
                  onError={() => setState("error")}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
