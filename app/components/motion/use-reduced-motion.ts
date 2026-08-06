"use client";

import { useMotionCapabilities } from "./use-motion-capabilities";

export function useReducedMotionPreference() {
  const { ready, reducedMotion } = useMotionCapabilities();
  return ready && reducedMotion;
}
