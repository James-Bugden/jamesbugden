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

export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const container = document.getElementById(elementId);
  if (!container) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  // Save original styles so we can restore after capture
  const orig = {
    position: container.style.position,
    left: container.style.left,
    top: container.style.top,
    zIndex: container.style.zIndex,
    opacity: container.style.opacity,
  };

  try {
    // Temporarily move on-screen so html2canvas can render it
    Object.assign(container.style, {
      position: "fixed",
      left: "0",
      top: "0",
      zIndex: "-1",
      opacity: "1",
    });

    // Allow a paint frame so the browser lays it out on-screen
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

    // Single page or multi-page
    if (scaledHeight <= pdfHeight) {
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pdfWidth, scaledHeight);
    } else {
      // Multi-page: slice the canvas
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
  }
}
