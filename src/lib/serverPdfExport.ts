/**
 * Server-side PDF export via Supabase Edge Function + headless Chrome (Browserless.io).
 * Serializes the resume preview as self-contained HTML, sends it to the edge function,
 * and triggers a direct download — no print dialog.
 */
import { toast } from "@/hooks/use-toast";

interface ServerPdfExportOptions {
  /** The hidden full-flow element containing the resume preview */
  sourceElement: HTMLElement;
  /** Output filename (without .pdf) */
  fileName?: string;
  /** Page format */
  pageFormat?: "a4" | "letter";
}

/**
 * Serialize the resume element into a self-contained HTML string
 * with all styles and font links embedded.
 */
function resolveInlineVars(el: HTMLElement): void {
  /**
   * Walk every element in the clone. For any inline style property that
   * references a CSS custom property (var(--xxx)), resolve it to the
   * computed value from the LIVE element tree so headless Chrome doesn't
   * need to resolve them.
   */
  const style = el.getAttribute("style");
  if (style && style.includes("var(--")) {
    // Get the computed style of this element (from the live DOM, not the clone)
    // We can't do that here, so we'll handle it differently below
  }
}

function computedStyleForClone(liveEl: HTMLElement, cloneEl: HTMLElement): void {
  /**
   * For elements using CSS custom properties, resolve them to concrete values
   * by reading computed styles from the live DOM.
   */
  const computed = getComputedStyle(liveEl);

  // Resolve padding (critical — prevents header clipping)
  const paddingTop = computed.paddingTop;
  const paddingRight = computed.paddingRight;
  const paddingBottom = computed.paddingBottom;
  const paddingLeft = computed.paddingLeft;
  if (paddingTop) cloneEl.style.paddingTop = paddingTop;
  if (paddingRight) cloneEl.style.paddingRight = paddingRight;
  if (paddingBottom) cloneEl.style.paddingBottom = paddingBottom;
  if (paddingLeft) cloneEl.style.paddingLeft = paddingLeft;

  // Resolve font
  const fontFamily = computed.fontFamily;
  const fontSize = computed.fontSize;
  const lineHeight = computed.lineHeight;
  const color = computed.color;
  if (fontFamily) cloneEl.style.fontFamily = fontFamily;
  if (fontSize) cloneEl.style.fontSize = fontSize;
  if (lineHeight) cloneEl.style.lineHeight = lineHeight;
  if (color) cloneEl.style.color = color;
}

function serializeResumeHtml(element: HTMLElement, pageFormat: "a4" | "letter"): string {
  // Collect all stylesheets (same-origin)
  let allCSS = "";
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        allCSS += rule.cssText + "\n";
      }
    } catch {
      // Cross-origin stylesheet — skip, we link it below
    }
  }

  // Collect external stylesheet links (Google Fonts etc.)
  const fontLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map((l) => (l as HTMLLinkElement).href)
    .filter(Boolean)
    .map((href) => `<link rel="stylesheet" href="${href}" />`)
    .join("\n");

  // Clone the element
  const clone = element.cloneNode(true) as HTMLElement;

  // Reset off-screen positioning that the hidden flow uses
  clone.style.position = "relative";
  clone.style.left = "auto";
  clone.style.top = "auto";
  clone.style.zIndex = "auto";
  clone.style.pointerEvents = "auto";
  clone.style.visibility = "visible";
  clone.style.opacity = "1";
  clone.removeAttribute("data-hidden-flow");
  clone.removeAttribute("id");

  // CRITICAL: Resolve CSS custom properties to computed values.
  // React sets CSS vars via setProperty() which may not survive cloneNode+outerHTML,
  // and headless Chrome may not resolve vars defined only in inline styles.
  const liveA4Page = element.querySelector("[data-color-role='background']") as HTMLElement | null;
  const cloneA4Page = clone.querySelector("[data-color-role='background']") as HTMLElement | null;
  if (liveA4Page && cloneA4Page) {
    computedStyleForClone(liveA4Page, cloneA4Page);

    // Also explicitly set the CSS custom properties as a style block
    const computed = getComputedStyle(liveA4Page);
    const cssVarNames = [
      "--resume-font-size", "--resume-line-height",
      "--resume-margin-x", "--resume-margin-y",
      "--resume-pad-top", "--resume-pad-bottom",
      "--resume-section-spacing", "--resume-accent",
      "--resume-name", "--resume-title", "--resume-headings",
      "--resume-dates", "--resume-subtitle", "--resume-body",
    ];
    for (const name of cssVarNames) {
      const val = computed.getPropertyValue(name);
      if (val?.trim()) cloneA4Page.style.setProperty(name, val.trim());
    }
  }

  // Copy CSS custom properties from :root as well
  const rootComputed = getComputedStyle(document.documentElement);
  const elComputed = getComputedStyle(element);
  const globalVarNames = [
    "--background", "--foreground", "--primary", "--primary-foreground",
    "--secondary", "--muted", "--accent",
  ];
  let rootVars = "";
  for (const name of globalVarNames) {
    const val = elComputed.getPropertyValue(name) || rootComputed.getPropertyValue(name);
    if (val?.trim()) rootVars += `  ${name}: ${val.trim()};\n`;
  }

  // Set width to match the source
  clone.style.width = `${element.scrollWidth || element.offsetWidth}px`;

  // Remove interactive elements
  clone.querySelectorAll("button, [data-edit-overlay], .no-print, [data-radix-popper-content-wrapper]").forEach((el) => el.remove());

  const pageW = pageFormat === "letter" ? "8.5in" : "210mm";
  const pageH = pageFormat === "letter" ? "11in" : "297mm";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
${fontLinks}
<style>
:root {
${rootVars}
}

${allCSS}

@page {
  size: ${pageW} ${pageH};
  margin: 0;
}

*, *::before, *::after {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

html, body {
  margin: 0;
  padding: 0;
  background: #ffffff;
  width: ${pageW};
}

[data-page-item] {
  break-inside: avoid;
  page-break-inside: avoid;
}

.shadow-2xl, .shadow-xl, .shadow-lg, .shadow-md, .shadow-sm, .shadow {
  box-shadow: none !important;
}

button, [data-edit-overlay], .no-print {
  display: none !important;
}
</style>
</head>
<body>${clone.outerHTML}</body>
</html>`;
}

export async function exportResumePdfServer({
  sourceElement,
  fileName = "Resume",
  pageFormat = "a4",
}: ServerPdfExportOptions): Promise<void> {
  if (!sourceElement) {
    toast({ title: "Export failed", description: "Preview not ready yet.", variant: "destructive" });
    return;
  }

  try {
    // Wait for fonts
    await document.fonts.ready;

    // Serialize resume to self-contained HTML
    const html = serializeResumeHtml(sourceElement, pageFormat);

    // Call edge function directly via fetch for binary response
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const response = await fetch(`${supabaseUrl}/functions/v1/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
      },
      body: JSON.stringify({ html, pageFormat }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`PDF generation failed: ${errorText}`);
    }

    const pdfBlob = await response.blob();

    // Trigger download
    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = safeName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: "PDF downloaded", description: `${safeName} saved successfully.` });
  } catch (err) {
    console.error("Server PDF export error:", err);
    toast({
      title: "Export failed",
      description: "Could not generate PDF. Falling back to browser print.",
      variant: "destructive",
    });

    // Fallback: browser print via hidden iframe
    await fallbackBrowserPrint(sourceElement, pageFormat);
  }
}

/**
 * Fallback: browser print via hidden iframe.
 * Used when the server-side export fails.
 */
async function fallbackBrowserPrint(sourceElement: HTMLElement, pageFormat: "a4" | "letter"): Promise<void> {
  const html = serializeResumeHtml(sourceElement, pageFormat);

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:none;visibility:hidden;";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  const iframeWin = iframe.contentWindow;
  if (!iframeDoc || !iframeWin) {
    document.body.removeChild(iframe);
    return;
  }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  await new Promise((r) => setTimeout(r, 500));
  if (iframeDoc.fonts) await iframeDoc.fonts.ready;
  await new Promise((r) => setTimeout(r, 200));

  iframeWin.print();

  setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch {}
  }, 10000);
}
