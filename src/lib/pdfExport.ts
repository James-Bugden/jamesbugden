import { toast } from "@/hooks/use-toast";

/**
 * Print-based PDF export using window.print().
 *
 * Adds a temporary class to <html> that activates @media-print-like CSS
 * scoped to the target element, then triggers the browser's native print
 * dialog (which can save as PDF).
 */

type PageFormat = "a4" | "letter";

interface PrintOptions {
  /** CSS selector or element ID (without #) of the content to print */
  targetId: string;
  pageFormat?: PageFormat;
}

const PAGE_SIZE_CSS: Record<PageFormat, string> = {
  a4: "210mm 297mm",
  letter: "8.5in 11in",
};

function injectPrintStyle(targetId: string, pageFormat: PageFormat): HTMLStyleElement {
  const style = document.createElement("style");
  style.id = "__resume-print-style";
  style.textContent = `
    @media print {
      @page {
        size: ${PAGE_SIZE_CSS[pageFormat]};
        margin: 0;
      }

      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Hide everything */
      body > * {
        display: none !important;
      }

      /* Show only the print target */
      #${targetId},
      #${targetId} * {
        visibility: visible !important;
      }

      #${targetId} {
        display: block !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 210mm !important;
        transform: none !important;
        box-shadow: none !important;
        border: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  return style;
}

function printElement(targetId: string, pageFormat: PageFormat): Promise<void> {
  return new Promise((resolve) => {
    const style = injectPrintStyle(targetId, pageFormat);

    // Small delay to let styles apply
    requestAnimationFrame(() => {
      window.print();
      // Clean up after print dialog closes
      style.remove();
      resolve();
    });
  });
}

/* ───────────────────────────────────────────────────────────────
   Legacy API — used by cover letter builder
   ─────────────────────────────────────────────────────────────── */

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: PageFormat;
}

export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  try {
    await printElement(elementId, pageFormat);
    toast({ title: "Print dialog opened", description: "Choose 'Save as PDF' to download your document." });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong opening the print dialog.", variant: "destructive" });
  }
}

/* ───────────────────────────────────────────────────────────────
   Resume page-by-page export (now uses window.print)
   ─────────────────────────────────────────────────────────────── */

interface ResumeExportOptions {
  sourceElement: HTMLElement;
  fileName: string;
  pageFormat: PageFormat;
  pageCount: number;
  contentOriginPX: number;
  usablePerPagePX: number;
  pageHeightPX: number;
  marginYPX: number;
}

export async function exportResumePages({
  sourceElement,
  fileName,
  pageFormat = "a4",
}: ResumeExportOptions) {
  const targetId = sourceElement.id || "resume-pdf-target";
  if (!sourceElement.id) {
    sourceElement.id = targetId;
  }

  try {
    await printElement(targetId, pageFormat);
    toast({ title: "Print dialog opened", description: "Choose 'Save as PDF' to download your resume." });
  } catch (err) {
    console.error("Resume PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong opening the print dialog.", variant: "destructive" });
  }
}
