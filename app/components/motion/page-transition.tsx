"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motionTokens } from "./tokens";
import { useMotionCapabilities } from "./use-motion-capabilities";

const routeTitles: Record<string, string> = {
  "/": "SERPTRIX",
  "/services": "CAPABILITIES",
  "/case-studies": "WORK",
  "/about": "ABOUT",
  "/blog": "INSIGHTS",
  "/contact": "START A PROJECT",
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { ready, reducedMotion, mobile, lowPower } = useMotionCapabilities();
  const title =
    routeTitles[pathname] ??
    pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ").toUpperCase() ??
    "SERPTRIX";

  if ((ready && reducedMotion) || mobile || lowPower) {
    return (
      <div key={pathname} className="srx-page-stage">
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="srx-page-stage"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.96 }}
        transition={{ duration: motionTokens.duration.instant }}
      >
        <motion.div
          className="srx-page-overlay"
          initial={{ y: "0%" }}
          animate={{ y: "-101%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 0.5, ease: motionTokens.ease.accelerate }}
          aria-hidden="true"
        >
          <div className="srx-page-title-mask">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-110%" }}
              transition={{ duration: 0.32, ease: motionTokens.ease.premium }}
            >
              {title}
            </motion.span>
          </div>
          <motion.i
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.34, delay: 0.06, ease: motionTokens.ease.smooth }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.72, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.85, y: -6 }}
          transition={{ duration: 0.42, ease: motionTokens.ease.premium }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
