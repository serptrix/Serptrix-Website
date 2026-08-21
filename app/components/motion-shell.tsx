"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { PageTransition } from "./motion/page-transition";
import { SectionMotion } from "./motion/section-motion";
import { SmoothScrollProvider } from "./motion/smooth-scroll-provider";

const CustomCursor = dynamic(() => import("./motion/custom-cursor").then((mod) => mod.CustomCursor), {
  ssr: false,
});

export function MotionShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageTransition>{children}</PageTransition>
      <SectionMotion />
      <CustomCursor />
    </SmoothScrollProvider>
  );
}
