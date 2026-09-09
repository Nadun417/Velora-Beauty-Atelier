import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Ivory", token: "ivory", value: "#F2EFEA", className: "bg-ivory" },
  { name: "Cream", token: "cream", value: "#FAF9F6", className: "bg-cream" },
  { name: "Ink", token: "ink", value: "#171714", className: "bg-ink" },
  { name: "Umber", token: "umber", value: "#8D7866", className: "bg-umber" },
  { name: "Champagne", token: "champagne", value: "#C9A98B", className: "bg-champagne" },
  { name: "Line", token: "line", value: "rgba(23,23,20,.15)", className: "bg-line" },
];

const typeScale = [
  { label: "Hero", className: "font-display text-hero uppercase", sample: "BEAUTY" },
  { label: "Display", className: "font-display text-display uppercase", sample: "THE VELORA EDIT" },
  { label: "Title", className: "font-display text-title", sample: "Precision meets personality." },
  { label: "Lead", className: "text-lead", sample: "Hair, colour and beauty rituals created around you." },
  { label: "Body", className: "text-body", sample: "Velora is a modern beauty atelier built around individuality, craft and considered care." },
  { label: "Eyebrow", className: "eyebrow", sample: "01 — Signature services" },
];

/** Internal reference page. Not linked from navigation; excluded from robots. */
export default function StyleGuidePage() {
  return (
    <div className="pb-section pt-40">
      <Container className="flex flex-col gap-24">
        <header>
          <p className="eyebrow text-umber">Internal</p>
          <h1 className="mt-4 font-display text-display uppercase">Style Guide</h1>
          <p className="mt-6 max-w-md text-ink/65">
            Tokens live in <code className="font-mono text-[0.9em]">app/globals.css</code> under{" "}
            <code className="font-mono text-[0.9em]">@theme</code>. This page renders them so the system can be reviewed
            in one place.
          </p>
        </header>

        <section>
          <h2 className="eyebrow border-b border-line pb-4 text-ink/50">Colour</h2>
          <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {colours.map((colour) => (
              <li key={colour.token}>
                <div className={`aspect-square border border-line ${colour.className}`} />
                <p className="mt-3 font-display text-xl">{colour.name}</p>
                <p className="eyebrow mt-1 text-ink/45">
                  {colour.token} · {colour.value}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="eyebrow border-b border-line pb-4 text-ink/50">Typography</h2>
          <ul className="mt-8 flex flex-col divide-y divide-line">
            {typeScale.map((item) => (
              <li key={item.label} className="grid gap-4 py-8 md:grid-cols-12">
                <p className="eyebrow text-ink/45 md:col-span-2">{item.label}</p>
                <p className={`${item.className} md:col-span-10`}>{item.sample}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="eyebrow border-b border-line pb-4 text-ink/50">Buttons</h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/book">Primary</Button>
            <Button href="/book" variant="secondary">
              Secondary
            </Button>
            <Button href="/book" variant="text">
              Text link
            </Button>
            <Button type="button" disabled>
              Disabled
            </Button>
          </div>
          <div className="dark-section mt-6 flex flex-wrap items-center gap-6 bg-ink p-8 text-ivory">
            <Button href="/book" variant="dark">
              Dark surface
            </Button>
            <Button href="/book" variant="text" className="text-ivory">
              Text on dark
            </Button>
          </div>
        </section>

        <section>
          <h2 className="eyebrow border-b border-line pb-4 text-ink/50">Spacing & radius</h2>
          <dl className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <dt className="eyebrow text-ink/45">Section</dt>
              <dd className="mt-2">clamp(4rem, 6vw + 2rem, 11rem)</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink/45">Gutter</dt>
              <dd className="mt-2">clamp(1.25rem, 5vw, 5rem)</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink/45">Radius</dt>
              <dd className="mt-2">0 / 2px / 4px / 8px</dd>
            </div>
          </dl>
        </section>
      </Container>
    </div>
  );
}
