"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ServicePageContent, UniqueBlock } from "@/content/service-pages";
import { createScopedGSAP, gsap, ScrollTrigger } from "../motion/gsap-runtime";
import { ScrollReveal } from "../motion/scroll-reveal";
import { useMotionCapabilities } from "../motion/use-motion-capabilities";

function ChannelMap() {
  const channels = ["SEO", "Social", "Paid", "Content", "Conversion"];
  const [on, setOn] = useState(2);
  return (
    <section className="sv-unique sv-channel-map" aria-labelledby="channel-map-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Channel interaction</p>
          <h2 id="channel-map-title">Paid and organic converge on the same conversion events.</h2>
          <p>Select a layer to see how it feeds the acquisition path. This is a planning model—not live campaign data.</p>
        </ScrollReveal>
        <div className="sv-channel-stage">
          {channels.map((channel, index) => (
            <button key={channel} type="button" className={on === index ? "is-on" : ""} onClick={() => setOn(index)}>
              {channel}
            </button>
          ))}
          <p className="sv-channel-note">
            {channels[on]} contributes demand into a shared measurement model so teams stop optimizing isolated dashboards.
          </p>
        </div>
      </div>
    </section>
  );
}

function Maturity() {
  const levels = [
    { name: "Activity", copy: "Channels run independently. Reporting is volume." },
    { name: "Coordination", copy: "Messages align. Measurement still lags." },
    { name: "System", copy: "Search, social, paid and conversion share events and a learning loop." },
  ];
  return (
    <section className="sv-unique sv-maturity" aria-labelledby="maturity-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Marketing maturity</p>
          <h2 id="maturity-title">A diagnostic view of how connected the system is.</h2>
        </ScrollReveal>
        <ol>
          {levels.map((level) => (
            <li key={level.name}>
              <h3>{level.name}</h3>
              <p>{level.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function OpportunityMap() {
  const stages = ["Search demand", "Content coverage", "Authority", "Conversion"];
  return (
    <section className="sv-unique sv-opp" aria-labelledby="opp-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Search opportunity map</p>
          <h2 id="opp-title">Demand is only useful when coverage, authority and conversion can capture it.</h2>
        </ScrollReveal>
        <ol className="sv-opp-flow">
          {stages.map((stage, index) => (
            <li key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SeoLayers() {
  const layers = ["Technical", "On-page", "Content", "Internal linking", "Authority", "Local", "Measurement"];
  const [active, setActive] = useState(0);
  return (
    <section className="sv-unique sv-seo-layers" aria-labelledby="seo-layers-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">SEO system</p>
          <h2 id="seo-layers-title">A layered model. Each layer has a job.</h2>
        </ScrollReveal>
        <div className="sv-layer-board">
          {layers.map((layer, index) => (
            <button key={layer} type="button" className={active === index ? "is-on" : ""} onClick={() => setActive(index)}>
              {layer}
            </button>
          ))}
        </div>
        <p>Work is sequenced so technical health and architecture support content and authority—not the other way around.</p>
      </div>
    </section>
  );
}

function ArchitectureShift() {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion, mobile } = useMotionCapabilities();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!ref.current || reducedMotion || mobile) return;
    return createScopedGSAP(ref, () => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.6,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    });
  }, [mobile, reducedMotion]);
  return (
    <section ref={ref} className="sv-unique sv-arch-shift" aria-labelledby="arch-shift-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Before / after architecture</p>
          <h2 id="arch-shift-title">From scattered pages to a structured search ecosystem.</h2>
          <p>A conceptual transformation. No client site is shown as a verified before-and-after.</p>
        </ScrollReveal>
        <div className="sv-arch-pair">
          <article className={progress < 0.45 ? "is-on" : ""}>
            <h3>Scattered</h3>
            <p>Orphan pages, competing URLs, weak internal links.</p>
          </article>
          <article className={progress >= 0.45 ? "is-on" : ""}>
            <h3>Structured</h3>
            <p>Clusters, hubs, conversion paths and crawlable templates.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function ContentSystem() {
  const tiles = [
    ["Brand", "The role the brand plays in culture and category."],
    ["Content", "Territories and formats that can be produced sustainably."],
    ["Attention", "Distribution designed for the actual audience."],
    ["Engagement", "Conversation that builds familiarity."],
    ["Trust", "Proof and consistency over time."],
    ["Conversion", "A path into the site, product or conversation."],
  ] as const;
  return (
    <section className="sv-unique sv-content-sys" aria-labelledby="content-sys-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Creative system</p>
          <h2 id="content-sys-title">Brand → content → attention → engagement → trust → conversion.</h2>
        </ScrollReveal>
        <div className="sv-tile-grid">
          {tiles.map(([title, copy], index) => (
            <motion.article key={title} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerformanceEngine() {
  const ref = useRef<HTMLElement>(null);
  const stages = ["Traffic", "Landing page", "Conversion", "Revenue", "Optimization"];
  const { reducedMotion, mobile } = useMotionCapabilities();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!ref.current || reducedMotion || mobile) return;
    return createScopedGSAP(ref, () => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.5,
        onUpdate: (self) => setActive(Math.min(stages.length - 1, Math.floor(self.progress * stages.length))),
      });
    });
  }, [mobile, reducedMotion, stages.length]);
  return (
    <section ref={ref} className="sv-unique sv-engine" aria-labelledby="engine-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Performance engine</p>
          <h2 id="engine-title">Traffic is only the first event in a loop that has to pay back.</h2>
        </ScrollReveal>
        <ol>
          {stages.map((stage, index) => (
            <li key={stage} className={index === active ? "is-on" : ""}>
              <button type="button" onClick={() => setActive(index)}>
                {stage}
              </button>
            </li>
          ))}
        </ol>
        <p>Campaigns are measured and improved continuously. Financial results are never guaranteed.</p>
      </div>
    </section>
  );
}

function DesignToCode() {
  return (
    <section className="sv-unique sv-d2c" aria-labelledby="d2c-title">
      <div className="shell sv-d2c-grid">
        <ScrollReveal type="fade-right">
          <p className="section-index">Design to code</p>
          <h2 id="d2c-title">Components, states and performance budgets travel together.</h2>
          <p>The interface is not a picture of a product. It is a modular system that engineering can evolve.</p>
        </ScrollReveal>
        <div className="sv-d2c-stage" aria-hidden="true">
          <i />
          <i />
          <i />
          <b>UI system</b>
        </div>
      </div>
    </section>
  );
}

function ConversionArch() {
  const steps = ["Message", "UX", "CTA", "Form", "Conversion"];
  return (
    <section className="sv-unique sv-conv" aria-labelledby="conv-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Conversion architecture</p>
          <h2 id="conv-title">The site is a sequence of decisions, not a brochure.</h2>
        </ScrollReveal>
        <ol className="sv-conv-line">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DeviceLab() {
  const [mode, setMode] = useState("desktop");
  return (
    <section className="sv-unique sv-lab" aria-labelledby="lab-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Responsive experience</p>
          <h2 id="lab-title">Desktop, tablet and mobile are designed states.</h2>
        </ScrollReveal>
        <div className="sv-lab-switch" role="group" aria-label="Device state">
          {["desktop", "tablet", "mobile"].map((item) => (
            <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className={`sv-lab-frame is-${mode}`}>
          <p>Conceptual performance layer: Core Web Vitals, accessibility and conversion events are launch criteria—not vanity scores we invent.</p>
        </div>
      </div>
    </section>
  );
}

function SaasJourney() {
  const steps = ["Sign-up", "Onboarding", "Core workflow", "Value", "Retention"];
  return (
    <section className="sv-unique sv-saas-j" aria-labelledby="saas-j-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">User journey</p>
          <h2 id="saas-j-title">Value has to be reachable, then repeatable.</h2>
        </ScrollReveal>
        <ol className="sv-saas-steps">
          {steps.map((step, index) => (
            <li key={step}>
              <b>{index + 1}</b>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PlatformLayers() {
  const layers = [
    ["Frontend", "The interface people trust and return to."],
    ["Backend", "The rules and workflows the product enforces."],
    ["Database", "Records the business cannot afford to lose."],
    ["Authentication", "Who can act, and on whose behalf."],
    ["Integrations", "The tools customers already live in."],
    ["AI", "Assistance only where evaluation is possible."],
    ["Analytics", "Evidence for the next product decision."],
    ["Infrastructure", "Cost, reliability and room to grow."],
  ] as const;
  return (
    <section className="sv-unique sv-plat" aria-labelledby="plat-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Platform layers</p>
          <h2 id="plat-title">Engineering choices, translated into business benefit.</h2>
        </ScrollReveal>
        <div className="sv-plat-grid">
          {layers.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommerceFunnel() {
  return (
    <section className="sv-unique sv-ecom" aria-labelledby="ecom-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Commerce conversion</p>
          <h2 id="ecom-title">Discovery, product, cart, checkout, repeat.</h2>
          <p>CRO architecture treats each stage as a testable moment. Lifts are hypothesized, not promised.</p>
        </ScrollReveal>
        <div className="sv-ecom-funnel" aria-hidden="true">
          {["Find", "Understand", "Add", "Pay", "Return"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiGovernance() {
  return (
    <section className="sv-unique sv-gov" aria-labelledby="gov-title">
      <div className="shell sv-gov-grid">
        <ScrollReveal type="fade-up">
          <p className="section-index">Use, integrate, govern</p>
          <h2 id="gov-title">Practical AI stays useful because someone owns the failure path.</h2>
        </ScrollReveal>
        <ul>
          {["Workflow analysis", "Integration", "Human oversight", "Measurement", "Permissions", "Exception handling"].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IntelPipeline() {
  const stages = ["Problem", "Data / context", "Model", "Retrieval", "Workflow", "Guardrails", "Human review", "Integration"];
  return (
    <section className="sv-unique sv-intel" aria-labelledby="intel-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Intelligence pipeline</p>
          <h2 id="intel-title">Input becomes structured output only after the system is qualified.</h2>
        </ScrollReveal>
        <ol className="sv-intel-list">
          {stages.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AutomationShift() {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, mobile } = useMotionCapabilities();
  useEffect(() => {
    if (!ref.current || reducedMotion || mobile) return;
    return createScopedGSAP(ref, () => {
      gsap.fromTo(".sv-shift-after", { clipPath: "inset(0 100% 0 0)" }, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 70%", end: "center 40%", scrub: 0.7 },
      });
    });
  }, [mobile, reducedMotion]);
  return (
    <section className="sv-unique sv-shift" aria-labelledby="shift-title">
      <div className="shell" ref={ref}>
        <ScrollReveal type="fade-up">
          <p className="section-index">Workflow comparison</p>
          <h2 id="shift-title">Manual chains become a designed route.</h2>
          <p>Conceptual comparison. Not a verified client process unless published as a case study.</p>
        </ScrollReveal>
        <div className="sv-shift-stage">
          <article>
            <h3>Before</h3>
            <p>Manual → Manual → Manual → Delay → Error</p>
          </article>
          <article className="sv-shift-after">
            <h3>After</h3>
            <p>Trigger → Automation → AI decision → Integration → Result</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function StrategyRoadmap() {
  const stages = [
    ["Assess", "Current-state of customers, systems and constraints."],
    ["Map", "Opportunities across marketing, product, data and AI."],
    ["Prioritize", "Value, confidence, risk and effort—compared in the open."],
    ["Sequence", "A staged roadmap with owners and learning gates."],
    ["Measure", "The few indicators that should change the plan."],
    ["Optimize", "Continuous direction, not a one-time workshop."],
  ] as const;
  return (
    <section className="sv-unique sv-roadmap" aria-labelledby="roadmap-title">
      <div className="shell">
        <ScrollReveal type="fade-up">
          <p className="section-index">Roadmap</p>
          <h2 id="roadmap-title">Disconnected systems become one coherent sequence.</h2>
        </ScrollReveal>
        <ol className="sv-roadmap-list">
          {stages.map(([title, copy], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
        <p>
          Related reading:{" "}
          <Link href="/blog/growth-stack-operating-system">why your growth stack needs an operating system</Link>.
        </p>
      </div>
    </section>
  );
}

const blocks: Record<UniqueBlock, () => ReactElement> = {
  "channel-map": ChannelMap,
  maturity: Maturity,
  "opportunity-map": OpportunityMap,
  "seo-layers": SeoLayers,
  "architecture-shift": ArchitectureShift,
  "content-system": ContentSystem,
  "performance-engine": PerformanceEngine,
  "design-to-code": DesignToCode,
  "conversion-arch": ConversionArch,
  "device-lab": DeviceLab,
  "saas-journey": SaasJourney,
  "platform-layers": PlatformLayers,
  "commerce-funnel": CommerceFunnel,
  "ai-governance": AiGovernance,
  "intel-pipeline": IntelPipeline,
  "automation-shift": AutomationShift,
  "strategy-roadmap": StrategyRoadmap,
};

export function UniqueExperiences({ page }: { page: ServicePageContent }) {
  return (
    <>
      {page.unique.map((block) => {
        const Block = blocks[block];
        return <Block key={block} />;
      })}
    </>
  );
}
