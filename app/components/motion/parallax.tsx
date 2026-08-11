"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { createScopedGSAP, gsap } from "./gsap-runtime";
import { motionTokens } from "./tokens";
import { useMotionCapabilities } from "./use-motion-capabilities";

export type ParallaxType = "vertical" | "horizontal" | "layered" | "reverse" | "scale" | "rotation" | "opacity" | "blur";

export function Parallax({
  children,
  type = "vertical",
  strength = motionTokens.parallax.base,
  layer = 1,
  advanced = false,
  className = "",
}: {
  children: ReactNode;
  type?: ParallaxType;
  strength?: number;
  layer?: number;
  advanced?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, mobile, lowPower } = useMotionCapabilities();
  const lite = mobile || lowPower;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const amount = strength * (type === "layered" ? layer : 1) * (type === "reverse" ? -1 : 1) * (lite ? 0.35 : 1);
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const x = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.03]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [0.35, 1, 1, 0.4]);

  useEffect(() => {
    if (!advanced || reducedMotion || lite || !ref.current) return;
    return createScopedGSAP(ref, () => {
      gsap.fromTo(
        ref.current,
        { y: -amount },
        {
          y: amount,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.7 },
        },
      );
    });
  }, [advanced, amount, lite, reducedMotion]);

  if (reducedMotion || (lite && type !== "opacity")) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const style: CSSProperties | Record<string, unknown> =
    advanced
      ? {}
      : type === "horizontal"
        ? { x }
        : type === "scale"
          ? { scale }
          : type === "rotation"
            ? { rotate }
            : type === "opacity"
              ? { opacity }
              : type === "blur"
                ? { opacity }
                : { y };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}
