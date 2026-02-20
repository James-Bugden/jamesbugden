import { JobApplication } from "@/lib/jobStore";
import { Plus, ArrowRight, Clock, Send } from "lucide-react";

interface Props {
  jobs: JobApplication[];
  onSwitchToBoard: () => void;
}

interface Priority {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: () => void;
}

export default function PrioritiesSection({ jobs, onSwitchToBoard }: Props) {
  const priorities: Priority[] = [];

  const bookmarked = jobs.filter((j) => j.stage === "wishlist");
  const applied = jobs.filter((j) => j.stage === "applied");
  const interviewing = jobs.filter((j) => j.stage === "interview");

  if (jobs.length === 0) {
    priorities.push({
      icon: <Plus className="w-5 h-5" />,
      title: "Add Your First Job",
      description: "Start tracking by adding a job to your board.",
      action: onSwitchToBoard,
    });
  }

  if (bookmarked.length > 0) {
    priorities.push({
      icon: <Send className="w-5 h-5" />,
      title: `Apply to Bookmarked Jobs (${bookmarked.length})`,
      description: "Move bookmarked jobs to 'Applied' after submitting.",
      action: onSwitchToBoard,
    });
  }

  if (applied.length > 0) {
    const stale = applied.filter((j) => {
      if (!j.appliedAt) return false;
      const daysSince = (Date.now() - new Date(j.appliedAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSince > 7;
    });
    if (stale.length > 0) {
      priorities.push({
        icon: <Clock className="w-5 h-5" />,
        title: `Follow Up on ${stale.length} Application${stale.length > 1 ? "s" : ""}`,
        description: "These applications are over a week old with no update.",
        action: onSwitchToBoard,
      });
    }
  }

  if (interviewing.length > 0) {
    priorities.push({
      icon: <ArrowRight className="w-5 h-5" />,
      title: `Prepare for ${interviewing.length} Interview${interviewing.length > 1 ? "s" : ""}`,
      description: "Review job details and prepare for upcoming interviews.",
      action: onSwitchToBoard,
    });
  }

  if (jobs.length > 0 && jobs.length < 5) {
    priorities.push({
      icon: <Plus className="w-5 h-5" />,
      title: "Add More Jobs to Tracker",
      description: "Aim for at least 5 active jobs in your pipeline.",
      action: onSwitchToBoard,
    });
  }

  if (priorities.length === 0) {
    priorities.push({
      icon: <ArrowRight className="w-5 h-5" />,
      title: "You're On Track!",
      description: "Keep applying and following up on your applications.",
    });
  }

  return (
    <div className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "#E5E0D8", backgroundColor: "#FFFFFF" }}>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
        Priorities
      </h2>
      <div className="h-[3px] rounded-full mb-5" style={{ backgroundColor: "#C9A961", width: 60 }} />

      <div className="space-y-4">
        {priorities.map((p, i) => (
          <button
            key={i}
            onClick={p.action}
            className="w-full flex items-start gap-4 text-left group"
            disabled={!p.action}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: "#1B3A2F" }}
            >
              {p.icon}
            </div>
            <div>
              <p className="text-sm font-semibold group-hover:underline" style={{ color: "#1B3A2F" }}>
                {p.title}
              </p>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                {p.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
