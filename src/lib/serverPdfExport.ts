/**
 * Vector PDF export using @react-pdf/renderer.
 *
 * Produces a real vector PDF with selectable text, embedded fonts,
 * and clickable hyperlinks — no html2canvas, no raster images.
 */
import React from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF, prepareFonts } from "@/components/resume-builder/ResumePDF";
import type { ResumeData } from "@/components/resume-builder/types";
import type { CustomizeSettings } from "@/components/resume-builder/customizeTypes";

interface PdfExportOptions {
  /** Resume data */
  data: ResumeData;
  /** Customization settings */
  customize?: CustomizeSettings;
  /** Output filename (without .pdf) */
  fileName?: string;
}

export async function exportResumePdfServer({
  data,
  customize,
  fileName = "Resume",
}: PdfExportOptions): Promise<void> {
  // Step 1: Font preparation
  try {
    await prepareFonts(customize, data);
  } catch (fontErr: any) {
    console.error("[ResumeDownload] Font preparation failed:", fontErr?.message, fontErr?.stack);
    throw new Error(`Font loading failed: ${fontErr?.message || "Unknown font error"}`);
  }

  // Step 2: PDF rendering
  let blob: Blob;
  try {
    const doc = React.createElement(ResumePDF, { data, customize } as any);
    blob = await pdf(doc as any).toBlob();
  } catch (renderErr: any) {
    console.error("[ResumeDownload] PDF render failed:", renderErr?.message, renderErr?.stack);
    throw new Error(`PDF render failed: ${renderErr?.message || "Unknown render error"}`);
  }

  // Step 3: Trigger download
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = url;
    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    a.download = safeName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Delay revocation to ensure the browser has read the blob
    setTimeout(() => URL.revokeObjectURL(url), 500);
  } catch (dlErr: any) {
    URL.revokeObjectURL(url);
    console.error("[ResumeDownload] Download trigger failed:", dlErr?.message, dlErr?.stack);
    throw new Error(`Download trigger failed: ${dlErr?.message || "Unknown download error"}`);
  }
}
