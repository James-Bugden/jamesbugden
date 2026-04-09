/**
 * Maps Google Font CSS families to PDF-safe built-in fonts.
 * @react-pdf/renderer ships with Helvetica, Times-Roman, Courier by default.
 * We map user-chosen fonts to the closest built-in family for reliable export.
 */

const SANS_MAP: Record<string, string> = {
  "Source Sans 3": "Helvetica",
  "Karla": "Helvetica",
  "Mulish": "Helvetica",
  "Lato": "Helvetica",
  "Titillium Web": "Helvetica",
  "Work Sans": "Helvetica",
  "Barlow": "Helvetica",
  "Jost": "Helvetica",
  "Fira Sans": "Helvetica",
  "Roboto": "Helvetica",
  "Rubik": "Helvetica",
  "Asap": "Helvetica",
  "Nunito": "Helvetica",
  "Open Sans": "Helvetica",
  "IBM Plex Sans": "Helvetica",
};

const SERIF_MAP: Record<string, string> = {
  "Merriweather": "Times-Roman",
  "Playfair Display": "Times-Roman",
  "Lora": "Times-Roman",
  "PT Serif": "Times-Roman",
  "Libre Baskerville": "Times-Roman",
  "Crimson Text": "Times-Roman",
  "EB Garamond": "Times-Roman",
  "Source Serif 4": "Times-Roman",
};

const MONO_MAP: Record<string, string> = {
  "Fira Code": "Courier",
  "JetBrains Mono": "Courier",
  "IBM Plex Mono": "Courier",
  "Source Code Pro": "Courier",
};

const ALL_MAP = { ...SANS_MAP, ...SERIF_MAP, ...MONO_MAP };

/** CJK font family name used by react-pdf when Chinese characters are detected */
export const CJK_FONT_FAMILY = "Noto Sans TC";

/** Detect whether a string contains CJK (Chinese/Japanese/Korean) characters */
export function containsCJK(text: string): boolean {
  return /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/.test(text);
}

/**
 * Scan all text fields in resume data and return true if any contain CJK.
 */
export function resumeHasCJK(data: {
  personalDetails?: { fullName?: string; professionalTitle?: string; location?: string; extras?: { value?: string }[] };
  sections?: { entries?: { fields?: Record<string, string> }[] }[];
}): boolean {
  const texts: string[] = [];
  const pd = data?.personalDetails;
  if (pd?.fullName) texts.push(pd.fullName);
  if (pd?.professionalTitle) texts.push(pd.professionalTitle);
  if (pd?.location) texts.push(pd.location);
  for (const ex of pd?.extras || []) {
    if (ex.value) texts.push(ex.value);
  }
  for (const sec of data?.sections || []) {
    for (const entry of sec.entries || []) {
      for (const v of Object.values(entry.fields || {})) {
        if (v) texts.push(v);
      }
    }
  }
  return texts.some(containsCJK);
}

/**
 * Convert a CSS font-family string like "'Lora', serif" to a PDF-safe font name.
 */
export function toPdfFont(cssFamily: string): string {
  // Extract the first quoted font name
  const match = cssFamily.match(/['"]([^'"]+)['"]/);
  const name = match ? match[1] : cssFamily.split(",")[0].trim().replace(/['"]/g, "");
  return ALL_MAP[name] || "Helvetica";
}

/**
 * Get the bold variant name for a PDF built-in font.
 */
export function toPdfFontBold(pdfFont: string): string {
  if (pdfFont === "Times-Roman") return "Times-Bold";
  if (pdfFont === "Courier") return "Courier-Bold";
  return "Helvetica-Bold";
}

/**
 * Get the italic variant name for a PDF built-in font.
 */
export function toPdfFontItalic(pdfFont: string): string {
  if (pdfFont === "Times-Roman") return "Times-Italic";
  if (pdfFont === "Courier") return "Courier-Oblique";
  return "Helvetica-Oblique";
}
