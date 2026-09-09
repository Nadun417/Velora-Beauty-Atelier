import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know our custom font-size tokens, otherwise
 * `text-hero` is mistaken for a colour and dropped when `text-ink` follows.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "display", "title", "lead", "body", "eyebrow"] }],
    },
  },
});

/** Merge Tailwind classes without duplicates. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded editorial index: 1 -> "01". */
export function pad(index: number) {
  return String(index).padStart(2, "0");
}

/** Format LKR prices consistently: 6500 -> "LKR 6,500". */
export function formatPrice(amount: number) {
  return `LKR ${amount.toLocaleString("en-US")}`;
}

/** Format a duration in minutes: 90 -> "90 min". */
export function formatDuration(minutes: number) {
  return `${minutes} min`;
}

/**
 * Build an Unsplash image URL with sensible defaults.
 * Every image in the project goes through here, so swapping to
 * licensed local assets later is a single-function change.
 */
export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}
