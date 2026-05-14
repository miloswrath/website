'use client';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useCallback, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Worker must be configured in the same file as react-pdf components
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const RESUME_PATH = '/static/resume/resume.pdf';

export default function ResumeClient() {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useCallback((node) => {
    if (node) {
      setContainerWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'resume_page_view', { source: 'direct_route' });
    }
  }, []);

  function handleLoadSuccess({ numPages: n }) {
    setNumPages(n);
  }

  function handleLoadError() {
    setError(true);
  }

  if (error) {
    return (
      <div className="rounded-lg border border-[rgb(48,50,54)] p-8 text-center">
        <p className="text-secondary mb-5 text-sm">
          The resume viewer couldn&apos;t load. You can view it directly
          instead.
        </p>
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan hover:text-primary inline-block rounded border border-[rgb(48,50,54)] px-4 py-2 text-sm transition-colors"
        >
          Open resume PDF →
        </a>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="Zak Gilliam's resume document viewer"
      className="w-full"
    >
      <Document
        file={RESUME_PATH}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={handleLoadError}
        loading={
          <div className="flex h-96 items-center justify-center">
            <p className="text-secondary text-sm">Loading resume…</p>
          </div>
        }
        error={null}
        className="flex flex-col items-center gap-4"
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              width={containerWidth ?? undefined}
              renderAnnotationLayer
              renderTextLayer
              className="shadow-[0_2px_12px_rgb(0_0_0/40%)]"
            />
          ))}
      </Document>
    </section>
  );
}
