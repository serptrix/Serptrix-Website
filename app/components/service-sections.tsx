"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MagneticButton } from "./motion/magnetic-button";

const divisions = [
  { name: "Digital Marketing", signal: "Demand", outcome: "Attract attention, build demand and create measurable acquisition.", href: "/services/digital-marketing", services: ["SEO Optimization", "Social Media Marketing", "Performance Marketing"] },
  { name: "Development", signal: "Experience", outcome: "Turn strategy into fast, scalable and conversion-focused digital products.", href: "/services/development", services: ["Website Development", "SaaS Development", "Ecommerce Development"] },
  { name: "AI & Technology", signal: "Intelligence", outcome: "Connect systems, automate workflows and create smarter business operations.", href: "/services/ai-technology", services: ["AI Development", "AI Automation", "Digital Strategy"] },
];

const marketing = [
  ["SEO Optimization", "Improve technical health, search visibility, topical authority and qualified organic traffic.", "Intent → Visibility"],
  ["Social Media Marketing", "Build attention, credibility and engagement through platform-specific strategy and content.", "Attention → Relevance"],
  ["Performance Marketing", "Optimize paid campaigns around leads, revenue, acquisition cost and return on investment.", "Signal → Acquisition"],
];

const development = [
  ["Website Development", "Fast, responsive and conversion-focused websites built around clear business goals.", "Responsive interface"],
  ["SaaS Development", "Scalable platforms, portals and digital products designed for long-term growth.", "Modular product system"],
  ["Ecommerce Development", "High-performing stores engineered around conversion, retention and operational efficiency.", "Discovery to retention"],
];

export function ServiceSections() {
  const [active, setActive] = useState(0);
  return <>
    <section className="s3-section core-services" data-section="03">
      <div className="srx-shell core-services-head">
        <p className="srx-section-tag">03 / Services</p>
        <h2>Three capabilities. <em>One connected growth system.</em></h2>
        <p>Marketing, technology and operations should not compete for attention. Serptrix connects them into one commercial system—so every capability supports the next.</p>
      </div>
      <div className="srx-shell core-services-stage">
        <div className={`core-signal signal-${active}`} aria-hidden="true"><span>S</span><i/><i/><i/><b>{divisions[active].signal}</b></div>
        <div className="core-service-list">
          {divisions.map((division, index) => <motion.article key={division.name} className={active===index?"active":""} tabIndex={0} onFocus={()=>setActive(index)} onHoverStart={()=>setActive(index)}>
            <header><span>0{index+1}</span><p>{division.signal}</p><h3>{division.name}</h3></header>
            <p>{division.outcome}</p>
            <ul>{division.services.map(service=><li key={service}>{service}<span>↗</span></li>)}</ul>
            <Link href={division.href}>Explore {division.name} <span>→</span></Link>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section className="s3-section marketing-services" data-section="04">
      <div className="marketing-grid" aria-hidden="true"/>
      <div className="srx-shell marketing-services-head">
        <p className="srx-section-tag srx-light">04 / Digital Marketing</p>
        <h2>Turn visibility into <em>measurable demand.</em></h2>
        <p>We combine organic search, social attention and performance campaigns to attract the right audience, convert interest and improve acquisition efficiency.</p>
      </div>
      <div className="srx-shell marketing-command">
        <div className="marketing-journey" aria-label="Conceptual acquisition journey">
          <span>Qualified intent</span><i/><span>Relevant attention</span><i/><span>Conversion</span>
          <div className="marketing-chart"><b/><b/><b/><b/><b/><em>CONCEPTUAL SIGNAL — NOT CLIENT RESULTS</em></div>
        </div>
        <div className="marketing-service-list">{marketing.map((service,index)=><article key={service[0]}><span>0{index+1}</span><div><h3>{service[0]}</h3><p>{service[1]}</p><small>{service[2]}</small></div></article>)}</div>
      </div>
      <div className="srx-shell service-end"><Link className="srx-line-link" href="/services/digital-marketing">Explore Digital Marketing <span>→</span></Link></div>
    </section>

    <section className="s3-section development-services" data-section="05">
      <div className="srx-shell development-services-head">
        <p className="srx-section-tag">05 / Development</p>
        <h2>Digital products engineered to <em>perform and scale.</em></h2>
        <p>From conversion-focused websites to SaaS products and ecommerce platforms, Serptrix builds around speed, usability, scalability and business growth.</p>
      </div>
      <div className="srx-shell development-chapters">{development.map((service,index)=><article className={`dev-chapter dev-${index}`} key={service[0]}>
        <header><span>0{index+1}</span><small>{service[2]}</small><h3>{service[0]}</h3><p>{service[1]}</p></header>
        <div className="dev-visual" aria-hidden="true">{index===0?<><i className="browser-bar"/><b/><b/><b/></>:index===1?<><i className="side-rail"/><b/><b/><b/><b/></>:<><i className="commerce-line"/><b>Discover</b><b>Product</b><b>Checkout</b><b>Return</b></>}</div>
      </article>)}</div>
      <div className="srx-shell service-end"><MagneticButton href="/services/development" className="srx-button srx-button-gold">Explore Development Services</MagneticButton></div>
    </section>
  </>;
}
