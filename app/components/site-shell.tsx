"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const serviceGroups = [
  { title: "Digital Marketing", href: "/services#digital", items: [["SEO Optimization", "Earn durable, qualified search visibility."], ["Social Media Marketing", "Turn attention into relevance and trust."], ["Performance Marketing", "Acquire customers against commercial targets."]] },
  { title: "Development", href: "/services#development", items: [["Website Development", "Make every digital interaction faster and clearer."], ["SaaS Development", "Build useful products on scalable foundations."], ["Ecommerce Development", "Remove friction from discovery to retention."]] },
  { title: "AI & Technology", href: "/services#ai", items: [["AI Development", "Apply intelligence to valuable business problems."], ["AI Automation", "Give teams back time and operating capacity."], ["Digital Strategy", "Connect technology choices to growth priorities."]] },
];

export function Header() {
  const path = usePathname(); const [mobile, setMobile] = useState(false); const [mega, setMega] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { setMobile(false); setMega(false); }, [path]);
  return <>
    <div className="announcement"><div className="shell"><b>NEW</b><span>Now building practical AI systems for modern businesses.</span><Link href="/services#ai">Explore AI Development <i>↗</i></Link></div></div>
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}><div className="shell nav-wrap">
      <Link className="logo" href="/" aria-label="Serptrix home"><span className="logo-mark">S</span><span>SERPTRIX</span></Link>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={mobile} onClick={() => setMobile(!mobile)}><span /><span /></button>
      <nav className={mobile ? "open" : ""} aria-label="Primary navigation">
        <div className="mega-trigger" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
          <button aria-expanded={mega} aria-controls="services-menu" onClick={() => setMega(!mega)} onFocus={() => setMega(true)}>Services <span>⌄</span></button>
          <div id="services-menu" className={`mega-menu ${mega ? "shown" : ""}`} onKeyDown={e => { if (e.key === "Escape") setMega(false); }}>
            <div className="shell mega-inner"><div className="mega-intro"><p>CAPABILITIES</p><h2>Three disciplines.<br /><em>One growth agenda.</em></h2><Link href="/services">Explore all services <span>→</span></Link></div>{serviceGroups.map(group => <div className="mega-group" key={group.title}><Link href={group.href}>{group.title} <span>↗</span></Link>{group.items.map(item => <Link href={group.href} key={item[0]}><strong>{item[0]}{item[0] === "AI Development" && <b>NEW</b>}</strong><small>{item[1]}</small></Link>)}</div>)}</div>
          </div>
        </div>
        <Link className={path === "/work" ? "active" : ""} href="/work">Work</Link><Link className={path === "/about" ? "active" : ""} href="/about">About</Link><Link className={path === "/insights" ? "active" : ""} href="/insights">Insights</Link><Link className={path === "/contact" ? "active" : ""} href="/contact">Contact</Link><Link className="nav-cta" href="/contact">Book a Strategy Call <span>↗</span></Link>
      </nav>
    </div></header>
  </>;
}

export function Footer() {
  return <footer><div className="shell footer-lead"><div><p className="eyebrow light"><span /> ONE CONNECTED PARTNER</p><h2>Build what moves<br />the business forward.</h2></div><Link className="btn btn-primary" href="/contact">Start a conversation <span>↗</span></Link></div><div className="shell footer-grid"><div className="footer-brand"><Link className="logo logo-light" href="/"><span className="logo-mark">S</span><span>SERPTRIX</span></Link><p>Serptrix connects marketing, development, AI, and strategy into growth systems for ambitious companies.</p><span>Working globally across time zones.</span></div><div><b>SERVICES</b><Link href="/services#digital">Digital Marketing</Link><Link href="/services#development">Development</Link><Link href="/services#ai">AI & Technology</Link><Link href="/services">All Services</Link></div><div><b>COMPANY</b><Link href="/work">Case Studies</Link><Link href="/about">About</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link></div><div><b>CONTACT</b><a href="mailto:hello@serptrix.com">hello@serptrix.com</a><span className="social-placeholder" title="Social profiles coming soon">LinkedIn · X · Instagram</span></div></div><div className="shell newsletter"><div><b>SERPTRIX SIGNAL</b><p>One useful idea on growth, technology, or AI. No noise.</p></div><form action="mailto:hello@serptrix.com" method="post"><label className="sr-only" htmlFor="newsletter-email">Work email</label><input id="newsletter-email" type="email" name="email" required placeholder="Work email address" /><button type="submit">Join the signal <span>↗</span></button></form></div><div className="shell footer-bottom"><span>© 2026 Serptrix. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>Strategy / Marketing / Development / AI</span></div></div></footer>;
}

export function InteriorHero({ eyebrow, title, accent, copy }: { eyebrow: string; title: string; accent: string; copy: string }) { return <section className="interior-hero shell"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1><p>{copy}</p></section>; }
