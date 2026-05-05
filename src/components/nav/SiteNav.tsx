"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CloseIcon,GithubIcon, MenuIcon } from "@/components/icons";
import SeasonSwitcher from "@/components/nav/SeasonSwitcher";
import { PROFILE } from "@/lib/site/profile";
import { cn } from "@/utils/cn";

const SECTIONS: { id: string; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

/**
 * Sticky site navigation. Renders a translucent bar that fades from
 * transparent (over the koi pond hero) to glassy (over content sections)
 * based on scroll position.
 *
 * Lives inside the SSR landing page tree so it appears in initial HTML,
 * but uses small client-only state for the scroll/mobile-drawer toggles.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-canvas-soft/70 backdrop-blur-lg shadow-water"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg tracking-wide text-ink hover:text-pond-700 transition-colors"
        >
          <span aria-hidden="true" className="text-xl">
            🪷
          </span>
          <span>Donkey Lee</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-full px-4 py-2 text-ink/70 transition-colors hover:bg-pond-100 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                className="rounded-full px-4 py-2 text-ink/70 transition-colors hover:bg-pond-100 hover:text-ink"
              >
                Résumé
              </Link>
            </li>
          </ul>

          <SeasonSwitcher className="ml-2" />

          <a
            href={PROFILE.contact.find((c) => c.kind === "github")?.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-canvas-soft/70 text-ink transition-colors hover:bg-pond-100"
          >
            <GithubIcon />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-canvas-soft/70 text-ink md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-3 rounded-3xl border border-border-soft bg-canvas-soft/95 p-5 shadow-water backdrop-blur-lg">
            <ul className="flex flex-col gap-1 text-base font-medium">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-ink/80 hover:bg-pond-100 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-ink/80 hover:bg-pond-100 hover:text-ink"
                >
                  Résumé
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-4">
              <SeasonSwitcher compact />
              <a
                href={PROFILE.contact.find((c) => c.kind === "github")?.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-canvas-soft text-ink"
              >
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
