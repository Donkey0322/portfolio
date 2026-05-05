/**
 * Single source of truth for the personal data displayed across the portfolio.
 * Centralizing it means About / Experience / Projects / SEO all stay in sync,
 * and rebuilding sections becomes a content-only edit.
 */

export interface ContactLink {
  label: string;
  href: string;
  /** Short identifier used to render an icon in the UI. */
  kind: "github" | "linkedin" | "email" | "resume" | "external";
}

export interface ExperienceEntry {
  company: string;
  role: string;
  /** Free-form date range, e.g. "Jul 2024 — Present" */
  dates: string;
  location?: string;
  /** Two or three of the strongest impact bullets. Resist the urge to dump everything. */
  highlights: string[];
  /** Headline tech badges shown on the card. */
  stack: string[];
  /** Optional link to learn more about the company / project. */
  href?: string;
}

export interface ProjectEntry {
  slug: "graphics-town" | "jobradar" | "jovana";
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  /** Bullet-style highlights of what the project does or proves. */
  highlights: string[];
  /** Primary visit link, if any. */
  href?: string;
  /** Source link, if separate. */
  repo?: string;
  /** Optional embeddable preview URL (iframe). Only set when CORS / X-Frame-Options allow. */
  embedUrl?: string;
  /** Whether to mark this project as the headline / "featured" card. */
  featured?: boolean;
}

export const PROFILE = {
  name: "Yun-Chen Lee",
  alias: "Donkey",
  title: "Frontend Engineer",
  tagline: "Crafting calm, performant web experiences.",
  location: "Taipei, Taiwan",
  email: "donkey0322@gmail.com",
  resumeHref: "/Résumé v-icon.pdf",
  summary:
    "Frontend engineer with a soft spot for thoughtful UI, smooth animations, and infrastructure that keeps shipping painless. I like building products that feel calm, not loud — and tools that disappear into the workflow.",
  education: [
    {
      school: "National Taiwan University",
      degree: "B.S. in Information Management & Computer Science",
      dates: "2020 — 2025",
    },
  ],
  interests: [
    "WebGL & generative art",
    "Developer tooling",
    "Coffee & ceramics",
    "Badminton",
  ],
  contact: [
    {
      label: "GitHub",
      href: "https://github.com/Donkey0322",
      kind: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yun-chen-lee/",
      kind: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:donkey0322@gmail.com",
      kind: "email",
    },
    {
      label: "Résumé",
      href: "/Résumé v-icon.pdf",
      kind: "resume",
    },
  ] satisfies ContactLink[],
} as const;

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Appier Inc.",
    role: "Frontend Software Engineer Intern",
    dates: "Jul 2024 — Present",
    location: "Taipei, Taiwan",
    highlights: [
      "Hardened CI pipelines so feature branches ship to staging in minutes instead of hours.",
      "Refactored a legacy data-table flow that used to lock the UI on large payloads — interactions now stay sub-100ms.",
      "Owned cross-team reliability follow-ups, turning recurring incidents into self-healing checks.",
    ],
    stack: ["TypeScript", "React", "Next.js", "GitHub Actions", "AWS"],
    href: "https://www.appier.com/en/",
  },
  {
    company: "Crescendo Lab",
    role: "Frontend Engineer Intern",
    dates: "Sep 2023 — Jun 2024",
    location: "Taipei, Taiwan",
    highlights: [
      "Shipped multiple chat-marketing features end-to-end inside a SaaS product used by enterprise brands.",
      "Replaced ad-hoc form patterns with a typed, reusable layer that cut new-form scaffolding from days to hours.",
    ],
    stack: ["React", "TypeScript", "Recoil", "Storybook"],
    href: "https://www.cresclab.com/en",
  },
  {
    company: "NTU Office of Academic Affairs",
    role: "Frontend Developer",
    dates: "Feb 2023 — Aug 2023",
    location: "Taipei, Taiwan",
    highlights: [
      "Built internal tools used by NTU staff to manage course registration windows for thousands of students.",
      "Translated requirement-light tickets into shippable UI by partnering directly with non-technical stakeholders.",
    ],
    stack: ["React", "JavaScript", "Ant Design"],
    href: "https://www.aca.ntu.edu.tw/w/acaEN/Index",
  },
  {
    company: "Jöinee",
    role: "Founding Engineer & Project Lead",
    dates: "2022 — 2023",
    highlights: [
      "Led a four-person team building a badminton meetup web app from scratch — design, infra, frontend, and launch.",
      "Owned the typed Vite + Firebase stack, plus the map / matchmaking flow that made the experience click.",
    ],
    stack: ["TypeScript", "Vite", "Firebase", "Google Maps", "Framer Motion"],
    href: "https://joinee-ee017.web.app/entry",
  },
];

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "graphics-town",
    title: "Graphics Town",
    tagline: "A tiny WebGL world I keep building creatures inside.",
    description:
      "An evolving WebGL playground inspired by the classic Graphics Town assignment. Trees sway, koi drift through a pond, particles catch the light — every primitive is hand-built so I can keep poking the math.",
    stack: ["TypeScript", "Three.js", "GLSL Shaders", "WebGL"],
    highlights: [
      "Custom water shader with mouse-driven ripple field",
      "Hand-authored bezier paths for koi and bird flight",
      "Composable scene graph that hot-reloads in development",
    ],
    href: "/#projects",
    featured: true,
  },
  {
    slug: "jobradar",
    title: "JobRadar",
    tagline: "An AI job radar that watches the boards so I don't have to.",
    description:
      "A TypeScript / Node crawler that pulls listings across ATS providers, dedupes them, runs them through an LLM extraction step, and pings me when something matches my criteria — all on a free GitHub Actions cron.",
    stack: [
      "TypeScript",
      "Node.js",
      "Playwright",
      "LLM Extraction",
      "GitHub Actions",
    ],
    highlights: [
      "Auto-detects Greenhouse / Lever / Ashby boards from a company URL",
      "LLM-backed normalization turns messy postings into structured jobs",
      "Dedupes across reposts so I only see something once",
    ],
    repo: "https://github.com/Donkey0322",
  },
  {
    slug: "jovana",
    title: "Jovana",
    tagline: "A new project — coming up out of the pond soon.",
    description:
      "A work-in-progress idea I'm shaping in the open. Placeholder card today, fuller story (and screenshots) once the first usable cut lands.",
    stack: ["In progress"],
    highlights: [
      "Concept: a calm space for personal notes that link themselves",
      "Stack TBD — leaning Next.js + a local-first sync layer",
    ],
  },
];
