import { X, CheckCircle2 } from "lucide-react";
import MailerLiteForm from "@/components/MailerLiteForm";

export default function SalaryProofSection() {
  return (
    <>
      {/* Part A — Big Impact Numbers */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#1B3A2F' }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2
            className="font-heading mb-14"
            style={{ color: '#FBF7F0', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}
          >
            The numbers speak for themselves.
          </h2>

          <div className="flex flex-col gap-14">
            {[
              { num: "NT$80M+", desc: "The difference between accepting the first offer and negotiating strategically. Over a 30-year career." },
              { num: "10,000+", desc: "Downloads of free tools, templates, and guides." },
            ].map((stat) => (
              <div key={stat.num} className="flex flex-col items-center">
                <span
                  className="font-heading font-bold mb-2"
                  style={{ color: '#D4930D', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
                >
                  {stat.num}
                </span>
                <div className="w-16 h-[3px] rounded-full mb-4" style={{ backgroundColor: '#D4930D' }} />
                <p className="max-w-md" style={{ color: '#A8B5A9', fontSize: '1.0625rem' }}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part B — Salary Comparison */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#1B3A2F' }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2
              className="font-heading mb-3"
              style={{ color: '#FBF7F0', fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}
            >
              Here's what negotiating looks like.
            </h2>
            <p style={{ color: '#A8B5A9', fontSize: '1rem' }}>
              Same starting salary. Two different strategies. 30 years later:
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Card 1 — Accept First Offer */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <X className="w-5 h-5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <span className="font-bold" style={{ color: '#A8B5A9', fontSize: '1rem' }}>Accept First Offer</span>
              </div>
              <p className="mb-1" style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>15% raise per job change</p>
              <p className="font-bold" style={{ color: '#A8B5A9', fontSize: '1.5rem' }}>NT$73,093,386</p>
              <p style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>total over 30 years</p>
            </div>

            {/* Card 2 — Negotiate Strategically */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: 'rgba(45,58,46,0.5)', border: '2px solid #D4930D' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} />
                <span className="font-bold" style={{ color: '#FBF7F0', fontSize: '1rem' }}>Negotiate Strategically</span>
              </div>
              <p className="mb-1" style={{ color: '#A8B5A9', fontSize: '0.875rem' }}>30% raise per job change</p>
              <p className="font-bold" style={{ color: '#D4930D', fontSize: '1.5rem' }}>NT$153,430,190</p>
              <p style={{ color: '#A8B5A9', fontSize: '0.8125rem' }}>total over 30 years</p>
            </div>
          </div>

          {/* Big Callout */}
          <div className="text-center mb-8">
            <p
              className="font-heading font-bold"
              style={{ color: '#D4930D', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              +NT$80,336,804
            </p>
            <p className="font-semibold mt-1" style={{ color: '#FBF7F0', fontSize: '1.125rem' }}>
              109.9% more over your career.
            </p>
          </div>

          {/* Two stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div
              className="rounded-xl p-5 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-bold mb-1" style={{ color: '#D4930D', fontSize: '1.25rem' }}>NT$223,158</p>
              <p style={{ color: '#A8B5A9', fontSize: '0.8125rem' }}>per month you lose by not negotiating</p>
            </div>
            <div
              className="rounded-xl p-5 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-bold mb-1" style={{ color: '#D4930D', fontSize: '1.25rem' }}>NT$80,336,804</p>
              <p style={{ color: '#A8B5A9', fontSize: '0.8125rem' }}>left on the table over 30 years</p>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-center mb-8" style={{ color: '#6B6B6B', fontSize: '0.75rem' }}>
            Based on NT$1,200,000 starting salary, changing jobs every 3 years.
          </p>

          {/* CTA */}
          <div className="max-w-md mx-auto">
            <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Send Me The Free Toolkit" />
          </div>
        </div>
      </section>
    </>
  );
}
