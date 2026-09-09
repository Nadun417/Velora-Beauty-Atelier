"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

/**
 * Lightweight route transition. Mounted through `app/template.tsx`, so it
 * re-runs on every navigation without delaying the route change itself.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="enter">
      {children}
    </motion.div>
  );
}
