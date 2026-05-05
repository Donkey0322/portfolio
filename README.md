# Donkey Lee · Portfolio (`donkeylee.com`)

A calm, koi-pond-themed personal portfolio for Yun-Chen (Donkey) Lee.
Built with **Next.js 15 App Router**, **Tailwind CSS v4**, **Framer Motion**,
and a small client-only **React Three Fiber** koi-pond hero.

The redesign is intentionally **SSR-first**: only the things that have to be
client (the koi pond canvas, scroll-reveals, the season switcher, the PDF
viewer) are client components. Everything else — About, Experience, Projects,
nav skeleton, footer, metadata — is rendered on the server for great SEO and
fast initial paint.

---

## Project layout

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, season-boot script, providers, analytics
│   ├── page.tsx            # SSR home (Hero is the only client island)
│   ├── globals.css         # Tailwind v4 + season palette CSS variables
│   └── resume/page.tsx     # SSR résumé page; viewer isolated in a client wrapper
│
├── components/
│   ├── animations/         # Reveal, YinYangKoi (small client islands)
│   ├── icons/              # In-house SVG icon set (currentColor)
│   ├── nav/                # SiteNav, SiteFooter, SeasonSwitcher
│   ├── pond/               # KoiPondHero + KoiPondScene (R3F) + HeroFallback (SVG)
│   ├── resume/             # ClientResume + ResumeViewer (react-pdf)
│   ├── sections/           # About, Experience, Projects, ProjectCard (server)
│   └── track/              # Vercel Analytics wiring
│
├── lib/
│   ├── season/             # Season type, palette tokens, SSR-safe boot script
│   └── site/               # Profile / experience / projects content
│
├── providers/season/       # React context for the season palette
├── utils/                  # cn() helper, shared TS types
└── middleware.ts           # Geo headers for tracked routes
```

```
tests/unit/                 # Vitest + React Testing Library component tests
e2e/                        # Playwright user-flow tests
```

---

## Tech choices

| Concern             | Choice                                | Why                                                                 |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| Framework           | Next.js 15 App Router                 | RSC-first, fast image / font primitives                             |
| Styling             | **Tailwind v4** + CSS variables       | Replaced `styled-components` — better SSR, no FOUC, smaller runtime |
| UI primitives       | **Custom Tailwind components**        | Replaced **Ant Design** — heavy for a 3-section portfolio           |
| 3D                  | `@react-three/fiber` 8 + `three` 0.184 | Stays on React 18 (R3F v9 needs React 19)                          |
| Animation           | Framer Motion                         | Scroll reveals + scroll-linked yin-yang transition                  |
| Tests               | Vitest + RTL, Playwright              | Unit + e2e smoke coverage for key flows                             |
| Analytics           | `@vercel/analytics`                   | Same as before, wired through middleware geo headers                |

The **season palette** is implemented as four CSS variable sets selected by
`<html data-season="…">`. A small `beforeInteractive` script reads the user's
saved season from `localStorage` and sets the attribute *before* paint, so we
never get a palette flash on first load.

The **koi pond hero** is `dynamic(() => …, { ssr: false })`. It is only
mounted when:

- `prefers-reduced-motion` is **off**
- viewport ≥ 768px
- WebGL is available
- the browser is idle (uses `requestIdleCallback` when available)

Otherwise the page falls back to a JS-free SVG version of the same scene.

---

## Getting started

```bash
pnpm install
pnpm dev                  # http://localhost:3000
```

### Build / start

```bash
pnpm build
pnpm start
```

### Tests

```bash
pnpm test                 # Vitest unit tests (jsdom)
pnpm test:watch           # Vitest in watch mode
pnpm test:e2e:install     # one-time: install Playwright browsers
pnpm test:e2e             # Playwright (auto-starts dev server on :3000)
```

E2E tests cover:

1. Hero renders, "Wander in" CTA scrolls to `#about`, all 3 project cards show
2. Season switcher persists the chosen palette across reloads
3. `/resume` page renders with a download button

Unit tests cover:

- `<SeasonSwitcher />` — radios, persistence, html attribute
- `<ProjectCard />` — content, featured badge, conditional links
- `<About />` — bio, education, contact links, downloadable résumé

### Linting

```bash
pnpm lint                 # next lint . --ext ts,tsx --max-warnings 0 --fix
```

---

## Content

All editable content (bio, summary, education, experience entries,
project descriptions) lives in [`src/lib/site/profile.ts`](src/lib/site/profile.ts).
Edit there — the home page rebuilds itself.

---

## Deployment

Deployed on Vercel. The `vercel.json` and `.vercel/` folders are tracked.
Ensure environment variables, if any, are configured in the Vercel dashboard.
