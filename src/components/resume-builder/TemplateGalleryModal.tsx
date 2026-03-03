import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Check, FileText, Columns, Type, Printer } from "lucide-react";

interface TemplateGalleryModalProps {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (template: string) => void;
  savedTemplateIds?: string[];
}

type TabId = "all" | "mine" | "simple" | "modern" | "creative";

interface TemplateInfo {
  id: string;
  name: string;
  desc: string;
  category: "simple" | "modern" | "creative";
}

const TEMPLATES: TemplateInfo[] = [
  { id: "classic", name: "Classic", desc: "Single column, centered name, icons for contact, thin underline on section headings.", category: "simple" },
  { id: "minimal", name: "Minimal", desc: "Single column, maximum whitespace, no icons, gray dividers only.", category: "simple" },
  { id: "executive", name: "Executive", desc: "Single column, serif feel, bordered header box, small caps section headings.", category: "simple" },
  { id: "modern-sidebar", name: "Modern Sidebar", desc: "Two-column with dark left sidebar containing photo, name, contact, and skills.", category: "modern" },
  { id: "bold-creative", name: "Bold Creative", desc: "Two-column with right sidebar, bold accent colors, progress bars for skills.", category: "creative" },
];

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All Templates" },
  { id: "mine", label: "My Custom" },
  { id: "simple", label: "Simple" },
  { id: "modern", label: "Modern" },
  { id: "creative", label: "Creative" },
];

const FEATURES = [
  { icon: FileText, label: "A4 / US Letter Size" },
  { icon: Type, label: "Editable Text" },
  { icon: Columns, label: "Fully customizable" },
  { icon: Printer, label: "Print ready" },
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
          <rect x="10" y="46" width="40" height="3" rx="1" fill="#1e293b" />
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

export function TemplateGalleryModal({ open, onClose, selected, onSelect, savedTemplateIds = [] }: TemplateGalleryModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!open) return null;

  const filtered = TEMPLATES.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "mine") return savedTemplateIds.includes(t.id);
    return t.category === activeTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Create New Resume</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 flex gap-1 overflow-x-auto border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors relative",
                activeTab === tab.id
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-pink-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm">No templates in this category yet.</p>
              <p className="text-xs mt-1">Create a resume and save it as a custom template.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((t) => {
                const isHovered = hoveredId === t.id;
                const isSelected = selected === t.id;
                return (
                  <div
                    key={t.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredId(t.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className={cn(
                        "flex flex-col rounded-xl border-2 overflow-hidden transition-all",
                        isSelected
                          ? "border-pink-500 ring-2 ring-pink-200"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                      )}
                    >
                      <div className="aspect-[210/297] bg-gray-50 p-2 relative">
                        <TemplateThumbnail id={t.id} />

                        {/* Selected badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}

                        {/* Hover overlay with features + button */}
                        {isHovered && !isSelected && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 p-3 animate-in fade-in duration-150">
                            <button
                              onClick={() => { onSelect(t.id); onClose(); }}
                              className="px-4 py-2 bg-white text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                            >
                              Use this template
                            </button>
                            <ul className="space-y-1.5 mt-1">
                              {FEATURES.map((f) => (
                                <li key={f.label} className="flex items-center gap-1.5 text-[10px] text-white/90">
                                  <f.icon className="w-3 h-3 text-white/70 flex-shrink-0" />
                                  {f.label}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="px-3 py-2.5 bg-white border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-900">{t.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{t.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
