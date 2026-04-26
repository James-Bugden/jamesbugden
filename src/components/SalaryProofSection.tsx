import { X, CheckCircle2 } from "lucide-react";
import MailerLiteForm from "@/components/MailerLiteForm";
import { CoinStackIcon, DownloadCloudIcon } from "@/assets/illustrations/HiresignIcons";

export default function SalaryProofSection() {
  return (
    <>
      {/* Part A, Big Impact Numbers */}
      <section className="py-16 md:py-24 px-4 sm:px-5 md:px-6 bg-paper-alt">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: 'hsl(var(--gold))',
              }}
            >
              The proof
            </p>
            <h2
              className="font-heading tracking-[-0.025em] text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              The numbers speak for themselves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { Icon: CoinStackIcon, num: "NT$80M+", desc: "The difference between accepting the first offer and negotiating strategically. Over a 30-year career." },
              { Icon: DownloadCloudIcon, num: "10,000+", desc: "Downloads of free tools, templates, and guides." },
            ].map(({ Icon, num, desc }) => (
              <div key={num} className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <Icon size={56} />
                </div>
                <div className="mb-2">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
                    {num}
                  </span>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part B, Salary Comparison */}
      <section className="pb-16 md:pb-24 px-4 sm:px-5 md:px-6 bg-paper-alt">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: 'hsl(var(--gold))',
              }}
            >
              Compounding effect
            </p>
            <h2
              className="font-heading tracking-[-0.025em] text-foreground mb-3"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              Here's what negotiating looks like
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: '1rem' }}>
              Same starting salary. Two different strategies. 30 years later:
            </p>
          </div>

          {/* Bar Chart Comparison */}
          <div className="card-hairline p-6 md:p-10 mb-6 bg-card">
            <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-sm md:max-w-md mx-auto">
              {/* Bar 1, Accept First Offer */}
              <div className="flex flex-col items-center">
                <p className="tnum-geist mb-3 text-muted-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>NT$73M</p>
                <div className="flex items-end w-full justify-center" style={{ height: '260px' }}>
                  <div
                    className="rounded-t-md w-16 md:w-20"
                    style={{
                      height: '38%',
                      background: 'hsl(var(--executive-green) / 0.10)',
                      border: '1px solid hsl(var(--executive-green) / 0.25)',
                      borderBottom: 'none',
                    }}
                  />
                </div>
                <div className="mt-5 text-center w-full">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <X className="w-4 h-4 text-destructive flex-shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-foreground leading-tight" style={{ fontSize: '0.8125rem' }}>Accept First Offer</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>15% raise per change</p>
                </div>
              </div>

              {/* Bar 2, Negotiate Strategically */}
              <div className="flex flex-col items-center">
                <p className="tnum-geist mb-3" style={{ fontSize: '1rem', fontWeight: 700, color: 'hsl(var(--gold))' }}>NT$153M</p>
                <div className="flex items-end w-full justify-center" style={{ height: '260px' }}>
                  <div
                    className="rounded-t-md w-16 md:w-20"
                    style={{
                      height: '100%',
                      background: 'linear-gradient(to top, hsl(var(--gold)), hsl(var(--gold) / 0.85))',
                      border: '1px solid hsl(var(--gold))',
                      borderBottom: 'none',
                      boxShadow: '0 4px 24px hsl(var(--gold) / 0.18)',
                    }}
                  />
                </div>
                <div className="mt-5 text-center w-full">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-executive-green flex-shrink-0" strokeWidth={2.25} />
                    <span className="font-semibold text-foreground leading-tight" style={{ fontSize: '0.8125rem' }}>Negotiate Strategically</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>30% raise per change</p>
                </div>
              </div>
            </div>
          </div>

          {/* Big Callout, refined */}
          <div className="text-center mb-8 py-6">
            <p
              className="font-heading tnum-geist"
              style={{
                color: 'hsl(var(--gold))',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              +NT$80,336,804
            </p>
            <p className="font-heading mt-3 text-foreground" style={{ fontSize: '1.0625rem', fontWeight: 500 }}>
              <span className="tnum">109.9%</span> more over your career.
            </p>
          </div>

          {/* Two stat cards, hairline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            <div className="card-hairline p-5 text-center">
              <p className="tnum-geist mb-1" style={{ color: 'hsl(var(--gold))', fontSize: '1.25rem', fontWeight: 700 }}>NT$223,158</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>per month you lose by not negotiating</p>
            </div>
            <div className="card-hairline p-5 text-center">
              <p className="tnum-geist mb-1" style={{ color: 'hsl(var(--gold))', fontSize: '1.25rem', fontWeight: 700 }}>NT$80,336,804</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>left on the table over 30 years</p>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-center mb-8 text-muted-foreground" style={{ fontSize: '0.75rem' }}>
            Based on NT$1,200,000 starting salary, changing jobs every 3 years.
          </p>

          {/* CTA */}
          <div className="max-w-md mx-auto">
            <MailerLiteForm formId="sM1X80" className="ml-embedded ml-inline" buttonText="Send Me The Free Toolkit" />
          </div>
        </div>
      </section>
    </>
  );
}
