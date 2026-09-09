import { site } from "@/data/site";

export const TIME_SLOTS = ["09:00", "10:30", "13:00", "15:30", "17:00"] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];

/** How far ahead the prototype allows bookings. */
export const BOOKING_WINDOW_DAYS = 60;

export const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

/** Local-time ISO date (yyyy-mm-dd) without timezone drift. */
export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

/** Calendar cells for a month, Monday-first, padded with nulls. */
export function getMonthCells(year: number, month: number): Array<Date | null> {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: offset }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  return cells;
}

export function monthLabel(date: Date) {
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" }).toUpperCase();
}

/** The atelier is closed on Sundays and does not take same-day bookings. */
export function isDateBookable(date: Date, today: Date) {
  const isSunday = date.getDay() === 0;
  const isPast = date <= today;
  const isTooFar = date > addDays(today, BOOKING_WINDOW_DAYS);
  return !isSunday && !isPast && !isTooFar;
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

/**
 * Deterministic dummy availability so the UI is stable between renders.
 * Roughly one in three slots is taken; never all five on the same day.
 */
export function getSlotAvailability(iso: string, artistId: string | null): Record<TimeSlot, boolean> {
  const seed = hashString(`${iso}:${artistId ?? "any"}`);
  const availability = {} as Record<TimeSlot, boolean>;
  let openCount = 0;
  TIME_SLOTS.forEach((slot, index) => {
    const open = (seed >> index) % 3 !== 0;
    availability[slot] = open;
    if (open) openCount += 1;
  });
  if (openCount === 0) availability[TIME_SLOTS[seed % TIME_SLOTS.length]] = true;
  return availability;
}

/** "Thursday · 10 September" */
export function formatLongDate(iso: string) {
  const date = fromISODate(iso);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  return `${weekday} · ${dayMonth}`;
}

/** "10:30" -> "10:30 AM" */
export function formatTime12(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelve}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

interface IcsInput {
  title: string;
  description: string;
  dateISO: string;
  time: string;
  durationMinutes: number;
}

function toIcsStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Builds a minimal iCalendar file for "Add to Calendar". */
export function buildIcs({ title, description, dateISO, time, durationMinutes }: IcsInput) {
  const [hours, minutes] = time.split(":").map(Number);
  const start = fromISODate(dateISO);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const uid = `${dateISO}-${time.replace(":", "")}@velora.example`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VELORA//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(start)}`,
    `DTEND:${toIcsStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${site.name}, ${site.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[+\d][\d\s()-]{7,}$/;
