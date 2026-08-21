"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { serviceBySlug } from "@/content/site-data";

const routes = [
  { problem: "We need more qualified traffic", outcome: "Increase relevant visibility", services: ["seo-optimization", "performance-marketing"], href: "seo-optimization" },
  { problem: "Our website is not converting", outcome: "Improve digital conversion", services: ["website-development", "digital-strategy"], href: "website-development" },
  { problem: "We need a new digital product", outcome: "Launch a scalable product", services: ["saas-development", "digital-strategy"], href: "saas-development" },
  { problem: "Our ecommerce store is not growing", outcome: "Strengthen commerce growth", services: ["ecommerce-development", "performance-marketing"], href: "ecommerce-development" },
  { problem: "Our marketing is difficult to measure", outcome: "Create accountable acquisition", services: ["performance-marketing", "digital-strategy"], href: "performance-marketing" },
  { problem: "Our team wastes time on repetitive work", outcome: "Increase operating efficiency", services: ["ai-automation", "ai-development"], href: "ai-automation" },
  { problem: "We need an AI strategy", outcome: "Find practical AI opportunities", services: ["ai-development", "digital-strategy"], href: "ai-development" },
  { problem: "Our systems are disconnected", outcome: "Connect the growth system", services: ["digital-strategy", "ai-automation"], href: "digital-strategy" },
] as const;

export function ServiceExplorer() {
  const [mode, setMode] = useState<"problem" | "outcome">("problem");
  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "ArrowLeft" || event.key === "Home" ? "problem" : "outcome";
    setMode(next);
    document.getElementById(`service-explorer-${next}`)?.focus();
  };

  return (
    <div className="service-explorer">
      <div className="explorer-controls" role="tablist" aria-label="Explore services by">
        {(["problem", "outcome"] as const).map((item) => (
          <button
            id={`service-explorer-${item}`}
            key={item}
            role="tab"
            type="button"
            aria-selected={mode === item}
            aria-controls="service-explorer-panel"
            tabIndex={mode === item ? 0 : -1}
            onClick={() => setMode(item)}
            onKeyDown={selectWithKeyboard}
          >
            {item === "problem" ? "Business problem" : "Desired outcome"}
          </button>
        ))}
      </div>
      <div id="service-explorer-panel" className="explorer-grid" role="tabpanel" aria-labelledby={`service-explorer-${mode}`}>
        {routes.map((route, index) => (
          <Link href={`/services/${route.href}`} key={route.problem}>
            <span>0{index + 1}</span>
            <h3>{mode === "problem" ? route.problem : route.outcome}</h3>
            <p>{route.services.map((slug) => serviceBySlug(slug)?.name ?? slug).join(" + ")}</p>
            <b>Explore the route ↗</b>
          </Link>
        ))}
      </div>
    </div>
  );
}
