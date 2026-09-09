import Link from "next/link";
import { menuLinks, site, socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";

const columnHeading = "eyebrow mb-6 text-ivory/45";
const footerLink = "link-underline py-1 text-[0.95rem] text-ivory/85 hover:text-ivory";

export function Footer() {
  return (
    <footer className="dark-section relative overflow-hidden bg-ink text-ivory">
      <Container className="pb-12 pt-section-sm md:pt-section">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-[2rem] uppercase leading-none tracking-[0.14em]">
              {site.name}
            </p>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-ivory/60">
              {site.city}
              <br />
              {site.hours}
            </p>
            <p className="mt-10 max-w-xs font-display text-2xl italic leading-tight text-ivory/85">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className={columnHeading}>Navigation</p>
            <ul className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className={columnHeading}>Social</p>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener" className={footerLink}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className={columnHeading}>Contact</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`mailto:${site.email}`} className={footerLink}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className={footerLink}>
                  {site.phone}
                </a>
              </li>
              <li className="pt-2 text-[0.95rem] text-ivory/50">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line-light pt-6 text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow">© 2026 {site.name}</p>
          <p className="eyebrow">{site.descriptor} · {site.city}</p>
        </div>
      </Container>

      <div aria-hidden className="select-none overflow-hidden px-gutter">
        <p className="-mb-[0.18em] whitespace-nowrap text-center font-display text-[clamp(5rem,22vw,26rem)] uppercase leading-[0.85] tracking-[-0.03em] text-ivory/[0.07]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
