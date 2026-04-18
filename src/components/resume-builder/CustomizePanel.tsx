import { useState, useCallback } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Minus, Plus, Check, Link, ExternalLink, Smile, Circle, AlignLeft, AlignCenter, AlignRight, GripVertical, Camera, ChevronDown } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CustomizeSettings,
  HeadingStyle,
  ACCENT_COLORS,
  LANGUAGE_OPTIONS,
  DATE_FORMAT_OPTIONS,
  PAGE_FORMAT_OPTIONS,
} from "./customizeTypes";
import { ResumeData } from "./types";
import { applyTemplatePreset, TEMPLATE_LIST } from "./templatePresets";
import { FontPicker } from "./FontPicker";
import { ResumeThumbnail } from "./ResumeThumbnail";
import { DEFAULT_CUSTOMIZE } from "./customizeTypes";
import { useT } from "./i18n";

/* ── Brand colors ─────────────────────────────────────────── */
const B = {
  green: "#2b4734",
  greenHover: "#1f3a28",
  greenLight: "#e8f0eb",
  greenLighter: "#f2f7f4",
  gold: "#D4930D",
  cream: "#FDFBF7",
  text: "#1A1A1A",
  textSec: "#6B6B6B",
  border: "#e5e7eb",
};

interface CustomizePanelProps {
  settings: CustomizeSettings;
  onChange: (updates: Partial<CustomizeSettings>) => void;
  sections: ResumeData["sections"];
  resumeData?: ResumeData;
}

const SUB_TABS = ["Basics", "Layout & Spacing", "Design", "Header", "Sections"] as const;

/* ── Shared UI helpers ──────────────────────────────────────── */
function SettingCard({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
            <h3 className="text-base font-semibold" style={{ color: B.text }}>{title}</h3>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} style={{ color: B.textSec }} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-5 pb-5">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold mb-1.5" style={{ color: B.text }}>{children}</label>;
}

let selectIdCounter = 0;
function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  const [id] = useState(() => `select-${++selectIdCounter}`);
  return (
    <div className="flex-1 min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color: B.text }}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-sm bg-white border outline-none appearance-none cursor-pointer"
        style={{ color: B.text, borderColor: B.border }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function ThumbOption({ selected, onClick, children, label }: { selected: boolean; onClick: () => void; children: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all min-w-[72px]",
        selected ? "shadow-sm" : "bg-white hover:border-gray-300"
      )}
      style={
        selected
          ? { borderColor: B.green, backgroundColor: B.greenLighter }
          : { borderColor: B.border }
      }
    >
      {children}
      <span className="text-[10px] font-medium" style={{ color: B.textSec }}>{label}</span>
    </button>
  );
}

function SliderRow({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: B.text }}>{label}</span>
        <div className="flex items-center gap-1.5">
          <button aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))} className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: B.textSec }}>
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs w-14 text-center" style={{ color: B.text }}>{value}{unit}</span>
          <button aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))} className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: B.textSec }}>
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(+(v).toFixed(2))}
        className="[&_[role=slider]]:bg-[#2b4734] [&_[role=slider]]:border-[#2b4734] [&_span[data-orientation=horizontal]]:bg-[#2b4734]"
      />
    </div>
  );
}

function SegmentedControl({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 px-2 py-1.5 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap",
            value === o.value ? "text-white shadow-sm" : "hover:opacity-80"
          )}
          style={
            value === o.value
              ? { backgroundColor: B.green }
              : { color: B.textSec }
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const COLOR_PRESETS = ["#2b4734", "#D4930D", "#1e40af", "#dc2626", "#7c3aed", "#0891b2", "#be185d", "#ea580c"];

function ColorPickerRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold" style={{ color: B.textSec }}>{label}</span>
        <div className="flex items-center gap-2">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded-md border cursor-pointer p-0.5" style={{ borderColor: B.border }} />
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-20 text-xs font-mono px-2 py-1 rounded-md bg-gray-50 border" style={{ color: B.text, borderColor: B.border }} />
        </div>
      </div>
      <div className="flex gap-1">
        {COLOR_PRESETS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="w-5 h-5 rounded-full border transition-transform hover:scale-110"
            style={{
              backgroundColor: c,
              borderColor: value === c ? B.green : "transparent",
              boxShadow: value === c ? `0 0 0 2px ${B.greenLight}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SwitchRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: B.text }}>{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: B.text }}>
      <Checkbox checked={checked} onCheckedChange={(v) => onChange(!!v)} />
      {label}
    </label>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */
export function CustomizePanel({ settings, onChange, sections, resumeData }: CustomizePanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "#f5f5f3" }}>
        <BasicsTab settings={settings} onChange={onChange} resumeData={resumeData} />
        <LayoutTab settings={settings} onChange={onChange} sections={sections} />
        <DesignTab settings={settings} onChange={onChange} />
        <HeaderTab settings={settings} onChange={onChange} />
        <SectionsTab settings={settings} onChange={onChange} sections={sections} />
      </div>
    </div>
  );
}

/* ── BASICS ─────────────────────────────────────────────────── */
function BasicsTab({ settings, onChange, resumeData }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; resumeData?: ResumeData }) {
  const t = useT();

  const handleTemplateSelect = (templateId: string) => {
    const newSettings = applyTemplatePreset(settings, templateId);
    onChange(newSettings);
  };

  return (
    <>
      <SettingCard title={t("customizeLanguageRegion")}>
        <div className="flex gap-3">
          <SelectField label="Language" value={settings.language} options={LANGUAGE_OPTIONS} onChange={(v) => onChange({ language: v })} />
          <SelectField label="Date Format" value={settings.dateFormat} options={DATE_FORMAT_OPTIONS} onChange={(v) => onChange({ dateFormat: v })} />
          <SelectField label="Page Format" value={settings.pageFormat} options={PAGE_FORMAT_OPTIONS} onChange={(v) => onChange({ pageFormat: v })} />
        </div>
      </SettingCard>

      <SettingCard title={t("customizeApplyTemplate")}>
        <p className="text-xs mb-3" style={{ color: B.textSec }}>{t("customizeApplyTemplateHint")}</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {TEMPLATE_LIST.map((t) => {
            const previewSettings = applyTemplatePreset(DEFAULT_CUSTOMIZE, t.id);
            const isSelected = settings.template === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.id)}
                className={cn(
                  "rounded-xl border-2 overflow-hidden transition-all text-left",
                  isSelected ? "shadow-sm" : "hover:border-gray-300"
                )}
                style={
                  isSelected
                    ? { borderColor: B.green, boxShadow: `0 0 0 2px ${B.greenLight}` }
                    : { borderColor: B.border }
                }
              >
                <div className="aspect-[210/297] bg-gray-50 relative overflow-hidden">
                  <ResumeThumbnail data={resumeData} settings={previewSettings} />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: B.green }}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="px-2.5 py-2 bg-white border-t border-gray-100">
                  <p className="text-[11px] font-semibold" style={{ color: B.text }}>{t.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </SettingCard>

    </>
  );
}

/* ── LAYOUT & SPACING ───────────────────────────────────────── */
function LayoutTab({ settings, onChange, sections }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; sections: ResumeData["sections"] }) {
  const t = useT();
  return (
    <>
      <SettingCard title={t("customizeLayout")}>
        <p className="text-xs text-gray-500">{t("singleColumnLayout") || "Single-column layout"}</p>
      </SettingCard>

      <SectionReorderCard settings={settings} onChange={onChange} sections={sections} />

      <SettingCard title={t("customizeSpacing")}>
        <div className="space-y-5">
          <SliderRow label={t("fontSize")} value={settings.fontSize} min={8} max={16} step={0.5} unit="pt" onChange={(v) => onChange({ fontSize: v })} />
          <SliderRow label={t("lineHeight") || "Line Height"} value={settings.lineHeight} min={1} max={2.2} step={0.1} unit="" onChange={(v) => onChange({ lineHeight: Math.round(v * 10) / 10 })} />
          <SliderRow label={t("leftRightMargin") || "Left & Right Margin"} value={settings.marginX} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginX: v })} />
          <SliderRow label={t("topBottomMargin") || "Top & Bottom Margin"} value={settings.marginY} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginY: v })} />
          <SliderRow label={t("spaceBetweenEntries") || "Space between Entries"} value={settings.sectionSpacing} min={0} max={20} step={1} unit="mm" onChange={(v) => onChange({ sectionSpacing: v })} />
        </div>
      </SettingCard>

      <SettingCard title={t("customizeEntryLayout")} defaultOpen={false}>
        {/* Visual layout icons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <TooltipProvider delayDuration={300}>
          {([
            { val: "stacked", label: "Stacked", icon: (
              <div className="w-full h-10 flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-1"><div className="w-14 h-1.5 bg-gray-500 rounded-sm" /><div className="w-4 h-1 bg-gray-300 rounded-sm" /><div className="w-3 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="w-10 h-1 bg-gray-300 rounded-sm" />
                <div className="flex gap-0.5"><div className="w-20 h-1 bg-gray-200 rounded-sm" /></div>
              </div>
            )},
            { val: "inline", label: "Inline", icon: (
              <div className="w-full h-10 flex flex-col gap-1 justify-center">
                <div className="flex items-center justify-between"><div className="flex items-center gap-1"><div className="w-8 h-1.5 bg-gray-500 rounded-sm" /><div className="w-4 h-1 bg-gray-300 rounded-sm" /></div><div className="w-6 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="flex gap-0.5"><div className="w-20 h-1 bg-gray-200 rounded-sm" /></div>
              </div>
            )},
            { val: "compact", label: "Compact", icon: (
              <div className="w-full h-10 flex flex-col gap-0.5 justify-center">
                <div className="flex items-center gap-1"><div className="w-12 h-1.5 bg-gray-500 rounded-sm" /><div className="w-6 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="w-16 h-1 bg-gray-200 rounded-sm" />
              </div>
            )},
            { val: "academic", label: "Academic", icon: (
              <div className="w-full h-10 flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-1"><div className="w-14 h-1.5 bg-gray-500 rounded-sm" /><div className="w-6 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="w-10 h-1 bg-gray-300 rounded-sm italic" style={{ borderBottom: "1px solid #d1d5db" }} />
                <div className="w-20 h-1 bg-gray-200 rounded-sm" />
              </div>
            )},
          ] as const).map((opt) => (
            <Tooltip key={opt.val}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange({ entryLayout: opt.val })}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all",
                    settings.entryLayout === opt.val ? "shadow-sm" : "bg-white hover:border-gray-300"
                  )}
                  style={
                    settings.entryLayout === opt.val
                      ? { borderColor: B.green, backgroundColor: B.greenLighter }
                      : { borderColor: B.border }
                  }
                >
                  {opt.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{opt.label}</TooltipContent>
            </Tooltip>
          ))}
          </TooltipProvider>
        </div>

        <FieldLabel>Title & subtitle size</FieldLabel>
        <div className="mb-4">
          <SegmentedControl
            options={[
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L" },
            ]}
            value={settings.titleSubtitleSize || "m"}
            onChange={(v) => onChange({ titleSubtitleSize: v as any })}
          />
        </div>

        <FieldLabel>Subtitle style</FieldLabel>
        <div className="mb-4">
          <SegmentedControl
            options={[
              { value: "normal", label: "Normal" },
              { value: "bold", label: "Bold" },
              { value: "italic", label: "Italic" },
            ]}
            value={settings.subtitleStyle || "normal"}
            onChange={(v) => onChange({ subtitleStyle: v as any })}
          />
        </div>

        <FieldLabel>Subtitle placement</FieldLabel>
        <div className="mb-4">
          <SegmentedControl
            options={[
              { value: "same-line", label: "Try Same Line" },
              { value: "next-line", label: "Next Line" },
            ]}
            value={settings.subtitlePlacement || "next-line"}
            onChange={(v) => onChange({ subtitlePlacement: v as any })}
          />
        </div>

        <FieldLabel>List style</FieldLabel>
        <SegmentedControl
          options={[
            { value: "bullet", label: "• Bullet" },
            { value: "hyphen", label: "– Hyphen" },
          ]}
          value={settings.listStyle || "bullet"}
          onChange={(v) => onChange({ listStyle: v as any })}
        />
      </SettingCard>
    </>
  );
}

/* ── Heading style thumbnails ─────────────────────────────── */
const HEADING_STYLES: { id: HeadingStyle; label: string }[] = [
  { id: "plain", label: "Plain" },
  { id: "underline", label: "Underline" },
  { id: "full-underline", label: "Full Line" },
  { id: "left-accent", label: "Left Accent" },
  { id: "background", label: "Background" },
  { id: "left-border", label: "Left Border" },
];

function HeadingStyleThumb({ id, accent }: { id: HeadingStyle; accent: string }) {
  switch (id) {
    case "plain":
      return <div className="w-full flex items-center"><div className="w-10 h-1.5 bg-gray-700 rounded-sm" /></div>;
    case "underline":
      return <div className="w-full"><div className="w-10 h-1.5 bg-gray-700 rounded-sm" /><div className="mt-0.5 w-full h-[2px] rounded-full" style={{ backgroundColor: accent }} /></div>;
    case "full-underline":
      return <div className="w-full"><div className="w-10 h-1.5 bg-gray-700 rounded-sm pb-0.5 border-b-2" style={{ borderColor: accent }} /></div>;
    case "left-accent":
      return <div className="flex items-center gap-1"><div className="w-[3px] h-3 rounded-full" style={{ backgroundColor: accent }} /><div className="w-8 h-1.5 bg-gray-700 rounded-sm" /></div>;
    case "background":
      return <div className="w-full px-1 py-0.5 rounded-sm" style={{ backgroundColor: accent }}><div className="w-8 h-1.5 bg-white/90 rounded-sm" /></div>;
    case "left-border":
      return <div className="w-full pl-1.5 border-l-2" style={{ borderColor: accent }}><div className="w-8 h-1.5 bg-gray-700 rounded-sm" /></div>;
  }
}

/* ── DESIGN ─────────────────────────────────────────────────── */
function DesignTab({ settings, onChange }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  const t = useT();
  return (
    <>
      <SettingCard title={t("customizeFontSection")}>
        <FontPicker selectedFont={settings.bodyFont} onSelect={(f) => onChange({ bodyFont: f })} />
      </SettingCard>



      <SettingCard title={t("customizeSectionHeadings")}>
        <FieldLabel>Style</FieldLabel>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <TooltipProvider delayDuration={300}>
          {HEADING_STYLES.map((hs) => (
            <Tooltip key={hs.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange({ headingStyle: hs.id })}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all",
                    settings.headingStyle === hs.id ? "shadow-sm" : "bg-white hover:border-gray-300"
                  )}
                  style={
                    settings.headingStyle === hs.id
                      ? { borderColor: B.green, backgroundColor: B.greenLighter }
                      : { borderColor: B.border }
                  }
                >
                  <div className="w-14 h-5 flex items-center justify-center">
                    <HeadingStyleThumb id={hs.id} accent={settings.accentColor} />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{hs.label}</TooltipContent>
            </Tooltip>
          ))}
          </TooltipProvider>
        </div>

        <FieldLabel>Size</FieldLabel>
        <div className="mb-4">
          <SegmentedControl
            options={[
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L" },
              { value: "xl", label: "XL" },
            ]}
            value={settings.headingSize || "m"}
            onChange={(v) => onChange({ headingSize: v as any })}
          />
        </div>

        <CheckboxRow label="Uppercase headings" checked={settings.headingUppercase !== false} onChange={(v) => onChange({ headingUppercase: v })} />
      </SettingCard>

      <SettingCard title={t("customizeLinkStyling")} defaultOpen={false}>
        <div className="space-y-3">
          <CheckboxRow label="Underline" checked={settings.linkUnderline} onChange={(v) => onChange({ linkUnderline: v })} />
          <CheckboxRow label="Blue color" checked={settings.linkBlue} onChange={(v) => onChange({ linkBlue: v })} />
          <CheckboxRow label="Link icon" checked={settings.linkIcon} onChange={(v) => onChange({ linkIcon: v })} />
          {settings.linkIcon && (
            <div className="flex gap-2 ml-6">
              <button
                onClick={() => onChange({ linkIconStyle: "link" })}
                className="p-2 rounded-lg border-2"
                style={settings.linkIconStyle === "link" ? { borderColor: B.green, backgroundColor: B.greenLighter } : { borderColor: B.border }}
              >
                <Link className="w-4 h-4" style={{ color: B.textSec }} />
              </button>
              <button
                onClick={() => onChange({ linkIconStyle: "external" })}
                className="p-2 rounded-lg border-2"
                style={settings.linkIconStyle === "external" ? { borderColor: B.green, backgroundColor: B.greenLighter } : { borderColor: B.border }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: B.textSec }} />
              </button>
            </div>
          )}
        </div>

        {settings.colorMode === "advanced" && (
          <details className="mt-3">
            <summary className="text-xs cursor-pointer" style={{ color: B.textSec }}>Advanced settings ›</summary>
            <div className="mt-2 space-y-2">
              <ColorPickerRow label="Link Icons" value={settings.linkIconColor || "#4B5563"} onChange={(v) => onChange({ linkIconColor: v })} />
            </div>
          </details>
        )}
      </SettingCard>
    </>
  );
}

/* ── HEADER ──────────────────────────────────────────────────── */
function HeaderTab({ settings, onChange }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  const t = useT();
  return (
    <>
      <SettingCard title={t("customizePersonalDetails")}>
        <FieldLabel>Align</FieldLabel>
        <div className="flex gap-3 mb-5">
          {([
            { val: "left", icon: (
              <div className="w-12 h-8 flex items-center gap-1 px-1">
                <div className="flex flex-col gap-0.5 flex-1"><div className="w-7 h-1 bg-gray-400 rounded-sm" /><div className="w-5 h-0.5 bg-gray-300 rounded-sm" /></div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: B.green }} />
              </div>
            )},
            { val: "center", icon: (
              <div className="w-12 h-8 flex flex-col items-center justify-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="w-7 h-1 bg-gray-400 rounded-sm" />
                <div className="w-5 h-0.5 bg-gray-300 rounded-sm" />
              </div>
            )},
            { val: "right", icon: (
              <div className="w-12 h-8 flex items-center gap-1 px-1">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="flex flex-col gap-0.5 flex-1 items-end"><div className="w-7 h-1 bg-gray-400 rounded-sm" /><div className="w-5 h-0.5 bg-gray-300 rounded-sm" /></div>
              </div>
            )},
          ] as const).map((opt) => (
            <ThumbOption key={opt.val} selected={settings.headerAlign === opt.val} onClick={() => onChange({ headerAlign: opt.val })} label={opt.val.charAt(0).toUpperCase() + opt.val.slice(1)}>
              {opt.icon}
            </ThumbOption>
          ))}
        </div>


        {/* Contact separator */}
        <div className="flex gap-2 mb-5">
          {([
            { val: "icon", label: "Icon", content: <Smile className="w-4 h-4" style={{ color: B.textSec }} /> },
            { val: "bar", label: "| Bar", content: <span className="text-sm font-bold" style={{ color: B.textSec }}>| Bar</span> },
          ] as const).map((s) => (
            <button
              key={s.val}
              onClick={() => onChange({ contactSeparator: s.val })}
              className={cn(
                "flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border-2 text-xs font-semibold transition-all",
                settings.contactSeparator === s.val ? "shadow-sm" : "bg-white hover:border-gray-300"
              )}
              style={
                settings.contactSeparator === s.val
                  ? { borderColor: B.green, backgroundColor: B.greenLighter, color: B.green }
                  : { borderColor: B.border, color: B.textSec }
              }
            >
              {s.content}
            </button>
          ))}
        </div>
      </SettingCard>

      <SettingCard title={t("customizeName")}>
        <FieldLabel>Size</FieldLabel>
        <div className="mb-3">
          <div className="flex gap-1.5">
            {(["xs","s","m","l","xl"] as const).map((s) => (
              <button
                key={s}
                onClick={() => onChange({ nameSize: s })}
                className={cn("w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-semibold uppercase transition-all")}
                style={
                  settings.nameSize === s
                    ? { borderColor: B.green, backgroundColor: B.greenLighter, color: B.green }
                    : { borderColor: B.border, color: B.textSec }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <CheckboxRow label="Name bold" checked={settings.nameBold} onChange={(v) => onChange({ nameBold: v })} />
        </div>
      </SettingCard>

      <SettingCard title={t("customizeProfessionalTitle")} defaultOpen={false}>
        <FieldLabel>Size</FieldLabel>
        <div className="mb-3">
          <SegmentedControl
            options={[
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L" },
            ]}
            value={settings.titleSize}
            onChange={(v) => onChange({ titleSize: v as "s" | "m" | "l" })}
          />
        </div>
        <FieldLabel>Position</FieldLabel>
        <SegmentedControl
          options={[
            { value: "false", label: "Below Name" },
            { value: "true", label: "Same Line" },
          ]}
          value={String(settings.titleSameLine)}
           onChange={(v) => onChange({ titleSameLine: v === "true" })}
         />
      </SettingCard>

      <SettingCard title={t("customizePhoto")} defaultOpen={false}>
        <div className="space-y-4">
          <SwitchRow label="Show photo" checked={settings.showPhoto !== false} onChange={(v) => onChange({ showPhoto: v })} />
          {settings.showPhoto !== false && (
            <>
              <div>
                <FieldLabel>Size</FieldLabel>
                <SegmentedControl
                  options={[
                    { value: "s", label: "Small" },
                    { value: "m", label: "Medium" },
                    { value: "l", label: "Large" },
                  ]}
                  value={settings.photoSize || "m"}
                  onChange={(v) => onChange({ photoSize: v as "s" | "m" | "l" })}
                />
              </div>
              <div>
                <FieldLabel>Shape</FieldLabel>
                <SegmentedControl
                  options={[
                    { value: "circle", label: "Circle" },
                    { value: "rounded", label: "Rounded" },
                    { value: "square", label: "Square" },
                  ]}
                  value={settings.photoShape || "circle"}
                  onChange={(v) => onChange({ photoShape: v as "circle" | "square" | "rounded" })}
                />
              </div>
            </>
          )}
        </div>
      </SettingCard>
    </>
  );
}

/* ── SECTIONS ───────────────────────────────────────────────── */
function SectionsTab({ settings, onChange, sections }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; sections: ResumeData["sections"] }) {
  const t = useT();
  const hasSkills = sections.some(s => s.type === "skills");
  const hasLanguages = sections.some(s => s.type === "languages");
  const hasEducation = sections.some(s => s.type === "education");
  const hasExperience = sections.some(s => s.type === "experience");
  const hasSummary = sections.some(s => s.type === "summary");

  return (
    <>
      {/* Skills */}
      <SettingCard title={t("customizeSkills")}>
        {hasSkills ? (
            <SegmentedControl
              options={[
                { value: "bullet", label: "• Bullet" },
                { value: "pipe", label: "| Pipe" },
                { value: "newline", label: "New Line" },
                { value: "none", label: "None" },
              ]}
              value={settings.skillsSeparator || "bullet"}
              onChange={(v) => onChange({ skillsSeparator: v as any })}
            />
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>{t("addSkillsFirst") || "Add a Skills section first"}</p>
        )}
      </SettingCard>

      {/* Languages */}
      <SettingCard title={t("customizeLanguagesSection")}>
        {hasLanguages ? (
          <>
            <SegmentedControl
              options={[
                { value: "grid", label: "Grid" },
                { value: "compact", label: "Compact" },
                { value: "bubble", label: "Bubble" },
              ]}
              value={settings.languagesDisplay || "grid"}
              onChange={(v) => onChange({ languagesDisplay: v as any })}
            />
          </>
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>{t("addLanguagesFirst") || "Add a Languages section first"}</p>
        )}
      </SettingCard>

      {/* Profile */}
      {hasSummary && (
        <SettingCard title={t("customizeProfile")}>
          <CheckboxRow label="Show profile heading" checked={true} onChange={() => {}} />
        </SettingCard>
      )}

      {/* Education */}
      <SettingCard title={t("customizeEducation")}>
        {hasEducation ? (
          <>
            <FieldLabel>Title & Subtitle Order</FieldLabel>
            <SegmentedControl
              options={[
                { value: "degree-first", label: "Degree, School" },
                { value: "school-first", label: "School, Degree" },
              ]}
              value={settings.educationOrder || "degree-first"}
              onChange={(v) => onChange({ educationOrder: v as any })}
            />
          </>
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>{t("addEducationFirst") || "Add an Education section first"}</p>
        )}
      </SettingCard>

      {/* Work Experience */}
      <SettingCard title={t("customizeWorkExperience")}>
        {hasExperience ? (
          <>
            <FieldLabel>Order title/subtitle</FieldLabel>
            <div className="mb-3">
              <SegmentedControl
                options={[
                  { value: "title-first", label: "Job Title – Employer" },
                  { value: "employer-first", label: "Employer – Job Title" },
                ]}
                value={settings.experienceOrder || "title-first"}
                onChange={(v) => onChange({ experienceOrder: v as any })}
              />
            </div>
            <FieldLabel>Employment History</FieldLabel>
            <CheckboxRow label="Group promotions" checked={settings.groupPromotions ?? false} onChange={(v) => onChange({ groupPromotions: v })} />
          </>
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>{t("addExperienceFirst") || "Add an Experience section first"}</p>
        )}
      </SettingCard>

      {/* Footer */}
      <SettingCard title={t("customizeFooter")}>
        <div className="space-y-3">
          <CheckboxRow label={t("footerPageNumbers") || "Page numbers"} checked={settings.showPageNumbers} onChange={(v) => onChange({ showPageNumbers: v })} />
          <CheckboxRow label={t("footerEmail") || "Email"} checked={settings.showFooterEmail ?? false} onChange={(v) => onChange({ showFooterEmail: v })} />
          <CheckboxRow label={t("footerName") || "Name"} checked={settings.showFooterName ?? false} onChange={(v) => onChange({ showFooterName: v })} />
        </div>
      </SettingCard>
    </>
  );
}

/* ── Section Reorder Card ──────────────────────────────────── */
function SectionReorderCard({ settings, onChange, sections }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; sections: ResumeData["sections"] }) {
  const t = useT();
  // Build ordered list: use sectionOrder if set, otherwise section natural order
  const order = settings.sectionOrder?.length
    ? settings.sectionOrder.filter((id) => sections.some((s) => s.id === id))
    : sections.map((s) => s.id);

  const allIds = sections.map((s) => s.id);
  const fullOrder = [...order, ...allIds.filter((id) => !order.includes(id))];

  const sectionMap = new Map(sections.map((s) => [s.id, s]));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fullOrder.indexOf(active.id as string);
    const newIndex = fullOrder.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    onChange({ sectionOrder: arrayMove(fullOrder, oldIndex, newIndex) });
  }, [fullOrder, onChange]);

  return (
    <SettingCard title={t("customizeChangeSectionLayout")}>
      {fullOrder.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
          <SortableContext items={fullOrder} strategy={verticalListSortingStrategy}>
            <div className="space-y-1">
              {fullOrder.map((id) => {
                const s = sectionMap.get(id);
                if (!s) return null;
                return <SortableSectionItem key={s.id} id={s.id} title={s.title} columns={settings.columns} />;
              })}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <p className="text-xs py-2" style={{ color: B.textSec }}>Add sections in the Content tab first</p>
      )}
    </SettingCard>
  );
}

function SortableSectionItem({ id, title, columns }: { id: string; title: string; columns: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
    >
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
              style={{ touchAction: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none", minWidth: 44, minHeight: 44 }}
            >
              <GripVertical className="w-4 h-4" style={{ color: B.textSec }} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs">Drag to reorder</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: B.text }}>{title}</span>
      {(columns === "two" || columns === "mix") && (
        <span className="ml-auto text-[10px] bg-gray-100 px-2 py-0.5 rounded-full" style={{ color: B.textSec }}>Main</span>
      )}
    </div>
  );
}
