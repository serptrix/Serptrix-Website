"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./motion/magnetic-button";
import { Parallax } from "./motion/parallax";
import { ScrollReveal } from "./motion/scroll-reveal";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./motion/hero-scene"), { ssr: false, loading: () => <div className="srx-canvas-loading" aria-hidden="true" /> });

const services = [
  {
    number: "01",
    title: "Digital Marketing",
    label: "Create demand",
    copy: "Search, social and performance systems engineered around commercial intent.",
    items: ["SEO Optimization", "Social Media Marketing", "Performance Marketing"],
    className: "is-gold",
  },
  {
    number: "02",
    title: "Development",
    label: "Build momentum",
    copy: "Fast, expressive digital products that make every customer interaction count.",
    items: ["Website Development", "SaaS Development", "Ecommerce Development"],
    className: "is-white",
  },
  {
    number: "03",
    title: "AI & Technology",
    label: "Scale intelligence",
    copy: "Practical AI and automation connected to the workflows that constrain growth.",
    items: ["AI Development", "AI Automation", "Digital Strategy"],
    className: "is-navy",
  },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1200;
      let frame = 0;
      const run = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(run);
      };
      frame = requestAnimationFrame(run);
      observer.disconnect();
      return () => cancelAnimationFrame(frame);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

export default function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  const servicesTrack = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 65, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 65, damping: 22 });
  const layerX = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const layerY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const heroCopyY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const pointer = (event: PointerEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => window.removeEventListener("pointermove", pointer);
  }, [mouseX, mouseY, reduced]);

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const track = servicesTrack.current;
        if (!track) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".srx-services-pin",
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight * 0.45}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
        gsap.fromTo(layer, { yPercent: -10 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });

      const workflow = gsap.timeline({ scrollTrigger: { trigger: ".srx-ai", start: "top 65%", end: "bottom 55%", scrub: 0.7 } });
      workflow.from(".srx-ai-line", { scaleX: 0, transformOrigin: "left" }).from(".srx-ai-node", { scale: 0, opacity: 0, stagger: 0.16 }, 0.1).to(".srx-ai-orb", { xPercent: 345, rotate: 240 }, 0);

      gsap.fromTo(".srx-proof-mask", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: ".srx-proof", start: "top 80%", end: "top 20%", scrub: true } });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <main ref={root} className="srx-home">
      <section ref={hero} className="srx-hero">
        <motion.div className="srx-hero-grid" style={{ x: reduced ? 0 : layerX, y: reduced ? 0 : layerY }} aria-hidden="true" />
        <div className="srx-shell srx-hero-layout">
          <motion.div className="srx-hero-copy" style={{ y: reduced ? 0 : heroCopyY, opacity: reduced ? 1 : heroOpacity }}>
            <ScrollReveal type="fade-down"><p className="srx-kicker"><i /> Independent digital growth studio <span>2026</span></p></ScrollReveal>
            <h1 aria-label="We engineer digital momentum">
              <ScrollReveal as="span" type="characters" text="We engineer" stagger={0.025} />
              <ScrollReveal as="span" type="words" delay={0.08} text="digital momentum." />
            </h1>
            <ScrollReveal type="mask" delay={0.18} className="srx-hero-bottom">
              <p>Serptrix connects marketing, product engineering and applied AI into one growth system—built to create demand, remove friction and scale what works.</p>
              <div className="srx-actions">
                <MagneticButton href="/contact" className="srx-button srx-button-gold">Start a project</MagneticButton>
                <Link href="/case-studies" className="srx-line-link">See our work <span>→</span></Link>
              </div>
            </ScrollReveal>
          </motion.div>
          <motion.div className="srx-hero-scene" style={{ opacity: heroOpacity }}>
            <HeroScene scrollProgress={scrollYProgress} />
            <div className="srx-scene-label srx-label-a"><b>01</b> Demand</div>
            <div className="srx-scene-label srx-label-b"><b>02</b> Experience</div>
            <div className="srx-scene-label srx-label-c"><b>03</b> Intelligence</div>
          </motion.div>
        </div>
        <div className="srx-scroll-mark"><span>Explore</span><i /></div>
      </section>

      <section className="srx-manifesto">
        <Parallax type="reverse" strength={48} advanced className="srx-manifesto-word">CONNECTED</Parallax>
        <div className="srx-shell srx-manifesto-layout">
          <ScrollReveal type="fade-right"><p className="srx-section-tag">01 / The proposition</p></ScrollReveal>
          <ScrollReveal type="lines" delay={0.08} text={"Three disciplines.\nOne commercial agenda."} as="h2" />
          <ScrollReveal type="blur" delay={0.14}><p className="srx-manifesto-copy">Growth stalls between disconnected partners, platforms and priorities. We bring the system together—strategy through execution—with one senior team accountable for the outcome.</p></ScrollReveal>
        </div>
        <div className="srx-ticker" aria-label="Serptrix capabilities"><div>{["STRATEGY", "SEARCH", "EXPERIENCE", "ENGINEERING", "AUTOMATION", "INTELLIGENCE", "STRATEGY", "SEARCH", "EXPERIENCE"].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>
      </section>

      <section className="srx-services-pin" aria-label="Service divisions" data-cursor="drag" data-cursor-label="SCROLL">
        <div ref={servicesTrack} className="srx-services-track">
          <article className="srx-service-intro">
            <p className="srx-section-tag srx-light">02 / The ecosystem</p>
            <h2>Move through<br />the <em>system.</em></h2>
            <p>Each discipline performs independently. Together, they compound.</p>
            <div className="srx-drag-cue"><i /> Scroll to explore</div>
          </article>
          {services.map((service) => (
            <motion.article key={service.title} className={`srx-service-panel ${service.className}`} whileHover={reduced ? undefined : { y: -10 }} transition={{ type: "spring", stiffness: 180, damping: 20 }}>
              <div className="srx-panel-top"><span>{service.number}</span><p>{service.label}</p><i>↗</i></div>
              <div className="srx-panel-orbit" aria-hidden="true"><i /><i /><b>S</b></div>
              <div className="srx-panel-content"><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}<span>→</span></li>)}</ul></div>
            </motion.article>
          ))}
          <article className="srx-service-outro">
            <p>Not sure where the constraint lives?</p><h2>Start with the<br /><em>business problem.</em></h2>
            <MagneticButton href="/contact" className="srx-button srx-button-gold">Map the opportunity</MagneticButton>
          </article>
        </div>
      </section>

      <section className="srx-ai">
        <Parallax type="layered" layer={1.35} strength={34} advanced className="srx-ai-rings"><i /><i /><i /></Parallax>
        <div className="srx-shell">
          <div className="srx-ai-head"><ScrollReveal type="fade-left"><p className="srx-section-tag srx-light">03 / Applied intelligence</p></ScrollReveal><ScrollReveal type="scale" delay={0.08}><h2>AI that works<br />where work <em>happens.</em></h2></ScrollReveal></div>
          <div className="srx-ai-stage" aria-label="AI workflow from business signal to measurable action">
            <div className="srx-ai-line" />
            <div className="srx-ai-orb">S</div>
            {[['01','Signal','Customer, market or operating data'],['02','Reason','Classify, enrich and decide'],['03','Act','Route the next best action'],['04','Learn','Measure and improve the system']].map((step) => <article className="srx-ai-node" key={step[0]}><span>{step[0]}</span><b>{step[1]}</b><p>{step[2]}</p></article>)}
          </div>
          <div className="srx-ai-foot"><p>From customer support agents to internal knowledge systems and intelligent lead routing—useful AI starts with a valuable workflow.</p><Link className="srx-line-link srx-light-link" href="/services/ai-technology">Explore AI & Technology <span>→</span></Link></div>
        </div>
      </section>

      <section className="srx-proof">
        <div className="srx-proof-mask" aria-hidden="true"><div className="srx-proof-art"><i /><i /><i /><span>01—03</span></div></div>
        <div className="srx-shell srx-proof-layout">
          <div><p className="srx-section-tag">04 / Why connected wins</p><h2>Less handoff.<br />More <em>velocity.</em></h2></div>
          <div className="srx-proof-copy">
            <p>Our model closes the distance between the idea, the build and the evidence. That means sharper decisions, faster learning and a system that improves as one.</p>
            <div className="srx-stats"><article><strong><CountUp value={3} suffix="×" /></strong><span>CONNECTED DIVISIONS</span></article><article><strong><CountUp value={9} suffix="" /></strong><span>SPECIALIST CAPABILITIES</span></article><article><strong><CountUp value={1} suffix="" /></strong><span>GROWTH AGENDA</span></article></div>
          </div>
        </div>
      </section>

      <section className="srx-process">
        <div className="srx-shell">
          <ScrollReveal type="stagger" className="srx-process-head"><p className="srx-section-tag">05 / How we move</p><h2>Clarity, then<br /><em>momentum.</em></h2><p>We resolve risk in the right order, then keep the work moving in tight, visible cycles.</p></ScrollReveal>
          <div className="srx-process-grid">{[
            ["01", "Diagnose", "Find the constraint beneath the symptoms."],
            ["02", "Design", "Shape the strategy, system and evidence plan."],
            ["03", "Build", "Create in focused cycles with senior direction."],
            ["04", "Compound", "Learn from evidence and improve what matters."],
          ].map((step, index) => <motion.article key={step[0]} whileHover={reduced ? undefined : { rotateX: -5, rotateY: index % 2 ? -4 : 4, y: -8 }} transition={{ type: "spring", stiffness: 150, damping: 18 }}><span>{step[0]}</span><div className="srx-process-glyph"><i /><i /></div><h3>{step[1]}</h3><p>{step[2]}</p></motion.article>)}</div>
        </div>
      </section>

      <section className="srx-final">
        <Parallax type="scale" strength={28} className="srx-final-grid"><span /></Parallax>
        <div className="srx-shell srx-final-inner">
          <ScrollReveal type="fade-down"><p className="srx-section-tag srx-light">06 / Your next move</p></ScrollReveal>
          <ScrollReveal type="mask" delay={0.08}><h2>Make digital your<br /><em>unfair advantage.</em></h2></ScrollReveal>
          <ScrollReveal type="fade-left" delay={0.16} className="srx-final-row"><p>Bring us the growth problem worth solving. We’ll bring the connected thinking and technical depth to move it forward.</p><MagneticButton href="/contact" className="srx-button srx-button-gold">Book a strategy call</MagneticButton></ScrollReveal>
        </div>
        <div className="srx-final-marquee" aria-hidden="true"><span>SERPTRIX — GROWTH, ENGINEERED — SERPTRIX — GROWTH, ENGINEERED —</span></div>
      </section>
    </main>
  );
}
