"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { artists } from "@/data/artists";
import { StepHeading } from "@/components/booking/StepHeading";

export const NO_PREFERENCE = "none";

interface ArtistStepProps {
  serviceSlug: string | null;
  artistId: string | null;
  onSelect: (id: string) => void;
}

export function ArtistStep({ serviceSlug, artistId, onSelect }: ArtistStepProps) {
  const eligible = artists.filter(
    (artist) => artist.bookable && (!serviceSlug || artist.availableServices.includes(serviceSlug)),
  );
  const options = eligible.length > 0 ? eligible : artists.filter((artist) => artist.bookable);

  return (
    <div>
      <StepHeading
        step={2}
        question={["WHO WOULD", "YOU LIKE", "TO SEE?"]}
        hint="Only artists who work in this service are shown. No preference means the first available artist."
      />

      <motion.div
        role="radiogroup"
        aria-label="Artist"
        className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3"
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="visible"
      >
        {options.map((artist) => {
          const selected = artistId === artist.id;
          return (
            <motion.button
              key={artist.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(artist.id)}
              variants={staggerItem}
              className={cn(
                "group flex flex-col rounded-xs border p-2 text-left transition-[border-color,background-color] duration-500 ease-out-expo md:p-3",
                selected ? "border-ink bg-cream" : "border-line hover:border-ink",
              )}
            >
              <span className="relative block aspect-[3/4] w-full overflow-hidden bg-ink/5">
                <Image
                  src={artist.image}
                  alt={`Portrait of ${artist.name}`}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className={cn(
                    "object-cover transition-transform duration-[1.2s] ease-out-expo",
                    selected ? "scale-[1.03]" : "group-hover:scale-[1.03]",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-ivory text-ink transition-[opacity,transform] duration-500 ease-out-expo",
                    selected ? "scale-100 opacity-100" : "scale-75 opacity-0",
                  )}
                >
                  <Check className="size-4" strokeWidth={2} />
                </span>
              </span>
              <span className="mt-4 block px-1 pb-2">
                <span className="block font-display text-xl uppercase leading-none md:text-2xl">{artist.name}</span>
                <span className="mt-2 block text-[0.85rem] text-ink/60">{artist.role}</span>
                <span className="eyebrow mt-2 block text-ink/40">{artist.specialties.join(" / ")}</span>
              </span>
            </motion.button>
          );
        })}

        <motion.button
          type="button"
          role="radio"
          aria-checked={artistId === NO_PREFERENCE}
          onClick={() => onSelect(NO_PREFERENCE)}
          variants={staggerItem}
          className={cn(
            "group flex min-h-[12rem] flex-col justify-between rounded-xs border p-5 text-left transition-[border-color,background-color,color] duration-500 ease-out-expo",
            artistId === NO_PREFERENCE ? "border-ink bg-ink text-ivory" : "border-line text-ink hover:border-ink",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "flex size-8 items-center justify-center rounded-full border transition-colors duration-500",
              artistId === NO_PREFERENCE ? "border-ivory/40" : "border-ink/25",
            )}
          >
            <Check
              className={cn("size-4 transition-opacity", artistId === NO_PREFERENCE ? "opacity-100" : "opacity-0")}
              strokeWidth={2}
            />
          </span>
          <span>
            <span className="block font-display text-2xl uppercase leading-none md:text-3xl">No Preference</span>
            <span className={cn("mt-2 block text-[0.85rem]", artistId === NO_PREFERENCE ? "text-ivory/65" : "text-ink/55")}>
              We will match you with the first available artist.
            </span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
