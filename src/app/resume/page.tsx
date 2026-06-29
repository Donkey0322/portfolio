import Link from "next/link";

import type { Metadata } from "next";

import { FileIcon, GithubIcon } from "@/components/icons";
import SiteFooter from "@/components/nav/SiteFooter";
import SiteNav from "@/components/nav/SiteNav";
import ClientResume from "@/components/resume/ClientResume";
import { PROFILE } from "@/lib/site/profile";

/**
 * Resume page stays a Server Component. The PDF viewer (browser-only APIs)
 * is isolated inside `<ClientResume />`, which uses `next/dynamic`
 * with `ssr: false` from a client boundary.
 */

export const metadata: Metadata = {
  title: "Résumé",
  description: `One-page résumé for ${PROFILE.name}, frontend engineer based in ${PROFILE.location}.`,
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8">
        <header className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-pond-600">
              Résumé
            </p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
              On paper, in one page.
            </h1>
            <p className="mt-2 max-w-xl text-ink-soft">
              The current snapshot — fork-friendly PDF below. For the live
              story, head back to the{" "}
              <Link
                href="/"
                className="text-pond-700 underline-offset-2 hover:underline"
              >
                pond
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={PROFILE.resumeHref}
              download="Yun-Chen-Lee-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-pond-700 px-4 py-2 text-sm font-medium text-canvas-soft transition-all hover:-translate-y-0.5 hover:bg-pond-800"
            >
              <FileIcon />
              <span>Download PDF</span>
            </a>
            <a
              href={PROFILE.contact.find((c) => c.kind === "github")?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas-soft/70 px-4 py-2 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-pond-300"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </header>

        <ClientResume src={PROFILE.resumeHref} />
      </main>
      <SiteFooter />
    </>
  );
}
