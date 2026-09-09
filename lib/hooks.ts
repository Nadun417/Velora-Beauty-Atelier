"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query. Returns `false` on the server and during
 * hydration so server and client markup always match.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function useIsFinePointer() {
  return useMediaQuery("(pointer: fine)");
}

const noopSubscribe = () => () => {};

/** True once the component has mounted on the client. */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Locks document scrolling while `locked` is true (used by overlays). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [locked]);
}
