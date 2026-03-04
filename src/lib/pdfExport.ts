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

export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const container = document.getElementById(elementId);
  if (!container) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  try {
    const dims = PAGE_DIMS[pageFormat] || PAGE_DIMS.a4;

    // Find individual page elements (A4Page renders .resume-page elements)
    const pages = container.querySelectorAll<HTMLElement>(".resume-page");
    const targets = pages.length > 0 ? Array.from(pages) : [container];

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [dims.wMM, dims.hMM],
    });

    for (let i = 0; i < targets.length; i++) {
      if (i > 0) pdf.addPage([dims.wMM, dims.hMM]);

      const canvas = await html2canvas(targets[i], {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png", 0.95);
      pdf.addImage(imgData, "PNG", 0, 0, dims.wMM, dims.hMM);
    }

    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(safeName);

    const pageCount = targets.length;
    toast({
      title: "Resume downloaded!",
      description: `${pageCount} page${pageCount > 1 ? "s" : ""} saved as ${safeName}`,
    });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}
