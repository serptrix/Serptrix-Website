"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { siteConfig } from "@/content/site-config";
import { ScrollReveal } from "../motion/scroll-reveal";
import { useMotionCapabilities } from "../motion/use-motion-capabilities";

type Props = {
  onStartProject: () => void;
  onBookCall: () => void;
};

export function ContactFinalCTA({ onStartProject, onBookCall }: Props) {
  const reduced = useReducedMotion();
  const { touch } = useMotionCapabilities();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 24 });
  const layerX = useTransform(smoothX, [-.5, .5], [-14, 14]);
  const layerY = useTransform(smoothY, [-.5, .5], [-8, 8]);

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
    <section className="contact-final-cta" aria-labelledby="contact-final-title">
      <motion.div className="contact-final-bg" style={{ x: layerX, y: layerY }} aria-hidden="true">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <path className="contact-path contact-path-glow" d="M0,200 C300,80 500,320 800,180 S1100,100 1200,220" />
        </svg>
        <i />
        <i />
      </motion.div>
      <div className="shell contact-final-inner">
        <ScrollReveal type="scale">
          <p className="section-index light">READY WHEN YOU ARE</p>
          <h2 id="contact-final-title">
            A better digital system starts with the <em>right conversation.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal type="fade-up" delay={0.1}>
          <p>
            Whether you are trying to grow visibility, improve conversions, build a digital product or automate
            operations, tell us where you are today and where you want to go.
          </p>
        </ScrollReveal>
        <ScrollReveal type="stagger" delay={0.18} className="contact-final-actions">
          <button type="button" className="btn btn-primary contact-final-btn" onClick={onStartProject}>
            Start Your Project <span>↓</span>
          </button>
          <button type="button" className="btn btn-outline contact-final-btn-quiet" onClick={onBookCall}>
            Book a Strategy Call <span>↗</span>
          </button>
        </ScrollReveal>
        <div className="contact-final-details">
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          {siteConfig.contact.phone ? (
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
