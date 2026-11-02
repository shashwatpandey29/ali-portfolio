# elev8rix — Digital Experience Studio

## Overview
The elev8rix portfolio pairs a responsive digital studio site with five interactive industry concepts: hospitality, education, home services, fitness, and legal. It is built with **Vite + React**, styled with **Tailwind CSS**, animated with **Framer Motion**, and smooth-scrolled with **Lenis**.

## Getting Started
```bash
# Install dependencies (Windows – use legacy peer deps)
npm install --legacy-peer-deps
```

## Development Server
Run the development server to preview the UI locally (hot‑reloading enabled):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`. You should see the new dark‑first UI with custom cursor, smooth scrolling, and animated sections.

## Production Build
To create an optimized static bundle:
```bash
npm run build
```
The output is placed in the `dist/` folder.

## Preview Production Build
You can serve the built files locally (requires `serve` which is installed as a dev dependency):
```bash
npx serve -s dist
```
Then open `http://localhost:5000` (or the port shown in the console).

## Customizing Themes
Industry concepts use their own visual systems: Maison Ember (café), Northfield (school), UrbanNest (home services), Forge Athletics (fitness), and Alder & Rowe (legal). Their enquiry and booking forms save locally in the browser as interactive demonstrations.

## Further Development
- **Three.js / React‑Three‑Fiber** integration can be added for 3D visuals.
- Adjust Tailwind design tokens in `tailwind.config.js` for brand colors.
- Extend component library in `src/shared.jsx`.

---
