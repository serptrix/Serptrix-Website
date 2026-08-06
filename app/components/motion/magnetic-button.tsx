"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { motionTokens } from "./tokens";
import { useMotionCapabilities } from "./use-motion-capabilities";

export function MagneticButton({ href, children, className = "", cursorLabel }: { href: string; children: ReactNode; className?: string; cursorLabel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { reducedMotion, touch } = useMotionCapabilities();
  const x = useSpring(useMotionValue(0), motionTokens.spring.magnetic);
  const y = useSpring(useMotionValue(0), motionTokens.spring.magnetic);
  const innerX = useSpring(useMotionValue(0), { ...motionTokens.spring.magnetic, stiffness: 300 });
  const innerY = useSpring(useMotionValue(0), { ...motionTokens.spring.magnetic, stiffness: 300 });
  const reset = () => { x.set(0); y.set(0); innerX.set(0); innerY.set(0); };
  return <motion.div className="srx-magnetic-wrap" style={{ x, y }}>
    <Link ref={ref} href={href} className={`srx-magnetic ${className}`} data-cursor="interactive" data-cursor-label={cursorLabel} onPointerMove={(event) => {
      if (touch || reducedMotion) return;
      const box = ref.current?.getBoundingClientRect(); if (!box) return;
      const dx = event.clientX - box.left - box.width / 2; const dy = event.clientY - box.top - box.height / 2;
      x.set(dx * .14); y.set(dy * .14); innerX.set(dx * .08); innerY.set(dy * .08);
    }} onPointerLeave={reset} onBlur={reset}>
      <span className="srx-magnetic-sweep" aria-hidden="true" />
      <motion.span className="srx-magnetic-label" style={{ x: innerX, y: innerY }}>{children}</motion.span>
      <motion.span className="srx-magnetic-arrow" aria-hidden="true" whileHover={{ x: 4 }}>↗</motion.span>
    </Link>
  </motion.div>;
}
