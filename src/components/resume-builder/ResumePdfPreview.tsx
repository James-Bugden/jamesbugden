/**
 * ResumePdfPreview
 *
 * Renders the resume as stacked PDF page images using the same
 * @react-pdf/renderer pipeline as the export. This means the preview
 * is a pixel-perfect match of the downloaded PDF, with correct
 * multi-page layout and no text clipping at page boundaries.
 *
 * Trade-off: the preview is read-only (no inline color/text editing).
 */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { ResumePDF, prepareFonts } from "./ResumePDF";
import type { ResumeData } from "./types";
import type { CustomizeSettings } from "./customizeTypes";

/* ── Page dimension helpers ─────────────────────────────────────── */

const PX_PER_MM = 3.7795;
const PAGE_WIDTHS: Record<string, number> = {
  a4: 210 * PX_PER_MM,       // 793.695 px
  letter: 215.9 * PX_PER_MM, // 816.13  px
};

function getPageBaseWidth(format?: string): number {
  return PAGE_WIDTHS[format || "a4"] ?? PAGE_WIDTHS.a4;
}

// Pixel ratio used when rendering PDF pages via pdfjs (2× = retina-sharp)
const RENDER_SCALE = 2;

/* ── Debounce hook ──────────────────────────────────────────────── */

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/* ── pdfjs page renderer ────────────────────────────────────────── */

// Assign worker URL once after the module resolves — avoids re-setting on every render cycle
let pdfjsLibCache: typeof import("pdfjs-dist") | null = null;
async function getPdfjsLib() {
  if (!pdfjsLibCache) {
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
    pdfjsLibCache = lib;
  }
  return pdfjsLibCache;
}

async function renderPdfPagesToImages(blob: Blob): Promise<string[]> {
  const pdfjsLib = await getPdfjsLib();

  // Pass raw ArrayBuffer — blob URLs are main-thread only and can't be
  // fetched by the pdfjs worker thread (causes "Unexpected server response 0")
  const arrayBuffer = await blob.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const images: string[] = [];

  try {
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);

      // Skip pages with zero text content. @react-pdf/renderer's
      // breakingImprovesPresence heuristic occasionally inserts a phantom
      // blank page at the end when the last section's content height lands
      // near the paddingBottom boundary. Filtering here keeps the preview
      // in sync with the post-stripped download.
      const textContent = await page.getTextContent();
      if (textContent.items.length === 0) {
        continue;
      }

      const viewport = page.getViewport({ scale: RENDER_SCALE });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;

      await page.render({ canvasContext: ctx, viewport }).promise;
      images.push(canvas.toDataURL("image/jpeg", 0.93));
      // Zero dimensions immediately after capture to release GPU-backed memory
      canvas.width = 0;
      canvas.height = 0;
    }
  } finally {
    // Release pdfjs worker memory — fire-and-forget, pages are already rendered
    pdfDoc.destroy();
  }

  return images;
}

/* ── Component ──────────────────────────────────────────────────── */

interface ResumePdfPreviewProps {
  data: ResumeData;
  customize?: CustomizeSettings;
  onPageCount?: (count: number) => void;
}

export const ResumePdfPreview = React.memo(function ResumePdfPreview({
  data,
  customize,
  onPageCount,
}: ResumePdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom state — mirrors the DOM preview controls exactly
  const [autoScale, setAutoScale] = useState(0.65);
  const [zoomOffset, setZoomOffset] = useState(0);
  const displayScale = Math.max(0.2, Math.min(1.5, autoScale + zoomOffset));

  // Page images from the last completed render
  const [pageImages, setPageImages] = useState<string[]>([]);
  // True while fonts are loading or PDF/pages are being generated
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Stable ref for onPageCount — keeps it out of the effect dep array so an
  // un-memoised parent callback doesn't trigger a full PDF re-render cycle
  const onPageCountRef = useRef(onPageCount);
  onPageCountRef.current = onPageCount;

  // Debounce data and customize to avoid re-generating on every keystroke
  const debouncedData = useDebounce(data, 600);
  const debouncedCustomize = useDebounce(customize, 600);

  // Derive base page width from immediate customize (not debounced) so the
  // display slot is correct for letter vs A4 even before the debounce fires
  const baseWidthPx = getPageBaseWidth(customize?.pageFormat);

  // Keep a ref so the ResizeObserver always reads the current page width
  const baseWidthRef = useRef(baseWidthPx);
  baseWidthRef.current = baseWidthPx;

  // Auto-scale to fit the container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const fit = Math.min((w - 48) / baseWidthRef.current, 0.9);
        setAutoScale(Math.max(0.3, fit));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Regenerate PDF whenever debounced data or customize changes.
  // onPageCount is intentionally excluded from deps — accessed via ref above.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const generate = async () => {
      try {
        // 1. Register fonts — required before react-pdf renders; cached after first call
        await prepareFonts(debouncedCustomize, debouncedData);
        if (cancelled) return;

        // 2. Render PDF to blob via react-pdf (same path as the export)
        const element = React.createElement(ResumePDF, {
          data: debouncedData,
          customize: debouncedCustomize,
        });
        const blob = await pdf(element as any).toBlob();
        if (cancelled) return;

        // 3. Pass blob directly to pdfjs (ArrayBuffer, not a URL — blob URLs
        //    are main-thread only and are inaccessible from the pdfjs worker)
        const images = await renderPdfPagesToImages(blob);
        if (cancelled) return;
        setPageImages(images);
        setErrorMsg(null);
        onPageCountRef.current?.(images.length);
      } catch (err) {
        if (!cancelled) {
          console.error("[ResumePdfPreview] render error:", err);
          setErrorMsg(String(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    generate();
    return () => { cancelled = true; };
  }, [debouncedData, debouncedCustomize]);

  const handleZoomOut = useCallback(() => setZoomOffset((z) => Math.max(z - 0.1, -0.4)), []);
  const handleZoomIn  = useCallback(() => setZoomOffset((z) => Math.min(z + 0.1, 0.6)), []);
  const handleReset   = useCallback(() => setZoomOffset(0), []);

  const pageWidthPx = baseWidthPx * displayScale;

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto relative"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Error state */}
      {errorMsg && !loading && pageImages.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 p-6 text-center">
          <span className="text-sm font-medium text-red-600">Preview failed</span>
          <span className="text-xs text-gray-500 max-w-xs break-all">{errorMsg}</span>
        </div>
      )}

      {/* Loading overlay — shown on first load; pages remain visible during subsequent re-renders */}
      {loading && pageImages.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Generating preview…</span>
        </div>
      )}

      {/* Subtle refresh indicator while pages are present but re-rendering */}
      {loading && pageImages.length > 0 && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm border border-gray-200">
          <div className="w-3 h-3 border border-gray-400 border-t-gray-700 rounded-full animate-spin" />
          <span className="text-xs text-gray-500">Updating…</span>
        </div>
      )}

      {/* Stacked pages */}
      <div className="flex flex-col items-center py-8 px-6 gap-6">
        {pageImages.map((src, i) => (
          <div
            key={i}
            className="shadow-2xl rounded-sm overflow-hidden flex-shrink-0"
            style={{ width: `${pageWidthPx}px` }}
          >
            <img
              src={src}
              alt={`Page ${i + 1}`}
              draggable={false}
              style={{ width: "100%", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Zoom controls — identical to the DOM preview */}
      <div className="sticky bottom-4 flex justify-center pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 px-1.5 py-1">
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-xs font-medium text-gray-600 min-w-[40px] text-center">
            {Math.round(displayScale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {zoomOffset !== 0 && (
            <button
              onClick={handleReset}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              title="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
