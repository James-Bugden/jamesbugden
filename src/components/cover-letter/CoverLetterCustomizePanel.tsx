import { useState } from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus, Check, Link, ExternalLink, Smile, Circle, AlignLeft, AlignCenter, AlignRight, Type, Image } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { CoverLetterCustomize } from "./types";
import { FontPicker } from "@/components/resume-builder/FontPicker";
import { ACCENT_COLORS, LANGUAGE_OPTIONS, PAGE_FORMAT_OPTIONS } from "@/components/resume-builder/customizeTypes";

interface Props {
  settings: CoverLetterCustomize;
  onChange: (u: Partial<CoverLetterCustomize>) => void;
}

const SUB_TABS = ["Spacing", "Font", "Layout", "Color", "Details"] as const;

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-white rounded-xl p-5 shadow-sm"><h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>{children}</div>;
}
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-gray-600 mb-1.5">{children}</label>;
}
function SliderRow({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <div className="flex items-center gap-1.5">
          <button onClick={() => onChange(Math.max(min, value - step))} className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600"><Minus className="w-3 h-3" /></button>
          <span className="text-xs font-mono w-12 text-center text-gray-800">{value}{unit}</span>
          <button onClick={() => onChange(Math.min(max, value + step))} className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600"><Plus className="w-3 h-3" /></button>
        </div>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600" />
    </div>
  );
}
function ThumbOption({ selected, onClick, children, label }: { selected: boolean; onClick: () => void; children: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-colors min-w-[72px]", selected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white hover:border-gray-300")}>
      {children}<span className="text-[10px] font-medium text-gray-600">{label}</span>
    </button>
  );
}
function ToggleGroup({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className={cn("px-3 py-1.5 rounded-md text-xs font-semibold transition-colors", value === o.value ? "bg-purple-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900")}>{o.label}</button>
      ))}
    </div>
  );
}

export function CoverLetterCustomizePanel({ settings, onChange }: Props) {
  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>("Spacing");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 bg-white overflow-x-auto shrink-0">
        {SUB_TABS.map((tab) => (
          <button key={tab} onClick={() => setSubTab(tab)} className={cn("px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-md transition-colors", subTab === tab ? "text-gray-900 bg-gray-100" : "text-gray-500 hover:text-gray-700")}>{tab}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "#F5F0E8" }}>
        {subTab === "Spacing" && (
          <>
            <SettingCard title="Spacing">
              <div className="space-y-5">
                <SliderRow label="Font Size" value={settings.fontSize} min={8} max={14} step={0.5} unit="pt" onChange={(v) => onChange({ fontSize: v })} />
                <SliderRow label="Line Height" value={settings.lineHeight} min={1} max={2.5} step={0.1} unit="" onChange={(v) => onChange({ lineHeight: Math.round(v * 10) / 10 })} />
                <SliderRow label="Left & Right Margin" value={settings.marginX} min={8} max={30} step={1} unit="mm" onChange={(v) => onChange({ marginX: v })} />
                <SliderRow label="Top & Bottom Margin" value={settings.marginY} min={8} max={30} step={1} unit="mm" onChange={(v) => onChange({ marginY: v })} />
              </div>
            </SettingCard>
          </>
        )}
        {subTab === "Font" && (
          <SettingCard title="Font">
            <FieldLabel>Body font</FieldLabel>
            <div className="mb-4"><FontPicker selectedFont={settings.bodyFont} onSelect={(f) => onChange({ bodyFont: f })} /></div>
            <FieldLabel>Heading font</FieldLabel>
            <FontPicker selectedFont={settings.headingFont} onSelect={(f) => onChange({ headingFont: f })} />
          </SettingCard>
        )}
        {subTab === "Layout" && (
          <>
            <SettingCard title="Header Position">
              <div className="flex gap-3">
                {(["top", "left", "right"] as const).map((pos) => (
                  <ThumbOption key={pos} selected={settings.headerPosition === pos} onClick={() => onChange({ headerPosition: pos })} label={pos.charAt(0).toUpperCase() + pos.slice(1)}>
                    <div className="w-10 h-14 border-2 border-current rounded-sm relative">
                      {pos === "top" && <div className="w-full h-3 bg-current rounded-t-[1px]" />}
                      {pos === "left" && <div className="absolute left-0 top-0 w-3 h-full bg-current rounded-l-[1px]" />}
                      {pos === "right" && <div className="absolute right-0 top-0 w-3 h-full bg-current rounded-r-[1px]" />}
                    </div>
                  </ThumbOption>
                ))}
              </div>
            </SettingCard>
            <SettingCard title="Date">
              <FieldLabel>Position</FieldLabel>
              <ToggleGroup options={[{ value: "left", label: "Left" }, { value: "right", label: "Right" }]} value={settings.datePosition} onChange={(v) => onChange({ datePosition: v as "left" | "right" })} />
            </SettingCard>
            <SettingCard title="Declaration">
              <FieldLabel>Position</FieldLabel>
              <div className="mb-3">
                <ToggleGroup options={[{ value: "left", label: "Left" }, { value: "right", label: "Right" }]} value={settings.declarationPosition} onChange={(v) => onChange({ declarationPosition: v as "left" | "right" })} />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <Checkbox checked={settings.showDeclarationLine} onCheckedChange={(v) => onChange({ showDeclarationLine: !!v })} />
                Show line
              </label>
            </SettingCard>
            <SettingCard title="Footer">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <Checkbox checked={settings.footerPageNumbers} onCheckedChange={(v) => onChange({ footerPageNumbers: !!v })} />Page numbers
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <Checkbox checked={settings.footerEmail} onCheckedChange={(v) => onChange({ footerEmail: !!v })} />Email
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <Checkbox checked={settings.footerName} onCheckedChange={(v) => onChange({ footerName: !!v })} />Name
                </label>
              </div>
            </SettingCard>
            <SettingCard title="Link styling">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><Checkbox checked={settings.linkUnderline} onCheckedChange={(v) => onChange({ linkUnderline: !!v })} />Underline</label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><Checkbox checked={settings.linkBlue} onCheckedChange={(v) => onChange({ linkBlue: !!v })} />Blue color</label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><Checkbox checked={settings.linkIcon} onCheckedChange={(v) => onChange({ linkIcon: !!v })} />Link icon</label>
                {settings.linkIcon && (
                  <div className="flex gap-2 ml-6">
                    <button onClick={() => onChange({ linkIconStyle: "link" })} className={cn("p-2 rounded-lg border-2", settings.linkIconStyle === "link" ? "border-purple-500 bg-purple-50" : "border-gray-200")}><Link className="w-4 h-4 text-gray-600" /></button>
                    <button onClick={() => onChange({ linkIconStyle: "external" })} className={cn("p-2 rounded-lg border-2", settings.linkIconStyle === "external" ? "border-purple-500 bg-purple-50" : "border-gray-200")}><ExternalLink className="w-4 h-4 text-gray-600" /></button>
                  </div>
                )}
              </div>
            </SettingCard>
          </>
        )}
        {subTab === "Color" && (
          <SettingCard title="Color">
            <FieldLabel>Color mode</FieldLabel>
            <div className="flex gap-3 mb-4">
              <ThumbOption selected={settings.colorMode === "basic"} onClick={() => onChange({ colorMode: "basic" })} label="Basic"><Circle className="w-5 h-5 text-gray-500" /></ThumbOption>
              <ThumbOption selected={settings.colorMode === "advanced"} onClick={() => onChange({ colorMode: "advanced" })} label="Advanced"><div className="w-5 h-5 rounded-full border-2 border-gray-500 overflow-hidden"><div className="w-full h-1/2 bg-gray-500" /></div></ThumbOption>
              <ThumbOption selected={settings.colorMode === "border"} onClick={() => onChange({ colorMode: "border" })} label="Border"><div className="w-5 h-5 rounded-full border-[3px] border-gray-500" /></ThumbOption>
            </div>
            <FieldLabel>Color type</FieldLabel>
            <div className="flex gap-3 mb-4">
              <ThumbOption selected={settings.colorType === "accent"} onClick={() => onChange({ colorType: "accent" })} label="Accent"><div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center">{settings.colorType === "accent" && <Check className="w-3 h-3 text-white" />}</div></ThumbOption>
              <ThumbOption selected={settings.colorType === "multi"} onClick={() => onChange({ colorType: "multi" })} label="Multi"><Type className="w-5 h-5 text-gray-500" /></ThumbOption>
              <ThumbOption selected={settings.colorType === "image"} onClick={() => onChange({ colorType: "image" })} label="Image"><Image className="w-5 h-5 text-gray-500" /></ThumbOption>
            </div>
            <FieldLabel>Accent color</FieldLabel>
            <div className="grid grid-cols-10 gap-1.5">
              {ACCENT_COLORS.map((color) => (
                <button key={color} onClick={() => onChange({ accentColor: color })} className={cn("w-6 h-6 rounded-full border-2 transition-transform hover:scale-110", settings.accentColor === color ? "border-purple-600 ring-2 ring-purple-300 scale-110" : "border-gray-200")} style={{ backgroundColor: color }} />
              ))}
            </div>
          </SettingCard>
        )}
        {subTab === "Details" && (
          <>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Sync with Resume</h3>
                <Switch checked={settings.syncWithResume} onCheckedChange={(v) => onChange({ syncWithResume: v })} />
              </div>
              <p className="text-xs text-gray-500">Sync personal details & design with one of your resumes.</p>
            </div>
            <SettingCard title="Personal Details">
              <FieldLabel>Align</FieldLabel>
              <div className="flex gap-3 mb-4">
                <ThumbOption selected={settings.headerAlign === "left"} onClick={() => onChange({ headerAlign: "left" })} label="Left"><AlignLeft className="w-5 h-5 text-gray-500" /></ThumbOption>
                <ThumbOption selected={settings.headerAlign === "center"} onClick={() => onChange({ headerAlign: "center" })} label="Center"><AlignCenter className="w-5 h-5 text-gray-500" /></ThumbOption>
                <ThumbOption selected={settings.headerAlign === "right"} onClick={() => onChange({ headerAlign: "right" })} label="Right"><AlignRight className="w-5 h-5 text-gray-500" /></ThumbOption>
              </div>
              <FieldLabel>Contact separator</FieldLabel>
              <div className="flex gap-3 mb-4">
                <ThumbOption selected={settings.contactSeparator === "icon"} onClick={() => onChange({ contactSeparator: "icon" })} label="Icon"><Smile className="w-5 h-5 text-gray-500" /></ThumbOption>
                <ThumbOption selected={settings.contactSeparator === "bullet"} onClick={() => onChange({ contactSeparator: "bullet" })} label="Bullet"><span className="text-lg text-gray-500">·</span></ThumbOption>
                <ThumbOption selected={settings.contactSeparator === "bar"} onClick={() => onChange({ contactSeparator: "bar" })} label="Bar"><span className="text-lg text-gray-500">|</span></ThumbOption>
              </div>
            </SettingCard>
            <SettingCard title="Name">
              <FieldLabel>Size</FieldLabel>
              <div className="mb-3">
                <ToggleGroup options={[{ value: "xs", label: "XS" }, { value: "s", label: "S" }, { value: "m", label: "M" }, { value: "l", label: "L" }, { value: "xl", label: "XL" }]} value={settings.nameSize} onChange={(v) => onChange({ nameSize: v as CoverLetterCustomize["nameSize"] })} />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-3"><Checkbox checked={settings.nameBold} onCheckedChange={(v) => onChange({ nameBold: !!v })} />Name bold</label>
              <FieldLabel>Font</FieldLabel>
              <ToggleGroup options={[{ value: "body", label: "Body Font" }, { value: "creative", label: "Creative" }]} value={settings.nameFont} onChange={(v) => onChange({ nameFont: v as "body" | "creative" })} />
            </SettingCard>
            <SettingCard title="Professional title">
              <FieldLabel>Size</FieldLabel>
              <ToggleGroup options={[{ value: "s", label: "S" }, { value: "m", label: "M" }, { value: "l", label: "L" }]} value={settings.titleSize} onChange={(v) => onChange({ titleSize: v as "s" | "m" | "l" })} />
            </SettingCard>
            <SettingCard title="Photo">
              <p className="text-sm text-gray-400 text-center py-4">Photo design options will appear here once you add a photo 📸</p>
            </SettingCard>
            <SettingCard title="Language & Region">
              <div className="flex gap-3">
                <div className="flex-1">
                  <FieldLabel>Language</FieldLabel>
                  <select value={settings.language} onChange={(e) => onChange({ language: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm bg-[#F5F3EE] text-gray-800 border-0 outline-none">
                    {LANGUAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <FieldLabel>Page Format</FieldLabel>
                  <select value={settings.pageFormat} onChange={(e) => onChange({ pageFormat: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm bg-[#F5F3EE] text-gray-800 border-0 outline-none">
                    {PAGE_FORMAT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            </SettingCard>
          </>
        )}
      </div>
    </div>
  );
}
