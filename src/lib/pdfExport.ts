import { toast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

type PageFormat = "a4" | "letter";

const PAGE_DIMS: Record<PageFormat, { wMM: number; hMM: number }> = {
  a4: { wMM: 210, hMM: 297 },
  letter: { wMM: 215.9, hMM: 279.4 },
};

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/* ── Force light mode & resolve CSS variables before capture ── */

function forceLightMode(el: HTMLElement): () => void {
  const originals: { el: HTMLElement; colorScheme: string; className: string }[] = [];

  const walk = (node: HTMLElement) => {
    originals.push({
      el: node,
      colorScheme: node.style.colorScheme,
      className: node.className,
    });
    node.style.colorScheme = "light";
    node.classList.remove("dark");
    node.classList.add("light");
    Array.from(node.children).forEach((child) => {
      if (child instanceof HTMLElement) walk(child);
    });
  };
  walk(el);

  const htmlEl = document.documentElement;
  const bodyEl = document.body;
  const savedHtml = htmlEl.className;
  const savedBody = bodyEl.className;
  const savedHtmlScheme = htmlEl.style.colorScheme;
  const savedBodyScheme = bodyEl.style.colorScheme;

  htmlEl.classList.remove("dark");
  htmlEl.classList.add("light");
  htmlEl.style.colorScheme = "light";
  bodyEl.classList.remove("dark");
  bodyEl.classList.add("light");
  bodyEl.style.colorScheme = "light";

  return () => {
    originals.forEach(({ el: node, colorScheme, className }) => {
      node.style.colorScheme = colorScheme;
      node.className = className;
    });
    htmlEl.className = savedHtml;
    htmlEl.style.colorScheme = savedHtmlScheme;
    bodyEl.className = savedBody;
    bodyEl.style.colorScheme = savedBodyScheme;
  };
}

function resolveCSSVariables(el: HTMLElement): () => void {
  const overrides: { el: HTMLElement; prop: string; original: string }[] = [];
  const propsToCheck = ["color", "backgroundColor", "borderColor", "boxShadow", "fill", "stroke"];

  const walk = (node: HTMLElement) => {
    const computed = getComputedStyle(node);
    for (const prop of propsToCheck) {
      const value = computed.getPropertyValue(prop);
      if (value && value !== "none" && value !== "transparent") {
        overrides.push({ el: node, prop, original: node.style.getPropertyValue(prop) });
        node.style.setProperty(prop, value);
      }
    }
    Array.from(node.children).forEach((child) => {
      if (child instanceof HTMLElement) walk(child);
    });
  };
  walk(el);

  return () => {
    overrides.forEach(({ el: node, prop, original }) => {
      if (original) node.style.setProperty(prop, original);
      else node.style.removeProperty(prop);
    });
  };
}

async function waitForAssets(el: HTMLElement): Promise<void> {
  const images = Array.from(el.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => new Promise<void>((resolve) => {
      if (img.complete) return resolve();
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }))
  );
  if (document.fonts?.ready) await document.fonts.ready;
}


let fontCSSCache: string | null = null;

async function getFontEmbedCSS(): Promise<string | undefined> {
  if (fontCSSCache) return fontCSSCache;
  try {
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
    await document.fonts.ready;
    const fontEmbedCSS = await getFontEmbedCSS();

    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.zIndex = "-1";
    clone.style.width = el.style.width || `${el.scrollWidth}px`;
    clone.style.height = el.style.height || `${el.scrollHeight}px`;
    clone.style.boxShadow = "none";
    clone.style.borderRadius = "0";
    document.body.appendChild(clone);

    let dataUrl: string;
    try {
      dataUrl = await toPng(clone, {
        pixelRatio: ratio,
        cacheBust: true,
        skipAutoScale: true,
        fontEmbedCSS,
        filter: (node: HTMLElement) => {
          if (node.tagName === "LINK" && (node as HTMLLinkElement).href?.includes("fonts.googleapis.com")) return false;
          return true;
        },
      });
    } finally {
      document.body.removeChild(clone);
    }

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
   Resume export: capture hidden flow → slice into pages via Canvas
   ─────────────────────────────────────────────────────────────── */

export interface ResumeExportConfig {
  /** The hidden measurement div (flat, no transforms) */
  sourceElement: HTMLElement;
  pageCount: number;
  contentOriginPX: number;
  usablePerPagePX: number;
  pageHeightPX: number;
  marginYPX: number;
  fileName: string;
  pageFormat: PageFormat;
  /** Footer options */
  footerName?: string;
  footerEmail?: string;
  showPageNumbers?: boolean;
  bodyFont?: string;
  footerColor?: string;
  footerFontSizePt?: number;
  marginXPX?: number;
  backgroundColor?: string;
}

export async function exportResumePages(config: ResumeExportConfig) {
  const {
    sourceElement,
    pageCount,
    contentOriginPX,
    usablePerPagePX,
    pageHeightPX,
    marginYPX,
    fileName,
    pageFormat = "a4",
    footerName,
    footerEmail,
    showPageNumbers,
    bodyFont,
    footerColor = "#6B7280",
    footerFontSizePt = 8,
    marginXPX = 60,
    backgroundColor = "#ffffff",
  } = config;

  if (!sourceElement || pageCount < 1) {
    toast({ title: "Export failed", description: "No pages to export.", variant: "destructive" });
    return;
  }

  // Cleanup functions for style overrides
  let restoreLight: (() => void) | null = null;
  let restoreVars: (() => void) | null = null;

  try {
    // 0. Wait for all assets (images + fonts)
    await waitForAssets(sourceElement);

    // 1. Force light mode & resolve CSS variables to prevent dark/blank output
    restoreLight = forceLightMode(sourceElement);
    restoreVars = resolveCSSVariables(sourceElement);

    // Small repaint delay so forced styles take effect
    await new Promise((r) => setTimeout(r, 50));

    const ratio = isMobile() ? 1.5 : 2;
    const fontEmbedCSS = await getFontEmbedCSS();

    // 2. Capture the entire hidden flow as one tall PNG
    const tallDataUrl = await toPng(sourceElement, {
      pixelRatio: ratio,
      cacheBust: true,
      skipAutoScale: true,
      fontEmbedCSS,
      filter: (node: HTMLElement) => {
        if (node.tagName === "LINK" && (node as HTMLLinkElement).href?.includes("fonts.googleapis.com")) return false;
        return true;
      },
    });

    // 2. Load into an Image
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = tallDataUrl;
    });

    // The image is scaled by `ratio`, so all pixel calculations must be scaled too
    const scaledPageW = Math.round(sourceElement.scrollWidth * ratio);
    const scaledPageH = Math.round(pageHeightPX * ratio);
    const scaledContentOrigin = Math.round(contentOriginPX * ratio);
    const scaledUsable = Math.round(usablePerPagePX * ratio);
    const scaledMarginY = Math.round(marginYPX * ratio);
    const scaledMarginX = Math.round(marginXPX * ratio);

    const { wMM, hMM } = PAGE_DIMS[pageFormat];
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [wMM, hMM] });

    const hasFooter = !!(footerName || footerEmail || showPageNumbers);
    const scaledFooterFontSize = Math.round(footerFontSizePt * ratio * 1.33); // pt to px conversion

    for (let i = 0; i < pageCount; i++) {
      if (i > 0) pdf.addPage([wMM, hMM]);

      // Create a page-sized canvas
      const canvas = document.createElement("canvas");
      canvas.width = scaledPageW;
      canvas.height = scaledPageH;
      const ctx = canvas.getContext("2d")!;

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, scaledPageW, scaledPageH);

      // Calculate the slice region from the tall image
      const sliceY = scaledContentOrigin + i * scaledUsable;
      const sliceH = Math.min(scaledUsable, img.height - sliceY);

      if (sliceH > 0) {
        // Draw the content slice into the content area of the page
        ctx.drawImage(
          img,
          0, sliceY, scaledPageW, sliceH,           // source rect
          0, scaledContentOrigin, scaledPageW, sliceH // dest rect
        );
      }

      // Draw footer
      if (hasFooter) {
        const footerY = scaledPageH - scaledMarginY;
        ctx.font = `${scaledFooterFontSize}px ${bodyFont || "sans-serif"}`;
        ctx.fillStyle = footerColor;
        ctx.textBaseline = "bottom";

        // Left: name
        if (footerName) {
          ctx.textAlign = "left";
          ctx.fillText(footerName, scaledMarginX, footerY);
        }

        // Right: email · Page X of Y
        const rightParts = [
          footerEmail || "",
          showPageNumbers ? `Page ${i + 1} of ${pageCount}` : "",
        ].filter(Boolean).join(" · ");

        if (rightParts) {
          ctx.textAlign = "right";
          ctx.fillText(rightParts, scaledPageW - scaledMarginX, footerY);
        }
      }

      // Add canvas to PDF
      const pageDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      pdf.addImage(pageDataUrl, "JPEG", 0, 0, wMM, hMM);
    }

    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(safeName);
    toast({ title: "PDF downloaded", description: `${safeName} saved successfully.` });
  } catch (err) {
    console.error("Resume PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  } finally {
    // Always restore original styles
    restoreVars?.();
    restoreLight?.();
  }
}
