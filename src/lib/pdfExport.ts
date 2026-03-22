import { toast } from "@/hooks/use-toast";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";

type PageFormat = "a4" | "letter";

const PAGE_DIMS: Record<PageFormat, { wMM: number; hMM: number }> = {
  a4: { wMM: 210, hMM: 297 },
  letter: { wMM: 215.9, hMM: 279.4 },
};

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/* ── Font CSS cache ─────────────────────────────────────── */
let fontCSSCache: string | null = null;

async function getFontEmbedCSS(): Promise<string | undefined> {
  if (fontCSSCache) return fontCSSCache;
  try {
    // Find all Google Fonts <link> tags and fetch their CSS
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .filter((l) => (l as HTMLLinkElement).href.includes("fonts.googleapis.com"));
    if (!links.length) return undefined;

    const cssChunks = await Promise.all(
      links.map(async (link) => {
        try {
          const resp = await fetch((link as HTMLLinkElement).href, { mode: "cors" });
          return resp.ok ? await resp.text() : "";
        } catch {
          return "";
        }
      })
    );
    const merged = cssChunks.filter(Boolean).join("\n");
    if (merged) fontCSSCache = merged;
    return merged || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Capture a DOM element as a JPEG data-url using html-to-image.
 * Clones the element off-screen at 1:1 scale so transforms don't affect output.
 * Pre-fetches Google Fonts CSS to avoid cross-origin SecurityError.
 */
async function captureElement(el: HTMLElement, pixelRatio: number, useJpeg = true): Promise<string> {
  await document.fonts.ready;

  const fontEmbedCSS = await getFontEmbedCSS();

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
    const opts = {
      pixelRatio,
      cacheBust: true,
      skipAutoScale: true,
      fontEmbedCSS,
      // Filter out cross-origin stylesheets that cause SecurityError
      filter: (node: HTMLElement) => {
        if (node.tagName === "LINK" && (node as HTMLLinkElement).href?.includes("fonts.googleapis.com")) {
          return false; // skip — we provide CSS via fontEmbedCSS
        }
        return true;
      },
    };

    if (useJpeg) {
      return await toJpeg(clone, { ...opts, quality: 0.85 });
    }
    return await toPng(clone, opts);
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
    pdf.addImage(dataUrl, "JPEG", 0, 0, wMM, hMM);

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

    const fontEmbedCSS = await getFontEmbedCSS();

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
      dataUrl = await toJpeg(clone, {
        pixelRatio: ratio,
        cacheBust: true,
        skipAutoScale: true,
        quality: 0.85,
        fontEmbedCSS,
        filter: (node: HTMLElement) => {
          if (node.tagName === "LINK" && (node as HTMLLinkElement).href?.includes("fonts.googleapis.com")) {
            return false;
          }
          return true;
        },
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
      pdf.addImage(dataUrl, "JPEG", 0, 0, wMM, hMM);
    } else {
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
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, sliceW, sliceH);
        ctx.drawImage(img, 0, sliceY, sliceW, sliceH, 0, 0, sliceW, sliceH);

        const pageData = canvas.toDataURL("image/jpeg", 0.85);
        const drawH = (sliceH / imgPageH) * hMM;
        pdf.addImage(pageData, "JPEG", 0, 0, wMM, drawH);
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
