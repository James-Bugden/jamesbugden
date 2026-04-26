import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LayoutDashboard, Table2, Columns3, Star, Users, CheckSquare, Download, X } from "lucide-react";

const STEPS = [
  {
    icon: LayoutDashboard,
    title: "Your Job Search HQ",
    description:
      "Track every application in one place. Set a weekly goal, monitor your pipeline, and get smart priorities to keep your search on track.",
  },
  {
    icon: Table2,
    title: "Tracker View",
    description:
      "See all your jobs in a sortable table. Filter by stage using the funnel bar at the top. Click any row to open the full detail panel.",
  },
  {
    icon: Columns3,
    title: "Board View",
    description:
      "Drag and drop jobs between stages, from Bookmarked all the way to Accepted. Click a card to edit details, add contacts, or link documents.",
  },
  {
    icon: Star,
    title: "Rate & Prioritise",
    description:
      "Give each job an excitement rating (1–5 stars) so you can focus on the roles you care about most. Add salary ranges, deadlines, and follow-up dates.",
  },
  {
    icon: Users,
    title: "Contacts & Checklist",
    description:
      "Track networking contacts per job. Each stage has a guided checklist, like finding a referral, tailoring your resume, or preparing for interviews.",
  },
  {
    icon: Download,
    title: "Export Anytime",
    description:
      "Download your full tracker as a CSV from the ⋮ menu. You can also show or hide archived jobs (Withdrawn, Not Selected, No Response).",
  },
];

const STORAGE_KEY = "james_careers_job_tracker_onboarded";

export default function OnboardingModal() {
  const [open, setOpen] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const [step, setStep] = useState(0);

  const handleClose = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-2xl bg-white">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 p-1.5 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
          style={{ color: "#9CA3AF" }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Illustration area */}
        <div
          className="flex items-center justify-center py-10"
          style={{ backgroundColor: "#1B3A2F" }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(201,169,97,0.15)" }}
          >
            <Icon className="w-10 h-10" style={{ color: "#C9A961" }} />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-5 pb-6">
          <h2
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}
          >
            {current.title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
            {current.description}
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: i === step ? "#C9A961" : "#E5E0D8",
                  width: i === step ? 20 : 8,
                }}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleClose}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#9CA3AF" }}
            >
              Skip
            </button>
            <button
              onClick={() => (isLast ? handleClose() : setStep(step + 1))}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1B3A2F" }}
            >
              {isLast ? "Get Started" : "Next"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
