import { journal } from "@/data/journal";
import { socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { JournalCard } from "@/components/journal/JournalCard";

/**
 * Magazine layout: a 12-column grid where each article's `size` decides its
 * footprint, so no two rows read the same.
 */
const sizeConfig = {
  feature: {
    className: "md:col-span-8",
    aspect: "aspect-[4/5] md:aspect-[16/10]",
    sizes: "(min-width: 768px) 66vw, 100vw",
    title: "text-[clamp(2rem,3.6vw,3.6rem)]",
  },
  tall: {
    className: "md:col-span-4",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
    sizes: "(min-width: 768px) 33vw, 100vw",
    title: undefined,
  },
  standard: {
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 768px) 33vw, 100vw",
    title: undefined,
  },
  wide: {
    className: "md:col-span-8",
    aspect: "aspect-[4/5] md:aspect-[16/9]",
    sizes: "(min-width: 768px) 66vw, 100vw",
    title: "text-[clamp(1.8rem,3vw,3rem)]",
  },
} as const;

export function JournalGrid() {
  return (
    <section className="pb-section">
      <Container>
        <ul className="grid gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-20">
          {journal.map((article, index) => {
            const config = sizeConfig[article.size];
            return (
              <li key={article.id} className={config.className}>
                <JournalCard
                  article={article}
                  index={index}
                  aspect={config.aspect}
                  sizes={config.sizes}
                  titleClassName={config.title}
                  priority={index < 2}
                  className="h-full"
                />
              </li>
            );
          })}

          <li className="flex flex-col justify-between border-t border-line pt-6 md:col-span-4">
            <div>
              <p className="eyebrow text-umber">Follow the atelier</p>
              <p className="mt-6 max-w-xs font-display text-3xl leading-tight">
                Daily work, before it reaches the journal.
              </p>
            </div>
            <ul className="mt-10 flex flex-col gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline py-1 text-[0.95rem]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </Container>
    </section>
  );
}
