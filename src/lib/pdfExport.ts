import { toast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

type PageFormat = "a4" | "letter";

const PAGE_DIMS: Record<PageFormat, { wMM: number; hMM: number }> = {
  a4: { wMM: 210, hMM: 297 },
  letter: { wMM: 215.9, hMM: 279.4 },
};

const PX_PER_MM = 3.7795;

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/**
 * Capture a DOM element as a PNG data-url using html-to-image.
 * Clones the element off-screen at 1:1 scale so transforms don't affect output.
 */
async function captureElement(el: HTMLElement, pixelRatio: number): Promise<string> {
  // Wait for fonts
  await document.fonts.ready;

  // Clone element off-screen at native size (no transforms)
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.transform = "none";
  clone.style.position = "absolute";
  clone.style.left = "-9999px";
  clone.style.top = "0";
  clone.style.zIndex = "-1";
  clone.style.width = `${el.scrollWidth}px`;
  document.body.appendChild(clone);

  try {
    const dataUrl = await toPng(clone, {
      pixelRatio,
      cacheBust: true,
      skipAutoScale: true,
    });
    return dataUrl;
  } finally {
    document.body.removeChild(clone);
  }
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
  const el = document.getElementById(elementId);
  if (!el) {
    toast({ title: "Export failed", description: "Could not find the document to export.", variant: "destructive" });
    return;
  }

  try {
    const ratio = isMobile() ? 1.5 : 2;
    const dataUrl = await captureElement(el, ratio);

    const { wMM, hMM } = PAGE_DIMS[pageFormat];
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [wMM, hMM] });
    pdf.addImage(dataUrl, "PNG", 0, 0, wMM, hMM);

    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(safeName);
    toast({ title: "PDF downloaded", description: `${safeName} saved successfully.` });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}

/* ───────────────────────────────────────────────────────────────
   Resume page-by-page export
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
  pageCount,
  contentOriginPX,
  usablePerPagePX,
  pageHeightPX,
  marginYPX,
}: ResumeExportOptions) {
  try {
    await document.fonts.ready;

    const ratio = isMobile() ? 1.5 : 2;
    const { wMM, hMM } = PAGE_DIMS[pageFormat];

    // Clone off-screen at native size
    const clone = sourceElement.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.zIndex = "-1";
    clone.style.width = `${sourceElement.scrollWidth}px`;
    document.body.appendChild(clone);

    let dataUrl: string;
    try {
      dataUrl = await toPng(clone, {
        pixelRatio: ratio,
        cacheBust: true,
        skipAutoScale: true,
      });
    } finally {
      document.body.removeChild(clone);
    }

    // Load image to get dimensions
    const img = new Image();
    img.src = dataUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [wMM, hMM] });

    if (pageCount <= 1) {
      // Single page — just fit the whole image
      pdf.addImage(dataUrl, "PNG", 0, 0, wMM, hMM);
    } else {
      // Multi-page: slice the captured image into pages
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      const imgPageH = pageHeightPX * ratio;
      const sliceW = img.width;

      for (let i = 0; i < pageCount; i++) {
        if (i > 0) pdf.addPage([wMM, hMM]);

        const sliceY = i * imgPageH;
        const sliceH = Math.min(imgPageH, img.height - sliceY);
        if (sliceH <= 0) continue;

        canvas.width = sliceW;
        canvas.height = sliceH;
        ctx.clearRect(0, 0, sliceW, sliceH);
        ctx.drawImage(img, 0, sliceY, sliceW, sliceH, 0, 0, sliceW, sliceH);

        const pageData = canvas.toDataURL("image/png");
        const drawH = (sliceH / imgPageH) * hMM;
        pdf.addImage(pageData, "PNG", 0, 0, wMM, drawH);
      }
    }

    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(safeName);
    toast({ title: "PDF downloaded", description: `${safeName} saved successfully.` });
  } catch (err) {
    console.error("Resume PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}
