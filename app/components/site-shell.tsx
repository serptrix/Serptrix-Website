"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { serviceGroups as canonicalServiceGroups } from "@/content/site-data";

const serviceGroups = canonicalServiceGroups.map((group) => ({
  title: group.name,
  href: group.href,
  items: group.items.map((service) => [service.name, service.promise, service.slug] as const),
}));

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const NAV_COMPACT_QUERY = "(max-width: 1100px)";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Header() {
  const path = usePathname();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia(NAV_COMPACT_QUERY);
    const sync = () => {
      const matches = media.matches;
      setCompactNav(matches);
      if (!matches) {
        setMenuOpen(false);
        setMega(false);
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 28);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMenuOpen(false);
      setMega(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [path]);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (mega && !navRef.current?.contains(event.target as Node)) setMega(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [mega]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mega) setMega(false);
        if (menuOpen) {
          setMenuOpen(false);
          toggleRef.current?.focus();
        }
      }
      if (!menuOpen || event.key !== "Tab" || !navRef.current) return;
      const focusable = [...navRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(
        (node) => !node.hasAttribute("disabled"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    if (menuOpen) {
      document.body.classList.add("nav-open");
      requestAnimationFrame(() => navRef.current?.querySelector<HTMLElement>("button,a")?.focus());
    } else document.body.classList.remove("nav-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [mega, menuOpen]);

  const transparent = path === "/" && !scrolled && !compactNav;
  const headerClass = cn(
    "site-header",
    scrolled && "scrolled",
    transparent && "is-transparent",
    path === "/" && "is-home",
    compactNav && "is-compact-nav",
  );

  return (
    <>
      <div className="announcement">
        <div className="shell">
          <b>NEW</b>
          <span>Now building practical AI systems for modern businesses.</span>
          <Link href="/services/ai-development">
            Explore AI Development <i>↗</i>
          </Link>
        </div>
      </div>
      <motion.header
        className={headerClass}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        <div className="shell nav-wrap">
          <Link className="logo" href="/" aria-label="Serptrix home">
            <motion.span
              className="site-logo-motion"
              animate={{
                scale: scrolled ? 0.94 : 1,
              }}
              transition={{ type: "spring", stiffness: 210, damping: 22 }}
            >
              <Image
                className="site-logo-image site-logo-image--header"
                src="/Serptrix-header.svg"
                alt=""
                width={2000}
                height={600}
                priority
              />
            </motion.span>
          </Link>
          <button
            ref={toggleRef}
            className={cn("menu-toggle", menuOpen && "is-open")}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
          </button>
          <motion.nav
            id="primary-navigation"
            ref={navRef}
            className={cn(menuOpen && "open")}
            aria-label="Primary navigation"
            initial={false}
            animate={
              compactNav
                ? menuOpen
                  ? { clipPath: "circle(145% at 92% 4%)", opacity: 1 }
                  : { clipPath: "circle(0% at 92% 4%)", opacity: 0 }
                : { clipPath: "none", opacity: 1 }
            }
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            variants={stagger}
          >
            <motion.div className="mega-trigger" variants={item} onMouseEnter={() => !compactNav && setMega(true)} onMouseLeave={() => !compactNav && setMega(false)}>
              <button
                aria-expanded={mega}
                aria-controls="services-menu"
                onClick={(event) => setMega(event.detail === 0 ? !mega : true)}
              >
                Services <span>⌄</span>
              </button>
              <AnimatePresence>
                {mega && (
                  <motion.div
                    id="services-menu"
                    className="mega-menu shown"
                    initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                    animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                    exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div className="mega-panel-bg" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} />
                    <motion.div className="shell mega-inner" variants={stagger} initial="hidden" animate="show">
                      <motion.div className="mega-intro" variants={item}>
                        <p>CAPABILITIES</p>
                        <h2>
                          Three disciplines.
                          <br />
                          <em>One growth agenda.</em>
                        </h2>
                        <Link href="/services">
                          Explore all services <span>→</span>
                        </Link>
                      </motion.div>
                      {serviceGroups.map((group) => (
                        <motion.div className="mega-group" variants={item} key={group.title}>
                          <Link href={group.href}>
                            {group.title} <span>↗</span>
                          </Link>
                          {group.items.map((entry) => (
                            <motion.div variants={item} key={entry[0]}>
                              <Link href={`/services/${entry[2]}`}>
                                <strong>
                                  {entry[0]}
                                  {entry[0] === "AI Development" && <b>NEW</b>}
                                </strong>
                                <small>{entry[1]}</small>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <NavLink href="/case-studies" active={path.startsWith("/case-studies")}>
              Work
            </NavLink>
            <NavLink href="/about" active={path === "/about"}>
              About
            </NavLink>
            <NavLink href="/blog" active={path.startsWith("/blog")}>
              Insights
            </NavLink>
            <NavLink href="/search" active={path.startsWith("/search")}>
              Search
            </NavLink>
            <NavLink href="/contact" active={path === "/contact"}>
              Contact
            </NavLink>
            <motion.div variants={item} whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
              <Link className="nav-cta" href="/contact">
                <span className="nav-cta-face">Book a Strategy Call</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </motion.div>
          </motion.nav>
        </div>
      </motion.header>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <motion.div variants={item} className="nav-link-wrap">
      <Link className={active ? "active" : ""} href={href}>
        {children}
        <i className="nav-underline" />
        {active && <motion.span className="nav-active-dot" layoutId="nav-active" transition={{ type: "spring", stiffness: 280, damping: 26 }} />}
      </Link>
    </motion.div>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  accent,
  copy,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="interior-hero shell">
      {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
      <p className="eyebrow">
        <span /> {eyebrow}
      </p>
      <h1>
        {title}
        <br />
        <em>{accent}</em>
      </h1>
      <p>{copy}</p>
    </section>
  );
}
