import { toast } from "@/hooks/use-toast";

interface ExportOptions {
  elementId: string;
  fileName: string;
  pageFormat: "a4" | "letter";
}

export async function exportToPdf({ elementId, fileName }: ExportOptions) {
  const element = document.getElementById(elementId);
  if (!element) {
    toast({ title: "Export failed", description: "Could not find render target.", variant: "destructive" });
    return;
  }

  try {
    window.print();
    toast({ title: "PDF ready!", description: "Use your browser's Save as PDF option." });
  } catch (err) {
    console.error("PDF export error:", err);
    toast({ title: "Export failed", description: "Something went wrong generating the PDF.", variant: "destructive" });
  }
}
