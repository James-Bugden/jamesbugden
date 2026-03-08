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
const HEADER_SAFE_MM = 4;
const FOOTER_SAFE_MM = 4;

export async function exportToPdf({ elementId, fileName, pageFormat = "a4" }: ExportOptions) {
  const container = document.getElementById(elementId);
  if (!container) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  // Temporarily reposition the container on-screen so html2canvas can render it
  const originalStyle = container.style.cssText;
  container.style.cssText = `
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    z-index: -9999 !important;
    opacity: 1 !important;
    pointer-events: none !important;
    visibility: visible !important;
    height: auto !important;
    overflow: visible !important;
  `;

  try {
    const dims = PAGE_DIMS[pageFormat] || PAGE_DIMS.a4;

    const SCALE = 2;
    const fullCanvas = await html2canvas(container, {
      scale: SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: (clonedDoc: Document) => {
        // Modern browsers output color(srgb ...) which html2canvas can't parse.
        // Fix ALL elements in the cloned document, not just the target.
        const allEls = Array.from(clonedDoc.querySelectorAll("*")) as HTMLElement[];
        allEls.push(clonedDoc.documentElement, clonedDoc.body);
        const colorProps = ["color", "background-color", "border-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "outline-color", "text-decoration-color", "fill", "stroke", "caret-color", "column-rule-color", "text-emphasis-color"];

        const safeResolve = (raw: string): string | null => {
          if (!raw || raw === "transparent" || raw === "inherit" || raw === "currentcolor" || raw === "none") return null;
          if (raw.startsWith("rgb") || raw.startsWith("#")) return null;
          // Manual parse for color(srgb r g b / a) or color(srgb r g b)
          const srgbMatch = raw.match(/color\(\s*srgb\s+([\d.e+-]+)\s+([\d.e+-]+)\s+([\d.e+-]+)(?:\s*\/\s*([\d.e+-]+))?\s*\)/);
          if (srgbMatch) {
            const r = Math.round(Math.min(1, Math.max(0, parseFloat(srgbMatch[1]))) * 255);
            const g = Math.round(Math.min(1, Math.max(0, parseFloat(srgbMatch[2]))) * 255);
            const b = Math.round(Math.min(1, Math.max(0, parseFloat(srgbMatch[3]))) * 255);
            const a = srgbMatch[4] !== undefined ? parseFloat(srgbMatch[4]) : 1;
            return a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
          }
          // Any color() function → transparent to prevent crash
          if (raw.includes("color(")) return "transparent";
          return null;
        };

        for (const el of allEls) {
          try {
            const cs = clonedDoc.defaultView?.getComputedStyle(el) || getComputedStyle(el);
            for (const prop of colorProps) {
              const val = cs.getPropertyValue(prop);
              const safe = safeResolve(val);
              if (safe !== null) {
                el.style.setProperty(prop, safe, "important");
              }
            }
          } catch { /* skip elements that can't be styled */ }
        }
      },
    });

    // Read padding from the A4Page — it now includes header/footer safe zones
    const computedStyle = getComputedStyle(container.firstElementChild || container);
    const paddingTopPX = parseFloat(computedStyle.paddingTop) || (16 + HEADER_SAFE_MM) * PX_PER_MM;
    const paddingBottomPX = parseFloat(computedStyle.paddingBottom) || (16 + FOOTER_SAFE_MM) * PX_PER_MM;

    const pageWidthPX = dims.wMM * PX_PER_MM;
    const pageHeightPX = dims.hMM * PX_PER_MM;
    // Usable content height = page height minus top and bottom padding (which already includes safe zones)
    const usableHeightPX = pageHeightPX - paddingTopPX - paddingBottomPX;

    // Total content height (excluding the padding)
    const fullContentHeightPX = (fullCanvas.height / SCALE) - paddingTopPX - paddingBottomPX;
    const pageCount = Math.max(1, fullContentHeightPX <= usableHeightPX * 1.02 ? 1 : Math.ceil(fullContentHeightPX / usableHeightPX));

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [dims.wMM, dims.hMM],
    });

    const canvasPageWidthScaled = fullCanvas.width;
    const canvasPageHeightScaled = pageHeightPX * SCALE;
    const canvasUsableHeightScaled = usableHeightPX * SCALE;
    const canvasPaddingTopScaled = paddingTopPX * SCALE;

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
      // Page 0: content starts at paddingTop (which includes header safe zone)
      // Page N: content starts at paddingTop + N * usableHeight
      const srcY = canvasPaddingTopScaled + i * canvasUsableHeightScaled;
      const srcHeight = Math.min(canvasUsableHeightScaled, fullCanvas.height - srcY);

      if (srcHeight > 0) {
        // Draw the content slice into the page canvas with top padding
        ctx.drawImage(
          fullCanvas,
          0, srcY,                          // source x, y
          canvasPageWidthScaled, srcHeight,  // source w, h
          0, canvasPaddingTopScaled,         // dest x, y (with top padding)
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
  } finally {
    // Restore original hidden styles
    container.style.cssText = originalStyle;
  }
}
