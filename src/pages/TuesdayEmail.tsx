import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/SiteHeader";
import TuesdayEmailForm from "@/components/TuesdayEmailForm";

export default function TuesdayEmail() {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Tuesday Job Market Intel — James Bugden"
        description="Weekly Taiwan job market briefing. One short email every Tuesday — signal, not noise."
        noIndex={false}
      />

      <SiteHeader variant="light" lang="en" />

      <main>
        <section className="py-14 md:py-24 px-5 md:px-6 bg-paper">
          <div className="container mx-auto max-w-xl">
            <h1
              className="font-heading text-foreground tracking-[-0.025em] mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Tuesday Job Market Intel
            </h1>
            <p className="text-lg text-foreground/80 mb-3 leading-relaxed">
              A short weekly briefing on the Taiwan job market — what's hiring,
              what's slowing down, and what recruiters are actually looking for
              this week.
            </p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              One email every Tuesday. Signal, not noise. Unsubscribe anytime.
            </p>

            <TuesdayEmailForm />

            <p className="text-xs text-muted-foreground/80 mt-4 text-center">
              No spam. No upsells. Just the briefing.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
