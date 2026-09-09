export const site = {
  name: "VELORA",
  descriptor: "Beauty Atelier",
  tagline: "Beauty, curated around you.",
  description:
    "VELORA is a modern beauty atelier focused on thoughtful hair, colour and beauty experiences designed around the individual.",
  url: "https://velora.example",
  city: "Colombo",
  hours: "08:00 — 20:00",
  email: "hello@velora.example",
  phone: "+94 11 000 0000",
  address: "27 Flower Road, Colombo 07",
} as const;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Artists", href: "/artists" },
  { label: "Journal", href: "/journal" },
] as const;

export const menuLinks = [
  { label: "Services", href: "/services" },
  { label: "Artists", href: "/artists" },
  { label: "Journal", href: "/journal" },
  { label: "Book", href: "/book" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "TikTok", href: "https://tiktok.com" },
] as const;
