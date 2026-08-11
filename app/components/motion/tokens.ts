export const motionTokens = {
  duration: { instant: 0.18, fast: 0.28, base: 0.48, reveal: 0.62, cinematic: 0.85 },
  delay: { micro: 0.03, short: 0.06, medium: 0.12 },
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
  stagger: { tight: 0.028, base: 0.045, spacious: 0.07 },
  distance: { subtle: 10, base: 18, dramatic: 32 },
  parallax: { subtle: 12, base: 24, strong: 40 },
  blur: { subtle: 2, base: 6, strong: 10 },
  scale: { reveal: 0.985, hover: 1.01, depth: [0.97, 1.03] as const },
} as const;

export type MotionTokens = typeof motionTokens;
