import type { ProjectEntry } from "@/lib/site/profile";

import Reveal from "@/components/animations/Reveal";
import { ExternalIcon, GithubIcon, SparkleIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

interface Props {
  project: ProjectEntry;
  /** Optional decorative artwork rendered behind the card content. */
  artwork?: React.ReactNode;
  className?: string;
}

/**
 * Single project card. Renders entirely on the server. Hover lift / shadow
 * are pure CSS so we don't need a client wrapper here.
 */
export default function ProjectCard({ project, artwork, className }: Props) {
  const featured = project.featured;
  return (
    <Reveal>
      <article
        className={cn(
          "glass-card group relative flex h-full flex-col overflow-hidden rounded-stone p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-water md:p-8",
          featured && "ring-1 ring-pond-300/60",
          className
        )}
        data-project={project.slug}
      >
        {artwork && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-90"
          >
            {artwork}
          </div>
        )}

        {featured && (
          <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-koi/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-koi">
            <SparkleIcon />
            Featured
          </div>
        )}

        <h3 className="font-display text-2xl text-ink md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-pond-700">
          {project.tagline}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-[0.95rem]">
          {project.description}
        </p>

        <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
          {project.highlights.map((h, idx) => (
            <li key={idx} className="relative pl-4">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-leaf"
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-pond-100 px-2.5 py-1 text-[11px] font-medium text-pond-800"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {project.href && (
            <a
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-pond-700 px-4 py-2 text-sm font-medium text-canvas-soft transition-colors hover:bg-pond-800"
            >
              <span>Visit</span>
              <ExternalIcon />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas-soft/70 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-pond-300 hover:text-pond-700"
            >
              <GithubIcon />
              <span>Code</span>
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
