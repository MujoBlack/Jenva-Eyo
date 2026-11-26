# Jenva Eyo

Official website for Jenva Eyo. A Next.js rebuild of the original Webflow site, with every scroll animation and micro-interaction recreated in GSAP.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- GSAP 3 (ScrollTrigger, SplitText, Flip) via `@gsap/react`
- Tailwind CSS 4 (theme + utilities) on top of the ported design system in `src/app/site.css`

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/app/page.tsx` | Page: preloader, hero, Vibe, Tracks, Lives, Story, Signal, footer |
| `src/components/Sections.tsx` | Markup for each section |
| `src/components/Motion.tsx` | All GSAP animations, with timings copied from the original site |
| `src/components/LiveShows.tsx` | Berlin / Zurich / Geneva tabs (Flip highlight + sliding panels) |
| `src/components/Newsletter.tsx` | "Join the rhythm circle" form |
| `src/app/api/subscribe/route.ts` | Newsletter endpoint |
| `src/lib/content.ts` | Copy, links, images, stats |
| `public/media`, `public/fonts` | Self-hosted images, videos and fonts |

Animations respect `prefers-reduced-motion`: the preloader is skipped and background videos pause.

## Newsletter

The newsletter service is not chosen yet. Set `NEWSLETTER_WEBHOOK_URL` (see `.env.example`) to any endpoint that accepts a JSON POST of `{ email }`. Until it is set, the form shows its error message rather than a false confirmation.

## Deploy

Import the repo in Vercel (framework preset: Next.js, no build settings to change) and add `NEWSLETTER_WEBHOOK_URL` under Environment Variables once a service is picked.

## Fonts

LT Superior Serif is self-hosted from `public/fonts` under the site owner's licence. Instrument Sans (Google Fonts) and Geist Mono are free.
