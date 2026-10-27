"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroSculpture() {
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
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--sculpture-ry", `${x * 4.5}deg`);
    event.currentTarget.style.setProperty("--sculpture-rx", `${-y * 3.5}deg`);
    event.currentTarget.style.setProperty("--sculpture-x", `${x * 6}px`);
    event.currentTarget.style.setProperty("--sculpture-y", `${y * 5}px`);
  };

  const resetTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--sculpture-ry", "0deg");
    event.currentTarget.style.setProperty("--sculpture-rx", "0deg");
    event.currentTarget.style.setProperty("--sculpture-x", "0px");
    event.currentTarget.style.setProperty("--sculpture-y", "0px");
  };

  return (
    <div
      ref={root}
      className={`hero-sculpture ${active ? "is-active" : "is-paused"}`}
      aria-hidden="true"
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
    >
      <div className="hero-sculpture-entry">
        <div className="hero-sculpture-float">
          <div className="hero-sculpture-tilt">
            <div className="hero-sculpture-glow" />
            <div className="hero-sculpture-ambient" />
            <div className="hero-sculpture-shadow" />
            <figure className="hero-sculpture-image">
              <Image
                src="/hero-serptrix-sculpture-cutout.png"
                alt=""
                width={1254}
                height={1254}
                priority
                quality={75}
                sizes="(max-width: 680px) 92vw, (max-width: 980px) 72vw, 48vw"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
