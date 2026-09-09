"use client";

import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import type { Artist, Service } from "@/types";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { buildIcs, formatLongDate, formatTime12 } from "@/lib/booking";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";

interface ConfirmationStepProps {
  service: Service;
  artist: Artist | null;
  date: string;
  time: string;
  name: string;
  email: string;
  onReset: () => void;
}

export function ConfirmationStep({ service, artist, date, time, name, email, onReset }: ConfirmationStepProps) {
  const artistLabel = artist ? `with ${artist.firstName}` : "with the first available artist";

  const addToCalendar = () => {
    const ics = buildIcs({
      title: `${service.name} at ${site.name}`,
      description: `${service.name} ${artistLabel}. ${site.address}.`,
      dateISO: date,
      time,
      durationMinutes: service.duration,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `velora-${date}-${time.replace(":", "")}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <p className="eyebrow text-umber">Confirmed</p>
      <RevealText
        as="h2"
        lines={["YOU'RE", "BOOKED."]}
        trigger="mount"
        delay={0.1}
        className="mt-4 font-display text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-ink"
      />

      <motion.div
        className="mt-12 grid gap-10 md:grid-cols-12"
        variants={staggerContainer(0.1, 0.5)}
        initial="hidden"
        animate="visible"
      >
        <motion.dl variants={staggerItem} className="grid gap-6 border-t border-line pt-6 md:col-span-7 md:grid-cols-2">
          <div>
            <dt className="eyebrow text-ink/45">Date</dt>
            <dd className="mt-2 font-display text-3xl leading-tight">{formatLongDate(date)}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink/45">Time</dt>
            <dd className="mt-2 font-display text-3xl leading-tight">{formatTime12(time)}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink/45">Service</dt>
            <dd className="mt-2 font-display text-3xl leading-tight">{service.name}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink/45">Artist</dt>
            <dd className="mt-2 font-display text-3xl leading-tight capitalize">{artistLabel}</dd>
          </div>
        </motion.dl>

        <motion.div variants={staggerItem} className="flex flex-col justify-between gap-8 border-t border-line pt-6 md:col-span-5">
          <p className="text-ink/70">
            Thank you, {name.split(" ")[0]}. A confirmation would normally be sent to{" "}
            <span className="text-ink">{email}</span>. Please arrive a few minutes early so we can begin with a
            conversation.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button type="button" onClick={addToCalendar} arrow="none" cursorLabel="SAVE">
              <span className="flex items-center gap-3">
                <CalendarPlus className="size-4" strokeWidth={1.5} aria-hidden />
                Add to Calendar
              </span>
            </Button>
            <Button href="/" variant="text">
              Back to Home
            </Button>
          </div>
        </motion.div>

        <motion.p variants={staggerItem} className="text-[0.85rem] text-ink/45 md:col-span-12">
          This booking flow is a front-end prototype: nothing has been sent to the atelier and no data leaves your
          browser.{" "}
          <button type="button" onClick={onReset} className="link-underline text-ink/70 hover:text-ink">
            Book another visit
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
