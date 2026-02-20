import { useState, useRef } from "react";
import { Plus, Trash2, X, FileText, Mail, Link as LinkIcon, Users, CheckSquare, ClipboardList } from "lucide-react";
import {
  JobApplication, JobStage, JOB_STAGES, ACTIVE_STAGES, STAGE_CHECKLISTS, JobContact,
  createJob, updateJob, deleteJob, linkDocumentToJob, unlinkDocumentFromJob,
} from "@/lib/jobStore";
import { SavedDocument, createDocument } from "@/lib/documentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ExcitementStars from "./ExcitementStars";

/* ── Drag context ── */
let draggedJobId: string | null = null;

/* ── Stage progress bar (like Teal's breadcrumb) ── */
function StageProgressBar({ stage, onChange }: { stage: JobStage; onChange: (s: JobStage) => void }) {
  const stages: { id: JobStage; label: string; color: string }[] = [
    { id: "bookmarked", label: "Bookmarked", color: "#6366f1" },
    { id: "applying", label: "Applying", color: "#8b5cf6" },
    { id: "applied", label: "Applied", color: "#0ea5e9" },
    { id: "interviewing", label: "Interviewing", color: "#f59e0b" },
    { id: "negotiating", label: "Negotiating", color: "#22c55e" },
    { id: "accepted", label: "Accepted", color: "#10b981" },
  ];
  const currentIdx = stages.findIndex((s) => s.id === stage);

  return (
    <div className="flex gap-0.5 mb-4">
      {stages.map((s, i) => {
        const reached = i <= currentIdx;
        return (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className="flex-1 py-1.5 text-[10px] sm:text-xs font-medium text-center transition-all first:rounded-l-md last:rounded-r-md"
            style={{
              backgroundColor: reached ? s.color : "#E5E0D8",
              color: reached ? "#FFFFFF" : "#6B7280",
            }}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

function JobCard({ job, onClick, onDragStart }: {
  job: JobApplication;
  onClick: () => void;
  onDragStart: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; onDragStart(); }}
      onClick={onClick}
      className="rounded-lg p-3 shadow-sm border cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E0D8" }}
    >
      <p className="text-sm font-semibold truncate" style={{ color: "#1B3A2F" }}>{job.title || "Untitled"}</p>
      <p className="text-xs truncate" style={{ color: "#6B7280" }}>{job.company}</p>
      <div className="flex items-center justify-between mt-1.5">
        {(job.minSalary || job.maxSalary) ? (
          <p className="text-xs" style={{ color: "#C9A961" }}>
            {job.minSalary && job.maxSalary ? `${job.minSalary} - ${job.maxSalary}` : job.minSalary || job.maxSalary}
          </p>
        ) : <span />}
        {job.excitement > 0 && <ExcitementStars value={job.excitement} readonly size={10} />}
      </div>
      <p className="text-[10px] mt-1" style={{ color: "#9CA3AF" }}>
        {new Date(job.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
      </p>
    </div>
  );
}

function StageColumn({ stage, jobs, onAddJob, onSelectJob, onDropJob }: {
  stage: { id: JobStage; label: string; color: string };
  jobs: JobApplication[];
  onAddJob: () => void;
  onSelectJob: (id: string) => void;
  onDropJob: (stage: JobStage) => void;
}) {
  const [over, setOver] = useState(false);

  return (
    <div
      className={cn("w-72 flex flex-col flex-shrink-0 rounded-xl p-3 transition-colors", over && "ring-2")}
      style={{ backgroundColor: over ? "#F5F0E8" : "#FBF7F0", ...(over ? { ringColor: "#C9A961" } : {}) }}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onDropJob(stage.id); }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
          <h3 className="text-sm font-bold" style={{ color: "#1B3A2F" }}>{stage.label}</h3>
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#E5E0D8", color: "#6B7280" }}>
            {jobs.length}
          </span>
        </div>
        <button onClick={onAddJob} className="p-1 rounded hover:bg-[#E5E0D8] transition-colors" style={{ color: "#6B7280" }}>
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto min-h-[100px]">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onSelectJob(job.id)}
            onDragStart={() => { draggedJobId = job.id; }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Job Detail Panel ── */
type DetailTab = "details" | "contacts" | "documents" | "checklist";

export function JobDetailPanel({
  job, onClose, onUpdate, onDelete, documents,
}: {
  job: JobApplication;
  onClose: () => void;
  onUpdate: (updates: Partial<JobApplication>) => void;
  onDelete: () => void;
  documents: SavedDocument[];
}) {
  const [tab, setTab] = useState<DetailTab>("details");
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const [contactDraft, setContactDraft] = useState<Partial<JobContact>>({});

  const linkedDocs = documents.filter((d) => job.linkedDocIds.includes(d.id));
  const unlinkedDocs = documents.filter((d) => !job.linkedDocIds.includes(d.id));
  const checklistItems = STAGE_CHECKLISTS[job.stage] || [];
  const checklistTotal = checklistItems.length;
  const checklistDone = checklistItems.filter((item) => job.checklist?.[item.id]).length;

  const handleCreateTailored = (type: "resume" | "cover_letter") => {
    const name = `${job.company ? job.company + " - " : ""}${job.title || "Job"} ${type === "resume" ? "Resume" : "Cover Letter"}`;
    const doc = createDocument(type, name);
    linkDocumentToJob(job.id, doc.id);
    onUpdate({ linkedDocIds: [...job.linkedDocIds, doc.id] });
  };

  const addContact = () => {
    if (!contactDraft.name) return;
    const contact: JobContact = {
      id: crypto.randomUUID(),
      name: contactDraft.name || "",
      email: contactDraft.email || "",
      role: contactDraft.role || "",
      company: contactDraft.company || job.company,
      notes: contactDraft.notes || "",
    };
    onUpdate({ contacts: [...(job.contacts || []), contact] });
    setContactDraft({});
    setNewContact(false);
  };

  const removeContact = (contactId: string) => {
    onUpdate({ contacts: (job.contacts || []).filter((c) => c.id !== contactId) });
  };

  const toggleChecklist = (itemId: string) => {
    const newChecklist = { ...job.checklist, [itemId]: !job.checklist?.[itemId] };
    onUpdate({ checklist: newChecklist });
  };

  const tabs: { id: DetailTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "details", label: "Details", icon: ClipboardList },
    { id: "contacts", label: "Contacts", icon: Users, badge: (job.contacts || []).length },
    { id: "documents", label: "Docs", icon: FileText, badge: linkedDocs.length },
    { id: "checklist", label: "Checklist", icon: CheckSquare, badge: checklistTotal > 0 ? checklistDone : undefined },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-lg shadow-2xl border-l flex flex-col h-full" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E0D8" }}>
        {/* Header with title + salary + excitement */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#E5E0D8" }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="font-bold truncate text-lg" style={{ color: "#1B3A2F" }}>
                {job.title || "Untitled Job"}
              </h2>
              <p className="text-sm truncate" style={{ color: "#6B7280" }}>
                {job.company}{job.location ? ` · ${job.location}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50" style={{ color: "#9CA3AF" }}>
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F0E8]" style={{ color: "#9CA3AF" }}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Salary + excitement row */}
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm font-semibold" style={{ color: "#C9A961" }}>
              {(job.minSalary || job.maxSalary) ? (
                <>
                  {job.minSalary && `$${job.minSalary}`}
                  {job.minSalary && job.maxSalary && " – "}
                  {job.maxSalary && `$${job.maxSalary}`}
                  <span className="text-xs font-normal" style={{ color: "#9CA3AF" }}>/yr</span>
                </>
              ) : null}
            </div>
            <ExcitementStars value={job.excitement} onChange={(v) => onUpdate({ excitement: v })} size={18} />
          </div>
          {/* Stage progress bar */}
          <StageProgressBar stage={job.stage} onChange={(s) => onUpdate({ stage: s })} />
          {/* Guidance line */}
          {checklistTotal > 0 && (
            <div className="flex items-center gap-2 text-xs" style={{ color: "#1B3A2F" }}>
              <span style={{ color: "#C9A961" }}>⚡ Guidance</span>
              <span>›</span>
              <span>{JOB_STAGES.find((s) => s.id === job.stage)?.label} Steps: {Math.round((checklistDone / checklistTotal) * 100)}% Complete</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b px-5 overflow-x-auto" style={{ borderColor: "#E5E0D8" }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
                style={{
                  borderColor: tab === t.id ? "#C9A961" : "transparent",
                  color: tab === t.id ? "#C9A961" : "#6B7280",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
                {t.badge !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#F5F0E8", color: "#1B3A2F" }}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === "details" && (
            <>
              {[
                ["title", "Job Title"],
                ["company", "Company"],
                ["location", "Location"],
                ["url", "Job URL"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>{label}</label>
                  <Input
                    value={(job as any)[key]}
                    onChange={(e) => onUpdate({ [key]: e.target.value })}
                    className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Min Salary</label>
                  <Input
                    value={job.minSalary}
                    onChange={(e) => onUpdate({ minSalary: e.target.value })}
                    className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]"
                    placeholder="e.g. 80,000"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Max Salary</label>
                  <Input
                    value={job.maxSalary}
                    onChange={(e) => onUpdate({ maxSalary: e.target.value })}
                    className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]"
                    placeholder="e.g. 120,000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Follow-up Date</label>
                  <Input
                    type="date"
                    value={job.followUpDate?.slice(0, 10) || ""}
                    onChange={(e) => onUpdate({ followUpDate: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Deadline</label>
                  <Input
                    type="date"
                    value={job.deadline?.slice(0, 10) || ""}
                    onChange={(e) => onUpdate({ deadline: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Job Description</label>
                <Textarea
                  value={job.jobDescription}
                  onChange={(e) => onUpdate({ jobDescription: e.target.value })}
                  rows={6}
                  className="mt-1 bg-[#FBF7F0] border-[#E5E0D8] text-xs"
                  placeholder="Paste the full job description here..."
                />
              </div>
              <div>
                <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Notes</label>
                <Textarea
                  value={job.notes}
                  onChange={(e) => onUpdate({ notes: e.target.value })}
                  rows={4}
                  className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]"
                />
              </div>
            </>
          )}

          {tab === "contacts" && (
            <>
              {(job.contacts || []).map((c) => (
                <div key={c.id} className="rounded-lg p-3 border" style={{ borderColor: "#E5E0D8", backgroundColor: "#FBF7F0" }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#1B3A2F" }}>{c.name}</p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>{c.role}{c.company ? ` at ${c.company}` : ""}</p>
                      {c.email && <p className="text-xs mt-0.5" style={{ color: "#C9A961" }}>{c.email}</p>}
                      {c.notes && <p className="text-xs mt-1" style={{ color: "#6B7280" }}>{c.notes}</p>}
                    </div>
                    <button onClick={() => removeContact(c.id)} className="p-1" style={{ color: "#9CA3AF" }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {newContact ? (
                <div className="space-y-2 rounded-lg p-3 border" style={{ borderColor: "#C9A961" }}>
                  <Input placeholder="Name *" value={contactDraft.name || ""} onChange={(e) => setContactDraft((d) => ({ ...d, name: e.target.value }))} className="bg-[#FBF7F0] border-[#E5E0D8]" />
                  <Input placeholder="Email" value={contactDraft.email || ""} onChange={(e) => setContactDraft((d) => ({ ...d, email: e.target.value }))} className="bg-[#FBF7F0] border-[#E5E0D8]" />
                  <Input placeholder="Role / Title" value={contactDraft.role || ""} onChange={(e) => setContactDraft((d) => ({ ...d, role: e.target.value }))} className="bg-[#FBF7F0] border-[#E5E0D8]" />
                  <Textarea placeholder="Notes" value={contactDraft.notes || ""} onChange={(e) => setContactDraft((d) => ({ ...d, notes: e.target.value }))} rows={2} className="bg-[#FBF7F0] border-[#E5E0D8]" />
                  <div className="flex gap-2">
                    <button onClick={addContact} className="px-4 py-2 rounded-md text-sm font-medium text-white" style={{ backgroundColor: "#1B3A2F" }}>
                      Add Contact
                    </button>
                    <button onClick={() => { setNewContact(false); setContactDraft({}); }} className="px-4 py-2 rounded-md text-sm" style={{ color: "#6B7280" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setNewContact(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed rounded-lg text-sm transition-colors"
                  style={{ borderColor: "#E5E0D8", color: "#6B7280" }}
                >
                  <Plus className="w-4 h-4" /> Add a contact
                </button>
              )}
            </>
          )}

          {tab === "documents" && (
            <>
              {linkedDocs.length > 0 && (
                <div className="space-y-2">
                  {linkedDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: "#FBF7F0" }}>
                      {doc.type === "resume" ? <FileText className="w-5 h-5" style={{ color: "#C9A961" }} /> : <Mail className="w-5 h-5" style={{ color: "#1B3A2F" }} />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "#1B3A2F" }}>{doc.name}</p>
                        <p className="text-xs" style={{ color: "#9CA3AF" }}>{doc.type === "resume" ? "Resume" : "Cover Letter"}</p>
                      </div>
                      <button
                        onClick={() => {
                          unlinkDocumentFromJob(job.id, doc.id);
                          onUpdate({ linkedDocIds: job.linkedDocIds.filter((i) => i !== doc.id) });
                        }}
                        style={{ color: "#9CA3AF" }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <button
                  onClick={() => setLinkModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed rounded-lg text-sm transition-colors"
                  style={{ borderColor: "#E5E0D8", color: "#6B7280" }}
                >
                  <LinkIcon className="w-4 h-4" /> Link existing document
                </button>
                <button
                  onClick={() => handleCreateTailored("resume")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#FFF3E0", color: "#C9A961" }}
                >
                  <FileText className="w-4 h-4" /> Create tailored resume
                </button>
                <button
                  onClick={() => handleCreateTailored("cover_letter")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#F0F7F4", color: "#1B3A2F" }}
                >
                  <Mail className="w-4 h-4" /> Create tailored cover letter
                </button>
              </div>
              <Dialog open={linkModalOpen} onOpenChange={setLinkModalOpen}>
                <DialogContent className="max-w-sm bg-white">
                  <DialogHeader><DialogTitle style={{ color: "#1B3A2F" }}>Link a document</DialogTitle></DialogHeader>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {unlinkedDocs.length === 0 && <p className="text-sm py-4 text-center" style={{ color: "#9CA3AF" }}>No unlinked documents</p>}
                    {unlinkedDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          linkDocumentToJob(job.id, doc.id);
                          onUpdate({ linkedDocIds: [...job.linkedDocIds, doc.id] });
                          setLinkModalOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#FBF7F0] text-left"
                      >
                        {doc.type === "resume" ? <FileText className="w-4 h-4" style={{ color: "#C9A961" }} /> : <Mail className="w-4 h-4" style={{ color: "#1B3A2F" }} />}
                        <span className="text-sm" style={{ color: "#2C2C2C" }}>{doc.name}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tab === "checklist" && (
            <>
              {checklistItems.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: "#9CA3AF" }}>
                  No checklist items for this stage
                </p>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold" style={{ color: "#1B3A2F" }}>
                      {JOB_STAGES.find((s) => s.id === job.stage)?.label} Steps
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "#FFF3E0", color: "#C9A961" }}>
                      {checklistDone}/{checklistTotal}
                    </span>
                  </div>
                  {checklistItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-[#FBF7F0] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!job.checklist?.[item.id]}
                        onChange={() => toggleChecklist(item.id)}
                        className="w-4 h-4 rounded accent-[#1B3A2F]"
                      />
                      <span
                        className={cn("text-sm", job.checklist?.[item.id] && "line-through")}
                        style={{ color: job.checklist?.[item.id] ? "#9CA3AF" : "#2C2C2C" }}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Kanban Board ── */

interface KanbanProps {
  jobs: JobApplication[];
  documents: SavedDocument[];
  onRefresh: () => void;
}

export default function KanbanBoard({ jobs, documents, onRefresh }: KanbanProps) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  const handleAddJob = (stage: JobStage) => {
    const job = createJob({ stage, title: "New Application" });
    setSelectedJobId(job.id);
    onRefresh();
  };

  const handleUpdateJob = (updates: Partial<JobApplication>) => {
    if (!selectedJobId) return;
    updateJob(selectedJobId, updates);
    onRefresh();
  };

  const handleDeleteJob = () => {
    if (!selectedJobId) return;
    deleteJob(selectedJobId);
    setSelectedJobId(null);
    onRefresh();
  };

  const handleDrop = (targetStage: JobStage) => {
    if (!draggedJobId) return;
    updateJob(draggedJobId, { stage: targetStage });
    draggedJobId = null;
    onRefresh();
  };

  return (
    <>
      <div className="overflow-x-auto -mx-4 sm:-mx-6">
        <div className="flex gap-4 px-4 sm:px-6 pb-4 min-w-max">
          {ACTIVE_STAGES.map((stage) => (
            <StageColumn
              key={stage.id}
              stage={stage}
              jobs={jobs.filter((j) => j.stage === stage.id)}
              onAddJob={() => handleAddJob(stage.id)}
              onSelectJob={(id) => setSelectedJobId(id)}
              onDropJob={handleDrop}
            />
          ))}
        </div>
      </div>
      {selectedJob && (
        <JobDetailPanel
          job={selectedJob}
          onClose={() => setSelectedJobId(null)}
          onUpdate={handleUpdateJob}
          onDelete={handleDeleteJob}
          documents={documents}
        />
      )}
    </>
  );
}
