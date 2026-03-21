import { toast } from "@/hooks/use-toast";

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: "a4" | "letter";
}

/**
 * Export an element to PDF using the browser's native print dialog.
 * This avoids vulnerable third-party PDF libraries (jsPDF, html2pdf).
 */
export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const container = document.getElementById(elementId);
  if (!container) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  // Inject print-only styles
  const styleId = "__pdf-export-print-styles";
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  const size = pageFormat === "letter" ? "letter" : "A4";

  styleEl.textContent = `
    @media print {
      @page {
        size: ${size} portrait;
        margin: 0;
      }
      body * {
        visibility: hidden !important;
      }
      #${CSS.escape(elementId)},
      #${CSS.escape(elementId)} * {
        visibility: visible !important;
      }
      #${CSS.escape(elementId)} {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        z-index: 999999 !important;
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;

  // Set document title so the browser suggests it as the filename
  const originalTitle = document.title;
  document.title = fileName.replace(/\.pdf$/i, "");

  window.print();

  // Restore title after a short delay (print dialog is async)
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);

  toast({
    title: "Print dialog opened",
    description: 'Select "Save as PDF" to download your document.',
  });
}
