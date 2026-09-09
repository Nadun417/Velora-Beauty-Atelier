"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/animations";
import { navLinks, site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const SCROLL_THRESHOLD = 40;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  // Close the menu whenever the route changes (adjusting state during render).
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  // The home hero is a dark video, so the bar shows ivory over it until scrolled.
  const overHeroMedia = pathname === "/" && !scrolled;
  const light = overHeroMedia || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transition(0.9, 0.3)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ease-out-expo",
          scrolled && !menuOpen
            ? "border-line bg-ivory/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
          light ? "text-ivory" : "text-ink",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between transition-[padding] duration-500 ease-out-expo",
            scrolled ? "py-4" : "py-6 md:py-8",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="font-display text-[1.6rem] uppercase leading-none tracking-[0.14em]"
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-active={active}
                      aria-current={active ? "page" : undefined}
                      className="eyebrow link-underline py-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <Button
              href="/book"
              size="sm"
              variant={light ? "dark" : "primary"}
              cursorLabel="BOOK"
              className="hidden md:inline-flex"
            >
              Book a Visit
            </Button>

            <button
              type="button"
              className="eyebrow flex min-h-11 items-center gap-3 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <motion.span
                  className="absolute left-0 top-0 block h-px w-full bg-current"
                  animate={menuOpen ? { y: 5.5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={transition(0.5)}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-px w-full bg-current"
                  animate={menuOpen ? { y: -5.5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={transition(0.5)}
                />
              </span>
            </button>
          </div>
        </Container>

        <motion.div
          aria-hidden
          className={cn(
            "absolute bottom-[-1px] left-0 h-px w-full origin-left bg-ink/50 transition-opacity duration-500",
            scrolled && !menuOpen ? "opacity-100" : "opacity-0",
          )}
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
