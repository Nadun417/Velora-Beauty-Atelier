"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/types";
import { cn, pad } from "@/lib/utils";
import { EASE, viewportOnce } from "@/lib/animations";

interface ArtistCardProps {
  artist: Artist;
  index: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Editorial portrait block. Hover reveals the artist's secondary image,
 * zooms subtly and fades in a "View Profile" label.
 */
export function ArtistCard({
  artist,
  index,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
}: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      data-cursor="PROFILE"
      className={cn("group block", className)}
      aria-label={`${artist.name}, ${artist.role} — view profile`}
    >
      <motion.div
        className={cn("relative bg-ink/5", imageClassName ?? "aspect-[3/4]")}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          variants={{
            hidden: { clipPath: "inset(0 0 100% 0)" },
            visible: {
              clipPath: "inset(0 0 0 0)",
              transition: { duration: 1.1, ease: EASE, delay: index * 0.08 },
            },
          }}
        >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: 1.15 },
            visible: { scale: 1, transition: { duration: 1.5, ease: EASE, delay: index * 0.08 } },
          }}
        >
          <Image
            src={artist.image}
            alt={`Portrait of ${artist.name}, ${artist.role} at Velora`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
          <Image
            src={artist.secondaryImage}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
          />
        </motion.div>
        </motion.div>

        <span className="eyebrow absolute left-4 top-4 text-ivory/90 mix-blend-difference">
          {pad(index + 1)}
        </span>

        <span
          aria-hidden
          className="eyebrow absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 bg-ivory px-3 py-2 text-ink opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
        >
          View Profile
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </span>
      </motion.div>

      <div className="mt-5 border-t border-line pt-4">
        <h3 className="font-display text-2xl uppercase leading-none tracking-[-0.01em] transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5 md:text-[1.75rem]">
          {artist.name}
        </h3>
        <p className="mt-2 text-[0.95rem] text-ink/70">{artist.role}</p>
        <p className="eyebrow mt-2 text-ink/45">{artist.specialties.join(" / ")}</p>
      </div>
    </Link>
  );
}
