"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pad } from "@/lib/utils";
import { transition, staggerContainer } from "@/lib/animations";
import { useScrollLock } from "@/lib/hooks";
import { menuLinks, site, socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { useLenis } from "@/components/layout/SmoothScroll";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const linkVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: transition(0.8) },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const lenis = useLenis();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 350);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="dark-section fixed inset-0 z-40 flex flex-col bg-ink text-ivory"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: transition(0.6) }}
          transition={transition(0.85)}
        >
          <Container className="flex flex-1 flex-col justify-between pb-10 pt-28">
            <motion.nav
              aria-label="Mobile"
              variants={staggerContainer(0.07, 0.25)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col">
                {menuLinks.map((link, index) => (
                  <li key={link.href} className="overflow-hidden border-b border-line-light">
                    <motion.div variants={linkVariants}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        onClick={onClose}
                        className="flex items-baseline gap-5 py-4"
                      >
                        <span className="eyebrow w-7 text-ivory/50">{pad(index + 1)}</span>
                        <span className="font-display text-[clamp(2.75rem,11vw,5rem)] uppercase leading-none tracking-[-0.01em]">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.nav>

            <motion.div
              className="flex items-end justify-between gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.8, 0.6)}
            >
              <ul className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="eyebrow link-underline py-1 text-ivory/70"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="eyebrow text-right leading-relaxed text-ivory/50">
                {site.city}
                <br />
                {site.hours}
              </p>
            </motion.div>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
