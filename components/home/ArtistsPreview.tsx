"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { artists } from "@/data/artists";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArtistCard } from "@/components/artists/ArtistCard";

export function ArtistsPreview() {
  return (
    <section className="border-t border-line py-section">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="04 — The team" lines={["MEET THE HANDS", "BEHIND THE WORK"]} />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:pb-3"
          >
            <Button href="/artists" variant="text">
              Meet the Team
            </Button>
          </motion.div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-24 md:gap-x-6 lg:grid-cols-4">
          {artists.map((artist, index) => (
            <li key={artist.id} className={cn(index % 2 === 1 && "lg:mt-20")}>
              <ArtistCard artist={artist} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
