"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/animations";
import {
  BOOKING_WINDOW_DAYS,
  TIME_SLOTS,
  WEEKDAYS,
  addDays,
  addMonths,
  formatLongDate,
  formatTime12,
  getMonthCells,
  getSlotAvailability,
  isDateBookable,
  monthLabel,
  startOfToday,
  toISODate,
} from "@/lib/booking";
import { StepHeading } from "@/components/booking/StepHeading";

interface DateStepProps {
  date: string | null;
  time: string | null;
  artistId: string | null;
  onDate: (iso: string) => void;
  onTime: (time: string) => void;
}

export function DateStep({ date, time, artistId, onDate, onTime }: DateStepProps) {
  const today = useMemo(() => startOfToday(), []);
  const firstMonth = useMemo(() => new Date(today.getFullYear(), today.getMonth(), 1), [today]);
  const lastMonth = useMemo(() => {
    const limit = addDays(today, BOOKING_WINDOW_DAYS);
    return new Date(limit.getFullYear(), limit.getMonth(), 1);
  }, [today]);

  const [month, setMonth] = useState(() => (date ? addMonths(new Date(date), 0) : firstMonth));
  const cells = useMemo(() => getMonthCells(month.getFullYear(), month.getMonth()), [month]);

  const canGoBack = month > firstMonth;
  const canGoForward = month < lastMonth;
  const availability = date ? getSlotAvailability(date, artistId) : null;

  return (
    <div>
      <StepHeading
        step={3}
        question={["WHEN", "SUITS YOU?"]}
        hint="We are open Monday to Saturday, 08:00 to 20:00. Sundays are for rest."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-display text-2xl uppercase tracking-[0.04em] md:text-3xl">{monthLabel(month)}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous month"
                disabled={!canGoBack}
                onClick={() => setMonth((current) => addMonths(current, -1))}
                className="flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!canGoForward}
                onClick={() => setMonth((current) => addMonths(current, 1))}
                className="flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div role="grid" aria-label={`Calendar, ${monthLabel(month)}`} className="mt-4">
            <div role="row" className="grid grid-cols-7">
              {WEEKDAYS.map((weekday) => (
                <span key={weekday} role="columnheader" className="eyebrow py-3 text-center text-ink/40">
                  {weekday}
                </span>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={month.toISOString()}
                role="row"
                className="grid grid-cols-7 gap-y-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={transition(0.35)}
              >
                {cells.map((cell, index) => {
                  if (!cell) return <span key={`empty-${index}`} role="gridcell" aria-hidden />;
                  const iso = toISODate(cell);
                  const bookable = isDateBookable(cell, today);
                  const selected = date === iso;
                  const isToday = toISODate(today) === iso;
                  return (
                    <div key={iso} role="gridcell" className="flex justify-center">
                      <button
                        type="button"
                        disabled={!bookable}
                        aria-pressed={selected}
                        aria-label={cell.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                        onClick={() => onDate(iso)}
                        className={cn(
                          "relative flex size-11 items-center justify-center rounded-full font-sans text-[0.95rem] tabular-nums transition-[background-color,color] duration-400 ease-out-expo md:size-12",
                          selected
                            ? "bg-ink text-ivory"
                            : bookable
                              ? "text-ink hover:bg-ink/10"
                              : "text-ink/25 line-through decoration-ink/20",
                        )}
                      >
                        {cell.getDate()}
                        {isToday ? (
                          <span aria-hidden className="absolute bottom-1.5 size-1 rounded-full bg-umber" />
                        ) : null}
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-b border-line pb-4">
            <p className="eyebrow text-ink/50">Available times</p>
            <p className="mt-2 font-display text-2xl">{date ? formatLongDate(date) : "Select a date first"}</p>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={date ?? "none"}
              role="radiogroup"
              aria-label="Time"
              className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={transition(0.35)}
            >
              {TIME_SLOTS.map((slot) => {
                const open = availability ? availability[slot] : false;
                const selected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!open}
                    onClick={() => onTime(slot)}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-xs border px-4 font-sans text-[0.95rem] tabular-nums transition-[background-color,border-color,color] duration-400 ease-out-expo",
                      selected
                        ? "border-ink bg-ink text-ivory"
                        : open
                          ? "border-line text-ink hover:border-ink"
                          : "border-line-soft text-ink/30 line-through",
                    )}
                  >
                    <span>{formatTime12(slot)}</span>
                    <span className="eyebrow text-[0.6rem] opacity-60">{open ? "Open" : "Taken"}</span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
