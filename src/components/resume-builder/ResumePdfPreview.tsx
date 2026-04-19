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
import { resumeHasCJK } from "@/lib/resumePdf/fontMap";
import { renderPdfInWorker } from "./pdfWorkerClient";
import { renderPagesServer, serverPreviewEnabled } from "@/lib/resumePdf/serverPreview";
import type { ResumeData } from "./types";
import type { CustomizeSettings } from "./customizeTypes";
import { useT } from "./i18n";

/* ── Page dimension helpers ─────────────────────────────────────── */

const PX_PER_MM = 3.7795;
const PAGE_WIDTHS: Record<string, number> = {
  a4: 210 * PX_PER_MM,       // 793.695 px
  letter: 215.9 * PX_PER_MM, // 816.13  px
};

function getPageBaseWidth(format?: string): number {
  return PAGE_WIDTHS[format || "a4"] ?? PAGE_WIDTHS.a4;
}

// Render scale for pdfjs page rasterization.
// Higher = sharper when the user zooms in (the preview supports 60%-160%
// zoom via CSS transform, which upscales the rasterized image).
// 2× was retina-sharp at 100% but visibly blurry past ~120% zoom.
// 3× keeps text crisp up to ~150% zoom with ~2.25× the memory per page.
// On retina screens, browser sub-pixel rendering adds additional sharpness
// so we don't multiply by devicePixelRatio.
// Do NOT lower this — fixes the "preview is low-res on zoom" bug.
const RENDER_SCALE = 3;

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
      // JPEG 0.95 for noticeably crisper text at the cost of ~5% more bytes.
      // PNG would be lossless but 3-5× larger data URLs; not worth it.
      images.push(canvas.toDataURL("image/jpeg", 0.95));
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
  const t = useT();

  // Zoom state — mirrors the DOM preview controls exactly
  const [autoScale, setAutoScale] = useState(0.65);
  const [zoomOffset, setZoomOffset] = useState(0);
  const displayScale = Math.max(0.2, Math.min(1.5, autoScale + zoomOffset));

  // Page images from the last completed render (primary path — matches
  // FlowCV look and supports live customize refresh).
  const [pageImages, setPageImages] = useState<string[]>([]);
  // Blob URL fallback — used ONLY when pdfjs rasterization throws
  // (observed on Chinese resumes where pdfjs chokes on the embedded
  // subset CJK font). The browser's native PDF viewer renders the
  // blob reliably even when pdfjs cannot. Trade-off: shows the
  // browser's PDF chrome. Acceptable fallback vs "Preview crashed".
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  // True while fonts are loading or PDF/pages are being generated
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Stable ref for onPageCount — keeps it out of the effect dep array so an
  // un-memoised parent callback doesn't trigger a full PDF re-render cycle
  const onPageCountRef = useRef(onPageCount);
  onPageCountRef.current = onPageCount;

  // Debounce data and customize to avoid re-generating on every keystroke.
  // Split rationale (2026-04-19):
  //   - `data` changes come from typing in text fields — 600ms waits for the
  //     user to pause, which is how they expect it to feel.
  //   - `customize` changes come from discrete button/slider/swatch clicks —
  //     users expect the preview to react quickly. 250ms is enough to batch
  //     rapid slider scrubs without the 1-2s perceived lag the old 600ms
  //     setting caused after a color or spacing change.
  const debouncedData = useDebounce(data, 600);
  const debouncedCustomize = useDebounce(customize, 250);

  // Derive base page width from immediate customize (not debounced) so the
  // display slot is correct for letter vs A4 even before the debounce fires
  const baseWidthPx = getPageBaseWidth(customize?.pageFormat);

  // Keep a ref so the ResizeObserver always reads the current page width
  const baseWidthRef = useRef(baseWidthPx);
  baseWidthRef.current = baseWidthPx;

  // PREVIEW-SIDE CJK POLICY (important, do NOT revert):
  //
  // We INTENTIONALLY do not subscribe to onCJKFontReady here. Why:
  // fontkit's parse of the 1.4 MB Noto Sans TC/SC WOFF is synchronous
  // and runs on the main thread. The first PDF render that actually
  // uses a CJK family blocks the main thread for 30-75 SECONDS on real
  // devices — long enough that the Promise.race timeout cannot fire
  // (setTimeout callbacks are also queued on the main thread). Live
  // Chrome MCP profiling confirmed this: `1+1` evals timed out after
  // 45s while the user's preview was regenerating with CJK registered.
  //
  // So: the preview stays Latin-only for CJK content (tofu squares for
  // Chinese glyphs), but IT STAYS RESPONSIVE. Users can still edit,
  // scroll, click Download. The download path (serverPdfExport.ts)
  // runs off the main thread and produces a correct PDF with crisp
  // CJK glyphs.
  //
  // If you want in-preview CJK glyphs, the right fix is a Web Worker
  // that runs react-pdf off the main thread — not re-enabling the
  // re-render here.

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

  // Flag: is the current debounced data CJK? CJK previews render via
  // a fresh Web Worker spawned per render. The worker owns react-pdf +
  // fontkit so the main thread never freezes on the 1.1 MB Noto Sans TC
  // subset parse. Latin previews stay on the main thread where the font
  // cache is hot and cold-start cost is nil.
  const isCJKResume = React.useMemo(() => resumeHasCJK(debouncedData), [debouncedData]);

  // Regenerate PDF whenever debounced data or customize changes.
  // onPageCount is intentionally excluded from deps — accessed via ref above.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const generate = async () => {
      // CJK path needs more budget than Latin — each fresh worker cold-
      // starts react-pdf + fontkit + fetches the 1.1 MB subset WOFF2. On
      // slow networks + Taiwan-edge latency this legitimately runs 15-40s
      // for the first render. Subsequent renders spawn a fresh worker
      // each (by design — see pdfWorkerClient.ts) so the cost repeats;
      // debouncing at the caller gates this to once per 1.5s idle.
      const timeoutMs = isCJKResume ? 90_000 : 45_000;
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Preview generation timed out (${timeoutMs / 1000}s). Check network or try a smaller resume.`)),
          timeoutMs,
        ),
      );

      try {
        await Promise.race([
          (async () => {
            let blob: Blob;

            if (isCJKResume) {
              // CJK path: fresh Web Worker per render. Worker does the
              // react-pdf + fontkit work with the 400 KB MOE-4808 subset,
              // so the main thread never freezes.
              const { promise } = renderPdfInWorker(debouncedData, debouncedCustomize);
              const result = await promise;
              if (cancelled) return;
              if ("cancelled" in result && result.cancelled) return;
              if (!result.ok) {
                throw new Error("error" in result ? result.error : "Worker render failed");
              }
              blob = result.blob;
            } else {
              // Latin path: main-thread render, skipCJK to avoid downloading
              // the 1.4 MB CJK font we don't need.
              await prepareFonts(debouncedCustomize, debouncedData, { skipCJK: true });
              if (cancelled) return;

              const element = React.createElement(ResumePDF, {
                data: debouncedData,
                customize: debouncedCustomize,
              });
              blob = await pdf(element as any).toBlob();
              if (cancelled) return;
            }

            // Rasterize PDF pages to <img> sources. Cascade:
            //   1. Server-side (Supabase Edge Function) if flag enabled
            //   2. Client-side pdfjs (default)
            //   3. If pdfjs throws (observed on CJK with certain fonts),
            //      fall back to rendering the raw PDF in a native <iframe>.
            //      Shows PDF-viewer chrome, not ideal, but better than a
            //      "Preview crashed" error screen.
            let images: string[] | null = null;
            if (serverPreviewEnabled()) {
              const serverResult = await renderPagesServer(blob, {
                pageFormat: debouncedCustomize?.pageFormat === "letter" ? "letter" : "a4",
              });
              if (cancelled) return;
              if (serverResult.ok) {
                images = serverResult.pngs;
              } else if (import.meta.env.DEV) {
                console.warn("[ResumePdfPreview] server preview failed, falling back to client:", serverResult.error);
              }
            }
            if (!images) {
              try {
                images = await renderPdfPagesToImages(blob);
              } catch (rasterErr) {
                if (import.meta.env.DEV) console.warn("[ResumePdfPreview] pdfjs raster failed, falling back to iframe:", rasterErr);
                // Revoke any previous iframe URL before creating a new one.
                const newUrl = URL.createObjectURL(blob);
                setPdfBlobUrl((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return newUrl;
                });
                setPageImages([]);
                setErrorMsg(null);
                onPageCountRef.current?.(1);
                return;
              }
              if (cancelled) return;
            }
            setPageImages(images);
            // Clear any stale iframe fallback from a previous render.
            setPdfBlobUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
            setErrorMsg(null);
            onPageCountRef.current?.(images.length);
          })(),
          timeoutPromise,
        ]);
      } catch (err) {
        if (!cancelled) {
          if (import.meta.env.DEV) console.error("[ResumePdfPreview] render error:", err);
          setErrorMsg(String(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    generate();
    return () => { cancelled = true; };
  }, [debouncedData, debouncedCustomize, isCJKResume]);

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
          <span className="text-sm font-medium text-red-600">{t("previewFailed")}</span>
          <span className="text-xs text-gray-500 max-w-xs break-all">{errorMsg}</span>
        </div>
      )}

      {/* Loading overlay — shown on first load; pages remain visible during subsequent re-renders */}
      {loading && pageImages.length === 0 && !pdfBlobUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <span className="text-sm text-gray-500">{t("generatingPreview")}</span>
        </div>
      )}

      {/* CJK iframe preview — browser's native PDF viewer renders the
          blob from the Web Worker. Bypasses pdfjs rasterization which
          hangs on CJK-font PDFs. */}
      {pdfBlobUrl && (
        <iframe
          src={pdfBlobUrl}
          title={t("generatingPreview")}
          className="w-full h-full border-0"
          style={{ backgroundColor: "#f3f4f6" }}
        />
      )}

      {/* Subtle refresh indicator while pages are present but re-rendering */}
      {loading && pageImages.length > 0 && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm border border-gray-200">
          <div className="w-3 h-3 border border-gray-400 border-t-gray-700 rounded-full animate-spin" />
          <span className="text-xs text-gray-500">{t("previewUpdating")}</span>
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
