"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn, pad } from "@/lib/utils";
import { transition } from "@/lib/animations";

export const BOOKING_STEPS = ["Service", "Artist", "Date", "Details", "Done"] as const;

interface ProgressIndicatorProps {
  current: number;
}

export function ProgressIndicator({ current }: ProgressIndicatorProps) {
  const total = BOOKING_STEPS.length;
  const progress = (current - 1) / (total - 1);

  return (
    <div aria-label={`Booking progress: step ${current} of ${total}`} role="group">
      <ol className="hidden grid-cols-5 gap-4 md:grid">
        {BOOKING_STEPS.map((label, index) => {
          const number = index + 1;
          const state = number < current ? "complete" : number === current ? "current" : "upcoming";
          return (
            <li
              key={label}
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "eyebrow flex items-center gap-3 transition-colors duration-500",
                state === "upcoming" ? "text-ink/35" : "text-ink",
              )}
            >
              <span className="flex size-5 items-center justify-center">
                {state === "complete" ? (
                  <Check className="size-3.5" strokeWidth={2} aria-hidden />
                ) : (
                  <span>{pad(number)}</span>
                )}
              </span>
              <span>{label}</span>
            </li>
          );
        })}
      </ol>

      <p className="eyebrow flex items-center justify-between text-ink md:hidden">
        <span>
          {pad(current)} — {BOOKING_STEPS[current - 1]}
        </span>
        <span className="text-ink/45">
          Step {current} of {total}
        </span>
      </p>

      <div className="mt-4 h-px w-full bg-ink/15">
        <motion.div
          className="h-px origin-left bg-ink"
          initial={false}
          animate={{ scaleX: Math.max(progress, 0.02) }}
          transition={transition(0.8)}
        />
      </div>
    </div>
  );
}
