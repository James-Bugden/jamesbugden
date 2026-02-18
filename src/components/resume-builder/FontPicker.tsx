import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FontCategory, getFontsForCategory, GOOGLE_FONTS_URL } from "./fontData";

interface FontPickerProps {
  selectedFont: string; // font family string
  onSelect: (family: string) => void;
}

export function FontPicker({ selectedFont, onSelect }: FontPickerProps) {
  const [category, setCategory] = useState<FontCategory>("sans");
  const fonts = getFontsForCategory(category);

  /* Load Google Fonts stylesheet once */
  useEffect(() => {
    const id = "resume-google-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  const categories: { id: FontCategory; label: string; sample: string }[] = [
    { id: "serif", label: "Serif", sample: "Aa" },
    { id: "sans", label: "Sans", sample: "Aa" },
    { id: "mono", label: "Mono", sample: "Aa" },
  ];

  return (
    <div className="space-y-4">
      {/* Category cards */}
      <div className="flex gap-3">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-colors",
              category === c.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <span
              className="text-xl font-semibold text-gray-800"
              style={{
                fontFamily: c.id === "serif" ? "Georgia, serif" : c.id === "mono" ? "'Courier New', monospace" : "system-ui, sans-serif",
              }}
            >
              {c.sample}
            </span>
            <span className="text-[10px] font-medium text-gray-500">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Font grid */}
      <div className="grid grid-cols-3 gap-2">
        {fonts.map((f) => (
          <button
            key={f.name}
            onClick={() => onSelect(f.family)}
            className={cn(
              "px-3 py-2 rounded-lg border-2 text-xs text-center transition-colors truncate",
              selectedFont === f.family
                ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            )}
            style={{ fontFamily: f.family }}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  );
}
