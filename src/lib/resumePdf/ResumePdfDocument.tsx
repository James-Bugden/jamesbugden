/**
 * True PDF resume document built with @react-pdf/renderer.
 * Generates a real text PDF from ResumeData + CustomizeSettings.
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
  if (!start && !end) return "";
  if (!end) return start;
  return `${start} – ${end}`;
}

interface Props {
  data: ResumeData;
  customize: CustomizeSettings;
}

export function ResumePdfDocument({ data, customize }: Props) {
  const c = customize;
  const pageSize = PAGE_SIZES[c.pageFormat || "a4"] || PAGE_SIZES.a4;
  const marginX = Math.max(c.marginX || 16, 8) * 2.835; // mm to pt
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
  const headingsColor = c.accentApplyHeadings ? accentColor : (c.headingsColor || "#111827");
  const datesColor = c.accentApplyDates ? accentColor : (c.datesColor || "#6B7280");
  const subtitleColor = c.accentApplySubtitle ? accentColor : (c.subtitleColor || "#6B7280");
  const bodyColor = c.bodyColor || "#374151";
  const bgColor = c.a4Background || "#ffffff";
  const lineColor = c.accentApplyLines ? accentColor : headingsColor;

  const sectionSpacing = (c.sectionSpacing || 5) * 1.5;

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

  const entryTitleOffsets: Record<string, number> = { xs: -2.5, s: -2, m: -1.5, l: -0.5 };
  const entryTitleSize = baseFontSize + (entryTitleOffsets[c.titleSubtitleSize || "m"] ?? -1.5);
  const entrySubtitleSize = entryTitleSize - 1;

  const pd = data.personalDetails;

  // Determine section order
  const sections = data.sections || [];

  const richTextOpts = {
    fontSize: bodyFontSize,
    color: bodyColor,
    lineHeight,
    linkColor: c.linkBlue ? "#2563eb" : bodyColor,
    bulletChar: c.listStyle === "hyphen" ? "–" : "•",
  };

  const styles = StyleSheet.create({
    page: {
      paddingTop: marginY,
      paddingBottom: marginY + (c.showPageNumbers ? 14 : 0),
      paddingLeft: marginX,
      paddingRight: marginX,
      fontFamily: bodyFont,
      fontSize: bodyFontSize,
      color: bodyColor,
      backgroundColor: bgColor,
      lineHeight,
    },
    header: {
      alignItems: c.headerAlign === "center" ? "center" : c.headerAlign === "right" ? "flex-end" : "flex-start",
      marginBottom: sectionSpacing,
    },
    name: {
      fontSize: nameSize,
      fontFamily: c.nameBold ? boldFont : bodyFont,
      color: c.accentApplyName ? accentColor : nameColor,
      marginBottom: 2,
    },
    title: {
      fontSize: titleFontSize,
      color: c.accentApplyTitle ? accentColor : titleColor,
      marginBottom: 4,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: c.headerAlign === "center" ? "center" : "flex-start",
      gap: 4,
    },
    contactItem: {
      fontSize: contactFontSize,
      color: bodyColor,
    },
    contactSep: {
      fontSize: contactFontSize,
      color: "#9ca3af",
      marginHorizontal: 3,
    },
    sectionHeading: {
      fontSize: headingFontSize,
      fontFamily: headingBoldFont,
      color: headingsColor,
      textTransform: c.headingUppercase ? "uppercase" : "none",
      marginBottom: 4,
      paddingBottom: c.headingStyle === "underline" || c.headingStyle === "full-underline" ? 2 : 0,
      borderBottomWidth: c.headingStyle === "underline" || c.headingStyle === "full-underline" ? 1 : 0,
      borderBottomColor: lineColor,
    },
    sectionWrap: {
      marginBottom: sectionSpacing,
    },
    entryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: entryTitleSize,
      fontFamily: boldFont,
      color: bodyColor,
    },
    entrySubtitle: {
      fontSize: entrySubtitleSize,
      color: subtitleColor,
      fontStyle: c.subtitleStyle === "italic" ? "italic" : "normal",
      fontFamily: c.subtitleStyle === "bold" ? boldFont : bodyFont,
    },
    dateText: {
      fontSize: dateFontSize,
      color: datesColor,
      textAlign: "right",
    },
    tagGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 2,
    },
    tag: {
      fontSize: bodyFontSize,
      color: bodyColor,
      backgroundColor: "#f3f4f6",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
    },
    pageNumber: {
      position: "absolute",
      bottom: marginY / 2,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 8,
      color: "#9ca3af",
    },
  });

  /* ── Render sections ─────────────────────── */
  function renderSection(section: ResumeSection): React.ReactNode {
    const { type, title, entries, showHeading } = section;

    // Summary
    if (type === "summary") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          {showHeading !== false && title && <Text style={styles.sectionHeading}>{title}</Text>}
          {entries.map((e) => (
            <View key={e.id}>{htmlToRichText(e.fields.description || "", richTextOpts)}</View>
          ))}
        </View>
      );
    }

    // Experience
    if (type === "experience") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            const dates = dateRange(f);
            const primary = c.experienceOrder === "employer-first" ? f.company : f.position;
            const secondary = c.experienceOrder === "employer-first" ? f.position : f.company;
            return (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{primary}</Text>
                  {dates ? <Text style={styles.dateText}>{dates}</Text> : null}
                </View>
                {(secondary || f.location) && (
                  <Text style={styles.entrySubtitle}>
                    {secondary}{secondary && f.location ? ` · ${f.location}` : f.location || ""}
                  </Text>
                )}
                {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
              </View>
            );
          })}
        </View>
      );
    }

    // Education
    if (type === "education") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            const dates = dateRange(f);
            const primary = c.educationOrder === "school-first" ? f.institution : f.degree;
            const secondary = c.educationOrder === "school-first" ? f.degree : f.institution;
            return (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{primary}</Text>
                  {dates ? <Text style={styles.dateText}>{dates}</Text> : null}
                </View>
                {(secondary || f.location) && (
                  <Text style={styles.entrySubtitle}>
                    {secondary}{secondary && f.location ? ` · ${f.location}` : f.location || ""}
                  </Text>
                )}
                {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
              </View>
            );
          })}
        </View>
      );
    }

    // Skills / Interests (tag-based)
    if (type === "skills" || type === "interests") {
      const fieldKey = type === "skills" ? "skills" : "interests";
      const allTags = entries.flatMap((e) =>
        (e.fields[fieldKey] || "").split(",").map((t) => t.trim()).filter(Boolean)
      );
      if (!allTags.length) return null;
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          <View style={styles.tagGrid}>
            {allTags.map((tag, i) => (
              <Text key={i} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      );
    }

    // Languages
    if (type === "languages") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          <View style={styles.tagGrid}>
            {entries.map((e) => {
              const lang = e.fields.language;
              const prof = e.fields.proficiency;
              if (!lang) return null;
              return (
                <Text key={e.id} style={styles.tag}>
                  {lang}{prof ? ` – ${prof}` : ""}
                </Text>
              );
            })}
          </View>
        </View>
      );
    }

    // Certificates
    if (type === "certificates") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            return (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{f.name}</Text>
                  {f.date ? <Text style={styles.dateText}>{f.date}</Text> : null}
                </View>
                {f.issuer && <Text style={styles.entrySubtitle}>{f.issuer}</Text>}
              </View>
            );
          })}
        </View>
      );
    }

    // Projects
    if (type === "projects") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            const dates = dateRange(f);
            return (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{f.name}</Text>
                  {dates ? <Text style={styles.dateText}>{dates}</Text> : null}
                </View>
                {f.role && <Text style={styles.entrySubtitle}>{f.role}</Text>}
                {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
              </View>
            );
          })}
        </View>
      );
    }

    // Awards
    if (type === "awards") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            return (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{f.name}</Text>
                  {f.date ? <Text style={styles.dateText}>{f.date}</Text> : null}
                </View>
                {f.issuer && <Text style={styles.entrySubtitle}>{f.issuer}</Text>}
                {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
              </View>
            );
          })}
        </View>
      );
    }

    // Courses
    if (type === "courses") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            return (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{f.name}</Text>
                  {f.date ? <Text style={styles.dateText}>{f.date}</Text> : null}
                </View>
                {f.institution && <Text style={styles.entrySubtitle}>{f.institution}</Text>}
              </View>
            );
          })}
        </View>
      );
    }

    // Organisations
    if (type === "organisations") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            const dates = dateRange(f);
            return (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{f.name}</Text>
                  {dates ? <Text style={styles.dateText}>{dates}</Text> : null}
                </View>
                {f.role && <Text style={styles.entrySubtitle}>{f.role}</Text>}
                {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
              </View>
            );
          })}
        </View>
      );
    }

    // Publications
    if (type === "publications") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            return (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{f.title}</Text>
                  {f.date ? <Text style={styles.dateText}>{f.date}</Text> : null}
                </View>
                {f.publisher && <Text style={styles.entrySubtitle}>{f.publisher}</Text>}
                {f.description && <View style={{ marginTop: 2 }}>{htmlToRichText(f.description, richTextOpts)}</View>}
              </View>
            );
          })}
        </View>
      );
    }

    // References
    if (type === "references") {
      return (
        <View key={section.id} style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>{title}</Text>
          {entries.map((e) => {
            const f = e.fields;
            return (
              <View key={e.id} style={{ marginBottom: 4 }}>
                <Text style={styles.entryTitle}>{f.name}</Text>
                {(f.position || f.company) && (
                  <Text style={styles.entrySubtitle}>
                    {f.position}{f.position && f.company ? ", " : ""}{f.company}
                  </Text>
                )}
                {f.email && <Text style={{ fontSize: bodyFontSize, color: bodyColor }}>{f.email}</Text>}
                {f.phone && <Text style={{ fontSize: bodyFontSize, color: bodyColor }}>{f.phone}</Text>}
              </View>
            );
          })}
        </View>
      );
    }

    // Custom / fallback — render description
    return (
      <View key={section.id} style={styles.sectionWrap}>
        {title && <Text style={styles.sectionHeading}>{title}</Text>}
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
  pd.extras?.forEach((ex) => { if (ex.value) contactParts.push(`${ex.type}: ${ex.value}`); });

  const sep = c.contactSeparator === "bar" ? " | " : c.contactSeparator === "bullet" ? " • " : " | ";

  return (
    <Document title={pd.fullName ? `${pd.fullName} Resume` : "Resume"} author={pd.fullName || ""}>
      <Page size={pageSize} style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          {pd.fullName ? <Text style={styles.name}>{pd.fullName}</Text> : null}
          {pd.professionalTitle ? <Text style={styles.title}>{pd.professionalTitle}</Text> : null}
          {contactParts.length > 0 && (
            <Text style={styles.contactItem}>
              {contactParts.join(sep)}
            </Text>
          )}
        </View>

        {/* Sections */}
        {sections.map((section) => renderSection(section))}

        {/* Page numbers */}
        {c.showPageNumbers && (
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        )}
      </Page>
    </Document>
  );
}
