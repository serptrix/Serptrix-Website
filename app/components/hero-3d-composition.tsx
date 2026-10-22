"use client";

import { useEffect, useRef, useState } from "react";

export function Hero3DComposition() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const syncVisibility = () => setActive(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.08 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  const updateTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--scene-ry", `${x * 7}deg`);
    event.currentTarget.style.setProperty("--scene-rx", `${-y * 5}deg`);
  };

  const resetTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--scene-ry", "0deg");
    event.currentTarget.style.setProperty("--scene-rx", "0deg");
  };

  return (
    <div
      ref={root}
      className={`hero3d ${active ? "is-active" : "is-paused"}`}
      aria-hidden="true"
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
    >
      <div className="hero3d-stage">
        <div className="hero3d-aura" />
        <div className="hero3d-floor" />
        <div className="hero3d-platform" />
        <div className="hero3d-shadow" />

        <div className="hero3d-rail hero3d-rail-a" />
        <div className="hero3d-rail hero3d-rail-b" />
        <div className="hero3d-rail hero3d-rail-c" />

        <div className="hero3d-cuboid hero3d-core">
          <i className="front" /><i className="back" /><i className="left" />
          <i className="right" /><i className="top" /><i className="bottom" />
          <span>S</span>
        </div>
        <div className="hero3d-core-ring" />

        <div className="hero3d-cuboid hero3d-module hero3d-marketing">
          <i className="front" /><i className="back" /><i className="left" />
          <i className="right" /><i className="top" /><i className="bottom" />
          <b>Marketing</b>
        </div>
        <div className="hero3d-cuboid hero3d-module hero3d-product">
          <i className="front" /><i className="back" /><i className="left" />
          <i className="right" /><i className="top" /><i className="bottom" />
          <b>Digital products</b>
        </div>
        <div className="hero3d-cuboid hero3d-module hero3d-ai">
          <i className="front" /><i className="back" /><i className="left" />
          <i className="right" /><i className="top" /><i className="bottom" />
          <b>AI &amp; automation</b>
        </div>

        <div className="hero3d-node node-a" />
        <div className="hero3d-node node-b" />
        <div className="hero3d-node node-c" />
      </div>
      <p>Connected capabilities, shaped around one business constraint.</p>
    </div>
  );
}
