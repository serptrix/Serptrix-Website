import Link from "next/link";
import type { CatalogEntry } from "@/content/service-catalog";
import { inquiryHref } from "@/content/service-catalog";
import { buildServiceDetailModel } from "./content";
import { Arrow, DetailFooter, DetailHeader } from "./chrome";
import "./service-detail.css";
import "./service-detail-overrides.css";

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: "none", marginTop: 3 }}>
    <circle cx="10" cy="10" r="10" fill="#FBBC03" />
    <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="#09105F" strokeWidth="2" />
  </svg>
);

function SerpVisual() {
  return (
    <div className="serp up d2" role="img" aria-label="Illustration of search results where a business appears first">
      <div
        style={{
          height: 44,
          borderRadius: 999,
          border: "1.5px solid rgba(9,16,95,.3)",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          fontWeight: 500,
          opacity: 0.8,
        }}
      >
        what your customers search for
      </div>
      <div className="sr me">
        <span className="k" style={{ fontSize: 12 }}>
          Your business
        </span>
        <b style={{ fontSize: 18 }}>Your page title in search results</b>
        <div className="sb2" style={{ width: "90%" }} />
        <div className="sb2" style={{ width: "65%" }} />
      </div>
      <div className="sr">
        <div className="sb2" style={{ width: "40%", height: 12 }} />
        <div className="sb2" style={{ width: "92%" }} />
        <div className="sb2" style={{ width: "70%" }} />
      </div>
      <div className="sr">
        <div className="sb2" style={{ width: "46%", height: 12 }} />
        <div className="sb2" style={{ width: "85%" }} />
      </div>
    </div>
  );
}

function GenericVisual({ label }: { label: string }) {
  return (
    <div className="serp up d2" role="img" aria-label={`${label} overview`}>
      <div className="sr me">
        <span className="k" style={{ fontSize: 12 }}>
          Engagement focus
        </span>
        <b style={{ fontSize: 18 }}>{label}</b>
        <p style={{ margin: "8px 0 0", fontSize: 14, opacity: 0.75, lineHeight: 1.45 }}>
          Clear problem, written scope, staged delivery, and plain-English reporting.
        </p>
      </div>
      <div className="sr" style={{ display: "grid", gap: 10 }}>
        {["Audit current state", "Agree priorities in writing", "Improve in reviewable stages"].map((step) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600 }}>
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#FBBC03",
                flex: "none",
              }}
            />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceDetailPage({ entry }: { entry: CatalogEntry }) {
  const m = buildServiceDetailModel(entry);
  const formAction = inquiryHref(entry.service);

  return (
    <div className="srx-svc-detail srx-nav">
      <a className="sk" href="#main">
        Skip to content
      </a>
      <div style={{ padding: 12 }}>
        <div className="pn dk" style={{ borderRadius: 32, overflow: "hidden" }}>
          <div className="w">
            <DetailHeader />
            <section className="pg" style={{ paddingTop: 8 }}>
              <div>
                <div className="cr" role="navigation" aria-label="Breadcrumb">
                  {m.crumbs.map((c, i) => (
                    <span key={`${c.label}-${i}`} style={{ display: "contents" }}>
                      {i > 0 ? <span aria-hidden="true">/</span> : null}
                      {c.href ? (
                        <Link href={c.href}>{c.label}</Link>
                      ) : (
                        <span aria-current="page" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                          {c.label}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="k y up" style={{ marginBottom: 18 }}>
                  {m.eyebrow}
                </p>
                <h1 className="h1 up d2" style={{ fontSize: "clamp(34px,4.1vw,56px)", lineHeight: 1 }}>
                  {m.title}
                </h1>
                <p className="lede up d3" style={{ marginTop: 24 }}>
                  {m.lede}
                </p>
                <div className="row cta up d4" style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                  <Link href="/contact#calendly-booking" className="b by">
                    Book a Strategy Call <Arrow />
                  </Link>
                  <Link href={formAction} className="b bo">
                    Send an inquiry
                  </Link>
                </div>
              </div>
              {m.showSerpVisual ? <SerpVisual /> : <GenericVisual label={m.crumbLabel} />}
            </section>
          </div>
        </div>
      </div>

      <main id="main">
        <section className="sec">
          <div className="w">
            <div className="r" style={{ marginBottom: 36, maxWidth: 720 }}>
              <span className="k">Is this right for you?</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                {m.fitHeading ?? "Good fit, and not yet a fit"}
              </h2>
              {m.overview ? (
                <p className="mu" style={{ marginTop: 14 }}>
                  {m.overview}
                </p>
              ) : null}
            </div>
            <div className="gr">
              <div className="pa pt s7 r">
                <h3 style={{ fontSize: 24, marginBottom: 12 }}>{m.fitTitle}</h3>
                <ul className="ck">
                  {m.fitGood.map((x) => (
                    <li key={x}>
                      <Check />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pa pl s5 r">
                <h3 style={{ fontSize: 24, marginBottom: 12 }}>Probably not yet if</h3>
                <ul className="ls">
                  {m.fitNot.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="sec pt">
          <div className="w">
            <div className="r" style={{ marginBottom: 36, maxWidth: 720 }}>
              <span className="k">What is included</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                {m.scopeHeading ?? "Scope and deliverables"}
              </h2>
            </div>
            <div className="gr">
              {m.deliverables.map((card, i) => (
                <div
                  key={card.title + i}
                  className={`pa r ${i % 3 === 0 ? "pn dk s7" : "pt s5"}`}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <h3 style={{ fontSize: 24 }}>{card.title}</h3>
                  <ul className="ls">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w gr" style={{ gap: "40px 16px" }}>
            <div className="s5 r" style={{ alignSelf: "start", position: "sticky", top: 24 }}>
              <span className="k">How the work happens</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                {m.processHeading ?? "Four stages, with you involved at each one"}
              </h2>
            </div>
            <div className="s7">
              <div className="tm">
                <span className="vl" />
                {m.stages.map((s) => (
                  <div className="r" key={s.n}>
                    <span className="tn">{s.n}</span>
                    <h3 style={{ fontSize: 22, marginBottom: 6 }}>{s.title}</h3>
                    <p className="mu" style={{ maxWidth: 560 }}>
                      {s.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sec pt">
          <div className="w">
            <div className="r" style={{ marginBottom: 36, maxWidth: 720 }}>
              <span className="k">Evidence</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                {m.evidenceTitle}
              </h2>
              <p className="mu" style={{ marginTop: 14 }}>
                We discuss relevant past work on a Strategy Call. Published case studies are added here when they can be shared with clear before/after evidence.
              </p>
            </div>
            <div className="pa pl r tw" style={{ display: "grid", gap: 32, background: "#fff" }}>
              <div
                className="img"
                style={{
                  minHeight: 280,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(145deg,#09105F 0%,#1a2470 55%,#FBBC03 160%)",
                  color: "#fff",
                  padding: 28,
                  textAlign: "center",
                }}
              >
                <div>
                  <p className="k y" style={{ marginBottom: 12 }}>
                    Case study slot
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 650, maxWidth: 280, margin: "0 auto", lineHeight: 1.25 }}>
                    Real project evidence, shared with permission.
                  </p>
                </div>
              </div>
              <div style={{ display: "grid", gap: 14, alignContent: "center" }}>
                <span className="k">What a completed engagement shows</span>
                <h3 style={{ fontSize: 28 }}>Starting point, work done, verified result</h3>
                <p>
                  <b>Starting point:</b> The business problem, constraints and current state before work began.
                </p>
                <p>
                  <b>What we did:</b> The agreed scope, delivered in reviewable stages with clear ownership.
                </p>
                <p>
                  <b>Verified result:</b> What changed, what was checked, and over what period.
                </p>
                <Link href="/contact#calendly-booking" className="b sm bn" style={{ justifySelf: "start" }}>
                  Discuss a similar project <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w gr" style={{ gap: 16 }}>
            <div className="s7">
              <div className="r" style={{ marginBottom: 28 }}>
                <span className="k">How success is measured</span>
                <h2 className="h2" style={{ marginTop: 14 }}>
                  What we track
                </h2>
              </div>
              <div className="tbl">
                {m.metrics.map((metric) => (
                  <div className="r" key={metric.title} style={{ gridTemplateColumns: "170px 1fr" }}>
                    <h3>{metric.title}</h3>
                    <p className="mu">{metric.copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pa pn dk s5 r" style={{ alignSelf: "start", display: "grid", gap: 12 }}>
              <h3 style={{ fontSize: 24 }}>What we do not promise</h3>
              <p style={{ opacity: 0.9 }}>{m.noPromise}</p>
            </div>
          </div>
        </section>

        <section className="sec pt">
          <div className="w">
            <div className="r" style={{ marginBottom: 36, maxWidth: 720 }}>
              <span className="k">Scope and engagement</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                How scope, timing and pricing are set
              </h2>
            </div>
            <div className="gr">
              <div className="pa pl s4 r" style={{ background: "#fff" }}>
                <span className="k">Step 1</span>
                <h3 style={{ fontSize: 22, margin: "8px 0" }}>Discuss</h3>
                <p className="mu">On a Strategy Call we learn about your goals, constraints and current situation.</p>
              </div>
              <div className="pa pl s4 r" style={{ background: "#fff" }}>
                <span className="k">Step 2</span>
                <h3 style={{ fontSize: 22, margin: "8px 0" }}>Scope in writing</h3>
                <p className="mu">We confirm deliverables, timeline and cost before work starts.</p>
              </div>
              <div className="pa pl s4 r" style={{ background: "#fff" }}>
                <span className="k">Step 3</span>
                <h3 style={{ fontSize: 22, margin: "8px 0" }}>Choose how to work</h3>
                <p className="mu">A focused one-off engagement, or ongoing support where it makes sense.</p>
              </div>
              <div
                className="pa pn dk s12 r"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}
              >
                <p style={{ fontSize: 18, maxWidth: 680 }}>{m.pricingNote}</p>
                <Link href="/contact#calendly-booking" className="b by">
                  Book a Strategy Call <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w gr" style={{ gap: "40px 16px" }}>
            <div className="s5 r faqh" style={{ alignSelf: "start" }}>
              <h2 className="h2">{m.crumbLabel.replace(/ services$/i, "")} questions</h2>
              <p className="mu" style={{ margin: "16px 0 28px" }}>
                Answers specific to this work.
              </p>
              <Link href={formAction} className="b bn">
                Ask us directly
              </Link>
            </div>
            <div className="s7">
              {m.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p className="mu">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {m.related.length > 0 ? (
          <section className="sec pt">
            <div className="w">
              <div className="r" style={{ marginBottom: 36, maxWidth: 720 }}>
                <span className="k">Related services</span>
                <h2 className="h2" style={{ marginTop: 14 }}>
                  What often goes with this work
                </h2>
              </div>
              <div className="gr">
                {m.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="pa pl s4 r wy"
                    style={{ background: "#fff", display: "flex", flexDirection: "column", gap: 12 }}
                  >
                    <h3 style={{ fontSize: 24 }}>{r.title}</h3>
                    <p className="mu">{r.copy}</p>
                    <span className="lk" style={{ marginTop: "auto" }}>
                      {r.cta}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="sec" id="contact" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="pa pn dk gr" style={{ padding: "clamp(24px,5vw,72px)", gap: "40px 24px" }}>
              <div className="s5">
                <span className="k y">Start here</span>
                <h2 className="h2" style={{ margin: "16px 0 18px" }}>
                  Start your {m.inquiryLabel} inquiry.
                </h2>
                <p style={{ opacity: 0.88, marginBottom: 22 }}>
                  Book a call, or send a short inquiry. Your selected service is carried through.
                </p>
                <div className="op">
                  <p className="k">Option 1: talk first</p>
                  <p>A call to discuss your goals and decide what to do first.</p>
                  <Link href="/contact#calendly-booking" className="b by">
                    Book a Strategy Call <Arrow />
                  </Link>
                </div>
                <div className="op">
                  <p className="k">Option 2: write first</p>
                  <p>Send a short project inquiry using the form. We reply by email.</p>
                </div>
              </div>
              <form
                className="s7 pa"
                style={{ background: "#fff", color: "#09105F", display: "grid", gap: 16 }}
                action={formAction}
                method="get"
                aria-label="Project inquiry"
              >
                <h3 style={{ fontSize: 24 }}>Project inquiry</h3>
                <p
                  style={{
                    background: "rgba(251,188,3,.25)",
                    borderRadius: 999,
                    padding: "6px 16px",
                    fontWeight: 600,
                    fontSize: 14,
                    justifySelf: "start",
                  }}
                >
                  Enquiring about: {m.inquiryLabel}
                </p>
                <div className="gr" style={{ gap: 16 }}>
                  <div className="s6">
                    <label htmlFor="sdn">Name</label>
                    <input id="sdn" name="name" className="in" autoComplete="name" required suppressHydrationWarning />
                    <span className="er">Please enter your name.</span>
                  </div>
                  <div className="s6">
                    <label htmlFor="sde">Email</label>
                    <input id="sde" name="email" className="in" type="email" autoComplete="email" required suppressHydrationWarning />
                    <span className="er">Please enter a valid email address.</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="sds">Service</label>
                  <select id="sds" name="service" className="in" defaultValue={m.inquiryLabel} suppressHydrationWarning>
                    <option value={m.inquiryLabel}>{m.inquiryLabel}</option>
                    {m.inquiryLabel.toLowerCase() !== "design" ? <option value="Design">Design</option> : null}
                    {m.inquiryLabel.toLowerCase() !== "development" ? <option value="Development">Development</option> : null}
                    {m.inquiryLabel.toLowerCase() !== "ai" ? <option value="AI">AI</option> : null}
                    {m.inquiryLabel.toLowerCase() !== "seo services" ? <option value="SEO Services">SEO Services</option> : null}
                    <option value="Paid advertising">Paid advertising</option>
                    <option value="Content marketing">Content marketing</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sdm">About your project</label>
                  <textarea id="sdm" name="message" className="in" required minLength={10} />
                  <span className="er">Please add a few words about your project.</span>
                </div>
                <button className="b bn" type="submit" style={{ justifySelf: "start" }}>
                  Send inquiry <Arrow />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <DetailFooter />
    </div>
  );
}
