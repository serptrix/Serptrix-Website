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
import { useMotionCapabilities } from "./motion/use-motion-capabilities";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./motion/hero-scene"), { ssr: false, loading: () => <div className="srx-canvas-loading" aria-hidden="true" /> });
const WorkflowScene = dynamic(() => import("./motion/workflow-scene"), { ssr: false, loading: () => <div className="srx-ai3d-fallback" aria-hidden="true" /> });
const ParticleField = dynamic(() => import("./motion/particle-field"), { ssr: false });

const divisions = [
  { name: "Digital Marketing", label: "Demand", copy: "Build visibility, attention and acquisition around the intent that moves revenue.", items: ["SEO Optimization", "Social Media Marketing", "Performance Marketing"] },
  { name: "Development", label: "Experience", copy: "Engineer fast, scalable digital products that make difficult journeys feel obvious.", items: ["Website Development", "SaaS Development", "Ecommerce Development"] },
  { name: "AI & Technology", label: "Intelligence", copy: "Connect practical AI, automation and strategy to the workflows that constrain scale.", items: ["AI Development", "AI Automation", "Digital Strategy"] },
];

const aiServices = [
  { name: "AI Development", badge: "New", copy: "Purpose-built intelligence for knowledge, support and data-rich decisions.", nodes: ["Input", "Analysis", "Intelligence", "Action", "Result"] },
  { name: "AI Automation", copy: "Connected workflows that classify, route and complete repetitive operating work.", nodes: ["Trigger", "Qualify", "Route", "Automate", "Complete"] },
  { name: "Digital Strategy", copy: "A practical roadmap connecting technology decisions to commercial priorities.", nodes: ["Context", "Diagnose", "Model", "Roadmap", "Measure"] },
];

const cases = [
  { id: "01", type: "B2B SaaS / Acquisition", title: "Making a complex platform easier to understand—and easier to buy.", tags: "Strategy · Web · SEO", className: "case-saas" },
  { id: "02", type: "Ecommerce / Experience", title: "Connecting product discovery to confident repeat purchase.", tags: "UX · Development · CRO", className: "case-commerce" },
  { id: "03", type: "Services / AI Operations", title: "Giving a growing team back its most valuable operating hours.", tags: "AI · Automation · Integration", className: "case-automation" },
];

const processSteps = [
  ["01", "Discover", "Align on the ambition, audience and commercial reality."], ["02", "Diagnose", "Find the constraint beneath the visible symptoms."], ["03", "Design", "Shape the strategy, experience and evidence plan."],
  ["04", "Build", "Execute in focused cycles with senior direction close."], ["05", "Launch", "Release with control and establish a clean baseline."], ["06", "Optimize", "Learn from evidence and improve what creates leverage."],
];

const principles = [
  ["Strategy before execution", "We identify the commercial constraint before prescribing deliverables."],
  ["Outcomes before vanity metrics", "Visibility, conversion, efficiency and scale define the scorecard."],
  ["Practical AI before hype", "Intelligence earns its place by improving a real workflow or decision."],
  ["Scalable systems before temporary fixes", "The foundations are designed for the next stage, not only launch day."],
  ["Continuous optimization after launch", "Launch creates evidence. Evidence directs the next valuable move."],
];

const impactStatements = ["Increase discoverability around qualified commercial intent.", "Remove friction from the decisions that move buyers forward.", "Return operating capacity through useful connected automation.", "Improve acquisition economics with accountable channel systems."];

const articles = [
  { cat: "Strategy", title: "Why your growth stack needs an operating system—not another tool", time: "7 min", date: "August 4, 2026", slug: "growth-stack-operating-system" },
  { cat: "AI & Operations", title: "The practical AI roadmap starts with workflow friction", time: "6 min", date: "July 28, 2026", slug: "practical-ai-roadmap" },
  { cat: "Conversion", title: "What high-performing B2B websites make easy", time: "8 min", date: "July 16, 2026", slug: "high-performing-b2b-websites" },
  { cat: "Performance", title: "Better acquisition begins with a better measurement question", time: "5 min", date: "July 8, 2026", slug: "better-acquisition-measurement" },
];

function PlaceholderCounter({ suffix = "%" }: { suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const [value, setValue] = useState("[XX]");
  useEffect(() => { const el = ref.current; if (!el) return; let frame = 0; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const start = performance.now(); const animate = (now: number) => { const p = Math.min(1, (now - start) / 900); setValue(p === 1 ? "[XX]" : String(Math.floor(p * 99)).padStart(2, "0")); if (p < 1) frame = requestAnimationFrame(animate); }; frame = requestAnimationFrame(animate); observer.disconnect(); }, { threshold: .6 }); observer.observe(el); return () => { observer.disconnect(); cancelAnimationFrame(frame); }; }, []);
  return <span ref={ref}>{value}{suffix}</span>;
}

function MarketingField() {
  const field = useRef<HTMLDivElement>(null); const glowX = useMotionValue(50); const glowY = useMotionValue(50); const x = useSpring(glowX, { stiffness: 80, damping: 25 }); const y = useSpring(glowY, { stiffness: 80, damping: 25 });
  return <div ref={field} className="s3-data-field" onPointerMove={(event) => { const box = field.current?.getBoundingClientRect(); if (!box) return; glowX.set(((event.clientX - box.left) / box.width) * 100); glowY.set(((event.clientY - box.top) / box.height) * 100); }}>
    <motion.i className="s3-data-glow" style={{ left: useTransform(x, (v) => `${v}%`), top: useTransform(y, (v) => `${v}%`) }} />
    <div className="s3-search-bar"><span>⌕</span><b>qualified growth opportunities</b><i>LIVE</i></div>
    <svg className="s3-growth-graph" viewBox="0 0 700 260" role="img" aria-label="Abstract search visibility trend"><path className="s3-graph-base" d="M10 235 C120 220,145 190,225 202 S350 145,420 158 S530 88,690 35"/><path className="s3-graph-live" d="M10 235 C120 220,145 190,225 202 S350 145,420 158 S530 88,690 35"/></svg>
    <div className="s3-rank-stack">{["High-intent visibility", "Relevant brand attention", "Efficient acquisition"].map((item, i) => <motion.div key={item} initial={{ x: 35, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: i * .12 }}><span>0{i + 1}</span><b>{item}</b><i style={{ width: `${88 - i * 17}%` }} /></motion.div>)}</div>
    <div className="s3-nodes" aria-hidden="true"><i/><i/><i/><i/><span/><span/><span/></div>
  </div>;
}

export default function HomeExperience() {
  const root = useRef<HTMLElement>(null); const hero = useRef<HTMLElement>(null); const eco = useRef<HTMLElement>(null); const ecoProgress = useRef<HTMLDivElement>(null); const devTrack = useRef<HTMLDivElement>(null); const process = useRef<HTMLElement>(null);
  const reduced = useReducedMotion(); const capabilities = useMotionCapabilities(); const [activeDivision, setActiveDivision] = useState(0); const [aiTab, setAiTab] = useState(0); const [activeCase, setActiveCase] = useState(0); const [activePrinciple, setActivePrinciple] = useState(0); const [activeProcess, setActiveProcess] = useState(0); const [activeMetric, setActiveMetric] = useState(0);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0); const smoothX = useSpring(mouseX, { stiffness: 65, damping: 22 }); const smoothY = useSpring(mouseY, { stiffness: 65, damping: 22 });
  const layerOneX = useTransform(smoothX, [-.5,.5], [-14,14]); const layerOneY = useTransform(smoothY, [-.5,.5], [-9,9]); const layerTwoX = useTransform(smoothX, [-.5,.5], [-30,30]); const layerTwoY = useTransform(smoothY, [-.5,.5], [-20,20]); const layerThreeX = useTransform(smoothX, [-.5,.5], [-48,48]); const manifestoX = useTransform(smoothX, [-.5,.5], [-9,9]);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] }); const heroY = useTransform(scrollYProgress, [0,1], [0,170]); const heroScale = useTransform(scrollYProgress, [0,1], [1,.92]); const heroOpacity = useTransform(scrollYProgress, [0,.82], [1,0]);

  useEffect(() => { if (reduced || capabilities.touch) return; let frame = 0; let px = 0; let py = 0; const update = () => { mouseX.set(px / window.innerWidth - .5); mouseY.set(py / window.innerHeight - .5); frame = 0; }; const pointer = (event: PointerEvent) => { px = event.clientX; py = event.clientY; if (!frame) frame = requestAnimationFrame(update); }; window.addEventListener("pointermove", pointer, { passive: true }); return () => { window.removeEventListener("pointermove", pointer); cancelAnimationFrame(frame); }; }, [capabilities.touch, mouseX, mouseY, reduced]);

  useEffect(() => { if (!root.current || reduced) return; const ctx = gsap.context(() => { const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      ScrollTrigger.create({ trigger: eco.current, start: "top top", end: "+=240%", pin: true, scrub: .7, onUpdate: (self) => { const next = Math.min(2, Math.floor(self.progress * 3)); setActiveDivision(next); if (ecoProgress.current) ecoProgress.current.style.transform = `scaleX(${self.progress})`; } });
      const track = devTrack.current; if (track) { gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: "none", scrollTrigger: { trigger: ".s5-development", start: "top top", end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight * .45}`, pin: true, scrub: .8, invalidateOnRefresh: true } }); gsap.utils.toArray<HTMLElement>(".s5-dev-panel").forEach((panel) => gsap.fromTo(panel, { scale: .9 }, { scale: 1, scrollTrigger: { trigger: panel, containerAnimation: gsap.getTweensOf(track)[0], start: "left 90%", end: "center center", scrub: true } })); }
    });
    gsap.fromTo(".s3-graph-live", { strokeDashoffset: 1200 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".s4-marketing", start: "top 75%", end: "bottom 35%", scrub: true } });
    gsap.fromTo(".s4-data-grid", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".s4-marketing", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".s6-node", { opacity: .22, scale: .92, filter: "blur(5px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", stagger: .12, scrollTrigger: { trigger: ".s6-workflow", start: "top 85%", end: "bottom 45%", scrub: .7 } });
    gsap.fromTo(".s7-impact", { backgroundColor: "#ffffff" }, { backgroundColor: "#fff7d8", scrollTrigger: { trigger: ".s7-impact", start: "top 75%", end: "bottom 30%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".s7-metrics article").forEach((metric,i) => { ScrollTrigger.create({ trigger: metric, start: "top 55%", end: "bottom 45%", onEnter: () => setActiveMetric(i), onEnterBack: () => setActiveMetric(i) }); const label=metric.querySelector("p"); if(label) gsap.fromTo(label,{y:i%2?-15:15},{y:i%2?15:-15,ease:"none",scrollTrigger:{trigger:metric,start:"top bottom",end:"bottom top",scrub:true}}); });
    ScrollTrigger.create({ trigger: process.current, start: "top 25%", end: "bottom 70%", onUpdate: (self) => setActiveProcess(Math.min(5, Math.floor(self.progress * 6))) });
    gsap.fromTo(".s9-timeline-fill", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: process.current, start: "top 35%", end: "bottom 65%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".s11-article-art i").forEach((image) => gsap.fromTo(image, { yPercent: -8 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
    gsap.utils.toArray<HTMLElement>(".s11-article-art").forEach((art) => gsap.fromTo(art,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1,ease:"power3.out",scrollTrigger:{trigger:art,start:"top 85%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".s3-section").slice(1).forEach((section) => gsap.to(section,{"--section-progress":1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 92%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".s2-statement,.s4-layout,.s6-head,.s8-head,.s10-statements,.s11-head,.s12-inner").forEach((layer) => gsap.fromTo(layer,{y:34,scale:.985,filter:"blur(7px)"},{y:0,scale:1,filter:"blur(0px)",duration:.9,ease:"power3.out",scrollTrigger:{trigger:layer,start:"top 88%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".s3-home h2 em").forEach((accent) => gsap.to(accent,{"--highlight":1,duration:.7,ease:"power2.out",scrollTrigger:{trigger:accent,start:"top 86%",once:true}}));
    return () => mm.revert();
  }, root); return () => ctx.revert(); }, [reduced]);

  const currentDivision = divisions[activeDivision]; const currentAi = aiServices[aiTab];
  return <main ref={root} className="srx-home s3-home">
    {/* 01 — Immersive WebGL Hero */}
    <section ref={hero} className="s3-section s1-hero" data-section="01">
      <motion.div className="s1-grid s1-depth-back" style={{ x: layerOneX, y: layerOneY }} aria-hidden="true"/><motion.div className="s1-glow s1-depth-mid" style={{ x: layerTwoX, y: layerTwoY }} aria-hidden="true"/><motion.div className="s1-cross s1-depth-front" style={{ x: layerThreeX }} aria-hidden="true"/>
      <div className="srx-shell s1-layout">
        <motion.div className="s1-copy" style={{ y: reduced ? 0 : heroY, scale: reduced ? 1 : heroScale, opacity: reduced ? 1 : heroOpacity }}>
          <ScrollReveal type="mask"><p className="srx-kicker"><i/> Digital Growth. Technology. Intelligence.</p></ScrollReveal>
          <h1><ScrollReveal as="span" type="mask" immediate>We engineer <motion.em initial={{color:"#ffffff"}} animate={{color:"#FBBC03"}} transition={{delay:.72,duration:.6}}>digital systems</motion.em></ScrollReveal><ScrollReveal as="span" type="mask" delay={.1} immediate>that move businesses <motion.em initial={{color:"#ffffff"}} animate={{color:"#FBBC03"}} transition={{delay:.95,duration:.6}}>forward.</motion.em></ScrollReveal></h1>
          <ScrollReveal type="fade-up" delay={.2}><p className="s1-lede">Serptrix combines performance marketing, scalable development, AI, and digital strategy to increase visibility, improve efficiency, and create measurable growth.</p></ScrollReveal>
          <ScrollReveal type="stagger" delay={.28} className="s1-actions"><MagneticButton href="/contact" className="srx-button srx-button-gold">Book a Strategy Call</MagneticButton><Link className="srx-line-link" href="/case-studies">Explore Our Work <span>→</span></Link></ScrollReveal>
        </motion.div>
        <motion.div className="s1-scene" style={{ opacity: heroOpacity }}><HeroScene scrollProgress={scrollYProgress}/><span className="s1-system-label l1">MARKETING</span><span className="s1-system-label l2">DEVELOPMENT</span><span className="s1-system-label l3">AI + TECH</span></motion.div>
      </div><div className="srx-scroll-mark"><span>Scroll to explore</span><i/></div>
    </section>

    {/* 02 — Cinematic Trust Marquee */}
    <section className="s3-section s2-trust" data-section="02">
      <Parallax type="horizontal" strength={90} className="s2-ghost">AMBITION NEEDS A SYSTEM</Parallax>
      <motion.div className="s2-marquee is-top" data-cursor="drag" data-cursor-label="DRAG" drag={reduced?false:"x"} dragConstraints={{left:-420,right:0}} dragElastic={.08}><div>{["ECOMMERCE","SAAS","B2B","TECHNOLOGY","PROFESSIONAL SERVICES","ECOMMERCE","SAAS","B2B"].map((x,i)=><span className={i%3===0?"is-outline":""} key={`${x}-${i}`}>{x}<i>✦</i></span>)}</div></motion.div>
      <div className="srx-shell s2-statement"><p className="srx-section-tag">02 / Built for ambitious businesses</p><ScrollReveal type="words" text="For leaders turning digital complexity into a clear commercial advantage." as="h2" stagger={.045}/></div>
      <motion.div className="s2-marquee is-bottom" data-cursor="drag" data-cursor-label="DRAG" drag={reduced?false:"x"} dragConstraints={{left:-420,right:0}} dragElastic={.08}><div>{["STRATEGY","SEARCH","EXPERIENCE","ENGINEERING","AUTOMATION","INTELLIGENCE","STRATEGY","SEARCH"].map((x,i)=><span className={i%2===0?"is-large":""} key={`${x}-${i}`}>{x}<i>◆</i></span>)}</div></motion.div>
    </section>

    {/* 03 — Interactive Service Ecosystem */}
    <section ref={eco} className={`s3-section s3-ecosystem eco-${activeDivision}`} data-section="03">
      <div className="s3-eco-progress"><div ref={ecoProgress}/></div><div className="srx-shell s3-eco-layout">
        <div className="s3-eco-nav"><p className="srx-section-tag srx-light">03 / The ecosystem</p>{divisions.map((d,i)=><button key={d.name} className={activeDivision===i?"active":""} onClick={()=>setActiveDivision(i)}><span>0{i+1}</span>{d.name}</button>)}</div>
        <motion.div className="s3-eco-visual" style={{x:layerOneX,y:layerOneY}} aria-hidden="true"><i className="eco-ring r1"/><i className="eco-ring r2"/><i className="eco-ring r3"/><div className="eco-core">S</div>{divisions.map((d,i)=><div key={d.name} className={`eco-satellite sat-${i} ${activeDivision===i?"active":""}`}><b>0{i+1}</b><span>{d.label}</span></div>)}<div className="eco-connection"/></motion.div>
        <AnimateDivision key={activeDivision} division={currentDivision}/>
      </div>
    </section>

    {/* 04 — SEO and Performance Marketing Data Experience */}
    <section className="s3-section s4-marketing" data-section="04"><div className="s4-data-grid" aria-hidden="true"/><div className="srx-shell s4-layout"><div className="s4-copy"><ScrollReveal type="fade-right"><p className="srx-section-tag srx-light">04 / Digital marketing</p></ScrollReveal><ScrollReveal type="mask"><h2>Demand becomes visible<br/>when the <em>signals connect.</em></h2></ScrollReveal><p>Search, social and paid media become more valuable when each channel learns from the same customer journey.</p><div className="s4-services">{["SEO Optimization","Social Media Marketing","Performance Marketing"].map((x,i)=><article key={x}><span>0{i+1}</span><b>{x}</b><small>{i===0?"Intent → Visibility":i===1?"Attention → Relevance":"Signal → Acquisition"}</small></article>)}</div></div><MarketingField/></div><div className="srx-shell s4-metrics"><article><PlaceholderCounter/><p>qualified traffic growth</p></article><article><PlaceholderCounter/><p>conversion improvement</p></article><aside>VERIFIED PROJECT-DATA PLACEHOLDERS</aside></div></section>

    {/* 05 — Horizontal Development Journey */}
    <section className="s3-section s5-development" data-section="05"><div ref={devTrack} className="s5-track">
      <article className="s5-intro"><p className="srx-section-tag">05 / Development</p><h2>Products that earn<br/><em>every interaction.</em></h2><p>Scroll through three connected build systems.</p></article>
      <article className="s5-dev-panel website"><PanelHeading number="01" title="Website Development" copy="Responsive experiences shaped around clarity and conversion."/><motion.div className="s5-device-stage" whileHover={reduced?undefined:{rotateY:-3,rotateX:2}}><div className="device desktop"><i/><b>Built for momentum.</b><span/></div><div className="device tablet"><i/><b>S</b><span/></div><div className="device mobile"><i/><b>↗</b><span/></div></motion.div></article>
      <article className="s5-dev-panel saas"><PanelHeading number="02" title="SaaS Development" copy="Scalable platforms people understand, adopt and trust."/><div className="s5-dashboard"><aside><b>S</b><i/><i/><i/></aside><div className="dash-main"><span/><div><i/><i/><i/></div><b/><b/></div></div></article>
      <article className="s5-dev-panel commerce"><PanelHeading number="03" title="Ecommerce Development" copy="A shorter path from discovery to confident repeat purchase."/><div className="s5-commerce-flow">{["Discover","Consider","Checkout","Return"].map((x,i)=><div key={x}><span>0{i+1}</span><i/><b>{x}</b></div>)}</div></article>
      <article className="s5-outro"><h2>Build the system<br/>behind the <em>growth.</em></h2><MagneticButton href="/services/development" className="srx-button srx-button-gold">Explore Development</MagneticButton></article>
    </div><div className="s5-progress"><i/></div></section>

    {/* 06 — AI Automation Workflow */}
    <section className="s3-section s6-ai" data-section="06"><WorkflowScene active={aiTab}/><div className="srx-shell s6-content"><div className="s6-head"><p className="srx-section-tag srx-light">06 / AI & Technology</p><ScrollReveal type="scale"><h2>Intelligence with<br/>a job to <em>do.</em></h2></ScrollReveal></div><div className="s6-tabs" role="tablist">{aiServices.map((s,i)=><button role="tab" aria-selected={aiTab===i} key={s.name} onClick={()=>setAiTab(i)}>{s.name}{s.badge&&<i>{s.badge}</i>}</button>)}</div><motion.div key={aiTab} className="s6-workflow" style={{x:layerOneX}} initial={{opacity:0,y:18,scale:.96,filter:"blur(7px)"}} animate={{opacity:1,y:0,scale:1,filter:"blur(0px)"}}><div className="s6-workflow-line"/>{currentAi.nodes.map((node,i)=><div key={node} className={`s6-node n${i}`}><span>0{i+1}</span><b>{node}</b><i/></div>)}</motion.div><div className="s6-ai-detail"><motion.p key={currentAi.copy} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{currentAi.copy}</motion.p><Link className="srx-line-link" href="/services/ai-technology">Explore AI & Technology <span>→</span></Link></div></div></section>

    {/* 07 — Business Impact Scroll Counters */}
    <section className="s3-section s7-impact" data-section="07"><div className="srx-shell s7-layout"><div className="s7-sticky"><p className="srx-section-tag">07 / Business impact</p><h2>Measure the movement<br/>that <em>matters.</em></h2><p>Every value remains a placeholder until a named source, date range, baseline and client approval are available.</p><motion.p className="s7-active-statement" key={activeMetric} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>{impactStatements[activeMetric]}</motion.p><strong>UNVERIFIED PLACEHOLDERS</strong></div><div className="s7-metrics">{[["%","qualified traffic growth"],["%","conversion improvement"],[" hours","saved through automation"],["x","campaign return"]].map((m,i)=><article key={m[1]}><i/><span>0{i+1}</span><strong><PlaceholderCounter suffix={m[0]}/></strong><p>{m[1]}</p><small>PROJECT-DATA PLACEHOLDER</small></article>)}</div></div></section>

    {/* 08 — Featured Case Study Showcase */}
    <section className={`s3-section s8-cases active-case-${activeCase}`} data-section="08"><div className="srx-shell s8-head"><p className="srx-section-tag">08 / Featured work</p><h2>Different constraints.<br/><em>Connected solutions.</em></h2></div><div className="srx-shell s8-gallery">{cases.map((item,i)=><motion.article key={item.id} className={`${item.className} ${activeCase===i?"active":""}`} onHoverStart={()=>setActiveCase(i)} onFocus={()=>setActiveCase(i)} onPointerMove={(event)=>{if(capabilities.touch)return;const box=event.currentTarget.getBoundingClientRect();const px=(event.clientX-box.left)/box.width;const py=(event.clientY-box.top)/box.height;event.currentTarget.style.setProperty("--spot-x",`${px*100}%`);event.currentTarget.style.setProperty("--spot-y",`${py*100}%`);event.currentTarget.style.setProperty("--rx",`${(py-.5)*-4}deg`);event.currentTarget.style.setProperty("--ry",`${(px-.5)*5}deg`);}} onPointerLeave={(event)=>{event.currentTarget.style.setProperty("--rx","0deg");event.currentTarget.style.setProperty("--ry","0deg");}} data-cursor="view" data-cursor-label="VIEW PROJECT" tabIndex={0}><motion.div className="s8-case-art" style={{x:i%2?layerOneX:layerTwoX,y:i%2?layerTwoY:layerOneY}}><i/><i/><i/><span>{item.id}</span><b>[XX]{i===1?"×":"%"}</b></motion.div><div className="s8-case-meta"><p>{item.type}</p><h3>{item.title}</h3><span>{item.tags}</span><Link href="/case-studies" aria-label={`View ${item.title}`}>View project <b>↗</b></Link></div></motion.article>)}</div></section>

    {/* 09 — Scroll-Driven Process Timeline */}
    <section ref={process} className="s3-section s9-process" data-section="09"><div className="s9-blueprint" aria-hidden="true"/><div className="srx-shell s9-layout"><div className="s9-sticky"><p className="srx-section-tag">09 / The process</p><h2>Clarity at every<br/><em>decision point.</em></h2><div className="s9-stage-visual"><motion.span key={activeProcess} initial={{y:45,opacity:0}} animate={{y:0,opacity:1}}>0{activeProcess+1}</motion.span><i className={`shape-${activeProcess}`}/></div></div><div className="s9-timeline"><div className="s9-timeline-line"><i className="s9-timeline-fill"/></div>{processSteps.map((step,i)=><article className={activeProcess===i?"active":activeProcess>i?"past":""} key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div></article>)}</div></div></section>

    {/* 10 — Interactive Serptrix Manifesto */}
    <section className={`s3-section s10-manifesto principle-${activePrinciple}`} data-section="10"><div className="s10-visual" aria-hidden="true"><i/><i/><b>0{activePrinciple+1}</b></div><div className="srx-shell"><p className="srx-section-tag srx-light">10 / Why Serptrix</p><h2>One system.<br/><em>No silos.</em></h2><motion.div className="s10-statements" style={{x:manifestoX}}>{principles.map((p,i)=><button aria-expanded={activePrinciple===i} className={activePrinciple===i?"active":""} key={p[0]} onClick={()=>setActivePrinciple(i)} onMouseEnter={()=>setActivePrinciple(i)}><span>0{i+1}</span><b>{p[0]}</b><i>+</i><motion.p initial={false} animate={{height:activePrinciple===i?"auto":0,opacity:activePrinciple===i?1:0}}>{p[1]}</motion.p></button>)}</motion.div></div></section>

    {/* 11 — Editorial Blog Experience */}
    <section className="s3-section s11-editorial" data-section="11"><Parallax type="horizontal" strength={65} className="s11-ghost">SERPTRIX SIGNAL</Parallax><div className="srx-shell s11-head"><p className="srx-section-tag">11 / Insights</p><h2>Thinking for leaders<br/>building what’s <em>next.</em></h2></div><div className="srx-shell s11-layout"><article className="s11-feature"><div className="s11-article-art"><i/><span>FEATURED / 01</span></div><div><p>{articles[0].cat} · {articles[0].time}</p><ScrollReveal type="lines" text={articles[0].title} as="h3"/><time>{articles[0].date}</time><Link href={`/blog/${articles[0].slug}`}>Read article <b>↗</b></Link></div></article><div className="s11-support">{articles.slice(1).map((a,i)=><ScrollReveal type="fade-up" delay={i*.1} key={a.title}><article><div className="s11-article-art"><i/><span>0{i+2}</span></div><div><p>{a.cat} · {a.time}</p><h3>{a.title}</h3><time>{a.date}</time><Link href={`/blog/${a.slug}`}>Read <b>↗</b></Link></div></article></ScrollReveal>)}</div></div></section>

    {/* 12 — Immersive Final CTA */}
    <section className="s3-section s12-final" data-section="12"><ParticleField/><motion.div style={{x:layerTwoX,y:layerOneY}}><Parallax type="scale" strength={32} className="s12-orbit"><i/><i/><i/></Parallax></motion.div><div className="srx-shell s12-inner"><p className="srx-section-tag srx-light">12 / Your next growth system</p><ScrollReveal type="scale"><h2>Your next stage of growth<br/>needs a <em>better system.</em></h2></ScrollReveal><div className="s12-row"><p>Tell us what you are building, improving, or scaling. We will help connect the right marketing, development, AI, and technology strategy.</p><ScrollReveal type="stagger" className="s12-actions"><MagneticButton href="/contact" className="srx-button srx-button-gold">Book a Strategy Call</MagneticButton><Link className="srx-line-link" href="/contact">Start a Project <span>→</span></Link></ScrollReveal></div></div><div className="s12-footer-peek">SERPTRIX</div></section>
  </main>;
}

function AnimateDivision({ division }: { division: typeof divisions[number] }) { return <motion.div className="s3-eco-copy" initial={{opacity:0,y:34,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-20}}><p>{division.label}</p><h2>{division.name}</h2><p>{division.copy}</p><ul>{division.items.map(x=><li key={x}>{x}<span>↗</span></li>)}</ul></motion.div>; }
function PanelHeading({number,title,copy}:{number:string;title:string;copy:string}) { return <div className="s5-panel-head"><span>{number}</span><p>DEVELOPMENT SYSTEM</p><h2>{title}</h2><small>{copy}</small></div>; }
