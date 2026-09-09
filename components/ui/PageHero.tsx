"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, transition } from "@/lib/animations";
import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/motion/RevealText";

interface PageHeroProps {
  eyebrow: string;
  lines: string[];
  copy?: string;
  /** Optional content aligned to the right on desktop (meta, counts, links). */
  aside?: React.ReactNode;
  className?: string;
}

/** Shared editorial hero used by the inner pages. */
export function PageHero({ eyebrow, lines, copy, aside, className }: PageHeroProps) {
  return (
    <section className={cn("pb-section-sm pt-36 md:pt-44 lg:pt-52", className)}>
      <Container>
        <motion.p
          className="eyebrow mb-8 text-umber md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.8, 0.2)}
        >
          {eyebrow}
        </motion.p>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <RevealText
              as="h1"
              lines={lines}
              trigger="mount"
              delay={0.3}
              className="font-display text-hero uppercase text-ink"
            />
          </div>
          {copy || aside ? (
            <motion.div
              className="flex flex-col gap-6 lg:col-span-4 lg:pb-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={transition(0.9, 0.8)}
            >
              {copy ? <p className="max-w-sm text-lead text-ink/65">{copy}</p> : null}
              {aside}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
