import React, { useRef, useState, useEffect, useMemo } from "react";
import DOMPurify from "dompurify";
import { Mail, Phone, MapPin, Flag, FileText } from "lucide-react";
import { ResumeData } from "./types";
import { CustomizeSettings } from "./customizeTypes";
import { cn } from "@/lib/utils";

/* ── A4 dimensions (mm → px at 96 DPI: 1mm ≈ 3.7795px) ──────── */
const A4_W_MM = 210;
const A4_H_MM = 297;
const PX_PER_MM = 3.7795;
const A4_W = A4_W_MM * PX_PER_MM; // ~793.7
const A4_H = A4_H_MM * PX_PER_MM; // ~1122.5

interface ResumePreviewProps {
  data: ResumeData;
  customize?: CustomizeSettings;
  pdfTargetId?: string;
}

/* ── helper: format date range ─────────────────────────────── */
function fmtDateRange(f: Record<string, string>): string {
  const s = [f.startMonth?.slice(0, 3), f.startYear].filter(Boolean).join(" ");
  const e = f.currentlyHere === "true" ? "Present" : [f.endMonth?.slice(0, 3), f.endYear].filter(Boolean).join(" ");
  return [s, e].filter(Boolean).join(" – ");
}

/* ── HTML content renderer ─────────────────────────────────── */
function Html({ html }: { html: string }) {
  if (!html || html === "<p></p>") return null;
  return (
    <div
      className="mt-[1mm] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_li]:mb-[0.5mm] [&_a]:text-blue-700 [&_a]:underline"
      style={{ fontSize: "9pt", lineHeight: 1.45, color: "#374151" }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}

/* ── Section heading ───────────────────────────────────────── */
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-[2mm]">
      <h2
        className="uppercase font-bold tracking-[0.08em]"
        style={{ fontSize: "10pt", color: "#111827" }}
      >
        {title}
      </h2>
      <div className="mt-[0.8mm] h-[0.4mm] bg-gray-800 w-full" />
    </div>
  );
}

/* ── The A4 page content ───────────────────────────────────── */
const A4Page = React.memo(function A4Page({ data, customize }: { data: ResumeData; customize?: CustomizeSettings }) {
  const { personalDetails: p, sections } = data;
  const c = customize;

  const cssVars = useMemo(() => ({
    "--resume-font-size": `${c?.fontSize ?? 11}pt`,
    "--resume-line-height": `${c?.lineHeight ?? 1.5}`,
    "--resume-margin-x": `${c?.marginX ?? 16}mm`,
    "--resume-margin-y": `${c?.marginY ?? 16}mm`,
    "--resume-section-spacing": `${c?.sectionSpacing ?? 5}mm`,
    "--resume-accent": c?.accentColor ?? "#1e293b",
  } as React.CSSProperties), [c?.fontSize, c?.lineHeight, c?.marginX, c?.marginY, c?.sectionSpacing, c?.accentColor]);

  const isTwo = c?.columns === "two" || c?.columns === "mix";
  const sidebarCols = c?.columnRatio ?? 4;

  const contactItems = [
    p.email && { icon: <Mail className="w-[3mm] h-[3mm]" />, text: p.email },
    p.phone && { icon: <Phone className="w-[3mm] h-[3mm]" />, text: p.phone },
    p.location && { icon: <MapPin className="w-[3mm] h-[3mm]" />, text: p.location },
    ...p.extras.map((e) => ({
      icon: e.type === "Nationality" || e.type === "Visa"
        ? <Flag className="w-[3mm] h-[3mm]" />
        : <FileText className="w-[3mm] h-[3mm]" />,
      text: e.value,
    })),
  ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

  /* Split sections for two-column layout */
  const sidebarTypes = new Set(["skills", "languages", "interests", "certificates"]);
  const sidebarSections = isTwo ? sections.filter(s => sidebarTypes.has(s.type)) : [];
  const mainSections = isTwo ? sections.filter(s => !sidebarTypes.has(s.type)) : sections;

  const renderSections = (secs: typeof sections) => secs.map((section) => (
    <div key={section.id} style={{ marginBottom: "var(--resume-section-spacing)" }}>
      <SectionHeading title={
        section.type === "custom" && section.entries[0]?.fields.sectionTitle
          ? section.entries[0].fields.sectionTitle
          : section.title
      } />
      {renderSectionContent(section)}
    </div>
  ));

  return (
    <div
      className="bg-white text-gray-900"
      style={{
        ...cssVars,
        width: `${A4_W_MM}mm`,
        minHeight: `${A4_H_MM}mm`,
        padding: "var(--resume-margin-y) var(--resume-margin-x)",
        fontFamily: c?.bodyFont || "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif",
        fontSize: "var(--resume-font-size)",
        lineHeight: "var(--resume-line-height)",
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="text-center mb-[4mm]">
        <h1
          className="font-bold uppercase tracking-[0.12em]"
          style={{ fontSize: "20pt", color: "#111827" }}
        >
          {p.fullName || "YOUR NAME"}
        </h1>
        {p.professionalTitle && (
          <p className="mt-[1mm]" style={{ fontSize: "11pt", color: "#6B7280" }}>
            {p.professionalTitle}
          </p>
        )}

        {contactItems.length > 0 && (
          <div
            className="flex items-center justify-center flex-wrap mt-[2.5mm] gap-x-[4mm] gap-y-[1mm]"
            style={{ fontSize: "8pt", color: "#4B5563" }}
          >
            {contactItems.map((item, i) => (
              <span key={i} className="flex items-center gap-[1mm]">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Divider ────────────────────────────────────────── */}
      <div className="h-[0.3mm] bg-gray-300 mb-[5mm]" />

      {/* ── Sections ───────────────────────────────────────── */}
      {isTwo ? (
        <div style={{ display: "grid", gridTemplateColumns: `${sidebarCols}fr ${12 - sidebarCols}fr`, gap: "var(--resume-section-spacing)" }}>
          <div>{renderSections(sidebarSections)}</div>
          <div>{renderSections(mainSections)}</div>
        </div>
      ) : (
        renderSections(mainSections)
      )}

      {/* Empty state */}
      {sections.length === 0 && !p.fullName && (
        <div className="text-center py-[30mm]" style={{ color: "#9CA3AF", fontSize: "11pt" }}>
          Add content to see your resume here
        </div>
      )}
    </div>
  );

  function renderSectionContent(section: typeof sections[0]) {
    return (
      <>
        {section.type === "summary" && section.entries[0]?.fields.description && (
          <Html html={section.entries[0].fields.description} />
        )}
        {section.type === "skills" && section.entries[0]?.fields.skills && (
          <div className="flex flex-wrap gap-[1.5mm] mt-[1mm]">
            {section.entries[0].fields.skills.split(",").filter(Boolean).map((s, i) => (
              <span key={i} className="px-[2.5mm] py-[0.8mm] rounded-full border border-gray-300 bg-white" style={{ fontSize: "8pt", color: "#374151" }}>{s.trim()}</span>
            ))}
          </div>
        )}
        {section.type === "experience" && section.entries.map((entry) => {
          const f = entry.fields;
          return (
            <div key={entry.id} className="mb-[3mm]">
              <div className="flex justify-between items-baseline">
                <div><span className="font-bold" style={{ color: "#111827" }}>{f.company || ""}</span>{f.position && <span className="italic text-gray-700">{f.company ? ", " : ""}{f.position}</span>}</div>
                <div className="flex-shrink-0 text-right" style={{ fontSize: "8pt", color: "#6B7280" }}>{fmtDateRange(f)}{f.location && <>{fmtDateRange(f) ? " | " : ""}{f.location}</>}</div>
              </div>
              <Html html={f.description || ""} />
            </div>
          );
        })}
        {section.type === "education" && section.entries.map((entry) => {
          const f = entry.fields;
          return (
            <div key={entry.id} className="mb-[3mm]">
              <div className="flex justify-between items-baseline">
                <div><span className="font-bold" style={{ color: "#111827" }}>{f.institution || ""}</span>{f.degree && <span className="italic text-gray-700">{f.institution ? ", " : ""}{f.degree}</span>}</div>
                <div className="flex-shrink-0 text-right" style={{ fontSize: "8pt", color: "#6B7280" }}>{fmtDateRange(f)}{f.location && <>{fmtDateRange(f) ? " | " : ""}{f.location}</>}</div>
              </div>
              <Html html={f.description || ""} />
            </div>
          );
        })}
        {section.type === "languages" && (
          <div className="grid grid-cols-2 gap-x-[6mm] gap-y-[2mm] mt-[1mm]">
            {section.entries.map((entry) => (
              <div key={entry.id}>
                <p className="font-semibold" style={{ color: "#111827" }}>{entry.fields.language}</p>
                <p style={{ fontSize: "8pt", color: "#6B7280" }}>{entry.fields.proficiency}</p>
              </div>
            ))}
          </div>
        )}
        {section.type === "interests" && section.entries[0]?.fields.interests && (
          <p className="mt-[1mm]" style={{ color: "#374151" }}>{section.entries[0].fields.interests.split(",").filter(Boolean).map(s => s.trim()).join("  ·  ")}</p>
        )}
        {["certificates", "courses", "awards", "projects", "organisations", "publications"].includes(section.type) && section.entries.map((entry) => {
          const f = entry.fields;
          const dateStr = fmtDateRange(f) || f.date || "";
          return (
            <div key={entry.id} className="mb-[2.5mm]">
              <div className="flex justify-between items-baseline">
                <span className="font-bold" style={{ color: "#111827" }}>{f.name || f.title || ""}</span>
                {dateStr && <span style={{ fontSize: "8pt", color: "#6B7280" }}>{dateStr}</span>}
              </div>
              {(f.issuer || f.institution || f.publisher || f.role) && <p className="italic" style={{ fontSize: "8.5pt", color: "#6B7280" }}>{f.issuer || f.institution || f.publisher || f.role}</p>}
              {f.url && <p style={{ fontSize: "7.5pt", color: "#2563EB" }}>{f.url}</p>}
              <Html html={f.description || ""} />
            </div>
          );
        })}
        {section.type === "references" && section.entries.map((entry) => {
          const f = entry.fields;
          return (
            <div key={entry.id} className="mb-[2mm]">
              <span className="font-bold">{f.name}</span>
              {f.position && <span style={{ color: "#6B7280" }}> — {f.position}</span>}
              {f.company && <span style={{ color: "#6B7280" }}>, {f.company}</span>}
              {f.relationship && <span style={{ fontSize: "8pt", color: "#9CA3AF" }}> ({f.relationship})</span>}
              {(f.email || f.phone) && <p style={{ fontSize: "8pt", color: "#6B7280" }}>{[f.email, f.phone].filter(Boolean).join("  ·  ")}</p>}
            </div>
          );
        })}
        {section.type === "declaration" && section.entries[0] && (() => {
          const f = section.entries[0].fields;
          return (
            <div>
              {f.fullName && <p className="font-semibold mt-[2mm]">{f.fullName}</p>}
              {(f.place || f.date) && <p style={{ color: "#6B7280" }}>{[f.place, f.date].filter(Boolean).join(", ")}</p>}
            </div>
          );
        })()}
        {section.type === "custom" && section.entries[0] && <Html html={section.entries[0].fields.description || ""} />}
      </>
    );
  }
});

/* ═══════════════════════════════════════════════════════════════
   Main Preview wrapper — handles scaling, page indicator, thumbnail
   ═══════════════════════════════════════════════════════════════ */
export const ResumePreview = React.memo(function ResumePreview({ data, customize, pdfTargetId }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.65);
  const [pageCount, setPageCount] = useState(1);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // Debounce data for preview rendering (100ms)
  const [debouncedData, setDebouncedData] = useState(data);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedData(data), 100);
    return () => clearTimeout(t);
  }, [data]);

  /* Responsive scaling: fit page to container width */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const s = Math.min((w - 48) / A4_W, 0.85); // 48px padding
        setScale(Math.max(s, 0.35));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Estimate page count from rendered height */
  useEffect(() => {
    if (!pageRef.current) return;
    const h = pageRef.current.scrollHeight;
    setPageCount(Math.max(1, Math.ceil(h / A4_H)));
  }, [debouncedData]);

  const thumbScale = 0.08;

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto relative"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Scaled A4 page */}
      <div className="flex justify-center py-8 px-6">
        <div
          style={{
            width: `${A4_W}px`,
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            marginBottom: `${-(1 - scale) * A4_H}px`,
          }}
        >
          <div
            ref={pageRef}
            id={pdfTargetId}
            className="shadow-2xl rounded-sm"
            style={{
              width: `${A4_W}px`,
              height: `${A4_H}px`,
              overflow: "hidden",
            }}
          >
            <A4Page data={debouncedData} customize={customize} />
          </div>
        </div>
      </div>

      {/* Page indicator */}
      {pageCount >= 1 && (
        <div className="sticky bottom-4 flex justify-center pointer-events-none z-10">
          <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-200">
            1 / {pageCount}
          </span>
        </div>
      )}

      {/* Thumbnail navigator */}
      {showThumbnail && (
        <div
          className="fixed bottom-6 right-6 z-20 cursor-pointer group"
          onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
          title="Scroll to top"
        >
          <div
            className="bg-white rounded shadow-lg border border-gray-200 overflow-hidden group-hover:shadow-xl transition-shadow"
            style={{
              width: `${A4_W * thumbScale}px`,
              height: `${A4_H * thumbScale}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${thumbScale})`,
                transformOrigin: "top left",
                width: `${A4_W}px`,
                height: `${A4_H}px`,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <A4Page data={debouncedData} customize={customize} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
