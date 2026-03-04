import { useState } from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus, Check, Link, ExternalLink, Smile, Circle, AlignLeft, AlignCenter, AlignRight, GripVertical, Camera } from "lucide-react";
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
import { TemplateGalleryModal } from "./TemplateGalleryModal";
import { FontPicker } from "./FontPicker";
import { applyTemplatePreset, TEMPLATE_LIST } from "./templatePresets";
import { ResumeThumbnail } from "./ResumeThumbnail";
import { DEFAULT_CUSTOMIZE } from "./customizeTypes";

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
function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-bold mb-4" style={{ color: B.text, fontFamily: "var(--font-heading)" }}>{title}</h3>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold mb-1.5" style={{ color: B.text }}>{children}</label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div className="flex-1 min-w-0">
      <FieldLabel>{label}</FieldLabel>
      <select
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
          <button onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))} className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: B.textSec }}>
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-mono w-14 text-center" style={{ color: B.text }}>{value}{unit}</span>
          <button onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))} className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: B.textSec }}>
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
            "flex-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
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

function ColorPickerRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-semibold" style={{ color: B.textSec }}>{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded-md border cursor-pointer p-0.5" style={{ borderColor: B.border }} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-20 text-xs font-mono px-2 py-1 rounded-md bg-gray-50 border" style={{ color: B.text, borderColor: B.border }} />
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
  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>("Basics");

  return (
    <div className="h-full flex flex-col">
      {/* Sub-tab bar */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-white overflow-x-auto shrink-0">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-lg transition-all",
              subTab === tab ? "" : "hover:bg-gray-50"
            )}
            style={
              subTab === tab
                ? { color: B.green, backgroundColor: B.greenLighter }
                : { color: B.textSec }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "#f5f5f3" }}>
        {subTab === "Basics" && <BasicsTab settings={settings} onChange={onChange} resumeData={resumeData} />}
        {subTab === "Layout & Spacing" && <LayoutTab settings={settings} onChange={onChange} sections={sections} />}
        {subTab === "Design" && <DesignTab settings={settings} onChange={onChange} />}
        {subTab === "Header" && <HeaderTab settings={settings} onChange={onChange} />}
        {subTab === "Sections" && <SectionsTab settings={settings} onChange={onChange} sections={sections} />}
      </div>
    </div>
  );
}

/* ── BASICS ─────────────────────────────────────────────────── */
function BasicsTab({ settings, onChange, resumeData }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; resumeData?: ResumeData }) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const newSettings = applyTemplatePreset(settings, templateId);
    onChange(newSettings);
  };

  return (
    <>
      <SettingCard title="Language & Region">
        <div className="flex gap-3">
          <SelectField label="Language" value={settings.language} options={LANGUAGE_OPTIONS} onChange={(v) => onChange({ language: v })} />
          <SelectField label="Date Format" value={settings.dateFormat} options={DATE_FORMAT_OPTIONS} onChange={(v) => onChange({ dateFormat: v })} />
          <SelectField label="Page Format" value={settings.pageFormat} options={PAGE_FORMAT_OPTIONS} onChange={(v) => onChange({ pageFormat: v })} />
        </div>
      </SettingCard>

      <SettingCard title="Apply a design template">
        <p className="text-xs mb-3" style={{ color: B.textSec }}>Update your entire resume design with one click ✨</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {TEMPLATE_LIST.slice(0, 4).map((t) => {
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
        <button
          onClick={() => setGalleryOpen(true)}
          className="w-full py-2.5 rounded-xl text-xs font-semibold border transition-colors"
          style={{ color: B.green, backgroundColor: B.greenLighter, borderColor: B.greenLight }}
        >
          Browse Templates
        </button>
      </SettingCard>

      <TemplateGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        selected={settings.template}
        onSelect={handleTemplateSelect}
        resumeData={resumeData}
      />
    </>
  );
}

/* ── LAYOUT & SPACING ───────────────────────────────────────── */
function LayoutTab({ settings, onChange, sections }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; sections: ResumeData["sections"] }) {
  return (
    <>
      <SettingCard title="Layout">
        <FieldLabel>Columns</FieldLabel>
        <div className="flex gap-3 mb-4">
          {([
            { val: "one", label: "One", icon: (
              <div className="w-12 h-16 border-2 border-current rounded-sm flex flex-col gap-0.5 p-1 items-center justify-center">
                <div className="w-full h-1 bg-current rounded-sm opacity-60" />
                <div className="w-full h-1 bg-current rounded-sm opacity-40" />
                <div className="w-full h-1 bg-current rounded-sm opacity-40" />
              </div>
            )},
            { val: "two", label: "Two", icon: (
              <div className="w-12 h-16 border-2 border-current rounded-sm flex gap-0.5 p-1">
                <div className="w-1/2 flex flex-col gap-0.5"><div className="w-full h-1 bg-current rounded-sm opacity-60" /><div className="w-full h-1 bg-current rounded-sm opacity-40" /></div>
                <div className="w-1/2 flex flex-col gap-0.5"><div className="w-full h-1 bg-current rounded-sm opacity-60" /><div className="w-full h-1 bg-current rounded-sm opacity-40" /></div>
              </div>
            )},
            { val: "mix", label: "Mix", icon: (
              <div className="w-12 h-16 border-2 border-current rounded-sm flex gap-0.5 p-1">
                <div className="w-1/3 flex flex-col gap-0.5"><div className="w-full h-1 bg-current rounded-sm opacity-60" /><div className="w-full h-1 bg-current rounded-sm opacity-40" /></div>
                <div className="w-2/3 flex flex-col gap-0.5"><div className="w-full h-1 bg-current rounded-sm opacity-60" /><div className="w-full h-1 bg-current rounded-sm opacity-40" /></div>
              </div>
            )},
          ] as const).map((c) => (
            <ThumbOption key={c.val} selected={settings.columns === c.val} onClick={() => onChange({ columns: c.val as any })} label={c.label}>
              {c.icon}
            </ThumbOption>
          ))}
        </div>

        {(settings.columns === "two" || settings.columns === "mix") && (
          <SliderRow label="Column Width" value={settings.columnRatio} min={3} max={6} step={1} unit="/12" onChange={(v) => onChange({ columnRatio: v })} />
        )}
      </SettingCard>

      <SettingCard title="Change Section Layout">
        <div className="space-y-1">
          {sections.length > 0 ? sections.map((s) => (
            <div key={s.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: B.text }}>{s.title}</span>
              {(settings.columns === "two" || settings.columns === "mix") && (
                <span className="ml-auto text-[10px] bg-gray-100 px-2 py-0.5 rounded-full" style={{ color: B.textSec }}>Main</span>
              )}
            </div>
          )) : (
            <p className="text-xs py-2" style={{ color: B.textSec }}>Add sections in the Content tab first</p>
          )}
        </div>
      </SettingCard>

      <SettingCard title="Spacing">
        <div className="space-y-5">
          <SliderRow label="Font Size" value={settings.fontSize} min={8} max={16} step={0.5} unit="pt" onChange={(v) => onChange({ fontSize: v })} />
          <SliderRow label="Line Height" value={settings.lineHeight} min={1} max={2.2} step={0.1} unit="" onChange={(v) => onChange({ lineHeight: Math.round(v * 10) / 10 })} />
          <SliderRow label="Left & Right Margin" value={settings.marginX} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginX: v })} />
          <SliderRow label="Top & Bottom Margin" value={settings.marginY} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginY: v })} />
          <SliderRow label="Space between Entries" value={settings.sectionSpacing} min={0} max={20} step={1} unit="mm" onChange={(v) => onChange({ sectionSpacing: v })} />
        </div>
      </SettingCard>

      <SettingCard title="Entry Layout">
        {/* Visual layout icons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {([
            { val: "stacked", icon: (
              <div className="w-full h-10 flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-1"><div className="w-14 h-1.5 bg-gray-500 rounded-sm" /><div className="w-4 h-1 bg-gray-300 rounded-sm" /><div className="w-3 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="w-10 h-1 bg-gray-300 rounded-sm" />
                <div className="flex gap-0.5"><div className="w-20 h-1 bg-gray-200 rounded-sm" /></div>
              </div>
            )},
            { val: "inline", icon: (
              <div className="w-full h-10 flex flex-col gap-1 justify-center">
                <div className="flex items-center justify-between"><div className="flex items-center gap-1"><div className="w-8 h-1.5 bg-gray-500 rounded-sm" /><div className="w-4 h-1 bg-gray-300 rounded-sm" /></div><div className="w-6 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="flex gap-0.5"><div className="w-20 h-1 bg-gray-200 rounded-sm" /></div>
              </div>
            )},
            { val: "compact", icon: (
              <div className="w-full h-10 flex flex-col gap-0.5 justify-center">
                <div className="flex items-center gap-1"><div className="w-12 h-1.5 bg-gray-500 rounded-sm" /><div className="w-6 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="w-16 h-1 bg-gray-200 rounded-sm" />
              </div>
            )},
            { val: "academic", icon: (
              <div className="w-full h-10 flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-1"><div className="w-14 h-1.5 bg-gray-500 rounded-sm" /><div className="w-6 h-1 bg-gray-300 rounded-sm" /></div>
                <div className="w-10 h-1 bg-gray-300 rounded-sm italic" style={{ borderBottom: "1px solid #d1d5db" }} />
                <div className="w-20 h-1 bg-gray-200 rounded-sm" />
              </div>
            )},
          ] as const).map((opt) => (
            <button
              key={opt.val}
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
          ))}
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
  return (
    <>
      <SettingCard title="Font">
        <FontPicker selectedFont={settings.bodyFont} onSelect={(f) => onChange({ bodyFont: f })} />
      </SettingCard>

      <SettingCard title="Colors">
        {/* Color mode */}
        <div className="flex gap-3 mb-4">
          {([
            { val: "basic", label: "Basic", icon: (
              <div className="w-10 h-10 rounded-full border-2" style={{ borderColor: settings.colorMode === "basic" ? B.green : "#d1d5db" }} />
            )},
            { val: "advanced", label: "Advanced", icon: (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: settings.colorMode === "advanced" ? B.green : "#d1d5db" }}>
                <div className="w-full h-1/2 bg-gray-300" /><div className="w-full h-1/2 bg-gray-400" />
              </div>
            )},
            { val: "border", label: "Border", icon: (
              <div className="w-10 h-10 rounded-full border-2 bg-white flex items-center justify-center" style={{ borderColor: settings.colorMode === "border" ? B.green : "#d1d5db" }}>
                <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
              </div>
            )},
          ] as const).map((m) => (
            <button
              key={m.val}
              onClick={() => onChange({ colorMode: m.val })}
              className="flex flex-col items-center gap-1.5"
            >
              {m.icon}
              <span className="text-[10px] font-medium" style={{ color: B.textSec }}>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Color type */}
        <div className="flex gap-2 mb-4">
          {([
            { val: "accent", label: "Accent", icon: <div className="w-8 h-6 rounded" style={{ backgroundColor: settings.accentColor || B.green }}><Check className="w-3 h-3 text-white mx-auto mt-1.5" /></div> },
            { val: "multi", label: "Multi", icon: <div className="w-8 h-6 rounded bg-gray-600 flex items-center justify-center"><span className="text-white text-[9px] font-bold">T</span><div className="w-2 h-4 bg-gray-800 ml-0.5" /></div> },
            { val: "image", label: "Image", icon: <div className="w-8 h-6 rounded bg-gradient-to-br from-gray-300 to-gray-500" /> },
          ] as const).map((ct) => (
            <button
              key={ct.val}
              onClick={() => onChange({ colorType: ct.val })}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all flex-1",
                settings.colorType === ct.val ? "shadow-sm" : "bg-white hover:border-gray-300"
              )}
              style={
                settings.colorType === ct.val
                  ? { borderColor: B.green, backgroundColor: B.greenLighter }
                  : { borderColor: B.border }
              }
            >
              {ct.icon}
              <span className="text-[10px] font-medium" style={{ color: B.textSec }}>{ct.label}</span>
            </button>
          ))}
        </div>

        {/* Accent color swatches */}
        <div className="grid grid-cols-10 gap-1.5 mb-4">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChange({ accentColor: color })}
              className={cn("w-6 h-6 rounded-full border-2 transition-transform hover:scale-110", settings.accentColor === color ? "scale-110" : "")}
              style={{
                backgroundColor: color,
                borderColor: settings.accentColor === color ? B.green : "transparent",
                boxShadow: settings.accentColor === color ? `0 0 0 2px ${B.greenLight}` : "none",
              }}
            />
          ))}
          <button className="w-6 h-6 rounded-full border-2" style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)", borderColor: B.border }} />
        </div>

        {/* Apply accent color checkboxes */}
        <FieldLabel>Apply accent color</FieldLabel>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <CheckboxRow label="Name" checked={settings.accentApplyName} onChange={(v) => onChange({ accentApplyName: v })} />
          <CheckboxRow label="Dots/Bars/Bubbles" checked={settings.accentApplyIcons} onChange={(v) => onChange({ accentApplyIcons: v })} />
          <CheckboxRow label="Job title" checked={settings.accentApplyTitle} onChange={(v) => onChange({ accentApplyTitle: v })} />
          <CheckboxRow label="Dates" checked={settings.accentApplyDates} onChange={(v) => onChange({ accentApplyDates: v })} />
          <CheckboxRow label="Headings" checked={settings.accentApplyHeadings} onChange={(v) => onChange({ accentApplyHeadings: v })} />
          <CheckboxRow label="Entry subtitle" checked={settings.accentApplySubtitle} onChange={(v) => onChange({ accentApplySubtitle: v })} />
          <CheckboxRow label="Headings Line" checked={settings.accentApplyLines} onChange={(v) => onChange({ accentApplyLines: v })} />
          <CheckboxRow label="Link icons" checked={settings.accentApplyIcons} onChange={(v) => onChange({ accentApplyIcons: v })} />
          <CheckboxRow label="Header icons" checked={settings.accentApplyIcons} onChange={(v) => onChange({ accentApplyIcons: v })} />
        </div>

        {settings.colorMode === "advanced" && (
          <>
            <FieldLabel>Custom colors</FieldLabel>
            <div className="space-y-2.5 mt-2">
              <ColorPickerRow label="Name" value={settings.nameColor || "#111827"} onChange={(v) => onChange({ nameColor: v })} />
              <ColorPickerRow label="Job Title" value={settings.titleColor || "#6B7280"} onChange={(v) => onChange({ titleColor: v })} />
              <ColorPickerRow label="Headings" value={settings.headingsColor || "#111827"} onChange={(v) => onChange({ headingsColor: v })} />
              <ColorPickerRow label="Dates" value={settings.datesColor || "#6B7280"} onChange={(v) => onChange({ datesColor: v })} />
              <ColorPickerRow label="Entry Subtitle" value={settings.subtitleColor || "#6B7280"} onChange={(v) => onChange({ subtitleColor: v })} />
              <ColorPickerRow label="Link Icons" value={settings.linkIconColor || "#4B5563"} onChange={(v) => onChange({ linkIconColor: v })} />
              <div className="pt-2 border-t border-gray-100">
                <ColorPickerRow label="A4 Background" value={settings.a4Background || "#ffffff"} onChange={(v) => onChange({ a4Background: v })} />
              </div>
            </div>
          </>
        )}
      </SettingCard>

      <SettingCard title="Section Headings">
        <FieldLabel>Style</FieldLabel>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {HEADING_STYLES.map((hs) => (
            <button
              key={hs.id}
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
          ))}
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

      <SettingCard title="Link styling">
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
  return (
    <>
      <SettingCard title="Personal Details">
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

        <FieldLabel>Arrangement</FieldLabel>
        <div className="flex gap-3 mb-5">
          <ThumbOption selected={settings.headerArrangement === "stacked"} onClick={() => onChange({ headerArrangement: "stacked" })} label="Stacked">
            <div className="w-12 h-7 flex flex-col gap-0.5 items-center justify-center">
              <div className="w-7 h-1 bg-gray-400 rounded" />
              <div className="w-5 h-1 bg-gray-300 rounded" />
              <div className="w-6 h-1 bg-gray-300 rounded" />
            </div>
          </ThumbOption>
          <ThumbOption selected={settings.headerArrangement === "inline"} onClick={() => onChange({ headerArrangement: "inline" })} label="Inline">
            <div className="w-12 h-7 flex items-center justify-center gap-0.5">
              <div className="w-3 h-1.5 bg-gray-500 rounded" />
              <div className="w-0.5 h-3 bg-gray-300" />
              <div className="flex flex-col gap-0.5"><div className="w-5 h-1 bg-gray-300 rounded" /><div className="w-4 h-1 bg-gray-300 rounded" /></div>
            </div>
          </ThumbOption>
        </div>

        {/* Contact separator */}
        <div className="flex gap-2 mb-5">
          {([
            { val: "icon", label: "Icon", content: <Smile className="w-4 h-4" style={{ color: B.textSec }} /> },
            { val: "bullet", label: "• Bullet", content: <span className="text-sm font-bold" style={{ color: B.textSec }}>• Bullet</span> },
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

        <FieldLabel>Icon Style</FieldLabel>
        <div className="flex gap-1.5 flex-wrap">
          {[0,1,2,3,4,5,6,7].map((i) => (
            <button
              key={i}
              onClick={() => onChange({ iconStyle: i })}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all"
              style={
                settings.iconStyle === i
                  ? { borderColor: B.green, backgroundColor: B.greenLighter }
                  : { borderColor: B.border, backgroundColor: "#fff" }
              }
            >
              <div className={cn("w-3.5 h-3.5 rounded-full", i % 2 === 0 ? "border border-gray-400" : "bg-gray-400")} />
            </button>
          ))}
        </div>
      </SettingCard>

      <SettingCard title="Name">
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
        <FieldLabel>Font</FieldLabel>
        <SegmentedControl
          options={[
            { value: "body", label: "Body Font" },
            { value: "creative", label: "Creative" },
          ]}
          value={settings.nameFont}
          onChange={(v) => onChange({ nameFont: v as "body" | "creative" })}
        />
      </SettingCard>

      <SettingCard title="Professional title">
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

      <SettingCard title="Photo">
        <div className="flex items-center gap-3 py-2" style={{ color: B.textSec }}>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Camera className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-xs">Add a photo in the Content tab to enable photo styling options</p>
        </div>
      </SettingCard>
    </>
  );
}

/* ── SECTIONS ───────────────────────────────────────────────── */
function SectionsTab({ settings, onChange, sections }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; sections: ResumeData["sections"] }) {
  const hasSkills = sections.some(s => s.type === "skills");
  const hasLanguages = sections.some(s => s.type === "languages");
  const hasEducation = sections.some(s => s.type === "education");
  const hasExperience = sections.some(s => s.type === "experience");
  const hasSummary = sections.some(s => s.type === "summary");

  return (
    <>
      {/* Skills */}
      <SettingCard title="Skills">
        {hasSkills ? (
          <>
            <SegmentedControl
              options={[
                { value: "grid", label: "Grid" },
                { value: "level", label: "Level" },
                { value: "compact", label: "Compact" },
                { value: "bubble", label: "Bubble" },
              ]}
              value={settings.skillsDisplay || "grid"}
              onChange={(v) => onChange({ skillsDisplay: v as any })}
            />
            <div className="mt-3">
              <SegmentedControl
                options={[
                  { value: "bullet", label: "• Bullet" },
                  { value: "pipe", label: "| Pipe" },
                  { value: "newline", label: "New Line" },
                  { value: "comma", label: ", Comma" },
                ]}
                value={"bullet"}
                onChange={() => {}}
              />
            </div>
          </>
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>Add a Skills section first</p>
        )}
      </SettingCard>

      {/* Languages */}
      <SettingCard title="Languages">
        {hasLanguages ? (
          <>
            <SegmentedControl
              options={[
                { value: "grid", label: "Grid" },
                { value: "level", label: "Level" },
                { value: "compact", label: "Compact" },
                { value: "bubble", label: "Bubble" },
              ]}
              value={settings.languagesDisplay || "grid"}
              onChange={(v) => onChange({ languagesDisplay: v as any })}
            />
          </>
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>Add a Languages section first</p>
        )}
      </SettingCard>

      {/* Profile */}
      {hasSummary && (
        <SettingCard title="Profile">
          <CheckboxRow label="Show profile heading" checked={true} onChange={() => {}} />
        </SettingCard>
      )}

      {/* Education */}
      <SettingCard title="Education">
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
          <p className="text-xs" style={{ color: B.textSec }}>Add an Education section first</p>
        )}
      </SettingCard>

      {/* Work Experience */}
      <SettingCard title="Work Experience">
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
            <CheckboxRow label="Group promotions" checked={false} onChange={() => {}} />
          </>
        ) : (
          <p className="text-xs" style={{ color: B.textSec }}>Add an Experience section first</p>
        )}
      </SettingCard>

      {/* Footer (moved from separate tab) */}
      <SettingCard title="Footer">
        <div className="space-y-3">
          <CheckboxRow label="Page numbers" checked={settings.showPageNumbers} onChange={(v) => onChange({ showPageNumbers: v })} />
          <CheckboxRow label="Email" checked={settings.showFooterEmail ?? false} onChange={(v) => onChange({ showFooterEmail: v })} />
          <CheckboxRow label="Name" checked={settings.showFooterName ?? false} onChange={(v) => onChange({ showFooterName: v })} />
        </div>
      </SettingCard>
    </>
  );
}
