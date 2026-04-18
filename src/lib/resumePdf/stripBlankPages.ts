/**
 * Blank-page stripper for react-pdf output.
 *
 * Works around a known @react-pdf/renderer quirk where the
 * `breakingImprovesPresence` heuristic occasionally inserts a trailing
 * empty page when the last section's content height lands near the
 * page's `paddingBottom` boundary.
 *
 * Strategy:
 *   1. Parse the blob with pdfjs-dist (already a dep) to inspect each
 *      page's text content.
 *   2. Collect the indices of any pages whose `getTextContent().items`
 *      array is empty (no drawable glyphs).
 *   3. If any blank pages are found, rebuild the PDF via pdf-lib
 *      with those pages removed.
 *   4. If no blank pages are found, return the original blob unchanged
 *      (no extra round-trip through pdf-lib).
 *
 * This runs entirely in the browser and is called from both the download
 * path (serverPdfExport.ts) and the preview path (ResumePdfPreview.tsx)
 * so preview + PDF stay in sync.
 */

type PdfJsLib = typeof import("pdfjs-dist");

// Lazy-load pdfjs to keep the main export bundle slim. Callers that have
// already loaded pdfjs (e.g. ResumePdfPreview) can pass their cached
// instance via the optional `pdfjsLib` arg to avoid a second import.
async function loadPdfjs(): Promise<PdfJsLib> {
  const lib = await import("pdfjs-dist");
  // Worker URL is set elsewhere by the preview; no-op if already set.
  return lib;
}

/**
 * Return the list of page indices (0-based) in `blob` that have no
 * text content. Fully transparent images would slip past this check;
 * in practice, react-pdf's empty pages contain nothing at all.
 */
export async function findBlankPageIndices(
  blob: Blob,
  pdfjsLib?: PdfJsLib,
): Promise<number[]> {
  const lib = pdfjsLib || (await loadPdfjs());
  const arrayBuffer = await blob.arrayBuffer();
  const pdfDoc = await lib.getDocument({ data: arrayBuffer }).promise;
  const blanks: number[] = [];
  try {
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      if (textContent.items.length === 0) {
        blanks.push(i - 1); // pdf-lib uses 0-based indices
      }
    }
  } finally {
    pdfDoc.destroy();
  }
  return blanks;
}

/**
 * Strip blank pages from a PDF blob and return a new blob.
 *
 * If there are no blank pages, returns the input blob (no reallocation).
 * If every page is blank (shouldn't happen), returns the input blob
 * untouched as a safety net rather than producing an empty PDF.
 */
export async function stripBlankPages(
  blob: Blob,
  pdfjsLib?: PdfJsLib,
): Promise<Blob> {
  const blankIndices = await findBlankPageIndices(blob, pdfjsLib);
  if (blankIndices.length === 0) return blob;

  const arrayBuffer = await blob.arrayBuffer();
  // Dynamic import — keeps pdf-lib out of the initial bundle.
  const { PDFDocument } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Safety: if the strip would leave the PDF with zero pages, back out.
  if (blankIndices.length >= pdfDoc.getPageCount()) {
    console.warn(
      "[stripBlankPages] Every page appears blank — returning original PDF",
    );
    return blob;
  }

  // Remove pages in reverse order so earlier indices stay valid.
  for (const idx of [...blankIndices].sort((a, b) => b - a)) {
    pdfDoc.removePage(idx);
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}
