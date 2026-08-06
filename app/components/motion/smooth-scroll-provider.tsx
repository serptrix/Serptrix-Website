"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect, useRef } from "react";
import { useMotionCapabilities } from "./use-motion-capabilities";

gsap.registerPlugin(ScrollTrigger);
let activeLenis: Lenis | null = null;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { ready, reducedMotion } = useMotionCapabilities();
  const ownsInstance = useRef(false);

  useEffect(() => {
    if (!ready || reducedMotion || activeLenis) return;
    const lenis = new Lenis({ duration: 1.05, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false, touchMultiplier: 1.05, autoRaf: false });
    activeLenis = lenis;
    ownsInstance.current = true;
    const update = () => ScrollTrigger.update();
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    const anchors = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const id = link.hash.slice(1);
      const target = id ? document.getElementById(decodeURIComponent(id)) : document.documentElement;
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 0.85, onComplete: () => history.replaceState(null, "", link.hash || "#") });
    };
    lenis.on("scroll", update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", anchors);
    ScrollTrigger.refresh();
    return () => {
      document.removeEventListener("click", anchors);
      lenis.off("scroll", update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
      ownsInstance.current = false;
    };
  }, [ready, reducedMotion]);

  return children;
}
