import { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical, Trash2, Plus } from "lucide-react";
import * as Icons from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeSection, ResumeSectionEntry, getDefaultFieldsForType, SECTION_TYPES, PROFICIENCY_LEVELS } from "./types";
import { RichTextEditor } from "./RichTextEditor";
import { MonthYearPicker } from "./MonthYearPicker";
import { TagInput } from "./TagInput";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  section: ResumeSection;
  onUpdate: (updates: Partial<ResumeSection>) => void;
  onRemove: () => void;
}

function getIcon(iconName: string) {
  const Icon = (Icons as any)[iconName];
  return Icon || Icons.FileText;
}

/* Styled input matching FlowCV: light gray bg, no border, bold label */
function SField({ label, value, onChange, placeholder, className, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string; type?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full h-11 md:h-10 rounded-lg bg-[#F5F3EE] px-3 text-sm outline-none focus:ring-2 focus:ring-pink-300 border-0"
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

export function SectionCard({ section, onUpdate, onRemove }: SectionCardProps) {
  const sectionMeta = SECTION_TYPES.find((s) => s.type === section.type);
  const IconComponent = getIcon(sectionMeta?.icon || "FileText");

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
              <SField label="Company Name" value={f.company} onChange={set("company")} />
            </div>
            <SField label="Location" value={f.location || ""} onChange={set("location")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} showPresent={isCurrently} />
              </div>
            </div>
            <div className="flex items-center gap-2 min-h-[44px]">
              <Checkbox checked={isCurrently} onCheckedChange={(v) => set("currentlyHere")(v ? "true" : "")} id={`currently-${entry.id}`} />
              <label htmlFor={`currently-${entry.id}`} className="text-sm text-gray-600">Currently working here</label>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} placeholder="Describe your role..." />
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} showPresent={f.currentlyHere === "true"} />
              </div>
            </div>
            <div className="flex items-center gap-2 min-h-[44px]">
              <Checkbox checked={f.currentlyHere === "true"} onCheckedChange={(v) => set("currentlyHere")(v ? "true" : "")} id={`edu-currently-${entry.id}`} />
              <label htmlFor={`edu-currently-${entry.id}`} className="text-sm text-gray-600">Currently studying here</label>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} />
            </div>
          </div>
        );

      case "skills":
        return (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Skills</label>
            <TagInput value={f.skills || ""} onChange={set("skills")} placeholder="Type a skill and press Enter" showLevel />
          </div>
        );

      case "interests":
        return (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Interests</label>
            <TagInput value={f.interests || ""} onChange={set("interests")} placeholder="Type an interest and press Enter" />
          </div>
        );

      case "languages":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SField label="Language" value={f.language} onChange={set("language")} />
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Proficiency</label>
              <select
                value={f.proficiency}
                onChange={(e) => set("proficiency")(e.target.value)}
                className="w-full h-11 md:h-10 rounded-lg bg-[#F5F3EE] px-3 text-sm border-0 outline-none focus:ring-2 focus:ring-pink-300 appearance-none cursor-pointer"
              >
                <option value="">Select level</option>
                {PROFICIENCY_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
              </select>
            </div>
          </div>
        );

      case "summary":
        return (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Professional Summary</label>
            <RichTextEditor value={f.description || ""} onChange={set("description")} placeholder="Write a brief professional summary..." />
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} />
              </div>
            </div>
            <SField label="URL" value={f.url || ""} onChange={set("url")} placeholder="https://..." />
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} />
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                <MonthYearPicker monthValue={f.startMonth || ""} yearValue={f.startYear || ""} onMonthChange={set("startMonth")} onYearChange={set("startYear")} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                <MonthYearPicker monthValue={f.endMonth || ""} yearValue={f.endYear || ""} onMonthChange={set("endMonth")} onYearChange={set("endYear")} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
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
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SField label="Full Name" value={f.fullName || ""} onChange={set("fullName")} />
              <SField label="Place" value={f.place || ""} onChange={set("place")} />
              <SField label="Date" value={f.date || ""} onChange={set("date")} placeholder="e.g. February 2026" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Signature</label>
              <button className="h-11 md:h-10 px-4 rounded-lg bg-[#F5F3EE] text-sm text-gray-600 hover:bg-gray-200 transition-colors">
                + Create / Upload
              </button>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-3">
            <SField label="Section Title" value={f.sectionTitle || ""} onChange={set("sectionTitle")} placeholder="Custom section name" />
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Content</label>
              <RichTextEditor value={f.description || ""} onChange={set("description")} placeholder="Add your content..." />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-transform duration-150 hover:scale-[1.02]">
      {/* Header — larger touch target */}
      <button
        onClick={toggleCollapse}
        className="w-full flex items-center gap-3 px-5 py-4 min-h-[56px] hover:bg-gray-50 transition-colors"
      >
        <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
        <IconComponent className="w-5 h-5 text-gray-700" />
        <span className="font-bold text-gray-900 uppercase tracking-wide text-sm flex-1 text-left">
          {section.title}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-2 text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {section.collapsed ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Body — with collapse animation */}
      <div
        className={cn(
          "transition-all duration-200 ease-in-out overflow-hidden",
          section.collapsed ? "max-h-0 opacity-0" : "max-h-[5000px] opacity-100"
        )}
      >
        <div className="px-5 pb-5 space-y-3">
          {isSingleEntrySection ? (
            section.entries.length > 0 ? renderEntryForm(section.entries[0]) : null
          ) : (
            <>
              {section.entries.map((entry) => {
                const isEntryCollapsed = entry.collapsed ?? false;
                return (
                  <div key={entry.id} className="rounded-lg border border-gray-100 overflow-hidden">
                    <div
                      className="flex items-center gap-2 px-4 py-3 min-h-[48px] bg-gray-50/50 cursor-pointer"
                      onClick={() => toggleEntryCollapse(entry.id)}
                    >
                      <GripVertical className="w-3.5 h-3.5 text-gray-300 cursor-grab flex-shrink-0" />
                      <span className="text-sm text-gray-700 flex-1 truncate">
                        {getEntrySummary(section.type, entry.fields)}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {isEntryCollapsed ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronUp className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div
                      className={cn(
                        "transition-all duration-200 ease-in-out overflow-hidden",
                        isEntryCollapsed ? "max-h-0 opacity-0" : "max-h-[3000px] opacity-100"
                      )}
                    >
                      <div className="p-4 space-y-3">
                        {renderEntryForm(entry)}
                        <button
                          onClick={() => toggleEntryCollapse(entry.id)}
                          className="w-full py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {!isSingleEntrySection && (
            <button
              onClick={addEntry}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-4 py-3 md:py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <Plus className="w-4 h-4" />
              Add Entry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
