import { useState, useEffect, useCallback } from "react";
import { LayoutDashboard, Columns3, Table2, ArrowLeft, Download, Archive, Plus, MoreVertical } from "lucide-react";
import {
  JobApplication, JobStage,
  getAllJobs, getActiveJobs, getArchivedJobs,
  getWeeklyGoal, setWeeklyGoal, getWeeklyAppliedCount, getWeekRange,
  createJob, updateJob, deleteJob, downloadCSV,
} from "@/lib/jobStore";
import { SavedDocument, getAllDocuments } from "@/lib/documentStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WeeklyGoalRing from "@/components/job-tracker/WeeklyGoalRing";
import PipelineStats from "@/components/job-tracker/PipelineStats";
import PrioritiesSection from "@/components/job-tracker/PrioritiesSection";
import KanbanBoard, { JobDetailPanel } from "@/components/job-tracker/KanbanBoard";
import TableView from "@/components/job-tracker/TableView";
import OnboardingModal from "@/components/job-tracker/OnboardingModal";

type View = "dashboard" | "board" | "table";

const TABS: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "table", label: "Tracker", icon: Table2 },
  { id: "board", label: "Board", icon: Columns3 },
];

export default function JobTracker() {
  const [view, setView] = useState<View>("dashboard");
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [allJobs, setAllJobs] = useState<JobApplication[]>([]);
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [goal, setGoal] = useState(5);
  const [showArchived, setShowArchived] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    setAllJobs(getAllJobs());
    setJobs(getActiveJobs());
    setDocuments(getAllDocuments());
    setGoal(getWeeklyGoal());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const weeklyApplied = getWeeklyAppliedCount();
  const weekRange = getWeekRange();
  const archivedJobs = getArchivedJobs();
  const selectedJob = (showArchived ? allJobs : jobs).find((j) => j.id === selectedJobId) || allJobs.find((j) => j.id === selectedJobId);

  const handleGoalChange = (g: number) => {
    setWeeklyGoal(g);
    setGoal(g);
  };

  const handleAddJob = () => {
    createJob({ title: "New Application" });
    refresh();
    if (view === "dashboard") setView("table");
  };

  const handleExportCSV = () => {
    downloadCSV();
    toast.success("CSV downloaded ✓");
    setMenuOpen(false);
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
    <div className="min-h-screen" style={{ backgroundColor: "#FBF7F0" }}>
      <OnboardingModal />
      {/* Header */}
      <header className="px-4 sm:px-6 pt-6 pb-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/resume")}
              className="p-2 rounded-lg transition-colors hover:bg-[#E5E0D8]"
              aria-label="Back to documents"
            >
              <ArrowLeft className="w-5 h-5" style={{ color: "#1B3A2F" }} />
            </button>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}
            >
              Job Tracker
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddJob}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1B3A2F" }}
            >
              <Plus className="w-4 h-4" /> Add Job
            </button>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg transition-colors hover:bg-[#E5E0D8]"
              >
                <MoreVertical className="w-5 h-5" style={{ color: "#1B3A2F" }} />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-1 w-48 rounded-lg shadow-lg border z-50 py-1" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E0D8" }}>
                    <button
                      onClick={handleExportCSV}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#FBF7F0] transition-colors text-left"
                      style={{ color: "#2C2C2C" }}
                    >
                      <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button
                      onClick={() => { setShowArchived(!showArchived); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#FBF7F0] transition-colors text-left"
                      style={{ color: "#2C2C2C" }}
                    >
                      <Archive className="w-4 h-4" />
                      {showArchived ? "Hide" : "Show"} Archived ({archivedJobs.length})
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="mt-4 flex border-b" style={{ borderColor: "#E5E0D8" }}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = view === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative"
                style={{ color: active ? "#C9A961" : "#6B7280" }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full"
                    style={{ backgroundColor: "#C9A961" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        {view === "dashboard" ? (
          <div className="space-y-6 animate-fade-in">
            <WeeklyGoalRing
              applied={weeklyApplied}
              goal={goal}
              onGoalChange={handleGoalChange}
              weekRange={weekRange}
            />
            <PipelineStats jobs={jobs} weekRange={weekRange} />
            <PrioritiesSection jobs={jobs} onSwitchToBoard={() => setView("board")} />
          </div>
        ) : view === "table" ? (
          <div className="animate-fade-in">
            <TableView
              jobs={showArchived ? allJobs : jobs}
              onSelectJob={setSelectedJobId}
              onRefresh={refresh}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <KanbanBoard jobs={jobs} documents={documents} onRefresh={refresh} />
          </div>
        )}
      </main>

      {/* Table view detail panel */}
      {view === "table" && selectedJob && (
        <JobDetailPanel
          job={selectedJob}
          onClose={() => setSelectedJobId(null)}
          onUpdate={handleUpdateJob}
          onDelete={handleDeleteJob}
          documents={documents}
        />
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 pt-4">
        <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
          Built by{" "}
          <a href="/" className="underline hover:opacity-80" style={{ color: "#C9A961" }}>
            james.careers
          </a>
        </p>
      </footer>
    </div>
  );
}
