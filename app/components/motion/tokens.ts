export const motionTokens = {
  duration: { instant: 0.18, fast: 0.32, base: 0.58, reveal: 0.82, cinematic: 1.05 },
  delay: { micro: 0.04, short: 0.08, medium: 0.16 },
  ease: {
    premium: [0.22, 1, 0.36, 1] as const,
    smooth: [0.65, 0, 0.35, 1] as const,
    accelerate: [0.76, 0, 0.24, 1] as const,
    linear: [0, 0, 1, 1] as const,
  },
  spring: {
    magnetic: { stiffness: 240, damping: 24, mass: 0.65 },
    interactive: { stiffness: 180, damping: 20, mass: 0.8 },
    pointer: { stiffness: 70, damping: 24, mass: 0.8 },
  },
  stagger: { tight: 0.035, base: 0.065, spacious: 0.11 },
  distance: { subtle: 18, base: 38, dramatic: 72 },
  parallax: { subtle: 24, base: 52, strong: 96 },
  blur: { subtle: 4, base: 10, strong: 18 },
  scale: { reveal: 0.94, hover: 1.018, depth: [0.9, 1.08] as const },
} as const;

export type MotionTokens = typeof motionTokens;
