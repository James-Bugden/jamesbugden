import { useState, useMemo, useCallback, useRef } from "react";
import {
  Search, Plus, Download, ChevronDown, ChevronUp, Star, Pencil,
  Trash2, ExternalLink, Check, Columns3, X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Employer, Contact } from "@/lib/tracker/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/* ── Constants ────────────────────────────────────────── */
const SOURCE_COLORS: Record<Employer["source"], string> = {
  dream: "#22C55E", alumni: "#3B82F6", posting: "#F59E0B", trend: "#8B5CF6", manual: "#9CA3AF",
};
const SOURCE_LABELS: Record<Employer["source"], string> = {
  dream: "Dream", alumni: "Alumni", posting: "Posting", trend: "Trend", manual: "Manual",
};
const STAGE_OPTIONS: Employer["stage"][] = ["listed", "contacted", "informational", "advocate", "applied", "interviewing", "offer"];
const STAGE_LABELS: Record<Employer["stage"], string> = {
  listed: "Listed", contacted: "Contacted", informational: "Informational",
  advocate: "Advocate", applied: "Applied", interviewing: "Interviewing", offer: "Offer",
};
const POSTING_LABELS: Record<number, { label: string; color: string }> = {
  3: { label: "Relevant", color: "#22C55E" }, 2: { label: "Some", color: "#F59E0B" }, 1: { label: "None", color: "#9CA3AF" },
};

type SortKey = "priority" | "name" | "source" | "alumni" | "motivation" | "posting" | "stage";
type SortDir = "asc" | "desc";

const ALL_COLUMNS = ["priority", "company", "source", "alumni", "motivation", "posting", "stage", "actions"] as const;
type ColId = (typeof ALL_COLUMNS)[number];
const COL_LABELS: Record<ColId, string> = {
  priority: "Priority", company: "Company", source: "Source", alumni: "Alumni (A)",
  motivation: "Motivation (M)", posting: "Posting (P)", stage: "Stage", actions: "Actions",
};

/* ── Priority calculation ─────────────────────────────── */
function calcPriority(employers: Employer[]): Map<string, number> {
  const sorted = [...employers].sort((a, b) => {
    if (b.motivation !== a.motivation) return b.motivation - a.motivation;
    if (b.posting !== a.posting) return b.posting - a.posting;
    if (a.alumni !== b.alumni) return a.alumni ? -1 : 1;
    return 0;
  });
  const map = new Map<string, number>();
  sorted.forEach((e, i) => map.set(e.id, i + 1));
  return map;
}

/* ── Star Rating ──────────────────────────────────────── */
function Stars({ value, onChange, size = 14 }: { value: number; onChange: (v: 1|2|3|4|5) => void; size?: number }) {
  return (
    <div className="flex gap-0.5" role="group" aria-label={`Rating: ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onChange(s as 1|2|3|4|5)}
          className="transition-transform duration-150 hover:scale-125 active:scale-150 focus:outline-none focus:ring-1 focus:ring-[#C9A961] rounded"
          aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
        >
          <Star
            className="transition-colors"
            style={{ width: size, height: size, fill: s <= value ? "#C9A961" : "none", color: s <= value ? "#C9A961" : "#D1D5DB" }}
          />
        </button>
      ))}
    </div>
  );
}

/* ── Posting Badge ────────────────────────────────────── */
function PostingBadge({ value, onChange }: { value: 1|2|3; onChange: (v: 1|2|3) => void }) {
  const next = ((value % 3) + 1) as 1|2|3;
  const cfg = POSTING_LABELS[value];
  return (
    <button
      onClick={() => onChange(next)}
      className="px-2 py-0.5 rounded-full text-xs font-medium text-white transition-all duration-200 hover:scale-105"
      style={{ backgroundColor: cfg.color }}
    >
      {cfg.label}
    </button>
  );
}

/* ── Alumni Toggle ────────────────────────────────────── */
function AlumniPill({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
      style={{ backgroundColor: value ? "#DCFCE7" : "#F3F4F6", color: value ? "#166534" : "#6B7280" }}
    >
      {value ? "Y" : "N"}
    </button>
  );
}

/* ── Source Badge ──────────────────────────────────────── */
function SourceBadge({ source }: { source: Employer["source"] }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: SOURCE_COLORS[source] }}>
      {SOURCE_LABELS[source]}
    </span>
  );
}

/* ── Stage Dropdown ───────────────────────────────────── */
function StageSelect({ value, onChange }: { value: Employer["stage"]; onChange: (v: Employer["stage"]) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Employer["stage"])}
      className="text-xs px-2 py-1 rounded-md border bg-white cursor-pointer transition-colors"
      style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}
    >
      {STAGE_OPTIONS.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
    </select>
  );
}

/* ── Quick Add Modal ──────────────────────────────────── */
function QuickAddModal({ open, onOpenChange, onAdd }: {
  open: boolean; onOpenChange: (o: boolean) => void;
  onAdd: (e: Omit<Employer, "id" | "createdAt" | "updatedAt">) => void;
}) {
  const [name, setName] = useState("");
  const [source, setSource] = useState<Employer["source"]>("manual");
  const [alumni, setAlumni] = useState(false);

  const submit = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), source, alumni, motivation: 1, posting: 1, stage: "listed", notes: "", jdUrl: "" });
    setName(""); setSource("manual"); setAlumni(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader><DialogTitle className="font-heading" style={{ color: "#1B3A2F" }}>Add Company</DialogTitle></DialogHeader>
        <div className="space-y-3 mt-1">
          <Input placeholder="Company name *" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} className="bg-paper-alt border-border" />
          <div>
            <label className="text-xs font-medium" style={{ color: "#2C2C2C" }}>Source</label>
            <select value={source} onChange={(e) => setSource(e.target.value as Employer["source"])} className="w-full mt-1 px-3 py-2 rounded-md border text-sm bg-paper-alt" style={{ borderColor: "#E5E0D8" }}>
              {(["dream", "alumni", "posting", "trend", "manual"] as const).map((s) => <option key={s} value={s}>{SOURCE_LABELS[s]}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#2C2C2C" }}>
            <input type="checkbox" checked={alumni} onChange={(e) => setAlumni(e.target.checked)} className="rounded" /> Alumni connection
          </label>
          <button onClick={submit} disabled={!name.trim()} className="w-full py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-40" style={{ backgroundColor: "#C9A961" }}>
            Add Company
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Row Expansion Panel ──────────────────────────────── */
function ExpandedRow({ employer, contacts, onUpdate, onAddContact }: {
  employer: Employer; contacts: Contact[]; onUpdate: (updates: Partial<Employer>) => void;
  onAddContact?: (employerId: string) => void;
}) {
  const empContacts = contacts.filter((c) => c.employerId === employer.id);
  return (
    <div className="px-4 py-4 space-y-4 border-t bg-[#FAFAF7]" style={{ borderColor: "#E5E0D8" }}>
      <h3 className="font-bold text-base" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>{employer.name}</h3>
      <div className="flex flex-wrap gap-6">
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Motivation</label>
          <Stars value={employer.motivation} onChange={(v) => onUpdate({ motivation: v })} size={20} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Posting Fit</label>
          <PostingBadge value={employer.posting} onChange={(v) => onUpdate({ posting: v })} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Alumni</label>
          <AlumniPill value={employer.alumni} onChange={(v) => onUpdate({ alumni: v })} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Stage</label>
          <StageSelect value={employer.stage} onChange={(v) => onUpdate({ stage: v })} />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Contacts ({empContacts.length})</label>
        {empContacts.length > 0 ? (
          <div className="space-y-1 text-sm" style={{ color: "#2C2C2C" }}>
            {empContacts.map((c) => <div key={c.id}>{c.name}, {c.role}</div>)}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "#888" }}>No contacts yet.</span>
            <button
              onClick={() => onAddContact?.(employer.id)}
              disabled={!onAddContact}
              className="text-xs px-2 py-1 rounded border transition-colors hover:bg-paper-alt disabled:opacity-50"
              style={{ borderColor: "#E5E0D8" }}
              aria-label={`Add contact at ${employer.name}`}
            >+ Add Contact</button>
          </div>
        )}
      </div>
      <div>
        <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Notes</label>
        <Textarea
          defaultValue={employer.notes}
          onBlur={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Add notes…"
          className="bg-white border-border min-h-[60px] text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Job Posting URL</label>
        <div className="flex gap-2">
          <Input
            defaultValue={employer.jdUrl}
            onBlur={(e) => onUpdate({ jdUrl: e.target.value })}
            placeholder="https://…"
            className="bg-white border-border text-sm"
          />
        </div>
        {employer.jdUrl && (
          <div className="flex gap-3 mt-2">
            <a href="/resume-analyzer" target="_blank" className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: "#C9A961" }}>
              Check Resume Match → <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Column Picker ────────────────────────────────────── */
function ColumnPicker({ visible, onChange }: { visible: Set<ColId>; onChange: (s: Set<ColId>) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-medium transition-colors hover:bg-paper-alt" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
        <Columns3 className="w-3.5 h-3.5" /> Columns
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border p-2 z-50 w-44" style={{ borderColor: "#E5E0D8" }}>
            {ALL_COLUMNS.map((col) => (
              <label key={col} className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-paper-alt cursor-pointer" style={{ color: "#2C2C2C" }}>
                <input
                  type="checkbox"
                  checked={visible.has(col)}
                  onChange={() => {
                    const next = new Set(visible);
                    next.has(col) ? next.delete(col) : next.add(col);
                    onChange(next);
                  }}
                  className="rounded"
                />
                {COL_LABELS[col]}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── CSV Export ────────────────────────────────────────── */
function exportCSV(employers: Employer[]) {
  const headers = ["Company", "Source", "Alumni", "Motivation", "Posting", "Stage", "Notes", "JD URL", "Created"];
  const escape = (s: string) => `"${(s || "").replace(/"/g, '""')}"`;
  const rows = employers.map((e) => [
    escape(e.name), e.source, e.alumni ? "Y" : "N", e.motivation, e.posting, e.stage,
    escape(e.notes), escape(e.jdUrl), e.createdAt,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `lamp-job-search-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  URL.revokeObjectURL(url);
  toast.success("CSV downloaded ✓");
}

/* ── Mobile Card ──────────────────────────────────────── */
function MobileCard({ employer, priority, contacts, expanded, onToggle, onUpdate, onDelete }: {
  employer: Employer; priority: number; contacts: Contact[];
  expanded: boolean; onToggle: () => void;
  onUpdate: (updates: Partial<Employer>) => void; onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: "#E5E0D8" }}>
      <button onClick={onToggle} className="w-full p-4 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${priority <= 5 ? "text-white" : "text-gray-500"}`} style={{ backgroundColor: priority <= 5 ? "#C9A961" : "#E5E0D8" }}>
              {priority}
            </span>
            <span className="font-semibold text-sm truncate" style={{ color: "#1B3A2F" }}>{employer.name}</span>
          </div>
          <SourceBadge source={employer.source} />
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Stars value={employer.motivation} onChange={(v) => { onUpdate({ motivation: v }); }} size={12} />
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: STAGE_LABELS[employer.stage] === "Offer" ? "#DCFCE7" : "#F3F4F6", color: "#2C2C2C" }}>
            {STAGE_LABELS[employer.stage]}
          </span>
        </div>
      </button>
      {expanded && (
        <div className="border-t" style={{ borderColor: "#E5E0D8" }}>
          <ExpandedRow employer={employer} contacts={contacts} onUpdate={onUpdate} onAddContact={undefined} />
          <div className="px-4 pb-3">
            <button onClick={onDelete} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main Table Component
   ══════════════════════════════════════════════════════════ */
interface LAMPTableProps {
  employers: Employer[];
  contacts: Contact[];
  onUpdateEmployer: (id: string, updates: Partial<Employer>) => void;
  onDeleteEmployers: (ids: string[]) => void;
  onAddEmployer: (e: Omit<Employer, "id" | "createdAt" | "updatedAt">) => void;
  onOpenWizard: () => void;
  highlightedEmployerId?: string | null;
  onAddContactForEmployer?: (employerId: string) => void;
}

export default function LAMPTable({ employers, contacts, onUpdateEmployer, onDeleteEmployers, onAddEmployer, onOpenWizard, highlightedEmployerId, onAddContactForEmployer }: LAMPTableProps) {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<Employer["source"] | "all">("all");
  const [stageFilter, setStageFilter] = useState<Employer["stage"] | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("priority");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Set<ColId>>(new Set(ALL_COLUMNS));
  const [editingName, setEditingName] = useState<string | null>(null);
  const editRef = useRef<HTMLInputElement>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const priorityMap = useMemo(() => calcPriority(employers), [employers]);

  const filtered = useMemo(() => {
    let list = [...employers];
    if (search) list = list.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
    if (sourceFilter !== "all") list = list.filter((e) => e.source === sourceFilter);
    if (stageFilter !== "all") list = list.filter((e) => e.stage === stageFilter);
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "priority": cmp = (priorityMap.get(a.id) || 0) - (priorityMap.get(b.id) || 0); break;
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "source": cmp = a.source.localeCompare(b.source); break;
        case "alumni": cmp = (a.alumni ? 0 : 1) - (b.alumni ? 0 : 1); break;
        case "motivation": cmp = b.motivation - a.motivation; break;
        case "posting": cmp = b.posting - a.posting; break;
        case "stage": cmp = STAGE_OPTIONS.indexOf(a.stage) - STAGE_OPTIONS.indexOf(b.stage); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [employers, search, sourceFilter, stageFilter, sortKey, sortDir, priorityMap]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => sortKey === col ? (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : null;

  const allSelected = filtered.length > 0 && filtered.every((e) => selected.has(e.id));
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((e) => e.id)));
  };

  const handleDelete = (id: string) => {
    onDeleteEmployers([id]);
    setDeleteConfirm(null);
    toast.success("Employer deleted");
  };

  

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#888" }} />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter companies…" className="pl-9 bg-white border-border text-sm" />
        </div>
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as any)} className="px-3 py-2 rounded-md border text-xs bg-white" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
          <option value="all">All Sources</option>
          {(["dream", "alumni", "posting", "trend", "manual"] as const).map((s) => <option key={s} value={s}>{SOURCE_LABELS[s]}</option>)}
        </select>
        <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value as any)} className="px-3 py-2 rounded-md border text-xs bg-white" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
          <option value="all">All Stages</option>
          {STAGE_OPTIONS.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
        </select>
        <ColumnPicker visible={visibleCols} onChange={setVisibleCols} />
        <button onClick={() => setAddOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02]" style={{ backgroundColor: "#C9A961" }}>
          <Plus className="w-3.5 h-3.5" /> Add Company
        </button>
        <button onClick={onOpenWizard} className="px-3 py-2 rounded-md border text-xs font-medium transition-colors hover:bg-paper-alt" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
          🧙 Guided Add
        </button>
        <button onClick={() => exportCSV(employers)} className="px-3 py-2 rounded-md border text-xs font-medium transition-colors hover:bg-paper-alt" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
          <Download className="w-3.5 h-3.5" />
        </button>
        {selected.size > 0 && (
          <button onClick={() => { onDeleteEmployers([...selected]); setSelected(new Set()); toast.success(`${selected.size} deleted`); }} className="px-3 py-2 rounded-md text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
            Delete {selected.size} selected
          </button>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: "#E5E0D8" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#E5E0D8", backgroundColor: "#FAFAF7" }}>
                <th className="w-10 px-3 py-2.5">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded" />
                </th>
                {visibleCols.has("priority") && <th className="px-3 py-2.5 text-left text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("priority")}><div className="flex items-center gap-1">Priority <SortIcon col="priority" /></div></th>}
                {visibleCols.has("company") && <th className="px-3 py-2.5 text-left text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("name")}><div className="flex items-center gap-1">Company <SortIcon col="name" /></div></th>}
                {visibleCols.has("source") && <th className="px-3 py-2.5 text-left text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("source")}><div className="flex items-center gap-1">Source <SortIcon col="source" /></div></th>}
                {visibleCols.has("alumni") && <th className="px-3 py-2.5 text-center text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("alumni")}><div className="flex items-center justify-center gap-1">A <SortIcon col="alumni" /></div></th>}
                {visibleCols.has("motivation") && <th className="px-3 py-2.5 text-left text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("motivation")}><div className="flex items-center gap-1">M <SortIcon col="motivation" /></div></th>}
                {visibleCols.has("posting") && <th className="px-3 py-2.5 text-center text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("posting")}><div className="flex items-center justify-center gap-1">P <SortIcon col="posting" /></div></th>}
                {visibleCols.has("stage") && <th className="px-3 py-2.5 text-left text-xs font-semibold cursor-pointer select-none" style={{ color: "#888" }} onClick={() => toggleSort("stage")}><div className="flex items-center gap-1">Stage <SortIcon col="stage" /></div></th>}
                {visibleCols.has("actions") && <th className="px-3 py-2.5 w-20" />}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => {
                const rank = priorityMap.get(emp.id) || 0;
                const isExpanded = expandedId === emp.id;
                return (
                  <tbody key={emp.id}>
                    <tr
                      className={`border-b hover:bg-[#FAFAF7] transition-all duration-300 cursor-pointer ${highlightedEmployerId === emp.id ? "ring-2 ring-[#C9A961] bg-paper-alt" : ""}`}
                      style={{ borderColor: "#E5E0D8" }}
                      id={`employer-${emp.id}`}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest("button, select, input, a")) return;
                        setExpandedId(isExpanded ? null : emp.id);
                      }}
                    >
                      <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selected.has(emp.id)} onChange={() => setSelected((prev) => { const n = new Set(prev); n.has(emp.id) ? n.delete(emp.id) : n.add(emp.id); return n; })} className="rounded" />
                      </td>
                      {visibleCols.has("priority") && (
                        <td className="px-3 py-2.5">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${rank <= 5 ? "text-white" : "text-gray-500"}`} style={{ backgroundColor: rank <= 5 ? "#C9A961" : "#F3F4F6" }}>
                            {rank}
                          </span>
                        </td>
                      )}
                      {visibleCols.has("company") && (
                        <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                          {editingName === emp.id ? (
                            <Input
                              ref={editRef}
                              autoFocus
                              defaultValue={emp.name}
                              onBlur={(e) => { onUpdateEmployer(emp.id, { name: e.target.value }); setEditingName(null); }}
                              onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                              className="h-7 text-sm border-border"
                            />
                          ) : (
                            <span className="font-semibold cursor-text" style={{ color: "#1B3A2F" }} onClick={() => setEditingName(emp.id)}>
                              {emp.name}
                            </span>
                          )}
                        </td>
                      )}
                      {visibleCols.has("source") && <td className="px-3 py-2.5"><SourceBadge source={emp.source} /></td>}
                      {visibleCols.has("alumni") && <td className="px-3 py-2.5 text-center" onClick={(e) => e.stopPropagation()}><AlumniPill value={emp.alumni} onChange={(v) => onUpdateEmployer(emp.id, { alumni: v })} /></td>}
                      {visibleCols.has("motivation") && <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}><Stars value={emp.motivation} onChange={(v) => onUpdateEmployer(emp.id, { motivation: v })} /></td>}
                      {visibleCols.has("posting") && <td className="px-3 py-2.5 text-center" onClick={(e) => e.stopPropagation()}><PostingBadge value={emp.posting} onChange={(v) => onUpdateEmployer(emp.id, { posting: v })} /></td>}
                      {visibleCols.has("stage") && <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}><StageSelect value={emp.stage} onChange={(v) => onUpdateEmployer(emp.id, { stage: v })} /></td>}
                      {visibleCols.has("actions") && (
                        <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setExpandedId(isExpanded ? null : emp.id)} className="p-1 rounded hover:bg-[#E5E0D8] transition-colors">
                              <Pencil className="w-3.5 h-3.5" style={{ color: "#888" }} />
                            </button>
                            <button onClick={() => setDeleteConfirm(emp.id)} className="p-1 rounded hover:bg-red-50 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                    {isExpanded && (
                      <tr><td colSpan={10}>
                        <ExpandedRow employer={emp} contacts={contacts} onUpdate={(u) => onUpdateEmployer(emp.id, u)} onAddContact={onAddContactForEmployer} />
                      </td></tr>
                    )}
                  </tbody>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm" style={{ color: "#888" }}>No employers match your filters.</div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {filtered.map((emp) => (
          <MobileCard
            key={emp.id}
            employer={emp}
            priority={priorityMap.get(emp.id) || 0}
            contacts={contacts}
            expanded={expandedId === emp.id}
            onToggle={() => setExpandedId(expandedId === emp.id ? null : emp.id)}
            onUpdate={(u) => onUpdateEmployer(emp.id, u)}
            onDelete={() => { onDeleteEmployers([emp.id]); toast.success("Deleted"); }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm" style={{ color: "#888" }}>No employers match your filters.</div>
        )}
      </div>


      {/* Modals */}
      <QuickAddModal open={addOpen} onOpenChange={setAddOpen} onAdd={onAddEmployer} />

      {/* Delete confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-xs bg-white">
          <DialogHeader><DialogTitle style={{ color: "#1B3A2F" }}>Delete employer?</DialogTitle></DialogHeader>
          <p className="text-sm" style={{ color: "#2C2C2C" }}>This cannot be undone.</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 rounded-md border text-sm" style={{ borderColor: "#E5E0D8" }}>Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2 rounded-md text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
