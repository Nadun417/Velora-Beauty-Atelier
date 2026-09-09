import type { Variants, Transition } from "framer-motion";

/** Shared premium easing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1,
  slower: 1.1,
} as const;

export const transition = (duration: number = DURATION.base, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Viewport options used across scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition(DURATION.base) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(DURATION.base) },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: transition(DURATION.base) },
};

/** Line-by-line text reveal: the child slides up inside an overflow-hidden mask. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: transition(DURATION.slow) },
};

/** Clip-path image reveal with a settling scale. */
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)", transition: transition(DURATION.slower) },
};

export const imageScaleSettle: Variants = {
  hidden: { scale: 1.15 },
  visible: { scale: 1, transition: transition(1.4) },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: transition(0.55) },
  exit: { opacity: 0, y: -8, transition: transition(0.3) },
};

/** Step transitions for the booking wizard: direction-aware. */
export const stepVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0, transition: transition(0.5) },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
    transition: transition(0.3),
  }),
};
