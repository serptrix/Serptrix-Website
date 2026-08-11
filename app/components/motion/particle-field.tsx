"use client";

import { useEffect, useRef } from "react";
import { useMotionCapabilities } from "./use-motion-capabilities";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const caps = useMotionCapabilities();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !caps.ready || caps.reducedMotion || caps.mobile || caps.touch || caps.lowPower) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let mx = 0.5;
    let my = 0.5;
    const count = 48;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016,
      r: 0.7 + Math.random() * 1.2,
    }));

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(caps.devicePixelRatio, 1.25);
      width = box.width;
      height = box.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      mx = (event.clientX - box.left) / box.width;
      my = (event.clientY - box.top) / box.height;
    };
    canvas.addEventListener("pointermove", move, { passive: true });

    const draw = () => {
      if (!visible) {
        frame = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + (mx - 0.5) * 0.00002;
        p.y += p.vy + (my - 0.5) * 0.000016;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = "rgba(251,188,3,.72)";
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < Math.min(particles.length, i + 5); j++) {
          const q = particles[j];
          const dx = (p.x - q.x) * width;
          const dy = (p.y - q.y) * height;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251,188,3,${(1 - dist / 120) * 0.1})`;
            ctx.moveTo(p.x * width, p.y * height);
            ctx.lineTo(q.x * width, q.y * height);
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(draw);
        else if (!visible && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "80px" },
    );
    visibility.observe(canvas);

    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointermove", move);
    };
  }, [caps.devicePixelRatio, caps.lowPower, caps.mobile, caps.ready, caps.reducedMotion, caps.touch]);

  if (caps.reducedMotion || caps.mobile || caps.touch || caps.lowPower) return null;
  return <canvas ref={ref} className="s12-particles" aria-hidden="true" />;
}
