"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motionTokens } from "./tokens";
import { useReducedMotionPreference } from "./use-reduced-motion";

const routeTitles: Record<string, string> = { "/": "SERPTRIX", "/services": "CAPABILITIES", "/case-studies": "WORK", "/about": "ABOUT", "/blog": "INSIGHTS", "/contact": "START A PROJECT" };

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotionPreference();
  const title = routeTitles[pathname] ?? pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ").toUpperCase() ?? "SERPTRIX";
  if (reducedMotion) return <div key={pathname}>{children}</div>;

  return <AnimatePresence mode="wait" initial>
    <motion.div key={pathname} className="srx-page-stage" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: .92 }} transition={{ duration: motionTokens.duration.fast }}>
      <motion.div className="srx-page-overlay" initial={{ y: "0%" }} animate={{ y: "-101%" }} exit={{ y: "0%" }} transition={{ duration: .62, ease: motionTokens.ease.accelerate }} aria-hidden="true">
        <div className="srx-page-title-mask"><motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} exit={{ y: "-110%" }} transition={{ duration: .38, ease: motionTokens.ease.premium }}>{title}</motion.span></div>
        <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .4, delay: .08, ease: motionTokens.ease.smooth }} />
      </motion.div>
      <motion.div initial={{ clipPath: "inset(0 0 8% 0)", y: 14 }} animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }} exit={{ clipPath: "inset(0 0 8% 0)", y: -10 }} transition={{ duration: .5, ease: motionTokens.ease.premium }}>{children}</motion.div>
    </motion.div>
  </AnimatePresence>;
}
