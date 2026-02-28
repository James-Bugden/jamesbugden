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
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

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

  // ── Traditional Chinese / Simplified Chinese ──
  // experience
  "工作經歷": "experience",
  "工作经历": "experience",
  "工作經驗": "experience",
  "工作经验": "experience",
  "專業經歷": "experience",
  "专业经历": "experience",
  "職業經歷": "experience",
  "职业经历": "experience",
  "實習經歷": "experience",
  "实习经历": "experience",
  "經歷": "experience",
  "经历": "experience",
  // education
  "學歷": "education",
  "学历": "education",
  "教育背景": "education",
  "教育經歷": "education",
  "教育经历": "education",
  "學術背景": "education",
  "学术背景": "education",
  // skills
  "技能": "skills",
  "專業技能": "skills",
  "专业技能": "skills",
  "核心能力": "skills",
  "技術能力": "skills",
  "技术能力": "skills",
  "技能專長": "skills",
  "技能专长": "skills",
  // summary
  "自我介紹": "summary",
  "自我介绍": "summary",
  "個人簡介": "summary",
  "个人简介": "summary",
  "個人摘要": "summary",
  "个人摘要": "summary",
  "簡介": "summary",
  "简介": "summary",
  "求職目標": "summary",
  "求职目标": "summary",
  // projects
  "專案經歷": "projects",
  "专案经历": "projects",
  "項目經歷": "projects",
  "项目经历": "projects",
  "專案": "projects",
  "项目": "projects",
  // languages
  "語言能力": "languages",
  "语言能力": "languages",
  "語言": "languages",
  "语言": "languages",
  // certifications
  "證照": "certifications",
  "证照": "certifications",
  "認證": "certifications",
  "认证": "certifications",
  "證書": "certifications",
  "证书": "certifications",
  "執照與認證": "certifications",
  // awards
  "獎項": "awards",
  "奖项": "awards",
  "榮譽": "awards",
  "荣誉": "awards",
  "獲獎經歷": "awards",
  "获奖经历": "awards",
  // volunteering
  "志工經歷": "volunteering",
  "志愿者经历": "volunteering",
  "志願服務": "volunteering",
  "社會服務": "volunteering",
  // publications
  "著作": "publications",
  "發表": "publications",
  "研究": "publications",
  // interests
  "興趣": "interests",
  "兴趣": "interests",
  "嗜好": "interests",
  // references
  "推薦人": "references",
  "推荐人": "references",
};

function detectSectionType(headerText: string): string | null {
  // Try English match first
  const cleanEn = headerText.toLowerCase().replace(/[^a-z\s&]/g, "").trim();
  if (cleanEn && SECTION_HEADER_MAP[cleanEn]) return SECTION_HEADER_MAP[cleanEn];

  // Try Chinese match (strip whitespace and common punctuation)
  const cleanZh = headerText.replace(/[\s:：\-–—·•|]/g, "").trim();
  if (SECTION_HEADER_MAP[cleanZh]) return SECTION_HEADER_MAP[cleanZh];

  return null;
}

function isSectionHeader(line: string, allLines: string[], idx: number): boolean {
  if (detectSectionType(line) !== null) return true;

  const clean = line.replace(/[^a-zA-Z\s&]/g, "").trim();
  // English heuristics
  if (clean.length > 0 && clean.length <= 50) {
    const words = clean.split(/\s+/);
    if (words.length <= 5) {
      const isAllCaps = clean === clean.toUpperCase() && clean.length > 2;
      if (isAllCaps) return true;
    }
  }

  // Chinese heuristic: short line (<=8 chars) with CJK characters and no long content
  const cjkOnly = line.replace(/[\s:：\-–—·•|]/g, "");
  const hasCJK = /[\u4e00-\u9fff]/.test(cjkOnly);
  if (hasCJK && cjkOnly.length <= 8 && cjkOnly.length >= 2) return true;

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

/** Detect location patterns like "San Francisco, CA", "New York, NY", "London, UK", "Taipei, Taiwan", "Remote" */
const LOCATION_PATTERN = /(?:^|[|,·•–—])\s*([A-Z][a-zA-Z\s.'-]+,\s*[A-Z]{2,}(?:\s+\d{5})?)\s*(?:$|[|,·•–—])/;
const LOCATION_STANDALONE = /^(?:Remote|Hybrid|On-?site|[A-Z][a-zA-Z\s.'-]+,\s*(?:[A-Z]{2,}|[A-Z][a-zA-Z]+))$/;

const COMMON_CITIES = [
  "New York", "Los Angeles", "San Francisco", "Chicago", "Seattle", "Austin", "Boston",
  "London", "Paris", "Berlin", "Tokyo", "Singapore", "Hong Kong", "Sydney", "Melbourne",
  "Toronto", "Vancouver", "Dubai", "Mumbai", "Bangalore", "Shanghai", "Beijing",
  "Taipei", "Seoul", "Amsterdam", "Stockholm", "Zurich", "Dublin", "Barcelona",
  "São Paulo", "Mexico City", "Jakarta", "Bangkok", "Ho Chi Minh City",
  "Remote", "Hybrid",
];

function extractLocation(text: string): string | null {
  // Check for "City, STATE" pattern
  const locMatch = text.match(LOCATION_PATTERN);
  if (locMatch) return locMatch[1].trim();

  // Check standalone location
  if (LOCATION_STANDALONE.test(text.trim())) return text.trim();

  // Check for known city names
  for (const city of COMMON_CITIES) {
    if (text.includes(city)) {
      // Try to grab "City, XX" substring
      const cityIdx = text.indexOf(city);
      const afterCity = text.slice(cityIdx);
      const fullMatch = afterCity.match(/^([A-Z][a-zA-Z\s.'-]+,\s*[A-Z][a-zA-Z]+)/);
      if (fullMatch) return fullMatch[1].trim();
      return city;
    }
  }

  return null;
}

/** Parse experience/education entries from lines */
function parseEntries(lines: string[], isExperience: boolean) {
  const entries: any[] = [];
  let currentEntry: { title: string; org: string; date: string; location: string; bullets: string[] } | null = null;

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
      const location = extractLocation(textWithoutDate);
      const textWithoutLocation = location
        ? textWithoutDate.replace(location, "").replace(/[|,·•\-–—]\s*$/, "").trim()
        : textWithoutDate;
      const parts = textWithoutLocation.split(/[|,·•–—]/).map((p) => p.trim()).filter(Boolean);

      currentEntry = {
        title: parts[0] || line,
        org: parts[1] || "",
        date: dateStr,
        location: location || "",
        bullets: [],
      };
    } else if (isBullet && currentEntry) {
      currentEntry.bullets.push(line.replace(/^[•\-\*·▪▸►→]\s*/, "").trim());
    } else if (currentEntry) {
      // Continuation line — might be location, org, or bullet
      if (currentEntry.bullets.length === 0 && !currentEntry.location && LOCATION_STANDALONE.test(line.trim())) {
        currentEntry.location = line.trim();
      } else if (currentEntry.bullets.length === 0 && !currentEntry.org && line.length < 60) {
        // Check if this line contains a location
        const loc = extractLocation(line);
        if (loc && !currentEntry.location) {
          currentEntry.org = line.replace(loc, "").replace(/[|,·•\-–—]\s*$/, "").trim();
          currentEntry.location = loc;
        } else {
          currentEntry.org = line;
        }
      } else {
        currentEntry.bullets.push(line);
      }
    } else {
      // Orphan line before first entry
      currentEntry = { title: line, org: "", date: "", location: "", bullets: [] };
    }
  }

  if (currentEntry) entries.push(formatEntry(currentEntry, isExperience));

  return entries.length > 0
    ? entries
    : [{ id: crypto.randomUUID(), fields: { description: `<p>${lines.join("<br/>")}</p>` } }];
}

function formatEntry(entry: { title: string; org: string; date: string; location: string; bullets: string[] }, isExperience: boolean) {
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
      location: entry.location,
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
