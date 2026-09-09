"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * FluidButton
 *
 * A native rebuild of the "Fluid Button" Framer component, on our tokens and
 * Framer Motion (no remote Framer runtime). On hover a coloured fill rises from
 * the bottom of the pill, its crest rounding then flattening, while the label
 * slides up to a second copy in the inverted colour. The whole pill scales
 * subtly. Reduced motion collapses this to a quiet, instant colour swap.
 */

type FluidTone = "ink" | "ivory";

interface FluidButtonProps {
  href: string;
  children: React.ReactNode;
  /** "ink": dark fill on a light ground. "ivory": light fill on a dark ground. */
  tone?: FluidTone;
  external?: boolean;
  /** Label shown by the custom cursor while hovering. */
  cursorLabel?: string;
  className?: string;
  onClick?: () => void;
}

const FLUID_EASE = [0.4, 0, 0, 1] as const;
const DURATION = 0.55;

const MotionLink = motion.create(Link);

const tones: Record<FluidTone, { base: string; fill: string; second: string }> = {
  // Transparent pill on a light ground; fills with ink, label flips to ivory.
  ink: { base: "border-ink text-ink", fill: "bg-ink", second: "text-ivory" },
  // Transparent pill on a dark ground; fills with ivory, label flips to ink.
  ivory: { base: "border-ivory text-ivory", fill: "bg-ivory", second: "text-ink" },
};

export function FluidButton({
  href,
  children,
  tone = "ink",
  external = false,
  cursorLabel,
  className,
  onClick,
}: FluidButtonProps) {
  const reduced = useReducedMotion();
  const palette = tones[tone];

  const fillVariants: Variants = reduced
    ? {
        rest: { opacity: 0 },
        hover: { opacity: 1, transition: { duration: 0.001 } },
      }
    : {
        rest: { y: "101%", borderTopLeftRadius: "50%", borderTopRightRadius: "50%" },
        hover: {
          y: "0%",
          borderTopLeftRadius: "0%",
          borderTopRightRadius: "0%",
          transition: { duration: DURATION, ease: FLUID_EASE },
        },
      };

  const slideVariants: Variants = reduced
    ? { rest: {}, hover: {} }
    : {
        rest: { y: "0%" },
        hover: { y: "-100%", transition: { duration: DURATION, ease: FLUID_EASE } },
      };

  const rootVariants: Variants = reduced
    ? { rest: {}, hover: {}, tap: {} }
    : {
        rest: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: DURATION, ease: FLUID_EASE } },
        tap: { scale: 0.98, transition: { duration: 0.2, ease: FLUID_EASE } },
      };

  return (
    <MotionLink
      href={href}
      onClick={onClick}
      data-cursor={cursorLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap="tap"
      variants={rootVariants}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border px-9 py-4",
        palette.base,
        className,
      )}
    >
      {/* Rising fluid fill */}
      <motion.span
        aria-hidden
        variants={fillVariants}
        className={cn("absolute inset-x-0 bottom-0 h-[135%]", palette.fill)}
      />

      {/* Label: visible copy plus a second copy that slides in from below */}
      <span className="relative z-10 block overflow-hidden leading-none">
        <motion.span
          variants={slideVariants}
          className="block font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] will-change-transform"
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden
          variants={slideVariants}
          className={cn(
            "absolute left-0 top-full block font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] will-change-transform",
            palette.second,
          )}
        >
          {children}
        </motion.span>
      </span>
    </MotionLink>
  );
}
