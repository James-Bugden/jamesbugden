import mammoth from "mammoth";

/** Extract plain text from a DOCX file */
export async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/** Extract plain text from a PDF file using pdf.js */
export async function extractTextFromPdf(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => item.str)
      .join(" ");
    pages.push(text);
  }

  return pages.join("\n\n");
}

/** Simple heuristic to map raw text into resume sections */
export function mapTextToResumeSections(text: string) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  // Name is typically the first non-empty line
  const fullName = lines[0] || "";

  // Try to find email and phone
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = text.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}/);

  // Summary: text between first few lines and first section header
  const sectionHeaders = ["experience", "education", "skills", "languages", "projects", "certificates", "awards", "summary", "objective", "work history", "professional experience"];
  let summaryLines: string[] = [];
  let sectionStart = -1;

  for (let i = 1; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    if (sectionHeaders.some((h) => lower.includes(h))) {
      sectionStart = i;
      break;
    }
    summaryLines.push(lines[i]);
  }

  return {
    fullName,
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    summary: summaryLines.join(" ").slice(0, 500),
    rawText: text,
  };
}
