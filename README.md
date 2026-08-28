# Hansel Kristanzen — Portfolio

A personal portfolio site for Hansel Kristanzen, a computer science student and
designer at BINUS University. Built as a creative-technologist showcase: the
site itself is meant to demonstrate the same engineering and design sense
described in it.

**Live concept:** editorial layout, restrained warm-paper/near-black palette
with a single signal-amber accent, and an original interactive 3D
"computational lattice" — a node/edge network (not a stock rotating sphere)
that responds to pointer movement and scroll.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) for the hero 3D scene
- [GSAP](https://gsap.com) (+ ScrollTrigger) for orchestrated motion
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- CSS Modules + a centralized design-token system (`src/styles/tokens.css`) — no CSS framework

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

## Project structure

```
src/
  components/
    layout/     Navigation, custom cursor, loader, footer
    three/      The 3D lattice system — geometry, materials, camera, fallback
    ui/         Reusable primitives (Reveal, MagneticButton, Tag, SectionHeading)
  sections/     One folder per page section (hero, about, projects, research, ...)
  data/         Typed content — projects, research, experience, education, etc.
  hooks/        Reduced-motion, media queries, scroll progress, in-view, tilt
  lib/          GSAP setup, Lenis/smooth-scroll context, motion tokens
  styles/       Design tokens + global base styles
  types/        Shared content type definitions
```

Content lives entirely in `src/data/*.ts` — update those files to change any
text, dates, links, or stats without touching presentation code. The one
research figure not published in the source study (Rule-Based Matching's
accuracy/latency) is intentionally left as `null` and rendered as
"Not reported" rather than estimated.

## Notes on the 3D scene

- Node/edge count scales down on tablet and mobile.
- Falls back to a static SVG (no motion, no WebGL) under
  `prefers-reduced-motion` or if WebGL isn't available.
- Code-split via `React.lazy` so the three.js/R3F bundle downloads
  separately from the rest of the app.
- Only renders its frame loop while the hero section is near the viewport.

## Deployment

Static build output lands in `dist/`. Works on any static host — Vercel,
Netlify, GitHub Pages, etc. For Vercel: framework preset "Vite", build
command `npm run build`, output directory `dist`.
