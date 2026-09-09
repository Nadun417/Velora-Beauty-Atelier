import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { artists } from "@/data/artists";
import { journal } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = ["", "/services", "/artists", "/journal", "/book"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const artistPages: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${site.url}/artists/${artist.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const journalPages: MetadataRoute.Sitemap = journal.map((article) => ({
    url: `${site.url}/journal/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...artistPages, ...journalPages];
}
