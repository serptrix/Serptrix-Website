"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, type ReactElement } from "react";
import type { HeroVisual } from "@/content/service-pages";
import { motionTokens } from "../motion/tokens";
import { useMotionCapabilities } from "../motion/use-motion-capabilities";

function usePointerDepth() {
  const { touch, reducedMotion } = useMotionCapabilities();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, motionTokens.spring.pointer);
  const sy = useSpring(y, motionTokens.spring.pointer);
  useEffect(() => {
    if (touch || reducedMotion) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          x.set(nx);
          y.set(ny);
          frame = 0;
        });
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, touch, x, y]);
  return { sx, sy, reduced: reducedMotion || touch };
}

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="sv-hero-visual" aria-hidden="true">
      <p className="sv-hero-visual-label">{label}</p>
      {children}
    </div>
  );
}

function Ecosystem() {
  const { sx, sy } = usePointerDepth();
  const x = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const y = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const nodes = ["Search", "Attention", "Demand", "Conversion", "Revenue"];
  return (
    <Frame label="Acquisition ecosystem">
      <motion.svg className="sv-eco" viewBox="0 0 520 420" style={{ x, y }}>
        <path className="sv-path" d="M60 210 C140 80 220 80 260 210 C300 340 380 340 460 210" />
        <path className="sv-path sv-path-gold" d="M60 210 H460" />
        {nodes.map((node, index) => {
          const cx = 60 + index * 100;
          const cy = index % 2 === 0 ? 210 : 120 + (index === 1 ? 0 : 180);
          return (
            <g key={node}>
              <circle className="sv-node" cx={cx} cy={index === 0 || index === 4 ? 210 : cy} r="28" />
              <text x={cx} y={index === 0 || index === 4 ? 215 : cy + 5} textAnchor="middle">
                {node}
              </text>
            </g>
          );
        })}
      </motion.svg>
    </Frame>
  );
}

function SearchArch() {
  return (
    <Frame label="Search architecture">
      <div className="sv-search-arch">
        {["Demand clusters", "Content coverage", "Internal links", "Authority", "Conversion pages"].map((row, index) => (
          <motion.div
            className="sv-search-row"
            key={row}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.08, duration: motionTokens.duration.base, ease: motionTokens.ease.premium }}
          >
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>{row}</span>
            <i />
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function ContentStream() {
  const tiles = ["Narrative", "Format system", "Community", "Amplify", "Demand"];
  return (
    <Frame label="Brand to demand">
      <div className="sv-stream">
        {tiles.map((tile, index) => (
          <motion.article
            key={tile}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + index * 0.09, duration: 0.6, ease: motionTokens.ease.premium }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{tile}</strong>
          </motion.article>
        ))}
      </div>
    </Frame>
  );
}

function Funnel() {
  const stages = ["Traffic", "Landing", "Conversion", "Revenue", "Optimize"];
  return (
    <Frame label="Performance engine">
      <div className="sv-funnel">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            className="sv-funnel-step"
            initial={{ scaleX: 0.4, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.12 + index * 0.1, duration: 0.55, ease: motionTokens.ease.premium }}
            style={{ width: `${100 - index * 12}%` }}
          >
            {stage}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function ProductArch() {
  const layers = ["Strategy", "UX", "Interface", "Development", "Integration", "Performance", "Scale"];
  return (
    <Frame label="Product architecture">
      <div className="sv-layers">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: motionTokens.ease.premium }}
          >
            <span>0{index + 1}</span>
            {layer}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function Devices() {
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  return (
    <Frame label="Responsive experience">
      <div className="sv-devices">
        <div className={`sv-device is-${mode}`} data-mode={mode}>
          <i />
          <i />
          <i />
          <b>Message → UX → CTA</b>
        </div>
        <div className="sv-device-switch" role="group" aria-label="Preview device">
          {(["desktop", "tablet", "mobile"] as const).map((item) => (
            <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function SaasBlocks() {
  const blocks = ["Auth", "Workflow", "Dashboard", "API", "Data", "Billing"];
  return (
    <Frame label="Modular product system">
      <div className="sv-saas-grid">
        {blocks.map((block, index) => (
          <motion.div
            key={block}
            initial={{ scale: 0.8, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + index * 0.08, duration: 0.5, ease: motionTokens.ease.premium }}
          >
            {block}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function ShopJourney() {
  const steps = ["Discovery", "Product", "Cart", "Checkout", "Repeat"];
  return (
    <Frame label="Commerce journey">
      <ol className="sv-shop">
        {steps.map((step, index) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 + index * 0.08, ease: motionTokens.ease.premium }}
          >
            <b>{index + 1}</b>
            {step}
          </motion.li>
        ))}
      </ol>
    </Frame>
  );
}

function AiFlow() {
  const nodes = ["Data", "Intelligence", "Decision", "Automation", "Outcome"];
  return (
    <Frame label="Practical AI workflow">
      <div className="sv-ai-flow">
        {nodes.map((node, index) => (
          <motion.span
            key={node}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.1 + index * 0.12, duration: 0.55 }}
          >
            {node}
            {index < nodes.length - 1 ? <i /> : null}
          </motion.span>
        ))}
      </div>
    </Frame>
  );
}

function Pipeline() {
  return (
    <Frame label="Intelligence pipeline">
      <div className="sv-pipeline">
        {["Input", "Context", "Model", "Guardrail", "Review", "Output"].map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 * index, ease: motionTokens.ease.premium }}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            {stage}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function AutomationCompare() {
  return (
    <Frame label="Before / after operations">
      <div className="sv-compare">
        <article>
          <p>Before</p>
          <span>Manual → Manual → Delay → Error</span>
        </article>
        <article className="is-after">
          <p>After</p>
          <span>Trigger → Automate → Decide → Result</span>
        </article>
      </div>
    </Frame>
  );
}

function SystemsMap() {
  const { sx, sy } = usePointerDepth();
  const x = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const y = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  return (
    <Frame label="Strategic systems map">
      <motion.div className="sv-systems" style={{ x, y }}>
        {["Marketing", "Product", "Data", "AI", "Operations", "CX"].map((item) => (
          <span key={item}>{item}</span>
        ))}
        <b>Roadmap</b>
      </motion.div>
    </Frame>
  );
}

const visuals: Record<HeroVisual, () => ReactElement> = {
  ecosystem: Ecosystem,
  "search-arch": SearchArch,
  "content-stream": ContentStream,
  funnel: Funnel,
  "product-arch": ProductArch,
  devices: Devices,
  "saas-blocks": SaasBlocks,
  "shop-journey": ShopJourney,
  "ai-flow": AiFlow,
  pipeline: Pipeline,
  "automation-compare": AutomationCompare,
  "systems-map": SystemsMap,
};

export function ServiceHeroVisual({ type }: { type: HeroVisual }) {
  const Visual = visuals[type];
  return <Visual />;
}
