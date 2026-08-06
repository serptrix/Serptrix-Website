"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const serviceGroups = [
  { title: "Digital Marketing", href: "/services/digital-marketing", items: [["SEO Optimization", "Earn durable, qualified search visibility.", "seo-optimization"], ["Social Media Marketing", "Turn attention into relevance and trust.", "social-media-marketing"], ["Performance Marketing", "Acquire customers against commercial targets.", "performance-marketing"]] },
  { title: "Development", href: "/services/development", items: [["Website Development", "Make every digital interaction faster and clearer.", "website-development"], ["SaaS Development", "Build useful products on scalable foundations.", "saas-development"], ["Ecommerce Development", "Remove friction from discovery to retention.", "ecommerce-development"]] },
  { title: "AI & Technology", href: "/services/ai-technology", items: [["AI Development", "Apply intelligence to valuable business problems.", "ai-development"], ["AI Automation", "Give teams back time and operating capacity.", "ai-automation"], ["Digital Strategy", "Connect technology choices to growth priorities.", "digital-strategy"]] },
];

export function Header() {
  const path = usePathname();
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { setMobile(false); setMega(false); }, [path]);

  return <>
    <div className="announcement"><div className="shell"><b>NEW</b><span>Now building practical AI systems for modern businesses.</span><Link href="/services/ai-technology">Explore AI Development <i>↗</i></Link></div></div>
    <motion.header className={`site-header ${scrolled ? "scrolled" : ""}`} initial={reduced ? false : { y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55 }}><div className="shell nav-wrap">
      <Link className="logo" href="/" aria-label="Serptrix home"><span className="logo-mark">S</span><span>SERPTRIX</span></Link>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={mobile} onClick={() => setMobile(!mobile)}><span /><span /></button>
      <motion.nav className={mobile ? "open" : ""} aria-label="Primary navigation" animate={mobile ? { opacity: 1, y: 0 } : { opacity: 1 }}>
        <div className="mega-trigger" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
          <button aria-expanded={mega} aria-controls="services-menu" onClick={() => setMega(!mega)} onFocus={() => setMega(true)}>Services <span>⌄</span></button>
          <AnimatePresence>{mega && <motion.div id="services-menu" className="mega-menu shown" initial={reduced ? false : { opacity: 0, y: -14, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }} onKeyDown={(event) => { if (event.key === "Escape") setMega(false); }}><div className="shell mega-inner"><div className="mega-intro"><p>CAPABILITIES</p><h2>Three disciplines.<br /><em>One growth agenda.</em></h2><Link href="/services">Explore all services <span>→</span></Link></div>{serviceGroups.map((group) => <div className="mega-group" key={group.title}><Link href={group.href}>{group.title} <span>↗</span></Link>{group.items.map((item) => <Link href={`/services/${item[2]}`} key={item[0]}><strong>{item[0]}{item[0] === "AI Development" && <b>NEW</b>}</strong><small>{item[1]}</small></Link>)}</div>)}</div></motion.div>}</AnimatePresence>
        </div>
        <Link className={path.startsWith("/case-studies") ? "active" : ""} href="/case-studies">Work</Link><Link className={path === "/about" ? "active" : ""} href="/about">About</Link><Link className={path.startsWith("/blog") ? "active" : ""} href="/blog">Insights</Link><Link className={path === "/contact" ? "active" : ""} href="/contact">Contact</Link><motion.div whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .98 }}><Link className="nav-cta" href="/contact">Book a Strategy Call <span>↗</span></Link></motion.div>
      </motion.nav>
    </div></motion.header>
  </>;
}

export function Footer() {
  return <footer><div className="shell footer-lead"><div><p className="eyebrow light"><span /> ONE CONNECTED PARTNER</p><h2>Build what moves<br />the business forward.</h2></div><Link className="btn btn-primary" href="/contact">Start a conversation <span>↗</span></Link></div><div className="shell footer-grid"><div className="footer-brand"><Link className="logo logo-light" href="/"><span className="logo-mark">S</span><span>SERPTRIX</span></Link><p>Serptrix connects marketing, development, AI, and strategy into growth systems for ambitious companies.</p><span>Working globally across time zones.</span></div><div><b>SERVICES</b><Link href="/services/digital-marketing">Digital Marketing</Link><Link href="/services/development">Development</Link><Link href="/services/ai-technology">AI & Technology</Link><Link href="/services">All Services</Link></div><div><b>COMPANY</b><Link href="/case-studies">Case Studies</Link><Link href="/about">About</Link><Link href="/blog">Insights</Link><Link href="/contact">Contact</Link></div><div><b>CONTACT</b><a href="mailto:hello@serptrix.com">hello@serptrix.com</a><span className="social-placeholder" title="Social profiles coming soon">LinkedIn · X · Instagram</span></div></div><div className="shell newsletter"><div><b>SERPTRIX SIGNAL</b><p>One useful idea on growth, technology, or AI. No noise.</p></div><form action="mailto:hello@serptrix.com" method="post"><label className="sr-only" htmlFor="newsletter-email">Work email</label><input id="newsletter-email" type="email" name="email" required placeholder="Work email address" /><button type="submit">Join the signal <span>↗</span></button></form></div><div className="shell footer-bottom"><span>© 2026 Serptrix. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><span>Strategy / Marketing / Development / AI</span></div></div></footer>;
}

export function InteriorHero({ eyebrow, title, accent, copy }: { eyebrow: string; title: string; accent: string; copy: string }) { return <section className="interior-hero shell"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1><p>{copy}</p></section>; }
