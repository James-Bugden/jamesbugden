import { Calculator, ArrowRightLeft, TrendingUp, BarChart3 } from "lucide-react";

export default function OfferCalculatorCTA() {
  return (
    <section id="calculator" className="py-14 md:py-20 px-4 sm:px-5 md:px-6 bg-card border-y border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
          Got an Offer?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          See your true total compensation.
        </p>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-10 max-w-xl mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
          {/* Icon */}
          <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
            <Calculator className="w-7 h-7 text-gold" />
          </div>

          {/* Value props */}
          <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
            <div className="flex items-start gap-3">
              <ArrowRightLeft className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">Compare your current comp vs your new offer</p>
            </div>
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">See your true Year 1 total comp, including equity, sign-on, and benefits</p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">See what your package is worth over 4 years</p>
            </div>
          </div>

          <a
            href="/offer-calculator"
            className="inline-flex h-12 px-8 items-center justify-center rounded-lg btn-gold text-base font-semibold"
          >
            Calculate My Offer
          </a>

          <p className="text-xs text-muted-foreground/70 mt-3 max-w-sm mx-auto">
            Free tool · Built by a recruiter who's negotiated 100+ foreign company offers in Taiwan
          </p>
        </div>
      </div>
    </section>
  );
}
