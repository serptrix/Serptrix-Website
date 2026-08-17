"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../motion/scroll-reveal";
import { createScopedGSAP, gsap } from "../motion/gsap-runtime";
import { useMotionCapabilities } from "../motion/use-motion-capabilities";

const steps = [
  {
    num: "01",
    title: "We Review",
    copy: "We review your business, goals and project requirements.",
  },
  {
    num: "02",
    title: "We Talk",
    copy: "If there is a strong fit, we discuss the challenge, priorities and best path forward.",
  },
  {
    num: "03",
    title: "We Define the Next Step",
    copy: "Depending on the project, this may lead to a proposal, audit, strategy engagement or recommended solution.",
  },
] as const;

export function ContactProcess() {
  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const { reducedMotion, mobile, lowPower } = useMotionCapabilities();

  useEffect(() => {
    if (!section.current || reducedMotion || mobile || lowPower) return;
    return createScopedGSAP(section, () => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
            onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 3))),
          },
        },
      );
    });
  }, [lowPower, mobile, reducedMotion]);

  return (
    <section ref={section} className="contact-process section" aria-labelledby="contact-process-title">
      <div className="shell contact-process-layout">
        <ScrollReveal type="fade-up">
          <p className="section-index">WHAT HAPPENS NEXT</p>
          <h2 id="contact-process-title">
            A clear path from first contact to <em>next step.</em>
          </h2>
        </ScrollReveal>
        <div className="contact-process-track">
          <div className="contact-process-line" aria-hidden="true">
            <span ref={fill} className="contact-process-fill" />
          </div>
          <ol className="contact-process-steps">
            {steps.map((step, index) => (
              <li key={step.num} className={active >= index ? "is-active" : ""}>
                <span className="contact-process-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
