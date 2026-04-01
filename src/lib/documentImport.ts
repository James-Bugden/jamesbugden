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
  pdfjsLib.GlobalWorkerOptions.workerSrc = "";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const items = content.items as any[];
    const lines = new Map<number, { x: number; str: string }[]>();

    for (const item of items) {
      if (!item.str) continue;
      const y = Math.round(item.transform[5] / 2) * 2;
      if (!lines.has(y)) lines.set(y, []);
      lines.get(y)!.push({ x: item.transform[4], str: item.str });
    }

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

/* ════════════════════════════════════════════════════════════
   Section detection — header keywords
   ════════════════════════════════════════════════════════════ */

const SECTION_HEADER_MAP: Record<string, string> = {
  // experience
  "experience": "experience", "work experience": "experience", "professional experience": "experience",
  "work history": "experience", "employment history": "experience", "employment": "experience",
  "career history": "experience",
  // education
  "education": "education", "academic background": "education", "academic history": "education",
  "qualifications": "education",
  // skills
  "skills": "skills", "technical skills": "skills", "core competencies": "skills",
  "competencies": "skills", "expertise": "skills", "proficiencies": "skills",
  "areas of expertise": "skills", "key skills": "skills", "hard skills": "skills",
  "soft skills": "skills",
  // summary
  "summary": "summary", "professional summary": "summary", "profile": "summary",
  "about me": "summary", "about": "summary", "objective": "summary",
  "career objective": "summary", "professional profile": "summary", "executive summary": "summary",
  // projects
  "projects": "projects", "personal projects": "projects", "key projects": "projects",
  "side projects": "projects",
  // languages
  "languages": "languages", "language skills": "languages",
  // certifications
  "certifications": "certificates", "certificates": "certificates", "licenses": "certificates",
  "licenses & certifications": "certificates", "licenses and certifications": "certificates",
  "professional certifications": "certificates",
  // awards
  "awards": "awards", "honors": "awards", "achievements": "awards",
  "awards & honors": "awards", "awards and honors": "awards",
  // volunteering / organisations
  "volunteering": "organisations", "volunteer experience": "organisations",
  "community involvement": "organisations", "organizations": "organisations",
  "organisations": "organisations", "memberships": "organisations",
  // publications
  "publications": "publications", "research": "publications",
  // interests
  "interests": "interests", "hobbies": "interests", "hobbies & interests": "interests",
  "hobbies and interests": "interests",
  // references
  "references": "references",
  // courses
  "courses": "courses", "training": "courses", "professional development": "courses",
  // declaration
  "declaration": "declaration",

  // ── Traditional Chinese / Simplified Chinese ──
  "工作經歷": "experience", "工作经历": "experience", "工作經驗": "experience", "工作经验": "experience",
  "專業經歷": "experience", "专业经历": "experience", "職業經歷": "experience", "职业经历": "experience",
  "實習經歷": "experience", "实习经历": "experience", "經歷": "experience", "经历": "experience",
  "學歷": "education", "学历": "education", "教育背景": "education",
  "教育經歷": "education", "教育经历": "education", "學術背景": "education", "学术背景": "education",
  "技能": "skills", "專業技能": "skills", "专业技能": "skills",
  "核心能力": "skills", "技術能力": "skills", "技术能力": "skills",
  "技能專長": "skills", "技能专长": "skills",
  "自我介紹": "summary", "自我介绍": "summary", "個人簡介": "summary", "个人简介": "summary",
  "個人摘要": "summary", "个人摘要": "summary", "簡介": "summary", "简介": "summary",
  "求職目標": "summary", "求职目标": "summary",
  "專案經歷": "projects", "专案经历": "projects", "項目經歷": "projects", "项目经历": "projects",
  "專案": "projects", "项目": "projects",
  "語言能力": "languages", "语言能力": "languages", "語言": "languages", "语言": "languages",
  "證照": "certificates", "证照": "certificates", "認證": "certificates", "认证": "certificates",
  "證書": "certificates", "证书": "certificates", "執照與認證": "certificates",
  "獎項": "awards", "奖项": "awards", "榮譽": "awards", "荣誉": "awards",
  "獲獎經歷": "awards", "获奖经历": "awards",
  "志工經歷": "organisations", "志愿者经历": "organisations", "志願服務": "organisations", "社會服務": "organisations",
  "著作": "publications", "發表": "publications", "研究": "publications",
  "興趣": "interests", "兴趣": "interests", "嗜好": "interests",
  "推薦人": "references", "推荐人": "references",
};

function normalizeHeaderText(raw: string): string {
  // Fix OCR-broken spacing: "W ORK" → "WORK", "E XPERIENCE" → "EXPERIENCE"
  // Detect pattern: single uppercase letter followed by space then uppercase letters
  let fixed = raw.replace(/\b([A-Z])\s+([A-Z]{2,})\b/g, "$1$2");
  // Remove continuation markers: "(Cont.)", "(continued)", etc.
  fixed = fixed.replace(/\s*\(cont\.?\)/gi, "").replace(/\s*\(continued\)/gi, "").trim();
  return fixed;
}

function detectSectionType(headerText: string): string | null {
  const normalized = normalizeHeaderText(headerText);
  const cleanEn = normalized.toLowerCase().replace(/[^a-z\s&]/g, "").trim();
  if (cleanEn && SECTION_HEADER_MAP[cleanEn]) return SECTION_HEADER_MAP[cleanEn];
  const cleanZh = normalized.replace(/[\s:：\-–—·•|]/g, "").trim();
  if (SECTION_HEADER_MAP[cleanZh]) return SECTION_HEADER_MAP[cleanZh];
  return null;
}

function isSectionHeader(line: string, allLines: string[], idx: number): boolean {
  // Exact keyword match always wins
  if (detectSectionType(line) !== null) return true;

  const clean = line.replace(/[^a-zA-Z\s&]/g, "").trim();
  if (clean.length > 0 && clean.length <= 50) {
    const words = clean.split(/\s+/);
    if (words.length <= 5) {
      const isAllCaps = clean === clean.toUpperCase() && clean.length > 2;
      if (isAllCaps) {
        // Reject short acronyms (1 word, ≤3 chars) — likely company names like "IBM", "SAP"
        if (words.length === 1 && clean.length <= 3) return false;

        // Reject if it looks like a company or job title
        if (COMPANY_INDICATORS.test(line) || TITLE_INDICATORS.test(line)) return false;

        // Contextual: if next line is also a short non-bullet line, this is likely a title/company pair, not a header
        const nextLine = idx + 1 < allLines.length ? allLines[idx + 1] : "";
        const nextIsBullet = /^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]/.test(nextLine.trim());
        const nextHasDate = extractDateRange(nextLine) !== null;
        if (nextLine && !nextIsBullet && !nextHasDate && nextLine.length < 80 && nextLine.length > 2) {
          // Next line looks like a companion line (company/title pair) — not a section header
          return false;
        }

        // ALL CAPS + next line has a date = almost certainly a company name (e.g. "UBER" → "Senior Recruiter 2024 – Present")
        if (nextHasDate) return false;

        return true;
      }
    }
  }
  const cjkOnly = line.replace(/[\s:：\-–—·•|]/g, "");
  const hasCJK = /[\u4e00-\u9fff]/.test(cjkOnly);
  if (hasCJK && cjkOnly.length <= 8 && cjkOnly.length >= 2) return true;
  return false;
}

/* ════════════════════════════════════════════════════════════
   Date extraction
   ════════════════════════════════════════════════════════════ */

const MONTH_NAMES = "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
const DATE_RANGE = new RegExp(
  `(?:${MONTH_NAMES}\\.?\\s*)?(?:19|20)\\d{2}\\s*[-–—to]+\\s*(?:${MONTH_NAMES}\\.?\\s*)?(?:(?:19|20)\\d{2}|[Pp]resent|[Cc]urrent|[Oo]ngoing|[Nn]ow)`,
  "i"
);
const SINGLE_DATE = new RegExp(`(?:${MONTH_NAMES}\\.?\\s+)?(?:19|20)\\d{2}`, "i");

function extractDateRange(text: string): { dateStr: string; startMonth: string; startYear: string; endMonth: string; endYear: string; currentlyHere: string } | null {
  const match = text.match(DATE_RANGE) || text.match(SINGLE_DATE);
  if (!match) return null;

  const raw = match[0];
  const months: Record<string, string> = {
    jan: "January", feb: "February", mar: "March", apr: "April", may: "May", jun: "June",
    jul: "July", aug: "August", sep: "September", oct: "October", nov: "November", dec: "December",
  };

  const parts = raw.split(/[-–—]|to/i).map((p) => p.trim());
  const parseMonthYear = (s: string) => {
    const monthMatch = s.match(new RegExp(MONTH_NAMES, "i"));
    const yearMatch = s.match(/(19|20)\d{2}/);
    const monthKey = monthMatch?.[0]?.slice(0, 3).toLowerCase();
    return {
      month: monthKey && months[monthKey] ? months[monthKey] : "",
      year: yearMatch?.[0] || "",
    };
  };

  const start = parseMonthYear(parts[0] || "");
  const isPresent = /present|current|ongoing|now/i.test(parts[1] || "");
  const end = isPresent ? { month: "", year: "" } : parseMonthYear(parts[1] || "");

  return {
    dateStr: raw,
    startMonth: start.month,
    startYear: start.year,
    endMonth: end.month,
    endYear: end.year,
    currentlyHere: isPresent ? "true" : "",
  };
}

/* ════════════════════════════════════════════════════════════
   Location extraction
   ════════════════════════════════════════════════════════════ */

const COMMON_CITIES = [
  "New York", "Los Angeles", "San Francisco", "Chicago", "Seattle", "Austin", "Boston",
  "London", "Paris", "Berlin", "Tokyo", "Singapore", "Hong Kong", "Sydney", "Melbourne",
  "Toronto", "Vancouver", "Dubai", "Mumbai", "Bangalore", "Shanghai", "Beijing",
  "Taipei", "Seoul", "Amsterdam", "Stockholm", "Zurich", "Dublin", "Barcelona",
  "São Paulo", "Mexico City", "Jakarta", "Bangkok", "Ho Chi Minh City",
  "Remote", "Hybrid",
];

const LOCATION_PATTERN = /(?:^|[|,·•–—])\s*([A-Z][a-zA-Z\s.'-]+,\s*[A-Z]{2,}(?:\s+\d{5})?)\s*(?:$|[|,·•–—])/;
const LOCATION_STANDALONE = /^(?:Remote|Hybrid|On-?site|[A-Z][a-zA-Z\s.'-]+,\s*(?:[A-Z]{2,}|[A-Z][a-zA-Z]+))$/;

function extractLocation(text: string): string | null {
  const locMatch = text.match(LOCATION_PATTERN);
  if (locMatch) return locMatch[1].trim();
  if (LOCATION_STANDALONE.test(text.trim())) return text.trim();
  for (const city of COMMON_CITIES) {
    if (text.includes(city)) {
      const cityIdx = text.indexOf(city);
      const afterCity = text.slice(cityIdx);
      const fullMatch = afterCity.match(/^([A-Z][a-zA-Z\s.'-]+,\s*[A-Z][a-zA-Z]+)/);
      if (fullMatch) return fullMatch[1].trim();
      return city;
    }
  }
  return null;
}

/* ════════════════════════════════════════════════════════════
   Contact extraction (improved)
   ════════════════════════════════════════════════════════════ */

function extractContactInfo(text: string, headerLines: string[]) {
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = text.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}/);
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w][\w -]*[\w]/i);
  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)(?!linkedin)[\w-]+\.[\w.]+(?:\/[\w-]*)?/i);

  // Clean URLs — remove any spaces that may have been introduced by PDF extraction
  const cleanUrl = (url: string | undefined) => url ? url.replace(/\s+/g, "") : "";

  // Try to extract location from header lines
  let location = "";
  for (const line of headerLines) {
    const loc = extractLocation(line);
    if (loc) { location = loc; break; }
  }

  // Try extracting professional title from line 2 if it's not contact info
  let professionalTitle = "";
  const contactPatterns = [emailMatch?.[0], phoneMatch?.[0], linkedinMatch?.[0], websiteMatch?.[0]].filter(Boolean);
  if (headerLines.length > 0) {
    const firstHeader = headerLines[0];
    const isContact = contactPatterns.some((p) => p && firstHeader.includes(p));
    const isLoc = firstHeader === location;
    if (!isContact && !isLoc && firstHeader.length < 60 && firstHeader.length > 2) {
      professionalTitle = firstHeader;
    }
  }

  return {
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    linkedin: cleanUrl(linkedinMatch?.[0]),
    website: cleanUrl(websiteMatch?.[0]),
    location,
    professionalTitle,
  };
}

/* ════════════════════════════════════════════════════════════
   Main parsing function
   ════════════════════════════════════════════════════════════ */

interface ParsedSection {
  type: string;
  title: string;
  lines: string[];
}

export function mapTextToResumeSections(text: string) {
  const rawLines = text.split("\n").map((l) => l.trim());
  const lines = rawLines.filter(Boolean);

  if (lines.length === 0) {
    return { fullName: "", professionalTitle: "", email: "", phone: "", location: "", linkedin: "", website: "", sections: [], rawText: text };
  }

  const fullName = lines[0] || "";

  // Find section breaks
  const sectionBreaks: { idx: number; type: string; title: string }[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (isSectionHeader(lines[i], lines, i)) {
      const type = detectSectionType(lines[i]) || "custom";
      sectionBreaks.push({ idx: i, type, title: lines[i] });
    }
  }

  const firstSectionIdx = sectionBreaks.length > 0 ? sectionBreaks[0].idx : lines.length;
  const headerLines = lines.slice(1, firstSectionIdx);

  const contact = extractContactInfo(text, headerLines);

  // Non-contact header lines for potential summary
  const contactPatterns = [contact.email, contact.phone, contact.linkedin, contact.website, contact.location, contact.professionalTitle].filter(Boolean);
  const nonContactHeader = headerLines.filter(
    (l) => !contactPatterns.some((p) => p && l.includes(p)) && l.length > 20
  );

  // Build parsed sections — merge duplicates (e.g. "Experience" + "Experience (Cont.)")
  const sectionsRaw: ParsedSection[] = [];
  for (let s = 0; s < sectionBreaks.length; s++) {
    const start = sectionBreaks[s].idx + 1;
    const end = s + 1 < sectionBreaks.length ? sectionBreaks[s + 1].idx : lines.length;
    const sectionLines = lines.slice(start, end).filter(Boolean);
    if (sectionLines.length > 0) {
      sectionsRaw.push({
        type: sectionBreaks[s].type,
        title: toTitleCase(normalizeHeaderText(sectionBreaks[s].title)),
        lines: sectionLines,
      });
    }
  }

  // Merge sections with the same type (handles "(Cont.)" splits)
  const sections: ParsedSection[] = [];
  const sectionTypeMap = new Map<string, number>();
  for (const sec of sectionsRaw) {
    const existingIdx = sectionTypeMap.get(sec.type);
    if (existingIdx !== undefined) {
      // Append lines to existing section of same type
      sections[existingIdx].lines.push(...sec.lines);
    } else {
      sectionTypeMap.set(sec.type, sections.length);
      sections.push(sec);
    }
  }

  // Auto-create summary from leftover header text
  if (!sections.some((s) => s.type === "summary") && nonContactHeader.length > 0) {
    sections.unshift({ type: "summary", title: "Summary", lines: nonContactHeader });
  }

  // Reorder: summary → skills → experience → education → rest
  const preferredOrder = ["summary", "skills", "experience", "education"];
  sections.sort((a, b) => {
    const ia = preferredOrder.indexOf(a.type);
    const ib = preferredOrder.indexOf(b.type);
    const oa = ia === -1 ? preferredOrder.length : ia;
    const ob = ib === -1 ? preferredOrder.length : ib;
    return oa - ob;
  });

  // Convert to resume builder sections
  const resumeSections = sections.map(buildResumeSection);

  return {
    fullName,
    professionalTitle: contact.professionalTitle,
    email: contact.email,
    phone: contact.phone,
    location: contact.location,
    linkedin: contact.linkedin,
    website: contact.website,
    sections: resumeSections,
    rawText: text,
  };
}

function toTitleCase(str: string): string {
  // Don't title-case CJK strings
  if (/[\u4e00-\u9fff]/.test(str)) return str;
  return str.toLowerCase().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ════════════════════════════════════════════════════════════
   Build resume sections (mapped to correct field names from types.ts)
   ════════════════════════════════════════════════════════════ */

function buildResumeSection(section: ParsedSection) {
  const id = crypto.randomUUID();

  switch (section.type) {
    case "summary":
      return {
        id,
        type: "summary",
        title: section.title,
        entries: [{ id: crypto.randomUUID(), fields: { description: `<p>${section.lines.join(" ")}</p>` } }],
        collapsed: false,
        showHeading: true,
      };

    case "experience":
      return {
        id,
        type: "experience",
        title: section.title,
        entries: parseExperienceEntries(section.lines),
        collapsed: false,
      };

    case "education":
      return {
        id,
        type: "education",
        title: section.title,
        entries: parseEducationEntries(section.lines),
        collapsed: false,
      };

    case "projects":
      return {
        id,
        type: "projects",
        title: section.title,
        entries: parseProjectEntries(section.lines),
        collapsed: false,
      };

    case "skills":
      return {
        id,
        type: "skills",
        title: section.title,
        entries: [{ id: crypto.randomUUID(), fields: { skills: parseSkillsList(section.lines) } }],
        collapsed: false,
      };

    case "languages":
      return {
        id,
        type: "languages",
        title: section.title,
        entries: parseLanguageEntries(section.lines),
        collapsed: false,
      };

    case "interests":
      return {
        id,
        type: "interests",
        title: section.title,
        entries: [{ id: crypto.randomUUID(), fields: { interests: parseSkillsList(section.lines) } }],
        collapsed: false,
      };

    case "certificates":
      return {
        id,
        type: "certificates",
        title: section.title,
        entries: parseSimpleEntries(section.lines, "certificates"),
        collapsed: false,
      };

    case "awards":
      return {
        id,
        type: "awards",
        title: section.title,
        entries: parseSimpleEntries(section.lines, "awards"),
        collapsed: false,
      };

    case "publications":
      return {
        id,
        type: "publications",
        title: section.title,
        entries: parseSimpleEntries(section.lines, "publications"),
        collapsed: false,
      };

    case "organisations":
      return {
        id,
        type: "organisations",
        title: section.title,
        entries: parseProjectEntries(section.lines),
        collapsed: false,
      };

    case "courses":
      return {
        id,
        type: "courses",
        title: section.title,
        entries: parseSimpleEntries(section.lines, "courses"),
        collapsed: false,
      };

    case "references":
      return {
        id,
        type: "references",
        title: section.title,
        entries: parseReferenceEntries(section.lines),
        collapsed: false,
      };

    case "declaration":
      return {
        id,
        type: "declaration",
        title: section.title,
        entries: [{ id: crypto.randomUUID(), fields: { description: `<p>${section.lines.join(" ")}</p>`, fullName: "", place: "", date: "", signature: "" } }],
        collapsed: false,
      };

    default:
      return {
        id,
        type: "custom",
        title: section.title,
        entries: [{ id: crypto.randomUUID(), fields: { sectionTitle: section.title, description: `<p>${section.lines.join("<br/>")}</p>` } }],
        collapsed: false,
      };
  }
}

/* ════════════════════════════════════════════════════════════
   Heuristic: distinguish job titles from company names
   ════════════════════════════════════════════════════════════ */

const COMPANY_INDICATORS = /\b(inc|corp|corporation|ltd|llc|llp|gmbh|co|company|group|holdings|technologies|solutions|labs|laboratory|laboratories|studio|studios|bank|university|college|institute|foundation|association|partners|consulting|services|systems|enterprises|industries|limited|plc|ag|sa|srl|pty|pvt|intl|international)\b/i;

const TITLE_INDICATORS = /\b(engineer|developer|manager|director|analyst|designer|architect|lead|senior|junior|intern|associate|vp|vice\s*president|president|ceo|cto|cfo|coo|cio|consultant|coordinator|specialist|administrator|officer|head|principal|staff|fellow|scientist|researcher|professor|teacher|editor|writer|accountant|advisor|strategist|recruiter|trainer|supervisor|technician|assistant|clerk|representative|executive)\b/i;

const INSTITUTION_INDICATORS = /\b(university|college|institute|school|academy|polytechnic|conservatory|universität|université|universidad)\b/i;
const DEGREE_INDICATORS = /\b(b\.?s\.?|b\.?a\.?|m\.?s\.?|m\.?a\.?|m\.?b\.?a\.?|ph\.?d|bachelor|master|doctor|diploma|associate|certificate|degree)\b/i;

function looksLikeCompany(text: string): number {
  let score = 0;
  if (COMPANY_INDICATORS.test(text)) score += 2;
  // Capitalized multi-word name without title words is more company-like
  if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(text.trim()) && !TITLE_INDICATORS.test(text)) score += 1;
  return score;
}

function looksLikeTitle(text: string): number {
  let score = 0;
  if (TITLE_INDICATORS.test(text)) score += 2;
  // "Senior X" / "Lead X" / "Junior X" patterns
  if (/^(senior|junior|lead|staff|principal|chief)\s+/i.test(text.trim())) score += 1;
  return score;
}

function smartSwap(primary: string, secondary: string): { primary: string; secondary: string } {
  if (!secondary) return { primary, secondary };
  const pCompany = looksLikeCompany(primary);
  const pTitle = looksLikeTitle(primary);
  const sCompany = looksLikeCompany(secondary);
  const sTitle = looksLikeTitle(secondary);
  // Swap if primary looks like a company and secondary looks like a title
  if (pCompany > pTitle && sTitle > sCompany) {
    return { primary: secondary, secondary: primary };
  }
  return { primary, secondary };
}

/** For education: swap so degree is primary and institution is secondary */
function educationSmartSwap(primary: string, secondary: string): { primary: string; secondary: string } {
  if (!secondary) {
    // Single value — try to determine if it's an institution (swap to secondary)
    if (INSTITUTION_INDICATORS.test(primary) && !DEGREE_INDICATORS.test(primary)) {
      return { primary: "", secondary: primary };
    }
    return { primary, secondary };
  }
  const pIsInstitution = INSTITUTION_INDICATORS.test(primary);
  const pIsDegree = DEGREE_INDICATORS.test(primary);
  const sIsInstitution = INSTITUTION_INDICATORS.test(secondary);
  const sIsDegree = DEGREE_INDICATORS.test(secondary);

  // If primary looks like institution and secondary looks like degree, swap
  if (pIsInstitution && !pIsDegree && (sIsDegree || !sIsInstitution)) {
    return { primary: secondary, secondary: primary };
  }
  return { primary, secondary };
}

/* ════════════════════════════════════════════════════════════
   Entry parsers — mapped to the correct field names from types.ts
   getDefaultFieldsForType("experience") → { position, company, location, startMonth, startYear, endMonth, endYear, currentlyHere, description }
   getDefaultFieldsForType("education") → { degree, institution, location, startMonth, startYear, endMonth, endYear, currentlyHere, description }
   ════════════════════════════════════════════════════════════ */

function splitTitleOrg(line: string, isExperience: boolean): { primary: string; secondary: string } {
  let result: { primary: string; secondary: string };

  // Try " at " split (e.g., "Software Engineer at Google")
  if (/\s+at\s+/i.test(line)) {
    const [a, b] = line.split(/\s+at\s+/i, 2).map((s) => s.trim());
    result = { primary: a, secondary: b || "" };
  }
  // Try common delimiters
  else {
    let found = false;
    for (const delim of [" | ", " – ", " — ", " - "]) {
      if (line.includes(delim)) {
        const [a, b] = line.split(delim, 2).map((s) => s.trim());
        result = { primary: a, secondary: b || "" };
        found = true;
        break;
      }
    }
    if (!found) {
      // Try comma (but avoid "City, State" patterns)
      if (line.includes(",")) {
        const parts = line.split(",", 2).map((s) => s.trim());
        if (parts.length === 2 && parts[1].length > 3 && !/^[A-Z]{2,3}$/.test(parts[1])) {
          result = { primary: parts[0], secondary: parts[1] };
        } else {
          result = { primary: line, secondary: "" };
        }
      } else {
        result = { primary: line, secondary: "" };
      }
    }
  }

  // For experience: primary should be job title, secondary should be company
  if (isExperience) {
    return smartSwap(result.primary, result.secondary);
  }
  // For education: primary should be degree, secondary should be institution
  return educationSmartSwap(result.primary, result.secondary);
}

function parseExperienceEntries(lines: string[]) {
  const entries: any[] = [];
  let current: { position: string; company: string; location: string; dates: ReturnType<typeof extractDateRange>; bullets: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    // Deduplicate: remove bullets that are substrings of longer bullets
    const deduped = current.bullets.filter((b, i) =>
      !current!.bullets.some((other, j) => j !== i && other.includes(b) && other.length > b.length)
    );
    const bulletHtml = deduped.length > 0
      ? `<ul>${deduped.map((b) => `<li>${b}</li>`).join("")}</ul>`
      : "";
    entries.push({
      id: crypto.randomUUID(),
      fields: {
        position: current.position,
        company: current.company,
        location: current.location,
        startMonth: current.dates?.startMonth || "",
        startYear: current.dates?.startYear || "",
        endMonth: current.dates?.endMonth || "",
        endYear: current.dates?.endYear || "",
        currentlyHere: current.dates?.currentlyHere || "",
        description: bulletHtml,
      },
    });
  };

  for (const line of lines) {
    const isBullet = /^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]/.test(line.trim());

    if (isBullet && current) {
      current.bullets.push(line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim());
      continue;
    }

    const dates = extractDateRange(line);

    // Date-only line: attach to current entry instead of starting a new one
    if (dates && current) {
      const textWithoutDate = line.replace(dates.dateStr, "").replace(/[|,·•\-–—]\s*$/, "").trim();
      if (textWithoutDate.length < 3) {
        // This is just a date line — attach to current entry if it has no dates yet
        if (!current.dates) {
          current.dates = dates;
        }
        continue;
      }
    }

    if (dates || (!current && !isBullet && line.length < 120)) {
      // If current entry has no bullets and no dates, it's likely a standalone company name
      // (e.g. "UBER" on its own line before "Senior Recruiter 2024 – Present")
      // Carry its info forward as the company for the new entry instead of flushing an empty entry
      let carriedCompany = "";
      let carriedLocation = "";
      if (current && !current.dates && current.bullets.length === 0) {
        carriedCompany = current.company || current.position || "";
        carriedLocation = current.location || "";
        current = null; // discard without flushing
      }
      flush();
      const textWithoutDate = dates ? line.replace(dates.dateStr, "").replace(/[|,·•\-–—]\s*$/, "").trim() : line;
      const loc = extractLocation(textWithoutDate);
      const textWithoutLoc = loc ? textWithoutDate.replace(loc, "").replace(/[|,·•\-–—]\s*$/, "").trim() : textWithoutDate;
      const { primary, secondary } = splitTitleOrg(textWithoutLoc, true);

      current = {
        position: primary,
        company: secondary || carriedCompany,
        location: loc || carriedLocation || "",
        dates,
        bullets: [],
      };
    } else if (current) {
      // Continuation line
      if (current.bullets.length === 0 && !current.location && LOCATION_STANDALONE.test(line.trim())) {
        current.location = line.trim();
      } else if (current.bullets.length === 0 && !current.company && line.length < 80) {
        const loc = extractLocation(line);
        const companyCandidate = loc ? line.replace(loc, "").replace(/[|,·•\-–—]\s*$/, "").trim() : line;
        if (loc && !current.location) {
          current.location = loc;
        }
        if (looksLikeTitle(companyCandidate) > looksLikeCompany(companyCandidate) && !looksLikeTitle(current.position)) {
          current.company = current.position;
          current.position = companyCandidate;
        } else {
          current.company = companyCandidate;
        }
      } else {
        // Merge continuation lines into previous bullet instead of creating duplicates
        if (current.bullets.length > 0 && !isBullet && line.length < 120) {
          current.bullets[current.bullets.length - 1] += " " + line.trim();
        } else {
          current.bullets.push(line);
        }
      }
    } else {
      current = { position: line, company: "", location: "", dates: null, bullets: [] };
    }
  }
  flush();

  if (entries.length === 0) {
    return [{ id: crypto.randomUUID(), fields: { position: "", company: "", location: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyHere: "", description: `<p>${lines.join("<br/>")}</p>` } }];
  }
  return entries;
}

function parseEducationEntries(lines: string[]) {
  const entries: any[] = [];
  let current: { degree: string; institution: string; location: string; dates: ReturnType<typeof extractDateRange>; bullets: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const deduped = current.bullets.filter((b, i) =>
      !current!.bullets.some((other, j) => j !== i && other.includes(b) && other.length > b.length)
    );
    const descHtml = deduped.length > 0
      ? `<ul>${deduped.map((b) => `<li>${b}</li>`).join("")}</ul>`
      : "";
    entries.push({
      id: crypto.randomUUID(),
      fields: {
        degree: current.degree,
        institution: current.institution,
        location: current.location,
        startMonth: current.dates?.startMonth || "",
        startYear: current.dates?.startYear || "",
        endMonth: current.dates?.endMonth || "",
        endYear: current.dates?.endYear || "",
        currentlyHere: current.dates?.currentlyHere || "",
        description: descHtml,
      },
    });
  };

  for (const line of lines) {
    const isBullet = /^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]/.test(line.trim());
    if (isBullet && current) {
      current.bullets.push(line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim());
      continue;
    }

    const dates = extractDateRange(line);

    // Date-only line: attach to current entry instead of starting a new one
    if (dates && current) {
      const textWithoutDate = line.replace(dates.dateStr, "").replace(/[|,·•\-–—]\s*$/, "").trim();
      if (textWithoutDate.length < 3) {
        if (!current.dates) {
          current.dates = dates;
        }
        continue;
      }
    }

    if (dates || (!current && !isBullet && line.length < 120)) {
      flush();
      const textWithoutDate = dates ? line.replace(dates.dateStr, "").replace(/[|,·•\-–—]\s*$/, "").trim() : line;
      const loc = extractLocation(textWithoutDate);
      const textWithoutLoc = loc ? textWithoutDate.replace(loc, "").replace(/[|,·•\-–—]\s*$/, "").trim() : textWithoutDate;
      const { primary, secondary } = splitTitleOrg(textWithoutLoc, false);

      current = { degree: primary, institution: secondary, location: loc || "", dates, bullets: [] };
    } else if (current) {
      if (current.bullets.length === 0 && !current.institution && line.length < 80) {
        current.institution = line;
      } else {
        if (current.bullets.length > 0 && !isBullet && line.length < 120) {
          current.bullets[current.bullets.length - 1] += " " + line.trim();
        } else {
          current.bullets.push(line);
        }
      }
    } else {
      current = { degree: line, institution: "", location: "", dates: null, bullets: [] };
    }
  }
  flush();

  if (entries.length === 0) {
    return [{ id: crypto.randomUUID(), fields: { degree: "", institution: "", location: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyHere: "", description: `<p>${lines.join("<br/>")}</p>` } }];
  }
  return entries;
}

function parseProjectEntries(lines: string[]) {
  const entries: any[] = [];
  let current: { name: string; role: string; dates: ReturnType<typeof extractDateRange>; url: string; bullets: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const deduped = current.bullets.filter((b, i) =>
      !current!.bullets.some((other, j) => j !== i && other.includes(b) && other.length > b.length)
    );
    const descHtml = deduped.length > 0 ? `<ul>${deduped.map((b) => `<li>${b}</li>`).join("")}</ul>` : "";
    entries.push({
      id: crypto.randomUUID(),
      fields: {
        name: current.name,
        role: current.role,
        startMonth: current.dates?.startMonth || "",
        startYear: current.dates?.startYear || "",
        endMonth: current.dates?.endMonth || "",
        endYear: current.dates?.endYear || "",
        url: current.url,
        description: descHtml,
      },
    });
  };

  for (const line of lines) {
    const isBullet = /^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]/.test(line.trim());
    if (isBullet && current) {
      current.bullets.push(line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim());
      continue;
    }

    const dates = extractDateRange(line);
    if (dates || (!current && !isBullet)) {
      flush();
      const clean = dates ? line.replace(dates.dateStr, "").trim() : line;
      const urlMatch = clean.match(/https?:\/\/\S+/);
      const url = urlMatch?.[0] || "";
      const textClean = url ? clean.replace(url, "").trim() : clean;
      const { primary, secondary } = splitTitleOrg(textClean, false);
      current = { name: primary, role: secondary, dates, url, bullets: [] };
    } else if (current) {
      if (current.bullets.length > 0 && !isBullet && line.length < 120) {
        current.bullets[current.bullets.length - 1] += " " + line.trim();
      } else {
        current.bullets.push(line);
      }
    }
  }
  flush();

  if (entries.length === 0) {
    return [{ id: crypto.randomUUID(), fields: { name: "", role: "", startMonth: "", startYear: "", endMonth: "", endYear: "", url: "", description: `<p>${lines.join("<br/>")}</p>` } }];
  }
  return entries;
}

function parseSkillsList(lines: string[]): string {
  // Flatten bullets and comma-separated items
  const items: string[] = [];
  for (const line of lines) {
    const clean = line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim();
    if (!clean) continue;
    // Split on commas, semicolons, pipes
    const parts = clean.split(/[,;|]/).map((s) => s.trim()).filter(Boolean);
    items.push(...parts);
  }
  return items.join(", ");
}

function parseLanguageEntries(lines: string[]) {
  const PROFICIENCY_KEYWORDS = ["native", "fluent", "advanced", "intermediate", "basic", "beginner", "elementary", "proficient", "conversational", "mother tongue", "bilingual"];

  const entries: any[] = [];
  for (const line of lines) {
    const clean = line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim();
    if (!clean) continue;

    // Try "Language — Proficiency" or "Language: Proficiency" or "Language (Proficiency)"
    let language = clean;
    let proficiency = "";

    // Check for proficiency keyword
    const lowerClean = clean.toLowerCase();
    for (const kw of PROFICIENCY_KEYWORDS) {
      if (lowerClean.includes(kw)) {
        // Split around the keyword
        const idx = lowerClean.indexOf(kw);
        language = clean.slice(0, idx).replace(/[-–—:|()\s]+$/, "").trim();
        proficiency = clean.slice(idx, idx + kw.length);
        proficiency = proficiency.charAt(0).toUpperCase() + proficiency.slice(1);
        break;
      }
    }

    // Map to standard proficiency
    const profMap: Record<string, string> = {
      native: "Native", "mother tongue": "Native", bilingual: "Native",
      fluent: "Fluent", proficient: "Fluent",
      advanced: "Advanced",
      intermediate: "Intermediate", conversational: "Intermediate",
      basic: "Basic", beginner: "Basic", elementary: "Basic",
    };
    const normalized = profMap[proficiency.toLowerCase()] || proficiency || "";

    if (language) {
      entries.push({
        id: crypto.randomUUID(),
        fields: { language, proficiency: normalized },
      });
    }
  }

  if (entries.length === 0) {
    // Fallback: treat each line as a language
    return lines.filter(Boolean).map((l) => ({
      id: crypto.randomUUID(),
      fields: { language: l.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim(), proficiency: "" },
    }));
  }
  return entries;
}

function parseSimpleEntries(lines: string[], type: string) {
  const entries: any[] = [];
  let current: { name: string; detail: string; date: string; bullets: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const descHtml = current.bullets.length > 0 ? `<ul>${current.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : "";
    const fields: Record<string, string> = { name: current.name, description: descHtml };

    if (type === "certificates") {
      fields.issuer = current.detail;
      fields.date = current.date;
      fields.url = "";
    } else if (type === "awards") {
      fields.issuer = current.detail;
      fields.date = current.date;
    } else if (type === "publications") {
      fields.title = current.name;
      fields.publisher = current.detail;
      fields.date = current.date;
      fields.url = "";
    } else if (type === "courses") {
      fields.institution = current.detail;
      fields.date = current.date;
    }

    entries.push({ id: crypto.randomUUID(), fields });
  };

  for (const line of lines) {
    const isBullet = /^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]/.test(line.trim());
    if (isBullet && current) {
      current.bullets.push(line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim());
      continue;
    }

    const dates = extractDateRange(line);
    const dateStr = dates?.dateStr || "";
    const clean = dateStr ? line.replace(dateStr, "").replace(/[|,·•\-–—]\s*$/, "").trim() : line;
    const { primary, secondary } = splitTitleOrg(clean, false);

    flush();
    current = { name: primary, detail: secondary, date: dateStr, bullets: [] };
  }
  flush();

  if (entries.length === 0) {
    return lines.filter(Boolean).map((l) => ({
      id: crypto.randomUUID(),
      fields: { name: l, description: "" },
    }));
  }
  return entries;
}

function parseReferenceEntries(lines: string[]) {
  // Group lines into reference blocks (separated by blank-ish patterns)
  const entries: any[] = [];
  let current: Record<string, string> = { name: "", position: "", company: "", email: "", phone: "", relationship: "" };

  const flush = () => {
    if (current.name || current.email || current.phone) {
      entries.push({ id: crypto.randomUUID(), fields: { ...current } });
    }
    current = { name: "", position: "", company: "", email: "", phone: "", relationship: "" };
  };

  for (const line of lines) {
    const clean = line.replace(/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]\s*/, "").trim();
    if (!clean) { flush(); continue; }

    const emailMatch = clean.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    const phoneMatch = clean.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}/);

    if (emailMatch) { current.email = emailMatch[0]; continue; }
    if (phoneMatch) { current.phone = phoneMatch[0]; continue; }

    if (!current.name) {
      current.name = clean;
    } else if (!current.position) {
      // Try "Position at Company" or "Position, Company"
      const { primary, secondary } = splitTitleOrg(clean, true);
      current.position = primary;
      current.company = secondary;
    } else if (!current.company) {
      current.company = clean;
    }
  }
  flush();

  if (entries.length === 0) {
    return [{ id: crypto.randomUUID(), fields: { name: "", position: "", company: "", email: "", phone: "", relationship: "" } }];
  }
  return entries;
}

/* ════════════════════════════════════════════════════════════
   AI-powered resume parsing (calls resume-ai edge function)
   ════════════════════════════════════════════════════════════ */

import { supabase } from "@/integrations/supabase/client";
import { getDefaultFieldsForType } from "@/components/resume-builder/types";

const VALID_SECTION_TYPES = new Set([
  "experience", "education", "skills", "languages", "summary",
  "certificates", "interests", "projects", "courses", "awards",
  "organisations", "publications", "references", "declaration", "custom",
]);

interface AiParsedResume {
  personalDetails: {
    fullName: string;
    professionalTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  sections: Array<{
    type: string;
    title: string;
    entries: Array<{ fields: Record<string, string> }>;
  }>;
}

async function aiParseResume(text: string): Promise<AiParsedResume> {
  const { data, error } = await supabase.functions.invoke("resume-ai", {
    body: { action: "parse_resume", text },
  });

  if (error) throw new Error(error.message || "AI parse request failed");
  if (data?.error) throw new Error(data.error);
  if (!data?.result?.personalDetails || !data?.result?.sections) {
    throw new Error("AI returned incomplete data");
  }

  return data.result as AiParsedResume;
}

function normalizeParsedResume(ai: AiParsedResume) {
  const pd = ai.personalDetails;

  // Normalize sections
  const sections = ai.sections
    .filter((s) => s.entries && s.entries.length > 0)
    .map((s) => {
      const type = VALID_SECTION_TYPES.has(s.type) ? s.type : "custom";
      const defaults = getDefaultFieldsForType(type);

      const entries = s.entries.map((e) => {
        // Merge with defaults so all expected fields exist
        const fields: Record<string, string> = { ...defaults };
        for (const [k, v] of Object.entries(e.fields || {})) {
          if (typeof v === "string") fields[k] = v;
        }
        return { id: crypto.randomUUID(), fields };
      });

      return {
        id: crypto.randomUUID(),
        type,
        title: s.title || type.charAt(0).toUpperCase() + type.slice(1),
        entries,
        collapsed: false,
        ...(type === "summary" ? { showHeading: true } : {}),
      };
    });

  // Post-parse quality repairs
  repairSections(sections);

  return {
    fullName: pd.fullName || "",
    professionalTitle: pd.professionalTitle || "",
    email: pd.email || "",
    phone: pd.phone || "",
    location: pd.location || "",
    linkedin: pd.linkedin || "",
    website: pd.website || "",
    sections,
  };
}

function repairSections(sections: any[]) {
  // If summary is very long (>500 chars) and there's no experience section, something likely went wrong
  const summaryIdx = sections.findIndex((s) => s.type === "summary");
  const hasExperience = sections.some((s) => s.type === "experience");

  if (summaryIdx >= 0 && !hasExperience) {
    const summaryText = sections[summaryIdx].entries?.[0]?.fields?.description || "";
    if (summaryText.length > 500) {
      // Likely experience content dumped into summary — keep it but flag as custom
      // Don't redistribute automatically as AI should have handled this
    }
  }

  // If skills section has long sentences (>100 chars per "skill"), it's probably not skills
  for (let i = sections.length - 1; i >= 0; i--) {
    const s = sections[i];
    if (s.type === "skills") {
      const skillsStr = s.entries?.[0]?.fields?.skills || "";
      const items = skillsStr.split(",").map((x: string) => x.trim()).filter(Boolean);
      if (items.length <= 2 && skillsStr.length > 100) {
        // Convert to custom section
        s.type = "custom";
        s.entries = [{
          id: crypto.randomUUID(),
          fields: { sectionTitle: s.title, description: `<p>${skillsStr}</p>` },
        }];
      }
    }
  }

  // Experience entries missing both company and position → demote to custom
  for (const s of sections) {
    if (s.type === "experience") {
      const validEntries = s.entries.filter((e: any) => e.fields.position || e.fields.company);
      if (validEntries.length === 0 && s.entries.length > 0) {
        s.type = "custom";
        s.entries = [{
          id: crypto.randomUUID(),
          fields: {
            sectionTitle: s.title,
            description: s.entries.map((e: any) => e.fields.description || "").join(""),
          },
        }];
      }
    }
  }
}

function qualityScore(parsed: { sections: any[] }): number {
  let score = 0;
  for (const s of parsed.sections) {
    score += 1; // each section counts
    if (s.type === "experience" || s.type === "education") {
      for (const e of s.entries || []) {
        const fields = e.fields || {};
        const filledFields = Object.values(fields).filter((v) => typeof v === "string" && v.trim()).length;
        score += filledFields * 0.5;
      }
    }
  }
  return score;
}

export type ParseSource = "ai" | "heuristic";

export interface ParseResult {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  sections: any[];
  source: ParseSource;
  warnings: string[];
}

export async function parseResumeWithFallback(
  text: string,
  onProgress?: (msg: string) => void,
): Promise<ParseResult> {
  const warnings: string[] = [];

  // Try AI first
  try {
    onProgress?.("Analyzing structure with AI…");
    const aiResult = await aiParseResume(text);
    onProgress?.("Finalizing sections…");
    const normalized = normalizeParsedResume(aiResult);

    if (normalized.sections.length > 0) {
      return { ...normalized, source: "ai", warnings };
    }

    warnings.push("AI returned empty sections, falling back to heuristic parser.");
  } catch (err) {
    console.warn("AI parse failed, falling back to heuristic:", err);
    warnings.push("AI parsing unavailable, using heuristic parser.");
  }

  // Fallback to heuristic
  onProgress?.("Parsing with heuristic engine…");
  const heuristic = mapTextToResumeSections(text);
  return { ...heuristic, source: "heuristic", warnings };
}
