/**
 * Server-side PDF export via Supabase Edge Function + headless Chrome (Browserless.io).
 * Serializes the resume preview as self-contained HTML, sends it to the edge function,
 * and triggers a direct download — no print dialog.
 */
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ServerPdfExportOptions {
  /** The hidden full-flow element containing the resume preview */
  sourceElement: HTMLElement;
  /** Output filename (without .pdf) */
  fileName?: string;
  /** Page format */
  pageFormat?: "a4" | "letter";
  /** Full customize settings */
  customize?: {
    marginX?: number;
    marginY?: number;
    a4Background?: string;
    showPageNumbers?: boolean;
    showFooterName?: boolean;
    showFooterEmail?: boolean;
    bodyFont?: string;
    bodyColor?: string;
    datesColor?: string;
  };
  /** Personal details for footer content */
  personalDetails?: { fullName?: string; email?: string };
}

/**
 * Build a fixed-position footer div for the PDF.
 * Headless Chrome repeats `position: fixed` elements on every printed page.
 */
function buildFooterHtml(
  customize?: ServerPdfExportOptions["customize"],
  personalDetails?: ServerPdfExportOptions["personalDetails"],
): string {
  const showName = customize?.showFooterName && personalDetails?.fullName;
  const showEmail = customize?.showFooterEmail && personalDetails?.email;
  const showPages = customize?.showPageNumbers;

  if (!showName && !showEmail && !showPages) return "";

  const leftParts: string[] = [];
  if (showName) leftParts.push(personalDetails!.fullName!);
  if (showEmail) leftParts.push(personalDetails!.email!);

  const left = leftParts.join(" · ");
  const right = showPages
    ? '<span class="page-counter"></span>'
    : "";

  return `<div class="pdf-footer"><span>${left}</span><span>${right}</span></div>`;
}

/**
 * Serialize the resume element into a self-contained HTML string.
 * Uses @page margins instead of element padding so every page gets proper margins.
 */
function serializeResumeHtml(
  element: HTMLElement,
  pageFormat: "a4" | "letter",
  customize?: ServerPdfExportOptions["customize"],
  personalDetails?: ServerPdfExportOptions["personalDetails"],
): string {
  const pageW = pageFormat === "letter" ? "8.5in" : "210mm";
  const pageH = pageFormat === "letter" ? "11in" : "297mm";

  // Derive @page margins from user settings (mm)
  const marginX = customize?.marginX ?? 10;
  const marginY = customize?.marginY ?? 10;



  // Collect all stylesheets — but skip @media print blocks
  // (they contain conflicting @page rules from the analysis report)
  let allCSS = "";
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSMediaRule) {
          try {
            if (rule.media.mediaText === "print") continue;
          } catch {
            if (rule.conditionText === "print") continue;
          }
        }
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

  // Export the actual A4 page element rather than the hidden wrapper.
  // This keeps Browserless paginating the same box the preview uses.
  const liveA4Page = element.matches("[data-color-role='background']")
    ? element
    : (element.querySelector("[data-color-role='background']") as HTMLElement | null);
  const exportRoot = liveA4Page ?? element;
  const clone = exportRoot.cloneNode(true) as HTMLElement;

  // Reset off-screen positioning — but keep everything else as-is
  clone.style.position = "relative";
  clone.style.left = "auto";
  clone.style.top = "auto";
  clone.style.zIndex = "auto";
  clone.style.pointerEvents = "auto";
  clone.style.visibility = "visible";
  clone.style.opacity = "1";
  clone.removeAttribute("data-hidden-flow");
  clone.removeAttribute("id");

  // Resolve CSS custom properties from the live DOM
  const cloneA4Page = clone.matches("[data-color-role='background']")
    ? clone
    : (clone.querySelector("[data-color-role='background']") as HTMLElement | null);
  if (liveA4Page && cloneA4Page) {
    const computed = getComputedStyle(liveA4Page);

    // Copy font properties
    cloneA4Page.style.fontFamily = computed.fontFamily;
    cloneA4Page.style.fontSize = computed.fontSize;
    cloneA4Page.style.lineHeight = computed.lineHeight;
    cloneA4Page.style.color = computed.color;

    // Copy CSS custom properties for colors/spacing
    const cssVarNames = [
      "--resume-font-size", "--resume-line-height",
      "--resume-section-spacing", "--resume-accent",
      "--resume-name", "--resume-title", "--resume-headings",
      "--resume-dates", "--resume-subtitle", "--resume-body",
      "--resume-pad-top", "--resume-pad-bottom", "--resume-margin-x",
    ];
    for (const name of cssVarNames) {
      const val = computed.getPropertyValue(name);
      if (val?.trim()) cloneA4Page.style.setProperty(name, val.trim());
    }

    // CRITICAL: Strip minHeight — it forces the element to fill 297mm (a full page)
    // even when the content is shorter. Without this, page 1 is mostly blank space.
    cloneA4Page.style.minHeight = "0";
    cloneA4Page.style.height = "auto";

    // Strip internal padding — @page margins now handle spacing on every page.
    // Without this, page 1 would have double margins (element padding + @page margin).
    cloneA4Page.style.paddingTop = "0";
    cloneA4Page.style.paddingBottom = "0";
    cloneA4Page.style.paddingLeft = "0";
    cloneA4Page.style.paddingRight = "0";
  }

  // Copy global CSS custom properties from :root
  const rootComputed = getComputedStyle(document.documentElement);
  const globalVarNames = [
    "--background", "--foreground", "--primary", "--primary-foreground",
    "--secondary", "--muted", "--accent",
  ];
  let rootVars = "";
  for (const name of globalVarNames) {
    const val = rootComputed.getPropertyValue(name);
    if (val?.trim()) rootVars += `  ${name}: ${val.trim()};\n`;
  }

  // Keep the clone's width matching the source element
  const sourceWidth = liveA4Page?.style.width || `${element.scrollWidth || element.offsetWidth}px`;
  clone.style.width = sourceWidth;

  // Remove pagination margin-top hacks
  clone.querySelectorAll("[data-page-item]").forEach((el) => {
    (el as HTMLElement).style.marginTop = "";
  });
  clone.querySelectorAll("[data-page-break-child]").forEach((el) => {
    (el as HTMLElement).style.marginTop = "";
    el.removeAttribute("data-page-break-child");
  });

  // Remove interactive elements
  clone.querySelectorAll("button, [data-edit-overlay], .no-print, [data-radix-popper-content-wrapper]").forEach((el) => el.remove());

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
  margin: ${marginY}mm ${marginX}mm;
}

*, *::before, *::after {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

html, body {
  margin: 0;
  padding: 0;
  background: ${customize?.a4Background || "#ffffff"};
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

.pdf-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 9pt;
  color: ${customize?.datesColor || "#6B7280"};
  font-family: ${customize?.bodyFont || "inherit"};
  padding: 0 2mm;
}

.page-counter::after {
  content: counter(page) " / " counter(pages);
}
</style>
</head>
<body>${clone.outerHTML}${buildFooterHtml(customize, personalDetails)}</body>
</html>`;
}

export async function exportResumePdfServer({
  sourceElement,
  fileName = "Resume",
  pageFormat = "a4",
  customize,
  personalDetails,
}: ServerPdfExportOptions): Promise<void> {
  if (!sourceElement) {
    toast({ title: "Export failed", description: "Preview not ready yet.", variant: "destructive" });
    return;
  }

  try {
    // Wait for fonts
    await document.fonts.ready;

    // Serialize resume to self-contained HTML with @page margins
    const html = serializeResumeHtml(sourceElement, pageFormat, customize, personalDetails);

    // Get auth token for rate limiting
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token || supabaseKey;

    const response = await fetch(`${supabaseUrl}/functions/v1/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        apikey: supabaseKey,
      },
      body: JSON.stringify({ html, pageFormat }),
    });

    if (!response.ok) {
      // Try to parse error JSON for specific messages
      let errorBody: { error?: string; limit?: number; used?: number } = {};
      try {
        errorBody = await response.json();
      } catch {
        const errorText = await response.text();
        throw new Error(`PDF generation failed: ${errorText}`);
      }

      if (response.status === 429) {
        toast({
          title: "Monthly limit reached",
          description: `You've used all ${errorBody.limit ?? 50} free PDF exports this month. Your limit resets at the start of next month. You can still use browser print as a fallback.`,
          variant: "destructive",
        });
        // Offer browser print fallback
        await fallbackBrowserPrint(sourceElement, pageFormat, customize);
        return;
      }

      if (response.status === 401) {
        toast({
          title: "Sign in required",
          description: "Please sign in to download PDFs.",
          variant: "destructive",
        });
        return;
      }

      throw new Error(errorBody.error || `PDF generation failed (${response.status})`);
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
    await fallbackBrowserPrint(sourceElement, pageFormat, customize);
  }
}

/**
 * Fallback: browser print via hidden iframe.
 * Used when the server-side export fails.
 */
async function fallbackBrowserPrint(
  sourceElement: HTMLElement,
  pageFormat: "a4" | "letter",
  customize?: { marginX?: number; marginY?: number },
): Promise<void> {
  const html = serializeResumeHtml(sourceElement, pageFormat, customize);

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
