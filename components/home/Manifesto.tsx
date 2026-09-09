"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { manifesto } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/motion/RevealText";

export function Manifesto() {
  return (
    <section id="manifesto" className="scroll-mt-20 py-section">
      <Container className="text-center">
        <motion.p
          className="eyebrow mb-10 text-umber md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          01 — Manifesto
        </motion.p>
        <RevealText
          as="h2"
          text={manifesto.statement}
          mode="word"
          stagger={0.05}
          duration={0.9}
          className="mx-auto max-w-[22ch] font-display text-[clamp(2.4rem,5.6vw,6rem)] leading-[1.02] tracking-[-0.02em] text-ink"
        />
        <motion.p
          className="mx-auto mt-10 max-w-md text-lead text-ink/65 md:mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {manifesto.copy}
        </motion.p>
      </Container>
    </section>
  );
}
