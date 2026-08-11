"use client";

import { Children, ReactNode } from "react";
import { motion, Variant, Variants } from "framer-motion";
import { motionTokens } from "./tokens";
import { useMotionCapabilities } from "./use-motion-capabilities";

export type RevealType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur"
  | "mask"
  | "stagger"
  | "characters"
  | "words"
  | "lines";

type Props = {
  children?: ReactNode;
  text?: string;
  type?: RevealType;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
  stagger?: number;
  immediate?: boolean;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
};

const motionTags = { div: motion.div, span: motion.span, p: motion.p, h1: motion.h1, h2: motion.h2, h3: motion.h3 };

export function ScrollReveal({
  children,
  text,
  type = "fade-up",
  className = "",
  delay = 0,
  duration = motionTokens.duration.reveal,
  distance = motionTokens.distance.base,
  amount = 0.24,
  once = true,
  stagger = motionTokens.stagger.base,
  immediate = false,
  as = "div",
}: Props) {
  const { ready, reducedMotion, mobile, lowPower } = useMotionCapabilities();
  const MotionTag = motionTags[as];
  const lite = mobile || lowPower;
  const resolvedType: RevealType = lite && (type === "blur" || type === "characters" || type === "words") ? "fade-up" : type;
  const resolvedDistance = lite ? Math.min(distance, 22) : distance;
  const resolvedDuration = lite ? Math.min(duration, 0.48) : duration;

  if (ready && reducedMotion) {
    return <MotionTag className={className}>{text ?? children}</MotionTag>;
  }

  const hidden: Record<RevealType, Variant> = {
    "fade-up": { opacity: 0, y: resolvedDistance },
    "fade-down": { opacity: 0, y: -resolvedDistance },
    "fade-left": { opacity: 0, x: resolvedDistance },
    "fade-right": { opacity: 0, x: -resolvedDistance },
    scale: { opacity: 0, scale: motionTokens.scale.reveal },
    blur: lite
      ? { opacity: 0, y: resolvedDistance }
      : { opacity: 0, filter: `blur(${motionTokens.blur.base}px)` },
    mask: { clipPath: "inset(0 0 100% 0)", y: resolvedDistance * 0.35 },
    stagger: { opacity: 1 },
    characters: { opacity: 1 },
    words: { opacity: 1 },
    lines: { opacity: 1 },
  };

  const isText = resolvedType === "characters" || resolvedType === "words" || resolvedType === "lines";
  const units = isText
    ? resolvedType === "characters"
      ? Array.from(text ?? "")
      : resolvedType === "words"
        ? (text ?? "").split(/(\s+)/)
        : (text ?? "").split("\n")
    : Children.toArray(children);

  const container: Variants = {
    hidden: hidden[resolvedType],
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: resolvedDuration,
        delay,
        ease: motionTokens.ease.premium,
        staggerChildren: lite ? motionTokens.stagger.tight : stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden:
      resolvedType === "characters"
        ? { y: "105%", opacity: 0 }
        : resolvedType === "lines"
          ? { y: resolvedDistance, opacity: 0, clipPath: "inset(0 0 100% 0)" }
          : {
              y: resolvedDistance * 0.5,
              opacity: 0,
              filter: !lite && resolvedType === "words" ? `blur(${motionTokens.blur.subtle}px)` : "none",
            },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: resolvedDuration, ease: motionTokens.ease.premium },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      animate={immediate ? "visible" : undefined}
      whileInView={immediate ? undefined : "visible"}
      viewport={{ once, amount: lite ? 0.12 : amount }}
      aria-label={isText ? text : undefined}
    >
      {isText || resolvedType === "stagger"
        ? units.map((unit, index) => (
            <motion.span className={`srx-reveal-unit is-${resolvedType}`} variants={item} aria-hidden={isText || undefined} key={index}>
              {unit}
            </motion.span>
          ))
        : children}
    </MotionTag>
  );
}
