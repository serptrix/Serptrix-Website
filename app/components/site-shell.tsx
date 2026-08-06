"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["Services", "/services"], ["Work", "/work"], ["About", "/about"], ["Insights", "/insights"]];

export function Header() {
  const path = usePathname(); const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell nav-wrap">
    <Link className="logo" href="/" aria-label="Serptrix home"><span className="logo-mark">S</span><span>SERPTRIX</span></Link>
    <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    <nav className={open ? "open" : ""} aria-label="Primary navigation">{links.map(([label, href]) => <Link className={path === href ? "active" : ""} href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Book a Strategy Call <span>↗</span></Link></nav>
  </div></header>;
}

export function Footer() {
  return <footer><div className="shell footer-top"><div><Link className="logo logo-light" href="/"><span className="logo-mark">S</span><span>SERPTRIX</span></Link><p>Growth systems for ambitious companies.</p></div><div><span>EXPLORE</span><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link></div><div><span>START</span><Link href="/contact">Book a call</Link><a href="mailto:hello@serptrix.com">hello@serptrix.com</a></div></div><div className="shell footer-bottom"><span>© 2026 Serptrix. All rights reserved.</span><span>Strategy / Marketing / Development / AI</span></div></footer>;
}

export function InteriorHero({ eyebrow, title, accent, copy }: { eyebrow: string; title: string; accent: string; copy: string }) {
  return <section className="interior-hero shell"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1><p>{copy}</p></section>;
}
