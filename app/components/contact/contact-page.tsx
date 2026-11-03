"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/content/site-config";
import { Arrow, DetailFooter } from "@/app/components/service-detail/chrome";
import "./contact.css";
import "./contact-overrides.css";

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: "none", marginTop: 3 }}>
    <circle cx="10" cy="10" r="10" fill="#FBBC03" />
    <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="#09105F" strokeWidth="2" />
  </svg>
);

function ContactHeader() {
  return (
    <header className="hd">
      <Link href="/" className="g" style={{ display: "flex", alignItems: "center", gap: 10, font: "700 24px var(--font-schibsted), Schibsted Grotesk, sans-serif" }}>
        <svg width="32" height="32" viewBox="0 0 34 34" aria-hidden="true">
          <rect width="15" height="15" rx="4" fill="#FBBC03" />
          <rect x="19" width="15" height="15" rx="4" fill="#fff" />
          <rect y="19" width="15" height="15" rx="4" fill="#fff" />
          <rect x="19" y="19" width="15" height="15" rx="4" fill="#FBBC03" />
        </svg>{" "}
        Serptrix
      </Link>
      <nav className="nv" aria-label="Main">
        <Link href="/services">Services</Link>
        <Link href="/#work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Insights</Link>
      </nav>
      <a href="#book" className="b by sm dsk">
        Book a Strategy Call
      </a>
      <details className="mm" style={{ border: 0 }}>
        <summary>Menu</summary>
        <div className="mm-panel">
          <Link href="/services">Services</Link>
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Insights</Link>
          <a href="#book">Book a Strategy Call</a>
        </div>
      </details>
    </header>
  );
}

const SERVICE_OPTIONS = [
  "Not sure yet",
  "Design",
  "Development",
  "AI",
  "SEO Services",
  "Paid advertising",
  "Content marketing",
] as const;

type ContactPageProps = { preselectedService?: string };

export default function ContactPage({ preselectedService }: ContactPageProps) {
  const phone = siteConfig.contact.phone;
  const phoneDisplay = phone.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1 $1 $2 $3");
  const email = siteConfig.contact.email;
  const calendlySrc = useMemo(() => {
    try {
      const parsed = new URL(siteConfig.contact.calendlyUrl);
      parsed.searchParams.set("embed_type", "Inline");
      return parsed.toString();
    } catch {
      return siteConfig.contact.calendlyUrl;
    }
  }, []);

  const defaultService = useMemo(() => {
    if (!preselectedService) return "Not sure yet";
    const match = SERVICE_OPTIONS.find((opt) => opt.toLowerCase() === preselectedService.toLowerCase());
    return match ?? preselectedService;
  }, [preselectedService]);

  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const emailValue = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const service = String(data.get("service") || "Not sure yet").trim();
    const timeline = String(data.get("timeline") || "").trim();
    const project = String(data.get("message") || "").trim();
    const consent = data.get("consent") === "on";

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailValue,
          company: company || "—",
          phone: "",
          website: "",
          service,
          services: [service === "Not sure yet" ? "Not Sure Yet" : service],
          goal: "Other",
          challenge: project,
          details: project,
          budget: "Not sure yet",
          timeline,
          referral: "",
          anythingElse: "",
          consent,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string; errors?: string[]; fallbackEmail?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(
          payload.errors?.join(" ") ||
            payload.message ||
            `Unable to send right now. Email ${payload.fallbackEmail || email} instead.`,
        );
        return;
      }
      setStatus("ok");
      setMessage("Inquiry received. We’ll reply by email.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(`Unable to send right now. Email ${email} instead.`);
    }
  }

  return (
    <div className="srx-contact-root">
      <a className="sk" href="#main">
        Skip to content
      </a>
      <div style={{ padding: 12 }}>
        <div className="pn dk" style={{ borderRadius: 32, overflow: "hidden" }}>
          <div className="w">
            <ContactHeader />
            <section className="pg">
              <div>
                <p className="k y up" style={{ marginBottom: 18 }}>
                  Contact
                </p>
                <h1 className="h1 up d2" style={{ fontSize: "clamp(36px,4.3vw,60px)", lineHeight: 1 }}>
                  Let’s talk about your project.
                </h1>
                <p className="lede up d3" style={{ marginTop: 24 }}>
                  Book a call if you want to talk first, or send an inquiry if you prefer to write. Either way, a person
                  reads it.
                </p>
                <div className="row cta up d4" style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                  <a href="#book" className="b by">
                    Book a Strategy Call <Arrow />
                  </a>
                  <a href="#inquiry" className="b bo">
                    Send a project inquiry
                  </a>
                </div>
              </div>
              <div className="pa up d2" style={{ background: "#fff", color: "#09105F", display: "grid", gap: 0 }}>
                <p className="k" style={{ marginBottom: 8 }}>
                  Contact details
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: "1px solid rgba(9,16,95,.15)",
                  }}
                >
                  <b>Email</b>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: "1px solid rgba(9,16,95,.15)",
                  }}
                >
                  <b>Phone</b>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phoneDisplay}</a>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: "1px solid rgba(9,16,95,.15)",
                  }}
                >
                  <b>Location</b>
                  <span>Remote-first</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: "1px solid rgba(9,16,95,.15)",
                  }}
                >
                  <b>Hours</b>
                  <span>Mon–Fri, 9:00–18:00</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <main id="main">
        <section className="sec" style={{ paddingTop: 32 }}>
          <div className="w gr">
            <div
              id="book"
              className="pa pn dk s5 r"
              style={{ display: "flex", flexDirection: "column", gap: 18, scrollMarginTop: 24 }}
            >
              <span className="k y">Option 1: talk first</span>
              <h2 style={{ fontSize: "clamp(24px,2.4vw,32px)" }}>Book a Strategy Call</h2>
              <p style={{ opacity: 0.9 }}>A conversation about your goals and the best first step.</p>
              <p className="k">Before the call</p>
              <ul className="ck">
                <li>
                  <Check />
                  <span>Your website address, if you have one</span>
                </li>
                <li>
                  <Check />
                  <span>What you want to achieve</span>
                </li>
                <li>
                  <Check />
                  <span>Anything already planned or in progress</span>
                </li>
              </ul>
              <div id="calendly-booking" style={{ minHeight: 180 }}>
                {siteConfig.contact.calendlyUrl ? (
                  <iframe
                    title="Book a Strategy Call"
                    className="calendly-frame"
                    src={calendlySrc}
                    loading="lazy"
                  />
                ) : (
                  <div className="img" style={{ minHeight: 180, border: "1.5px dashed rgba(255,255,255,.4)" }}>
                    <div className="pxl">Booking calendar</div>
                  </div>
                )}
              </div>
              <a href={siteConfig.contact.calendlyUrl} className="b by" style={{ alignSelf: "flex-start" }} target="_blank" rel="noopener noreferrer">
                Book a Strategy Call <Arrow />
              </a>
            </div>

            <form
              id="inquiry"
              className="pa pl s7"
              style={{ background: "#fff", display: "grid", gap: 16, scrollMarginTop: 24 }}
              aria-label="Project inquiry"
              onSubmit={onSubmit}
            >
              <h2 style={{ fontSize: "clamp(24px,2.4vw,32px)" }}>Send a project inquiry</h2>
              <p className="mu">Short and simple. Fields marked * are required.</p>
              <div className="gr" style={{ gap: 16 }}>
                <div className="s6">
                  <label htmlFor="cn">Name *</label>
                  <input id="cn" name="name" className="in" type="text" autoComplete="name" required />
                  <span className="er">Please fill in this field.</span>
                </div>
                <div className="s6">
                  <label htmlFor="ce">Email *</label>
                  <input id="ce" name="email" className="in" type="email" autoComplete="email" required />
                  <span className="er">Please enter a valid email address.</span>
                </div>
              </div>
              <div className="gr" style={{ gap: 16 }}>
                <div className="s6">
                  <label htmlFor="co">Company (optional)</label>
                  <input id="co" name="company" className="in" type="text" autoComplete="organization" />
                </div>
                <div className="s6">
                  <label htmlFor="cs">Service</label>
                  <select id="cs" name="service" className="in" defaultValue={defaultService}>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    {!SERVICE_OPTIONS.includes(defaultService as (typeof SERVICE_OPTIONS)[number]) ? (
                      <option value={defaultService}>{defaultService}</option>
                    ) : null}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="ct">When would you like to start?</label>
                <select id="ct" name="timeline" className="in" defaultValue="As soon as possible">
                  <option>As soon as possible</option>
                  <option>Within 1 to 3 months</option>
                  <option>Just exploring</option>
                </select>
              </div>
              <div>
                <label htmlFor="cm">About your project *</label>
                <textarea id="cm" name="message" className="in" required minLength={10} />
                <span className="er">Please add a few words about your project.</span>
              </div>
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 500 }}>
                <input type="checkbox" name="consent" required style={{ marginTop: 4 }} />
                <span>Serptrix may reply to this inquiry by email.</span>
              </label>
              {status === "ok" ? <p className="form-status ok">{message}</p> : null}
              {status === "error" ? <p className="form-status err">{message}</p> : null}
              <button className="b bn" type="submit" style={{ justifySelf: "start" }} disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Send inquiry"} <Arrow />
              </button>
            </form>
          </div>
        </section>

        <section className="sec pt">
          <div className="w gr" style={{ gap: "40px 16px" }}>
            <div className="s5 r" style={{ alignSelf: "start", position: "sticky", top: 24 }}>
              <span className="k">What happens next</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                After you get in touch
              </h2>
            </div>
            <div className="s7">
              <div className="tm">
                <span className="vl" />
                <div className="r">
                  <span className="tn">1</span>
                  <h3 style={{ fontSize: 22, marginBottom: 6 }}>We read your inquiry</h3>
                  <p className="mu" style={{ maxWidth: 560 }}>
                    It goes to the people who would do the work.
                  </p>
                </div>
                <div className="r">
                  <span className="tn">2</span>
                  <h3 style={{ fontSize: 22, marginBottom: 6 }}>We reply by email</h3>
                  <p className="mu" style={{ maxWidth: 560 }}>
                    We answer your questions and suggest a next step.
                  </p>
                </div>
                <div className="r">
                  <span className="tn">3</span>
                  <h3 style={{ fontSize: 22, marginBottom: 6 }}>We talk it through</h3>
                  <p className="mu" style={{ maxWidth: 560 }}>
                    A Strategy Call, if it helps, to agree what matters most.
                  </p>
                </div>
                <div className="r">
                  <span className="tn">4</span>
                  <h3 style={{ fontSize: 22, marginBottom: 6 }}>You receive a proposal</h3>
                  <p className="mu" style={{ maxWidth: 560 }}>
                    Scope, timeline and cost in writing. You decide what happens next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w">
            <div className="r" style={{ marginBottom: 36, maxWidth: 720 }}>
              <span className="k">Find us</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                Other ways to reach Serptrix
              </h2>
            </div>
            <div className="gr">
              <div className="pa pl s4 r" style={{ background: "#fff", display: "grid", gap: 8 }}>
                <span className="k">Email</span>
                <p className="g" style={{ font: "600 22px/1.2 var(--font-schibsted), Schibsted Grotesk, sans-serif" }}>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
              <div className="pa pl s4 r" style={{ background: "#fff", display: "grid", gap: 8 }}>
                <span className="k">Phone</span>
                <p className="g" style={{ font: "600 22px/1.2 var(--font-schibsted), Schibsted Grotesk, sans-serif" }}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phoneDisplay}</a>
                </p>
              </div>
              <div className="pa pl s4 r" style={{ background: "#fff", display: "grid", gap: 8 }}>
                <span className="k">Social</span>
                <p className="g" style={{ font: "600 22px/1.2 var(--font-schibsted), Schibsted Grotesk, sans-serif" }}>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>{" "}
                  ·{" "}
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </p>
              </div>
              <div className="pa pt s12 r" style={{ padding: 0, overflow: "hidden" }}>
                <div
                  className="img"
                  style={{
                    minHeight: 280,
                    borderRadius: 0,
                    background: "linear-gradient(145deg,#09105F 0%,#1a2470 55%,#FBBC03 160%)",
                    placeItems: "center",
                    display: "grid",
                    textAlign: "center",
                    padding: 28,
                  }}
                >
                  <div>
                    <p className="k y" style={{ marginBottom: 12 }}>
                      Office
                    </p>
                    <p style={{ fontSize: 22, fontWeight: 650, maxWidth: 360, margin: "0 auto", lineHeight: 1.25 }}>
                      Remote-first team. Strategy calls happen online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w gr" style={{ gap: "40px 16px" }}>
            <div className="s5 r faqh" style={{ alignSelf: "start" }}>
              <h2 className="h2">Before you write</h2>
              <p className="mu" style={{ margin: "16px 0 28px" }}>
                Short answers to common questions.
              </p>
              <a href="#inquiry" className="b bn">
                Ask us directly
              </a>
            </div>
            <div className="s7">
              <details>
                <summary>Should I book a call or send an inquiry?</summary>
                <p className="mu">Book a call if you want to talk it through. Send an inquiry if you prefer to write or have details to share.</p>
              </details>
              <details>
                <summary>What should I include in my inquiry?</summary>
                <p className="mu">Your goal, your website address if you have one, and any dates that matter.</p>
              </details>
              <details>
                <summary>Do I need a fixed brief?</summary>
                <p className="mu">No. If you are unsure, describe the problem and we will help shape the brief.</p>
              </details>
              <details>
                <summary>Can I ask about more than one service?</summary>
                <p className="mu">Yes. Choose the closest option and mention the rest in your message.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <DetailFooter />
    </div>
  );
}
