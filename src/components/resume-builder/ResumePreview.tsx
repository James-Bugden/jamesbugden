import React, { useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
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
  Scissors,
  Linkedin,
  Globe,
  IdCard,
} from "lucide-react";
import { ResumeData, ResumeSection } from "./types";
import { CustomizeSettings } from "./customizeTypes";
import { GOOGLE_FONTS_URL } from "./fontData";

/* ── Page dimensions (mm → px at 96 DPI: 1mm ≈ 3.7795px) ──────── */
const PX_PER_MM = 3.7795;
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
}

const NAME_SIZES: Record<string, string> = { xs: "14pt", s: "20pt", m: "24pt", l: "28pt", xl: "32pt" };
const TITLE_SIZES: Record<string, string> = { s: "9pt", m: "11pt", l: "13pt" };
const HEADING_SIZES: Record<string, string> = { s: "9pt", m: "10pt", l: "12pt", xl: "14pt" };

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

function HtmlBlock({ html, className }: { html?: string; className?: string }) {
  if (!isMeaningfulHtml(html)) return null;

  return (
    <div
      className={className}
      style={{ fontSize: "9pt", lineHeight: 1.5, color: "var(--resume-body)" }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html || "") }}
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

function SectionHeading({ title, customize }: { title: string; customize?: CustomizeSettings }) {
  const style = customize?.headingStyle || "underline";
  const fontSize = HEADING_SIZES[customize?.headingSize || "m"];
  const uppercase = customize?.headingUppercase !== false;

  const textStyle: React.CSSProperties = {
    fontSize,
    color: style === "background" ? "#fff" : "var(--resume-headings)",
    textTransform: uppercase ? "uppercase" : "none",
    fontFamily: customize?.headingFont || customize?.bodyFont,
    letterSpacing: "0.08em",
  };

  if (style === "plain") {
    return <h2 className="font-bold mb-[2mm]" style={textStyle}>{title}</h2>;
  }

  if (style === "underline") {
    return (
      <div className="mb-[2mm]">
        <h2 className="font-bold" style={textStyle}>{title}</h2>
        <div className="mt-[0.8mm] h-[0.4mm] w-full" style={{ backgroundColor: "var(--resume-accent)" }} />
      </div>
    );
  }

  if (style === "full-underline") {
    return (
      <h2 className="font-bold mb-[2mm] pb-[1mm] border-b-[0.5mm]" style={{ ...textStyle, borderColor: "var(--resume-accent)" }}>
        {title}
      </h2>
    );
  }

  if (style === "left-accent") {
    return (
      <div className="mb-[2mm] flex items-center gap-[2mm]">
        <div className="w-[1mm] h-[4mm] rounded-full" style={{ backgroundColor: "var(--resume-accent)" }} />
        <h2 className="font-bold" style={textStyle}>{title}</h2>
      </div>
    );
  }

  if (style === "background") {
    return (
      <div className="mb-[2mm]">
        <h2 className="font-bold px-[2mm] py-[1mm] rounded-[0.5mm]" style={{ ...textStyle, backgroundColor: "var(--resume-accent)" }}>
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div className="mb-[2mm] pl-[3mm] border-l-[0.8mm]" style={{ borderColor: "var(--resume-accent)" }}>
      <h2 className="font-bold" style={textStyle}>{title}</h2>
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

function renderSectionEntries(section: ResumeSection, customize?: CustomizeSettings) {
  const c = customize;

  if (section.type === "summary") {
    return <HtmlBlock html={section.entries?.[0]?.fields?.description} className="mt-[1mm] [&_p]:mb-[1.2mm] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ol]:list-decimal [&_ol]:pl-[5mm]" />;
  }

  if (section.type === "skills") {
    const raw = section.entries?.[0]?.fields?.skills || "";
    const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (!items.length) return null;

    const layout = c?.skillsDisplay || section.layout || "bubble";

    if (layout === "grid") {
      return (
        <div className="grid grid-cols-2 gap-x-[6mm] gap-y-[1mm] mt-[1.2mm]">
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-[1.5mm]">
              <span className="w-[1.1mm] h-[1.1mm] rounded-full" style={{ backgroundColor: "var(--resume-accent)" }} />
              <span style={{ fontSize: "8.5pt", color: "var(--resume-body)" }}>{item}</span>
            </div>
          ))}
        </div>
      );
    }

    if (layout === "compact") {
      const separator = section.separator === "pipe" ? " | " : section.separator === "comma" ? ", " : " · ";
      return <p className="mt-[1.2mm]" style={{ fontSize: "8.5pt", color: "var(--resume-body)" }}>{items.join(separator)}</p>;
    }

    if (layout === "level") {
      return (
        <div className="space-y-[1.5mm] mt-[1.2mm]">
          {items.map((item, i) => {
            const [label, lvl] = item.includes(":") ? item.split(":").map((x) => x.trim()) : [item, "3"];
            const level = Math.min(5, Math.max(1, parseInt(lvl || "3", 10)));

            return (
              <div key={`${label}-${i}`} className="flex items-center gap-[2mm]">
                <span className="w-[26mm]" style={{ fontSize: "8pt", color: "var(--resume-body)" }}>{label}</span>
                <div className="flex-1 h-[1.6mm] rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                  <div className="h-full rounded-full" style={{ width: `${level * 20}%`, backgroundColor: "var(--resume-accent)" }} />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-[1.6mm] mt-[1.2mm]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-[2.5mm] py-[0.8mm] rounded-full"
            style={{
              fontSize: "8.3pt",
              color: "var(--resume-body)",
              backgroundColor: "color-mix(in srgb, var(--resume-accent) 10%, white)",
              border: "0.3mm solid color-mix(in srgb, var(--resume-accent) 25%, white)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (section.type === "languages") {
    const langDisplay = c?.languagesDisplay || "grid";

    return (
      <div className="mt-[1mm] space-y-[1.4mm]">
        {section.entries.map((entry) => {
          const language = entry.fields.language?.trim();
          const proficiency = entry.fields.proficiency?.trim();
          if (!language && !proficiency) return null;

          if (langDisplay === "level") {
            const lvl = proficiency ? Math.min(5, Math.max(1, ["beginner","elementary","intermediate","upper-intermediate","advanced","native"].indexOf(proficiency.toLowerCase()) + 1 || 3)) : 3;
            return (
              <div key={entry.id} className="flex items-center gap-[2mm]">
                <span className="w-[26mm]" style={{ fontSize: "8pt", color: "var(--resume-body)", fontWeight: 600 }}>{language}</span>
                <div className="flex-1 h-[1.6mm] rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                  <div className="h-full rounded-full" style={{ width: `${lvl * 20}%`, backgroundColor: "var(--resume-accent)" }} />
                </div>
              </div>
            );
          }

          if (langDisplay === "compact") {
            return (
              <span key={entry.id} style={{ fontSize: "8.5pt", color: "var(--resume-body)" }}>
                {language}{proficiency ? ` (${proficiency})` : ""}
              </span>
            );
          }

          if (langDisplay === "bubble") {
            return (
              <span
                key={entry.id}
                className="inline-block px-[2.5mm] py-[0.8mm] rounded-full mr-[1.5mm]"
                style={{
                  fontSize: "8.3pt",
                  color: "var(--resume-body)",
                  backgroundColor: "color-mix(in srgb, var(--resume-accent) 10%, white)",
                  border: "0.3mm solid color-mix(in srgb, var(--resume-accent) 25%, white)",
                }}
              >
                {language}{proficiency ? ` — ${proficiency}` : ""}
              </span>
            );
          }

          // grid (default)
          return (
            <div key={entry.id} className="flex items-center justify-between gap-[3mm]">
              <span style={{ fontSize: "9pt", color: "var(--resume-body)", fontWeight: 600 }}>{language || "Language"}</span>
              <span style={{ fontSize: "8pt", color: "var(--resume-dates)" }}>{proficiency}</span>
            </div>
          );
        })}
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
              <p style={{ fontSize: "9pt", fontWeight: 700, color: "var(--resume-name)" }}>
                {f.name || "Reference"}
              </p>
              <p style={{ fontSize: "8pt", color: "var(--resume-subtitle)" }}>
                {[f.position, f.company].filter(Boolean).join(" · ")}
              </p>
              <p style={{ fontSize: "8pt", color: "var(--resume-dates)" }}>
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
        <HtmlBlock html={f.description} className="[&_p]:mb-[1mm] [&_ul]:list-disc [&_ul]:pl-[5mm]" />
        {f.signature && <img src={f.signature} alt="Signature" className="h-[12mm] mt-[2mm]" />}
        {(f.fullName || f.place || f.date) && (
          <p style={{ fontSize: "8.5pt", color: "var(--resume-subtitle)", marginTop: "2mm" }}>
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

    const titleFontSize = { xs: "8pt", s: "8.5pt", m: "9pt", l: "10pt" }[tsSize] ?? "9pt";
    const subtitleFontSize = { xs: "7pt", s: "7.5pt", m: "8pt", l: "9pt" }[tsSize] ?? "8pt";

    const subtitleFW = subStyle === "bold" ? 700 : 400;
    const subtitleFS = subStyle === "italic" ? "italic" : "normal";

    const listClass = listSt === "bullet"
      ? "[&_ul]:list-disc [&_ul]:pl-[5mm]"
      : listSt === "hyphen"
        ? "[&_ul]:pl-[5mm] [&_ul_li]:before:content-['–_'] [&_ul]:list-none"
        : "[&_ul]:list-none [&_ul]:pl-0";

    const entryGap = layout === "compact" ? "1.6mm" : "2.8mm";

    return (
      <div className="mt-[1mm]" style={{ display: "flex", flexDirection: "column", gap: entryGap }}>
        {section.entries.map((entry) => {
          const f = entry.fields;
          const hasAny = Object.values(f).some(Boolean);
          if (!hasAny) return null;

          // Build headline parts respecting educationOrder / experienceOrder
          let primaryText: string;
          let secondaryText: string | undefined;

          if (section.type === "education") {
            const order = c?.educationOrder ?? "degree-first";
            primaryText = order === "degree-first"
              ? (f.degree || "")
              : (f.institution || "");
            secondaryText = order === "degree-first"
              ? (f.institution || "")
              : (f.degree || "");
          } else if (section.type === "experience") {
            const order = c?.experienceOrder ?? "title-first";
            primaryText = order === "title-first"
              ? (f.position || "")
              : (f.company || "");
            secondaryText = order === "title-first"
              ? (f.company || "")
              : (f.position || "");
          } else {
            primaryText = f.name || f.title || "";
            secondaryText = f.company || f.institution || f.issuer || f.publisher || f.role || "";
          }

          const date = formatDateRange(f) || f.date || "";

          // Inline layout: title · subtitle | date all on one line
          if (layout === "inline") {
            const headline = [primaryText, secondaryText].filter(Boolean).join(" · ");
            return (
              <div key={entry.id}>
                <div className="flex items-start justify-between gap-[4mm]">
                  <p style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                    {headline || "Entry"}
                    {date && <span style={{ fontSize: subtitleFontSize, fontWeight: 400, color: "var(--resume-dates)", marginLeft: "3mm" }}>{date}</span>}
                  </p>
                </div>
                {f.location && (
                  <p style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>{f.location}</p>
                )}
                <HtmlBlock html={f.description} className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`} />
              </div>
            );
          }

          // Academic layout: bold title, italic subtitle, compact
          if (layout === "academic") {
            return (
              <div key={entry.id}>
                <p style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                  {primaryText || "Entry"}
                  {date && <span style={{ fontSize: subtitleFontSize, fontWeight: 400, color: "var(--resume-dates)", marginLeft: "3mm" }}>{date}</span>}
                </p>
                {secondaryText && (
                  <p style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontStyle: "italic", marginTop: "0.3mm" }}>{secondaryText}</p>
                )}
                {f.location && (
                  <p style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontStyle: "italic", marginTop: "0.3mm" }}>{f.location}</p>
                )}
                <HtmlBlock html={f.description} className={`mt-[1mm] [&_p]:mb-[1mm] ${listClass} [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.4mm] [&_a]:underline`} />
              </div>
            );
          }

          // Stacked (default) and Compact layouts
          return (
            <div key={entry.id}>
              <div className="flex items-start justify-between gap-[4mm]">
                <div style={{ flex: 1 }}>
                  {subPlace === "same-line" ? (
                    <p style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                      {primaryText || "Entry"}
                      {secondaryText && (
                        <span style={{ fontWeight: subtitleFW, fontStyle: subtitleFS, color: "var(--resume-subtitle)", marginLeft: "2mm" }}>
                          · {secondaryText}
                        </span>
                      )}
                    </p>
                  ) : (
                    <>
                      <p style={{ fontSize: titleFontSize, fontWeight: 700, color: "var(--resume-name)" }}>
                        {primaryText || "Entry"}
                      </p>
                      {secondaryText && (
                        <p style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>
                          {secondaryText}
                        </p>
                      )}
                    </>
                  )}
                </div>
                {date && (
                  <p style={{ fontSize: subtitleFontSize, color: "var(--resume-dates)", whiteSpace: "nowrap" }}>{date}</p>
                )}
              </div>

              {f.location && (
                <p style={{ fontSize: subtitleFontSize, color: "var(--resume-subtitle)", fontWeight: subtitleFW, fontStyle: subtitleFS, marginTop: "0.5mm" }}>{f.location}</p>
              )}

              {(f.url || f.link) && (
                <p style={{ fontSize: subtitleFontSize, color: "var(--resume-dates)", marginTop: "0.5mm" }}>
                  {f.url || f.link}
                </p>
              )}

              <HtmlBlock
                html={f.description}
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

  const orderedSections = useMemo(() => normalizeSectionOrder(safe.sections, c), [safe.sections, c]);
  const enabledSections = orderedSections.filter((s) => !s.collapsed);

  const cssVars = useMemo(
    () =>
      ({
        "--resume-font-size": `${c?.fontSize ?? 11}pt`,
        "--resume-line-height": `${c?.lineHeight ?? 1.5}`,
        "--resume-margin-x": `${c?.marginX ?? 16}mm`,
        "--resume-margin-y": `${c?.marginY ?? 16}mm`,
        "--resume-section-spacing": `${c?.sectionSpacing ?? 5}mm`,
        "--resume-accent": c?.accentColor ?? "#1e293b",
        "--resume-name": c?.nameColor ?? "#111827",
        "--resume-title": c?.titleColor ?? "#6B7280",
        "--resume-headings": c?.headingsColor ?? "#111827",
        "--resume-dates": c?.datesColor ?? "#6B7280",
        "--resume-subtitle": c?.subtitleColor ?? "#6B7280",
        "--resume-body": c?.nameColor ?? "#374151",
      }) as React.CSSProperties,
    [c]
  );

  const iconProps = { className: "w-[3mm] h-[3mm]", strokeWidth: 1.8 };

  const contactItems = useMemo(() => {
    const extras = p.extras || [];
    const normalizedExtras = extras
      .map((x) => ({ type: (x.type || "").toLowerCase(), value: x.value || "" }))
      .filter((x) => x.value.trim().length > 0);

    const fromExtras = normalizedExtras.map((extra) => {
      if (extra.type.includes("linkedin")) return { icon: <Linkedin {...iconProps} />, text: extra.value };
      if (extra.type.includes("website")) return { icon: <Globe {...iconProps} />, text: extra.value };
      if (extra.type.includes("nationality")) return { icon: <Flag {...iconProps} />, text: extra.value };
      if (extra.type.includes("visa") || extra.type.includes("passport") || extra.type.includes("id")) {
        return { icon: <IdCard {...iconProps} />, text: extra.value };
      }
      return { icon: <FileText {...iconProps} />, text: extra.value };
    });

    return [
      p.email ? { icon: <Mail {...iconProps} />, text: p.email } : null,
      p.phone ? { icon: <Phone {...iconProps} />, text: p.phone } : null,
      p.location ? { icon: <MapPin {...iconProps} />, text: p.location } : null,
      ...fromExtras,
    ].filter(Boolean) as { icon: React.ReactNode; text: string }[];
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
        className="text-gray-900"
        style={{
          ...cssVars,
          width: `${dims.wMM}mm`,
          minHeight: `${dims.hMM}mm`,
          padding: "var(--resume-margin-y) var(--resume-margin-x)",
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
          {titleSameLine ? (
            <div
              className="flex items-end gap-[3mm]"
              style={{
                justifyContent:
                  c?.headerAlign === "left"
                    ? "flex-start"
                    : c?.headerAlign === "right"
                      ? "flex-end"
                      : "center",
              }}
            >
              <h1
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
              <p style={{ fontSize: TITLE_SIZES[c?.titleSize || "m"], color: "var(--resume-title)" }}>
                {p.professionalTitle}
              </p>
            </div>
          ) : (
            <>
              <h1
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
                <p className="mt-[1mm]" style={{ fontSize: TITLE_SIZES[c?.titleSize || "m"], color: "var(--resume-title)" }}>
                  {p.professionalTitle}
                </p>
              )}
            </>
          )}

          {contactItems.length > 0 && (
            <div
              className="flex items-center flex-wrap mt-[2.5mm] gap-x-[4mm] gap-y-[1mm]"
              style={{
                fontSize: "8pt",
                color: c?.linkIconColor || "var(--resume-dates)",
                justifyContent:
                  c?.headerAlign === "right" ? "flex-end" : c?.headerAlign === "left" ? "flex-start" : "center",
              }}
            >
              {contactItems.map((item, i) => {
                const sep = c?.contactSeparator || "icon";
                return (
                  <span key={`${item.text}-${i}`} className="flex items-center gap-[1.1mm]">
                    {i > 0 && sep === "bullet" && <span className="mx-[1mm]">·</span>}
                    {i > 0 && sep === "bar" && <span className="mx-[1mm]">|</span>}
                    {sep === "icon" && item.icon}
                    {item.text}
                  </span>
                );
              })}
            </div>
          )}
        </header>

        <div className="h-[0.3mm] mb-[5mm]" style={{ backgroundColor: "color-mix(in srgb, var(--resume-accent) 20%, #d1d5db)" }} />

        {isTwoColumn ? (
          <div style={{ display: "grid", gridTemplateColumns: `${ratio}fr ${12 - ratio}fr`, gap: "var(--resume-section-spacing)" }}>
            <div>
              {sidebarSections.map((section) => {
                const title = section.type === "custom" && section.entries?.[0]?.fields?.sectionTitle
                  ? section.entries[0].fields.sectionTitle
                  : section.title;

                return (
                  <section key={section.id} className="group relative" style={{ marginBottom: "var(--resume-section-spacing)" }}>
                    <SectionEditOverlay sectionId={section.id} onEdit={onEditSection} />
                    {section.showHeading !== false && <SectionHeading title={title} customize={c} />}
                    {renderSectionEntries(section, c)}
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
                  <section key={section.id} className="group relative" style={{ marginBottom: "var(--resume-section-spacing)" }}>
                    <SectionEditOverlay sectionId={section.id} onEdit={onEditSection} />
                    {section.showHeading !== false && <SectionHeading title={title} customize={c} />}
                    {renderSectionEntries(section, c)}
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
                <section key={section.id} className="group relative" style={{ marginBottom: "var(--resume-section-spacing)" }}>
                  <SectionEditOverlay sectionId={section.id} onEdit={onEditSection} />
                  {section.showHeading !== false && <SectionHeading title={title} customize={c} />}
                  {renderSectionEntries(section, c)}
                </section>
              );
            })}
          </>
        )}

        {!hasRealContent && (
          <div className="text-center py-[30mm]" style={{ color: "#9CA3AF", fontSize: "11pt" }}>
            Add content to see your resume here
          </div>
        )}

        {/* Footer */}
        {(c?.showPageNumbers || c?.showFooterEmail || c?.showFooterName) && (
          <div
            style={{
              position: "absolute",
              bottom: "var(--resume-margin-y)",
              left: "var(--resume-margin-x)",
              right: "var(--resume-margin-x)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "7.5pt",
              color: "var(--resume-dates)",
            }}
          >
            <span>{c?.showFooterName ? (p.fullName || "") : ""}</span>
            <span>
              {[
                c?.showFooterEmail ? p.email : "",
              ].filter(Boolean).join(" · ")}
            </span>
          </div>
        )}
      </div>
    </>
  );
});

export const ResumePreview = React.memo(function ResumePreview({
  data,
  customize,
  pdfTargetId,
  onEditSection,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenFlowRef = useRef<HTMLDivElement>(null);

  const [autoScale, setAutoScale] = useState(0.65);
  const [zoomOffset, setZoomOffset] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    const measure = () => {
      if (!hiddenFlowRef.current) return;
      const h = hiddenFlowRef.current.scrollHeight;
      setPageCount(Math.max(1, Math.ceil(h / dims.hPX)));
    };

    const t = setTimeout(measure, 0);
    return () => clearTimeout(t);
  }, [data, customize, dims.hPX]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const visualTop = el.scrollTop / scale;
      const pageWithGaps = dims.hPX + 40;
      const page = Math.min(pageCount, Math.max(1, Math.floor(visualTop / pageWithGaps) + 1));
      setCurrentPage(page);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [scale, dims.hPX, pageCount]);

  const totalScaledHeight = pageCount * dims.hPX + (pageCount - 1) * 40;

  return (
    <div ref={containerRef} className="h-full overflow-y-auto relative" style={{ backgroundColor: "#f3f4f6" }}>
      <div className="flex justify-center py-8 px-6">
        <div
          style={{
            width: `${dims.wPX}px`,
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            marginBottom: `${-(1 - scale) * totalScaledHeight}px`,
          }}
        >
          <div
            ref={hiddenFlowRef}
            id={pdfTargetId}
            style={{
              position: "absolute",
              width: `${dims.wPX}px`,
              left: 0,
              top: 0,
              opacity: 0,
              pointerEvents: "none",
              zIndex: -1,
            }}
          >
            <A4Page data={data} customize={customize} />
          </div>

          {Array.from({ length: pageCount }, (_, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 0", gap: "8px", background: "#f3f4f6", position: "relative", zIndex: 2 }}>
                  <div style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px)" }} />
                  <Scissors style={{ width: "14px", height: "14px", color: "#9ca3af", transform: "rotate(180deg)" }} />
                  <div style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px)" }} />
                </div>
              )}

              <div
                className="shadow-2xl rounded-sm"
                style={{
                  width: `${dims.wPX}px`,
                  height: `${dims.hPX}px`,
                  overflow: "hidden",
                  backgroundColor: customize?.a4Background || "#ffffff",
                }}
              >
                <div style={{ width: `${dims.wPX}px`, transform: `translateY(${-i * dims.hPX}px)` }}>
                  <A4Page data={data} customize={customize} onEditSection={onEditSection} />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

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

          <div className="w-px h-4 bg-gray-200 mx-0.5" />
          <span className="text-xs text-gray-500 px-1.5">Page {currentPage} of {pageCount}</span>
        </div>
      </div>
    </div>
  );
});
