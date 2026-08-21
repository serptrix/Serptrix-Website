"use client";

import type Lenis from "lenis";
import { ReactNode, useEffect, useRef } from "react";
import { useMotionCapabilities } from "./use-motion-capabilities";

let activeLenis: Lenis | null = null;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { ready, reducedMotion, mobile, touch, lowPower } = useMotionCapabilities();
  const ownsInstance = useRef(false);

  useEffect(() => {
    // Native scroll is faster and more reliable on touch/low-power devices.
    if (!ready || reducedMotion || mobile || touch || lowPower || activeLenis) {
      document.documentElement.style.scrollBehavior = reducedMotion ? "auto" : "smooth";
      return;
    }

    let disposed = false;
    let teardown = () => {};

    const start = async () => {
      const [{ default: LenisRuntime }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || activeLenis) return;

      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.style.scrollBehavior = "auto";
      const lenis = new LenisRuntime({
        duration: 0.92,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        autoRaf: false,
        wheelMultiplier: 0.95,
      });
      activeLenis = lenis;
      ownsInstance.current = true;

      const update = () => ScrollTrigger.update();
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      const anchors = (event: MouseEvent) => {
        const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
        if (
          !link ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        const id = link.hash.slice(1);
        const target = id ? document.getElementById(decodeURIComponent(id)) : document.documentElement;
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, {
          offset: 0,
          duration: 0.75,
          onComplete: () => history.replaceState(null, "", link.hash || "#"),
        });
      };

      lenis.on("scroll", update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(500, 33);
      document.addEventListener("click", anchors);
      document.documentElement.classList.add("srx-smooth-scroll");
      ScrollTrigger.refresh();

      teardown = () => {
        document.removeEventListener("click", anchors);
        document.documentElement.classList.remove("srx-smooth-scroll");
        document.documentElement.style.scrollBehavior = "";
        lenis.off("scroll", update);
        gsap.ticker.remove(tick);
        lenis.destroy();
        if (activeLenis === lenis) activeLenis = null;
        ownsInstance.current = false;
      };
    };

    void start();

    return () => {
      disposed = true;
      teardown();
    };
  }, [ready, reducedMotion, mobile, touch, lowPower]);

  return children;
}
