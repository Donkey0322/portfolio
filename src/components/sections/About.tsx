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

/**
 * About — server component. Renders the full content into SSR HTML so
 * SEO and LCP are clean. Animation is layered on top via small `Reveal`
 * wrappers, but every piece of copy is in the initial response.
 *
 * Layout:
 *   - Headline
 *   - Wide glass-card with summary + dual-education + interests + contact
 *   - Right column: portrait card + quick-fact list
 *   - Below: skill stacks grouped exactly the way the résumé presents them
 */

const ICON_BY_KIND = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  resume: FileIcon,
  external: ExternalIcon,
} as const;

export default function About() {
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
            A quiet pond, tended by a software engineer.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            I&apos;m {PROFILE.name} — currently in the MSCS program at
            UW–Madison, and previously a frontend / full-stack engineer at
            several Taipei startups and at NTU. {PROFILE.tagline}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <article className="glass-card relative overflow-hidden rounded-stone p-8 md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-pond-200 to-transparent opacity-60 blur-2xl"
              />

              <div className="flex items-center gap-2 text-sm text-ink-soft">
                <MapPinIcon />
                <span>{PROFILE.location}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl text-ink md:text-3xl">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft md:text-lg">
                {PROFILE.summary}
              </p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-pond-600">
                    Education
                  </dt>
                  <dd className="mt-2 space-y-3 text-sm text-ink">
                    {PROFILE.education.map((e) => (
                      <div key={e.school}>
                        <p className="font-medium">{e.degree}</p>
                        <p className="text-ink-soft">
                          {e.school} · {e.dates}
                        </p>
                        {e.detail && (
                          <p className="text-xs text-ink-soft/80">{e.detail}</p>
                        )}
                      </div>
                    ))}
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
                  const isEmail = c.kind === "email";
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      target={isEmail ? undefined : "_blank"}
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
                  alt={`${PROFILE.name} portrait`}
                  fill
                  sizes="(min-width: 768px) 360px, 80vw"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
              <div className="relative mt-5 text-center">
                <p className="font-display text-xl text-ink">{PROFILE.name}</p>
                <p className="text-sm text-ink-soft">
                  {PROFILE.title} · {PROFILE.alias}
                </p>
                <p className="mt-3 text-xs text-ink-soft/80">
                  {PROFILE.website} · {PROFILE.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Skills — grouped exactly the way the résumé presents them. */}
        <Reveal delay={0.15}>
          <div className="mt-12 glass-card overflow-hidden rounded-stone p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-pond-600">
              Stack
            </p>
            <h3 className="mt-1 font-display text-2xl text-ink md:text-3xl">
              Tools I reach for first.
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROFILE.skills.map((group) => (
                <div key={group.group}>
                  <p className="text-sm font-medium text-pond-700">
                    {group.group}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-pond-100 px-2.5 py-1 text-[11px] font-medium text-pond-800"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
