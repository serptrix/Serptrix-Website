"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionCapabilities } from "./use-motion-capabilities";

export function CustomCursor() {
  const { ready, reducedMotion, touch, mobile, lowPower } = useMotionCapabilities();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [visible, setVisible] = useState(false);
  const initialized = useRef(false);
  const [state, setState] = useState<"default" | "interactive" | "view" | "drag">("default");
  const [label, setLabel] = useState("");
  const lastProbe = useRef(0);

  useEffect(() => {
    if (!ready || reducedMotion || touch || mobile || lowPower) return;
    let frame = 0;
    let nextX = -100;
    let nextY = -100;

    const update = (now: number) => {
      if (now - lastProbe.current > 48) {
        lastProbe.current = now;
        const target = document.elementFromPoint(nextX, nextY)?.closest<HTMLElement>("[data-cursor],a,button,[role='button']");
        const isCaseStudy = target?.matches('a[href^="/case-studies"]');
        const mode = (isCaseStudy ? "view" : target?.dataset.cursor) as typeof state | undefined;
        setState(mode || (target ? "interactive" : "default"));
        setLabel(target?.dataset.cursorLabel || (mode === "view" ? "VIEW" : mode === "drag" ? "SCROLL" : ""));
      }
      frame = 0;
    };

    const move = (event: PointerEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      x.set(nextX);
      y.set(nextY);
      if (!initialized.current) {
        initialized.current = true;
        setVisible(true);
        document.documentElement.classList.add("srx-cursor-ready");
      }
      if (!frame) frame = requestAnimationFrame(update);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("srx-cursor-ready");
    };
  }, [ready, reducedMotion, touch, mobile, lowPower, x, y]);

  if (!ready || reducedMotion || touch || mobile || lowPower) return null;

  return (
    <motion.div className={`srx-cursor is-${state}`} style={{ x, y }} animate={{ opacity: visible ? 1 : 0 }} aria-hidden="true">
      <span>{label}</span>
    </motion.div>
  );
}
