export type ServiceCategory = "hair" | "colour" | "care" | "beauty";

/** Categories shown in the booking wizard's first step. */
export type BookingCategory = "haircut" | "colour" | "treatment" | "styling";

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  bookingCategory: BookingCategory;
  /** Duration in minutes. */
  duration: number;
  /** Starting price in LKR. */
  price: number;
  description: string;
  suits: string;
  includes: string[];
}

export interface FeaturedWork {
  title: string;
  category: string;
  image: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  firstName: string;
  role: string;
  specialties: string[];
  intro: string;
  biography: string;
  philosophy: string;
  image: string;
  secondaryImage: string;
  experience: string;
  featuredWork: FeaturedWork[];
  /** Service slugs this artist can be booked for. */
  availableServices: string[];
  /** Whether the artist is offered in the booking wizard. */
  bookable: boolean;
}

export type JournalCategory = "Editorial" | "Technique" | "Care" | "People" | "Colour";

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  readTime: number;
  excerpt: string;
  image: string;
  /** Layout hint for the editorial grid. */
  size: "feature" | "tall" | "standard" | "wide";
  date: string;
  body: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

export interface PhilosophyStep {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface BookingData {
  category: BookingCategory | null;
  serviceId: string | null;
  /** Artist id, or "none" for no preference. */
  artistId: string | null;
  /** ISO date string, e.g. 2026-09-10 */
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}
