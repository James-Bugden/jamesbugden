import type { ResumeData } from "@/components/resume-builder/types";

/** Strip HTML tags from a string */
function stripHtml(html: string): string {
  return html
    .replace(/<li>/gi, "\n• ")
    .replace(/<\/li>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .trim();
}

/** Convert structured ResumeData into plain text suitable for the analyzer */
export function resumeDataToText(data: ResumeData): string {
  const lines: string[] = [];

  // Personal details
  const p = data.personalDetails;
  if (p.fullName) lines.push(p.fullName);
  if (p.professionalTitle) lines.push(p.professionalTitle);
  const contact = [p.email, p.phone, p.location].filter(Boolean).join(" | ");
  if (contact) lines.push(contact);
  p.extras?.forEach((e) => {
    if (e.value) lines.push(`${e.type}: ${e.value}`);
  });

  lines.push("");

  // Sections
  for (const section of data.sections) {
    lines.push(section.title.toUpperCase());
    lines.push("---");

    for (const entry of section.entries) {
      const f = entry.fields;
      const parts: string[] = [];

      // Common dated entries
      if (f.position || f.company) {
        parts.push([f.position, f.company, f.location].filter(Boolean).join(" — "));
      }
      if (f.degree || f.institution) {
        parts.push([f.degree, f.institution, f.location].filter(Boolean).join(" — "));
      }
      if (f.name && !f.degree) {
        parts.push([f.name, f.role, f.issuer, f.institution, f.publisher].filter(Boolean).join(" — "));
      }
      if (f.title && section.type === "publications") {
        parts.push([f.title, f.publisher].filter(Boolean).join(" — "));
      }

      // Date range
      const start = [f.startMonth, f.startYear].filter(Boolean).join(" ");
      const end = f.currentlyHere === "true" ? "Present" : [f.endMonth, f.endYear].filter(Boolean).join(" ");
      if (start || end) parts.push([start, end].filter(Boolean).join(" – "));

      // Skills / interests (comma-separated tags)
      if (f.skills) parts.push(f.skills);
      if (f.interests) parts.push(f.interests);

      // Language
      if (f.language) parts.push(`${f.language}${f.proficiency ? ` (${f.proficiency})` : ""}`);

      // Description
      if (f.description) parts.push(stripHtml(f.description));

      // URL
      if (f.url) parts.push(f.url);

      lines.push(parts.join("\n"));
      lines.push("");
    }
  }

  return lines.join("\n").trim();
}
