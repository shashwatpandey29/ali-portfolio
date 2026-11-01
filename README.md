# Form & Function — digital studio concept

A single React application with four independent, responsive website experiences: the agency portfolio, Maison Ember restaurant, Northfield International Academy, and UrbanNest home services. The three business sites are interactive concept demonstrations, not client engagements.

## Run locally

```sh
npm install
npm run dev
```

Build and preview the production bundle:

```sh
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository into Vercel. Use the Vite defaults (`npm run build`, output directory `dist`). `vercel.json` rewrites app paths to `index.html`, so nested React Router routes also work after a direct visit or refresh. No environment variables or backend are required.

## Project map

- `src/config.js` — agency contact details, portfolio projects, image helper, and local demo storage.
- `src/agency.jsx` — agency layout, portfolio home, and services/work/about/contact pages.
- `src/cafe.jsx` — Maison Ember pages, category filters, and booking/contact forms.
- `src/school.jsx` — Northfield pages and inquiry flows.
- `src/business.jsx` — UrbanNest pages and quote/contact flows.
- `src/shared.jsx` — navigation, footers, links, and browser-local demonstration form.
- `src/styles.css` — responsive layout and the four separate visual systems.

Navigation uses short Framer Motion transitions, while the café menu animates item filtering and layout changes. A subtle reading progress line and scroll reveals add motion to long pages. These effects reduce or stop when the visitor requests reduced motion.

Each demo includes an “Agency home” link in its navigation, while the business logo and footer return to that demo’s own homepage.

## Demo behavior and content

Forms validate required inputs in the browser and save submitted values in local storage under separate demo keys. Confirmation states clearly say that submissions stay in the current browser and are not sent to a business. The agency contact name, email, phone, and links in `src/config.js` are sample settings; update them before using the portfolio for a real business. School, restaurant, and service-company content is fictional. The home-service testimonial is labeled sample content.

Photos are loaded from Unsplash URLs, so an internet connection is needed to see those images. No API keys, backend, or paid service is used.
