import Reveal from "@/components/animations/Reveal";
import {
  ExternalIcon,
  FileIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { PROFILE } from "@/lib/site/profile";

/**
 * Contact — a quiet closing section. Server-rendered; pure content + links.
 * Provides the anchor target for the hero's "Get In Touch" navigation
 * card, and gathers everything someone might want at the bottom of the
 * page (email, LinkedIn, GitHub, résumé download).
 */
const ICON_BY_KIND = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  resume: FileIcon,
  external: ExternalIcon,
} as const;

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-pond-600">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-4xl text-ink md:text-5xl"
          >
            Say hi from the other side of the pond.
          </h2>
          <p className="mt-4 text-ink-soft">
            I&apos;m happy to chat about graphics, developer tooling,
            AI-assisted refactoring, or just a good cup of tea. The fastest
            way to reach me is email or LinkedIn.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {PROFILE.contact.map((c) => {
              const Icon = ICON_BY_KIND[c.kind] ?? ExternalIcon;
              const isEmail = c.kind === "email";
              const isResume = c.kind === "resume";
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isEmail ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  download={isResume ? "Yun-Chen-Lee-Resume.pdf" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas-soft/80 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-pond-300 hover:text-pond-700 hover:shadow-water"
                >
                  <Icon />
                  <span>{c.label}</span>
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-xs text-ink-soft/80">
            {PROFILE.email} · {PROFILE.phone} · {PROFILE.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
