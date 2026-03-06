import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: "a4" | "letter";
}

const PAGE_DIMS = {
  a4: { wMM: 210, hMM: 297, wPT: 595.28, hPT: 841.89 },
  letter: { wMM: 215.9, hMM: 279.4, wPT: 612, hPT: 792 },
};

const PX_PER_MM = 3.7795;
const HEADER_SAFE_MM = 8;
const FOOTER_SAFE_MM = 8;

export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const container = document.getElementById(elementId);
  if (!container) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  try {
    const dims = PAGE_DIMS[pageFormat] || PAGE_DIMS.a4;

    // The hidden measurement div contains the full continuous A4Page content.
    // We capture it once at high resolution, then slice into page-sized chunks.
    const SCALE = 2;
    const fullCanvas = await html2canvas(container, {
      scale: SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Read the margin from the rendered element's CSS custom properties
    const computedStyle = getComputedStyle(container.firstElementChild || container);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 16 * PX_PER_MM;
    const marginYPX = paddingTop; // The A4Page uses marginY as padding

    const pageWidthPX = dims.wMM * PX_PER_MM;
    const pageHeightPX = dims.hMM * PX_PER_MM;
    const usableHeightPX = pageHeightPX - 2 * marginYPX;

    // Total content height (excluding the top/bottom padding of A4Page)
    const fullContentHeightPX = (fullCanvas.height / SCALE) - 2 * marginYPX;
    const pageCount = Math.max(1, fullContentHeightPX <= usableHeightPX * 1.02 ? 1 : Math.ceil(fullContentHeightPX / usableHeightPX));

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [dims.wMM, dims.hMM],
    });

    const canvasPageWidthScaled = fullCanvas.width;
    const canvasPageHeightScaled = pageHeightPX * SCALE;
    const canvasUsableHeightScaled = usableHeightPX * SCALE;
    const canvasMarginYScaled = marginYPX * SCALE;

    for (let i = 0; i < pageCount; i++) {
      if (i > 0) pdf.addPage([dims.wMM, dims.hMM]);

      // Create a canvas for this page
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvasPageWidthScaled;
      pageCanvas.height = canvasPageHeightScaled;
      const ctx = pageCanvas.getContext("2d")!;

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      // Source: slice from the full canvas
      // Page 0: content starts at marginYPX (the A4Page's own padding)
      // Page N: content starts at marginYPX + N * usableHeightPX
      const srcY = canvasMarginYScaled + i * canvasUsableHeightScaled;
      const srcHeight = Math.min(canvasUsableHeightScaled, fullCanvas.height - srcY);

      if (srcHeight > 0) {
        // Draw the content slice into the page canvas with top margin
        ctx.drawImage(
          fullCanvas,
          0, srcY,                          // source x, y
          canvasPageWidthScaled, srcHeight,  // source w, h
          0, canvasMarginYScaled,            // dest x, y (with top margin)
          canvasPageWidthScaled, srcHeight   // dest w, h
        );
      }

      const imgData = pageCanvas.toDataURL("image/png", 0.95);
      pdf.addImage(imgData, "PNG", 0, 0, dims.wMM, dims.hMM);
    }

    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(safeName);

    toast({
      title: "Resume downloaded!",
      description: `${pageCount} page${pageCount > 1 ? "s" : ""} saved as ${safeName}`,
    });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}
