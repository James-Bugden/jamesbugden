import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  applied: number;
  goal: number;
  onGoalChange: (g: number) => void;
  weekRange: string;
}

export default function WeeklyGoalRing({ applied, goal, onGoalChange, weekRange }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(goal));

  const size = 180;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(applied / Math.max(goal, 1), 1);
  const offset = circ * (1 - pct);

  const saveGoal = () => {
    const n = parseInt(draft, 10);
    if (n > 0) onGoalChange(n);
    setEditing(false);
  };

  return (
    <div className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "#E5E0D8", backgroundColor: "#FFFFFF" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
          Job Applications
        </h2>
        <button
          onClick={() => { setDraft(String(goal)); setEditing(true); }}
          className="p-1.5 rounded-lg transition-colors hover:bg-[#F5F0E8]"
          aria-label="Edit weekly goal"
        >
          <Pencil className="w-4 h-4" style={{ color: "#C9A961" }} />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E0D8" strokeWidth={stroke} />
            <circle
              cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke="#C9A961"
              strokeWidth={stroke}
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold" style={{ color: "#1B3A2F" }}>{applied}</span>
            <span className="text-sm" style={{ color: "#6B7280" }}>applications<br className="sm:hidden" /> sent</span>
          </div>
        </div>

        {editing ? (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: "#2C2C2C" }}>Goal:</span>
            <Input
              type="number"
              min={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-20 h-8 text-center text-sm bg-[#FBF7F0] border-[#E5E0D8]"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && saveGoal()}
            />
            <button onClick={saveGoal} className="p-1.5 rounded-lg hover:bg-[#F5F0E8]">
              <Check className="w-4 h-4" style={{ color: "#1B3A2F" }} />
            </button>
          </div>
        ) : (
          <div className="mt-4 px-4 py-1.5 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "#1B3A2F" }}>
            Goal: {goal}
          </div>
        )}

        <p className="mt-3 text-xs text-center" style={{ color: "#9CA3AF" }}>
          Move jobs to "Applied" to track your weekly progress
        </p>
        <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{weekRange}</p>
      </div>
    </div>
  );
}
