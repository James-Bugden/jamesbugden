import React, { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const PRESET_COLORS = [
  "#111827", "#374151", "#6B7280", "#9CA3AF", "#0891b2",
  "#2563eb", "#7c3aed", "#dc2626", "#16a34a", "#D4930D",
];

const ROLE_TO_FIELD: Record<string, string> = {
  name: "nameColor",
  title: "titleColor",
  contacts: "linkIconColor",
  headings: "headingsColor",
  dates: "datesColor",
  entryTitle: "nameColor",
  subtitle: "subtitleColor",
  body: "bodyColor",
  accent: "accentColor",
  background: "a4Background",
};

const ROLE_LABELS: Record<string, string> = {
  name: "Name",
  title: "Job Title",
  contacts: "Contact Info",
  headings: "Section Heading",
  dates: "Dates",
  entryTitle: "Entry Title",
  subtitle: "Subtitle",
  body: "Body Text",
  accent: "Accent / Lines",
  background: "Page Background",
};

export { ROLE_TO_FIELD };

interface InlineColorToolbarProps {
  targetRect: DOMRect;
  currentColor: string;
  elementType: string;
  onColorChange: (field: string, color: string) => void;
  onClose: () => void;
  isMobile: boolean;
  containerRect?: DOMRect;
}

export function InlineColorToolbar({
  targetRect,
  currentColor,
  elementType,
  onColorChange,
  onClose,
  isMobile,
  containerRect,
}: InlineColorToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const field = ROLE_TO_FIELD[elementType] || elementType;
  const label = ROLE_LABELS[elementType] || elementType;

  const handleSelect = (color: string) => {
    onColorChange(field, color);
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
      onClose();
    }, 300);
  };

  const handleCustomPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    handleSelect(color);
  };

  const allColors = [...PRESET_COLORS];

  // Positioning
  const style: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        bottom: 60,
        left: 12,
        right: 12,
        zIndex: 999,
      }
    : {
        position: "fixed",
        zIndex: 999,
        left: Math.max(0, targetRect.left + targetRect.width / 2 - 180),
        top: targetRect.top - 56,
      };

  // Flip below if not enough space above
  if (!isMobile && style.top !== undefined && (style.top as number) < 0) {
    style.top = targetRect.bottom + 8;
  }

  return (
    <div
      ref={toolbarRef}
      style={{
        ...style,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        padding: "8px 12px",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.95)",
        transition: "opacity 150ms, transform 150ms",
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{label}</span>
        <button onClick={onClose} className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100">
          <X className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center gap-1.5" style={{ overflowX: isMobile ? "auto" : undefined }}>
        {showCheck ? (
          <div className="flex items-center justify-center w-full py-1">
            <Check className="w-5 h-5 text-green-500" />
          </div>
        ) : (
          <>
            {allColors.map((color) => (
              <button
                key={color}
                onClick={() => handleSelect(color)}
                className="flex-shrink-0 rounded-full transition-transform hover:scale-110"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: color,
                  border: currentColor === color ? "2px solid #1f2937" : "2px solid transparent",
                  outline: currentColor === color ? "2px solid white" : "none",
                  outlineOffset: -3,
                  cursor: "pointer",
                }}
                title={color}
              />
            ))}

            {/* Custom color picker */}
            <button
              onClick={() => colorInputRef.current?.click()}
              className="flex-shrink-0 rounded-full transition-transform hover:scale-110"
              style={{
                width: 28,
                height: 28,
                background: customColor || "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                border: "2px solid transparent",
                cursor: "pointer",
              }}
              title="Custom color"
            />
            <input
              ref={colorInputRef}
              type="color"
              value={currentColor}
              onChange={handleCustomPick}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
            />
          </>
        )}
      </div>
    </div>
  );
}
