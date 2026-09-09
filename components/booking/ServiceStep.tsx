"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { BookingCategory } from "@/types";
import { cn, formatDuration, formatPrice, pad } from "@/lib/utils";
import { staggerContainer, staggerItem, transition } from "@/lib/animations";
import { bookingCategories, getServicesByBookingCategory } from "@/data/services";
import { StepHeading } from "@/components/booking/StepHeading";

interface ServiceStepProps {
  category: BookingCategory | null;
  serviceId: string | null;
  onCategory: (category: BookingCategory) => void;
  onService: (id: string) => void;
}

export function ServiceStep({ category, serviceId, onCategory, onService }: ServiceStepProps) {
  const options = category ? getServicesByBookingCategory(category) : [];

  return (
    <div>
      <StepHeading step={1} question={["WHAT ARE", "WE DOING?"]} />

      <div role="radiogroup" aria-label="Service category" className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {bookingCategories.map((option) => {
          const selected = category === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onCategory(option.id)}
              className={cn(
                "group flex min-h-[7.5rem] flex-col justify-between rounded-xs border p-4 text-left transition-[background-color,border-color,color] duration-500 ease-out-expo md:min-h-[9rem] md:p-5",
                selected
                  ? "border-ink bg-ink text-ivory"
                  : "border-line bg-transparent text-ink hover:border-ink",
              )}
            >
              <span className="font-display text-2xl uppercase leading-none md:text-3xl">{option.label}</span>
              <span className={cn("text-[0.8rem]", selected ? "text-ivory/65" : "text-ink/55")}>{option.hint}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {category ? (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, pointerEvents: "auto" }}
            exit={{ opacity: 0, y: -8, pointerEvents: "none" }}
            transition={transition(0.45)}
            className="mt-12"
          >
            <p className="eyebrow text-ink/50">Choose a service</p>
            <motion.ul
              role="radiogroup"
              aria-label="Service"
              className="mt-4 border-t border-line"
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="visible"
            >
              {options.map((service, index) => {
                const selected = serviceId === service.id;
                return (
                  <motion.li key={service.id} variants={staggerItem} className="border-b border-line">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => onService(service.id)}
                      className={cn(
                        "group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 py-5 text-left transition-colors duration-500 md:grid-cols-[3rem_1fr_6rem_8rem_2.5rem] md:gap-6",
                        selected ? "text-ink" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      <span className="eyebrow text-umber">{pad(index + 1)}</span>
                      <span>
                        <span
                          className={cn(
                            "block font-display text-2xl uppercase leading-none transition-transform duration-600 ease-out-expo md:text-3xl",
                            selected ? "translate-x-1.5" : "group-hover:translate-x-1.5",
                          )}
                        >
                          {service.name}
                        </span>
                        <span className="mt-2 block text-[0.75rem] uppercase tracking-[0.18em] text-ink/45 md:hidden">
                          {formatDuration(service.duration)} · From {formatPrice(service.price)}
                        </span>
                      </span>
                      <span className="eyebrow hidden text-ink/55 md:block">{formatDuration(service.duration)}</span>
                      <span className="eyebrow hidden md:block">From {formatPrice(service.price)}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full border transition-[background-color,border-color] duration-500",
                          selected ? "border-ink bg-ink text-ivory" : "border-ink/25",
                        )}
                      >
                        <Check className={cn("size-3.5 transition-opacity", selected ? "opacity-100" : "opacity-0")} strokeWidth={2} />
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
