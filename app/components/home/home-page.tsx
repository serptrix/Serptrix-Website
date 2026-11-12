"use client";

import { useEffect, useRef } from "react";
import { injectServicesMegaMenu } from "@/app/components/services-mega-menu";
import { homeMarkup } from "./home-markup";
import { motion } from "./home-motion";
import "./home.css";
import "./home-overrides.css";

const socFix = `
.srx-home-root .soc{display:flex!important;flex-wrap:nowrap!important;align-items:center;gap:10px;width:max-content;max-width:100%}
.srx-home-root .soc a{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 44px;width:44px!important;height:44px!important;padding:0!important;margin:0!important;line-height:0!important;box-sizing:border-box}
.srx-home-root .soc a svg{display:block!important;width:22px!important;height:22px!important;max-width:none!important;margin:0!important;flex-shrink:0;overflow:visible}
@media(max-width:900px){.srx-home-root .soc{flex-wrap:nowrap!important;gap:8px}.srx-home-root .soc a{flex:0 0 40px;width:40px!important;height:40px!important}.srx-home-root .soc a svg{width:20px!important;height:20px!important}}
`;

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
    <>
      <style dangerouslySetInnerHTML={{ __html: socFix }} />
      <div
        ref={rootRef}
        className="srx-home-root srx-nav"
        dangerouslySetInnerHTML={{ __html: injectServicesMegaMenu(homeMarkup) }}
        suppressHydrationWarning
      />
    </>
  );
}
