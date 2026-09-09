import { artists } from "@/data/artists";
import { Container } from "@/components/ui/Container";
import { ArtistCard } from "@/components/artists/ArtistCard";

/**
 * Asymmetric editorial team grid. Portrait sizes and vertical offsets vary
 * per position so the page reads as a composed spread rather than a roster.
 */
const layout = [
  { className: "md:col-span-7", image: "aspect-[4/5]", sizes: "(min-width: 768px) 56vw, 100vw" },
  { className: "md:col-span-5 md:mt-32", image: "aspect-[3/4]", sizes: "(min-width: 768px) 40vw, 100vw" },
  { className: "md:col-span-5 md:col-start-2 md:-mt-16", image: "aspect-[3/4]", sizes: "(min-width: 768px) 40vw, 100vw" },
  { className: "md:col-span-6 md:col-start-7 md:mt-24", image: "aspect-[4/5]", sizes: "(min-width: 768px) 48vw, 100vw" },
];

export function ArtistGrid() {
  return (
    <section className="pb-section">
      <Container>
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-12 md:gap-y-8">
          {artists.map((artist, index) => {
            const config = layout[index % layout.length];
            return (
              <li key={artist.id} className={config.className}>
                <ArtistCard
                  artist={artist}
                  index={index}
                  imageClassName={config.image}
                  sizes={config.sizes}
                  priority={index === 0}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
