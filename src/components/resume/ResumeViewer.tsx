"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import type { PDFDocumentProxy } from "pdfjs-dist";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

/**
 * Bind the pdfjs worker to the same module URL react-pdf ships with.
 * Tested with `react-pdf@9.1.1`.
 */
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDF_OPTIONS = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

interface Props {
  /** Public URL of the PDF to render. */
  src: string;
}

/**
 * Client-only PDF viewer wrapper. Lives in `src/components/resume` so that
 * other surfaces (e.g. a future preview thumbnail) can reuse it.
 */
export default function ResumeViewer({ src }: Props) {
  const [numPages, setNumPages] = useState<number>();

  function onLoaded({ numPages: n }: PDFDocumentProxy) {
    setNumPages(n);
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-stone bg-canvas-soft p-2 shadow-water [&_canvas]:!h-auto [&_canvas]:!w-full">
      <Document file={src} onLoadSuccess={onLoaded} options={PDF_OPTIONS}>
        {Array.from(new Array(numPages ?? 0), (_el, idx) => (
          <Page
            key={`page_${idx + 1}`}
            pageNumber={idx + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="overflow-hidden rounded-pebble"
          />
        ))}
      </Document>
    </div>
  );
}
