/**
 * Single source of truth for the personal data displayed across the portfolio.
 * Centralizing it means About / Experience / Projects / SEO all stay in sync,
 * and rebuilding sections becomes a content-only edit.
 *
 * Everything in this file is sourced from the latest Yun-Chen Lee résumé.
 * Anything that is *not* in the résumé (e.g. the Graphics Town and Jovana
 * project framings) is intentionally short and labelled as a public-facing
 * pitch rather than claimed work.
 */

export interface ContactLink {
  label: string;
  href: string;
  /** Short identifier used to render an icon in the UI. */
  kind: "github" | "linkedin" | "email" | "resume" | "external";
}

export interface EducationEntry {
  school: string;
  degree: string;
  /** Free-form date range, e.g. "Sep 2025 — May 2027" */
  dates: string;
  /** Optional GPA / honors line. */
  detail?: string;
  /** Optional related courses list. */
  courses?: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  /** Free-form date range, e.g. "Jul 2024 — Present" */
  dates: string;
  location?: string;
  /** Two short paragraphs describing the role as a story, not bullet dump. */
  highlights: string[];
  /** Headline tech badges shown on the card. */
  stack: string[];
  /** Optional link to learn more about the company / project. */
  href?: string;
  /** Optional one-line theme that anchors the card visually. */
  theme?: string;
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
  /** Honest status badge (e.g. "WIP", "Live", "Demo"). */
  status?: string;
}

export const PROFILE = {
  name: "Yun-Chen Lee",
  alias: "Donkey",
  /** Headline role on the hero card. */
  title: "Software Engineer",
  /** Subtitle pill on the hero. */
  subtitle: "Building AI, Graphics, and Web Experiences",
  tagline:
    "MSCS @ UW–Madison · Frontend, full-stack, and AI-assisted developer tooling.",
  location: "Madison, WI",
  phone: "608-896-5504",
  email: "donkey.leelee@gmail.com",
  website: "donkeylee.com",
  resumeHref: "/Yun-Chen-Lee-Resume.pdf",
  summary:
    "Software engineer comfortable on both sides of the stack. I've shipped frontend platforms at Appier, Crescendo Lab, 1111 Job Bank, and NTU; built backend services in Fastify and Spring Boot; and most recently spent a summer at TSMC wiring AI-assisted refactoring into legacy Java test suites. I like calm UI, durable infrastructure, and the small joy of a developer-tool that disappears into the workflow.",
  education: [
    {
      school: "University of Wisconsin–Madison",
      degree: "Master of Science in Computer Science",
      dates: "Sep 2025 — May 2027",
      detail: "GPA 3.9 / 4.0",
      courses: [
        "Distributed Systems",
        "Big Data Systems",
        "Database Management",
        "Data Visualization",
      ],
    },
    {
      school: "National Taiwan University",
      degree: "B.B.A. in Information Management",
      dates: "Sep 2020 — Jun 2024",
      detail: "GPA 3.93 / 4.0",
    },
  ] satisfies EducationEntry[],
  interests: [
    "WebGL & generative art",
    "Developer tooling & AI agents",
    "Distributed & big-data systems",
    "Tea, ceramics, badminton",
  ],
  /** Skill stacks grouped the same way the résumé presents them. */
  skills: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "SQL"],
    },
    {
      group: "Frontend",
      items: [
        "React",
        "Vue",
        "Next.js",
        "Nuxt.js",
        "React Native",
        "Three.js",
        "Storybook",
        "Playwright",
      ],
    },
    {
      group: "Backend",
      items: [
        "Node.js",
        "Fastify",
        "Spring Boot",
        "Django",
        "FastAPI",
        "REST",
        "gRPC",
      ],
    },
    {
      group: "Data",
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Spark",
        "Kafka",
        "BigQuery",
      ],
    },
    {
      group: "Infra",
      items: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "Helm", "NGINX"],
    },
  ],
  contact: [
    {
      label: "GitHub",
      href: "https://github.com/Donkey0322",
      kind: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yunchen-lee-donkey/",
      kind: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:donkey.leelee@gmail.com",
      kind: "email",
    },
    {
      label: "Résumé",
      href: "/Yun-Chen-Lee-Resume.pdf",
      kind: "resume",
    },
  ] satisfies ContactLink[],
} as const;

/**
 * Experience entries are ordered newest-first so the timeline reads
 * top-down chronologically when laid out on the page.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "TSMC",
    role: "Software Engineering Intern",
    dates: "May 2026 — Aug 2026",
    location: "Hsinchu, Taiwan",
    theme: "AI-assisted modernization for legacy test suites",
    highlights: [
      "Built codebase-aware AI Skills powered by Azure MCP that automatically decouple external dependencies in 500+ Spring Boot tests, turning a multi-week manual refactor into a reusable rollout across 30+ repositories.",
      "Migrated database-coupled unit tests into mock-based integration tests and Playwright E2E suites, holding 70%+ coverage while feeding decoupling ratio and SonarQube quality signals back into the team's dashboards.",
    ],
    stack: ["Java", "Spring Boot", "Azure MCP", "Playwright", "SonarQube"],
  },
  {
    company: "1111 Job Bank",
    role: "Frontend Software Engineer Intern",
    dates: "Apr 2025 — Jul 2025",
    location: "Taipei, Taiwan",
    theme: "Internal tools and an AI layout editor",
    highlights: [
      "Engineered a Vue.js event-management dashboard that orchestrates RabbitMQ workflows across 20+ services, cutting manual handling by ~70% via CRUD tooling, RBAC, and type-safe API integrations.",
      "Prototyped a Nuxt.js AI layout editor wired into Figma MCP so non-technical users can compose 3 block types across 5+ templates without pulling in an engineer.",
    ],
    stack: ["Vue.js", "Nuxt.js", "TypeScript", "Figma MCP", "RabbitMQ"],
  },
  {
    company: "NTU — Office of Academic Affairs",
    role: "Backend Software Engineer Intern",
    dates: "Sep 2023 — Jul 2025",
    location: "Taipei, Taiwan",
    theme: "Course allocation & registration platform",
    highlights: [
      "Refactored a legacy course-allocation system handling 1M+ course–student pairs in Python and PostgreSQL, with Jenkins-triggered API pipelines that automate workflows for 30K+ students.",
      "Architected and shipped NTU's greenfield course-enrollment module in Fastify, designing API, validation framework, and repository architecture to fold 20+ registrar policies into reusable services.",
    ],
    stack: ["Fastify", "Python", "PostgreSQL", "Jenkins", "TypeScript"],
    href: "https://www.aca.ntu.edu.tw/w/acaEN/Index",
  },
  {
    company: "Appier",
    role: "Frontend Software Engineer Intern",
    dates: "Jan 2024 — Mar 2025",
    location: "Taipei, Taiwan",
    theme: "Pipeline health and UI reliability",
    highlights: [
      "Diagnosed dependency-graph fragmentation in the build system and enforced deterministic package resolution, dropping CI/CD pipeline build time by ~65%.",
      "Resolved long-standing async race conditions with deterministic request sequencing and client-side interaction locks, cutting Datadog-tracked rendering failures by 87%.",
    ],
    stack: ["React", "TypeScript", "GitHub Actions", "Datadog"],
    href: "https://www.appier.com/en/",
  },
  {
    company: "Crescendo Lab",
    role: "Frontend Software Engineer Intern",
    dates: "Jul 2023 — Jan 2024",
    location: "Taipei, Taiwan",
    theme: "Reusable component libraries",
    highlights: [
      "Built company-wide reusable React + TypeScript UI libraries as internal npm packages, plumbed into Storybook and a Django BFF — pulling repeated feature delivery from weeks down to hours.",
    ],
    stack: ["React", "TypeScript", "Storybook", "Django"],
    href: "https://www.cresclab.com/en",
  },
];

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "graphics-town",
    title: "Graphics Town",
    tagline:
      "A WebGL playground I keep building creatures inside. This pond is its newest exhibit.",
    description:
      "An evolving graphics sandbox — hand-authored geometry, GLSL water, bezier swim paths, mouse-driven ripples. The koi pond on this site is part of the same playground: every primitive in the hero is shaped by code, not stock assets.",
    stack: ["TypeScript", "Three.js", "React Three Fiber", "GLSL", "WebGL"],
    highlights: [
      "Procedural koi & lotus geometry generated at mount time (no model assets)",
      "Object-pooled ripple field driven by pointer position",
      "Season-aware palette wired into both DOM and WebGL materials",
    ],
    href: "/#hero",
    featured: true,
    status: "Live on this page",
  },
  {
    slug: "jobradar",
    title: "JobRadar",
    tagline: "An AI-powered job-tracking template that watches the boards so I don't have to.",
    description:
      "Open-source TypeScript / Node template that crawls ATS providers, dedupes postings across reposts, runs each JD through an LLM extraction step, then emails me the ones that actually match. Runs free on a GitHub Actions cron.",
    stack: [
      "TypeScript",
      "Node.js",
      "ATS Crawlers",
      "LLM Extraction",
      "GitHub Actions",
    ],
    highlights: [
      "Tracks 6,600+ roles across 1,500+ companies",
      "Concurrent ATS JD crawlers with URL-level deduplication",
      "LLM-powered filtering turns messy JDs into structured role signals",
      "Email alerts whenever something matches user-defined criteria",
    ],
    repo: "https://github.com/Donkey0322",
    status: "Open source",
  },
  {
    slug: "jovana",
    title: "Jovana",
    tagline: "A calm product idea I'm shaping in the open.",
    description:
      "A work-in-progress for a calm space where personal notes link themselves. Today this is a placeholder card — the fuller story (and screenshots) lands once the first usable cut does.",
    stack: ["In progress", "Next.js", "Local-first sync"],
    highlights: [
      "Concept: a quiet notebook where structure emerges from links",
      "Stack TBD — leaning Next.js + local-first sync",
      "Public roadmap once the v0 demo is stable",
    ],
    status: "WIP",
  },
];
