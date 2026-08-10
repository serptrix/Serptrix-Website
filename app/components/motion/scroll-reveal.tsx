"use client";

import { Children, ReactNode } from "react";
import { motion, Variant, Variants } from "framer-motion";
import { motionTokens } from "./tokens";
import { useMotionCapabilities } from "./use-motion-capabilities";

export type RevealType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur" | "mask" | "stagger" | "characters" | "words" | "lines";
type Props = { children?: ReactNode; text?: string; type?: RevealType; className?: string; delay?: number; duration?: number; distance?: number; amount?: number; once?: boolean; stagger?: number; immediate?: boolean; as?: "div" | "span" | "p" | "h1" | "h2" | "h3" };
const motionTags = { div: motion.div, span: motion.span, p: motion.p, h1: motion.h1, h2: motion.h2, h3: motion.h3 };

export function ScrollReveal({ children, text, type = "fade-up", className = "", delay = 0, duration = motionTokens.duration.reveal, distance = motionTokens.distance.base, amount = .24, once = true, stagger = motionTokens.stagger.base, immediate = false, as = "div" }: Props) {
  const { ready, reducedMotion } = useMotionCapabilities();
  const MotionTag = motionTags[as];
  if (ready && reducedMotion) return <MotionTag className={className}>{text ?? children}</MotionTag>;

  const hidden: Record<RevealType, Variant> = {
    "fade-up": { opacity: 0, y: distance }, "fade-down": { opacity: 0, y: -distance }, "fade-left": { opacity: 0, x: distance }, "fade-right": { opacity: 0, x: -distance },
    scale: { opacity: 0, scale: motionTokens.scale.reveal }, blur: { opacity: 0, filter: `blur(${motionTokens.blur.base}px)` }, mask: { clipPath: "inset(0 0 100% 0)", y: distance * .35 },
    stagger: { opacity: 1 }, characters: { opacity: 1 }, words: { opacity: 1 }, lines: { opacity: 1 },
  };
  const isText = type === "characters" || type === "words" || type === "lines";
  const units = isText ? (type === "characters" ? Array.from(text ?? "") : type === "words" ? (text ?? "").split(/(\s+)/) : (text ?? "").split("\n")) : Children.toArray(children);
  const container: Variants = { hidden: hidden[type], visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)", transition: { duration, delay, ease: motionTokens.ease.premium, staggerChildren: stagger, delayChildren: delay } } };
  const item: Variants = { hidden: type === "characters" ? { y: "105%", opacity: 0 } : type === "lines" ? { y: distance, opacity: 0, clipPath: "inset(0 0 100% 0)" } : { y: distance * .5, opacity: 0, filter: type === "words" ? `blur(${motionTokens.blur.subtle}px)` : "none" }, visible: { y: 0, opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)", transition: { duration, ease: motionTokens.ease.premium } } };

  return <MotionTag className={className} variants={container} initial="hidden" animate={immediate ? "visible" : undefined} whileInView={immediate ? undefined : "visible"} viewport={{ once, amount }} aria-label={isText ? text : undefined}>
    {(isText || type === "stagger") ? units.map((unit, index) => <motion.span className={`srx-reveal-unit is-${type}`} variants={item} aria-hidden={isText || undefined} key={index}>{unit}</motion.span>) : children}
  </MotionTag>;
}
