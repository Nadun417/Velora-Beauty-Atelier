"use client";

import { useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Service } from "@/types";
import { cn, formatDuration, formatPrice, pad } from "@/lib/utils";
import { transition } from "@/lib/animations";
import { Button } from "@/components/ui/Button";

interface ServiceAccordionProps {
  services: Service[];
  openId: string | null;
  onToggle: (id: string | null) => void;
}

/**
 * Premium accordion rows. One row open at a time, animated height, full
 * keyboard support (Enter/Space toggle, Arrow keys move between rows,
 * Home/End jump).
 */
export function ServiceAccordion({ services, openId, onToggle }: ServiceAccordionProps) {
  const triggersRef = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const triggers = triggersRef.current.filter(Boolean) as HTMLButtonElement[];
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: triggers.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    triggers[(next + triggers.length) % triggers.length]?.focus();
  };

  return (
    <ul className="border-t border-line">
      <AnimatePresence initial={false} mode="popLayout">
        {services.map((service, index) => {
          const open = openId === service.id;
          const panelId = `service-panel-${service.slug}`;
          const triggerId = `service-trigger-${service.slug}`;
          return (
            <motion.li
              key={service.id}
              id={service.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition(0.45)}
              className="scroll-mt-32 border-b border-line"
            >
              <h3>
                <button
                  ref={(node) => {
                    triggersRef.current[index] = node;
                  }}
                  type="button"
                  id={triggerId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => onToggle(open ? null : service.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[3rem_1fr_7rem_9rem_auto] md:gap-8 md:py-8"
                >
                  <span className="eyebrow text-umber">{pad(index + 1)}</span>
                  <span
                    className={cn(
                      "font-display text-[clamp(1.6rem,3vw,2.75rem)] uppercase leading-none tracking-[-0.01em] transition-transform duration-600 ease-out-expo",
                      open ? "translate-x-1.5" : "group-hover:translate-x-1.5",
                    )}
                  >
                    {service.name}
                    <span className="mt-2 block font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink/50 md:hidden">
                      {formatDuration(service.duration)} · From {formatPrice(service.price)}
                    </span>
                  </span>
                  <span className="eyebrow hidden text-ink/60 md:block">{formatDuration(service.duration)}</span>
                  <span className="eyebrow hidden text-ink md:block">From {formatPrice(service.price)}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border border-ink/25 transition-[transform,background-color,color] duration-500 ease-out-expo",
                      open ? "rotate-45 bg-ink text-ivory" : "group-hover:border-ink",
                    )}
                  >
                    <Plus className="size-4" strokeWidth={1.25} />
                  </span>
                </button>
              </h3>

              <div id={panelId} role="region" aria-labelledby={triggerId}>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition(0.55)}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-10 pb-10 md:grid-cols-12 md:gap-8 md:pb-12 md:pl-[5rem]">
                        <div className="md:col-span-6">
                          <p className="max-w-md text-ink/75">{service.description}</p>
                          <p className="eyebrow mt-8 text-umber">Who it suits</p>
                          <p className="mt-3 max-w-md text-ink/75">{service.suits}</p>
                        </div>
                        <div className="md:col-span-3">
                          <p className="eyebrow text-umber">What&apos;s included</p>
                          <ul className="mt-3 flex flex-col gap-2 text-[0.95rem] text-ink/75">
                            {service.includes.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-ink/40" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-6 md:col-span-3">
                          <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4 md:grid-cols-1">
                            <div>
                              <dt className="eyebrow text-ink/45">Estimated duration</dt>
                              <dd className="mt-2 font-display text-2xl">{formatDuration(service.duration)}</dd>
                            </div>
                            <div>
                              <dt className="eyebrow text-ink/45">Starting price</dt>
                              <dd className="mt-2 font-display text-2xl">{formatPrice(service.price)}</dd>
                            </div>
                          </dl>
                          <div>
                            <Button href={`/book?service=${service.slug}`} size="sm" cursorLabel="BOOK">
                              Book This Service
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
