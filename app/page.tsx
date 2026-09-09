import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Lookbook } from "@/components/home/Lookbook";
import { ArtistsPreview } from "@/components/home/ArtistsPreview";
import { Philosophy } from "@/components/home/Philosophy";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingCTA } from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServicesPreview />
      <Lookbook />
      <ArtistsPreview />
      <Philosophy />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
