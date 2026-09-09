import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    "Book your visit to Velora in five short steps: choose a service, an artist, a date and time, and leave your details. Your next look starts with a conversation.",
};

interface BookPageProps {
  searchParams: Promise<{ service?: string; artist?: string }>;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const { service, artist } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Book"
        lines={["YOUR NEXT", "CHAPTER."]}
        copy="Five short steps. No account, no waiting on hold. Your next look starts with a conversation."
        className="pb-12 md:pb-16"
      />
      <BookingWizard initialServiceSlug={service} initialArtistSlug={artist} />
    </>
  );
}
