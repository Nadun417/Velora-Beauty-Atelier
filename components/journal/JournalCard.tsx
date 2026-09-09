"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { JournalArticle } from "@/types";
import { cn, pad } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";

interface JournalCardProps {
  article: JournalArticle;
  index: number;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  titleClassName?: string;
}

export function JournalCard({
  article,
  index,
  className,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority = false,
  titleClassName,
}: JournalCardProps) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      data-cursor="READ"
      className={cn("group flex flex-col", className)}
      aria-label={`${article.title} — ${article.category}, ${article.readTime} minute read`}
    >
      <ImageReveal
        src={article.image}
        alt=""
        sizes={sizes}
        className={aspect}
        priority={priority}
        hoverZoom
        delay={(index % 3) * 0.08}
      />
      <div className="mt-5 flex flex-1 flex-col border-t border-line pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-umber">
            {pad(index + 1)} · {article.category}
          </p>
          <p className="eyebrow text-ink/45">{article.readTime} min read</p>
        </div>
        <h3
          className={cn(
            "mt-4 flex items-start justify-between gap-4 font-display uppercase leading-[0.98] tracking-[-0.01em]",
            titleClassName ?? "text-[clamp(1.6rem,2.4vw,2.4rem)]",
          )}
        >
          <span className="transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
            {article.title}
          </span>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.25}
            className="mt-1 size-6 shrink-0 -translate-x-2 translate-y-2 opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </h3>
        <p className="mt-4 max-w-md text-[0.95rem] text-ink/60">{article.excerpt}</p>
      </div>
    </Link>
  );
}
