"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, staggerContainer, viewportOnce } from "@/lib/animations";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

interface RevealTextProps {
  as?: Tag;
  /** Explicit lines. Each line is masked and slides upward independently. */
  lines?: string[];
  /** Single string, split into words when `mode="word"` or used as one line. */
  text?: string;
  mode?: "line" | "word";
  /** Delay before the first line/word begins (seconds). */
  delay?: number;
  /** Gap between consecutive lines/words (seconds). */
  stagger?: number;
  duration?: number;
  /** Reveal only once when it enters the viewport. */
  once?: boolean;
  /**
   * "viewport" reveals on scroll; "mount" reveals immediately (hero);
   * "manual" waits for `visible` to become true.
   */
  trigger?: "viewport" | "mount" | "manual";
  visible?: boolean;
  className?: string;
  lineClassName?: string;
  id?: string;
}

/**
 * Editorial text reveal. Lines (or words) slide up inside overflow-hidden
 * masks. Screen readers get the full plain text via a visually hidden span;
 * the animated fragments are aria-hidden.
 */
export function RevealText({
  as = "h2",
  lines,
  text,
  mode = "line",
  delay = 0,
  stagger = 0.09,
  duration = 1,
  once = true,
  trigger = "viewport",
  visible = false,
  className,
  lineClassName,
  id,
}: RevealTextProps) {
  const Component = motionTags[as];
  const fragments: string[] =
    lines ?? (mode === "word" && text ? text.split(" ") : text ? [text] : []);
  const plain = lines ? lines.join(" ") : (text ?? "");

  const fragmentVariants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration, ease: EASE } },
  };

  const animationProps =
    trigger === "viewport"
      ? { initial: "hidden", whileInView: "visible", viewport: { ...viewportOnce, once } }
      : trigger === "mount"
        ? { initial: "hidden", animate: "visible" }
        : { initial: "hidden", animate: visible ? "visible" : "hidden" };

  return (
    <Component
      id={id}
      className={cn(className)}
      variants={staggerContainer(stagger, delay)}
      {...animationProps}
    >
      <span className="sr-only">{plain}</span>
      {fragments.map((fragment, index) => (
        <Fragment key={`${fragment}-${index}`}>
          <span
            aria-hidden
            className={cn(
              "overflow-hidden align-bottom",
              mode === "word" ? "inline-block" : "block",
              lineClassName,
            )}
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span
              className={cn(mode === "word" ? "inline-block" : "block", "will-change-transform")}
              variants={fragmentVariants}
            >
              {fragment}
            </motion.span>
          </span>
          {mode === "word" && index < fragments.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}
