"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useIsFinePointer } from "@/lib/hooks";

/**
 * Desktop-only cursor. A small dot follows the pointer; when hovering an
 * element with `data-cursor="VIEW"` it expands into a labelled disc.
 * Disabled for touch devices, coarse pointers and reduced motion.
 */
export function Cursor() {
  const isFinePointer = useIsFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const host = target?.closest<HTMLElement>("[data-cursor]");
      const value = host?.dataset.cursor;
      setLabel(value && value.length > 0 ? value : null);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const expanded = label !== null;
  const size = expanded ? 80 : pressed ? 8 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink"
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.5 }}
      >
        <motion.span
          className="eyebrow whitespace-nowrap"
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.2, delay: expanded ? 0.1 : 0 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
