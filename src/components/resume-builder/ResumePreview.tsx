import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { containsCJK, resumeHasCJK } from "@/lib/resumePdf/fontMap";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Flag,
  FileText,
  Pencil,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Linkedin,
  Globe,
  IdCard,
} from "lucide-react";
import { ResumeData, ResumeSection } from "./types";
import { CustomizeSettings } from "./customizeTypes";
import { GOOGLE_FONTS_URL } from "./fontData";
import { InlineColorToolbar, ROLE_TO_FIELD } from "./InlineColorToolbar";
import { InlineFormatToolbar } from "./InlineFormatToolbar";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Page dimensions (mm → px at 96 DPI: 1mm ≈ 3.7795px) ──────── */
const PX_PER_MM = 3.7795;
const HEADER_SAFE_MM = 4;
const FOOTER_SAFE_MM = 4;
const PAGE_DIMS: Record<string, { w: number; h: number }> = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

function getPageDims(format?: string) {
  const d = PAGE_DIMS[format || "a4"] || PAGE_DIMS.a4;
  return { wMM: d.w, hMM: d.h, wPX: d.w * PX_PER_MM, hPX: d.h * PX_PER_MM };
}

interface ResumePreviewProps {
  data: ResumeData;
  customize?: CustomizeSettings;
  pdfTargetId?: string;
  onEditSection?: (sectionId: string) => void;
  onColorChange?: (field: string, color: string) => void;
  onContentEdit?: (sectionId: string, entryId: string, field: string, html: string) => void;
  onPageCount?: (count: number) => void;
}

/* ── Relative font-size helpers ──────────────────────────────── */
const NAME_SIZES: Record<string, string> = { xs: "14pt", s: "20pt", m: "24pt", l: "28pt", xl: "32pt" };
const TITLE_SIZES: Record<string, string> = { s: "9pt", m: "11pt", l: "13pt" };

function headingSizePt(base: number, size: string): string {
  const offsets: Record<string, number> = { s: -1.5, m: -0.5, l: 1.5, xl: 3.5 };
  return `${base + (offsets[size] ?? -0.5)}pt`;
}

function bodyPt(base: number): string { return `${base - 1.5}pt`; }
function datePt(base: number): string { return `${base - 2.5}pt`; }
function contactPt(base: number): string { return `${base - 2.5}pt`; }

function entryTitlePt(base: number, size: string): string {
  const offsets: Record<string, number> = { xs: -2.5, s: -2, m: -1.5, l: -0.5 };
  return `${base + (offsets[size] ?? -1.5)}pt`;
}

function entrySubtitlePt(base: number, size: string): string {
  const offsets: Record<string, number> = { xs: -3.5, s: -3, m: -2.5, l: -1.5 };
  return `${base + (offsets[size] ?? -2.5)}pt`;
}

function skillPt(base: number): string { return `${base - 2}pt`; }
function smallPt(base: number): string { return `${base - 3}pt`; }

/** CJK-safe font-family: prepend system CJK fonts when text contains Chinese characters */
const CJK_FALLBACK = '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC"';
function cjkSafeFont(font: string | undefined, hasCJK: boolean): string {
  const base = font || "'Source Sans 3', sans-serif";
  return hasCJK ? `${CJK_FALLBACK}, ${base}` : base;
}

function safeData(data?: ResumeData): ResumeData {
  return {
    personalDetails: {
      fullName: data?.personalDetails?.fullName ?? "",
      professionalTitle: data?.personalDetails?.professionalTitle ?? "",
      email: data?.personalDetails?.email ?? "",
      phone: data?.personalDetails?.phone ?? "",
      location: data?.personalDetails?.location ?? "",
      photo: data?.personalDetails?.photo ?? "",
      extras: Array.isArray(data?.personalDetails?.extras) ? data!.personalDetails.extras : [],
    },
    sections: Array.isArray(data?.sections) ? data!.sections : [],
  };
}

function formatDateRange(fields: Record<string, string>) {
  const start = [fields.startMonth?.slice(0, 3), fields.startYear].filter(Boolean).join(" ");
  const end = fields.currentlyHere === "true"
    ? "Present"
    : [fields.endMonth?.slice(0, 3), fields.endYear].filter(Boolean).join(" ");
  return [start, end].filter(Boolean).join(" – ");
}

function isMeaningfulHtml(html?: string) {
  if (!html) return false;
  const plain = html
    .replace(/<br\s*\/?\s*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return plain.length > 0;
}

function HtmlBlock({ html, className, fontSize, sectionId, entryId }: { html?: string; className?: string; fontSize?: string; sectionId?: string; entryId?: string }) {
  if (!isMeaningfulHtml(html)) return null;

  return (
    <div
      data-color-role="body"
      data-field="description"
      data-section-id={sectionId}
      data-entry-id={entryId}
      className={className}
      style={{ fontSize: fontSize || "inherit", lineHeight: 1.5, color: "var(--resume-body)" }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html || "", { ADD_TAGS: ['font'], ADD_ATTR: ['style', 'color'] }) }}
    />
  );
}

function SectionEditOverlay({ sectionId, onEdit }: { sectionId: string; onEdit?: (id: string) => void }) {
  if (!onEdit) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit(sectionId);
      }}
      className="absolute -right-[1mm] -top-[1mm] w-[5mm] h-[5mm] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
      style={{ backgroundColor: "var(--resume-accent)", color: "#fff", cursor: "pointer" }}
    >
      <Pencil style={{ width: "2.5mm", height: "2.5mm" }} />
    </button>
  );
}

function SectionHeading({ title, customize, baseFontSize }: { title: string; customize?: CustomizeSettings; baseFontSize: number }) {
  const style = customize?.headingStyle || "underline";
  const fontSize = headingSizePt(baseFontSize, customize?.headingSize || "m");
  const uppercase = customize?.headingUppercase !== false;
  const isCJK = containsCJK(title);

  const textStyle: React.CSSProperties = {
    fontSize,
    color: style === "background" ? "#fff" : "var(--resume-headings)",
    textTransform: (uppercase && !isCJK) ? "uppercase" : "none",
    fontFamily: cjkSafeFont(customize?.headingFont || customize?.bodyFont, isCJK),
    letterSpacing: isCJK ? "0.02em" : "0.08em",
  };

  if (style === "plain") {
    return <h2 data-color-role="headings" className="font-bold mb-[2mm]" style={textStyle}>{title}</h2>;
  }

  if (style === "underline") {
    return (
      <div className="mb-[2mm]">
        <h2 data-color-role="headings" className="font-bold" style={textStyle}>{title}</h2>
        <div data-color-role="accent" className="mt-[0.8mm] h-[0.4mm] w-full" style={{ backgroundColor: "var(--resume-accent)" }} />
      </div>
    );
  }

  if (style === "full-underline") {
    return (
      <h2 data-color-role="headings" className="font-bold mb-[2mm] pb-[1mm] border-b-[0.5mm]" style={{ ...textStyle, borderColor: "var(--resume-accent)" }}>
        {title}
      </h2>
    );
  }

  if (style === "left-accent") {
    return (
      <div className="mb-[2mm] flex items-center gap-[2mm]">
        <div data-color-role="accent" className="w-[1mm] h-[4mm] rounded-full" style={{ backgroundColor: "var(--resume-accent)" }} />
        <h2 data-color-role="headings" className="font-bold" style={textStyle}>{title}</h2>
      </div>
    );
  }

  if (style === "background") {
    return (
      <div className="mb-[2mm]">
        <h2 data-color-role="headings" className="font-bold px-[2mm] py-[1mm] rounded-[0.5mm]" style={{ ...textStyle, backgroundColor: "var(--resume-accent)" }}>
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div className="mb-[2mm] pl-[3mm] border-l-[0.8mm]" style={{ borderColor: "var(--resume-accent)" }}>
      <h2 data-color-role="headings" className="font-bold" style={textStyle}>{title}</h2>
    </div>
  );
}

function normalizeSectionOrder(sections: ResumeSection[], customize?: CustomizeSettings) {
  const order = customize?.sectionOrder || [];
  if (!order.length) return sections;

  const rank = new Map<string, number>();
  order.forEach((id, idx) => rank.set(id, idx));

  return [...sections].sort((a, b) => {
    const ra = rank.has(a.id) ? rank.get(a.id)! : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.id) ? rank.get(b.id)! : Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}

function hasContent(section: ResumeSection): boolean {
  if (!section.entries?.length) return false;

  return section.entries.some((entry) => {
    const fields = entry.fields || {};
    return Object.values(fields).some((v) => {
      if (!v) return false;
      if (typeof v !== "string") return !!v;
      if (v.includes("<")) return isMeaningfulHtml(v);
      return v.trim().length > 0;
    });
  });
}

function renderSectionEntries(section: ResumeSection, customize?: CustomizeSettings, base: number = 10.5) {
  const c = customize;

  if (section.type === "summary") {
    return <HtmlBlock html={section.entries?.[0]?.fields?.description} sectionId={section.id} entryId={section.entries?.[0]?.id} fontSize={bodyPt(base)} className="mt-[1mm] [&_p]:mb-[1.2mm] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ol]:list-decimal [&_ol]:pl-[5mm]" />;
  }

  if (section.type === "skills" || section.type === "interests") {
    const raw = section.entries?.[0]?.fields?.skills || section.entries?.[0]?.fields?.interests || "";
    const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (!items.length) return null;

    const layout = section.layout || c?.skillsDisplay || "bubble";
    const sep = section.separator || c?.skillsSeparator || "bullet";
    const subStyle = section.subtitleStyle || "dash";

    const formatItem = (item: string) => {
      const colonIdx = item.indexOf(":");
      if (colonIdx === -1) return item;
      const cat = item.slice(0, colonIdx).trim();
      const rest = item.slice(colonIdx + 1).trim();
      if (!rest) return item;
      if (subStyle === "dash") return `${cat} — ${rest}`;
      if (subStyle === "bracket") return `${cat} (${rest})`;
      return `${cat}: ${rest}`;
    };

    const sepChar = sep === "pipe" ? " | " : sep === "none" ? "  " : " · ";

    if (layout === "grid") {
      // Group items into rows of 3 so each row is a block-level element
      // that the pagination algorithm can push past page boundaries
      const rows: string[][] = [];
      for (let i = 0; i < items.length; i += 3) {
        rows.push(items.slice(i, i + 3));
      }
      return (
        <div className="mt-[1.2mm]" style={{ display: "flex", flexDirection: "column", gap: "1mm" }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 3mm" }}>
              {row.map((item, ci) => (
                <div key={`${item}-${ri}-${ci}`} className="flex items-center gap-[1.5mm]">
                  {sep !== "newline" && sep !== "none" && (
                    <span style={{ fontSize: skillPt(base), color: "var(--resume-accent)" }}>
                      {sep === "pipe" ? "|" : "·"}
                    </span>
                  )}
                  <span style={{ fontSize: skillPt(base), color: "var(--resume-body)" }}>{formatItem(item)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (layout === "compact") {
      if (sep === "newline") {
        return (
          <div className="mt-[1.2mm] flex flex-col gap-[0.8mm]">
            {items.map((item, i) => (
              <span key={`${item}-${i}`} style={{ fontSize: skillPt(base), color: "var(--resume-body)" }}>{formatItem(item)}</span>
            ))}
          </div>
        );
      }
      return <p className="mt-[1.2mm]" style={{ fontSize: skillPt(base), color: "var(--resume-body)" }}>{items.map(formatItem).join(sepChar)}</p>;
    }

    // bubble (default)
    return (
      <div className="flex flex-wrap gap-[1.6mm] mt-[1.2mm]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-[2.5mm] py-[0.8mm] rounded-full"
            style={{
              fontSize: skillPt(base),
              color: "var(--resume-body)",
              backgroundColor: "color-mix(in srgb, var(--resume-accent) 10%, white)",
              border: "0.3mm solid color-mix(in srgb, var(--resume-accent) 25%, white)",
            }}
          >
            {formatItem(item)}
          </span>
        ))}
      </div>
    );
  }

  if (section.type === "languages") {
    const langDisplay = section.layout || c?.languagesDisplay || "grid";
    const sep = section.separator || c?.languagesSeparator || "bullet";
    const subStyle = section.subtitleStyle || "dash";

    const formatLangLabel = (lang: string, prof: string) => {
      if (!prof) return lang;
      if (subStyle === "dash") return `${lang} — ${prof}`;
      if (subStyle === "bracket") return `${lang} (${prof})`;
      return `${lang}: ${prof}`;
    };

    const sepChar = sep === "pipe" ? " | " : sep === "none" ? "  " : " · ";

    const validEntries = section.entries.filter((e) => e.fields.language?.trim() || e.fields.proficiency?.trim());

    if (langDisplay === "compact") {
      if (sep === "newline") {
        return (
          <div className="mt-[1mm] flex flex-col gap-[0.8mm]">
            {validEntries.map((entry) => (
              <span key={entry.id} style={{ fontSize: skillPt(base), color: "var(--resume-body)" }}>
                {formatLangLabel(entry.fields.language?.trim() || "", entry.fields.proficiency?.trim() || "")}
              </span>
            ))}
          </div>
        );
      }
      return (
        <p className="mt-[1mm]" style={{ fontSize: skillPt(base), color: "var(--resume-body)" }}>
          {validEntries.map((e) => formatLangLabel(e.fields.language?.trim() || "", e.fields.proficiency?.trim() || "")).join(sepChar)}
        </p>
      );
    }

    if (langDisplay === "bubble") {
      return (
        <div className="flex flex-wrap gap-[1.6mm] mt-[1mm]">
          {validEntries.map((entry) => (
            <span
              key={entry.id}
              className="px-[2.5mm] py-[0.8mm] rounded-full"
              style={{
                fontSize: skillPt(base),
                color: "var(--resume-body)",
                backgroundColor: "color-mix(in srgb, var(--resume-accent) 10%, white)",
                border: "0.3mm solid color-mix(in srgb, var(--resume-accent) 25%, white)",
              }}
            >
              {formatLangLabel(entry.fields.language?.trim() || "", entry.fields.proficiency?.trim() || "")}
            </span>
          ))}
        </div>
      );
    }

    // grid (default)
    return (
      <div className="mt-[1mm] space-y-[1.4mm]">
        {validEntries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between gap-[3mm]">
            <span style={{ fontSize: bodyPt(base), color: "var(--resume-body)", fontWeight: 600 }}>{entry.fields.language?.trim() || "Language"}</span>
            <span data-color-role="dates" style={{ fontSize: datePt(base), color: "var(--resume-dates)" }}>{entry.fields.proficiency?.trim()}</span>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "references") {
    return (
      <div className="mt-[1mm] space-y-[2mm]">
        {section.entries.map((entry) => {
          const f = entry.fields;
          if (!Object.values(f).some(Boolean)) return null;

          return (
            <div key={entry.id}>
              <p data-color-role="entryTitle" style={{ fontSize: bodyPt(base), fontWeight: 700, color: "var(--resume-name)" }}>
                {f.name || "Reference"}
              </p>
              <p data-color-role="subtitle" style={{ fontSize: datePt(base), color: "var(--resume-subtitle)" }}>
                {[f.position, f.company].filter(Boolean).join(" · ")}
              </p>
              <p data-color-role="dates" style={{ fontSize: datePt(base), color: "var(--resume-dates)" }}>
                {[f.phone, f.email].filter(Boolean).join(" · ")}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  if (section.type === "declaration") {
    const entry = section.entries?.[0];
    if (!entry) return null;
    const f = entry.fields;

    return (
      <div className="mt-[1mm]">
        <HtmlBlock html={f.description} sectionId={section.id} entryId={entry.id} className="[&_p]:mb-[1mm] [&_ul]:list-disc [&_ul]:pl-[5mm]" />
        {f.signature && <img src={f.signature} alt="Signature" className="h-[12mm] mt-[2mm]" />}
        {(f.fullName || f.place || f.date) && (
          <p style={{ fontSize: skillPt(base), color: "var(--resume-subtitle)", marginTop: "2mm" }}>
            {[f.fullName, f.place, f.date].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    );
  }

  if (section.type === "custom") {
    return (
      <div className="mt-[1mm] space-y-[2mm]">
        {section.entries.map((entry) => (
          <HtmlBlock
            key={entry.id}
            html={entry.fields.description}
            sectionId={section.id}
            entryId={entry.id}
            className="[&_p]:mb-[1mm] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ol]:list-decimal [&_ol]:pl-[5mm]"
          />
        ))}
      </div>
    );
  }

  const patternedTypes = new Set([
    "experience",
    "education",
    "courses",
    "certificates",
    "projects",
    "awards",
    "organisations",
    "publications",
  ]);

  if (patternedTypes.has(section.type)) {
    const layout = c?.entryLayout ?? "stacked";
    const tsSize = c?.titleSubtitleSize ?? "m";
    const subStyle = c?.subtitleStyle ?? "normal";
    const subPlace = c?.subtitlePlacement ?? "next-line";
    const listSt = c?.listStyle ?? "bullet";

    const titleFontSize = entryTitlePt(base, tsSize);
    const subtitleFontSize = entrySubtitlePt(base, tsSize);

    const subtitleFW = subStyle === "bold" ? 700 : 400;
    const subtitleFS = subStyle === "italic" ? "italic" : "normal";

    const listClass = listSt === "bullet"
      ? "[&_ul]:list-disc [&_ul]:pl-[5mm]"
      : listSt === "none"
        ? "[&_ul]:list-none [&_ul]:pl-0"
        : "[&_ul]:list-none [&_ul]:pl-[5mm]";

    const hyphenStyleId = `hyphen-${section.id}`;
    const hyphenStyle = listSt === "hyphen" ? (
      <style>{`.${hyphenStyleId} ul li::before { content: "–  "; position: absolute; left: 0; } .${hyphenStyleId} ul li { position: relative; padding-left: 3mm; }`}</style>
    ) : null;

    const entryGap = layout === "compact" ? "1.6mm" : "2.8mm";

    // --- Group Promotions logic for experience ---
    if (section.type === "experience" && c?.groupPromotions) {
      type EntryGroup = { company: string; entries: typeof section.entries };
      const groups: EntryGroup[] = [];
      for (const entry of section.entries) {
        const f = entry.fields;
        const hasAny = Object.values(f).some(Boolean);
        if (!hasAny) continue;
        const comp = (f.company || "").trim();
        const last = groups[groups.length - 1];
        if (last && last.company && last.company === comp) {
          last.entries.push(entry);
        } else {
          groups.push({ company: comp, entries: [entry] });
        }
      }

      return (
        <div className={`mt-[1mm] ${listSt === "hyphen" ? hyphenStyleId : ""}`} style={{ display: "flex", flexDirection: "column", gap: entryGap }}>
          {hyphenStyle}
          {groups.map((group, gi) => {
            if (group.entries.length === 1) {
              const entry = group.entries[0];
              const f = entry.fields;
              const order = c?.experienceOrder ?? "title-first";
              const primaryText = order === "title-first" ? (f.position || "") : (f.company || "");
              const secondaryText = order === "title-first" ? (f.company || "") : (f.position || "");
              const date = formatDateRange(f) || f.date || "";

              return (
                <div key={entry.id} data-page-item>
                  <div className="flex items-start justify-between gap-[4mm]">
                    <div style={{ flex: 1 }}>
                      {subPlace === "same-line" ? (
                        <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                          {primaryText || "Entry"}
                          {secondaryText && (
                            <span data-color-role="subtitle" style={{ fontWeight: subtitleFW, fontStyle: subtitleFS, color: "var(--resume-subtitle)", marginLeft: "2mm" }}>
                              · {secondaryText}
                            </span>
                          )}
                        </p>
                      ) : (
                        <>
                          <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>{primaryText || "Entry"}</p>
                          {secondaryText && (
                            <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>{secondaryText}</p>
                          )}
                        </>
                      )}
                    </div>
                    {date && <p data-color-role="dates" style={{ fontSize: subtitleFontSize, color: "var(--resume-dates)", whiteSpace: "nowrap" }}>{date}</p>}
                  </div>
                  {f.location && <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>{f.location}</p>}
                  <HtmlBlock html={f.description} sectionId={section.id} entryId={entry.id} fontSize={bodyPt(base)} className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`} />
                </div>
              );
            }

            const firstEntry = group.entries[group.entries.length - 1];
            const lastEntry = group.entries[0];
            const groupStart = [firstEntry.fields.startMonth?.slice(0, 3), firstEntry.fields.startYear].filter(Boolean).join(" ");
            const groupEnd = lastEntry.fields.currentlyHere === "true"
              ? "Present"
              : [lastEntry.fields.endMonth?.slice(0, 3), lastEntry.fields.endYear].filter(Boolean).join(" ");
            const groupDateRange = [groupStart, groupEnd].filter(Boolean).join(" – ");

            return (
              <div key={`group-${gi}`} data-page-item>
                <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>{group.company || "Company"}</p>
                <div style={{ marginTop: "1.5mm", display: "flex", flexDirection: "column", gap: "2mm" }}>
                  {group.entries.map(entry => {
                    const f = entry.fields;
                    const roleDate = formatDateRange(f) || f.date || "";
                    return (
                      <div key={entry.id}>
                        <div className="flex items-start justify-between gap-[4mm]">
                          <p data-color-role="entryTitle" style={{ fontSize: subtitleFontSize, fontWeight: 600, fontStyle: "italic", color: "var(--resume-name)" }}>{f.position || "Role"}</p>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            {roleDate && <p data-color-role="dates" style={{ fontSize: subtitleFontSize, color: "var(--resume-dates)", whiteSpace: "nowrap" }}>{roleDate}</p>}
                            {f.location && <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", whiteSpace: "nowrap" }}>{f.location}</p>}
                          </div>
                        </div>
                        <HtmlBlock html={f.description} sectionId={section.id} entryId={entry.id} fontSize={bodyPt(base)} className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className={`mt-[1mm] ${listSt === "hyphen" ? hyphenStyleId : ""}`} style={{ display: "flex", flexDirection: "column", gap: entryGap }}>
        {hyphenStyle}
        {section.entries.map((entry) => {
          const f = entry.fields;
          const hasAny = Object.values(f).some(Boolean);
          if (!hasAny) return null;

          let primaryText: string;
          let secondaryText: string | undefined;

          if (section.type === "education") {
            const order = c?.educationOrder ?? "degree-first";
            primaryText = order === "degree-first" ? (f.degree || "") : (f.institution || "");
            secondaryText = order === "degree-first" ? (f.institution || "") : (f.degree || "");
          } else if (section.type === "experience") {
            const order = c?.experienceOrder ?? "title-first";
            primaryText = order === "title-first" ? (f.position || "") : (f.company || "");
            secondaryText = order === "title-first" ? (f.company || "") : (f.position || "");
          } else {
            primaryText = f.name || f.title || "";
            secondaryText = f.company || f.institution || f.issuer || f.publisher || f.role || "";
          }

          const date = formatDateRange(f) || f.date || "";

          if (layout === "inline") {
            const headline = [primaryText, secondaryText].filter(Boolean).join(" · ");
            return (
              <div key={entry.id} data-page-item>
                <div className="flex items-start justify-between gap-[4mm]">
                  <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                    {headline || "Entry"}
                    {date && <span data-color-role="dates" style={{ fontSize: subtitleFontSize, fontWeight: 400, color: "var(--resume-dates)", marginLeft: "3mm" }}>{date}</span>}
                  </p>
                </div>
                {f.location && (
                  <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>{f.location}</p>
                )}
                <HtmlBlock html={f.description} sectionId={section.id} entryId={entry.id} fontSize={bodyPt(base)} className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`} />
              </div>
            );
          }

          if (layout === "academic") {
            return (
              <div key={entry.id} data-page-item>
                <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                  {primaryText || "Entry"}
                  {date && <span data-color-role="dates" style={{ fontSize: subtitleFontSize, fontWeight: 400, color: "var(--resume-dates)", marginLeft: "3mm" }}>{date}</span>}
                </p>
                {secondaryText && (
                  <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontStyle: "italic", marginTop: "0.3mm" }}>{secondaryText}</p>
                )}
                {f.location && (
                  <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontStyle: "italic", marginTop: "0.3mm" }}>{f.location}</p>
                )}
                <HtmlBlock html={f.description} sectionId={section.id} entryId={entry.id} fontSize={bodyPt(base)} className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`} />
              </div>
            );
          }

          return (
            <div key={entry.id} data-page-item>
              <div className="flex items-start justify-between gap-[4mm]">
                <div style={{ flex: 1 }}>
                  {subPlace === "same-line" ? (
                    <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                      {primaryText || "Entry"}
                      {secondaryText && (
                        <span data-color-role="subtitle" style={{ fontWeight: subtitleFW, fontStyle: subtitleFS, color: "var(--resume-subtitle)", marginLeft: "2mm" }}>
                          · {secondaryText}
                        </span>
                      )}
                    </p>
                  ) : (
                    <>
                      <p data-color-role="entryTitle" style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                        {primaryText || "Entry"}
                      </p>
                      {secondaryText && (
                        <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>
                          {secondaryText}
                        </p>
                      )}
                    </>
                  )}
                </div>
                {date && (
                  <p data-color-role="dates" style={{ fontSize: subtitleFontSize, color: "var(--resume-dates)", whiteSpace: "nowrap" }}>{date}</p>
                )}
              </div>

              {f.location && (
                <p data-color-role="subtitle" style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>{f.location}</p>
              )}

              {(f.url || f.link) && (
                <p style={{ fontSize: subtitleFontSize, color: "var(--resume-dates)", marginTop: "0.5mm" }}>
                  <a href={f.url || f.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: c?.linkUnderline ? "underline" : "none" }}>{f.url || f.link}</a>
                </p>
              )}

              <HtmlBlock
                html={f.description}
                sectionId={section.id}
                entryId={entry.id}
                fontSize={bodyPt(base)}
                className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export { getPageDims };

export const A4Page = React.memo(function A4Page({
  data,
  customize,
  onEditSection,
}: {
  data: ResumeData;
  customize?: CustomizeSettings;
  onEditSection?: (id: string) => void;
}) {
  const safe = safeData(data);
  const p = safe.personalDetails;
  const c = customize;
  const dims = getPageDims(c?.pageFormat);
  const baseFontSize = c?.fontSize ?? 10.5;
  const hasCJK = useMemo(() => resumeHasCJK(safe), [safe]);

  const orderedSections = useMemo(() => normalizeSectionOrder(safe.sections, c), [safe.sections, c]);
  const enabledSections = orderedSections;

  const headerSafeMM = HEADER_SAFE_MM;
  const footerSafeMM = FOOTER_SAFE_MM;
  const marginYMM = c?.marginY ?? 16;
  const topPadMM = marginYMM + headerSafeMM;
  const bottomPadMM = marginYMM + footerSafeMM;

  const cssVars = useMemo(
    () =>
      ({
        "--resume-font-size": `${c?.fontSize ?? 11}pt`,
        "--resume-line-height": `${c?.lineHeight ?? 1.5}`,
        "--resume-margin-x": `${c?.marginX ?? 16}mm`,
        "--resume-margin-y": `${marginYMM}mm`,
        "--resume-pad-top": `${topPadMM}mm`,
        "--resume-pad-bottom": `${bottomPadMM}mm`,
        "--resume-section-spacing": `${c?.sectionSpacing ?? 5}mm`,
        "--resume-accent": c?.accentColor ?? "#1e293b",
        "--resume-name": c?.nameColor ?? "#111827",
        "--resume-title": c?.titleColor ?? "#6B7280",
        "--resume-headings": c?.headingsColor ?? "#111827",
        "--resume-dates": c?.datesColor ?? "#6B7280",
        "--resume-subtitle": c?.subtitleColor ?? "#6B7280",
        "--resume-body": c?.bodyColor ?? "#374151",
      }) as React.CSSProperties,
    [c, topPadMM, bottomPadMM, marginYMM]
  );

  const headerIconStyle = c?.headerIconStyle || "none";
  const iconFill = headerIconStyle === "filled" ? "currentColor" : "none";
  const iconProps = { className: "w-[3mm] h-[3mm]", strokeWidth: 1.8, fill: iconFill };

  const contactItems = useMemo(() => {
    const extras = p.extras || [];
    const normalizedExtras = extras
      .map((x) => ({ type: (x.type || "").toLowerCase(), value: x.value || "" }))
      .filter((x) => x.value.trim().length > 0);

    const fromExtras = normalizedExtras.map((extra) => {
      const href = extra.value.startsWith("http") ? extra.value
        : extra.type.includes("linkedin") ? `https://${extra.value}` 
        : extra.type.includes("website") ? `https://${extra.value}` 
        : undefined;
      if (extra.type.includes("linkedin")) return { icon: <Linkedin {...iconProps} />, text: extra.value, href };
      if (extra.type.includes("website")) return { icon: <Globe {...iconProps} />, text: extra.value, href };
      if (extra.type.includes("nationality")) return { icon: <Flag {...iconProps} />, text: extra.value, href: undefined };
      if (extra.type.includes("visa") || extra.type.includes("passport") || extra.type.includes("id")) {
        return { icon: <IdCard {...iconProps} />, text: extra.value, href: undefined };
      }
      return { icon: <FileText {...iconProps} />, text: extra.value, href: undefined };
    });

    return [
      p.email ? { icon: <Mail {...iconProps} />, text: p.email, href: `mailto:${p.email}` } : null,
      p.phone ? { icon: <Phone {...iconProps} />, text: p.phone, href: `tel:${p.phone}` } : null,
      p.location ? { icon: <MapPin {...iconProps} />, text: p.location, href: undefined } : null,
      ...fromExtras,
    ].filter(Boolean) as { icon: React.ReactNode; text: string; href?: string }[];
  }, [p]);

  const isTwoColumn = c?.columns === "two" || c?.columns === "mix";
  const ratio = Math.min(8, Math.max(3, c?.columnRatio || 4));

  const sidebarTypes = new Set(["skills", "languages", "interests", "certificates", "courses", "awards"]);
  const sidebarSections = isTwoColumn ? enabledSections.filter((s) => sidebarTypes.has(s.type)) : [];
  const mainSections = isTwoColumn ? enabledSections.filter((s) => !sidebarTypes.has(s.type)) : enabledSections;

  const titleSameLine = c?.titleSameLine === true && !!p.professionalTitle;
  const hasRealContent =
    !!p.fullName ||
    !!p.professionalTitle ||
    contactItems.length > 0 ||
    enabledSections.some((s) => hasContent(s));

  return (
    <>
      <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      <div
        data-color-role="background"
        className="text-gray-900"
        style={{
          ...cssVars,
          width: `${dims.wMM}mm`,
          minHeight: `${dims.hMM}mm`,
          padding: "var(--resume-pad-top) var(--resume-margin-x) var(--resume-pad-bottom)",
          position: "relative",
          fontFamily: c?.bodyFont || "'Source Sans 3', sans-serif",
          fontSize: "var(--resume-font-size)",
          lineHeight: "var(--resume-line-height)",
          boxSizing: "border-box",
          backgroundColor: c?.a4Background || "#ffffff",
          color: "var(--resume-body)",
        }}
      >
        <header className="mb-[4.5mm]" style={{ textAlign: c?.headerAlign || "center" }}>
          {(() => {
            const showPhoto = p.photo && c?.showPhoto !== false;
            const photoSizeMM = { s: 12, m: 18, l: 24 }[c?.photoSize || "m"] || 18;
            const photoShape = c?.photoShape || "circle";
            const photoBorderRadius = photoShape === "circle" ? "50%" : photoShape === "rounded" ? "2mm" : "0";
            const align = c?.headerAlign || "center";

            const nameBlock = titleSameLine ? (
              <div
                className="flex items-baseline gap-[3mm]"
                style={{
                  justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
                  flexWrap: "nowrap",
                }}
              >
                <h1
                  data-color-role="name"
                  className="font-bold uppercase tracking-[0.1em]"
                  style={{
                    fontSize: NAME_SIZES[c?.nameSize || "s"],
                    color: "var(--resume-name)",
                    fontWeight: c?.nameBold !== false ? 700 : 400,
                    fontFamily: c?.nameFont === "creative" ? c?.headingFont || c?.bodyFont : c?.bodyFont,
                  }}
                >
                  {p.fullName || "YOUR NAME"}
                </h1>
                <p data-color-role="title" style={{ fontSize: TITLE_SIZES[c?.titleSize || "m"], color: "var(--resume-title)" }}>
                  {p.professionalTitle}
                </p>
              </div>
            ) : (
              <>
                <h1
                  data-color-role="name"
                  className="font-bold uppercase tracking-[0.1em]"
                  style={{
                    fontSize: NAME_SIZES[c?.nameSize || "s"],
                    color: "var(--resume-name)",
                    fontWeight: c?.nameBold !== false ? 700 : 400,
                    fontFamily: c?.nameFont === "creative" ? c?.headingFont || c?.bodyFont : c?.bodyFont,
                  }}
                >
                  {p.fullName || "YOUR NAME"}
                </h1>
                {p.professionalTitle && (
                  <p data-color-role="title" className="mt-[1mm]" style={{ fontSize: TITLE_SIZES[c?.titleSize || "m"], color: "var(--resume-title)" }}>
                    {p.professionalTitle}
                  </p>
                )}
              </>
            );

            const contacts = contactItems.length > 0 ? (
              <div
                data-color-role="contacts"
                className="flex items-center flex-wrap mt-[2.5mm] gap-x-[4mm] gap-y-[1mm]"
                style={{
                  fontSize: contactPt(baseFontSize),
                  color: c?.linkIconColor || "var(--resume-dates)",
                  justifyContent: align === "right" ? "flex-end" : align === "left" ? "flex-start" : "center",
                }}
              >
                {contactItems.map((item, i) => {
                  const sep = c?.contactSeparator ?? "bar";
                  const showIcon = sep === "icon" || (headerIconStyle !== "none");
                  return (
                    <span key={`${item.text}-${i}`} className="flex items-center gap-[1.1mm]">
                      {i > 0 && sep === "bullet" && <span className="mx-[1mm]">·</span>}
                      {i > 0 && sep === "bar" && <span className="mx-[1mm]">|</span>}
                      {sep === "icon" && item.icon}
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: c?.linkUnderline ? "underline" : "none" }}>{item.text}</a>
                      ) : item.text}
                    </span>
                  );
                })}
              </div>
            ) : null;

            if (!showPhoto) {
              return <>{nameBlock}{contacts}</>;
            }

            const photoEl = (
              <img
                src={p.photo}
                alt="Profile photo"
                style={{
                  width: `${photoSizeMM}mm`,
                  height: `${photoSizeMM}mm`,
                  borderRadius: photoBorderRadius,
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            );

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4mm",
                  flexDirection: align === "right" ? "row-reverse" : "row",
                  justifyContent: align === "center" ? "center" : "flex-start",
                  textAlign: align,
                }}
              >
                {photoEl}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {nameBlock}
                  {contacts}
                </div>
              </div>
            );
          })()}
        </header>

        <div data-color-role="accent" className="h-[0.3mm] mb-[5mm]" style={{ backgroundColor: "color-mix(in srgb, var(--resume-accent) 20%, #d1d5db)" }} />

        {isTwoColumn ? (
          <div style={{ display: "grid", gridTemplateColumns: `${ratio}fr ${12 - ratio}fr`, gap: "var(--resume-section-spacing)" }}>
            <div>
              {sidebarSections.map((section) => {
                const title = section.type === "custom" && section.entries?.[0]?.fields?.sectionTitle
                  ? section.entries[0].fields.sectionTitle
                  : section.title;

                return (
                  <section key={section.id} data-page-item className="group relative" style={{ marginBottom: "var(--resume-section-spacing)" }}>
                    <SectionEditOverlay sectionId={section.id} onEdit={onEditSection} />
                    {section.showHeading !== false && <SectionHeading title={title} customize={c} baseFontSize={baseFontSize} />}
                    {renderSectionEntries(section, c, baseFontSize)}
                  </section>
                );
              })}
            </div>

            <div>
              {mainSections.map((section) => {
                const title = section.type === "custom" && section.entries?.[0]?.fields?.sectionTitle
                  ? section.entries[0].fields.sectionTitle
                  : section.title;

                return (
                  <section key={section.id} data-page-item className="group relative" style={{ marginBottom: "var(--resume-section-spacing)" }}>
                    <SectionEditOverlay sectionId={section.id} onEdit={onEditSection} />
                    {section.showHeading !== false && <SectionHeading title={title} customize={c} baseFontSize={baseFontSize} />}
                    {renderSectionEntries(section, c, baseFontSize)}
                  </section>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {mainSections.map((section) => {
              const title = section.type === "custom" && section.entries?.[0]?.fields?.sectionTitle
                ? section.entries[0].fields.sectionTitle
                : section.title;

              return (
                <section key={section.id} data-page-item className="group relative" style={{ marginBottom: "var(--resume-section-spacing)" }}>
                  <SectionEditOverlay sectionId={section.id} onEdit={onEditSection} />
                  {section.showHeading !== false && <SectionHeading title={title} customize={c} baseFontSize={baseFontSize} />}
                  {renderSectionEntries(section, c, baseFontSize)}
                </section>
              );
            })}
          </>
        )}

        {!hasRealContent && (
          <button
            onClick={() => onEditSection?.("")}
            className="w-full text-center py-[30mm] cursor-pointer hover:opacity-70 transition-opacity"
            style={{ color: "#9CA3AF", fontSize: "11pt" }}
          >
            Add content to see your resume here →
          </button>
        )}
      </div>
    </>
  );
});

/* ── Color field resolver ──────────────────────────────── */
function getColorForRole(role: string, customize?: CustomizeSettings): string {
  const field = ROLE_TO_FIELD[role];
  if (!field || !customize) return "#000000";
  return (customize as any)[field] ?? "#000000";
}

export const ResumePreview = React.memo(function ResumePreview({
  data,
  customize,
  pdfTargetId,
  onEditSection,
  onColorChange,
  onContentEdit,
  onPageCount,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [autoScale, setAutoScale] = useState(0.65);
  const [zoomOffset, setZoomOffset] = useState(0);

  const [colorTarget, setColorTarget] = useState<{ rect: DOMRect; role: string } | null>(null);
  const [formatToolbar, setFormatToolbar] = useState<{ rect: DOMRect } | null>(null);
  const isMobile = useIsMobile();

  const dims = getPageDims(customize?.pageFormat);
  const scale = Math.max(0.2, Math.min(1.5, autoScale + zoomOffset));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const fit = Math.min((w - 48) / dims.wPX, 0.9);
        setAutoScale(Math.max(0.3, fit));
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [dims.wPX]);

  const handlePreviewClick = useCallback((e: React.MouseEvent) => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    setFormatToolbar(null);

    if (!onColorChange) return;
    const target = (e.target as HTMLElement).closest('[data-color-role]') as HTMLElement | null;
    if (!target) return;
    const role = target.getAttribute('data-color-role');
    if (!role) return;
    e.stopPropagation();
    const rect = target.getBoundingClientRect();
    setColorTarget({ rect, role });
  }, [onColorChange]);

  const handleColorChange = useCallback((field: string, color: string) => {
    onColorChange?.(field, color);
  }, [onColorChange]);

  /* ── Selection listener for inline formatting toolbar ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onContentEdit) return;

    const handleMouseUp = () => {
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        const node = range.commonAncestorContainer;
        const ancestor = node instanceof HTMLElement ? node : node.parentElement;
        if (!ancestor || !container.contains(ancestor)) return;

        // Skip hidden measurement div
        if (ancestor.closest('[data-hidden-flow]')) return;

        // Only show toolbar if selection is inside a formattable field
        const fieldEl = ancestor.closest('[data-field]');
        if (!fieldEl) return;

        const rect = range.getBoundingClientRect();
        setFormatToolbar({ rect });
      }, 10);
    };

    container.addEventListener("mouseup", handleMouseUp);
    return () => container.removeEventListener("mouseup", handleMouseUp);
  }, [onContentEdit]);

  const handleFormat = useCallback((command: string, value?: string) => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !onContentEdit) return;

    const range = sel.getRangeAt(0);
    const node = range.commonAncestorContainer;
    const ancestor = node instanceof HTMLElement ? node : node.parentElement;
    if (!ancestor) return;

    const fieldEl = ancestor.closest('[data-field]') as HTMLElement;
    if (!fieldEl) return;

    const sectionId = fieldEl.getAttribute('data-section-id');
    const entryId = fieldEl.getAttribute('data-entry-id');
    const field = fieldEl.getAttribute('data-field') || 'description';
    if (!sectionId || !entryId) return;

    // Temporarily make contentEditable, apply formatting, read result
    fieldEl.contentEditable = 'true';
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand(command, false, value);

    const newHtml = fieldEl.innerHTML;
    fieldEl.removeAttribute('contenteditable');

    onContentEdit(sectionId, entryId, field, newHtml);
    setFormatToolbar(null);
  }, [onContentEdit]);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto relative" style={{ backgroundColor: "#f3f4f6" }}>
      {onColorChange && (
        <style>{`
          @media (hover: hover) {
            [data-color-role] {
              cursor: pointer;
              transition: outline 0.15s;
            }
            [data-color-role]:hover {
              outline: 1px dashed #7dd3fc;
              outline-offset: 2px;
              border-radius: 2px;
            }
          }
        `}</style>
      )}

      <div className="flex justify-center py-8 px-6" onClick={handlePreviewClick}>
        <div
          style={{
            width: `${dims.wPX}px`,
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            marginBottom: `${-(1 - scale) * dims.hPX}px`,
          }}
        >
          <div className="shadow-2xl rounded-sm" style={{ backgroundColor: customize?.a4Background || "#ffffff" }}>
            <A4Page data={data} customize={customize} onEditSection={onEditSection} />
          </div>
        </div>
      </div>

      {colorTarget && onColorChange && (
        <InlineColorToolbar
          targetRect={colorTarget.rect}
          currentColor={getColorForRole(colorTarget.role, customize)}
          elementType={colorTarget.role}
          onColorChange={handleColorChange}
          onClose={() => setColorTarget(null)}
          isMobile={isMobile}
          containerRect={containerRef.current?.getBoundingClientRect()}
        />
      )}

      {formatToolbar && onContentEdit && (
        <InlineFormatToolbar
          rect={formatToolbar.rect}
          onFormat={handleFormat}
          onClose={() => setFormatToolbar(null)}
          containerRect={containerRef.current?.getBoundingClientRect()}
        />
      )}

      <div className="sticky bottom-4 flex justify-center pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 px-1.5 py-1">
          <button
            onClick={() => setZoomOffset((z) => Math.max(z - 0.1, -0.4))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-xs font-medium text-gray-600 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>

          <button
            onClick={() => setZoomOffset((z) => Math.min(z + 0.1, 0.6))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {zoomOffset !== 0 && (
            <button
              onClick={() => setZoomOffset(0)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              title="Reset zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
