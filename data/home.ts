import type { LookbookItem, PhilosophyStep } from "@/types";
import { unsplash } from "@/lib/utils";
import heroPoster from "@/public/images/hero-poster.jpg";

export const heroContent = {
  lines: ["BEAUTY,", "WITHOUT", "THE TEMPLATE."],
  copy: "Hair, colour and beauty rituals created around you.",
  video: "/images/hero.mp4",
  poster: heroPoster,
  imageAlt:
    "Editorial portrait of a model with a pale wavy bob and daisies, in soft natural light",
};

export const manifesto = {
  statement: "We don't believe beauty should make everyone look the same.",
  copy: "Velora is a modern beauty atelier built around individuality, craft and considered care.",
};

export interface SignatureService {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export const signatureServices: SignatureService[] = [
  {
    id: "sig-cut",
    index: "01",
    label: "Cut",
    title: "Precision meets personality.",
    description:
      "Personalised cuts designed around face shape, texture, lifestyle and individual style.",
    image: unsplash("1595476108010-b4d1f102b1b1", 1400),
    imageAlt: "A stylist sectioning and cutting a client's hair in the atelier",
    href: "/services?category=hair",
  },
  {
    id: "sig-colour",
    index: "02",
    label: "Colour",
    title: "Colour with intention.",
    description:
      "Dimensional colour, balayage and tonal work focused on depth, health and longevity.",
    image: unsplash("1529626455594-4ff0802cfb7e", 1400),
    imageAlt: "Portrait of a woman with rich copper hair and soft dimensional colour",
    href: "/services?category=colour",
  },
  {
    id: "sig-care",
    index: "03",
    label: "Care",
    title: "Healthy hair comes first.",
    description:
      "Restorative treatments and rituals tailored to hair condition and long-term goals.",
    image: unsplash("1562322140-8baeececf3df", 1400),
    imageAlt: "A stylist blow-drying a client's hair with focus and care",
    href: "/services?category=care",
  },
];

export const lookbook: LookbookItem[] = [
  {
    id: "lb-01",
    title: "The Soft Bob",
    category: "Editorial",
    year: "2026",
    image: unsplash("1506863530036-1efeddceb993", 1200),
  },
  {
    id: "lb-02",
    title: "Copper / 26",
    category: "Colour",
    year: "2026",
    image: unsplash("1523263685509-57c1d050d19b", 1200),
  },
  {
    id: "lb-03",
    title: "Textured Crop",
    category: "Studio",
    year: "2026",
    image: unsplash("1531123897727-8f129e1688ce", 1200),
  },
  {
    id: "lb-04",
    title: "Sculpted Curl",
    category: "Texture",
    year: "2026",
    image: unsplash("1519699047748-de8e457a634e", 1200),
  },
  {
    id: "lb-05",
    title: "Modern Shag",
    category: "Editorial",
    year: "2026",
    image: unsplash("1470259078422-826894b933aa", 1200),
  },
];

export const philosophySteps: PhilosophyStep[] = [
  {
    id: "listen",
    title: "Listen",
    description:
      "Every appointment begins with understanding what you want, how you live and what your hair naturally does.",
    image: unsplash("1521590832167-7bcbfaa6381f", 1200),
  },
  {
    id: "design",
    title: "Design",
    description:
      "We create a direction suited to your features, texture and maintenance preference.",
    image: unsplash("1527799820374-dcf8d9d4a388", 1200),
  },
  {
    id: "create",
    title: "Create",
    description: "Technique and craft bring that direction into reality.",
    image: unsplash("1622286342621-4bd786c2447c", 1200),
  },
  {
    id: "refine",
    title: "Refine",
    description: "Small details turn a good result into something personal.",
    image: unsplash("1509967419530-da38b4704bc6", 1200),
  },
];

export const bookingCta = {
  lines: ["READY FOR", "YOUR NEXT", "CHAPTER?"],
  copy: "Your next look starts with a conversation.",
  image: unsplash("1600948836101-f9ffda59d250", 1800),
};
