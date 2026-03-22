/**
 * Export a resume as a true PDF using @react-pdf/renderer.
 * No DOM screenshots — generates real text PDF directly from data.
 */
import { pdf } from "@react-pdf/renderer";
import { createElement } from "react";
import { toast } from "@/hooks/use-toast";
import { ResumeData } from "@/components/resume-builder/types";
import { CustomizeSettings } from "@/components/resume-builder/customizeTypes";
import { ResumePdfDocument } from "./ResumePdfDocument";

interface ExportOptions {
  data: ResumeData;
  customize: CustomizeSettings;
  fileName?: string;
}

export async function exportResumePdf({ data, customize, fileName }: ExportOptions) {
  try {
    const safeName = (fileName || data.personalDetails.fullName || "Resume")
      .replace(/\s+/g, "_")
      .replace(/[^\w\-_.]/g, "");
    const fullName = safeName.endsWith(".pdf") ? safeName : `${safeName}.pdf`;

    // Generate PDF blob
    const doc = createElement(ResumePdfDocument, { data, customize }) as any;
    const blob = await pdf(doc).toBlob();

    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fullName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: "PDF downloaded", description: `${fullName} saved successfully.` });
  } catch (err) {
    console.error("Resume PDF export error:", err);
    toast({
      title: "Export failed",
      description: "Something went wrong generating the PDF. Please try again.",
      variant: "destructive",
    });
  }
}
