import { useState, useRef } from "react";
import { Plus, Trash2, X, ExternalLink, FileText, Mail, Link as LinkIcon } from "lucide-react";
import {
  JobApplication, JobStage, JOB_STAGES,
  createJob, updateJob, deleteJob, linkDocumentToJob, unlinkDocumentFromJob,
} from "@/lib/jobStore";
import { SavedDocument, createDocument } from "@/lib/documentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ── Drag context ── */
let draggedJobId: string | null = null;

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
      {job.salary && <p className="text-xs mt-1" style={{ color: "#C9A961" }}>{job.salary}</p>}
      <p className="text-[10px] mt-1" style={{ color: "#9CA3AF" }}>
        {new Date(job.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
      </p>
    </div>
  );
}

function StageColumn({ stage, jobs, onAddJob, onSelectJob, onDropJob }: {
  stage: typeof JOB_STAGES[number];
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

function JobDetailPanel({
  job, onClose, onUpdate, onDelete, documents,
}: {
  job: JobApplication;
  onClose: () => void;
  onUpdate: (updates: Partial<JobApplication>) => void;
  onDelete: () => void;
  documents: SavedDocument[];
}) {
  const [tab, setTab] = useState<"details" | "documents">("details");
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const linkedDocs = documents.filter((d) => job.linkedDocIds.includes(d.id));
  const unlinkedDocs = documents.filter((d) => !job.linkedDocIds.includes(d.id));

  const handleCreateTailored = (type: "resume" | "cover_letter") => {
    const name = `${job.company ? job.company + " - " : ""}${job.title || "Job"} ${type === "resume" ? "Resume" : "Cover Letter"}`;
    const doc = createDocument(type, name);
    linkDocumentToJob(job.id, doc.id);
    onUpdate({ linkedDocIds: [...job.linkedDocIds, doc.id] });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-lg shadow-2xl border-l flex flex-col h-full" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E0D8" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#E5E0D8" }}>
          <h2 className="font-bold truncate" style={{ color: "#1B3A2F" }}>{job.title || "Untitled Job"}</h2>
          <div className="flex items-center gap-2">
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50" style={{ color: "#9CA3AF" }}>
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F0E8]" style={{ color: "#9CA3AF" }}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex border-b px-5" style={{ borderColor: "#E5E0D8" }}>
          {(["details", "documents"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn("px-4 py-2.5 text-sm font-medium border-b-2 transition-colors")}
              style={{
                borderColor: tab === t ? "#C9A961" : "transparent",
                color: tab === t ? "#C9A961" : "#6B7280",
              }}
            >
              {t === "details" ? "Details" : `Documents (${linkedDocs.length})`}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === "details" ? (
            <>
              {[
                ["title", "Job Title"],
                ["company", "Company"],
                ["location", "Location"],
                ["salary", "Salary"],
                ["url", "URL"],
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
              <div>
                <label className="text-xs font-semibold" style={{ color: "#6B7280" }}>Stage</label>
                <select
                  value={job.stage}
                  onChange={(e) => onUpdate({ stage: e.target.value as JobStage })}
                  className="w-full mt-1 px-3 py-2 rounded-lg text-sm border bg-[#FBF7F0]"
                  style={{ borderColor: "#E5E0D8" }}
                >
                  {JOB_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
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
          ) : (
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
        </div>
      </div>
    </div>
  );
}

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
          {JOB_STAGES.map((stage) => (
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
