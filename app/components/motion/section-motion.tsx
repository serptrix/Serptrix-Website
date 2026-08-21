"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMotionCapabilities } from "./use-motion-capabilities";

const SECTION_SELECTOR = "#main section";
const RICH_MOTION_SELECTOR =
  ".srx-reveal-root, [data-motion-rich], .s3-section, .sv-process, .sv-capabilities";

export function SectionMotion() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);
  const { ready, reducedMotion, mobile, touch, lowPower } = useMotionCapabilities();

  useEffect(() => {
    if (!ready) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    const shouldReveal = !reducedMotion;
    const richMotionEnabled = !mobile && !touch && !lowPower;
    const observer = shouldReveal
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const section = entry.target as HTMLElement;
              section.classList.add("is-srx-section-visible");
              observer?.unobserve(section);
            }
          },
          { rootMargin: mobile ? "0px 0px -8%" : "0px 0px -12%", threshold: 0.08 },
        )
      : null;

    for (const section of sections) {
      const hasRichMotion =
        richMotionEnabled &&
        (section.matches(RICH_MOTION_SELECTOR) || Boolean(section.querySelector(RICH_MOTION_SELECTOR)));
      section.dataset.srxSection = hasRichMotion ? "native" : "reveal";

      const rect = section.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
      if (!shouldReveal || alreadyVisible || hasRichMotion) {
        section.classList.add("is-srx-section-visible");
      } else {
        observer?.observe(section);
      }
    }

    return () => {
      observer?.disconnect();
      for (const section of sections) {
        delete section.dataset.srxSection;
        section.classList.remove("is-srx-section-visible");
      }
    };
  }, [lowPower, mobile, pathname, ready, reducedMotion, touch]);

  useEffect(() => {
    const progress = progressRef.current;
    if (!ready || !progress || reducedMotion || mobile || touch || lowPower) return;

    let frame = 0;
    const update = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, window.scrollY / scrollable));
      progress.style.transform = `scaleY(${value})`;
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [lowPower, mobile, pathname, ready, reducedMotion, touch]);

  if (!ready || reducedMotion || mobile || touch || lowPower) return null;

  return (
    <div className="srx-scroll-signal" aria-hidden="true">
      <i />
      <span ref={progressRef} />
    </div>
  );
}
