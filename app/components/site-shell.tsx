"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionCapabilities } from "./motion/use-motion-capabilities";

const serviceGroups = [
  { title: "Digital Marketing", href: "/services/digital-marketing", items: [["SEO Optimization", "Earn durable, qualified search visibility.", "seo-optimization"], ["Social Media Marketing", "Turn attention into relevance and trust.", "social-media-marketing"], ["Performance Marketing", "Acquire customers against commercial targets.", "performance-marketing"]] },
  { title: "Development", href: "/services/development", items: [["Website Development", "Make every digital interaction faster and clearer.", "website-development"], ["SaaS Development", "Build useful products on scalable foundations.", "saas-development"], ["Ecommerce Development", "Remove friction from discovery to retention.", "ecommerce-development"]] },
  { title: "AI & Technology", href: "/services/ai-technology", items: [["AI Development", "Apply intelligence to valuable business problems.", "ai-development"], ["AI Automation", "Give teams back time and operating capacity.", "ai-automation"], ["Digital Strategy", "Connect technology choices to growth priorities.", "digital-strategy"]] },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: .055, delayChildren: .08 } } };
const item = { hidden: { opacity: 0, y: 14, filter: "blur(5px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: .38, ease: [0.22, 1, 0.36, 1] as const } } };

export function Header() {
  const path = usePathname(); const reduced = useReducedMotion(); const capabilities = useMotionCapabilities(); const [mobile, setMobile] = useState(false); const [mega, setMega] = useState(false); const [scrolled, setScrolled] = useState(false); const navRef = useRef<HTMLElement>(null); const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 28); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const frame = requestAnimationFrame(() => { setMobile(false); setMega(false); }); return () => cancelAnimationFrame(frame); }, [path]);
  useEffect(() => { const outside = (event: PointerEvent) => { if (mega && !navRef.current?.contains(event.target as Node)) setMega(false); }; document.addEventListener("pointerdown", outside); return () => document.removeEventListener("pointerdown", outside); }, [mega]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { if (mega) setMega(false); if (mobile) { setMobile(false); toggleRef.current?.focus(); } }
      if (!mobile || event.key !== "Tab" || !navRef.current) return;
      const focusable = [...navRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((node) => !node.hasAttribute("disabled"));
      if (!focusable.length) return; const first = focusable[0]; const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    if (mobile) { document.body.classList.add("nav-open"); requestAnimationFrame(() => navRef.current?.querySelector<HTMLElement>("button,a")?.focus()); }
    else document.body.classList.remove("nav-open");
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("nav-open"); };
  }, [mega, mobile]);
  const transparent = path === "/" && !scrolled;

  return <>
    <div className="announcement"><div className="shell"><b>NEW</b><span>Now building practical AI systems for modern businesses.</span><Link href="/services/ai-technology">Explore AI Development <i>↗</i></Link></div></div>
    <motion.header className={`site-header ${scrolled ? "scrolled" : ""} ${transparent ? "is-transparent" : ""} ${path === "/" ? "is-home" : ""}`} initial={reduced ? false : { y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55 }}><div className="shell nav-wrap">
      <Link className="logo" href="/" aria-label="Serptrix home"><motion.span className="logo-mark" animate={{ rotate: scrolled ? 0 : -6, scale: scrolled ? .9 : 1, clipPath: scrolled ? "polygon(0 0,100% 0,100% 72%,72% 100%,0 100%)" : "polygon(8% 0,100% 8%,92% 100%,0 92%)" }} transition={{ type: "spring", stiffness: 210, damping: 22 }}>S</motion.span><motion.span animate={{ letterSpacing: scrolled ? ".1em" : ".16em" }}>SERPTRIX</motion.span></Link>
      <button ref={toggleRef} className={`menu-toggle ${mobile ? "is-open" : ""}`} aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}><motion.span animate={mobile ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}/><motion.span animate={mobile ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}/></button>
      <motion.nav ref={navRef} className={mobile ? "open" : ""} aria-label="Primary navigation" initial={false} animate={capabilities.mobile ? (mobile ? { clipPath: "circle(145% at 92% 4%)", opacity: 1 } : { clipPath: "circle(0% at 92% 4%)", opacity: 0 }) : { clipPath: "none", opacity: 1 }} transition={{duration:.52,ease:[.22,1,.36,1]}} variants={stagger}>
        <motion.div className="mega-trigger" variants={item} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
          <button aria-expanded={mega} aria-controls="services-menu" onClick={(event) => setMega(event.detail === 0 ? !mega : true)}>Services <span>⌄</span></button>
          <AnimatePresence>{mega && <motion.div id="services-menu" className="mega-menu shown" initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }} animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }} exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }} transition={{ duration: .42, ease: [0.22,1,.36,1] }}>
            <motion.div className="mega-panel-bg" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} />
            <motion.div className="shell mega-inner" variants={stagger} initial="hidden" animate="show"><motion.div className="mega-intro" variants={item}><p>CAPABILITIES</p><h2>Three disciplines.<br/><em>One growth agenda.</em></h2><Link href="/services">Explore all services <span>→</span></Link></motion.div>{serviceGroups.map((group) => <motion.div className="mega-group" variants={item} key={group.title}><Link href={group.href}>{group.title} <span>↗</span></Link>{group.items.map((entry) => <motion.div variants={item} key={entry[0]}><Link href={`/services/${entry[2]}`}><strong>{entry[0]}{entry[0] === "AI Development" && <b>NEW</b>}</strong><small>{entry[1]}</small></Link></motion.div>)}</motion.div>)}</motion.div>
          </motion.div>}</AnimatePresence>
        </motion.div>
        <NavLink href="/case-studies" active={path.startsWith("/case-studies")}>Work</NavLink><NavLink href="/about" active={path === "/about"}>About</NavLink><NavLink href="/blog" active={path.startsWith("/blog")}>Insights</NavLink><NavLink href="/contact" active={path === "/contact"}>Contact</NavLink>
        <motion.div variants={item} whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .97 }}><Link className="nav-cta" href="/contact"><span className="nav-cta-face">Book a Strategy Call</span><span aria-hidden="true">↗</span></Link></motion.div>
      </motion.nav>
    </div></motion.header>
  </>;
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) { return <motion.div variants={item} className="nav-link-wrap"><Link className={active ? "active" : ""} href={href}>{children}<i className="nav-underline"/>{active && <motion.span className="nav-active-dot" layoutId="nav-active" transition={{type:"spring",stiffness:280,damping:26}}/>}</Link></motion.div>; }

export function Footer() { return <footer><div className="shell footer-grid"><div className="footer-brand"><Link className="logo logo-light" href="/"><span className="logo-mark">S</span><span>SERPTRIX</span></Link><p>Serptrix connects marketing, development, AI, and strategy into growth systems for ambitious companies.</p><span>Working globally across time zones.</span></div><div><b>SERVICES</b><Link href="/services/digital-marketing">Digital Marketing</Link><Link href="/services/development">Development</Link><Link href="/services/ai-technology">AI & Technology</Link><Link href="/services">All Services</Link></div><div><b>COMPANY</b><Link href="/case-studies">Case Studies</Link><Link href="/about">About</Link><Link href="/blog">Insights</Link><Link href="/contact">Contact</Link></div><div><b>CONTACT</b><a href="mailto:hello@serptrix.com">hello@serptrix.com</a><span className="social-placeholder">LinkedIn · X · Instagram</span></div></div><div className="shell newsletter"><div><b>SERPTRIX SIGNAL</b><p>One useful idea on growth, technology, or AI. No noise.</p></div><form action="mailto:hello@serptrix.com" method="post"><label className="sr-only" htmlFor="newsletter-email">Work email</label><input id="newsletter-email" type="email" name="email" required placeholder="Work email address"/><button type="submit">Join the signal <span>↗</span></button></form></div><div className="shell footer-bottom"><span>© 2026 Serptrix. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><span>Strategy / Marketing / Development / AI</span></div></div></footer>; }

export function InteriorHero({ eyebrow, title, accent, copy }: { eyebrow: string; title: string; accent: string; copy: string }) { return <section className="interior-hero shell"><p className="eyebrow"><span/> {eyebrow}</p><h1>{title}<br/><em>{accent}</em></h1><p>{copy}</p></section>; }
