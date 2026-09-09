"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { RevealText } from "@/components/motion/RevealText";

interface SectionHeadingProps {
  /** Small uppercase label, e.g. "02 — Signature services". */
  eyebrow?: string;
  /** Heading lines. Each entry becomes its own masked line. */
  lines: string[];
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "display" | "title";
  align?: "left" | "center";
  /** Renders in ivory for dark sections. */
  inverted?: boolean;
  className?: string;
  /** Optional supporting copy rendered under the heading. */
  children?: React.ReactNode;
}

const sizeClass = {
  hero: "text-hero",
  display: "text-display",
  title: "text-title",
} as const;

export function SectionHeading({
  eyebrow,
  lines,
  as = "h2",
  size = "display",
  align = "left",
  inverted = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <motion.p
          className={cn("eyebrow mb-6 md:mb-8", inverted ? "text-ivory/60" : "text-umber")}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <RevealText
        as={as}
        lines={lines}
        className={cn("font-display uppercase", sizeClass[size], inverted ? "text-ivory" : "text-ink")}
      />
      {children ? (
        <motion.div
          className={cn(
            "mt-6 max-w-prose text-lead md:mt-8",
            inverted ? "text-ivory/70" : "text-ink/70",
            align === "center" && "mx-auto",
          )}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  );
}
