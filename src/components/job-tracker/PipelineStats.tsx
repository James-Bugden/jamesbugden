import { JobApplication, ACTIVE_STAGES } from "@/lib/jobStore";

interface Props {
  jobs: JobApplication[];
  weekRange: string;
}

export default function PipelineStats({ jobs, weekRange }: Props) {
  const total = jobs.length || 1;

  return (
    <div className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "#E5E0D8", backgroundColor: "#FFFFFF" }}>
      <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
        Job Search Pipeline
      </h2>
      <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
        Displaying results: {weekRange}
      </p>

      <div className="mt-6 space-y-4">
        {ACTIVE_STAGES.map((stage) => {
          const count = jobs.filter((j) => j.stage === stage.id).length;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={stage.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: "#2C2C2C" }}>{stage.label}</span>
                <span className="text-sm font-bold" style={{ color: "#1B3A2F" }}>{count}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#FFF3E0", color: "#C9A961" }}
                >
                  {pct}%
                </span>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "#E5E0D8" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: stage.color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
