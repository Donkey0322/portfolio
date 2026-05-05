import Reveal from "@/components/animations/Reveal";
import {
  CalendarIcon,
  ExternalIcon,
  FileIcon,
  MapPinIcon,
} from "@/components/icons";
import { EXPERIENCE, PROFILE } from "@/lib/site/profile";
import { cn } from "@/utils/cn";

/**
 * Experience presented as a vertical "stone path" through the pond.
 * Each card is an individual story rather than a copy of the resume bullet
 * dump — only the strongest 2–3 bullets per role.
 *
 * Layout pattern: shared timeline rail in the middle on `md+`, cards alternate
 * left/right. On mobile the rail moves to the left edge and cards stack.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-pond-100/60 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-pond-600">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-3 font-display text-4xl text-ink md:text-5xl"
            >
              Stones I&apos;ve stepped on.
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              A path of internships and projects, told as short stories instead
              of resume bullet points.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={PROFILE.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              download="Yun-Chen-Lee-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas-soft/80 px-4 py-2 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-pond-300 hover:text-pond-700 hover:shadow-water"
            >
              <FileIcon />
              <span>Download résumé</span>
            </a>
          </Reveal>
        </div>

        <ol
          className="relative mt-14 space-y-10 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-gradient-to-b before:from-pond-300 before:via-pond-200 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2"
          aria-label="Experience timeline"
        >
          {EXPERIENCE.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={item.company}
                className="relative grid items-start gap-4 md:grid-cols-2"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-2 top-3 h-5 w-5 rounded-full border-2 border-pond-50 bg-pond-500 shadow-stone md:left-1/2 md:-translate-x-1/2"
                />

                <div
                  className={cn(
                    "pl-12 md:pl-0",
                    left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
                  )}
                >
                  <Reveal delay={0.05}>
                    <article
                      className={cn(
                        "glass-card group relative overflow-hidden rounded-pebble p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-water"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                        <span className="inline-flex items-center gap-1">
                          <CalendarIcon />
                          {item.dates}
                        </span>
                        {item.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPinIcon />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 font-display text-2xl text-ink">
                        {item.role}
                      </h3>
                      <p className="text-base font-medium text-pond-700">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:underline"
                          >
                            {item.company}
                            <ExternalIcon className="text-sm" />
                          </a>
                        ) : (
                          item.company
                        )}
                      </p>

                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft md:text-[0.95rem]">
                        {item.highlights.map((h, idx) => (
                          <li key={idx} className="relative pl-4">
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-koi"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-pond-100 px-2.5 py-1 text-[11px] font-medium text-pond-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
