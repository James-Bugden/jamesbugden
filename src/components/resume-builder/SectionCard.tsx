import { useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp, GripVertical, Trash2, Plus, X, Pencil, Grid3X3, Circle, BarChart3, List } from "lucide-react";
import * as Icons from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeSection, ResumeSectionEntry, SectionLayout, SectionSeparator, LevelIndicator, SubtitleStyle, getDefaultFieldsForType, SECTION_TYPES, PROFICIENCY_LEVELS } from "./types";
import { RichTextEditor } from "./RichTextEditor";
import { MonthYearPicker } from "./MonthYearPicker";
import { TagInput } from "./TagInput";
import { SignatureModal } from "./SignatureModal";
import { cn } from "@/lib/utils";

function getIcon(iconName: string) {
  const Icon = (Icons as any)[iconName];
  return Icon || Icons.FileText;
}

/* ── Clean input field ─────────────────────────────────── */
function SField({ label, value, onChange, placeholder, className, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string; type?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full h-10 rounded-lg bg-gray-50 px-3 text-sm text-gray-900 border border-gray-200 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors placeholder-gray-400"
      />
    </div>
  );
}

function getEntrySummary(type: string, fields: Record<string, string>): string {
  switch (type) {
    case "experience":
      return [fields.position, fields.company].filter(Boolean).join(" at ") || "New entry";
    case "education":
      return [fields.degree, fields.institution].filter(Boolean).join(" at ") || "New entry";
    case "certificates":
    case "courses":
    case "awards":
    case "projects":
      return fields.name || "New entry";
    case "publications":
      return fields.title || "New entry";
    case "references":
      return fields.name || "New entry";
    case "organisations":
      return [fields.name, fields.role].filter(Boolean).join(" — ") || "New entry";
    default:
      return "New entry";
  }
}

/* ── Layout / Separator / Level / Subtitle switchers ──── */
const LAYOUT_OPTIONS: { value: SectionLayout; label: string; icon: React.ElementType }[] = [
  { value: "grid", label: "Grid", icon: Grid3X3 },
  { value: "bubble", label: "Bubble", icon: Circle },
  { value: "level", label: "Level", icon: BarChart3 },
  { value: "compact", label: "Compact", icon: List },
];

function PillSwitcher<T extends string>({ label, options, value, onChange }: {
  label: string; options: { value: T; label: string; icon?: React.ElementType }[]; value: T; onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-500 mb-1.5">{label}</label>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors",
              value === opt.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {opt.icon && <opt.icon className="w-3 h-3" />}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const SEPARATOR_OPTIONS: { value: SectionSeparator; label: string }[] = [
  { value: "bullet", label: "Bullet ·" },
  { value: "pipe", label: "Pipe |" },
  { value: "comma", label: "Comma ," },
  { value: "newline", label: "New Line" },
];

const LEVEL_INDICATOR_OPTIONS: { value: LevelIndicator; label: string }[] = [
  { value: "bar", label: "Bar" },
  { value: "dots", label: "Dots" },
  { value: "text", label: "Text" },
];

const SUBTITLE_STYLE_OPTIONS: { value: SubtitleStyle; label: string }[] = [
  { value: "dash", label: "Dash —" },
  { value: "colon", label: "Colon :" },
  { value: "bracket", label: "Bracket ()" },
];

/* ── Declaration form ───────────────────────────────────── */
function DeclarationForm({ entry, set }: { entry: ResumeSectionEntry; set: (field: string) => (val: string) => void }) {
  const [sigOpen, setSigOpen] = useState(false);
  const f = entry.fields;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SField label="Full Name" value={f.fullName || ""} onChange={set("fullName")} />
        <SField label="Place" value={f.place || ""} onChange={set("place")} />
        <SField label="Date" value={f.date || ""} onChange={set("date")} placeholder="e.g. February 2026" />
      </div>
      <div>
        <label className="block text-[11px] font-medium text-gray-500 mb-1">Signature</label>
        {f.signature ? (
          <div className="flex items-center gap-3">
            <img src={f.signature} alt="Signature" className="h-12 border border-gray-200 rounded-lg bg-white p-1" />
            <button onClick={() => setSigOpen(true)} className="text-xs text-pink-600 hover:text-pink-700 font-medium">Redraw</button>
            <button onClick={() => set("signature")("")} className="text-xs text-gray-400 hover:text-red-500">Remove</button>
          </div>
        ) : (
          <button
            onClick={() => setSigOpen(true)}
            className="h-10 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            + Draw or Upload Signature
          </button>
        )}
      </div>
      <SignatureModal open={sigOpen} onClose={() => setSigOpen(false)} onSave={(url) => set("signature")(url)} />
    </div>
  );
}

/* ── Entry list ─────────────────────────────────────────── */
function EntryList({
  entries, type, renderEntryForm, toggleEntryCollapse, removeEntry, onReorder,
}: {
  entries: ResumeSectionEntry[];
  type: string;
  renderEntryForm: (entry: ResumeSectionEntry) => React.ReactNode;
  toggleEntryCollapse: (id: string) => void;
  removeEntry: (id: string) => void;
  onReorder: (entries: ResumeSectionEntry[]) => void;
}) {
  const dragIdx = useRef<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    dragIdx.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIdx(idx);
  };
  const handleDrop = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragIdx.current;
    if (from === null || from === idx) { setOverIdx(null); return; }
    const updated = [...entries];
    const [moved] = updated.splice(from, 1);
    updated.splice(idx, 0, moved);
    onReorder(updated);
    dragIdx.current = null;
    setOverIdx(null);
  };
  const handleDragEnd = () => { dragIdx.current = null; setOverIdx(null); };

  return (
    <div className="space-y-0">
      {entries.map((entry, idx) => {
        const isCollapsed = entry.collapsed ?? false;
        const isOver = overIdx === idx;
        return (
          <div
            key={entry.id}
            draggable
            onDragStart={handleDragStart(idx)}
            onDragOver={handleDragOver(idx)}
            onDrop={handleDrop(idx)}
            onDragEnd={handleDragEnd}
            className={cn(
              "border-b border-gray-100 last:border-b-0 transition-colors",
              isOver && "bg-pink-50/50"
            )}
          >
            {/* Entry row */}
            <div
              className="flex items-center gap-2 px-1 py-2.5 cursor-pointer group"
              onClick={() => toggleEntryCollapse(entry.id)}
            >
              <GripVertical className="w-3.5 h-3.5 text-gray-300 cursor-grab flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm text-gray-700 flex-1 truncate">
                {getEntrySummary(type, entry.fields)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                className="p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </div>

            {/* Expanded form */}
            <div className={cn(
              "transition-all duration-200 ease-in-out overflow-hidden",
              isCollapsed ? "max-h-0 opacity-0" : "max-h-[3000px] opacity-100"
            )}>
              <div className="px-1 pb-4 pt-1 space-y-3">
                {renderEntryForm(entry)}
                <button
                  onClick={() => toggleEntryCollapse(entry.id)}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#2b4734" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main SectionCard ───────────────────────────────────── */
export function SectionCard({ section, onUpdate, onRemove }: {
  section: ResumeSection;
  onUpdate: (updates: Partial<ResumeSection>) => void;
  onRemove: () => void;
}) {
  const sectionMeta = SECTION_TYPES.find((s) => s.type === section.type);
  const IconComponent = getIcon(sectionMeta?.icon || "FileText");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(section.title);

  const toggleCollapse = () => onUpdate({ collapsed: !section.collapsed });

  const addEntry = () => {
    const newEntry: ResumeSectionEntry = {
      id: crypto.randomUUID(),
      fields: getDefaultFieldsForType(section.type),
      collapsed: false,
    };
    onUpdate({ entries: [...section.entries, newEntry] });
  };

  const updateEntry = (entryId: string, field: string, value: string) => {
    onUpdate({
      entries: section.entries.map((e) =>
        e.id === entryId ? { ...e, fields: { ...e.fields, [field]: value } } : e
      ),
    });
  };

  const toggleEntryCollapse = (entryId: string) => {
    onUpdate({
      entries: section.entries.map((e) =>
        e.id === entryId ? { ...e, collapsed: !e.collapsed } : e
      ),
    });
  };

  const removeEntry = (entryId: string) => {
    onUpdate({ entries: section.entries.filter((e) => e.id !== entryId) });
  };

  const isSingleEntrySection = section.type === "summary" || section.type === "skills" || section.type === "interests";

  const renderEntryForm = (entry: ResumeSectionEntry) => {
    const f = entry.fields;
    const set = (field: string) => (val: string) => updateEntry(entry.id, field, val);
    const isCurrently = f.currentlyHere === "true";

    switch (section.type) {
      case "experience":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Job Title" value={f.position} onChange={set("position")} />
              <SField label="Employer" value={f.company} onChange={set("company")} />
            </div>
            <SField label="Location" value={f.location || ""} onChange={set("location")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} showPresent={isCurrently} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
              <Checkbox checked={isCurrently} onCheckedChange={(v) => set("currentlyHere")(v ? "true" : "")} id={`currently-${entry.id}`} />
              Currently working here
            </label>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} placeholder="Describe your role..." showAiTools aiContext={`Role: ${f.position || "position"} at ${f.company || "company"}`} />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Degree / Field" value={f.degree} onChange={set("degree")} />
              <SField label="School / University" value={f.institution} onChange={set("institution")} />
            </div>
            <SField label="Location" value={f.location || ""} onChange={set("location")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} showPresent={f.currentlyHere === "true"} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
              <Checkbox checked={f.currentlyHere === "true"} onCheckedChange={(v) => set("currentlyHere")(v ? "true" : "")} id={`edu-currently-${entry.id}`} />
              Currently studying here
            </label>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} showAiTools aiContext={`Education: ${f.degree || "degree"} at ${f.institution || "institution"}`} />
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-3">
            <PillSwitcher label="Layout" options={LAYOUT_OPTIONS} value={section.layout || "bubble"} onChange={(l) => onUpdate({ layout: l })} />
            {(section.layout === "compact" || section.layout === "grid") && (
              <PillSwitcher label="Separator" options={SEPARATOR_OPTIONS} value={section.separator || "bullet"} onChange={(s) => onUpdate({ separator: s })} />
            )}
            {section.layout === "level" && (
              <PillSwitcher label="Level Indicator" options={LEVEL_INDICATOR_OPTIONS} value={section.levelIndicator || "bar"} onChange={(i) => onUpdate({ levelIndicator: i })} />
            )}
            <PillSwitcher label="Subtitle Style" options={SUBTITLE_STYLE_OPTIONS} value={section.subtitleStyle || "dash"} onChange={(s) => onUpdate({ subtitleStyle: s })} />
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Skills</label>
              <TagInput value={f.skills || ""} onChange={set("skills")} placeholder="Type a skill and press Enter" showLevel={section.layout === "level"} />
            </div>
          </div>
        );

      case "interests":
        return (
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Interests</label>
            <TagInput value={f.interests || ""} onChange={set("interests")} placeholder="Type an interest and press Enter" />
          </div>
        );

      case "languages":
        return (
          <div className="space-y-3">
            <PillSwitcher label="Layout" options={LAYOUT_OPTIONS} value={section.layout || "compact"} onChange={(l) => onUpdate({ layout: l })} />
            {(section.layout === "compact" || section.layout === "grid") && (
              <PillSwitcher label="Separator" options={SEPARATOR_OPTIONS} value={section.separator || "bullet"} onChange={(s) => onUpdate({ separator: s })} />
            )}
            {section.layout === "level" && (
              <PillSwitcher label="Level Indicator" options={LEVEL_INDICATOR_OPTIONS} value={section.levelIndicator || "dots"} onChange={(i) => onUpdate({ levelIndicator: i })} />
            )}
            <PillSwitcher label="Subtitle Style" options={SUBTITLE_STYLE_OPTIONS} value={section.subtitleStyle || "dash"} onChange={(s) => onUpdate({ subtitleStyle: s })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Language" value={f.language} onChange={set("language")} />
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Proficiency</label>
                <select
                  value={f.proficiency}
                  onChange={(e) => set("proficiency")(e.target.value)}
                  className="w-full h-10 rounded-lg bg-gray-50 px-3 text-sm text-gray-900 border border-gray-200 outline-none focus:border-gray-400 cursor-pointer"
                >
                  <option value="">Select level</option>
                  {PROFICIENCY_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
                </select>
              </div>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <Checkbox checked={section.showHeading !== false} onCheckedChange={(v) => onUpdate({ showHeading: !!v })} />
              Show section heading
            </label>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Professional Summary</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} placeholder="Write a brief professional summary..." showAiTools aiContext="Professional summary for a resume" />
            </div>
          </div>
        );

      case "certificates":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Certificate Name" value={f.name} onChange={set("name")} />
              <SField label="Issuing Organization" value={f.issuer} onChange={set("issuer")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Date" value={f.date} onChange={set("date")} placeholder="e.g. March 2024" />
              <SField label="URL" value={f.url || ""} onChange={set("url")} placeholder="https://..." />
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Project Name" value={f.name} onChange={set("name")} />
              <SField label="Role" value={f.role} onChange={set("role")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} />
              </div>
            </div>
            <SField label="URL" value={f.url || ""} onChange={set("url")} placeholder="https://..." />
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} showAiTools aiContext={`Project: ${f.name || "project"}, Role: ${f.role || "contributor"}`} />
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Course Name" value={f.name} onChange={set("name")} />
              <SField label="Institution" value={f.institution} onChange={set("institution")} />
            </div>
            <SField label="Date" value={f.date} onChange={set("date")} placeholder="e.g. 2024" />
          </div>
        );

      case "awards":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Award Name" value={f.name} onChange={set("name")} />
              <SField label="Issuer" value={f.issuer} onChange={set("issuer")} />
            </div>
            <SField label="Date" value={f.date} onChange={set("date")} placeholder="e.g. 2024" />
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} />
            </div>
          </div>
        );

      case "organisations":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Organisation Name" value={f.name} onChange={set("name")} />
              <SField label="Role" value={f.role} onChange={set("role")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} />
            </div>
          </div>
        );

      case "publications":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Title" value={f.title || ""} onChange={set("title")} />
              <SField label="Publisher" value={f.publisher} onChange={set("publisher")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Date" value={f.date} onChange={set("date")} placeholder="e.g. 2024" />
              <SField label="URL" value={f.url || ""} onChange={set("url")} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} />
            </div>
          </div>
        );

      case "references":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Full Name" value={f.name} onChange={set("name")} />
              <SField label="Title / Position" value={f.position} onChange={set("position")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Company" value={f.company} onChange={set("company")} />
              <SField label="Relationship" value={f.relationship || ""} onChange={set("relationship")} placeholder="e.g. Direct Manager" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SField label="Email" value={f.email} onChange={set("email")} type="email" />
              <SField label="Phone" value={f.phone} onChange={set("phone")} type="tel" />
            </div>
          </div>
        );

      case "declaration":
        return <DeclarationForm entry={entry} set={set} />;

      case "custom":
        return (
          <div className="space-y-3">
            <SField label="Section Title" value={f.sectionTitle || ""} onChange={set("sectionTitle")} placeholder="Custom section name" />
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Content</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} placeholder="Add your content..." />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleTitleSave = () => {
    if (titleValue.trim()) {
      onUpdate({ title: titleValue.trim() });
    }
    setEditingTitle(false);
  };

  return (
    <div id={`section-card-${section.id}`} className="px-5">
      {/* Section header */}
      <div className="flex items-center gap-2.5 py-4 group cursor-pointer" onClick={toggleCollapse}>
        <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <IconComponent className="w-4.5 h-4.5 flex-shrink-0" style={{ color: "#2b4734" }} />
        
        {editingTitle ? (
          <input
            autoFocus
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => { if (e.key === "Enter") handleTitleSave(); if (e.key === "Escape") setEditingTitle(false); }}
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 outline-none focus:border-gray-400 flex-1 uppercase tracking-wide"
          />
        ) : (
          <span className="text-sm font-bold flex-1 uppercase tracking-wide" style={{ color: "#1e293b" }}>
            {section.title}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); setTitleValue(section.title); setEditingTitle(true); }}
          className="p-1 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-all"
          title="Edit heading"
        >
          <Pencil className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 flex-shrink-0 transition-transform", !section.collapsed && "rotate-180")} />
      </div>

      {/* Body */}
      <div className={cn(
        "transition-all duration-200 ease-in-out overflow-hidden",
        section.collapsed ? "max-h-0 opacity-0" : "max-h-[5000px] opacity-100"
      )}>
        <div className="pb-4 space-y-1">
          {isSingleEntrySection ? (
            section.entries.length > 0 ? (
              <div className="space-y-3">
                {renderEntryForm(section.entries[0])}
              </div>
            ) : null
          ) : (
            <EntryList
              entries={section.entries}
              type={section.type}
              renderEntryForm={renderEntryForm}
              toggleEntryCollapse={toggleEntryCollapse}
              removeEntry={removeEntry}
              onReorder={(entries) => onUpdate({ entries })}
            />
          )}

          {!isSingleEntrySection && (
            <button
              onClick={addEntry}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 px-1 py-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add entry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
