import { useState, useMemo } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  JobApplication, JobStage, ACTIVE_STAGES, JOB_STAGES,
  updateJob,
} from "@/lib/jobStore";
import ExcitementStars from "./ExcitementStars";

type SortKey = "title" | "company" | "minSalary" | "maxSalary" | "location" | "stage" | "dateSaved" | "dateApplied" | "excitement" | "deadline" | "followUpDate";
type SortDir = "asc" | "desc";

interface Props {
  jobs: JobApplication[];
  onSelectJob: (id: string) => void;
  onRefresh: () => void;
}

export default function TableView({ jobs, onSelectJob, onRefresh }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("dateSaved");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [stageFilter, setStageFilter] = useState<JobStage | null>(null);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filteredJobs = useMemo(() => {
    let list = stageFilter ? jobs.filter((j) => j.stage === stageFilter) : jobs;
    return [...list].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = (a as any)[sortKey] ?? "";
      const bv = (b as any)[sortKey] ?? "";
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [jobs, sortKey, sortDir, stageFilter]);

  const handleStageChange = (jobId: string, stage: JobStage) => {
    updateJob(jobId, { stage });
    onRefresh();
  };

  const handleExcitementChange = (jobId: string, excitement: number) => {
    updateJob(jobId, { excitement });
    onRefresh();
  };

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";

  // Stage funnel bar (like Teal)
  const stageCounts = ACTIVE_STAGES.map((s) => ({
    ...s,
    count: jobs.filter((j) => j.stage === s.id).length,
  }));

  return (
    <div>
      {/* Stage funnel */}
      <div className="flex mb-4 rounded-lg overflow-hidden border" style={{ borderColor: "#E5E0D8" }}>
        {stageCounts.map((s, i) => {
          const active = stageFilter === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStageFilter(active ? null : s.id)}
              className="flex-1 py-2.5 text-center transition-all relative"
              style={{
                backgroundColor: active ? s.color : "#FFFFFF",
                color: active ? "#FFFFFF" : "#2C2C2C",
              }}
            >
              <span className="text-lg font-bold block">{s.count}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wide font-medium">
                {s.label}
              </span>
              {/* Arrow connector */}
              {i < stageCounts.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <ChevronDown className="w-4 h-4 -rotate-90" style={{ color: "#E5E0D8" }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {stageFilter && (
        <div className="mb-3 text-sm" style={{ color: "#6B7280" }}>
          Showing: <span className="font-semibold" style={{ color: "#1B3A2F" }}>
            {ACTIVE_STAGES.find((s) => s.id === stageFilter)?.label}
          </span>
          {" · "}
          <button onClick={() => setStageFilter(null)} className="underline hover:opacity-80" style={{ color: "#C9A961" }}>
            Show all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#E5E0D8" }}>
        <table className="w-full text-sm" style={{ minWidth: 900 }}>
          <thead>
            <tr style={{ backgroundColor: "#F5F0E8" }}>
              {([
                ["title", "Job Position"],
                ["company", "Company"],
                ["minSalary", "Min Salary"],
                ["maxSalary", "Max Salary"],
                ["location", "Location"],
                ["stage", "Status"],
                ["dateSaved", "Date Saved"],
                ["dateApplied", "Date Applied"],
                ["followUpDate", "Follow-up"],
                ["deadline", "Deadline"],
                ["excitement", "Excitement"],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th
                  key={key}
                  className="px-3 py-2.5 text-left font-semibold cursor-pointer select-none whitespace-nowrap"
                  style={{ color: "#1B3A2F" }}
                  onClick={() => toggleSort(key)}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    <ArrowUpDown className="w-3 h-3" style={{ color: sortKey === key ? "#C9A961" : "#9CA3AF" }} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center py-8" style={{ color: "#9CA3AF" }}>
                  No jobs to display
                </td>
              </tr>
            )}
            {filteredJobs.map((job) => {
              const stageInfo = JOB_STAGES.find((s) => s.id === job.stage);
              return (
                <tr
                  key={job.id}
                  className="border-t cursor-pointer hover:bg-[#FBF7F0] transition-colors"
                  style={{ borderColor: "#E5E0D8" }}
                  onClick={() => onSelectJob(job.id)}
                >
                  <td className="px-3 py-2.5 font-medium" style={{ color: "#1B3A2F" }}>
                    {job.title || "Untitled"}
                  </td>
                  <td className="px-3 py-2.5" style={{ color: "#2C2C2C" }}>{job.company}</td>
                  <td className="px-3 py-2.5" style={{ color: "#2C2C2C" }}>{job.minSalary || "—"}</td>
                  <td className="px-3 py-2.5" style={{ color: "#2C2C2C" }}>{job.maxSalary || "—"}</td>
                  <td className="px-3 py-2.5" style={{ color: "#2C2C2C" }}>{job.location || "—"}</td>
                  <td className="px-3 py-2.5">
                    <select
                      value={job.stage}
                      onChange={(e) => { e.stopPropagation(); handleStageChange(job.id, e.target.value as JobStage); }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs px-2 py-1 rounded-md border font-medium"
                      style={{ borderColor: "#E5E0D8", color: stageInfo?.color, backgroundColor: "#FBF7F0" }}
                    >
                      {JOB_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: "#6B7280" }}>{fmtDate(job.dateSaved)}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: "#6B7280" }}>{fmtDate(job.dateApplied)}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: "#6B7280" }}>{fmtDate(job.followUpDate)}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: "#6B7280" }}>{fmtDate(job.deadline)}</td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <ExcitementStars
                      value={job.excitement}
                      onChange={(v) => handleExcitementChange(job.id, v)}
                      size={14}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
