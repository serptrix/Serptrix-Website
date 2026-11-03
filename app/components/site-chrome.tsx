"use client";

import { ReactNode } from "react";
import { ConsentManager } from "./consent-manager";
import { MotionShell } from "./motion-shell";
import { MotionCapabilitiesProvider } from "./motion/use-motion-capabilities";
import { Header } from "./primary-header";
import { Footer } from "./site-footer";

/** Shared header/footer shell for legacy routes under app/(with-chrome). */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <MotionCapabilitiesProvider>
      <Header />
      <MotionShell>
        <div id="main">{children}</div>
      </MotionShell>
      <Footer />
      <ConsentManager />
    </MotionCapabilitiesProvider>
  );
}
