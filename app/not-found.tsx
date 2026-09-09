import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-end pb-section pt-40">
      <Container>
        <p className="eyebrow text-umber">404</p>
        <h1 className="mt-6 font-display text-hero uppercase text-ink">
          NOTHING
          <br />
          HERE.
        </h1>
        <p className="mt-8 max-w-sm text-lead text-ink/65">
          The page you are looking for has moved, or never existed. The atelier is still open.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/book" variant="text">
            Book a Visit
          </Button>
        </div>
      </Container>
    </section>
  );
}
