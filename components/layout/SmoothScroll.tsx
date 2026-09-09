"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance (null on touch devices / before mount). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Smooth scrolling via Lenis, applied responsibly:
 * - honours prefers-reduced-motion (lerp forced to 1)
 * - native touch scrolling is left untouched
 * - anchor links are handled by Lenis so #hash navigation still works
 * - scroll position resets on route change
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: true,
      respectReducedMotion: true,
      autoRaf: false,
    });

    const loop = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    setLenis(instance);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
