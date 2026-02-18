import { toast } from "@/hooks/use-toast";

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: "a4" | "letter";
}

export async function exportToPdf({ elementId, fileName, pageFormat }: ExportOptions) {
  const element = document.getElementById(elementId);
  if (!element) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  // Dynamic import for smaller initial bundle
  const html2pdf = (await import("html2pdf.js")).default;

  const format = pageFormat === "letter" ? "letter" : "a4";

  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: "mm",
      format,
      orientation: "portrait" as const,
    },
  };

  try {
    await html2pdf().set(opt).from(element).save();
    toast({ title: "PDF downloaded!", description: `${fileName} has been saved.` });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}
