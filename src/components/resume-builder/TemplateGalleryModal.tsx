import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TemplateGalleryModalProps {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (template: string) => void;
}

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    desc: "Single column, centered name, icons for contact, thin underline on section headings.",
  },
  {
    id: "modern-sidebar",
    name: "Modern Sidebar",
    desc: "Two-column with dark left sidebar containing photo, name, contact, and skills.",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Single column, maximum whitespace, no icons, gray dividers only.",
  },
  {
    id: "executive",
    name: "Executive",
    desc: "Single column, serif feel, bordered header box, small caps section headings.",
  },
  {
    id: "bold-creative",
    name: "Bold Creative",
    desc: "Two-column with right sidebar, bold accent colors, progress bars for skills.",
  },
];

/* Tiny inline SVG thumbnails representing each template layout */
function TemplateThumbnail({ id }: { id: string }) {
  const base = "w-full h-full";
  switch (id) {
    case "classic":
      return (
        <svg viewBox="0 0 120 170" className={base}>
          <rect x="0" y="0" width="120" height="170" fill="white" />
          <rect x="30" y="12" width="60" height="6" rx="1" fill="#1e293b" />
          <rect x="40" y="22" width="40" height="3" rx="1" fill="#94a3b8" />
          <rect x="20" y="30" width="80" height="2" rx="1" fill="#e2e8f0" />
          <rect x="10" y="38" width="30" height="3" rx="1" fill="#334155" />
          <rect x="10" y="44" width="100" height="1.5" rx="0.5" fill="#cbd5e1" />
          <rect x="10" y="49" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="54" width="80" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="64" width="25" height="3" rx="1" fill="#334155" />
          <rect x="10" y="70" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="75" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="80" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="90" width="28" height="3" rx="1" fill="#334155" />
          {[0,1,2,3].map((i) => <rect key={i} x={10 + i * 26} y="96" width="22" height="6" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />)}
        </svg>
      );
    case "modern-sidebar":
      return (
        <svg viewBox="0 0 120 170" className={base}>
          <rect x="0" y="0" width="120" height="170" fill="white" />
          <rect x="0" y="0" width="40" height="170" fill="#1e293b" />
          <circle cx="20" cy="20" r="10" fill="#334155" />
          <rect x="8" y="36" width="24" height="3" rx="1" fill="#f1f5f9" />
          <rect x="10" y="42" width="20" height="2" rx="1" fill="#64748b" />
          <rect x="8" y="52" width="15" height="2" rx="1" fill="#94a3b8" />
          <rect x="8" y="57" width="24" height="1.5" rx="0.5" fill="#475569" />
          <rect x="8" y="62" width="22" height="1.5" rx="0.5" fill="#475569" />
          <rect x="50" y="12" width="30" height="3" rx="1" fill="#334155" />
          <rect x="50" y="18" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="50" y="22" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="50" y="32" width="25" height="3" rx="1" fill="#334155" />
          <rect x="50" y="38" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="50" y="42" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
        </svg>
      );
    case "minimal":
      return (
        <svg viewBox="0 0 120 170" className={base}>
          <rect x="0" y="0" width="120" height="170" fill="white" />
          <rect x="10" y="14" width="50" height="5" rx="1" fill="#374151" />
          <rect x="10" y="23" width="30" height="2.5" rx="1" fill="#9ca3af" />
          <rect x="10" y="30" width="100" height="0.5" fill="#e5e7eb" />
          <rect x="10" y="38" width="100" height="1.5" rx="0.5" fill="#e5e7eb" />
          <rect x="10" y="42" width="100" height="1.5" rx="0.5" fill="#e5e7eb" />
          <rect x="10" y="46" width="70" height="1.5" rx="0.5" fill="#e5e7eb" />
          <rect x="10" y="56" width="100" height="0.5" fill="#e5e7eb" />
          <rect x="10" y="62" width="100" height="1.5" rx="0.5" fill="#e5e7eb" />
          <rect x="10" y="66" width="100" height="1.5" rx="0.5" fill="#e5e7eb" />
          <rect x="10" y="76" width="100" height="0.5" fill="#e5e7eb" />
          <rect x="10" y="82" width="100" height="1.5" rx="0.5" fill="#e5e7eb" />
        </svg>
      );
    case "executive":
      return (
        <svg viewBox="0 0 120 170" className={base}>
          <rect x="0" y="0" width="120" height="170" fill="white" />
          <rect x="8" y="8" width="104" height="30" rx="2" fill="none" stroke="#1e293b" strokeWidth="1" />
          <rect x="25" y="14" width="70" height="6" rx="1" fill="#1e293b" />
          <rect x="35" y="24" width="50" height="3" rx="1" fill="#6b7280" />
          <rect x="10" y="46" width="40" height="3" rx="1" fill="#1e293b" style={{ fontVariant: "small-caps" }} />
          <rect x="10" y="52" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="56" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="66" width="35" height="3" rx="1" fill="#1e293b" />
          <rect x="10" y="72" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="76" width="100" height="1.5" rx="0.5" fill="#e2e8f0" />
        </svg>
      );
    case "bold-creative":
      return (
        <svg viewBox="0 0 120 170" className={base}>
          <rect x="0" y="0" width="120" height="170" fill="white" />
          <rect x="80" y="0" width="40" height="170" fill="#f1f5f9" />
          <rect x="10" y="14" width="55" height="6" rx="1" fill="#7c3aed" />
          <rect x="10" y="24" width="35" height="3" rx="1" fill="#6b7280" />
          <rect x="10" y="34" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="38" width="60" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="10" y="42" width="40" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="86" y="14" width="28" height="3" rx="1" fill="#7c3aed" />
          <rect x="86" y="20" width="28" height="3" rx="1.5" fill="#e2e8f0" />
          <rect x="86" y="20" width="20" height="3" rx="1.5" fill="#7c3aed" opacity="0.6" />
          <rect x="86" y="26" width="28" height="3" rx="1.5" fill="#e2e8f0" />
          <rect x="86" y="26" width="14" height="3" rx="1.5" fill="#7c3aed" opacity="0.6" />
          <rect x="86" y="36" width="20" height="3" rx="1" fill="#7c3aed" />
          <rect x="86" y="42" width="28" height="1.5" rx="0.5" fill="#e2e8f0" />
          <rect x="86" y="46" width="28" height="1.5" rx="0.5" fill="#e2e8f0" />
        </svg>
      );
    default:
      return <div className="w-full h-full bg-gray-100 rounded" />;
  }
}

export function TemplateGalleryModal({ open, onClose, selected, onSelect }: TemplateGalleryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Choose a template</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => { onSelect(t.id); onClose(); }}
                className={cn(
                  "flex flex-col rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg",
                  selected === t.id
                    ? "border-purple-500 ring-2 ring-purple-200"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="aspect-[210/297] bg-gray-50 p-2">
                  <TemplateThumbnail id={t.id} />
                </div>
                <div className="px-3 py-2.5 bg-white border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-900">{t.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
