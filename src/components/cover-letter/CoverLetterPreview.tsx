import React, { useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Mail, Phone, MapPin, Flag, FileText } from "lucide-react";
import { CoverLetterData, CoverLetterCustomize } from "./types";

const A4_W_MM = 210;
const A4_H_MM = 297;
const PX_PER_MM = 3.7795;
const A4_W = A4_W_MM * PX_PER_MM;
const A4_H = A4_H_MM * PX_PER_MM;

const A4LetterPage = React.memo(function A4LetterPage({ data, customize }: { data: CoverLetterData; customize: CoverLetterCustomize }) {
  const { personalDetails: p, date, recipient, body, signature } = data;

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

  return (
    <div
      className="bg-white text-gray-900"
      style={{
        width: `${A4_W_MM}mm`,
        minHeight: `${A4_H_MM}mm`,
        padding: `${customize.marginY}mm ${customize.marginX}mm`,
        fontFamily: customize.bodyFont,
        fontSize: `${customize.fontSize}pt`,
        lineHeight: customize.lineHeight,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="text-center mb-[4mm]">
        <h1
          className="font-bold uppercase tracking-[0.12em]"
          style={{ fontSize: "20pt", color: customize.accentColor, fontFamily: customize.headingFont }}
        >
          {p.fullName || "YOUR NAME"}
        </h1>
        {p.professionalTitle && (
          <p className="mt-[1mm]" style={{ fontSize: "11pt", color: "#6B7280" }}>
            {p.professionalTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div className="flex items-center justify-center flex-wrap mt-[2.5mm] gap-x-[4mm] gap-y-[1mm]" style={{ fontSize: "8pt", color: "#4B5563" }}>
            {contactItems.map((item, i) => (
              <span key={i} className="flex items-center gap-[1mm]">{item.icon}{item.text}</span>
            ))}
          </div>
        )}
      </div>
      <div className="h-[0.3mm] bg-gray-300 mb-[5mm]" />

      {/* Date */}
      {date && (
        <div className={`mb-[4mm] ${customize.datePosition === "right" ? "text-right" : "text-left"}`}>
          <span style={{ fontSize: "9pt", color: "#374151" }}>{date}</span>
        </div>
      )}

      {/* Recipient */}
      {(recipient.recipientName || recipient.companyName || recipient.companyAddress) && (
        <div className="mb-[5mm]" style={{ fontSize: "9pt", color: "#374151" }}>
          {recipient.recipientName && <p>{recipient.recipientName}</p>}
          {recipient.companyName && <p>{recipient.companyName}</p>}
          {recipient.companyAddress && <p>{recipient.companyAddress}</p>}
        </div>
      )}

      {/* Body */}
      <div
        className="mb-[8mm] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ol]:list-decimal [&_ol]:pl-[5mm] [&_p]:mb-[2mm]"
        style={{ fontSize: `${customize.fontSize}pt`, color: "#374151", lineHeight: customize.lineHeight }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body || "") }}
      />

      {/* Signature */}
      <div className={customize.declarationPosition === "right" ? "text-right" : "text-left"}>
        {customize.showDeclarationLine && <div className="h-[0.3mm] bg-gray-300 w-[40mm] mb-[3mm]" />}
        {signature.fullName && <p style={{ fontSize: "9pt", fontWeight: 600, color: "#111827" }}>{signature.fullName}</p>}
        {(signature.place || signature.date) && (
          <p style={{ fontSize: "8pt", color: "#6B7280" }}>
            {[signature.place, signature.date].filter(Boolean).join(", ")}
          </p>
        )}
      </div>

      {/* Empty state */}
      {!p.fullName && !body && (
        <div className="text-center py-[30mm]" style={{ color: "#9CA3AF", fontSize: "11pt" }}>
          Add content to see your cover letter here
        </div>
      )}
    </div>
  );
});

export const CoverLetterPreview = React.memo(function CoverLetterPreview({ data, customize, pdfTargetId }: { data: CoverLetterData; customize: CoverLetterCustomize; pdfTargetId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.65);

  // Debounce data for preview rendering (100ms)
  const [debouncedData, setDebouncedData] = useState(data);
  const [debouncedCustomize, setDebouncedCustomize] = useState(customize);
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedData(data); setDebouncedCustomize(customize); }, 100);
    return () => clearTimeout(t);
  }, [data, customize]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const s = Math.min((w - 48) / A4_W, 0.85);
        setScale(Math.max(s, 0.35));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto relative" style={{ backgroundColor: "#F0EDE6" }}>
      <div className="flex justify-center py-8 px-6">
        <div
          style={{
            width: `${A4_W}px`,
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            marginBottom: `${-(1 - scale) * A4_H}px`,
          }}
        >
          <div id={pdfTargetId} className="shadow-2xl" style={{ width: `${A4_W}px`, minHeight: `${A4_H}px` }}>
            <A4LetterPage data={debouncedData} customize={debouncedCustomize} />
          </div>
        </div>
      </div>
    </div>
  );
});
