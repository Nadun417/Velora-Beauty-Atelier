"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { signatureServices } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";

export function ServicesPreview() {
  return (
    <section className="border-t border-line py-section">
      <Container>
        <SectionHeading eyebrow="02 — Signature services" lines={["SIGNATURE", "SERVICES"]} />

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28 lg:gap-36">
          {signatureServices.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <Link
                key={service.id}
                href={service.href}
                data-cursor="VIEW"
                className="group grid items-center gap-8 md:grid-cols-12 md:gap-10"
                aria-label={`${service.label}: ${service.title} — explore service`}
              >
                <div
                  className={cn(
                    "relative md:col-span-7",
                    reversed ? "md:order-2 md:col-start-6" : "md:col-start-1",
                  )}
                >
                  <ImageReveal
                    src={service.image}
                    alt={service.imageAlt}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="aspect-[4/5] md:aspect-[5/4]"
                    hoverZoom
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 ease-out-expo group-hover:bg-ink/10"
                  />
                </div>

                <motion.div
                  className={cn(
                    "md:col-span-4",
                    reversed ? "md:order-1 md:col-start-1" : "md:col-start-9",
                  )}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <p className="eyebrow text-umber">
                    {service.index} — {service.label}
                  </p>
                  <h3 className="mt-6 font-display text-title text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
                    {service.title}
                  </h3>
                  <p className="mt-6 max-w-sm text-ink/65">{service.description}</p>
                  <span className="mt-8 inline-flex items-center gap-4 text-[0.95rem] text-ink">
                    <span className="link-underline">Explore Service</span>
                    <span
                      aria-hidden
                      className="relative flex h-2.5 w-8 items-center transition-[width] duration-500 ease-out-expo group-hover:w-12"
                    >
                      <span className="block h-px w-full bg-current" />
                      <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-current" />
                    </span>
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
