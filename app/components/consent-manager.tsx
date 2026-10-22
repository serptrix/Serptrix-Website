"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type ConsentChoice = "essential" | "analytics";
type ConsentState = ConsentChoice | "unknown" | "unset";

function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem("serptrix-consent");
    return value === "essential" || value === "analytics" ? value : null;
  } catch {
    return null;
  }
}

export function ConsentManager() {
  const [choice, setChoice] = useState<ConsentState>("unknown");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setChoice(readConsent() ?? "unset");
    });
    const track = (event: Event) => {
      if (readConsent() !== "analytics") return;
      const detail = (event as CustomEvent).detail || {};
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "serptrix_conversion", ...detail });
    };
    window.addEventListener("serptrix:conversion", track);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("serptrix:conversion", track);
    };
  }, []);

  const select = (value: ConsentChoice) => {
    try {
      localStorage.setItem("serptrix-consent", value);
    } catch {
      /* private mode — still hide banner for this session */
    }
    setChoice(value);
  };

  if (choice !== "unset") return null;

  return (
    <aside className="consent-banner" aria-label="Cookie choices" role="dialog" aria-modal="false">
      <div>
        <b>Cookie choices</b>
        <p>Essential storage keeps your privacy choice. Optional analytics help Serptrix understand which pages and actions are useful.</p>
        <Link href="/cookies">Cookie policy</Link>
      </div>
      <div className="consent-actions">
        <button type="button" onClick={() => select("essential")}>
          Essential only
        </button>
        <button type="button" onClick={() => select("analytics")} className="btn btn-primary">
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
