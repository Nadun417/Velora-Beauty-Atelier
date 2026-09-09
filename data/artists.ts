import type { Artist } from "@/types";
import { unsplash } from "@/lib/utils";

export const artists: Artist[] = [
  {
    id: "art-01",
    slug: "amara-silva",
    name: "Amara Silva",
    firstName: "Amara",
    role: "Creative Director",
    specialties: ["Cut", "Editorial"],
    intro:
      "Amara founded Velora on a simple idea: a haircut should be designed for the person wearing it, not copied from a reference image.",
    biography:
      "After a decade cutting for editorial shoots and runway shows between Colombo and London, Amara returned home to build an atelier where the same precision could serve everyday life. Her cuts are known for growing out beautifully, holding their shape for months and needing very little to look intentional.",
    philosophy:
      "I spend more time looking than cutting. Once you understand how hair falls, where it wants to move and how someone holds their head when they talk, the shape is already there. My job is to remove what is in the way.",
    image: unsplash("1580489944761-15a19d654956", 1200),
    secondaryImage: unsplash("1595476108010-b4d1f102b1b1", 1200),
    experience: "14 years",
    featuredWork: [
      { title: "The Soft Bob", category: "Editorial / 2026", image: unsplash("1506863530036-1efeddceb993", 1000) },
      { title: "Textured Crop", category: "Studio / 2026", image: unsplash("1531123897727-8f129e1688ce", 1000) },
      { title: "The Atelier", category: "Space / 2025", image: unsplash("1560066984-138dadb4c035", 1000) },
    ],
    availableServices: ["signature-cut", "restyle", "blowout"],
    bookable: true,
  },
  {
    id: "art-02",
    slug: "maya-perera",
    name: "Maya Perera",
    firstName: "Maya",
    role: "Colour Director",
    specialties: ["Balayage", "Colour"],
    intro:
      "Maya leads colour at Velora with an eye trained on light, skin tone and how a shade behaves over months rather than minutes.",
    biography:
      "Maya trained as a painter before she trained as a colourist, and it shows. Her balayage is placed the way light actually falls, her glosses are mixed to the client's skin and her formulas are written down so every visit builds on the last. She has led colour education for three international brands.",
    philosophy:
      "Good colour is invisible on day one and still good on day ninety. I think about the regrowth line before I think about the first appointment. If the colour only works fresh from the chair, it was never designed for a real person.",
    image: unsplash("1507101105822-7472b28e22ac", 1200),
    secondaryImage: unsplash("1515377905703-c4788e51af15", 1200),
    experience: "11 years",
    featuredWork: [
      { title: "Copper / 26", category: "Colour / 2026", image: unsplash("1523263685509-57c1d050d19b", 1000) },
      { title: "Lived-in Bronde", category: "Balayage / 2026", image: unsplash("1529626455594-4ff0802cfb7e", 1000) },
      { title: "The New Copper", category: "Editorial / 2025", image: unsplash("1516575150278-77136aed6920", 1000) },
    ],
    availableServices: ["balayage", "full-colour", "gloss-and-tone"],
    bookable: true,
  },
  {
    id: "art-03",
    slug: "noah-fernando",
    name: "Noah Fernando",
    firstName: "Noah",
    role: "Senior Stylist",
    specialties: ["Texture", "Styling"],
    intro:
      "Noah works with texture rather than against it, from tight curls to fine straight hair that needs help holding a shape.",
    biography:
      "Noah joined Velora from a curl-specialist studio and brought a dry-cutting practice that lets him see exactly how hair behaves before a single section is taken. His styling work is quiet and durable: finishes that survive Colombo humidity and a full day out.",
    philosophy:
      "Texture is information. Curl pattern, density, how the hair dries on its own, all of that tells you what the cut and the finish should be. I would rather spend the first ten minutes watching hair dry than guessing.",
    image: unsplash("1531384441138-2736e62e0919", 1200),
    secondaryImage: unsplash("1622286342621-4bd786c2447c", 1200),
    experience: "8 years",
    featuredWork: [
      { title: "Sculpted Curl", category: "Texture / 2026", image: unsplash("1519699047748-de8e457a634e", 1000) },
      { title: "Modern Shag", category: "Editorial / 2026", image: unsplash("1470259078422-826894b933aa", 1000) },
      { title: "Natural Wave", category: "Studio / 2025", image: unsplash("1508002366005-75a695ee2d17", 1000) },
    ],
    availableServices: ["signature-cut", "restyle", "blowout"],
    bookable: true,
  },
  {
    id: "art-04",
    slug: "lena-dias",
    name: "Lena Dias",
    firstName: "Lena",
    role: "Beauty Specialist",
    specialties: ["Skin", "Rituals"],
    intro:
      "Lena runs the beauty side of the atelier, from scalp treatments to slow, considered skin rituals.",
    biography:
      "With a background in dermal therapy, Lena approaches beauty as maintenance rather than transformation. Her treatments are built around what skin and scalp need on the day, with products chosen for ingredients rather than packaging. Clients describe her room as the quietest hour of their week.",
    philosophy:
      "Nothing I do should be visible from across the room. Healthy skin, a calm scalp and brows that suit a face are the foundation everything else sits on. If the foundation is right, you need less of everything else.",
    image: unsplash("1548142813-c348350df52b", 1200),
    secondaryImage: unsplash("1604654894610-df63bc536371", 1200),
    experience: "9 years",
    featuredWork: [
      { title: "Skin Ritual", category: "Beauty / 2026", image: unsplash("1509967419530-da38b4704bc6", 1000) },
      { title: "Scalp Reset", category: "Care / 2026", image: unsplash("1527799820374-dcf8d9d4a388", 1000) },
      { title: "Considered Nails", category: "Beauty / 2025", image: unsplash("1522337660859-02fbefca4702", 1000) },
    ],
    availableServices: ["repair-ritual", "scalp-reset", "brow-shaping", "skin-ritual"],
    bookable: true,
  },
];

export function getArtistBySlug(slug: string) {
  return artists.find((artist) => artist.slug === slug);
}

export function getArtistById(id: string) {
  return artists.find((artist) => artist.id === id);
}

/** Returns the neighbouring artists for previous / next navigation. */
export function getAdjacentArtists(slug: string) {
  const index = artists.findIndex((artist) => artist.slug === slug);
  if (index === -1) return { previous: null, next: null };
  const previous = artists[(index - 1 + artists.length) % artists.length];
  const next = artists[(index + 1) % artists.length];
  return { previous, next };
}
