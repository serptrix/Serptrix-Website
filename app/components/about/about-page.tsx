"use client";

import { injectServicesMegaMenu } from "@/app/components/services-mega-menu";
import { aboutMarkup } from "./about-markup";
import "./about.css";
import "./about-overrides.css";

const socFix = `
.srx-about-root .soc{display:flex!important;flex-wrap:nowrap!important;align-items:center;gap:10px;width:max-content;max-width:100%}
.srx-about-root .soc a{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 44px;width:44px!important;height:44px!important;padding:0!important;margin:0!important;line-height:0!important;box-sizing:border-box}
.srx-about-root .soc a svg{display:block!important;width:22px!important;height:22px!important;max-width:none!important;margin:0!important;flex-shrink:0;overflow:visible}
@media(max-width:900px){.srx-about-root .soc{flex-wrap:nowrap!important;gap:8px}.srx-about-root .soc a{flex:0 0 40px;width:40px!important;height:40px!important}.srx-about-root .soc a svg{width:20px!important;height:20px!important}}
`;

export default function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: socFix }} />
      <div
        id="main"
        className="srx-about-root"
        dangerouslySetInnerHTML={{ __html: injectServicesMegaMenu(aboutMarkup) }}
        suppressHydrationWarning
      />
    </>
  );
}
