import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: "a4" | "letter";
}

const PAGE_DIMS = {
  a4: { wMM: 210, hMM: 297 },
  letter: { wMM: 215.9, hMM: 279.4 },
};

export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const element = document.getElementById(elementId);
  if (!element) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  try {
    const dims = PAGE_DIMS[pageFormat] || PAGE_DIMS.a4;

    // Capture at 2x for high fidelity
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      // Render the full scrollable content, not just the visible area
      height: element.scrollHeight,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [dims.wMM, dims.hMM],
    });

    const pdfW = dims.wMM;
    const pdfH = dims.hMM;

    // Calculate how many pages the content spans
    const contentHeightMM = (canvas.height / canvas.width) * pdfW;
    const totalPages = Math.max(1, Math.ceil(contentHeightMM / pdfH));

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage([dims.wMM, dims.hMM]);

      // Slice the canvas for this page
      const srcY = page * (canvas.height / totalPages);
      const srcH = canvas.height / totalPages;

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = srcH;
      const ctx = pageCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
      }

      const pageImg = pageCanvas.toDataURL("image/png");
      pdf.addImage(pageImg, "PNG", 0, 0, pdfW, pdfH);
    }

    pdf.save(fileName);
    toast({ title: "PDF downloaded!", description: `${totalPages} page${totalPages > 1 ? "s" : ""} saved as ${fileName}` });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}
