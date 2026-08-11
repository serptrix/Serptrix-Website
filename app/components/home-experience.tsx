"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { articles as cmsArticles } from "@/content/site-data";
import { MagneticButton } from "./motion/magnetic-button";
import { Parallax } from "./motion/parallax";
import { ScrollReveal } from "./motion/scroll-reveal";
import { useMotionCapabilities } from "./motion/use-motion-capabilities";
import { ServiceSections } from "./service-sections";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./motion/hero-scene"), { ssr: false, loading: () => <div className="srx-canvas-loading" aria-hidden="true" /> });
const WorkflowScene = dynamic(() => import("./motion/workflow-scene"), { ssr: false, loading: () => <div className="srx-ai3d-fallback" aria-hidden="true" /> });
const ParticleField = dynamic(() => import("./motion/particle-field"), { ssr: false });

const aiServices = [
  { name: "AI Development", badge: "New", copy: "Build practical AI tools, assistants and internal systems around business workflows and customer needs.", nodes: ["Business Input", "Data + Context", "AI Processing", "Automated Action", "Business Result"] },
  { name: "AI Automation", copy: "Automate repetitive tasks, connect platforms and reduce manual operational work.", nodes: ["Business Input", "Connected Data", "Workflow Logic", "Automated Action", "Business Result"] },
  { name: "Digital Strategy", copy: "Create a clear roadmap connecting marketing, technology, data, customer experience and business goals.", nodes: ["Business Context", "Evidence", "Strategic Model", "Roadmap", "Measured Result"] },
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

const articleCategoryLabel: Record<string, string> = {
  "Digital Strategy": "Strategy",
  AI: "AI & Operations",
  "Conversion Optimization": "Conversion",
};

const articles = cmsArticles.map((article) => ({
  cat: articleCategoryLabel[article.category] ?? article.category,
  title: article.title,
  time: article.readingTime,
  date: new Date(`${article.date}T00:00:00`).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  slug: article.slug,
}));

export default function HomeExperience() {
  const root = useRef<HTMLElement>(null); const hero = useRef<HTMLElement>(null); const process = useRef<HTMLElement>(null);
  const reduced = useReducedMotion(); const capabilities = useMotionCapabilities(); const [aiTab, setAiTab] = useState(0); const [activeCase, setActiveCase] = useState(0); const [activePrinciple, setActivePrinciple] = useState(0); const [activeProcess, setActiveProcess] = useState(0); const [activeMetric, setActiveMetric] = useState(0);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0); const smoothX = useSpring(mouseX, { stiffness: 65, damping: 22 }); const smoothY = useSpring(mouseY, { stiffness: 65, damping: 22 });
  const layerOneX = useTransform(smoothX, [-.5,.5], [-14,14]); const layerOneY = useTransform(smoothY, [-.5,.5], [-9,9]); const layerTwoX = useTransform(smoothX, [-.5,.5], [-30,30]); const layerTwoY = useTransform(smoothY, [-.5,.5], [-20,20]); const layerThreeX = useTransform(smoothX, [-.5,.5], [-48,48]); const manifestoX = useTransform(smoothX, [-.5,.5], [-9,9]);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] }); const heroY = useTransform(scrollYProgress, [0,1], [0,170]); const heroScale = useTransform(scrollYProgress, [0,1], [1,.92]); const heroOpacity = useTransform(scrollYProgress, [0,.82], [1,0]);

  useEffect(() => { if (reduced || capabilities.touch) return; let frame = 0; let px = 0; let py = 0; const update = () => { mouseX.set(px / window.innerWidth - .5); mouseY.set(py / window.innerHeight - .5); frame = 0; }; const pointer = (event: PointerEvent) => { px = event.clientX; py = event.clientY; if (!frame) frame = requestAnimationFrame(update); }; window.addEventListener("pointermove", pointer, { passive: true }); return () => { window.removeEventListener("pointermove", pointer); cancelAnimationFrame(frame); }; }, [capabilities.touch, mouseX, mouseY, reduced]);

  useEffect(() => { if (!root.current || reduced || capabilities.mobile || capabilities.lowPower) return; const ctx = gsap.context(() => { const mm = gsap.matchMedia();
    gsap.fromTo(".s6-node", { scale: .94, y: 16 }, { scale: 1, y: 0, stagger: .12, immediateRender: false, scrollTrigger: { trigger: ".s6-workflow", start: "top 85%", end: "bottom 45%", scrub: .7 } });
    gsap.fromTo(".s7-impact", { backgroundColor: "#ffffff" }, { backgroundColor: "#fff7d8", scrollTrigger: { trigger: ".s7-impact", start: "top 75%", end: "bottom 30%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".s7-metrics article").forEach((metric,i) => { ScrollTrigger.create({ trigger: metric, start: "top 55%", end: "bottom 45%", onEnter: () => setActiveMetric(i), onEnterBack: () => setActiveMetric(i) }); const label=metric.querySelector("p"); if(label) gsap.fromTo(label,{y:i%2?-15:15},{y:i%2?15:-15,ease:"none",scrollTrigger:{trigger:metric,start:"top bottom",end:"bottom top",scrub:true}}); });
    ScrollTrigger.create({ trigger: process.current, start: "top 25%", end: "bottom 70%", onUpdate: (self) => setActiveProcess(Math.min(5, Math.floor(self.progress * 6))) });
    gsap.fromTo(".s9-timeline-fill", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: process.current, start: "top 35%", end: "bottom 65%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".s11-article-art i").forEach((image) => gsap.fromTo(image, { yPercent: -8 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
    gsap.utils.toArray<HTMLElement>(".s11-article-art").forEach((art) => gsap.fromTo(art,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1,ease:"power3.out",scrollTrigger:{trigger:art,start:"top 85%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".s3-section").slice(1).forEach((section) => gsap.to(section,{"--section-progress":1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 92%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".s2-statement,.s4-layout,.s6-head,.s8-head,.s10-statements,.s11-head,.s12-inner").forEach((layer) => gsap.fromTo(layer,{y:28,scale:.99},{y:0,scale:1,duration:.75,ease:"power3.out",scrollTrigger:{trigger:layer,start:"top 88%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".s3-home h2 em").forEach((accent) => gsap.to(accent,{"--highlight":1,duration:.7,ease:"power2.out",scrollTrigger:{trigger:accent,start:"top 86%",once:true}}));
    const refresh = () => ScrollTrigger.refresh(); const observer = new ResizeObserver(refresh); observer.observe(root.current!); document.fonts.ready.then(refresh); window.addEventListener("load", refresh, { once: true });
    return () => { mm.revert(); observer.disconnect(); window.removeEventListener("load", refresh); };
  }, root); return () => ctx.revert(); }, [capabilities.lowPower, capabilities.mobile, reduced]);

  const currentAi = aiServices[aiTab];
  return <main ref={root} className="srx-home s3-home">
    {/* 01 — Immersive WebGL Hero */}
    <section ref={hero} className="s3-section s1-hero" data-section="01">
      <motion.div className="s1-grid s1-depth-back" style={{ x: layerOneX, y: layerOneY }} aria-hidden="true"/><motion.div className="s1-glow s1-depth-mid" style={{ x: layerTwoX, y: layerTwoY }} aria-hidden="true"/><motion.div className="s1-cross s1-depth-front" style={{ x: layerThreeX }} aria-hidden="true"/>
      <div className="srx-shell s1-layout">
        <motion.div className="s1-copy" style={{ y: reduced ? 0 : heroY, scale: reduced ? 1 : heroScale, opacity: reduced ? 1 : heroOpacity }}>
          <ScrollReveal type="mask"><p className="srx-kicker"><i/> Strategy. Technology. Measurable Growth.</p></ScrollReveal>
          <h1><ScrollReveal as="span" type="mask" immediate>We build the systems</ScrollReveal><ScrollReveal as="span" type="mask" delay={.1} immediate>behind <motion.em initial={{color:"#ffffff"}} animate={{color:"#FBBC03"}} transition={{delay:.72,duration:.6}}>modern business growth.</motion.em></ScrollReveal></h1>
          <ScrollReveal type="fade-up" delay={.2}><p className="s1-lede">Serptrix combines digital marketing, scalable development, AI, automation and strategy to help ambitious businesses attract more customers, improve operations and grow with confidence.</p></ScrollReveal>
          <ScrollReveal type="stagger" delay={.28} className="s1-actions"><MagneticButton href="/contact" className="srx-button srx-button-gold">Book a Strategy Call</MagneticButton><Link className="srx-line-link" href="/case-studies">Explore Our Work <span>→</span></Link></ScrollReveal>
        </motion.div>
        <motion.div className="s1-scene" style={{ opacity: heroOpacity }}><HeroScene scrollProgress={scrollYProgress}/><span className="s1-system-label l1">MARKETING</span><span className="s1-system-label l2">DEVELOPMENT</span><span className="s1-system-label l3">AI + TECH</span></motion.div>
      </div><div className="s1-division-rail"><span>Built for ambitious ecommerce, SaaS and service businesses.</span><Link href="/services/digital-marketing"><b>01</b> Digital Marketing</Link><Link href="/services/development"><b>02</b> Development</Link><Link href="/services/ai-technology"><b>03</b> AI &amp; Technology</Link></div><div className="srx-scroll-mark"><span>Scroll to explore</span><i/></div>
    </section>

    {/* 02 — Cinematic Trust Marquee */}
    <section className="s3-section s2-trust" data-section="02">
      <Parallax type="horizontal" strength={90} className="s2-ghost">AMBITION NEEDS A SYSTEM</Parallax>
      <motion.div className="s2-marquee is-top" data-cursor="drag" data-cursor-label="DRAG" drag={reduced?false:"x"} dragConstraints={{left:-420,right:0}} dragElastic={.08}><div>{["ECOMMERCE","SAAS","B2B","TECHNOLOGY","PROFESSIONAL SERVICES","ECOMMERCE","SAAS","B2B"].map((x,i)=><span className={i%3===0?"is-outline":""} key={`${x}-${i}`}>{x}<i>✦</i></span>)}</div></motion.div>
      <div className="srx-shell s2-statement"><p className="srx-section-tag">02 / Built for ambitious businesses</p><ScrollReveal type="words" text="For leaders turning digital complexity into a clear commercial advantage." as="h2" stagger={.045}/></div>
      <motion.div className="s2-marquee is-bottom" data-cursor="drag" data-cursor-label="DRAG" drag={reduced?false:"x"} dragConstraints={{left:-420,right:0}} dragElastic={.08}><div>{["STRATEGY","SEARCH","EXPERIENCE","ENGINEERING","AUTOMATION","INTELLIGENCE","STRATEGY","SEARCH"].map((x,i)=><span className={i%2===0?"is-large":""} key={`${x}-${i}`}>{x}<i>◆</i></span>)}</div></motion.div>
    </section>

    {/* 03–05 — Reliable natural-flow service experiences */}
    <ServiceSections/>

    {/* 06 — AI Automation Workflow */}
    <section className="s3-section s6-ai" data-section="06"><WorkflowScene active={aiTab}/><div className="srx-shell s6-content"><div className="s6-head"><p className="srx-section-tag srx-light">06 / AI &amp; Technology</p><div><ScrollReveal type="scale"><h2>Practical AI and automation built around <em>real workflows.</em></h2></ScrollReveal><p>Serptrix helps businesses apply AI, automation and digital strategy where they create practical value—reducing repetitive work, improving decisions and connecting disconnected systems.</p></div></div><div className="s6-tabs" role="tablist" aria-label="AI and technology services">{aiServices.map((s,i)=><button id={`ai-tab-${i}`} role="tab" aria-selected={aiTab===i} aria-controls="ai-workflow-panel" tabIndex={aiTab===i?0:-1} key={s.name} onClick={()=>setAiTab(i)} onKeyDown={(event)=>{if(event.key!=="ArrowRight"&&event.key!=="ArrowLeft")return;event.preventDefault();const next=(i+(event.key==="ArrowRight"?1:2))%3;setAiTab(next);document.getElementById(`ai-tab-${next}`)?.focus();}}>{s.name}{s.badge&&<i>{s.badge}</i>}</button>)}</div><motion.div id="ai-workflow-panel" role="tabpanel" aria-labelledby={`ai-tab-${aiTab}`} key={aiTab} className="s6-workflow" style={{x:layerOneX}} initial={{y:18,scale:.97}} animate={{y:0,scale:1}}><div className="s6-workflow-line"/>{currentAi.nodes.map((node,i)=><div key={node} className={`s6-node n${i}`}><span>0{i+1}</span><b>{node}</b><i/></div>)}</motion.div><div className="s6-ai-detail"><motion.p key={currentAi.copy} initial={{y:8}} animate={{y:0}}>{currentAi.copy}</motion.p><Link className="srx-line-link" href="/services/ai-technology">Discover AI &amp; Technology <span>→</span></Link></div></div></section>

    {/* 07 — Business Impact Scroll Counters */}
    <section className="s3-section s7-impact" data-section="07"><div className="srx-shell s7-layout"><div className="s7-sticky"><p className="srx-section-tag">07 / Business impact</p><h2>Measure the movement<br/>that <em>matters.</em></h2><p>We define success around commercial outcomes, then establish verified baselines and measurement plans for each engagement.</p><motion.p className="s7-active-statement" key={activeMetric} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>{impactStatements[activeMetric]}</motion.p><strong>OUTCOME FRAMEWORK</strong></div><div className="s7-metrics">{[["Visibility","qualified demand"],["Conversion","buyer momentum"],["Efficiency","operating capacity"],["Return","acquisition economics"]].map((m,i)=><article key={m[0]}><i/><span>0{i+1}</span><strong>{m[0]}</strong><p>{m[1]}</p><small>MEASURED AGAINST AN AGREED BASELINE</small></article>)}</div></div></section>

    {/* 08 — Featured Case Study Showcase */}
    <section className={`s3-section s8-cases active-case-${activeCase}`} data-section="08"><div className="srx-shell s8-head"><p className="srx-section-tag">08 / Featured work</p><h2>Different constraints.<br/><em>Connected solutions.</em></h2></div><div className="srx-shell s8-gallery">{cases.map((item,i)=><motion.article key={item.id} className={`${item.className} ${activeCase===i?"active":""}`} onHoverStart={()=>setActiveCase(i)} onFocus={()=>setActiveCase(i)} onPointerMove={(event)=>{if(capabilities.touch)return;const box=event.currentTarget.getBoundingClientRect();const px=(event.clientX-box.left)/box.width;const py=(event.clientY-box.top)/box.height;event.currentTarget.style.setProperty("--spot-x",`${px*100}%`);event.currentTarget.style.setProperty("--spot-y",`${py*100}%`);event.currentTarget.style.setProperty("--rx",`${(py-.5)*-4}deg`);event.currentTarget.style.setProperty("--ry",`${(px-.5)*5}deg`);}} onPointerLeave={(event)=>{event.currentTarget.style.setProperty("--rx","0deg");event.currentTarget.style.setProperty("--ry","0deg");}} data-cursor="view" data-cursor-label="VIEW PROJECT" tabIndex={0}><motion.div className="s8-case-art" style={{x:i%2?layerOneX:layerTwoX,y:i%2?layerTwoY:layerOneY}}><i/><i/><i/><span>{item.id}</span><b>[XX]{i===1?"×":"%"}</b></motion.div><div className="s8-case-meta"><p>{item.type}</p><h3>{item.title}</h3><span>{item.tags}</span><Link href="/case-studies" aria-label={`View ${item.title}`}>View project <b>↗</b></Link></div></motion.article>)}</div></section>

    {/* 09 — Scroll-Driven Process Timeline */}
    <section ref={process} className="s3-section s9-process" data-section="09"><div className="s9-blueprint" aria-hidden="true"/><div className="srx-shell s9-layout"><div className="s9-sticky"><p className="srx-section-tag">09 / The process</p><h2>Clarity at every<br/><em>decision point.</em></h2><div className="s9-stage-visual"><motion.span key={activeProcess} initial={{y:45,opacity:0}} animate={{y:0,opacity:1}}>0{activeProcess+1}</motion.span><i className={`shape-${activeProcess}`}/></div></div><div className="s9-timeline"><div className="s9-timeline-line"><i className="s9-timeline-fill"/></div>{processSteps.map((step,i)=><article className={activeProcess===i?"active":activeProcess>i?"past":""} key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div></article>)}</div></div></section>

    {/* 10 — Interactive Serptrix Manifesto */}
    <section className={`s3-section s10-manifesto principle-${activePrinciple}`} data-section="10"><div className="s10-visual" aria-hidden="true"><i/><i/><b>0{activePrinciple+1}</b></div><div className="srx-shell"><p className="srx-section-tag srx-light">10 / Why Serptrix</p><h2>One system.<br/><em>No silos.</em></h2><motion.div className="s10-statements" style={{x:manifestoX}}>{principles.map((p,i)=><button aria-expanded={activePrinciple===i} className={activePrinciple===i?"active":""} key={p[0]} onClick={()=>setActivePrinciple(i)} onMouseEnter={()=>setActivePrinciple(i)}><span>0{i+1}</span><b>{p[0]}</b><i>+</i><motion.p initial={false} animate={{height:activePrinciple===i?"auto":0,opacity:activePrinciple===i?1:0}}>{p[1]}</motion.p></button>)}</motion.div></div></section>

    {/* 11 — Editorial Blog Experience */}
    <section className="s3-section s11-editorial" data-section="11"><Parallax type="horizontal" strength={65} className="s11-ghost">SERPTRIX SIGNAL</Parallax><div className="srx-shell s11-head"><p className="srx-section-tag">11 / Insights</p><h2>Thinking for leaders<br/>building what’s <em>next.</em></h2></div><div className="srx-shell s11-layout"><article className="s11-feature"><div className="s11-article-art"><i/><span>FEATURED / 01</span></div><div><p>{articles[0].cat} · {articles[0].time}</p><ScrollReveal type="lines" text={articles[0].title} as="h3"/><time>{articles[0].date}</time><Link href={`/blog/${articles[0].slug}`}>Read article <b>↗</b></Link></div></article><div className="s11-support">{articles.slice(1).map((a,i)=><ScrollReveal type="fade-up" delay={i*.1} key={a.title}><article><div className="s11-article-art"><i/><span>0{i+2}</span></div><div><p>{a.cat} · {a.time}</p><h3>{a.title}</h3><time>{a.date}</time><Link href={`/blog/${a.slug}`}>Read <b>↗</b></Link></div></article></ScrollReveal>)}</div></div></section>

    {/* 12 — Verified client review policy */}
    <section className="s3-section s12-reviews" data-section="12" aria-labelledby="reviews-title"><div className="srx-shell s12-reviews-head"><p className="srx-section-tag">12 / Client reviews</p><h2 id="reviews-title">Trusted words should be <em>earned.</em></h2><p>Verified client feedback will appear here only after the client approves both the quote and attribution. Serptrix does not publish invented, anonymous, or AI-written testimonials.</p></div><div className="srx-shell s12-review-grid"><article><span>01</span><h3>Verified source</h3><p>Every published review must come directly from a real client or an independently verifiable review platform.</p></article><article><span>02</span><h3>Approved attribution</h3><p>Names, roles, companies and project context are shown only with explicit client approval.</p></article><article><span>03</span><h3>Unedited context</h3><p>Feedback is presented faithfully and never rewritten to create claims the client did not make.</p></article></div><div className="srx-shell s12-review-actions"><Link className="srx-line-link" href="/case-studies">View client work <span>→</span></Link><a className="srx-line-link" href="mailto:hello@serptrix.com?subject=Serptrix%20client%20review">Submit a verified review <span>↗</span></a></div></section>

    {/* 13 — Immersive Final CTA */}
    <section className="s3-section s12-final" data-section="13"><ParticleField/><motion.div style={{x:layerTwoX,y:layerOneY}}><Parallax type="scale" strength={32} className="s12-orbit"><i/><i/><i/></Parallax></motion.div><div className="srx-shell s12-inner"><p className="srx-section-tag srx-light">13 / Your next growth system</p><ScrollReveal type="scale"><h2>Your next stage of growth<br/>needs a <em>better system.</em></h2></ScrollReveal><div className="s12-row"><p>Tell us what you are building, improving, or scaling. We will help connect the right marketing, development, AI, and technology strategy.</p><ScrollReveal type="stagger" className="s12-actions"><MagneticButton href="/contact" className="srx-button srx-button-gold">Book a Strategy Call</MagneticButton><Link className="srx-line-link" href="/contact">Start a Project <span>→</span></Link></ScrollReveal></div></div><div className="s12-footer-peek">SERPTRIX</div></section>
  </main>;
}
