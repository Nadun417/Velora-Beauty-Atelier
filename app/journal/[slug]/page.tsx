import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticleBySlug, journal } from "@/data/journal";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journal.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", images: [{ url: article.image, alt: article.title }] },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const index = journal.findIndex((item) => item.slug === article.slug);
  const next = journal[(index + 1) % journal.length];

  return (
    <article>
      <section className="pb-section-sm pt-32 md:pt-40">
        <Container>
          <Link href="/journal" className="eyebrow inline-flex items-center gap-3 text-ink/55 hover:text-ink">
            <ArrowLeft className="size-4" strokeWidth={1.5} />
            Journal
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <p className="eyebrow text-umber">
                {article.category} · {article.readTime} min read
              </p>
              <RevealText
                as="h1"
                lines={[article.title]}
                trigger="mount"
                delay={0.2}
                className="mt-6 font-display text-[clamp(2.5rem,6vw,6rem)] uppercase leading-[0.96] tracking-[-0.02em] text-ink"
              />
            </div>
            <p className="eyebrow text-ink/45 lg:col-span-3 lg:self-end lg:text-right">
              {formatDate(article.date)}
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <ImageReveal
          src={article.image}
          alt=""
          sizes="(min-width: 1536px) 96rem, 100vw"
          className="aspect-[4/5] md:aspect-[16/9]"
          priority
        />
      </Container>

      <section className="py-section-sm">
        <Container className="grid gap-10 lg:grid-cols-12">
          <p className="max-w-xs text-lead text-ink/70 lg:col-span-4">{article.excerpt}</p>
          <div className="flex max-w-prose flex-col gap-7 text-[1.05rem] leading-[1.75] text-ink/80 lg:col-span-7 lg:col-start-6">
            {article.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className={paragraphIndex === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.5em] first-letter:leading-[0.8]" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <nav aria-label="Next story" className="border-t border-line">
        <Container>
          <Link
            href={`/journal/${next.slug}`}
            className="group flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between md:py-14"
          >
            <span>
              <span className="eyebrow text-ink/50">Next story</span>
              <span className="mt-4 block font-display text-[clamp(1.75rem,3.5vw,3rem)] uppercase leading-none transition-transform duration-600 ease-out-expo group-hover:translate-x-1.5">
                {next.title}
              </span>
            </span>
            <span className="eyebrow flex items-center gap-3">
              {next.category} · {next.readTime} min
              <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.5} />
            </span>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
