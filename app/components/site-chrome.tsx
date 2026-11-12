"use client";

import { ReactNode } from "react";
import { ConsentManager } from "./consent-manager";
import { MotionShell } from "./motion-shell";
import { MotionCapabilitiesProvider } from "./motion/use-motion-capabilities";
import { RedesignHeader } from "./redesign-header";
import { Footer } from "./site-footer";

/** Shared header/footer shell for legacy routes under app/(with-chrome). */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <MotionCapabilitiesProvider>
      <div className="srx-nav">
        <div className="srx-nav-bar">
          <div className="pn dk">
            <div className="w">
              <RedesignHeader />
            </div>
          </div>
        </div>
        <MotionShell>
          <div id="main">{children}</div>
        </MotionShell>
      </div>
      <Footer />
      <ConsentManager />
    </MotionCapabilitiesProvider>
  );
}
