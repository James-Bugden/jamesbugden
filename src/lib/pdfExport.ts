import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: "a4" | "letter";
}

const PAGE_DIMS = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

/**
 * Legacy single-element export (used by cover letter builder).
 * Temporarily moves the off-screen element on-screen for html2canvas.
 */
export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const container = document.getElementById(elementId);
  if (!container) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  const orig = {
    position: container.style.position,
    left: container.style.left,
    top: container.style.top,
    zIndex: container.style.zIndex,
    opacity: container.style.opacity,
  };

  try {
    Object.assign(container.style, {
      position: "fixed",
      left: "0",
      top: "0",
      zIndex: "-1",
      opacity: "1",
    });

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const scale = 2;
    const canvas = await html2canvas(container, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const dims = PAGE_DIMS[pageFormat] || PAGE_DIMS.a4;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [dims.w, dims.h] });

    const pdfWidth = dims.w;
    const pdfHeight = dims.h;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    if (scaledHeight <= pdfHeight) {
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pdfWidth, scaledHeight);
    } else {
      const pageHeightPx = pdfHeight / ratio;
      let yOffset = 0;
      let page = 0;

      while (yOffset < imgHeight) {
        if (page > 0) pdf.addPage();

        const sliceHeight = Math.min(pageHeightPx, imgHeight - yOffset);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(canvas, 0, -yOffset);
          pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pdfWidth, sliceHeight * ratio);
        }

        yOffset += pageHeightPx;
        page++;
      }
    }

    const safeName = (fileName || "Resume").replace(/\.pdf$/i, "") + ".pdf";
    pdf.save(safeName);

    toast({ title: "PDF downloaded", description: `${safeName} has been saved.` });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  } finally {
    Object.assign(container.style, orig);
  }
}

/* ───────────────────────────────────────────────────────────────
   Page-by-page resume export
   ─────────────────────────────────────────────────────────────── */

const PX_PER_MM = 3.7795;

interface ResumeExportOptions {
  /** The hidden-flow element that renders the full A4Page (measurement div) */
  sourceElement: HTMLElement;
  fileName: string;
  pageFormat: "a4" | "letter";
  pageCount: number;
  /** Top content origin in px (marginY + headerSafe) */
  contentOriginPX: number;
  /** Usable content height per page in px */
  usablePerPagePX: number;
  /** Full page height in px */
  pageHeightPX: number;
  /** Margin Y in px */
  marginYPX: number;
}

/**
 * Reliable page-by-page resume PDF export.
 *
 * Instead of capturing one huge canvas and slicing, this:
 * 1. Waits for fonts to load
 * 2. Temporarily moves the source element on-screen
 * 3. Captures each logical page individually by clipping
 * 4. Uses adaptive scale for mobile (lower DPI to avoid OOM)
 * 5. Assembles pages into jsPDF
 */
export async function exportResumePages({
  sourceElement,
  fileName,
  pageFormat = "a4",
  pageCount,
  contentOriginPX,
  usablePerPagePX,
  pageHeightPX,
  marginYPX,
}: ResumeExportOptions) {
  const dims = PAGE_DIMS[pageFormat] || PAGE_DIMS.a4;
  const pageWidthPX = dims.w * PX_PER_MM;

  // Save original styles
  const orig = {
    position: sourceElement.style.position,
    left: sourceElement.style.left,
    top: sourceElement.style.top,
    zIndex: sourceElement.style.zIndex,
    opacity: sourceElement.style.opacity,
    pointerEvents: sourceElement.style.pointerEvents,
  };

  try {
    // 1. Wait for fonts
    if (document.fonts?.ready) {
      await Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 3000)),
      ]);
    }

    // 2. Move on-screen for capture
    Object.assign(sourceElement.style, {
      position: "fixed",
      left: "0",
      top: "0",
      zIndex: "-1",
      opacity: "1",
      pointerEvents: "none",
    });

    // Wait for layout
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    // 3. Adaptive scale: lower on mobile to prevent memory crashes
    const isMobile = window.innerWidth < 768;
    const captureScale = isMobile ? 1.5 : 2;

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [dims.w, dims.h] });

    for (let i = 0; i < pageCount; i++) {
      if (i > 0) pdf.addPage();

      // Calculate the Y offset for this page's content window
      const yClipStart = contentOriginPX + i * usablePerPagePX;

      // Capture the full source element but we'll clip to just this page
      const canvas = await html2canvas(sourceElement, {
        scale: captureScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: sourceElement.style.backgroundColor || "#ffffff",
        logging: false,
        y: Math.round(yClipStart - marginYPX),
        height: Math.round(pageHeightPX),
        width: Math.round(pageWidthPX),
        windowWidth: Math.round(pageWidthPX),
      });

      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.92),
        "JPEG",
        0,
        0,
        dims.w,
        dims.h
      );
    }

    const safeName = (fileName || "Resume").replace(/\.pdf$/i, "") + ".pdf";
    pdf.save(safeName);

    toast({ title: "PDF downloaded", description: `${safeName} has been saved.` });
  } catch (err) {
    console.error("Resume PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  } finally {
    Object.assign(sourceElement.style, orig);
  }
}
