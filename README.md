# VELORA — Beauty Atelier

A premium, editorial five-page website for a fictional luxury beauty atelier in Colombo. Built as a practical assessment for a Creative Front-End & UI/UX Intern position, with the brief of transforming the salon and beauty category into a digital experience closer to a fashion or architecture brand than a salon template.

**Tagline:** Beauty, curated around you.

## Overview

VELORA is a modern beauty atelier built around individuality, craft and considered care. The site presents the brand through five routes:

| Route | Purpose |
| --- | --- |
| `/` | Editorial homepage: hero, manifesto, signature services, horizontal lookbook, team preview, interactive philosophy, testimonials, booking call to action |
| `/services` | The menu: filterable, keyboard-accessible accordion of services with transparent starting prices |
| `/artists` and `/artists/[slug]` | Asymmetric team grid and full artist profiles with previous/next navigation |
| `/journal` and `/journal/[slug]` | Magazine-style story grid and readable article pages |
| `/book` | Five-step client-side booking wizard: service, artist, date and time, details, confirmation |

An internal `/style-guide` route renders the design tokens. It is not linked from navigation and is excluded from indexing.

## Design philosophy

**Editorial, not templated.** Every section has its own composition: alternating image/content rows, a sticky horizontal gallery, a split-screen philosophy panel, one testimonial at a time, a massive footer wordmark. There is no repeated three-card pattern.

**Two-font system.** Instrument Serif carries display and headline typography in uppercase with tight leading; Manrope handles body copy, labels and UI. All display sizes use `clamp()` so the hero can reach ten rem on large screens without breaking a 390 px phone.

**Restrained palette.** Ivory, cream, near-black ink and a neutral umber do most of the work. The champagne accent appears rarely. Dark sections invert the scheme rather than introducing new colours.

**Motion that supports the layout.** Every animation is opacity, transform or clip-path based, shares one easing curve (`[0.22, 1, 0.36, 1]`) and stays between 0.4 and 1.1 seconds. Disable it all and the page still reads as a finished, premium site.

**Adapted, not shrunk.** Desktop and mobile get different interaction models where it matters: scroll-driven horizontal gallery becomes a native swipe gallery, hover-driven philosophy becomes a tap accordion, the multi-column team grid becomes a portrait list, the full-screen mobile menu replaces the inline navigation.

## Features

- Five fully responsive pages plus dynamic artist and journal routes
- Sticky navigation that integrates with the hero, then gains an ivory blur, hairline and scroll-progress line on scroll
- Full-screen animated mobile menu with focus management, Escape support and scroll locking
- Loader/wordmark reveal into a sequenced hero (media, headline lines, copy, CTAs, scroll cue)
- Word-by-word manifesto reveal and line-by-line headline reveals with screen-reader-safe markup
- Clip-path image reveals with a settling scale
- Scroll-driven horizontal lookbook on desktop, snap-scroll swipe gallery on mobile
- Editorial portrait blocks with alternate-image hover and "View Profile" label
- Interactive philosophy list that swaps imagery and copy on hover, or expands as an accordion on touch
- Single-quote testimonial carousel with directional transitions and live-region announcements
- Booking CTA section that inverts from ink to ivory when the button is hovered
- Service filter tabs with a shared-layout indicator and animated accordion rows with roving arrow-key focus
- Deep links: `/services?category=colour`, `/services#balayage`, `/book?service=signature-cut`, `/book?artist=maya-perera`
- Booking wizard with animated step transitions, deterministic dummy availability, calendar and time-slot selection, validated details form with accessible errors, confirmation with an `.ics` "Add to Calendar" download
- Subtle magnetic buttons and a desktop-only custom cursor with contextual labels (VIEW, PROFILE, BOOK, READ), both disabled for touch, coarse pointers and reduced motion
- Lightweight page transitions via `app/template.tsx`
- Metadata per page, Open Graph image, sitemap and robots

## Technology stack

- **Next.js 16** (App Router, Server Components by default, Turbopack)
- **React 19** and **TypeScript** (strict)
- **Tailwind CSS 4** with design tokens declared in `@theme`
- **Framer Motion** for entrances, reveals, layout indicators, menu, wizard and micro-interactions
- **Lucide React** icons
- **Lenis** for smooth scrolling (respects reduced motion, keeps anchors and keyboard scrolling working)
- `clsx` + `tailwind-merge` for class composition

No GSAP, Three.js or particle libraries. One animation library handles everything.

## Project structure

```
app/
  layout.tsx            fonts, metadata, providers, skip link, nav, footer, cursor
  template.tsx          page transition wrapper
  page.tsx              home
  services/page.tsx
  artists/page.tsx
  artists/[slug]/page.tsx
  journal/page.tsx
  journal/[slug]/page.tsx
  book/page.tsx
  style-guide/page.tsx
  not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
  globals.css           design tokens and base styles

components/
  layout/               Navbar, MobileMenu, Footer, SmoothScroll, Cursor
  home/                 Hero, Manifesto, ServicesPreview, Lookbook, ArtistsPreview,
                        Philosophy, Testimonials, BookingCTA
  services/             ServicesMenu, ServiceFilter, ServiceAccordion
  artists/              ArtistCard, ArtistGrid, ArtistNav
  journal/              JournalCard, JournalGrid
  booking/              BookingWizard, ProgressIndicator, StepHeading, ServiceStep,
                        ArtistStep, DateStep, DetailsStep, ConfirmationStep, Field
  motion/               RevealText, ImageReveal, PageTransition
  ui/                   Button, Container, SectionHeading, PageHero

data/                   site, services, artists, journal, testimonials, home content
lib/                    utils (cn, formatters, image helper), animations (presets),
                        hooks (media query, mount, scroll lock), booking (calendar,
                        availability, ics)
types/                  Service, Artist, JournalArticle, Testimonial, BookingData, …
```

All content lives in `data/` with typed interfaces, so services, artists and articles are never duplicated inside components. Image URLs pass through one helper (`lib/utils.ts`) so placeholder photography can be replaced with licensed assets in a single place.

## Responsive strategy

Designed and checked at 390, 768, 1024, 1440 and 1920 pixels.

| Pattern | Desktop | Mobile / tablet |
| --- | --- | --- |
| Navigation | Inline links plus booking CTA | "Menu" trigger, full-screen overlay with numbered links and socials |
| Lookbook | Sticky section, vertical scroll drives horizontal movement | Native `overflow-x` snap gallery with "swipe to explore" hint |
| Philosophy | Split screen, hover swaps image and copy in a sticky column | Stacked tap accordion with inline copy and thumbnail |
| Services rows | Alternating image/content in a 12-column grid | Stacked, image first |
| Team | Asymmetric 12-column composition with offsets | Single/double column portrait list |
| Footer | Multi-column | Stacked structured blocks |
| Booking | Wizard plus sticky summary sidebar | Wizard with compact progress and summary below |

Spacing follows one scale: section padding `clamp(4rem, 6vw + 2rem, 11rem)`, gutter `clamp(1.25rem, 5vw, 5rem)`. Touch targets are at least 44 px.

## Accessibility

- Semantic landmarks and heading hierarchy on every page; a skip link to `#main`
- Animated text keeps the plain string in a visually hidden span; animated fragments are `aria-hidden`
- Mobile menu is a `role="dialog"` with `aria-modal`, initial focus, focus return, Escape to close and scroll locking
- Accordions and interactive lists expose `aria-expanded`, `aria-controls` and labelled regions; service rows support Arrow, Home and End keys
- Filter tabs, category cards, artist cards, dates and time slots use `aria-pressed` / radio-group semantics with visible selected states
- Form fields have real labels, `aria-invalid`, `aria-describedby` and `role="alert"` errors; the first invalid field receives focus
- Testimonial changes are announced through a polite live region
- `focus-visible` outlines throughout, adjusted for dark sections
- `prefers-reduced-motion` is honoured three ways: Framer Motion's `MotionConfig reducedMotion="user"`, Lenis's `respectReducedMotion`, and a global CSS fallback; magnetic buttons and the custom cursor switch off entirely
- Colour contrast: ink on ivory (≈15:1), ivory on ink, and muted text kept at or above 4.5:1 for body copy

## Performance

- `next/image` everywhere with explicit `sizes`, AVIF/WebP negotiation and `priority` only on above-the-fold media
- `next/font` self-hosts Instrument Serif and Manrope with `display: swap` and CSS variables (no layout shift from web fonts)
- Server Components by default; client components only where interaction requires them
- Animations use `transform`, `opacity` and `clip-path`; no layout-triggering properties, no continuous listeners beyond one scroll subscription
- The horizontal gallery measures once with `ResizeObserver` instead of on every scroll event
- Intersection-based reveals observe unclipped wrappers so observers fire reliably and only once
- Minimal dependency surface: one animation library, one icon library, one scroll library

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> Note: if the project sits in a folder path containing `&`, npm's `.bin` shims fail on Windows. Run `node node_modules/next/dist/bin/next dev` directly, or move the folder.

## Production build

```bash
npm run build
npm start
```

## Live demo

_Placeholder until deployment._

## Screenshots

_Placeholders until capture._

- Home hero
- Horizontal lookbook
- Services accordion
- Artist profile
- Booking wizard

## Notes on scope

There is intentionally no backend, database, CMS, authentication or payment integration. The booking flow is a convincing client-side prototype and says so on its confirmation screen. The hero photograph is a local asset (`public/images/hero.png`, statically imported so Next.js can size it and generate a blur placeholder). The remaining photography is placeholder editorial imagery from Unsplash and is structured to be swapped for licensed assets.
