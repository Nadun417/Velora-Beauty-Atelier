import type { BookingCategory, Service, ServiceCategory } from "@/types";

export const serviceCategories: { id: ServiceCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hair", label: "Hair" },
  { id: "colour", label: "Colour" },
  { id: "care", label: "Care" },
  { id: "beauty", label: "Beauty" },
];

export const bookingCategories: { id: BookingCategory; label: string; hint: string }[] = [
  { id: "haircut", label: "Haircut", hint: "Cuts, restyles and shape" },
  { id: "colour", label: "Colour", hint: "Balayage, tone and full colour" },
  { id: "treatment", label: "Treatment", hint: "Repair, scalp and rituals" },
  { id: "styling", label: "Styling", hint: "Blowouts and finishing" },
];

export const services: Service[] = [
  {
    id: "svc-01",
    slug: "signature-cut",
    name: "Signature Cut",
    category: "hair",
    bookingCategory: "haircut",
    duration: 60,
    price: 6500,
    description:
      "A cut designed around face shape, hair texture and the way you actually live with your hair. We begin with a conversation, not a chair.",
    suits: "Anyone who wants a shape that grows out well and is easy to recreate at home.",
    includes: ["Consultation", "Cleanse & scalp massage", "Precision cut", "Signature finish"],
  },
  {
    id: "svc-02",
    slug: "restyle",
    name: "Restyle",
    category: "hair",
    bookingCategory: "haircut",
    duration: 90,
    price: 8500,
    description:
      "For a real change of direction. Extended consultation and a considered new shape, whether that means significant length off or a complete rethink.",
    suits: "Anyone moving from long to short, growing out a fringe or wanting a new silhouette.",
    includes: ["Extended consultation", "Cleanse & treatment", "Restyle cut", "Blow-dry & styling lesson"],
  },
  {
    id: "svc-03",
    slug: "blowout",
    name: "Blowout",
    category: "hair",
    bookingCategory: "styling",
    duration: 45,
    price: 4000,
    description:
      "A cleanse and finish tailored to your texture. Smooth, soft or full of movement, depending on the day you have ahead of you.",
    suits: "Events, evenings, or whenever hair should feel effortlessly done.",
    includes: ["Cleanse", "Heat protection", "Blow-dry", "Finishing"],
  },
  {
    id: "svc-04",
    slug: "balayage",
    name: "Balayage",
    category: "colour",
    bookingCategory: "colour",
    duration: 180,
    price: 18000,
    description:
      "Hand-painted dimension placed where light naturally falls. Grown-out softness is built in, so the result lives well between visits.",
    suits: "Low-maintenance colour with depth, movement and a soft regrowth line.",
    includes: ["Colour consultation", "Hand-painted lightening", "Custom gloss", "Bond treatment", "Blow-dry"],
  },
  {
    id: "svc-05",
    slug: "full-colour",
    name: "Full Colour",
    category: "colour",
    bookingCategory: "colour",
    duration: 150,
    price: 14000,
    description:
      "Root-to-end colour in a shade mixed for your skin tone and the light you live in. Rich, even and healthy-looking.",
    suits: "Grey coverage, a deeper tone, or a full change of colour direction.",
    includes: ["Colour consultation", "Full application", "Gloss", "Blow-dry"],
  },
  {
    id: "svc-06",
    slug: "gloss-and-tone",
    name: "Gloss & Tone",
    category: "colour",
    bookingCategory: "colour",
    duration: 60,
    price: 7500,
    description:
      "A tonal refresh that corrects warmth, adds shine and revives existing colour without a full appointment.",
    suits: "Maintaining balayage, softening brassiness or adding a mirror finish.",
    includes: ["Tone assessment", "Custom gloss", "Cleanse", "Blow-dry"],
  },
  {
    id: "svc-07",
    slug: "repair-ritual",
    name: "Repair Ritual",
    category: "care",
    bookingCategory: "treatment",
    duration: 45,
    price: 5500,
    description:
      "A restorative treatment sequence chosen for your hair's current condition, applied with heat and time rather than rushed at the basin.",
    suits: "Hair that has been coloured, heat styled or simply feels tired.",
    includes: ["Condition assessment", "Bond or protein treatment", "Steam infusion", "Scalp massage"],
  },
  {
    id: "svc-08",
    slug: "scalp-reset",
    name: "Scalp Reset",
    category: "care",
    bookingCategory: "treatment",
    duration: 60,
    price: 6000,
    description:
      "Healthy hair starts at the scalp. A deep cleanse, exfoliation and targeted treatment to rebalance oil, soothe irritation and support growth.",
    suits: "Build-up, dryness, sensitivity or anyone who loves a slower appointment.",
    includes: ["Scalp analysis", "Exfoliating cleanse", "Targeted treatment", "Pressure-point massage"],
  },
  {
    id: "svc-09",
    slug: "brow-shaping",
    name: "Brow Shaping",
    category: "beauty",
    bookingCategory: "styling",
    duration: 30,
    price: 2500,
    description:
      "Mapped to your bone structure and tidied with restraint. Brows should frame the face, not announce themselves.",
    suits: "Anyone who wants definition that still looks like their own brow.",
    includes: ["Brow mapping", "Shaping", "Tint (optional)", "Soothing finish"],
  },
  {
    id: "svc-10",
    slug: "skin-ritual",
    name: "Skin Ritual",
    category: "beauty",
    bookingCategory: "treatment",
    duration: 60,
    price: 9000,
    description:
      "A calm, unhurried facial built around your skin on the day. Cleanse, gentle exfoliation, massage and a finishing mask.",
    suits: "Dull, dehydrated or stressed skin, or simply an hour to yourself.",
    includes: ["Skin assessment", "Double cleanse", "Exfoliation", "Facial massage", "Mask & finish"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export function getServicesByBookingCategory(category: BookingCategory) {
  return services.filter((service) => service.bookingCategory === category);
}
