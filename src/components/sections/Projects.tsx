import Reveal from "@/components/animations/Reveal";
import ProjectCard from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/lib/site/profile";

/**
 * Decorative SVG used as the background of the featured Graphics Town card.
 * Pure SVG (no JS) so it stays in the SSR output.
 */
function GraphicsTownArt() {
  return (
    <svg
      role="presentation"
      className="h-full w-full"
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gt-water" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stopColor="var(--pond-200)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--pond-50)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#gt-water)" />
      {/* Concentric ripples */}
      {[60, 120, 200, 290].map((r, i) => (
        <circle
          key={r}
          cx="430"
          cy="220"
          r={r}
          fill="none"
          stroke="var(--pond-400)"
          strokeOpacity={0.18 - i * 0.03}
          strokeWidth="1"
        />
      ))}
      {/* Stylized koi silhouettes */}
      <g fill="var(--koi)" opacity="0.85">
        <path d="M120 230 q30 -28 80 -22 q22 4 26 22 q-4 18 -26 22 q-50 6 -80 -22 z" />
        <path d="M118 230 q-14 -8 -22 -2 q4 6 0 12 q8 6 22 -2 z" opacity="0.7" />
      </g>
      <g fill="var(--koi-soft)" opacity="0.85">
        <path d="M340 290 q24 -22 64 -18 q18 4 22 18 q-4 14 -22 18 q-40 4 -64 -18 z" />
      </g>
      {/* Lotus leaves */}
      <g fill="var(--leaf-soft)" opacity="0.55">
        <ellipse cx="500" cy="120" rx="70" ry="22" />
        <ellipse cx="80" cy="320" rx="80" ry="24" />
      </g>
    </svg>
  );
}

/**
 * Server-rendered projects grid. Featured project (Graphics Town) gets its
 * own wider hero card, the other two share an equal split below.
 */
export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-pond-600">
            Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-3 font-display text-4xl text-ink md:text-5xl"
          >
            Three projects worth a closer look.
          </h2>
          <p className="mt-3 max-w-xl text-ink-soft">
            A WebGL playground (you&apos;re standing in it), an open-source
            AI-powered job radar shipping ATS crawls + LLM filtering on a
            free GitHub Actions cron, and a calmer notes idea I&apos;m
            shaping in the open.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured && (
            <ProjectCard
              project={featured}
              artwork={<GraphicsTownArt />}
              className="md:col-span-2"
            />
          )}
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
