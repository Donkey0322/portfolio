import {
  ExternalIcon,
  FileIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { PROFILE } from "@/lib/site/profile";

const ICON_BY_KIND = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  resume: FileIcon,
  external: ExternalIcon,
} as const;

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-soft bg-canvas-soft/60 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg text-ink">{PROFILE.name}</p>
          <p className="text-sm text-ink-soft">
            © {year} · Built with Next.js, React Three Fiber, and a quiet
            pond.
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-2">
          {PROFILE.contact.map((c) => {
            const Icon = ICON_BY_KIND[c.kind] ?? ExternalIcon;
            return (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.kind === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-canvas-soft text-ink transition-colors hover:border-pond-300 hover:text-pond-700"
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
