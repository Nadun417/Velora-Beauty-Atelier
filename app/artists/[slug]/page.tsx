import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getAdjacentArtists, getArtistBySlug } from "@/data/artists";
import { getServiceBySlug } from "@/data/services";
import { formatDuration, formatPrice, pad } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { ArtistNav } from "@/components/artists/ArtistNav";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return { title: "Artist not found" };
  return {
    title: `${artist.name}, ${artist.role}`,
    description: artist.intro,
    openGraph: { images: [{ url: artist.image, alt: `Portrait of ${artist.name}` }] },
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const { previous, next } = getAdjacentArtists(artist.slug);
  const services = artist.availableServices
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service) => service !== undefined);

  return (
    <article>
      <section className="pb-section-sm pt-32 md:pt-40">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ImageReveal
              src={artist.image}
              alt={`Portrait of ${artist.name}, ${artist.role} at Velora`}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="aspect-[4/5]"
              priority
            />
          </div>

          <div className="flex flex-col justify-end lg:col-span-5 lg:pl-8">
            <p className="eyebrow text-umber">{artist.role}</p>
            <RevealText
              as="h1"
              lines={artist.name.split(" ")}
              trigger="mount"
              delay={0.2}
              className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.92] tracking-[-0.02em] text-ink"
            />
            <p className="mt-8 max-w-md text-lead text-ink/70">{artist.intro}</p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="eyebrow text-ink/45">Specialties</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {artist.specialties.map((item) => (
                    <span key={item} className="eyebrow border border-line px-3 py-2 text-ink/80">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/45">Experience</dt>
                <dd className="mt-3 font-display text-3xl">{artist.experience}</dd>
              </div>
            </dl>

            <div className="mt-10">
              <Button href={`/book?artist=${artist.slug}`} cursorLabel="BOOK">
                Book with {artist.firstName}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-section-sm">
        <Container className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-umber lg:col-span-3">About</p>
          <p className="max-w-prose text-lead text-ink/75 lg:col-span-8 lg:col-start-5">{artist.biography}</p>
        </Container>
      </section>

      <section className="dark-section bg-ink py-section text-ivory">
        <Container className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-ivory/50 lg:col-span-3">Philosophy</p>
          <blockquote className="max-w-4xl font-display text-[clamp(1.75rem,3.6vw,3.5rem)] italic leading-[1.15] text-ivory lg:col-span-9">
            “{artist.philosophy}”
          </blockquote>
        </Container>
      </section>

      <section className="py-section">
        <Container>
          <SectionHeading eyebrow="Selected work" lines={["RECENT", "WORK"]} size="title" />
          <ul className="mt-14 grid gap-8 md:grid-cols-12 md:gap-6">
            {artist.featuredWork.map((work, index) => (
              <li
                key={work.title}
                className={
                  index === 0
                    ? "md:col-span-6"
                    : index === 1
                      ? "md:col-span-3 md:mt-20"
                      : "md:col-span-3 md:mt-40"
                }
              >
                <ImageReveal
                  src={work.image}
                  alt={`${work.title} by ${artist.name}`}
                  sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                  className={index === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}
                  delay={index * 0.1}
                />
                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                  <p className="font-display text-xl uppercase leading-none">{work.title}</p>
                  <p className="eyebrow text-ink/45">{work.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line py-section-sm">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-umber">Book with {artist.firstName}</p>
            <h2 className="mt-4 font-display text-title uppercase">Available services</h2>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {services.map((service, index) => (
              <li key={service.id} className="border-b border-line">
                <Link
                  href={`/services#${service.slug}`}
                  className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 py-5 md:grid-cols-[3rem_1fr_7rem_9rem] md:gap-8"
                >
                  <span className="eyebrow text-umber">{pad(index + 1)}</span>
                  <span className="font-display text-2xl uppercase leading-none transition-transform duration-600 ease-out-expo group-hover:translate-x-1.5">
                    {service.name}
                  </span>
                  <span className="eyebrow text-ink/60 md:text-left">{formatDuration(service.duration)}</span>
                  <span className="eyebrow hidden text-ink md:block">From {formatPrice(service.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {previous && next ? <ArtistNav previous={previous} next={next} /> : null}
    </article>
  );
}
