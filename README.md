# Portfolio

Sonal Anand's personal portfolio — Next.js (App Router), TypeScript, Tailwind CSS.

Currently implemented: **Navbar** and **Hero** only, per the build-in-stages plan.
Remaining sections (capability strip, services, work, products, about, contact,
footer) are intentionally not built yet.

## Design system

Colors, type, spacing, radii, shadows and motion all come from the "Ink & Signal"
token set defined in `app/globals.css` and wired into `tailwind.config.ts`.
Components consume token-backed Tailwind classes (`bg-paper`, `text-ink`,
`border-line`, `text-signal`, etc.) rather than raw colors, so light/dark/system
theming works without any component branching on theme.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Theme system

- Respects `prefers-color-scheme` by default (light if the OS has no preference).
- The navbar toggle offers System / Light / Dark.
- A manual choice is saved to `localStorage` and restored on future visits.
- An inline script in `app/layout.tsx` applies the saved choice before paint,
  so there's no flash of the wrong theme.
