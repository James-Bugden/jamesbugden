import { useState, useMemo, useEffect } from "react";
import {
  Search, Plus, Trash2, Mail, Phone, CheckCircle2, Clock,
  AlertTriangle, ExternalLink, X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Employer, Contact, STORAGE_KEYS } from "@/lib/tracker/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import EmailBuilder from "./EmailBuilder";

/* ── Constants ─────────────────────────────────────────── */
const SOURCE_OPTIONS: { value: Contact["source"]; label: string }[] = [
  { value: "alumni-db", label: "Alumni DB" },
  { value: "linkedin-1st", label: "LinkedIn 1st°" },
  { value: "linkedin-2nd", label: "LinkedIn 2nd°" },
  { value: "linkedin-group", label: "LinkedIn Group" },
  { value: "facebook", label: "Facebook" },
  { value: "fan-mail", label: "Fan Mail" },
  { value: "cold-call", label: "Cold Call" },
];
/* All contact sources use a unified Hiresign chip — differentiation comes from the label, not a rainbow palette. */
const SOURCE_COLORS: Record<Contact["source"], string> = {
  "alumni-db": "hsl(var(--executive-green))",
  "linkedin-1st": "hsl(var(--executive-green))",
  "linkedin-2nd": "hsl(var(--executive-green))",
  "linkedin-group": "hsl(var(--executive-green))",
  "facebook": "hsl(var(--executive-green))",
  "fan-mail": "hsl(var(--gold))",
  "cold-call": "hsl(var(--muted-foreground))",
};

/* ── Business-day helpers ──────────────────────────────── */
function businessDaysBetween(startStr: string, endStr: string): number {
  const start = new Date(startStr);
  const end = new Date(endStr);
  let count = 0;
  const cur = new Date(start);
  cur.setDate(cur.getDate() + 1); // start counting from next day
  while (cur <= end) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function businessDaysSinceEmail(emailSentDate: string): number {
  return businessDaysBetween(emailSentDate, new Date().toISOString());
}

/* ── Auto-classification ──────────────────────────────── */
type StatusKey = "not-contacted" | "awaiting" | "booster" | "obligate" | "curmudgeon";

interface StatusInfo { key: StatusKey; label: string; emoji: string; color: string; bg: string; }

const STATUS_MAP: Record<StatusKey, StatusInfo> = {
  "not-contacted": { key: "not-contacted", label: "Not Contacted", emoji: "⬜", color: "hsl(var(--muted-foreground))", bg: "hsl(var(--muted))" },
  "awaiting":      { key: "awaiting",      label: "Awaiting",      emoji: "🟡", color: "hsl(var(--warning))",          bg: "hsl(var(--warning-soft))" },
  "booster":       { key: "booster",       label: "Booster",       emoji: "🟢", color: "hsl(var(--executive-green))",  bg: "hsl(var(--green-soft))" },
  "obligate":      { key: "obligate",      label: "Obligate",      emoji: "🟠", color: "hsl(var(--warning))",          bg: "hsl(var(--warning-soft))" },
  "curmudgeon":    { key: "curmudgeon",    label: "Curmudgeon",    emoji: "🔴", color: "hsl(var(--destructive))",      bg: "hsl(var(--destructive-soft))" },
};

function classifyContact(c: Contact): StatusInfo {
  if (!c.emailSentDate) return STATUS_MAP["not-contacted"];
  if (c.respondedDate) {
    const daysToRespond = businessDaysBetween(c.emailSentDate, c.respondedDate);
    return daysToRespond <= 3 ? STATUS_MAP["booster"] : STATUS_MAP["obligate"];
  }
  const daysSince = businessDaysSinceEmail(c.emailSentDate);
  if (daysSince >= 10 && c.followUpSentDate) return STATUS_MAP["curmudgeon"];
  return STATUS_MAP["awaiting"];
}

/* ── 3-day / 7-day check helpers ──────────────────────── */
interface CheckInfo { label: string; color: string; bg: string; icon: "pending" | "action" | "done"; }

function get3DayCheck(c: Contact): CheckInfo {
  if (!c.emailSentDate) return { label: "—", color: "#9CA3AF", bg: "#F3F4F6", icon: "pending" };
  if (c.respondedDate) return { label: "Responded", color: "#166534", bg: "#DCFCE7", icon: "done" };
  const days = businessDaysSinceEmail(c.emailSentDate);
  if (days < 3) return { label: "Pending", color: "#6B7280", bg: "#F3F4F6", icon: "pending" };
  return { label: "Reach out to #2", color: "#B45309", bg: "#FEF3C7", icon: "action" };
}

function get7DayCheck(c: Contact): CheckInfo {
  if (!c.emailSentDate) return { label: "—", color: "#9CA3AF", bg: "#F3F4F6", icon: "pending" };
  if (c.respondedDate) return { label: "Responded", color: "#166534", bg: "#DCFCE7", icon: "done" };
  if (c.followUpSentDate || c.followUpCallDate) return { label: "Done", color: "#166534", bg: "#DCFCE7", icon: "done" };
  const days = businessDaysSinceEmail(c.emailSentDate);
  if (days < 7) return { label: "Pending", color: "#6B7280", bg: "#F3F4F6", icon: "pending" };
  return { label: "Follow up now", color: "#B45309", bg: "#FEF3C7", icon: "action" };
}

function CheckBadge({ info }: { info: CheckInfo }) {
  const Icon = info.icon === "done" ? CheckCircle2 : info.icon === "action" ? AlertTriangle : Clock;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: info.bg, color: info.color }}>
      <Icon className="w-3 h-3" /> {info.label}
    </span>
  );
}

/* ── Add Contact Modal ─────────────────────────────────── */
function AddContactModal({ open, onOpenChange, employers, contacts, onAdd, initialEmployerId, onConsumePreselection }: {
  open: boolean; onOpenChange: (o: boolean) => void;
  employers: Employer[]; contacts: Contact[];
  onAdd: (c: Omit<Contact, "id" | "createdAt">) => void;
  initialEmployerId?: string | null;
  onConsumePreselection?: () => void;
}) {
  const [name, setName] = useState("");
  const [employerId, setEmployerId] = useState(initialEmployerId || "");
  const [source, setSource] = useState<Contact["source"]>("linkedin-1st");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");

  // Sync initial employer when opening via cross-tab
  useEffect(() => {
    if (open && initialEmployerId) {
      setEmployerId(initialEmployerId);
    }
  }, [open, initialEmployerId]);

  const contactNum = useMemo(() => {
    if (!employerId) return 1;
    const existing = contacts.filter((c) => c.employerId === employerId).length;
    return Math.min(existing + 1, 3) as 1 | 2 | 3;
  }, [employerId, contacts]);

  const submit = () => {
    if (!name.trim() || !employerId) return;
    onAdd({
      name: name.trim(), employerId, source, email: email.trim(), role: role.trim(),
      status: "not-contacted", notes: notes.trim(),
      emailSentDate: null, respondedDate: null, followUpSentDate: null, followUpCallDate: null,
      contactNumber: contactNum,
    });
    setName(""); setEmployerId(""); setEmail(""); setRole(""); setNotes("");
    onConsumePreselection?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader><DialogTitle className="font-heading" style={{ color: "#1B3A2F" }}>Add Contact</DialogTitle></DialogHeader>
        <div className="space-y-3 mt-1">
          <Input placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#FBF7F0] border-[#E5E0D8]" />
          <div>
            <label className="text-xs font-medium" style={{ color: "#2C2C2C" }}>Company *</label>
            <select value={employerId} onChange={(e) => setEmployerId(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md border text-sm bg-[#FBF7F0]" style={{ borderColor: "#E5E0D8" }}>
              <option value="">Select company…</option>
              {employers.map((emp) => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium" style={{ color: "#2C2C2C" }}>Source</label>
            <select value={source} onChange={(e) => setSource(e.target.value as Contact["source"])} className="w-full mt-1 px-3 py-2 rounded-md border text-sm bg-[#FBF7F0]" style={{ borderColor: "#E5E0D8" }}>
              {SOURCE_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <Input placeholder="Email (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#FBF7F0] border-[#E5E0D8]" />
          <Input placeholder="Role / Title (optional)" value={role} onChange={(e) => setRole(e.target.value)} className="bg-[#FBF7F0] border-[#E5E0D8]" />
          <p className="text-xs" style={{ color: "#888" }}>Contact #{contactNum} at this company</p>
          <Textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="bg-[#FBF7F0] border-[#E5E0D8] min-h-[60px]" />
          <button onClick={submit} disabled={!name.trim() || !employerId} className="w-full py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-40" style={{ backgroundColor: "#C9A961" }}>
            Add Contact
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Mobile Card ──────────────────────────────────────── */
function MobileContactCard({ contact, employerName, expanded, onToggle, onUpdate, onDelete, onDraftEmail }: {
  contact: Contact; employerName: string; expanded: boolean;
  onToggle: () => void; onUpdate: (u: Partial<Contact>) => void; onDelete: () => void; onDraftEmail: () => void;
}) {
  const status = classifyContact(contact);
  const daysSince = contact.emailSentDate ? businessDaysSinceEmail(contact.emailSentDate) : null;
  const check3 = get3DayCheck(contact);
  const check7 = get7DayCheck(contact);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: "#E5E0D8" }}>
      <button onClick={onToggle} className="w-full p-4 text-left">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm" style={{ color: "#1B3A2F" }}>{contact.name}</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: status.bg, color: status.color }}>
            {status.emoji} {status.label}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: "#888" }}>
          <span>{employerName}</span>
          {daysSince !== null && <span>· {daysSince}d</span>}
        </div>
        {(check3.icon === "action" || check7.icon === "action") && (
          <div className="flex gap-1.5 mt-2">
            {check3.icon === "action" && <CheckBadge info={check3} />}
            {check7.icon === "action" && <CheckBadge info={check7} />}
          </div>
        )}
      </button>
      {expanded && (
        <div className="border-t px-4 py-3 space-y-3" style={{ borderColor: "#E5E0D8" }}>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span style={{ color: "#888" }}>Source:</span> <span className="px-1.5 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: SOURCE_COLORS[contact.source], fontSize: 10 }}>{SOURCE_OPTIONS.find(s => s.value === contact.source)?.label}</span></div>
            <div><span style={{ color: "#888" }}>Contact #:</span> {contact.contactNumber}</div>
            {contact.email && <div className="col-span-2"><span style={{ color: "#888" }}>Email:</span> {contact.email}</div>}
            {contact.role && <div className="col-span-2"><span style={{ color: "#888" }}>Role:</span> {contact.role}</div>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs" style={{ color: "#888" }}>3-Day:</span> <CheckBadge info={check3} />
            <span className="text-xs" style={{ color: "#888" }}>7-Day:</span> <CheckBadge info={check7} />
          </div>
          <div className="flex flex-wrap gap-2">
            {!contact.emailSentDate && (
              <button onClick={() => { onUpdate({ emailSentDate: today }); toast.success("Email sent date logged ✓"); }} className="text-xs px-2.5 py-1.5 rounded-md border font-medium transition-colors hover:bg-[#FBF7F0]" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
                <Mail className="w-3 h-3 inline mr-1" /> Mark Sent
              </button>
            )}
            {contact.emailSentDate && !contact.respondedDate && (
              <button onClick={() => {
                const s = classifyContact({ ...contact, respondedDate: today });
                onUpdate({ respondedDate: today });
                toast.success(s.key === "booster" ? "Contact marked as Booster! 🎉" : "Response logged.");
              }} className="text-xs px-2.5 py-1.5 rounded-md border font-medium transition-colors hover:bg-[#FBF7F0]" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
                <CheckCircle2 className="w-3 h-3 inline mr-1" /> Mark Responded
              </button>
            )}
            <button onClick={() => { onUpdate({ followUpCallDate: today }); toast.success("Follow-up call logged ✓"); }} className="text-xs px-2.5 py-1.5 rounded-md border font-medium transition-colors hover:bg-[#FBF7F0]" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
              <Phone className="w-3 h-3 inline mr-1" /> Called
            </button>
            <button onClick={onDraftEmail} className="text-xs px-2.5 py-1.5 rounded-md border font-medium transition-colors hover:bg-[#FBF7F0]" style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}>
              <Mail className="w-3 h-3 inline mr-1" /> Draft Email
            </button>
            <button onClick={onDelete} className="text-xs px-2.5 py-1.5 rounded-md border font-medium text-red-500 transition-colors hover:bg-red-50" style={{ borderColor: "#FEE2E2" }}>
              <Trash2 className="w-3 h-3 inline mr-1" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main Contacts Tab
   ══════════════════════════════════════════════════════════ */
interface ContactsTabProps {
  employers: Employer[];
  contacts: Contact[];
  setContacts: (fn: (prev: Contact[]) => Contact[]) => void;
  onOpenProfile: () => void;
  preselectedEmployerId?: string | null;
  onConsumePreselection?: () => void;
}

export default function ContactsTab({ employers, contacts, setContacts, onOpenProfile, preselectedEmployerId, onConsumePreselection }: ContactsTabProps) {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [emailContactId, setEmailContactId] = useState<string | null>(null);

  // Handle cross-tab preselection: auto-open add modal with employer selected
  useEffect(() => {
    if (preselectedEmployerId) {
      setAddOpen(true);
    }
  }, [preselectedEmployerId]);

  const employerMap = useMemo(() => {
    const m = new Map<string, string>();
    employers.forEach((e) => m.set(e.id, e.name));
    return m;
  }, [employers]);

  const filtered = useMemo(() => {
    if (!search) return contacts;
    const q = search.toLowerCase();
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(q) || (employerMap.get(c.employerId) || "").toLowerCase().includes(q)
    );
  }, [contacts, search, employerMap]);

  const handleAdd = (data: Omit<Contact, "id" | "createdAt">) => {
    const now = new Date().toISOString();
    setContacts((prev) => [...prev, { ...data, id: crypto.randomUUID(), createdAt: now }]);
    toast.success("Contact added ✓");
  };

  const handleUpdate = (id: string, updates: Partial<Contact>) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
    toast.success("Contact deleted");
  };

  const today = new Date().toISOString().slice(0, 10);

  /* ── Empty state ───────────────────────────────────── */
  if (contacts.length === 0) {
    return (
      <>
        <div className="flex justify-center py-4">
          <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 max-w-lg w-full text-center" style={{ borderColor: "#E5E0D8" }}>
            <div className="text-4xl mb-3">📧</div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
              Track Your Outreach
            </h2>
            <p className="text-sm mb-5" style={{ color: "#2C2C2C" }}>
              Add contacts at your target companies and track your follow-up routine. The 3B7 system tells you exactly when to follow up.
            </p>
            <button
              onClick={() => setAddOpen(true)}
              className="px-6 py-3 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: "#C9A961" }}
            >
              + Add Your First Contact
            </button>
          </div>
        </div>
        <AddContactModal open={addOpen} onOpenChange={(o) => { setAddOpen(o); if (!o) onConsumePreselection?.(); }} employers={employers} contacts={contacts} onAdd={handleAdd} initialEmployerId={preselectedEmployerId} onConsumePreselection={onConsumePreselection} />
      </>
    );
  }

  /* ── Main view ─────────────────────────────────────── */
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#888" }} />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter contacts…" className="pl-9 bg-white border-[#E5E0D8] text-sm" />
        </div>
        <button onClick={() => setAddOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02]" style={{ backgroundColor: "#C9A961" }}>
          <Plus className="w-3.5 h-3.5" /> Add Contact
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: "#E5E0D8" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#E5E0D8", backgroundColor: "#FAFAF7" }}>
                <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: "#888" }}>Name</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: "#888" }}>Company</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: "#888" }}>Source</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold" style={{ color: "#888" }}>Status</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold" style={{ color: "#888" }}>Sent</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold" style={{ color: "#888" }}>Days</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold" style={{ color: "#888" }}>3-Day</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold" style={{ color: "#888" }}>7-Day</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold" style={{ color: "#888" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const status = classifyContact(c);
                const daysSince = c.emailSentDate ? businessDaysSinceEmail(c.emailSentDate) : null;
                const check3 = get3DayCheck(c);
                const check7 = get7DayCheck(c);
                return (
                  <tr key={c.id} className="border-b hover:bg-[#FAFAF7] transition-colors" style={{ borderColor: "#E5E0D8" }}>
                    <td className="px-3 py-2.5 font-semibold" style={{ color: "#1B3A2F" }}>{c.name}</td>
                    <td className="px-3 py-2.5" style={{ color: "#2C2C2C" }}>{employerMap.get(c.employerId) || "—"}</td>
                    <td className="px-3 py-2.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: SOURCE_COLORS[c.source] }}>
                        {SOURCE_OPTIONS.find(s => s.value === c.source)?.label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: status.bg, color: status.color }}>
                        {status.emoji} {status.label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-xs" style={{ color: "#2C2C2C" }}>
                      {c.emailSentDate ? new Date(c.emailSentDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-center text-xs font-medium" style={{ color: "#2C2C2C" }}>
                      {daysSince !== null ? `${daysSince}d` : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-center"><CheckBadge info={check3} /></td>
                    <td className="px-3 py-2.5 text-center"><CheckBadge info={check7} /></td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1">
                        {!c.emailSentDate && (
                          <button onClick={() => { handleUpdate(c.id, { emailSentDate: today }); toast.success("Email sent date set ✓"); }} className="p-1.5 rounded hover:bg-[#E5E0D8] transition-colors" title="Mark email sent">
                            <Mail className="w-3.5 h-3.5" style={{ color: "#3B82F6" }} />
                          </button>
                        )}
                        {c.emailSentDate && !c.respondedDate && (
                          <button onClick={() => {
                            const s = classifyContact({ ...c, respondedDate: today });
                            handleUpdate(c.id, { respondedDate: today });
                            toast.success(s.key === "booster" ? "Contact marked as Booster! 🎉" : "Response logged.");
                          }} className="p-1.5 rounded hover:bg-[#E5E0D8] transition-colors" title="Mark responded">
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#22C55E" }} />
                          </button>
                        )}
                        <button onClick={() => { handleUpdate(c.id, { followUpCallDate: today }); toast.success("Follow-up call logged ✓"); }} className="p-1.5 rounded hover:bg-[#E5E0D8] transition-colors" title="Mark called">
                          <Phone className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
                        </button>
                        <button onClick={() => setEmailContactId(c.id)} className="p-1.5 rounded hover:bg-[#E5E0D8] transition-colors" title="Draft email">
                          <Mail className="w-3.5 h-3.5" style={{ color: "#C9A961" }} />
                        </button>
                        <button onClick={() => setDeleteConfirm(c.id)} className="p-1.5 rounded hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm" style={{ color: "#888" }}>No contacts match your filter.</div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {filtered.map((c) => (
          <MobileContactCard
            key={c.id}
            contact={c}
            employerName={employerMap.get(c.employerId) || "—"}
            expanded={expandedId === c.id}
            onToggle={() => setExpandedId(expandedId === c.id ? null : c.id)}
            onUpdate={(u) => handleUpdate(c.id, u)}
            onDelete={() => { handleDelete(c.id); }}
            onDraftEmail={() => setEmailContactId(c.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm" style={{ color: "#888" }}>No contacts match your filter.</div>
        )}
      </div>

      {/* Coaching CTA — visible when ≥3 contacts and <20% boosters */}
      {contacts.length >= 3 && (() => {
        const boosterPct = contacts.filter((c) => {
          if (!c.emailSentDate || !c.respondedDate) return false;
          const s = new Date(c.emailSentDate), e = new Date(c.respondedDate);
          let count = 0; const cur = new Date(s); cur.setDate(cur.getDate() + 1);
          while (cur <= e) { const dow = cur.getDay(); if (dow !== 0 && dow !== 6) count++; cur.setDate(cur.getDate() + 1); }
          return count <= 3;
        }).length / contacts.length;
        return boosterPct < 0.2;
      })() && (
        <div className="bg-white rounded-lg shadow-sm border p-5" style={{ borderColor: "#E5E0D8" }}>
          <p className="text-sm font-medium" style={{ color: "#1B3A2F" }}>📧 Not hearing back from contacts?</p>
          <p className="text-xs mt-1" style={{ color: "#888" }}>
            A 40% response rate is normal. James can help you refine your outreach and find better contact sources.
          </p>
          <a href="https://james.careers/#coaching" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold mt-2 inline-flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: "#C9A961" }}>
            Get Outreach Help → <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Modals */}
      <AddContactModal open={addOpen} onOpenChange={(o) => { setAddOpen(o); if (!o) onConsumePreselection?.(); }} employers={employers} contacts={contacts} onAdd={handleAdd} initialEmployerId={preselectedEmployerId} onConsumePreselection={onConsumePreselection} />
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-xs bg-white">
          <DialogHeader><DialogTitle style={{ color: "#1B3A2F" }}>Delete contact?</DialogTitle></DialogHeader>
          <p className="text-sm" style={{ color: "#2C2C2C" }}>This cannot be undone.</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 rounded-md border text-sm" style={{ borderColor: "#E5E0D8" }}>Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2 rounded-md text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Builder */}
      {emailContactId && (() => {
        const c = contacts.find((x) => x.id === emailContactId);
        if (!c) return null;
        const emp = employers.find((e) => e.id === c.employerId);
        return (
          <EmailBuilder
            contact={c}
            employer={emp}
            onClose={() => setEmailContactId(null)}
            onUpdateContact={(u) => handleUpdate(c.id, u)}
            onOpenProfile={onOpenProfile}
          />
        );
      })()}
    </div>
  );
}
