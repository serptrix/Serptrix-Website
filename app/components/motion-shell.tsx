"use client";

import { ReactNode } from "react";
import { CustomCursor } from "./motion/custom-cursor";
import { PageTransition } from "./motion/page-transition";
import { SmoothScrollProvider } from "./motion/smooth-scroll-provider";

export function MotionShell({ children }: { children: ReactNode }) {
  return <SmoothScrollProvider>
    <PageTransition>{children}</PageTransition>
    <CustomCursor />
  </SmoothScrollProvider>;
}
