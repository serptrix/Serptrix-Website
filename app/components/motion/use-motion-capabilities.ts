"use client";

import { useEffect, useState } from "react";

export type MotionCapabilities = {
  ready: boolean;
  webgl: boolean;
  reducedMotion: boolean;
  touch: boolean;
  mobile: boolean;
  devicePixelRatio: number;
  lowPower: boolean;
  canvasFailed: boolean;
};

const initial: MotionCapabilities = { ready: false, webgl: true, reducedMotion: false, touch: false, mobile: false, devicePixelRatio: 1, lowPower: false, canvasFailed: false };

export function useMotionCapabilities() {
  const [capabilities, setCapabilities] = useState(initial);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    const detect = () => {
      let webgl = false;
      let canvasFailed = false;
      try {
        const canvas = document.createElement("canvas");
        // Prefer a strict check, but many mobile GPUs fail the performance caveat —
        // retry without it so the hero 3D scene can still run.
        const strict =
          canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
          canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
        const loose = strict || canvas.getContext("webgl2") || canvas.getContext("webgl");
        webgl = Boolean(loose);
        if (loose && "getExtension" in loose) loose.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        canvasFailed = true;
      }
      const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
      const mobile = mobileQuery.matches;
      const touch = pointerQuery.matches || (navigator.maxTouchPoints > 0 && mobile);
      const lowPower =
        nav.connection?.saveData === true ||
        ((nav.hardwareConcurrency ?? 8) <= 2 && (nav.deviceMemory ?? 8) <= 2);
      setCapabilities({
        ready: true,
        webgl,
        reducedMotion: motionQuery.matches,
        touch,
        mobile,
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, lowPower || mobile ? 1.25 : 1.75),
        lowPower,
        canvasFailed,
      });
    };

    detect();
    motionQuery.addEventListener("change", detect);
    pointerQuery.addEventListener("change", detect);
    mobileQuery.addEventListener("change", detect);
    return () => {
      motionQuery.removeEventListener("change", detect);
      pointerQuery.removeEventListener("change", detect);
      mobileQuery.removeEventListener("change", detect);
    };
  }, []);

  return capabilities;
}
