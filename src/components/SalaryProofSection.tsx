import { X, CheckCircle2 } from "lucide-react";
import MailerLiteForm from "@/components/MailerLiteForm";

export default function SalaryProofSection() {
  return (
    <>
      {/* Part A — Big Impact Numbers */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#2b4734' }}>
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
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#2b4734' }}>
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

          {/* Bar Chart Comparison */}
          <div className="flex justify-center items-end gap-8 md:gap-16 mb-8" style={{ height: '320px' }}>
            {/* Bar 1 — Accept First Offer */}
            <div className="flex flex-col items-center justify-end h-full">
              <p className="font-bold mb-2" style={{ color: '#A8B5A9', fontSize: '1rem' }}>NT$73M</p>
              <div
                className="rounded-t-lg w-20 md:w-28"
                style={{
                  height: '38%',
                  backgroundColor: 'rgba(255,255,255,0.22)',
                  border: '1px solid rgba(255,255,255,0.30)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                }}
              />
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <X className="w-4 h-4" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                  <span className="font-bold" style={{ color: '#E8E8E8', fontSize: '0.875rem' }}>Accept First Offer</span>
                </div>
                <p style={{ color: '#A8B5A9', fontSize: '0.75rem' }}>15% raise per change</p>
              </div>
            </div>

            {/* Bar 2 — Negotiate Strategically */}
            <div className="flex flex-col items-center justify-end h-full">
              <p className="font-bold mb-2" style={{ color: '#D4930D', fontSize: '1rem' }}>NT$153M</p>
              <div
                className="rounded-t-lg w-20 md:w-28"
                style={{
                  height: '100%',
                  background: 'linear-gradient(to top, #D4930D, #E8A82E)',
                  boxShadow: '0 0 20px rgba(212,147,13,0.25)',
                }}
              />
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#4CAF50' }} />
                  <span className="font-bold" style={{ color: '#FBF7F0', fontSize: '0.875rem' }}>Negotiate Strategically</span>
                </div>
                <p style={{ color: '#A8B5A9', fontSize: '0.75rem' }}>30% raise per change</p>
              </div>
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
          <p className="text-center mb-8" style={{ color: '#A8B5A9', fontSize: '0.75rem' }}>
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
