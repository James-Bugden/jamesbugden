import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { TEMPLATE_LIST, TEMPLATE_PRESETS, applyTemplatePreset } from "./templatePresets";
import { ResumeThumbnail } from "./ResumeThumbnail";
import { ResumeData, DEFAULT_RESUME_DATA } from "./types";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "./customizeTypes";
import { toast } from "@/hooks/use-toast";
import { useT } from "./i18n";

interface TemplateGalleryModalProps {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (template: string) => void;
  resumeData?: ResumeData;
  showToast?: boolean;
}

export function TemplateGalleryModal({
  open,
  onClose,
  selected,
  onSelect,
  resumeData,
  showToast = true,
}: TemplateGalleryModalProps) {
  const t = useT();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Close the modal when the user presses Escape (parity with other modals).
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Build settings for each template so thumbnails show user data in that style
  const previewData = resumeData || DEFAULT_RESUME_DATA;

  const templateSettings = useMemo(() => {
    const map: Record<string, CustomizeSettings> = {};
    for (const tpl of TEMPLATE_LIST) {
      map[tpl.id] = applyTemplatePreset(DEFAULT_CUSTOMIZE, tpl.id);
    }
    return map;
  }, []);

  if (!open) return null;

  const handleSelect = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-foreground">{t("chooseTemplate")}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("contentStaysSame")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {TEMPLATE_LIST.map((tpl) => {
              const isSelected = selected === tpl.id;
              const isHovered = hoveredId === tpl.id;
              const tplName = t((`template_${tpl.id}` as any)) || tpl.name;
              const tplDesc = t((`templateDesc_${tpl.id}` as any)) || tpl.desc;

              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelect(tpl.id)}
                  onMouseEnter={() => setHoveredId(tpl.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "relative rounded-xl border-2 overflow-hidden text-left transition-all",
                    isSelected
                      ? "border-gray-900 ring-2 ring-gray-900/20"
                      : isHovered
                        ? "border-gray-400 shadow-lg"
                        : "border-border hover:border-border"
                  )}
                >
                  {/* Live thumbnail preview */}
                  <div className="aspect-[210/297] bg-[#fafaf8] relative overflow-hidden">
                    <ResumeThumbnail
                      data={previewData}
                      settings={templateSettings[tpl.id]}
                    />

                    {/* Selected badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="px-3 py-2.5 bg-white border-t border-gray-100">
                    <p className="text-xs font-bold text-foreground">{tplName}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                      {tplDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
