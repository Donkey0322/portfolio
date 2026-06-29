"use client";

import dynamic from "next/dynamic";

/**
 * `react-pdf` evaluates browser-only APIs at module load (Web Worker URL,
 * Canvas measurement). We isolate it inside this tiny client wrapper so
 * Next 15 server components can render us directly without tripping the
 * "ssr: false is not allowed in Server Components" guard rail.
 */
const ResumeViewer = dynamic(
  () => import("@/components/resume/ResumeViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto h-[80vh] w-full max-w-3xl animate-pulse rounded-stone bg-canvas-soft shadow-water" />
    ),
  }
);

export default function ClientResume({ src }: { src: string }) {
  return <ResumeViewer src={src} />;
}
