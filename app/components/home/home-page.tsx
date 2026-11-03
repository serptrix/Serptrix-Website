"use client";

import { useEffect, useRef } from "react";
import { homeMarkup } from "./home-markup";
import { motion } from "./home-motion";
import "./home.css";
import "./home-overrides.css";

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current?.querySelector(".pgx") as HTMLElement | null;
    try {
      motion(root);
    } catch {
      // Keep the static homepage visible if motion fails.
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className="srx-home-root"
      dangerouslySetInnerHTML={{ __html: homeMarkup }}
      suppressHydrationWarning
    />
  );
}
