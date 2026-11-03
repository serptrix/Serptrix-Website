"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ConsentManager } from "./consent-manager";
import { MotionShell } from "./motion-shell";
import { MotionCapabilitiesProvider } from "./motion/use-motion-capabilities";
import { Header } from "./primary-header";
import { Footer } from "./site-footer";

/** Site chrome for non-home routes. Homepage ships its own header/footer/motion. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

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
