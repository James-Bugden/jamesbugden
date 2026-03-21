import { Users } from "lucide-react";

export default function ReadinessAssessment() {
  return (
    <section id="assessment" className="py-14 md:py-20 px-4 sm:px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
          Are You Ready for a Foreign Company?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-10">
          Take the free 2-minute assessment and find out where you stand.
        </p>

        {/* Card */}
        <div className="bg-background border border-border rounded-2xl p-6 sm:p-8 md:p-10 max-w-xl mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
          {/* Score ring (decorative) */}
          <div className="mx-auto w-28 h-28 mb-6 relative">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 52 * 0.75} ${2 * Math.PI * 52 * 0.25}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold text-foreground">
              ?
            </span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
            Rate your readiness across 5 key areas: English proficiency, resume format, interview preparation, cultural fit, and compensation knowledge. Get a personalized action plan based on your score.
          </p>

          <a
            href="/quiz"
            className="inline-flex h-12 px-8 items-center justify-center rounded-lg btn-gold text-base font-semibold"
          >
            Take the Assessment
          </a>

          <p className="text-xs text-muted-foreground/70 mt-3">
            Free · 2 minutes
          </p>

        </div>
      </div>
    </section>
  );
}
