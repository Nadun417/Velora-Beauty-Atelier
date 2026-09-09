"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { bookingCta } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";

/**
 * Dark closing call to action. Hovering the button inverts the whole
 * section (ink -> ivory) via :has(), a quiet but memorable interaction.
 */
export function BookingCTA() {
  return (
    <section className="dark-section group relative overflow-hidden bg-ink py-section text-ivory transition-colors duration-700 ease-out-expo has-[a:hover]:bg-ivory has-[a:hover]:text-ink">
      <div aria-hidden className="absolute inset-0 opacity-[0.16] transition-opacity duration-700 group-has-[a:hover]:opacity-0">
        <Image
          src={bookingCta.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>

      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <RevealText
            as="h2"
            lines={bookingCta.lines}
            className="font-display text-[clamp(3rem,8.5vw,9rem)] uppercase leading-[0.92] tracking-[-0.02em]"
          />
        </div>
        <motion.div
          className="flex flex-col gap-8 lg:col-span-4 lg:pb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="max-w-xs text-lead opacity-70">{bookingCta.copy}</p>
          <div>
            <Button
              href="/book"
              variant="dark"
              size="lg"
              cursorLabel="BOOK"
              className="hover:border-ink hover:bg-ink hover:text-ivory"
            >
              Book Your Visit
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
