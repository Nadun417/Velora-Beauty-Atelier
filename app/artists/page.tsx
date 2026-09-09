import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ArtistGrid } from "@/components/artists/ArtistGrid";
import { artists } from "@/data/artists";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Meet the people behind the craft at Velora: a creative director, colour director, senior stylist and beauty specialist with individual perspectives and shared standards.",
};

export default function ArtistsPage() {
  return (
    <>
      <PageHero
        eyebrow="Artists"
        lines={["PEOPLE", "BEHIND", "THE CRAFT."]}
        copy="Individual perspectives. Shared standards."
        aside={
          <p className="eyebrow text-ink/45">
            {artists.length} artists · Colombo atelier
          </p>
        }
      />
      <ArtistGrid />
    </>
  );
}
