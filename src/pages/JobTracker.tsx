import { useState, useEffect, useCallback } from "react";
import {
  Plus, MoreVertical, Trash2, ExternalLink, FileText, Mail,
  Copy, Pencil, Link as LinkIcon, X, ChevronDown,
} from "lucide-react";
import {
  JobApplication, JobStage, JOB_STAGES,
  getAllJobs, createJob, updateJob, deleteJob, linkDocumentToJob, unlinkDocumentFromJob,
} from "@/lib/jobStore";
import { SavedDocument, getAllDocuments, createDocument, duplicateDocument } from "@/lib/documentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function JobCard({ job, onClick }: { job: JobApplication; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      <p className="text-sm font-semibold text-gray-900 truncate">{job.title || "Untitled"}</p>
      <p className="text-xs text-gray-500 truncate">{job.company}</p>
      {job.salary && <p className="text-xs text-green-600 mt-1">{job.salary}</p>}
      <p className="text-[10px] text-gray-400 mt-1">
        {new Date(job.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
      </p>
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
  const navigate = useNavigate();

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
      <div className="w-full max-w-lg bg-white shadow-2xl border-l border-gray-200 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 truncate">{job.title || "Untitled Job"}</h2>
          <div className="flex items-center gap-2">
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-5">
          {(["details", "documents"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                tab === t ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {t === "details" ? "Details" : `Documents (${linkedDocs.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === "details" ? (
            <>
              <div>
                <label className="text-xs font-semibold text-gray-600">Job Title</label>
                <Input value={job.title} onChange={(e) => onUpdate({ title: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Company</label>
                <Input value={job.company} onChange={(e) => onUpdate({ company: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Location</label>
                <Input value={job.location} onChange={(e) => onUpdate({ location: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Salary</label>
                <Input value={job.salary} onChange={(e) => onUpdate({ salary: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">URL</label>
                <Input value={job.url} onChange={(e) => onUpdate({ url: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Stage</label>
                <select
                  value={job.stage}
                  onChange={(e) => onUpdate({ stage: e.target.value as JobStage })}
                  className="w-full mt-1 px-3 py-2 rounded-lg text-sm border border-gray-200"
                >
                  {JOB_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Notes</label>
                <Textarea value={job.notes} onChange={(e) => onUpdate({ notes: e.target.value })} rows={4} className="mt-1" />
              </div>
            </>
          ) : (
            <>
              {/* Linked docs */}
              {linkedDocs.length > 0 && (
                <div className="space-y-2">
                  {linkedDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      {doc.type === "resume" ? <FileText className="w-5 h-5 text-pink-500" /> : <Mail className="w-5 h-5 text-purple-500" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400">{doc.type === "resume" ? "Resume" : "Cover Letter"}</p>
                      </div>
                      <button
                        onClick={() => {
                          unlinkDocumentFromJob(job.id, doc.id);
                          onUpdate({ linkedDocIds: job.linkedDocIds.filter((i) => i !== doc.id) });
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setLinkModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-purple-300 hover:text-purple-500 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" /> Link existing document
                </button>
                <button
                  onClick={() => handleCreateTailored("resume")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-pink-50 rounded-lg text-sm font-medium text-pink-600 hover:bg-pink-100 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Create tailored resume
                </button>
                <button
                  onClick={() => handleCreateTailored("cover_letter")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-50 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Create tailored cover letter
                </button>
              </div>

              {/* Link modal */}
              <Dialog open={linkModalOpen} onOpenChange={setLinkModalOpen}>
                <DialogContent className="max-w-sm">
                  <DialogHeader><DialogTitle>Link a document</DialogTitle></DialogHeader>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {unlinkedDocs.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">No unlinked documents</p>}
                    {unlinkedDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          linkDocumentToJob(job.id, doc.id);
                          onUpdate({ linkedDocIds: [...job.linkedDocIds, doc.id] });
                          setLinkModalOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                      >
                        {doc.type === "resume" ? <FileText className="w-4 h-4 text-pink-500" /> : <Mail className="w-4 h-4 text-purple-500" />}
                        <span className="text-sm text-gray-700">{doc.name}</span>
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

export default function JobTracker() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    setJobs(getAllJobs());
    setDocuments(getAllDocuments());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  const handleAddJob = (stage: JobStage) => {
    const job = createJob({ stage, title: "New Application" });
    setSelectedJobId(job.id);
    refresh();
  };

  const handleUpdateJob = (updates: Partial<JobApplication>) => {
    if (!selectedJobId) return;
    updateJob(selectedJobId, updates);
    refresh();
  };

  const handleDeleteJob = () => {
    if (!selectedJobId) return;
    deleteJob(selectedJobId);
    setSelectedJobId(null);
    refresh();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/resume")} className="text-sm text-gray-500 hover:text-gray-700">← Documents</button>
          <h1 className="text-lg font-bold text-gray-900">Job Tracker</h1>
        </div>
      </div>

      {/* Kanban */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 p-6 min-w-max h-full">
          {JOB_STAGES.map((stage) => {
            const stageJobs = jobs.filter((j) => j.stage === stage.id);
            return (
              <div key={stage.id} className="w-72 flex flex-col flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                    <h3 className="text-sm font-bold text-gray-700">{stage.label}</h3>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{stageJobs.length}</span>
                  </div>
                  <button onClick={() => handleAddJob(stage.id)} className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto">
                  {stageJobs.map((job) => (
                    <JobCard key={job.id} job={job} onClick={() => setSelectedJobId(job.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {selectedJob && (
        <JobDetailPanel
          job={selectedJob}
          onClose={() => setSelectedJobId(null)}
          onUpdate={handleUpdateJob}
          onDelete={handleDeleteJob}
          documents={documents}
        />
      )}
    </div>
  );
}
