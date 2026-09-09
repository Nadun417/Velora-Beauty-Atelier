import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Artist } from "@/types";
import { Container } from "@/components/ui/Container";

interface ArtistNavProps {
  previous: Artist;
  next: Artist;
}

const linkClass =
  "group flex min-h-[7rem] flex-col justify-between gap-6 py-8 transition-colors duration-500 ease-out-expo hover:bg-cream md:min-h-[10rem] md:py-10";

export function ArtistNav({ previous, next }: ArtistNavProps) {
  return (
    <nav aria-label="Other artists" className="border-t border-line">
      <Container className="grid md:grid-cols-2">
        <Link href={`/artists/${previous.slug}`} className={`${linkClass} md:border-r md:border-line md:pr-10`}>
          <span className="eyebrow flex items-center gap-3 text-ink/50">
            <ArrowLeft className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" strokeWidth={1.5} />
            Previous
          </span>
          <span>
            <span className="block font-display text-[clamp(1.75rem,3.5vw,3rem)] uppercase leading-none">{previous.name}</span>
            <span className="mt-2 block text-[0.9rem] text-ink/60">{previous.role}</span>
          </span>
        </Link>
        <Link href={`/artists/${next.slug}`} className={`${linkClass} border-t border-line md:items-end md:border-t-0 md:pl-10 md:text-right`}>
          <span className="eyebrow flex items-center gap-3 text-ink/50">
            Next
            <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block font-display text-[clamp(1.75rem,3.5vw,3rem)] uppercase leading-none">{next.name}</span>
            <span className="mt-2 block text-[0.9rem] text-ink/60">{next.role}</span>
          </span>
        </Link>
      </Container>
    </nav>
  );
}
