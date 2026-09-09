"use client";

import { motion } from "framer-motion";
import type { ServiceCategory } from "@/types";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/animations";
import { serviceCategories } from "@/data/services";

export type FilterValue = ServiceCategory | "all";

interface ServiceFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

/** Category tabs with a shared-layout active indicator. */
export function ServiceFilter({ value, onChange, counts }: ServiceFilterProps) {
  return (
    <div className="no-scrollbar -mx-gutter overflow-x-auto px-gutter">
      <div role="group" aria-label="Filter services by category" className="flex min-w-max gap-8 border-b border-line md:gap-12">
        {serviceCategories.map((category) => {
          const active = value === category.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(category.id)}
              className={cn(
                "eyebrow relative flex min-h-11 items-start gap-2 pb-4 pt-2 transition-colors duration-500 ease-out-expo",
                active ? "text-ink" : "text-ink/45 hover:text-ink",
              )}
            >
              <span>{category.label}</span>
              <span className="text-[0.6rem] tabular-nums text-ink/40">{counts[category.id]}</span>
              {active ? (
                <motion.span
                  layoutId="service-filter-indicator"
                  className="absolute inset-x-0 -bottom-px h-px bg-ink"
                  transition={transition(0.6)}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
