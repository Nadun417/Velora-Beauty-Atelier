"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, pad } from "@/lib/utils";
import { fadeUp, transition, viewportOnce } from "@/lib/animations";
import { useMediaQuery } from "@/lib/hooks";
import { philosophySteps } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/motion/RevealText";

/**
 * Split-screen philosophy. Desktop: hovering a step swaps the image and copy
 * in the sticky left column. Mobile: the list becomes a tap accordion.
 */
export function Philosophy() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeId, setActiveId] = useState<string | null>(philosophySteps[0].id);
  const active =
    philosophySteps.find((step) => step.id === activeId) ?? (isDesktop ? philosophySteps[0] : null);

  const select = (id: string) => {
    setActiveId((current) => (current === id && !isDesktop ? null : id));
  };

  return (
    <section className="border-t border-line bg-cream py-section">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <motion.p
            className="eyebrow mb-8 text-umber"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            05 — Philosophy
          </motion.p>
          <RevealText
            as="h2"
            lines={["LESS TREND.", "MORE YOU."]}
            className="font-display text-display uppercase text-ink"
          />

          <div className="mt-12 hidden lg:block">
            <div className="relative aspect-[4/5] h-[min(46vh,28rem)] w-auto max-w-full overflow-hidden bg-ink/5">
              <AnimatePresence mode="popLayout" initial={false}>
                {active ? (
                  <motion.div
                    key={active.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition(0.8)}
                  >
                    <Image
                      src={active.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 0px"
                      className="object-cover"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-6 lg:col-start-7">
          {philosophySteps.map((step, index) => {
            const isActive = active?.id === step.id;
            const panelId = `philosophy-${step.id}`;
            return (
              <li key={step.id} className="border-t border-line last:border-b">
                <button
                  type="button"
                  id={`${panelId}-trigger`}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => select(step.id)}
                  onMouseEnter={() => {
                    if (isDesktop) setActiveId(step.id);
                  }}
                  onFocus={() => {
                    if (isDesktop) setActiveId(step.id);
                  }}
                  className="flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-8"
                >
                  <span
                    className={cn(
                      "eyebrow w-7 shrink-0 transition-colors duration-500",
                      isActive ? "text-umber" : "text-ink/35",
                    )}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[clamp(2.25rem,5vw,4.25rem)] uppercase leading-none tracking-[-0.01em] transition-[color,transform] duration-600 ease-out-expo",
                      isActive ? "translate-x-1 text-ink" : "text-ink/30",
                    )}
                  >
                    {step.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto hidden h-px w-10 origin-right bg-ink transition-transform duration-600 ease-out-expo lg:block",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto text-2xl font-light leading-none transition-transform duration-500 ease-out-expo lg:hidden",
                      isActive && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>

                <div id={panelId} role="region" aria-labelledby={`${panelId}-trigger`}>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={transition(0.5)}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 pl-12 sm:grid-cols-[1fr_120px] md:pl-[3.75rem] lg:grid-cols-1">
                          <p className="max-w-md text-ink/70 lg:text-lead">{step.description}</p>
                          <div className="relative hidden aspect-[3/4] overflow-hidden sm:block lg:hidden">
                            <Image src={step.image} alt="" fill sizes="120px" className="object-cover" />
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
