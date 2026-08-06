"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

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

function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 38, opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BrandObject({ scrollProgress }: { scrollProgress: { get: () => number } }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const { pointer, camera } = useThree();
  const particles = useMemo(() => {
    const positions = new Float32Array(260 * 3);
    for (let i = 0; i < 260; i++) {
      const radius = 2.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    const scroll = scrollProgress.get();
    group.current.rotation.y += delta * 0.13;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.24 + scroll * 0.5, 0.045);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.18, 0.045);
    core.current.rotation.x += delta * 0.18;
    core.current.rotation.y -= delta * 0.12;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.2 - scroll * 1.4, 0.035);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.35, 0.04);
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial color="#09105F" roughness={0.22} metalness={0.58} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.025, 12, 160]} />
        <meshBasicMaterial color="#FBBC03" />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.85]}>
        <torusGeometry args={[2.65, 0.012, 10, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FBBC03" size={0.035} sizeAttenuation transparent opacity={0.68} />
      </points>
      <pointLight color="#FBBC03" position={[2.5, 2, 3]} intensity={35} distance={9} />
    </group>
  );
}

function HeroScene({ scrollProgress }: { scrollProgress: { get: () => number } }) {
  const supported = useWebGLSupport();
  if (!supported) {
    return <div className="srx-webgl-fallback" aria-label="Serptrix connected growth ecosystem"><i /><i /><i /><b>S</b></div>;
  }
  return (
    <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0, 7.2], fov: 46 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} fallback={<div className="srx-webgl-fallback"><b>S</b></div>}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[-3, 4, 5]} intensity={3.2} color="#ffffff" />
      <Suspense fallback={null}><BrandObject scrollProgress={scrollProgress} /></Suspense>
    </Canvas>
  );
}

function MagneticLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 240, damping: 18 });
  const y = useSpring(0, { stiffness: 240, damping: 18 });
  return (
    <motion.div style={{ x, y }} className="srx-magnetic-wrap">
      <Link
        ref={ref}
        className={className}
        href={href}
        onPointerMove={(event) => {
          const box = ref.current?.getBoundingClientRect();
          if (!box) return;
          x.set((event.clientX - box.left - box.width / 2) * 0.16);
          y.set((event.clientY - box.top - box.height / 2) * 0.16);
        }}
        onPointerLeave={() => { x.set(0); y.set(0); }}
      >{children}</Link>
    </motion.div>
  );
}

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
            <Reveal><p className="srx-kicker"><i /> Independent digital growth studio <span>2026</span></p></Reveal>
            <h1 aria-label="We engineer digital momentum">
              <Reveal><span>We engineer</span></Reveal>
              <Reveal delay={0.08}><span>digital <em>momentum.</em></span></Reveal>
            </h1>
            <Reveal delay={0.18} className="srx-hero-bottom">
              <p>Serptrix connects marketing, product engineering and applied AI into one growth system—built to create demand, remove friction and scale what works.</p>
              <div className="srx-actions">
                <MagneticLink href="/contact" className="srx-button srx-button-gold">Start a project <span>↗</span></MagneticLink>
                <Link href="/case-studies" className="srx-line-link">See our work <span>→</span></Link>
              </div>
            </Reveal>
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
        <div className="srx-manifesto-word" data-parallax aria-hidden="true">CONNECTED</div>
        <div className="srx-shell srx-manifesto-layout">
          <Reveal><p className="srx-section-tag">01 / The proposition</p></Reveal>
          <Reveal delay={0.08}><h2>Three disciplines.<br />One commercial <em>agenda.</em></h2></Reveal>
          <Reveal delay={0.14}><p className="srx-manifesto-copy">Growth stalls between disconnected partners, platforms and priorities. We bring the system together—strategy through execution—with one senior team accountable for the outcome.</p></Reveal>
        </div>
        <div className="srx-ticker" aria-label="Serptrix capabilities"><div>{["STRATEGY", "SEARCH", "EXPERIENCE", "ENGINEERING", "AUTOMATION", "INTELLIGENCE", "STRATEGY", "SEARCH", "EXPERIENCE"].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>
      </section>

      <section className="srx-services-pin" aria-label="Service divisions">
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
            <MagneticLink href="/contact" className="srx-button srx-button-gold">Map the opportunity <span>↗</span></MagneticLink>
          </article>
        </div>
      </section>

      <section className="srx-ai">
        <div className="srx-ai-rings" data-parallax aria-hidden="true"><i /><i /><i /></div>
        <div className="srx-shell">
          <div className="srx-ai-head"><Reveal><p className="srx-section-tag srx-light">03 / Applied intelligence</p></Reveal><Reveal delay={0.08}><h2>AI that works<br />where work <em>happens.</em></h2></Reveal></div>
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
          <Reveal className="srx-process-head"><p className="srx-section-tag">05 / How we move</p><h2>Clarity, then<br /><em>momentum.</em></h2><p>We resolve risk in the right order, then keep the work moving in tight, visible cycles.</p></Reveal>
          <div className="srx-process-grid">{[
            ["01", "Diagnose", "Find the constraint beneath the symptoms."],
            ["02", "Design", "Shape the strategy, system and evidence plan."],
            ["03", "Build", "Create in focused cycles with senior direction."],
            ["04", "Compound", "Learn from evidence and improve what matters."],
          ].map((step, index) => <motion.article key={step[0]} whileHover={reduced ? undefined : { rotateX: -5, rotateY: index % 2 ? -4 : 4, y: -8 }} transition={{ type: "spring", stiffness: 150, damping: 18 }}><span>{step[0]}</span><div className="srx-process-glyph"><i /><i /></div><h3>{step[1]}</h3><p>{step[2]}</p></motion.article>)}</div>
        </div>
      </section>

      <section className="srx-final">
        <div className="srx-final-grid" data-parallax aria-hidden="true" />
        <div className="srx-shell srx-final-inner">
          <Reveal><p className="srx-section-tag srx-light">06 / Your next move</p></Reveal>
          <Reveal delay={0.08}><h2>Make digital your<br /><em>unfair advantage.</em></h2></Reveal>
          <Reveal delay={0.16} className="srx-final-row"><p>Bring us the growth problem worth solving. We’ll bring the connected thinking and technical depth to move it forward.</p><MagneticLink href="/contact" className="srx-button srx-button-gold">Book a strategy call <span>↗</span></MagneticLink></Reveal>
        </div>
        <div className="srx-final-marquee" aria-hidden="true"><span>SERPTRIX — GROWTH, ENGINEERED — SERPTRIX — GROWTH, ENGINEERED —</span></div>
      </section>
    </main>
  );
}
