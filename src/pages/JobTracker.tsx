import { useState, useEffect, useCallback } from "react";
import { LayoutDashboard, Columns3, ArrowLeft } from "lucide-react";
import {
  JobApplication,
  getAllJobs, getWeeklyGoal, setWeeklyGoal, getWeeklyAppliedCount, getWeekRange,
} from "@/lib/jobStore";
import { SavedDocument, getAllDocuments } from "@/lib/documentStore";
import { useNavigate } from "react-router-dom";
import WeeklyGoalRing from "@/components/job-tracker/WeeklyGoalRing";
import PipelineStats from "@/components/job-tracker/PipelineStats";
import PrioritiesSection from "@/components/job-tracker/PrioritiesSection";
import KanbanBoard from "@/components/job-tracker/KanbanBoard";

type View = "dashboard" | "board";

const TABS: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "board", label: "Board", icon: Columns3 },
];

export default function JobTracker() {
  const [view, setView] = useState<View>("dashboard");
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [goal, setGoal] = useState(5);
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    setJobs(getAllJobs());
    setDocuments(getAllDocuments());
    setGoal(getWeeklyGoal());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const weeklyApplied = getWeeklyAppliedCount();
  const weekRange = getWeekRange();

  const handleGoalChange = (g: number) => {
    setWeeklyGoal(g);
    setGoal(g);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF7F0" }}>
      {/* Header */}
      <header className="px-4 sm:px-6 pt-6 pb-4 max-w-5xl mx-auto">
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
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
        ) : (
          <div className="animate-fade-in">
            <KanbanBoard jobs={jobs} documents={documents} onRefresh={refresh} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 pt-4">
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
