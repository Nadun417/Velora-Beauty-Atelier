"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { transition } from "@/lib/animations";
import { heroContent } from "@/data/home";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { FluidButton } from "@/components/ui/FluidButton";
import { Grain } from "@/components/ui/Grain";
import { RevealText } from "@/components/motion/RevealText";

const LOADER_KEY = "velora:loader-seen";

/**
 * Hero. A full-bleed editorial video with the headline in ivory over a soft
 * dark scrim, finished with a subtle film-grain overlay. Under reduced motion
 * the video is replaced by its poster still.
 */
export function Hero() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const seen = window.sessionStorage.getItem(LOADER_KEY) === "1";
    const delay = seen ? 150 : 1100;
    const timer = window.setTimeout(() => {
      setShowLoader(false);
      setReady(true);
      window.sessionStorage.setItem(LOADER_KEY, "1");
    }, delay);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="dark-section relative flex min-h-svh items-end overflow-hidden bg-ink text-ivory">
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            aria-hidden
            className="absolute inset-0 z-30 flex items-center justify-center bg-ink text-ivory"
            exit={{ clipPath: "inset(0 0 100% 0)", transition: transition(0.9) }}
          >
            <motion.p
              className="font-display text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-[0.2em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.9, 0.1)}
            >
              {site.name}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
        transition={{ scale: transition(2.2), opacity: transition(1) }}
      >
        {reduced ? (
          <Image
            src={heroContent.poster}
            alt={heroContent.imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[50%_30%]"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-[50%_30%]"
            autoPlay
            muted
            loop
            playsInline
            poster={heroContent.poster.src}
            aria-label={heroContent.imageAlt}
          >
            <source src={heroContent.video} type="video/mp4" />
          </video>
        )}

        {/* Legibility: darker toward the bottom-left where the headline sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </motion.div>

      <Grain opacity={0.13} />

      <Container className="relative z-20 pb-12 pt-40 md:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <RevealText
              as="h1"
              lines={heroContent.lines}
              trigger="manual"
              visible={ready}
              delay={0.25}
              stagger={0.12}
              className="font-display text-hero uppercase text-ivory"
            />
          </div>

          <motion.div
            className="flex flex-col gap-8 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={transition(0.9, 0.8)}
          >
            <p className="max-w-xs text-lead text-ivory/80">{heroContent.copy}</p>
            <div className="flex flex-wrap items-center gap-4">
              <FluidButton href="#manifesto" tone="ivory">
                Discover Velora
              </FluidButton>
              <FluidButton href="/book" tone="ivory" cursorLabel="BOOK">
                Book an Appointment
              </FluidButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 flex items-center justify-between border-t border-line-light pt-5 text-ivory/60"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={transition(0.8, 1.2)}
        >
          <a href="#manifesto" className="eyebrow flex items-center gap-3">
            Scroll
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-ivory/20">
              <motion.span
                className="absolute inset-x-0 top-0 block h-1/2 bg-ivory"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </a>
          <p className="eyebrow hidden sm:block">
            {site.city} · {site.descriptor}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
