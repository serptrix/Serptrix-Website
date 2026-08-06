"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { createScopedGSAP, gsap } from "./gsap-runtime";
import { motionTokens } from "./tokens";
import { useMotionCapabilities } from "./use-motion-capabilities";

export type ParallaxType = "vertical" | "horizontal" | "layered" | "reverse" | "scale" | "rotation" | "opacity" | "blur";

export function Parallax({ children, type = "vertical", strength = motionTokens.parallax.base, layer = 1, advanced = false, className = "" }: { children: ReactNode; type?: ParallaxType; strength?: number; layer?: number; advanced?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, mobile } = useMotionCapabilities();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const amount = strength * (type === "layered" ? layer : 1) * (type === "reverse" ? -1 : 1);
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const x = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const scale = useTransform(scrollYProgress, [0, .5, 1], [motionTokens.scale.depth[0], 1, motionTokens.scale.depth[1]]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const opacity = useTransform(scrollYProgress, [0, .35, .8, 1], [.15, 1, 1, .2]);
  const blur = useTransform(scrollYProgress, [0, .5, 1], [`blur(${motionTokens.blur.base}px)`, "blur(0px)", `blur(${motionTokens.blur.subtle}px)`]);

  useEffect(() => {
    if (!advanced || reducedMotion || mobile || !ref.current) return;
    return createScopedGSAP(ref, () => { gsap.fromTo(ref.current, { y: -amount }, { y: amount, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: .7 } }); });
  }, [advanced, amount, mobile, reducedMotion]);

  const style: CSSProperties | Record<string, unknown> = reducedMotion || advanced ? {} : type === "horizontal" ? { x } : type === "scale" ? { scale } : type === "rotation" ? { rotate } : type === "opacity" ? { opacity } : type === "blur" ? { filter: blur } : { y };
  return <motion.div ref={ref} className={className} style={style}>{children}</motion.div>;
}
