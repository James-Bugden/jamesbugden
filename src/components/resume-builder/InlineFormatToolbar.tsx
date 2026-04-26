import { Bold, Italic, Underline, Type } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const COLORS = [
  "#111827", "#374151", "#dc2626", "#2563eb",
  "#16a34a", "#B08A3E", "#7c3aed", "#0891b2",
];

interface InlineFormatToolbarProps {
  rect: DOMRect;
  onFormat: (command: string, value?: string) => void;
  onClose: () => void;
  containerRect?: DOMRect;
}

export function InlineFormatToolbar({ rect, onFormat, onClose, containerRect }: InlineFormatToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Use fixed positioning with screen coordinates (the preview is CSS-scaled,
  // so container-relative offsets don't match screen coords).
  const left = rect.left + rect.width / 2 - 90;
  let top = rect.top - 48;
  if (top < 0) top = rect.bottom + 8;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: Math.max(4, left),
        top,
        zIndex: 1000,
        background: "#1f2937",
        borderRadius: 8,
        padding: "4px 6px",
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      }}
    >
      <FmtBtn onMouseDown={() => onFormat("bold")} title="Bold">
        <Bold className="w-3.5 h-3.5" />
      </FmtBtn>
      <FmtBtn onMouseDown={() => onFormat("italic")} title="Italic">
        <Italic className="w-3.5 h-3.5" />
      </FmtBtn>
      <FmtBtn onMouseDown={() => onFormat("underline")} title="Underline">
        <Underline className="w-3.5 h-3.5" />
      </FmtBtn>

      <div style={{ width: 1, height: 16, background: "#4b5563", margin: "0 2px" }} />

      <div style={{ position: "relative" }}>
        <FmtBtn onMouseDown={() => setShowColors(!showColors)} title="Text color">
          <Type className="w-3.5 h-3.5" />
        </FmtBtn>
        {showColors && (
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              borderRadius: 8,
              padding: 6,
              display: "flex",
              gap: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
            }}
          >
            {COLORS.map((c) => (
              <button
                key={c}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onFormat("foreColor", c);
                  setShowColors(false);
                }}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "2px solid #e5e7eb",
                  cursor: "pointer",
                }}
                title={c}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FmtBtn({
  onMouseDown,
  title,
  children,
}: {
  onMouseDown: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      title={title}
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#d1d5db",
        cursor: "pointer",
        background: "transparent",
        border: "none",
      }}
      className="hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}
