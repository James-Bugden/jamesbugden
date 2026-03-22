/**
 * True PDF resume document built with @react-pdf/renderer.
 * Mirrors the visual output of ResumePreview.tsx as closely as possible.
 */
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData, ResumeSection } from "@/components/resume-builder/types";
import { CustomizeSettings } from "@/components/resume-builder/customizeTypes";
import { htmlToRichText } from "./htmlToRichText";
import { toPdfFont, toPdfFontBold } from "./fontMap";

/* ── Page sizes ────────────────────────────── */
const PAGE_SIZES: Record<string, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

/* ── Helpers ───────────────────────────────── */
function formatDate(month?: string, year?: string): string {
  if (!month && !year) return "";
  if (month && year) return `${month.slice(0, 3)} ${year}`;
  return year || month || "";
}

function dateRange(fields: Record<string, string>): string {
  const start = formatDate(fields.startMonth, fields.startYear);
  const end = fields.currentlyHere === "true" ? "Present" : formatDate(fields.endMonth, fields.endYear);
  if (!start && !end) return fields.date || "";
  if (!end) return start;
  return `${start} – ${end}`;
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

/* ── Color helpers ─────────────────────────── */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function mixWithWhite(hex: string, pct: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const mix = (c: number) => Math.round(c * pct + 255 * (1 - pct));
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(mix(rgb.r))}${toHex(mix(rgb.g))}${toHex(mix(rgb.b))}`;
}

/* ── Main component ───────────────────────── */
interface Props {
  data: ResumeData;
  customize: CustomizeSettings;
}

export function ResumePdfDocument({ data, customize }: Props) {
  const c = customize;
  const pageSize = PAGE_SIZES[c.pageFormat || "a4"] || PAGE_SIZES.a4;
  const marginX = Math.max(c.marginX || 16, 8) * 2.835;
  const marginY = Math.max(c.marginY || 7, 4) * 2.835;
  const baseFontSize = c.fontSize || 11;
  const lineHeight = c.lineHeight || 1.2;
  const bodyFont = toPdfFont(c.bodyFont || "'Lora', serif");
  const boldFont = toPdfFontBold(bodyFont);
  const headingFont = toPdfFont(c.headingFont || c.bodyFont || "'Lora', serif");
  const headingBoldFont = toPdfFontBold(headingFont);

  const accentColor = c.accentColor || "#1e293b";
  const nameColor = c.nameColor || "#111827";
  const titleColor = c.titleColor || "#6B7280";
  const headingsColor = c.headingsColor || "#111827";
  const datesColor = c.datesColor || "#6B7280";
  const subtitleColor = c.subtitleColor || "#6B7280";
  const bodyColor = c.bodyColor || "#374151";
  const bgColor = c.a4Background || "#ffffff";

  const sectionSpacing = (c.sectionSpacing || 5) * 2.835;

  // Name size
  const nameSizes: Record<string, number> = { xs: 14, s: 20, m: 24, l: 28, xl: 32 };
  const nameSize = nameSizes[c.nameSize || "s"] || 20;
  const titleSizes: Record<string, number> = { s: 9, m: 11, l: 13 };
  const titleFontSize = titleSizes[c.titleSize || "m"] || 11;

  // Heading size
  const headingSizeOffsets: Record<string, number> = { s: -1.5, m: -0.5, l: 1.5, xl: 3.5 };
  const headingFontSize = baseFontSize + (headingSizeOffsets[c.headingSize || "m"] ?? -0.5);

  const bodyFontSize = baseFontSize - 1.5;
  const dateFontSize = baseFontSize - 2.5;
  const contactFontSize = baseFontSize - 2.5;
  const skillFontSize = baseFontSize - 2;

  const entryTitleOffsets: Record<string, number> = { xs: -2.5, s: -2, m: -1.5, l: -0.5 };
  const entryTitleSize = baseFontSize + (entryTitleOffsets[c.titleSubtitleSize || "m"] ?? -1.5);
  const entrySubtitleOffsets: Record<string, number> = { xs: -3.5, s: -3, m: -2.5, l: -1.5 };
  const entrySubtitleSize = baseFontSize + (entrySubtitleOffsets[c.titleSubtitleSize || "m"] ?? -2.5);

  const pd = data.personalDetails;

  // Section ordering
  const orderedSections = normalizeSectionOrder(data.sections || [], c);

  // Two-column support
  const isTwoColumn = c.columns === "two" || c.columns === "mix";
  const sidebarTypes = new Set(["skills", "languages", "interests", "certificates", "courses", "awards"]);
  const sidebarSections = isTwoColumn ? orderedSections.filter((s) => sidebarTypes.has(s.type)) : [];
  const mainSections = isTwoColumn ? orderedSections.filter((s) => !sidebarTypes.has(s.type)) : orderedSections;

  const richTextOpts = {
    fontSize: bodyFontSize,
    color: bodyColor,
    lineHeight,
    linkColor: c.linkBlue ? "#2563eb" : bodyColor,
    bulletChar: c.listStyle === "hyphen" ? "–" : "•",
  };

  const subtitleFW = c.subtitleStyle === "bold" ? boldFont : bodyFont;
  const subtitleIsItalic = c.subtitleStyle === "italic";
  const subPlace = c.subtitlePlacement || "next-line";

  /* ── Section heading ─────────────────────── */
  function renderHeading(title: string): React.ReactNode {
    const style = c.headingStyle || "underline";
    const uppercase = c.headingUppercase !== false;
    const textStyle = {
      fontSize: headingFontSize,
      fontFamily: headingBoldFont,
      color: style === "background" ? "#ffffff" : headingsColor,
      textTransform: uppercase ? ("uppercase" as const) : ("none" as const),
      letterSpacing: 0.8,
    };

    if (style === "plain") {
      return <Text style={{ ...textStyle, marginBottom: 4 }}>{title}</Text>;
    }
    if (style === "underline") {
      return (
        <View style={{ marginBottom: 4 }}>
          <Text style={textStyle}>{title}</Text>
          <View style={{ height: 0.5, backgroundColor: accentColor, marginTop: 2 }} />
        </View>
      );
    }
    if (style === "full-underline") {
      return (
        <Text style={{ ...textStyle, marginBottom: 4, paddingBottom: 2, borderBottomWidth: 0.7, borderBottomColor: accentColor }}>
          {title}
        </Text>
      );
    }
    if (style === "left-accent") {
      return (
        <View style={{ marginBottom: 4, flexDirection: "row", alignItems: "center", gap: 4 }}>
          <View style={{ width: 2.5, height: 10, borderRadius: 1.5, backgroundColor: accentColor }} />
          <Text style={textStyle}>{title}</Text>
        </View>
      );
    }
    if (style === "background") {
      return (
        <View style={{ marginBottom: 4 }}>
          <Text style={{ ...textStyle, backgroundColor: accentColor, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 1.5 }}>
            {title}
          </Text>
        </View>
      );
    }
    // left-border
    return (
      <View style={{ marginBottom: 4, paddingLeft: 6, borderLeftWidth: 2, borderLeftColor: accentColor }}>
        <Text style={textStyle}>{title}</Text>
      </View>
    );
  }

  /* ── Patterned entries (experience, education, projects, etc.) ── */
  function renderPatternedEntry(section: ResumeSection): React.ReactNode {
    return section.entries.map((entry) => {
      const f = entry.fields;
      const hasAny = Object.values(f).some(Boolean);
      if (!hasAny) return null;

      let primaryText: string;
      let secondaryText: string | undefined;

      if (section.type === "education") {
        const order = c.educationOrder ?? "degree-first";
        primaryText = order === "degree-first" ? (f.degree || "") : (f.institution || "");
        secondaryText = order === "degree-first" ? (f.institution || "") : (f.degree || "");
      } else if (section.type === "experience") {
        const order = c.experienceOrder ?? "title-first";
        primaryText = order === "title-first" ? (f.position || "") : (f.company || "");
        secondaryText = order === "title-first" ? (f.company || "") : (f.position || "");
      } else {
        primaryText = f.name || f.title || "";
        secondaryText = f.company || f.institution || f.issuer || f.publisher || f.role || "";
      }

      const date = dateRange(f);

      return (
        <View key={entry.id} style={{ marginBottom: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              {subPlace === "same-line" ? (
                <Text>
                  <Text style={{ fontSize: entryTitleSize, fontFamily: boldFont, color: nameColor }}>{primaryText || "Entry"}</Text>
                  {secondaryText ? (
                    <Text style={{ fontSize: entrySubtitleSize, fontFamily: subtitleFW, fontStyle: subtitleIsItalic ? "italic" : "normal", color: subtitleColor }}> · {secondaryText}</Text>
                  ) : null}
                </Text>
              ) : (
                <>
                  <Text style={{ fontSize: entryTitleSize, fontFamily: boldFont, color: nameColor }}>{primaryText || "Entry"}</Text>
                  {secondaryText ? (
                    <Text style={{ fontSize: entrySubtitleSize, fontFamily: subtitleFW, fontStyle: subtitleIsItalic ? "italic" : "normal", color: subtitleColor, marginTop: 1 }}>{secondaryText}</Text>
                  ) : null}
                </>
              )}
            </View>
            {date ? <Text style={{ fontSize: entrySubtitleSize, color: datesColor, textAlign: "right" }}>{date}</Text> : null}
          </View>
          {f.location && (
            <Text style={{ fontSize: entrySubtitleSize, fontFamily: subtitleFW, fontStyle: subtitleIsItalic ? "italic" : "normal", color: subtitleColor, marginTop: 1 }}>{f.location}</Text>
          )}
          {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
        </View>
      );
    });
  }

  /* ── Render sections ─────────────────────── */
  function renderSection(section: ResumeSection): React.ReactNode {
    const { type, title, entries, showHeading } = section;
    const sectionTitle = type === "custom" && entries?.[0]?.fields?.sectionTitle
      ? entries[0].fields.sectionTitle
      : title;

    // Summary
    if (type === "summary") {
      return (
        <View key={section.id} style={{ marginBottom: sectionSpacing }}>
          {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
          {entries.map((e) => (
            <View key={e.id}>{htmlToRichText(e.fields.description || "", richTextOpts)}</View>
          ))}
        </View>
      );
    }

    // Skills
    if (type === "skills") {
      const raw = entries?.[0]?.fields?.skills || "";
      const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
      if (!items.length) return null;

      const layout = (section as any).layout || c.skillsDisplay || "bubble";
      const sep = (section as any).separator || c.skillsSeparator || "bullet";
      const subStyle = (section as any).subtitleStyle || "dash";

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

      let content: React.ReactNode;

      if (layout === "grid") {
        content = (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 3 }}>
            {items.map((item, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 2, width: "30%" }}>
                {sep !== "newline" && sep !== "none" && (
                  <Text style={{ fontSize: skillFontSize, color: accentColor }}>{sep === "pipe" ? "|" : "·"}</Text>
                )}
                <Text style={{ fontSize: skillFontSize, color: bodyColor }}>{formatItem(item)}</Text>
              </View>
            ))}
          </View>
        );
      } else if (layout === "compact") {
        if (sep === "newline") {
          content = (
            <View style={{ marginTop: 3 }}>
              {items.map((item, i) => (
                <Text key={i} style={{ fontSize: skillFontSize, color: bodyColor, marginBottom: 1.5 }}>{formatItem(item)}</Text>
              ))}
            </View>
          );
        } else {
          content = (
            <Text style={{ fontSize: skillFontSize, color: bodyColor, marginTop: 3 }}>{items.map(formatItem).join(sepChar)}</Text>
          );
        }
      } else {
        // bubble (default)
        const bubbleBg = mixWithWhite(accentColor, 0.1);
        const bubbleBorder = mixWithWhite(accentColor, 0.25);
        content = (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 3 }}>
            {items.map((item, i) => (
              <Text key={i} style={{
                fontSize: skillFontSize,
                color: bodyColor,
                backgroundColor: bubbleBg,
                borderWidth: 0.5,
                borderColor: bubbleBorder,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}>{formatItem(item)}</Text>
            ))}
          </View>
        );
      }

      return (
        <View key={section.id} style={{ marginBottom: sectionSpacing }}>
          {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
          {content}
        </View>
      );
    }

    // Languages
    if (type === "languages") {
      const langDisplay = (section as any).layout || c.languagesDisplay || "grid";
      const sep = (section as any).separator || c.languagesSeparator || "bullet";
      const subStyle = (section as any).subtitleStyle || "dash";
      const sepChar = sep === "pipe" ? " | " : sep === "none" ? "  " : " · ";

      const formatLangLabel = (lang: string, prof: string) => {
        if (!prof) return lang;
        if (subStyle === "dash") return `${lang} — ${prof}`;
        if (subStyle === "bracket") return `${lang} (${prof})`;
        return `${lang}: ${prof}`;
      };

      const validEntries = entries.filter((e) => e.fields.language?.trim() || e.fields.proficiency?.trim());

      let content: React.ReactNode;

      if (langDisplay === "compact") {
        if (sep === "newline") {
          content = (
            <View style={{ marginTop: 3 }}>
              {validEntries.map((e) => (
                <Text key={e.id} style={{ fontSize: skillFontSize, color: bodyColor, marginBottom: 1.5 }}>
                  {formatLangLabel(e.fields.language?.trim() || "", e.fields.proficiency?.trim() || "")}
                </Text>
              ))}
            </View>
          );
        } else {
          content = (
            <Text style={{ fontSize: skillFontSize, color: bodyColor, marginTop: 3 }}>
              {validEntries.map((e) => formatLangLabel(e.fields.language?.trim() || "", e.fields.proficiency?.trim() || "")).join(sepChar)}
            </Text>
          );
        }
      } else if (langDisplay === "bubble") {
        const bubbleBg = mixWithWhite(accentColor, 0.1);
        const bubbleBorder = mixWithWhite(accentColor, 0.25);
        content = (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 3 }}>
            {validEntries.map((e) => (
              <Text key={e.id} style={{
                fontSize: skillFontSize,
                color: bodyColor,
                backgroundColor: bubbleBg,
                borderWidth: 0.5,
                borderColor: bubbleBorder,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}>
                {formatLangLabel(e.fields.language?.trim() || "", e.fields.proficiency?.trim() || "")}
              </Text>
            ))}
          </View>
        );
      } else {
        // grid (default) — language left, proficiency right
        content = (
          <View style={{ marginTop: 3 }}>
            {validEntries.map((e) => (
              <View key={e.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                <Text style={{ fontSize: bodyFontSize, color: bodyColor, fontFamily: boldFont }}>{e.fields.language?.trim() || "Language"}</Text>
                <Text style={{ fontSize: dateFontSize, color: datesColor }}>{e.fields.proficiency?.trim()}</Text>
              </View>
            ))}
          </View>
        );
      }

      return (
        <View key={section.id} style={{ marginBottom: sectionSpacing }}>
          {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
          {content}
        </View>
      );
    }

    // Interests (tag-based like skills)
    if (type === "interests") {
      const allTags = entries.flatMap((e) =>
        (e.fields.interests || "").split(",").map((t) => t.trim()).filter(Boolean)
      );
      if (!allTags.length) return null;
      const bubbleBg = mixWithWhite(accentColor, 0.1);
      const bubbleBorder = mixWithWhite(accentColor, 0.25);
      return (
        <View key={section.id} style={{ marginBottom: sectionSpacing }}>
          {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 3 }}>
            {allTags.map((tag, i) => (
              <Text key={i} style={{
                fontSize: skillFontSize,
                color: bodyColor,
                backgroundColor: bubbleBg,
                borderWidth: 0.5,
                borderColor: bubbleBorder,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}>{tag}</Text>
            ))}
          </View>
        </View>
      );
    }

    // References
    if (type === "references") {
      return (
        <View key={section.id} style={{ marginBottom: sectionSpacing }}>
          {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
          {entries.map((e) => {
            const f = e.fields;
            return (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: bodyFontSize, fontFamily: boldFont, color: nameColor }}>{f.name}</Text>
                {(f.position || f.company) && (
                  <Text style={{ fontSize: dateFontSize, color: subtitleColor }}>
                    {[f.position, f.company].filter(Boolean).join(" · ")}
                  </Text>
                )}
                {(f.phone || f.email) && (
                  <Text style={{ fontSize: dateFontSize, color: datesColor }}>
                    {[f.phone, f.email].filter(Boolean).join(" · ")}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      );
    }

    // Patterned types
    const patternedTypes = new Set(["experience", "education", "courses", "certificates", "projects", "awards", "organisations", "publications"]);
    if (patternedTypes.has(type)) {
      return (
        <View key={section.id} style={{ marginBottom: sectionSpacing }}>
          {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
          {renderPatternedEntry(section)}
        </View>
      );
    }

    // Custom / fallback
    return (
      <View key={section.id} style={{ marginBottom: sectionSpacing }}>
        {showHeading !== false && sectionTitle && renderHeading(sectionTitle)}
        {entries.map((e) => (
          <View key={e.id}>
            {e.fields.description && htmlToRichText(e.fields.description, richTextOpts)}
          </View>
        ))}
      </View>
    );
  }

  /* ── Contact items ───────────────────────── */
  const contactParts: string[] = [];
  if (pd.email) contactParts.push(pd.email);
  if (pd.phone) contactParts.push(pd.phone);
  if (pd.location) contactParts.push(pd.location);
  pd.extras?.forEach((ex) => { if (ex.value) contactParts.push(ex.value); });

  const sepMode = c.contactSeparator || "bar";
  const sep = sepMode === "bullet" ? " · " : " | ";

  const headerAlign = c.headerAlign === "center" ? "center" as const : c.headerAlign === "right" ? "flex-end" as const : "flex-start" as const;

  // Header divider line color (accent 20% mixed with #d1d5db)
  const headerLineColor = mixWithWhite(accentColor, 0.2);

  /* ── Column ratio ────────────────────────── */
  const ratio = Math.min(8, Math.max(3, c.columnRatio || 4));
  const sidebarPct = `${(ratio / 12) * 100}%`;
  const mainPct = `${((12 - ratio) / 12) * 100}%`;

  return (
    <Document title={pd.fullName ? `${pd.fullName} Resume` : "Resume"} author={pd.fullName || ""}>
      <Page size={pageSize} style={{
        paddingTop: marginY,
        paddingBottom: marginY + (c.showPageNumbers ? 14 : 0),
        paddingLeft: marginX,
        paddingRight: marginX,
        fontFamily: bodyFont,
        fontSize: bodyFontSize,
        color: bodyColor,
        backgroundColor: bgColor,
        lineHeight,
      }} wrap>
        {/* Header */}
        <View style={{ alignItems: headerAlign, marginBottom: 10 }}>
          {pd.fullName ? (
            <Text style={{
              fontSize: nameSize,
              fontFamily: c.nameBold !== false ? boldFont : bodyFont,
              color: nameColor,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 4,
            }}>{pd.fullName}</Text>
          ) : null}
          {pd.professionalTitle ? (
            <Text style={{ fontSize: titleFontSize, color: titleColor, marginBottom: 4 }}>{pd.professionalTitle}</Text>
          ) : null}
          {contactParts.length > 0 && (
            <Text style={{ fontSize: contactFontSize, color: datesColor }}>
              {contactParts.join(sep)}
            </Text>
          )}
        </View>

        {/* Header divider line */}
        <View style={{ height: 0.4, backgroundColor: headerLineColor, marginBottom: sectionSpacing }} />

        {/* Sections */}
        {isTwoColumn ? (
          <View style={{ flexDirection: "row", gap: sectionSpacing }}>
            {/* Sidebar */}
            <View style={{ width: sidebarPct }}>
              {sidebarSections.map((section) => renderSection(section))}
            </View>
            {/* Main */}
            <View style={{ width: mainPct }}>
              {mainSections.map((section) => renderSection(section))}
            </View>
          </View>
        ) : (
          <>
            {mainSections.map((section) => renderSection(section))}
          </>
        )}

        {/* Page numbers */}
        {c.showPageNumbers && (
          <Text
            style={{
              position: "absolute",
              bottom: marginY / 2,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 8,
              color: "#9ca3af",
            }}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        )}
      </Page>
    </Document>
  );
}
