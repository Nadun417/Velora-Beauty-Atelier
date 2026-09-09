import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesMenu } from "@/components/services/ServicesMenu";
import type { FilterValue } from "@/components/services/ServiceFilter";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The Velora menu: thoughtful hair, colour, care and beauty services with transparent starting prices. Cuts, balayage, gloss, restorative rituals and more.",
};

interface ServicesPageProps {
  searchParams: Promise<{ category?: string }>;
}

function toFilterValue(value?: string): FilterValue {
  const match = serviceCategories.find((category) => category.id === value);
  return match ? match.id : "all";
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={["THE", "MENU"]}
        copy="Thoughtful services. Transparent pricing. No unnecessary complexity."
      />
      <ServicesMenu initialCategory={toFilterValue(category)} />
    </>
  );
}
