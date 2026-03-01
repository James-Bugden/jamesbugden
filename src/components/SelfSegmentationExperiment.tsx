import { FileUp, Search, Trophy } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: FileUp,
    headline: "Upload Your Resume",
    subtext: "Put your resume in the free AI Analyzer. See what recruiters see in 60 seconds.",
  },
  {
    num: 2,
    icon: Search,
    headline: "Get Your Score and Tips",
    subtext: "Find out what works, what doesn't, and what to fix to get more interviews.",
  },
  {
    num: 3,
    icon: Trophy,
    headline: "Land Your Dream Offer",
    subtext: "Apply with a resume that gets past the filters and onto a hiring manager's desk.",
  },
];

export default function SelfSegmentationExperiment() {
  return (
    <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container mx-auto max-w-4xl">
        <h2
          className="font-heading text-center mb-10 md:mb-14"
          style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}
        >
          Get your free resume score in 60 seconds.
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative mb-12">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px]"
            style={{ backgroundColor: 'rgba(27,58,47,0.15)' }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center text-center relative z-10">
                {/* Numbered circle */}
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl font-bold mb-5"
                  style={{ backgroundColor: '#1B3A2F', color: '#FFFFFF' }}
                >
                  {step.num}
                </div>

                {/* Connector arrow on mobile */}
                {step.num < 3 && (
                  <div className="md:hidden flex justify-center -mt-2 mb-2">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                      <path d="M8 0 L8 18 M3 14 L8 20 L13 14" stroke="#1B3A2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <Icon className="w-8 h-8 mb-4" style={{ color: '#1B3A2F' }} strokeWidth={1.5} />

                {/* Text */}
                <p className="font-bold text-lg mb-2" style={{ color: '#1A1A1A' }}>
                  {step.headline}
                </p>
                <p className="text-base max-w-[260px]" style={{ color: '#6B6B6B' }}>
                  {step.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/resume-analyzer"
            className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200"
            style={{
              backgroundColor: '#1B3A2F',
              color: '#FFFFFF',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#2A4A3B')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#1B3A2F')}
          >
            Score My Resume Now
          </a>
          <p className="mt-2" style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>
            Free · No sign-up required · Takes 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
