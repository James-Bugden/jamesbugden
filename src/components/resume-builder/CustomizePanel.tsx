import { useState } from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus, Check, Link, ExternalLink, Smile, Circle, AlignLeft, AlignCenter, AlignRight, Type, Sparkles, GripVertical, Image } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CustomizeSettings,
  ACCENT_COLORS,
  LANGUAGE_OPTIONS,
  DATE_FORMAT_OPTIONS,
  PAGE_FORMAT_OPTIONS,
} from "./customizeTypes";
import { ResumeData } from "./types";
import { TemplateGalleryModal } from "./TemplateGalleryModal";
import { FontPicker } from "./FontPicker";

interface CustomizePanelProps {
  settings: CustomizeSettings;
  onChange: (updates: Partial<CustomizeSettings>) => void;
  sections: ResumeData["sections"];
}

const SUB_TABS = ["Basics", "Layout & Spacing", "Design", "Header", "Sections"] as const;

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
        className="w-full px-3 py-2 rounded-lg text-sm bg-[#F5F3EE] text-gray-800 border-0 outline-none focus:ring-2 focus:ring-purple-300 appearance-none cursor-pointer"
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
        "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-colors min-w-[72px]",
        selected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white hover:border-gray-300"
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
          <button onClick={() => onChange(Math.max(min, value - step))} className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600">
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-gray-800">{value}{unit}</span>
          <button onClick={() => onChange(Math.min(max, value + step))} className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-purple-600"
      />
    </div>
  );
}

function ToggleGroup({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
            value === o.value ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */
export function CustomizePanel({ settings, onChange, sections }: CustomizePanelProps) {
  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>("Basics");

  return (
    <div className="h-full flex flex-col">
      {/* Sub-tab bar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 bg-white overflow-x-auto shrink-0">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-md transition-colors",
              subTab === tab ? "text-gray-900 bg-gray-100" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f3f4f6]">
        {subTab === "Basics" && <BasicsTab settings={settings} onChange={onChange} />}
        {subTab === "Layout & Spacing" && <LayoutTab settings={settings} onChange={onChange} sections={sections} />}
        {subTab === "Design" && <DesignTab settings={settings} onChange={onChange} />}
        {subTab === "Header" && <HeaderTab settings={settings} onChange={onChange} />}
        {subTab === "Sections" && <SectionsTab />}
      </div>
    </div>
  );
}

/* ── BASICS ─────────────────────────────────────────────────── */
function BasicsTab({ settings, onChange }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  const [galleryOpen, setGalleryOpen] = useState(false);

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
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Update your entire resume design with one click
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 items-center">
          {["classic", "modern-sidebar", "minimal", "executive", "bold-creative"].map((t) => (
            <button
              key={t}
              onClick={() => onChange({ template: t })}
              className={cn(
                "flex-shrink-0 w-20 h-28 rounded-lg border-2 flex items-center justify-center text-[10px] font-semibold capitalize transition-colors",
                settings.template === t
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
              )}
            >
              {t.replace(/-/g, " ")}
            </button>
          ))}
          <button
            onClick={() => setGalleryOpen(true)}
            className="flex-shrink-0 px-4 py-2 text-xs font-semibold text-purple-600 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors whitespace-nowrap"
          >
            Browse Templates
          </button>
        </div>
      </SettingCard>

      <TemplateGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        selected={settings.template}
        onSelect={(t) => onChange({ template: t })}
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
          <ThumbOption selected={settings.columns === "one"} onClick={() => onChange({ columns: "one" })} label="One">
            <div className="w-10 h-14 border-2 border-current rounded-sm" />
          </ThumbOption>
          <ThumbOption selected={settings.columns === "two"} onClick={() => onChange({ columns: "two" })} label="Two">
            <div className="w-10 h-14 border-2 border-current rounded-sm flex">
              <div className="w-1/2 border-r border-current" /><div className="w-1/2" />
            </div>
          </ThumbOption>
          <ThumbOption selected={settings.columns === "mix"} onClick={() => onChange({ columns: "mix" })} label="Mix">
            <div className="w-10 h-14 border-2 border-current rounded-sm flex">
              <div className="w-1/3 border-r border-current" /><div className="w-2/3" />
            </div>
          </ThumbOption>
        </div>

        {(settings.columns === "two" || settings.columns === "mix") && (
          <div className="mt-2">
            <SliderRow
              label="Sidebar Width"
              value={settings.columnRatio}
              min={3}
              max={6}
              step={1}
              unit="/12"
              onChange={(v) => onChange({ columnRatio: v })}
            />
          </div>
        )}
      </SettingCard>

      <SettingCard title="Change Section Layout">
        <div className="space-y-1">
          {sections.map((s) => (
            <div key={s.id} className="flex items-center gap-2 bg-[#F5F3EE] rounded-lg px-3 py-2">
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
              <span className="text-xs font-semibold text-gray-700 uppercase">{s.title}</span>
            </div>
          ))}
          {sections.length === 0 && (
            <p className="text-xs text-gray-400 py-2">Add sections in the Content tab first</p>
          )}
        </div>
      </SettingCard>

      <SettingCard title="Spacing">
        <div className="space-y-5">
          <SliderRow label="Font Size" value={settings.fontSize} min={8} max={16} step={0.5} unit="pt" onChange={(v) => onChange({ fontSize: v })} />
          <SliderRow label="Line Height" value={settings.lineHeight} min={1} max={2.2} step={0.1} unit="" onChange={(v) => onChange({ lineHeight: Math.round(v * 10) / 10 })} />
          <SliderRow label="Left & Right Margin" value={settings.marginX} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginX: v })} />
          <SliderRow label="Top & Bottom Margin" value={settings.marginY} min={5} max={40} step={1} unit="mm" onChange={(v) => onChange({ marginY: v })} />
          <SliderRow label="Section Spacing" value={settings.sectionSpacing} min={0} max={20} step={1} unit="mm" onChange={(v) => onChange({ sectionSpacing: v })} />
        </div>
      </SettingCard>
    </>
  );
}

/* ── DESIGN ─────────────────────────────────────────────────── */
function DesignTab({ settings, onChange }: { settings: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  return (
    <>
      <SettingCard title="Color">
        <FieldLabel>Color mode</FieldLabel>
        <div className="flex gap-3 mb-4">
          <ThumbOption selected={settings.colorMode === "basic"} onClick={() => onChange({ colorMode: "basic" })} label="Basic">
            <Circle className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.colorMode === "advanced"} onClick={() => onChange({ colorMode: "advanced" })} label="Advanced">
            <div className="w-5 h-5 rounded-full border-2 border-gray-500 overflow-hidden"><div className="w-full h-1/2 bg-gray-500" /></div>
          </ThumbOption>
          <ThumbOption selected={settings.colorMode === "border"} onClick={() => onChange({ colorMode: "border" })} label="Border">
            <div className="w-5 h-5 rounded-full border-[3px] border-gray-500" />
          </ThumbOption>
        </div>

        <FieldLabel>Color type</FieldLabel>
        <div className="flex gap-3 mb-4">
          <ThumbOption selected={settings.colorType === "accent"} onClick={() => onChange({ colorType: "accent" })} label="Accent">
            <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center">
              {settings.colorType === "accent" && <Check className="w-3 h-3 text-white" />}
            </div>
          </ThumbOption>
          <ThumbOption selected={settings.colorType === "multi"} onClick={() => onChange({ colorType: "multi" })} label="Multi">
            <Type className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.colorType === "image"} onClick={() => onChange({ colorType: "image" })} label="Image">
            <Image className="w-5 h-5 text-gray-500" />
          </ThumbOption>
        </div>

        <FieldLabel>Accent color</FieldLabel>
        <div className="grid grid-cols-10 gap-1.5">
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
      </SettingCard>

      <SettingCard title="Font">
        <FieldLabel>Body font</FieldLabel>
        <div className="mb-4">
          <FontPicker selectedFont={settings.bodyFont} onSelect={(f) => onChange({ bodyFont: f })} />
        </div>
        <FieldLabel>Heading font</FieldLabel>
        <FontPicker selectedFont={settings.headingFont} onSelect={(f) => onChange({ headingFont: f })} />
      </SettingCard>

      <SettingCard title="Link styling">
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
            Link icon
          </label>
          {settings.linkIcon && (
            <div className="flex gap-2 ml-6">
              <button
                onClick={() => onChange({ linkIconStyle: "link" })}
                className={cn("p-2 rounded-lg border-2", settings.linkIconStyle === "link" ? "border-purple-500 bg-purple-50" : "border-gray-200")}
              >
                <Link className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => onChange({ linkIconStyle: "external" })}
                className={cn("p-2 rounded-lg border-2", settings.linkIconStyle === "external" ? "border-purple-500 bg-purple-50" : "border-gray-200")}
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
      <SettingCard title="Personal Details">
        <FieldLabel>Align</FieldLabel>
        <div className="flex gap-3 mb-4">
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
        <div className="flex gap-3 mb-4">
          <ThumbOption selected={settings.headerArrangement === "stacked"} onClick={() => onChange({ headerArrangement: "stacked" })} label="Stacked">
            <div className="w-10 h-6 flex flex-col gap-0.5 items-center justify-center">
              <div className="w-6 h-1 bg-gray-400 rounded" />
              <div className="w-4 h-1 bg-gray-300 rounded" />
              <div className="w-5 h-1 bg-gray-300 rounded" />
            </div>
          </ThumbOption>
          <ThumbOption selected={settings.headerArrangement === "inline"} onClick={() => onChange({ headerArrangement: "inline" })} label="Inline">
            <div className="w-10 h-6 flex items-center justify-center gap-1">
              <div className="w-2 h-1 bg-gray-400 rounded" />
              <div className="w-2 h-1 bg-gray-300 rounded" />
              <div className="w-2 h-1 bg-gray-300 rounded" />
            </div>
          </ThumbOption>
        </div>

        <FieldLabel>Contact separator</FieldLabel>
        <div className="flex gap-3 mb-4">
          <ThumbOption selected={settings.contactSeparator === "icon"} onClick={() => onChange({ contactSeparator: "icon" })} label="Icon">
            <Smile className="w-5 h-5 text-gray-500" />
          </ThumbOption>
          <ThumbOption selected={settings.contactSeparator === "bullet"} onClick={() => onChange({ contactSeparator: "bullet" })} label="Bullet">
            <span className="text-lg text-gray-500">·</span>
          </ThumbOption>
          <ThumbOption selected={settings.contactSeparator === "bar"} onClick={() => onChange({ contactSeparator: "bar" })} label="Bar">
            <span className="text-lg text-gray-500">|</span>
          </ThumbOption>
        </div>

        <FieldLabel>Icon Style</FieldLabel>
        <div className="flex gap-1.5 flex-wrap">
          {[0,1,2,3,4,5,6,7].map((i) => (
            <button
              key={i}
              onClick={() => onChange({ iconStyle: i })}
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
                settings.iconStyle === i ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white hover:border-gray-300"
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
          <ToggleGroup
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
          Name bold
        </label>
        <FieldLabel>Font</FieldLabel>
        <ToggleGroup
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
          <ToggleGroup
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
        <ToggleGroup
          options={[
            { value: "false", label: "Below Name" },
            { value: "true", label: "Try Same Line" },
          ]}
          value={String(settings.titleSameLine)}
          onChange={(v) => onChange({ titleSameLine: v === "true" })}
        />
      </SettingCard>

      <SettingCard title="Photo">
        <p className="text-sm text-gray-400 text-center py-4">
          Photo design options will appear here once you add a photo 📸
        </p>
      </SettingCard>
    </>
  );
}

/* ── SECTIONS ───────────────────────────────────────────────── */
function SectionsTab() {
  return (
    <SettingCard title="Section Styling">
      <p className="text-sm text-gray-400 py-4 text-center">
        Per-section styling options coming soon — section heading style, divider style, and more.
      </p>
    </SettingCard>
  );
}
