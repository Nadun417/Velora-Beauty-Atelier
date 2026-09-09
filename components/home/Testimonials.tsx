"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pad } from "@/lib/utils";
import { fadeUp, transition, viewportOnce } from "@/lib/animations";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";

const controlClass =
  "flex size-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-500 ease-out-expo hover:border-ink hover:bg-ink hover:text-ivory";

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const current = testimonials[index];

  const go = (step: number) => {
    setState(([currentIndex]) => [
      (currentIndex + step + testimonials.length) % testimonials.length,
      step,
    ]);
  };

  return (
    <section className="border-t border-line py-section" aria-labelledby="testimonials-heading">
      <Container>
        <motion.div
          className="flex items-center justify-between"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 id="testimonials-heading" className="eyebrow font-sans text-umber">
            06 — Voices
          </h2>
          <p className="eyebrow tabular-nums text-ink/45" aria-hidden>
            {pad(index + 1)} / {pad(testimonials.length)}
          </p>
        </motion.div>

        <div className="mt-14 min-h-[11rem] md:mt-20 md:min-h-[15rem] lg:min-h-[18rem]" aria-live="polite">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 28 : -28 }}
              animate={{ opacity: 1, y: 0, transition: transition(0.7) }}
              exit={{ opacity: 0, y: direction > 0 ? -20 : 20, transition: transition(0.35) }}
              className="max-w-5xl"
            >
              <blockquote className="font-display text-[clamp(1.9rem,4.4vw,4.5rem)] uppercase leading-[1.04] tracking-[-0.015em] text-ink">
                “{current.quote}”
              </blockquote>
              <figcaption className="eyebrow mt-8 text-ink/55 md:mt-10">
                — {current.author}, {current.location}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <button
            type="button"
            className={controlClass}
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={controlClass}
            onClick={() => go(1)}
            aria-label="Next testimonial"
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </Container>
    </section>
  );
}
