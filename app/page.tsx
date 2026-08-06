import Link from "next/link";

const services = [
  { n: "01", title: "Digital Marketing", copy: "Turn visibility into qualified demand with search, social, and performance programs built around commercial outcomes.", items: ["SEO Optimization", "Social Media Marketing", "Performance Marketing"] },
  { n: "02", title: "Development", copy: "Create digital products that move quickly, scale cleanly, and turn every interaction into forward momentum.", items: ["Website Development", "SaaS Development", "Ecommerce Development"] },
  { n: "03", title: "AI & Technology", copy: "Connect intelligence to real workflows, automate the repetitive, and give teams better systems for growth.", items: ["AI Development", "AI Automation", "Digital Strategy"] },
];

const work = [
  { sector: "B2B SaaS", title: "From a fragmented funnel to one revenue system", stat: "+184%", label: "qualified pipeline", tone: "work-blue" },
  { sector: "Ecommerce", title: "A faster storefront built to convert returning demand", stat: "2.7×", label: "conversion lift", tone: "work-gold" },
  { sector: "Operations", title: "AI-assisted workflows that give the team its time back", stat: "420h", label: "saved per quarter", tone: "work-ink" },
];

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Digital growth, connected</p>
          <h1>Growth, engineered<br />as <em>one system.</em></h1>
          <p className="hero-lede">Serptrix unifies marketing, digital products, AI, and strategy—so every investment compounds instead of competing for attention.</p>
          <div className="actions">
            <Link className="btn btn-primary" href="/contact">Book a Strategy Call <span>↗</span></Link>
            <Link className="text-link" href="/services">Explore Our Services <span>→</span></Link>
          </div>
        </div>
        <div className="signal-stage" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="axis axis-x" /><div className="axis axis-y" />
          <div className="pulse p1" /><div className="pulse p2" /><div className="pulse p3" />
          <div className="signal-core"><span>S</span></div>
          <span className="signal-label label-a">VISIBILITY</span><span className="signal-label label-b">VELOCITY</span><span className="signal-label label-c">INTELLIGENCE</span>
        </div>
        <div className="hero-proof">
          <span>Built for ambitious</span>
          <strong>SAAS</strong><strong>ECOMMERCE</strong><strong>SERVICE BRANDS</strong><strong>GROWTH TEAMS</strong>
        </div>
      </section>

      <section className="manifesto section shell">
        <p className="section-index">01 — THE SHIFT</p>
        <div>
          <h2>More activity isn’t<br />the answer. <em>Alignment is.</em></h2>
          <p>Most businesses don’t have a channel problem. They have a connection problem. Strategy lives in one place, data in another, and execution moves without a shared direction.</p>
          <p>We design the system between them—turning scattered initiatives into a focused engine for acquisition, experience, and scale.</p>
        </div>
      </section>

      <section className="services dark-section">
        <div className="shell section-head">
          <p className="section-index light">02 — CAPABILITIES</p>
          <div><h2>Three disciplines.<br /><em>One growth agenda.</em></h2><p>Senior strategy and execution across the places where modern businesses win.</p></div>
        </div>
        <div className="shell service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="card-number">{service.n}</span>
              <div className="service-mark"><i /><i /><i /></div>
              <h3>{service.title}</h3><p>{service.copy}</p>
              <ul>{service.items.map((item, i) => <li key={item}>{item}{item === "AI Development" && <b>NEW</b>}<span>0{i + 1}</span></li>)}</ul>
            </article>
          ))}
        </div>
        <div className="shell centered-action"><Link className="btn btn-outline" href="/services">See every capability <span>→</span></Link></div>
      </section>

      <section className="work section shell">
        <div className="section-head work-head"><p className="section-index">03 — SELECTED OUTCOMES</p><div><h2>Proof in the<br /><em>right metrics.</em></h2><p>Representative engagements showing how integrated thinking creates measurable movement.</p></div></div>
        <div className="work-list">
          {work.map((item) => <article className={`work-card ${item.tone}`} key={item.title}>
            <div className="work-copy"><p>{item.sector} / SYSTEM TRANSFORMATION</p><h3>{item.title}</h3><Link href="/work">Read the case story <span>↗</span></Link></div>
            <div className="work-stat"><strong>{item.stat}</strong><span>{item.label}</span></div>
          </article>)}
        </div>
      </section>

      <section className="process section">
        <div className="shell section-head"><p className="section-index">04 — HOW WE WORK</p><div><h2>Clarity before<br /><em>complexity.</em></h2></div></div>
        <div className="shell process-grid">
          {[['01','Diagnose','We find the commercial constraint—not just the visible symptom.'],['02','Design','We shape a focused system, shared priorities, and a measurable plan.'],['03','Build','Specialists execute in tight, transparent cycles around real outcomes.'],['04','Compound','We learn from live data and keep improving what creates leverage.']].map(x => <article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-inner"><p className="eyebrow"><span /> YOUR NEXT GROWTH SYSTEM</p><h2>Let’s find the move<br />that changes <em>everything.</em></h2><p>A focused 30-minute conversation about where growth is getting stuck—and what a better system could unlock.</p><Link className="btn btn-dark" href="/contact">Book a Strategy Call <span>↗</span></Link></div>
      </section>
    </>
  );
}
