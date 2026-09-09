"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pad } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useMediaQuery } from "@/lib/hooks";
import { lookbook } from "@/data/home";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";

/**
 * The Velora Edit.
 * Desktop: the section is tall and its content is sticky, so vertical scroll
 * drives the track horizontally. Mobile/tablet: a native, snap-aligned
 * horizontal swipe gallery with no scroll hijacking.
 */
export function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -distance : 0]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  useEffect(() => {
    if (!isDesktop) return;
    const track = trackRef.current;
    if (!track) return;

    // ResizeObserver fires once on observe(), which handles the initial measurement.
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="lookbook-heading"
      className="relative border-t border-line bg-cream lg:h-[340vh]"
    >
      <div className="py-section lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        {/* Tablet / mobile: intro stacks above the swipe gallery. */}
        <div className="px-gutter lg:hidden">
          <LookbookIntro headingId="lookbook-heading" />
          <div className="mt-10 flex items-center justify-between border-t border-line pt-4">
            <p className="eyebrow text-ink/45">Swipe to explore</p>
            <p className="eyebrow tabular-nums text-ink/45">
              {pad(lookbook.length)} looks
            </p>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-4 scroll-px-gutter sm:gap-6 lg:mt-0 lg:snap-none lg:gap-12 lg:overflow-visible lg:pb-0"
        >
          {/* Desktop: intro rides inside the horizontal track. */}
          <div className="hidden w-[30vw] shrink-0 lg:flex">
            <LookbookIntro />
          </div>

          {lookbook.map((item, index) => (
            <article
              key={item.id}
              className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-[38vw] lg:w-[28vw] xl:w-[24vw]"
            >
              <ImageReveal
                src={item.image}
                alt={`${item.title} — ${item.category} hair look photographed at Velora`}
                sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 28vw, (min-width: 768px) 38vw, (min-width: 640px) 46vw, 72vw"
                className="aspect-[3/4]"
                delay={isDesktop ? 0 : Math.min(index, 1) * 0.08}
              />
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <div>
                  <p className="eyebrow text-umber">{pad(index + 1)}</p>
                  <h3 className="mt-2 font-display text-2xl uppercase leading-none tracking-[-0.01em] md:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <p className="eyebrow whitespace-nowrap text-ink/50">
                  {item.category} / {item.year}
                </p>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mt-10 hidden px-gutter lg:block">
          <div className="h-px w-full bg-ink/10">
            <motion.div className="h-px origin-left bg-ink" style={{ scaleX: progressScale }} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface LookbookIntroProps {
  /** Only the visible-by-default (mobile) instance carries the heading id. */
  headingId?: string;
}

function LookbookIntro({ headingId }: LookbookIntroProps) {
  return (
    <div className="flex w-full flex-col justify-between">
      <div>
        <motion.p
          className="eyebrow mb-8 text-umber"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          03 — Lookbook
        </motion.p>
        <RevealText
          as="h2"
          id={headingId}
          lines={["THE", "VELORA", "EDIT"]}
          className="font-display text-display uppercase text-ink"
        />
      </div>
      <motion.p
        className="mt-8 max-w-xs text-ink/65 lg:mt-0"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        A selection of recent work from the atelier. Every shape here was cut, coloured and finished
        for the person wearing it.
      </motion.p>
    </div>
  );
}
