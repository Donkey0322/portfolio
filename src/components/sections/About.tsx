import Image from "next/image";

import Reveal from "@/components/animations/Reveal";
import {
  ExternalIcon,
  FileIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";
import { PROFILE } from "@/lib/site/profile";

import Me from "@/assets/images/me3.png";

const ICON_BY_KIND = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  resume: FileIcon,
  external: ExternalIcon,
} as const;

/**
 * Server component — renders the entire About card and its content
 * during SSR. Animation is layered on top via the small Reveal wrapper,
 * so the content is in the initial HTML for SEO + fast LCP.
 */
export default function About() {
  const education = PROFILE.education[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-pond-600">
            About
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-display text-4xl text-ink md:text-5xl"
          >
            A quiet pond, kept by a frontend engineer.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <article className="glass-card relative overflow-hidden rounded-stone p-8 md:p-10">
              {/* Decorative pond ripple in the corner. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-pond-200 to-transparent opacity-60 blur-2xl"
              />

              <div className="flex items-center gap-2 text-sm text-ink-soft">
                <MapPinIcon />
                <span>{PROFILE.location}</span>
              </div>

              <h3 className="mt-4 font-display text-2xl text-ink md:text-3xl">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft md:text-lg">
                {PROFILE.summary}
              </p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-pond-600">
                    Currently
                  </dt>
                  <dd className="mt-2 text-sm text-ink">
                    {education.degree}
                    <br />
                    <span className="text-ink-soft">
                      {education.school} · {education.dates}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-pond-600">
                    Interests
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {PROFILE.interests.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border-soft bg-canvas-soft/70 px-3 py-1 text-xs text-ink-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {PROFILE.contact.map((c) => {
                  const Icon = ICON_BY_KIND[c.kind] ?? ExternalIcon;
                  const isResume = c.kind === "resume";
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      target={isResume ? "_blank" : c.kind === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      download={isResume ? "Yun-Chen-Lee-Resume.pdf" : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas-soft/80 px-4 py-2 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-pond-300 hover:text-pond-700 hover:shadow-water"
                    >
                      <Icon />
                      <span>{c.label}</span>
                    </a>
                  );
                })}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-card relative overflow-hidden rounded-stone p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-pond-100 via-transparent to-lotus-soft/40"
              />
              <div className="relative aspect-square overflow-hidden rounded-pebble bg-pond-100">
                <Image
                  src={Me}
                  alt={`${PROFILE.name} avatar`}
                  fill
                  sizes="(min-width: 768px) 360px, 80vw"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
              <div className="relative mt-5 text-center">
                <p className="font-display text-xl text-ink">{PROFILE.name}</p>
                <p className="text-sm text-ink-soft">
                  {PROFILE.title} · also called {PROFILE.alias}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
