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
const HEADER_SAFE_MM = 8;
const FOOTER_SAFE_MM = 8;

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
      onclone: (_doc: Document, clone: HTMLElement) => {
        // Modern browsers output color(srgb ...) which html2canvas can't parse.
        // Convert ALL color-related styles to safe rgb() fallbacks.
        const allEls = [clone, ...Array.from(clone.querySelectorAll("*"))] as HTMLElement[];
        const colorProps = ["color", "background-color", "border-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "outline-color", "text-decoration-color", "fill", "stroke", "caret-color", "column-rule-color", "text-emphasis-color"];
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx2d = canvas.getContext("2d")!;

        const safeResolve = (raw: string): string | null => {
          if (!raw || raw === "transparent" || raw === "inherit" || raw === "currentcolor" || raw === "none") return null;
          // If it's already rgb/rgba, leave it
          if (raw.startsWith("rgb")) return null;
          // Try canvas 2d for conversion
          ctx2d.clearRect(0, 0, 1, 1);
          ctx2d.fillStyle = "#000000";
          ctx2d.fillStyle = raw;
          const resolved = ctx2d.fillStyle;
          // If canvas understood it, use that
          if (resolved !== "#000000" || raw === "#000000" || raw === "black") return resolved;
          // Manual parse for color(srgb r g b / a) or color(srgb r g b)
          const srgbMatch = raw.match(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/);
          if (srgbMatch) {
            const r = Math.round(parseFloat(srgbMatch[1]) * 255);
            const g = Math.round(parseFloat(srgbMatch[2]) * 255);
            const b = Math.round(parseFloat(srgbMatch[3]) * 255);
            const a = srgbMatch[4] !== undefined ? parseFloat(srgbMatch[4]) : 1;
            return a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
          }
          // If it contains "color(" at all, fall back to transparent to avoid crash
          if (raw.includes("color(")) return "transparent";
          return null;
        };

        for (const el of allEls) {
          const cs = getComputedStyle(el);
          for (const prop of colorProps) {
            const val = cs.getPropertyValue(prop);
            const safe = safeResolve(val);
            if (safe !== null) {
              el.style.setProperty(prop, safe, "important");
            }
          }
        }
      },
    });

    // Read the margin from the rendered element's CSS custom properties
    const computedStyle = getComputedStyle(container.firstElementChild || container);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 16 * PX_PER_MM;
    const marginYPX = paddingTop; // The A4Page uses marginY as padding

    const pageWidthPX = dims.wMM * PX_PER_MM;
    const pageHeightPX = dims.hMM * PX_PER_MM;
    const headerReservePX = HEADER_SAFE_MM * PX_PER_MM;
    const footerReservePX = FOOTER_SAFE_MM * PX_PER_MM;
    const usableHeightPX = pageHeightPX - 2 * marginYPX - headerReservePX - footerReservePX;

    // Total content height (excluding the top/bottom padding of A4Page)
    const fullContentHeightPX = (fullCanvas.height / SCALE) - 2 * marginYPX - headerReservePX - footerReservePX;
    const pageCount = Math.max(1, fullContentHeightPX <= usableHeightPX * 1.02 ? 1 : Math.ceil(fullContentHeightPX / usableHeightPX));

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [dims.wMM, dims.hMM],
    });

    const canvasPageWidthScaled = fullCanvas.width;
    const canvasPageHeightScaled = pageHeightPX * SCALE;
    const canvasUsableHeightScaled = usableHeightPX * SCALE;
    const canvasMarginYScaled = marginYPX * SCALE;
    const canvasHeaderReserveScaled = headerReservePX * SCALE;

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
      // Page 0: content starts at marginYPX (the A4Page's own padding)
      // Page N: content starts at marginYPX + N * usableHeightPX
      const srcY = canvasMarginYScaled + canvasHeaderReserveScaled + i * canvasUsableHeightScaled;
      const srcHeight = Math.min(canvasUsableHeightScaled, fullCanvas.height - srcY);

      if (srcHeight > 0) {
        // Draw the content slice into the page canvas with top margin
        ctx.drawImage(
          fullCanvas,
          0, srcY,                          // source x, y
          canvasPageWidthScaled, srcHeight,  // source w, h
          0, canvasMarginYScaled + canvasHeaderReserveScaled, // dest x, y (with top margin + header reserve)
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
