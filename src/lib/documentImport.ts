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
    // Group items by Y coordinate to preserve line structure
    const items = content.items as any[];
    const lines = new Map<number, { x: number; str: string }[]>();

    for (const item of items) {
      if (!item.str) continue;
      // Round Y to group items on the same line (tolerance ~2px)
      const y = Math.round(item.transform[5] / 2) * 2;
      if (!lines.has(y)) lines.set(y, []);
      lines.get(y)!.push({ x: item.transform[4], str: item.str });
    }

    // Sort by Y descending (PDF coords: bottom=0), then X ascending within each line
    const sortedYs = [...lines.keys()].sort((a, b) => b - a);
    const pageLines: string[] = [];
    for (const y of sortedYs) {
      const lineItems = lines.get(y)!.sort((a, b) => a.x - b.x);
      const lineText = lineItems.map((i) => i.str).join(" ").trim();
      if (lineText) pageLines.push(lineText);
    }
    pages.push(pageLines.join("\n"));
  }

  return pages.join("\n\n");
}

/* ── Section detection ──────────────────────────────────── */

const SECTION_HEADER_MAP: Record<string, string> = {
  // experience
  "experience": "experience",
  "work experience": "experience",
  "professional experience": "experience",
  "work history": "experience",
  "employment history": "experience",
  "employment": "experience",
  "career history": "experience",
  // education
  "education": "education",
  "academic background": "education",
  "academic history": "education",
  "qualifications": "education",
  // skills
  "skills": "skills",
  "technical skills": "skills",
  "core competencies": "skills",
  "competencies": "skills",
  "expertise": "skills",
  "proficiencies": "skills",
  "areas of expertise": "skills",
  // summary
  "summary": "summary",
  "professional summary": "summary",
  "profile": "summary",
  "about me": "summary",
  "about": "summary",
  "objective": "summary",
  "career objective": "summary",
  // projects
  "projects": "projects",
  "personal projects": "projects",
  "key projects": "projects",
  // languages
  "languages": "languages",
  // certifications
  "certifications": "certifications",
  "certificates": "certifications",
  "licenses": "certifications",
  "licenses & certifications": "certifications",
  // awards
  "awards": "awards",
  "honors": "awards",
  "achievements": "awards",
  "awards & honors": "awards",
  // volunteering
  "volunteering": "volunteering",
  "volunteer experience": "volunteering",
  "community involvement": "volunteering",
  // publications
  "publications": "publications",
  "research": "publications",
  // interests
  "interests": "interests",
  "hobbies": "interests",
  // references
  "references": "references",
};

function detectSectionType(headerText: string): string | null {
  const clean = headerText.toLowerCase().replace(/[^a-z\s&]/g, "").trim();
  return SECTION_HEADER_MAP[clean] || null;
}

function isSectionHeader(line: string, allLines: string[], idx: number): boolean {
  const clean = line.replace(/[^a-zA-Z\s&]/g, "").trim();
  if (clean.length === 0 || clean.length > 50) return false;
  if (detectSectionType(line) !== null) return true;
  // Heuristic: short line (<=4 words), all-caps or title-case, followed by longer content
  const words = clean.split(/\s+/);
  if (words.length > 5) return false;
  const isAllCaps = clean === clean.toUpperCase() && clean.length > 2;
  if (isAllCaps) return true;
  return false;
}

interface ParsedSection {
  type: string;
  title: string;
  lines: string[];
}

/** Parse raw resume text into structured sections */
export function mapTextToResumeSections(text: string) {
  const rawLines = text.split("\n").map((l) => l.trim());
  const lines = rawLines.filter(Boolean);

  if (lines.length === 0) {
    return { fullName: "", email: "", phone: "", summary: "", sections: [], rawText: text };
  }

  // Extract contact info
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = text.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w.]+(?:\/[\w-]*)?/i);

  // Name is typically the first line
  const fullName = lines[0] || "";

  // Find where sections start by scanning for headers
  const sectionBreaks: { idx: number; type: string; title: string }[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (isSectionHeader(lines[i], lines, i)) {
      const type = detectSectionType(lines[i]) || "custom";
      sectionBreaks.push({ idx: i, type, title: lines[i] });
    }
  }

  // Collect contact/header lines (everything before first section)
  const firstSectionIdx = sectionBreaks.length > 0 ? sectionBreaks[0].idx : lines.length;
  const headerLines = lines.slice(1, firstSectionIdx);

  // Filter out contact info from header to get potential summary
  const contactPatterns = [emailMatch?.[0], phoneMatch?.[0], linkedinMatch?.[0]].filter(Boolean);
  const nonContactHeader = headerLines.filter(
    (l) => !contactPatterns.some((p) => p && l.includes(p)) && l.length > 20
  );

  // Build sections
  const sections: ParsedSection[] = [];

  for (let s = 0; s < sectionBreaks.length; s++) {
    const start = sectionBreaks[s].idx + 1;
    const end = s + 1 < sectionBreaks.length ? sectionBreaks[s + 1].idx : lines.length;
    const sectionLines = lines.slice(start, end).filter(Boolean);
    sections.push({
      type: sectionBreaks[s].type,
      title: toTitleCase(sectionBreaks[s].title),
      lines: sectionLines,
    });
  }

  // If no summary section was found but we have header text, create one
  const hasSummarySection = sections.some((s) => s.type === "summary");
  if (!hasSummarySection && nonContactHeader.length > 0) {
    sections.unshift({
      type: "summary",
      title: "Summary",
      lines: nonContactHeader,
    });
  }

  // Convert parsed sections to resume builder format
  const resumeSections = sections.map((section) => {
    return buildResumeSection(section);
  });

  return {
    fullName,
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    linkedin: linkedinMatch?.[0] || "",
    website: websiteMatch?.[0] || "",
    summary: nonContactHeader.join(" ").slice(0, 500),
    sections: resumeSections,
    rawText: text,
  };
}

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Build a resume section object from parsed lines */
function buildResumeSection(section: ParsedSection) {
  const id = crypto.randomUUID();

  switch (section.type) {
    case "summary":
      return {
        id,
        type: "summary",
        title: section.title,
        entries: [
          {
            id: crypto.randomUUID(),
            fields: { description: `<p>${section.lines.join(" ")}</p>` },
          },
        ],
        collapsed: false,
      };

    case "experience":
    case "volunteering":
      return {
        id,
        type: section.type === "volunteering" ? "experience" : "experience",
        title: section.title,
        entries: parseEntries(section.lines, true),
        collapsed: false,
      };

    case "education":
      return {
        id,
        type: "education",
        title: section.title,
        entries: parseEntries(section.lines, false),
        collapsed: false,
      };

    case "projects":
      return {
        id,
        type: "projects",
        title: section.title,
        entries: parseEntries(section.lines, false),
        collapsed: false,
      };

    case "skills":
    case "languages":
    case "interests":
      return {
        id,
        type: "skills",
        title: section.title,
        entries: [
          {
            id: crypto.randomUUID(),
            fields: { description: `<p>${section.lines.join(", ")}</p>` },
          },
        ],
        collapsed: false,
      };

    case "certifications":
    case "awards":
    case "publications":
      return {
        id,
        type: "certifications",
        title: section.title,
        entries: parseSimpleEntries(section.lines),
        collapsed: false,
      };

    default:
      return {
        id,
        type: "custom",
        title: section.title,
        entries: [
          {
            id: crypto.randomUUID(),
            fields: { description: `<p>${section.lines.join("<br/>")}</p>` },
          },
        ],
        collapsed: false,
      };
  }
}

/** Detect date patterns like "Jan 2020 - Present", "2019 – 2021", "2020-Present" */
const DATE_PATTERN = /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\.?\s*)?(?:19|20)\d{2}\s*[-–—to]+\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\.?\s*)?(?:(?:19|20)\d{2}|[Pp]resent|[Cc]urrent)/i;
const SINGLE_DATE = /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\.?\s+)?(?:19|20)\d{2}/i;

/** Parse experience/education entries from lines */
function parseEntries(lines: string[], isExperience: boolean) {
  const entries: any[] = [];
  let currentEntry: { title: string; org: string; date: string; bullets: string[] } | null = null;

  for (const line of lines) {
    const dateMatch = line.match(DATE_PATTERN) || line.match(SINGLE_DATE);
    const isBullet = /^[•\-\*·▪▸►→]/.test(line.trim());

    if (!isBullet && (dateMatch || (!currentEntry && line.length < 80))) {
      // New entry: push previous
      if (currentEntry) {
        entries.push(formatEntry(currentEntry, isExperience));
      }

      const dateStr = dateMatch?.[0] || "";
      const textWithoutDate = line.replace(dateStr, "").replace(/[|,·•\-–—]\s*$/, "").trim();
      const parts = textWithoutDate.split(/[|,·•–—]/).map((p) => p.trim()).filter(Boolean);

      currentEntry = {
        title: parts[0] || line,
        org: parts[1] || "",
        date: dateStr,
        bullets: [],
      };
    } else if (isBullet && currentEntry) {
      currentEntry.bullets.push(line.replace(/^[•\-\*·▪▸►→]\s*/, "").trim());
    } else if (currentEntry) {
      // Continuation line — might be org or bullet
      if (currentEntry.bullets.length === 0 && !currentEntry.org && line.length < 60) {
        currentEntry.org = line;
      } else {
        currentEntry.bullets.push(line);
      }
    } else {
      // Orphan line before first entry
      currentEntry = { title: line, org: "", date: "", bullets: [] };
    }
  }

  if (currentEntry) entries.push(formatEntry(currentEntry, isExperience));

  return entries.length > 0
    ? entries
    : [{ id: crypto.randomUUID(), fields: { description: `<p>${lines.join("<br/>")}</p>` } }];
}

function formatEntry(entry: { title: string; org: string; date: string; bullets: string[] }, isExperience: boolean) {
  const bulletHtml = entry.bullets.length > 0
    ? `<ul>${entry.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
    : "";

  return {
    id: crypto.randomUUID(),
    fields: {
      ...(isExperience
        ? { jobTitle: entry.title, company: entry.org }
        : { degree: entry.title, school: entry.org }),
      date: entry.date,
      description: bulletHtml,
    },
  };
}

/** Simple list entries for certifications/awards */
function parseSimpleEntries(lines: string[]) {
  return lines.map((line) => ({
    id: crypto.randomUUID(),
    fields: { name: line, description: "" },
  }));
}
