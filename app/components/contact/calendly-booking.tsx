"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/content/site-config";
import { trackContactEvent } from "@/lib/analytics";
import { ScrollReveal } from "../motion/scroll-reveal";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (calendlyScriptPromise) return calendlyScriptPromise;

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-calendly="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Calendly script failed")));
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.dataset.calendly = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed"));
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

export function CalendlyBooking() {
  const sectionRef = useRef<HTMLElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [shouldRenderWidget, setShouldRenderWidget] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const calendlyUrl = siteConfig.contact.calendlyUrl;

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
    const section = sectionRef.current;
    if (!section || !calendlyUrl || shouldRenderWidget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setShouldRenderWidget(true);
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [calendlyUrl, shouldRenderWidget]);

  useEffect(() => {
    if (!shouldRenderWidget || !calendlyUrl || initialized) return;
    setState("loading");
    loadCalendlyScript()
      .then(() => {
        if (!embedRef.current || !window.Calendly) throw new Error("Calendly unavailable");
        embedRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: embedRef.current,
        });
        trackContactEvent("calendly_booking_started");
        setInitialized(true);

        // Wait for Calendly iframe to fully load before flipping to ready.
        const iframe = embedRef.current.querySelector("iframe");
        if (iframe) {
          iframe.addEventListener("load", () => setState("ready"), { once: true });
          window.setTimeout(() => setState("ready"), 1800);
        } else {
          window.setTimeout(() => setState("ready"), 900);
        }
      })
      .catch(() => setState("error"));
  }, [calendlyUrl, initialized, shouldRenderWidget]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled") {
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
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">PREFER TO TALK?</p>
          <h2 id="calendly-title">
            Book a strategy call at a time that <em>works for you.</em>
          </h2>
          <p className="contact-calendly-lede">
            Choose an available time and tell us briefly what you would like to discuss. We&apos;ll use the
            conversation to understand your goals, challenges and potential next steps.
          </p>
        </ScrollReveal>
        <div className="contact-calendly-frame">
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
              <div
                ref={embedRef}
                className={`contact-calendly-embed ${state === "ready" ? "is-ready" : ""}`}
                style={{ minHeight: state === "ready" || state === "loading" ? "760px" : undefined }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
