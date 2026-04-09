/**
 * Vector PDF export using @react-pdf/renderer.
 *
 * Produces a real vector PDF with selectable text, embedded fonts,
 * and clickable hyperlinks — no html2canvas, no raster images.
 */
import React from "react";
import { pdf } from "@react-pdf/renderer";
import { toast } from "@/hooks/use-toast";
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
  try {
    // Pre-register fonts before rendering
    await prepareFonts(customize, data);

    const doc = React.createElement(ResumePDF, { data, customize } as any);
    const blob = await pdf(doc as any).toBlob();

    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    a.download = safeName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Delay revocation to ensure the browser has read the blob
    setTimeout(() => URL.revokeObjectURL(url), 200);

    toast({ title: "PDF downloaded", description: `${safeName} saved successfully.` });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({
      title: "Export failed",
      description: "Could not generate PDF. Please try again.",
      variant: "destructive",
    });
  }
}
