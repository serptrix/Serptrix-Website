"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "../motion/scroll-reveal";
import { useMotionCapabilities } from "../motion/use-motion-capabilities";
import { Breadcrumbs } from "../breadcrumbs";

type Props = {
  onStartProject: () => void;
  onBookCall: () => void;
};

export function ContactHero({ onStartProject, onBookCall }: Props) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { touch } = useMotionCapabilities();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 65, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 65, damping: 22 });
  const layerOneX = useTransform(smoothX, [-.5, .5], [-10, 10]);
  const layerOneY = useTransform(smoothY, [-.5, .5], [-6, 6]);
  const layerTwoX = useTransform(smoothX, [-.5, .5], [-18, 18]);
  const layerTwoY = useTransform(smoothY, [-.5, .5], [-12, 12]);

  useEffect(() => {
    if (reduced || touch) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      mouseX.set(px / window.innerWidth - 0.5);
      mouseY.set(py / window.innerHeight - 0.5);
      frame = 0;
    };
    const pointer = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", pointer);
      cancelAnimationFrame(frame);
    };
  }, [mouseX, mouseY, reduced, touch]);

  return (
    <section ref={section} className="contact-page-hero" aria-labelledby="contact-hero-title">
      <motion.div className="contact-hero-bg contact-hero-bg-back" style={{ x: layerOneX, y: layerOneY }} aria-hidden="true">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <path className="contact-path contact-path-draw" d="M80,420 C180,320 260,480 380,360 S580,180 720,280" />
          <path className="contact-path contact-path-draw delay" d="M60,180 C200,120 320,240 460,160 S640,80 760,200" />
          <circle className="contact-node" cx="380" cy="360" r="6" />
          <circle className="contact-node delay" cx="460" cy="160" r="5" />
          <circle className="contact-node delay-2" cx="720" cy="280" r="4" />
        </svg>
      </motion.div>
      <motion.div className="contact-hero-bg contact-hero-bg-front" style={{ x: layerTwoX, y: layerTwoY }} aria-hidden="true">
        <i className="contact-hero-shape shape-a" />
        <i className="contact-hero-shape shape-b" />
      </motion.div>
      <div className="shell contact-hero-layout">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="contact-hero-copy">
          <ScrollReveal type="mask">
            <p className="eyebrow">
              <span /> Start a Conversation
            </p>
          </ScrollReveal>
          <h1 id="contact-hero-title">
            <ScrollReveal as="span" type="lines" text="Let's build what moves" immediate />
            <ScrollReveal as="span" type="lines" text="your business forward." delay={0.08} immediate />
          </h1>
          <ScrollReveal type="blur" delay={0.16}>
            <p>
              Serptrix helps businesses connect marketing, development, AI and digital strategy into systems
              designed for measurable growth. Tell us what you are working on and we&apos;ll help identify the
              right next step.
            </p>
          </ScrollReveal>
          <ScrollReveal type="stagger" delay={0.24} className="contact-hero-actions">
            <button type="button" className="btn btn-primary" onClick={onStartProject}>
              Start Your Project <span>↓</span>
            </button>
            <button type="button" className="btn btn-quiet" onClick={onBookCall}>
              Book a Strategy Call <span>↗</span>
            </button>
          </ScrollReveal>
        </div>
        <div className="contact-hero-visual" aria-hidden="true">
          <div className="contact-hero-orbit">
            <span className="contact-orbit-label l1">FORM</span>
            <span className="contact-orbit-label l2">CALL</span>
            <span className="contact-orbit-label l3">EMAIL</span>
            <i />
            <i />
            <b>S</b>
          </div>
        </div>
      </div>
    </section>
  );
}
