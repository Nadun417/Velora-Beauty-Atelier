import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Ideas, technique and culture from inside the Velora atelier: editorial hair, colour without compromise, curl care and the people behind the chair.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        lines={["THE", "JOURNAL"]}
        copy="Ideas, technique and culture from inside the atelier."
        aside={<p className="eyebrow text-ink/45">{journal.length} stories · Updated monthly</p>}
      />
      <JournalGrid />
    </>
  );
}
