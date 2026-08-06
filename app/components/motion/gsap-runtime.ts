"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function createScopedGSAP(scope: Element | RefObject<Element | null>, setup: () => void) {
  const context = gsap.context(setup, scope);
  return () => context.revert();
}

export { gsap, ScrollTrigger };
