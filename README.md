# Velora - Beauty Atelier

Velora is a fictional beauty salon in Colombo. I built this site as a front-end assessment, and the idea was to make the salon and beauty category feel closer to a fashion or design studio than the usual template with three service cards and a contact form.

It is five pages: a home page, a services menu, the artists with a profile page each, a journal, and a booking flow. Everything runs on the front end. There is no backend, and the booking wizard says so on its final screen.

## Running it

You need Node 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. For a production build, run `npm run build` and then `npm start`.

## The pages

Home is the main piece. It opens with a short loader, then a video hero, a manifesto line that reveals a word at a time, the three signature services in alternating rows, a lookbook that moves sideways as you scroll down the page, the team, a philosophy section you can hover or tap through, testimonials shown one at a time, and a closing call to action.

Services is a filterable list. Pick a category and the rows re-sort; open a row to read what the service includes, with a link straight into the booking flow that preselects it.

Artists is a team grid, and each person has their own profile page such as `/artists/amara-silva`, with links to the previous and next artist.

Journal is a magazine-style grid of articles, each with its own reading page.

Book is a five-step flow: choose a service, an artist, a date and time, fill in your details, and get a confirmation you can add to your calendar. The details form validates and moves focus to the first field that needs attention. The availability is made up but consistent, so a given date always shows the same open slots.

There is also a `/style-guide` page showing the colours, type and buttons. It is not linked anywhere and search engines are told to skip it.

## How it is built

Next.js with the App Router, React and TypeScript. Tailwind for the styling, with the colours, type scale and spacing kept as tokens in `app/globals.css` so I am not repeating values across files. Framer Motion handles all the animation: the reveals, the menu, the wizard steps and the small hover details. Lenis smooths the scrolling but steps aside when someone prefers reduced motion. Icons come from Lucide.

I kept the dependency list short on purpose. One animation library, one icon set, one scroll library, and no WebGL or particle effects.

The content lives in `data/` behind TypeScript types, so the services, artists and articles exist in one place and the components just read from them. Replacing the copy or photos later means editing those files rather than digging through the markup.

```
app/          routes, layout, metadata, sitemap and robots
components/   layout, the home sections, and the services / artists / journal / booking
              pieces, plus small reusable ui and motion helpers
data/         all the site content, typed
lib/          class helper, animation presets, hooks, booking date and ics logic
types/        the shared interfaces
```

## Responsive and accessibility

I laid each size out on its own terms instead of shrinking the desktop version. The sideways lookbook becomes an ordinary swipe gallery on a phone, the hover philosophy section becomes a tap accordion, the team grid becomes a portrait list, and the navigation collapses into a full-screen menu.

On accessibility: the headings and landmarks are in order, there is a skip link, the mobile menu keeps focus inside it and closes on Escape, the accordions and the booking controls carry the right ARIA state and work from the keyboard, form errors are announced and tied to their fields, and animated headings keep a plain readable copy for screen readers. Reduced motion is respected in three places, in Framer Motion, in Lenis and in a CSS fallback, and the custom cursor and the magnetic buttons switch off for touch and reduced motion.

## Performance

Images go through `next/image` with real `sizes`, the fonts load through `next/font` so nothing shifts as they arrive, and the hero video is compressed to around a megabyte with a poster frame that shows first and also stands in when motion is reduced. Most of the page renders on the server; only the interactive parts run in the browser. The animations stick to transform, opacity and clip-path so they do not force layout.

## Notes

No backend, database or payments, by design. This is a front-end and UI piece. The photography and the hero clip are placeholders, wired so they can be swapped for licensed assets in one place. A live link and screenshots will go here once it is deployed.
