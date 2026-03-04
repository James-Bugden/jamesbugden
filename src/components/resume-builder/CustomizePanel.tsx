import { useState } from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus, Check, Link, ExternalLink, Smile, Circle, AlignLeft, AlignCenter, AlignRight, Type, GripVertical, Image, Camera } from "lucide-react";
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
import { applyTemplatePreset, TEMPLATE_LIST, TEMPLATE_PRESETS } from "./templatePresets";
import { ResumeThumbnail } from "./ResumeThumbnail";
import { DEFAULT_CUSTOMIZE } from "./customizeTypes";

interface CustomizePanelProps {
  settings: CustomizeSettings;
  onChange: (updates: Partial<CustomizeSettings>) => void;
  sections: ResumeData["sections"];
  resumeData?: ResumeData;
}

const SUB_TABS = ["Basics", "Layout & Spacing", "Design", "Header", "Footer", "Sections"] as const;

/* ── Shared UI helpers ──────────────────────────────────────── */
function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-gray-600 mb-1.5">{children}</label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div className="flex-1 min-w-0">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-sm bg-white text-gray-800 border border-gray-200 outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 appearance-none cursor-pointer"
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
        "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[72px]",
        selected ? "border-purple-500 bg-purple-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
      )}
    >
      {children}
      <span className="text-[10px] font-medium text-gray-600">{label}</span>
    </button>
  );
}

function SliderRow({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <div className="flex items-center gap-1.5">
          <button onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))} className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-mono w-14 text-center text-gray-800">{value}{unit}</span>
          <button onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))} className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
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
        className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-purple-600"
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
            value === o.value ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
          )}
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
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded-md border border-gray-200 cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 text-xs font-mono px-2 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-700"
        />
      </div>
    </div>
  );
}

function SwitchRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
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
              subTab === tab ? "text-purple-700 bg-purple-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f5f5f3]">
        {subTab === "Basics" && <BasicsTab settings={settings} onChange={onChange} resumeData={resumeData} />}
        {subTab === "Layout & Spacing" && <LayoutTab settings={settings} onChange={onChange} sections={sections} />}
        {subTab === "Design" && <DesignTab settings={settings} onChange={onChange} />}
        {subTab === "Header" && <HeaderTab settings={settings} onChange={onChange} />}
        {subTab === "Footer" && <FooterTab settings={settings} onChange={onChange} />}
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
      {/* Language & Region – side by side */}
      <SettingCard title="Language & Region">
        <div className="flex gap-3">
          <SelectField label="Language" value={settings.language} options={LANGUAGE_OPTIONS} onChange={(v) => onChange({ language: v })} />
          <SelectField label="Date Format" value={settings.dateFormat} options={DATE_FORMAT_OPTIONS} onChange={(v) => onChange({ dateFormat: v })} />
        </div>
      </SettingCard>

      {/* Page Format – cleaner cards */}
      <SettingCard title="Page Format">
        <div className="flex gap-3">
          {PAGE_FORMAT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ pageFormat: opt.value })}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-all",
                settings.pageFormat === opt.value
                  ? "border-purple-500 bg-purple-50/60 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div
                className={cn(
                  "border rounded-sm",
                  settings.pageFormat === opt.value ? "border-purple-400" : "border-gray-300",
                  opt.value === "a4" ? "w-7 h-10" : "w-8 h-[38px]"
                )}
              />
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-800">{opt.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {opt.value === "a4" ? "210 × 297mm" : "8.5 × 11in"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SettingCard>

      {/* Templates – mini thumbnails */}
      <SettingCard title="Apply a design template">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {TEMPLATE_LIST.slice(0, 4).map((t) => {
            const previewSettings = applyTemplatePreset(DEFAULT_CUSTOMIZE, t.id);
            const isSelected = settings.template === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.id)}
                className={cn(
                  "rounded-xl border overflow-hidden transition-all text-left",
                  isSelected
                    ? "border-purple-500 ring-2 ring-purple-200 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="aspect-[210/297] bg-gray-50 relative overflow-hidden">
                  <ResumeThumbnail data={resumeData} settings={previewSettings} />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="px-2.5 py-2 bg-white border-t border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-800">{t.name}</p>
                </div>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setGalleryOpen(true)}
          className="w-full py-2.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
        >
          Browse All Templates →
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
            { val: "one", label: "One", icon: <div className="w-10 h-14 border border-current rounded-sm" /> },
            { val: "two", label: "Two", icon: <div className="w-10 h-14 border border-current rounded-sm flex"><div className="w-1/2 border-r border-current" /><div className="w-1/2" /></div> },
            { val: "mix", label: "Mix", icon: <div className="w-10 h-14 border border-current rounded-sm flex"><div className="w-1/3 border-r border-current" /><div className="w-2/3" /></div> },
          ] as const).map((c) => (
            <ThumbOption key={c.val} selected={settings.columns === c.val} onClick={() => onChange({ columns: c.val as any })} label={c.label}>
              {c.icon}
            </ThumbOption>
          ))}
        </div>

        {(settings.columns === "two" || settings.columns === "mix") && (
          <SliderRow
            label="Column Width"
            value={settings.columnRatio}
            min={3}
            max={6}
            step={1}
            unit="/12"
            onChange={(v) => onChange({ columnRatio: v })}
          />
        )}
      </SettingCard>

      {/* Section Layout – draggable pills */}
      <SettingCard title="Section Layout">
        <div className="space-y-1">
          {sections.length > 0 ? sections.map((s) => (
            <div key={s.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
              <span className="text-xs font-semibold text-gray-700 capitalize">{s.title}</span>
              {(settings.columns === "two" || settings.columns === "mix") && (
                <span className="ml-auto text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Main</span>
              )}
            </div>
          )) : (
            <p className="text-xs text-gray-400 py-2">Add sections in the Content tab first</p>
          )}
        </div>
      </SettingCard>

      {/* Spacing */}
      <SettingCard title="Spacing">
        <div className="space-y-5">
          <SliderRow label="Font Size" value={settings.fontSize} min={8} max={16} step={0.5} unit="pt" onChange={(v) => onChange({ fontSize: v })} />
          <SliderRow label="Line Height" value={settings.lineHeight} min={1} max={2.2} step={0.1} unit="" onChange={(v) => onChange({ lineHeight: Math.round(v * 10) / 10 })} />
          <SliderRow label="Left & Right Margin" value={settings.marginX} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginX: v })} />
          <SliderRow label="Top & Bottom Margin" value={settings.marginY} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginY: v })} />
          <SliderRow label="Section Spacing" value={settings.sectionSpacing} min={0} max={20} step={1} unit="mm" onChange={(v) => onChange({ sectionSpacing: v })} />
        </div>
      </SettingCard>

      {/* Entry Layout */}
      <SettingCard title="Entry Layout">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {([
            { val: "stacked", label: "Stacked", desc: "Title, then details below" },
            { val: "inline", label: "Inline", desc: "Title and dates on same line" },
            { val: "compact", label: "Compact", desc: "Minimal spacing" },
            { val: "academic", label: "Academic", desc: "Publication style" },
          ] as const).map((opt) => (
            <button
              key={opt.val}
              onClick={() => onChange({ entryLayout: opt.val })}
              className={cn(
                "p-3 rounded-xl border text-left transition-all",
                settings.entryLayout === opt.val
                  ? "border-purple-500 bg-purple-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <p className="text-xs font-semibold text-gray-800">{opt.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>

        <FieldLabel>Title & Subtitle Size</FieldLabel>
        <div className="mb-4">
          <SegmentedControl
            options={[
              { value: "xs", label: "XS" },
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L" },
            ]}
            value={settings.titleSubtitleSize || "m"}
            onChange={(v) => onChange({ titleSubtitleSize: v as any })}
          />
        </div>

        <FieldLabel>Subtitle Style</FieldLabel>
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

        <FieldLabel>Subtitle Placement</FieldLabel>
        <div className="mb-4">
          <SegmentedControl
            options={[
              { value: "same-line", label: "Same Line" },
              { value: "next-line", label: "Next Line" },
            ]}
            value={settings.subtitlePlacement || "next-line"}
            onChange={(v) => onChange({ subtitlePlacement: v as any })}
          />
        </div>

        <FieldLabel>List Style</FieldLabel>
        <SegmentedControl
          options={[
            { value: "bullet", label: "• Bullet" },
            { value: "hyphen", label: "- Hyphen" },
            { value: "none", label: "None" },
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
      {/* Font – prominent at top */}
      <SettingCard title="Font">
        <FieldLabel>Body font</FieldLabel>
        <div className="mb-4">
          <FontPicker selectedFont={settings.bodyFont} onSelect={(f) => onChange({ bodyFont: f })} />
        </div>
        <FieldLabel>Heading font</FieldLabel>
        <FontPicker selectedFont={settings.headingFont || settings.bodyFont} onSelect={(f) => onChange({ headingFont: f })} />
      </SettingCard>

      {/* Color */}
      <SettingCard title="Color">
        <FieldLabel>Accent color</FieldLabel>
        <div className="grid grid-cols-10 gap-1.5 mb-4">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChange({ accentColor: color })}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
                settings.accentColor === color ? "border-purple-600 ring-2 ring-purple-300 scale-110" : "border-gray-200"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
          <button className="w-6 h-6 rounded-full border-2 border-gray-200" style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }} />
        </div>

        {/* Apply accent color to */}
        <FieldLabel>Apply accent color to</FieldLabel>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {([
            { key: "accentApplyName", label: "Name" },
            { key: "accentApplyHeadings", label: "Headings" },
            { key: "accentApplyDates", label: "Dates" },
            { key: "accentApplyTitle", label: "Job Title" },
            { key: "accentApplyIcons", label: "Icons" },
            { key: "accentApplySubtitle", label: "Subtitle" },
            { key: "accentApplyLines", label: "Lines" },
          ] as const).map((item) => (
            <label key={item.key} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <Checkbox
                checked={(settings as any)[item.key] ?? false}
                onCheckedChange={(v) => onChange({ [item.key]: !!v })}
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* Deep Color Mapping */}
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
      </SettingCard>

      {/* Section Headings */}
      <SettingCard title="Section Headings">
        <FieldLabel>Style</FieldLabel>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {HEADING_STYLES.map((hs) => (
            <button
              key={hs.id}
              onClick={() => onChange({ headingStyle: hs.id })}
              className={cn(
                "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all",
                settings.headingStyle === hs.id
                  ? "border-purple-500 bg-purple-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div className="w-14 h-5 flex items-center justify-center">
                <HeadingStyleThumb id={hs.id} accent={settings.accentColor} />
              </div>
              <span className="text-[10px] font-medium text-gray-600">{hs.label}</span>
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

        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <Checkbox checked={settings.headingUppercase !== false} onCheckedChange={(v) => onChange({ headingUppercase: !!v })} />
          Uppercase headings
        </label>
      </SettingCard>

      {/* Link styling */}
      <SettingCard title="Link Styling">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <Checkbox checked={settings.linkUnderline} onCheckedChange={(v) => onChange({ linkUnderline: !!v })} />
            Underline
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <Checkbox checked={settings.linkBlue} onCheckedChange={(v) => onChange({ linkBlue: !!v })} />
            Blue color
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <Checkbox checked={settings.linkIcon} onCheckedChange={(v) => onChange({ linkIcon: !!v })} />
            Show link icon
          </label>
          {settings.linkIcon && (
            <div className="flex gap-2 ml-6">
              <button
                onClick={() => onChange({ linkIconStyle: "link" })}
                className={cn("p-2 rounded-lg border", settings.linkIconStyle === "link" ? "border-purple-500 bg-purple-50" : "border-gray-200")}
              >
                <Link className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => onChange({ linkIconStyle: "external" })}
                className={cn("p-2 rounded-lg border", settings.linkIconStyle === "external" ? "border-purple-500 bg-purple-50" : "border-gray-200")}
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </SettingCard>
    </>
  );
}

/* ── HEADER ──────────────────────────────────────────────────── */
function HeaderTab({ settings, onChange }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  return (
    <>
      <SettingCard title="Alignment & Arrangement">
        <FieldLabel>Align</FieldLabel>
        <div className="flex gap-3 mb-5">
          <ThumbOption selected={settings.headerAlign === "left"} onClick={() => onChange({ headerAlign: "left" })} label="Left">
            <AlignLeft className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.headerAlign === "center"} onClick={() => onChange({ headerAlign: "center" })} label="Center">
            <AlignCenter className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.headerAlign === "right"} onClick={() => onChange({ headerAlign: "right" })} label="Right">
            <AlignRight className="w-5 h-5 text-gray-500" />
          </ThumbOption>
        </div>

        <FieldLabel>Arrangement</FieldLabel>
        <div className="flex gap-3">
          <ThumbOption selected={settings.headerArrangement === "stacked"} onClick={() => onChange({ headerArrangement: "stacked" })} label="Stacked">
            <div className="w-12 h-7 flex flex-col gap-0.5 items-center justify-center">
              <div className="w-7 h-1 bg-gray-400 rounded" />
              <div className="w-5 h-1 bg-gray-300 rounded" />
              <div className="w-6 h-1 bg-gray-300 rounded" />
            </div>
          </ThumbOption>
          <ThumbOption selected={settings.headerArrangement === "inline"} onClick={() => onChange({ headerArrangement: "inline" })} label="Inline">
            <div className="w-12 h-7 flex items-center justify-center gap-1">
              <div className="w-3 h-1 bg-gray-400 rounded" />
              <div className="w-3 h-1 bg-gray-300 rounded" />
              <div className="w-3 h-1 bg-gray-300 rounded" />
            </div>
          </ThumbOption>
        </div>
      </SettingCard>

      <SettingCard title="Contact Details">
        <FieldLabel>Separator</FieldLabel>
        <div className="flex gap-3 mb-5">
          <ThumbOption selected={settings.contactSeparator === "icon"} onClick={() => onChange({ contactSeparator: "icon" })} label="Icon">
            <Smile className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.contactSeparator === "bullet"} onClick={() => onChange({ contactSeparator: "bullet" })} label="Bullet">
            <span className="text-lg text-gray-500 font-bold">·</span>
          </ThumbOption>
          <ThumbOption selected={settings.contactSeparator === "bar"} onClick={() => onChange({ contactSeparator: "bar" })} label="Bar">
            <span className="text-lg text-gray-500 font-bold">|</span>
          </ThumbOption>
        </div>

        <FieldLabel>Header Icons</FieldLabel>
        <div className="flex gap-3 mb-5">
          <ThumbOption selected={settings.headerIconStyle === "outline"} onClick={() => onChange({ headerIconStyle: "outline" })} label="Outline">
            <Circle className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.headerIconStyle === "filled"} onClick={() => onChange({ headerIconStyle: "filled" })} label="Filled">
            <Circle className="w-5 h-5 text-gray-500" fill="currentColor" />
          </ThumbOption>
          <ThumbOption selected={settings.headerIconStyle === "none"} onClick={() => onChange({ headerIconStyle: "none" })} label="None">
            <span className="text-xs text-gray-400">—</span>
          </ThumbOption>
        </div>

        <FieldLabel>Icon Style</FieldLabel>
        <div className="flex gap-1.5 flex-wrap">
          {[0,1,2,3,4,5,6,7].map((i) => (
            <button
              key={i}
              onClick={() => onChange({ iconStyle: i })}
              className={cn(
                "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                settings.iconStyle === i ? "border-purple-500 bg-purple-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div className={cn("w-3.5 h-3.5 rounded-full", i % 2 === 0 ? "border border-gray-400" : "bg-gray-400")} />
            </button>
          ))}
        </div>
      </SettingCard>

      <SettingCard title="Name">
        <FieldLabel>Size</FieldLabel>
        <div className="mb-3">
          <SegmentedControl
            options={[
              { value: "xs", label: "XS" },
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L" },
              { value: "xl", label: "XL" },
            ]}
            value={settings.nameSize}
            onChange={(v) => onChange({ nameSize: v as CustomizeSettings["nameSize"] })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-3">
          <Checkbox checked={settings.nameBold} onCheckedChange={(v) => onChange({ nameBold: !!v })} />
          Bold
        </label>
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

      <SettingCard title="Professional Title">
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
        <div className="flex items-center gap-3 py-2 text-gray-400">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Camera className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-xs">Add a photo in the Content tab to enable photo styling options</p>
        </div>
      </SettingCard>
    </>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function FooterTab({ settings, onChange }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  return (
    <SettingCard title="Footer">
      <div className="space-y-4">
        <SwitchRow label="Show page numbers" checked={settings.showPageNumbers} onChange={(v) => onChange({ showPageNumbers: v })} />
        <SwitchRow label="Show email in footer" checked={settings.showFooterEmail ?? false} onChange={(v) => onChange({ showFooterEmail: v })} />
        <SwitchRow label="Show name in footer" checked={settings.showFooterName ?? false} onChange={(v) => onChange({ showFooterName: v })} />
      </div>
    </SettingCard>
  );
}

/* ── SECTIONS ───────────────────────────────────────────────── */
function SectionsTab({ settings, onChange, sections }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void; sections: ResumeData["sections"] }) {
  const hasSkills = sections.some(s => s.type === "skills");
  const hasLanguages = sections.some(s => s.type === "languages");
  const hasEducation = sections.some(s => s.type === "education");
  const hasExperience = sections.some(s => s.type === "experience");

  const displayStyleOptions = [
    { val: "grid", label: "Grid", desc: "Comma-separated tags" },
    { val: "level", label: "Level", desc: "Progress bars" },
    { val: "compact", label: "Compact", desc: "Inline text list" },
    { val: "bubble", label: "Bubble", desc: "Rounded pill tags" },
  ] as const;

  return (
    <>
      {/* Skills */}
      <SettingCard title="Skills Display">
        {hasSkills ? (
          <div className="grid grid-cols-2 gap-2">
            {displayStyleOptions.map((opt) => (
              <button
                key={opt.val}
                onClick={() => onChange({ skillsDisplay: opt.val })}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all",
                  (settings.skillsDisplay || "grid") === opt.val
                    ? "border-purple-500 bg-purple-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <p className="text-xs font-semibold text-gray-800">{opt.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">Add a Skills section first</p>
        )}
      </SettingCard>

      {/* Languages */}
      <SettingCard title="Languages Display">
        {hasLanguages ? (
          <div className="grid grid-cols-2 gap-2">
            {displayStyleOptions.map((opt) => (
              <button
                key={opt.val}
                onClick={() => onChange({ languagesDisplay: opt.val })}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all",
                  (settings.languagesDisplay || "grid") === opt.val
                    ? "border-purple-500 bg-purple-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <p className="text-xs font-semibold text-gray-800">{opt.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">Add a Languages section first</p>
        )}
      </SettingCard>

      {/* Education Order */}
      <SettingCard title="Education">
        {hasEducation ? (
          <>
            <FieldLabel>Display order</FieldLabel>
            <SegmentedControl
              options={[
                { value: "degree-first", label: "Degree First" },
                { value: "school-first", label: "School First" },
              ]}
              value={settings.educationOrder || "degree-first"}
              onChange={(v) => onChange({ educationOrder: v as any })}
            />
          </>
        ) : (
          <p className="text-xs text-gray-400">Add an Education section first</p>
        )}
      </SettingCard>

      {/* Experience Order */}
      <SettingCard title="Experience">
        {hasExperience ? (
          <>
            <FieldLabel>Display order</FieldLabel>
            <SegmentedControl
              options={[
                { value: "title-first", label: "Job Title First" },
                { value: "employer-first", label: "Employer First" },
              ]}
              value={settings.experienceOrder || "title-first"}
              onChange={(v) => onChange({ experienceOrder: v as any })}
            />
          </>
        ) : (
          <p className="text-xs text-gray-400">Add an Experience section first</p>
        )}
      </SettingCard>
    </>
  );
}
