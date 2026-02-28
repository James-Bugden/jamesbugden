export default function CoachingCTAExperiment() {
  return (
    <section
      id="coaching"
      className="py-12 md:py-20 px-5 md:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2D3A2E 0%, #232E24 100%)',
      }}
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        <h2
          className="font-heading mb-4"
          style={{ color: '#FBF7F0', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}
        >
          Ready to Fast-Track Your Career?
        </h2>

        <p
          className="leading-relaxed mb-4 max-w-[550px] mx-auto"
          style={{ color: 'rgba(251,247,240,0.7)', fontSize: '1.0625rem' }}
        >
          I only work with a few people each month. If you're serious about getting a great offer, let's chat.
        </p>

        <p className="font-bold mb-8" style={{ color: '#D4930D', fontSize: '0.9375rem' }}>
          Currently accepting 5 new clients for March 2026
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-8" style={{ color: '#FFFFFF', fontSize: '0.9375rem' }}>
          <span className="flex items-center gap-1.5">
            <span style={{ color: '#D4930D' }}>✓</span> Free 15-minute intro call
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: '#D4930D' }}>✓</span> Personalized career strategy
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: '#D4930D' }}>✓</span> No obligation
          </span>
        </div>

        <a
          href="#qualify"
          className="inline-flex items-center justify-center font-semibold"
          style={{
            backgroundColor: '#D4930D',
            color: '#FFFFFF',
            padding: '16px 32px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = '#E0A520')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = '#D4930D')
          }
        >
          See If You're a Fit
        </a>

        <p style={{ color: '#A8B5A9', fontSize: '0.8125rem', marginTop: '8px' }}>
          Free intro call · No commitment · No pressure
        </p>

        <p style={{ color: '#A8B5A9', fontSize: '0.8125rem', marginTop: '16px' }}>
          Trusted by professionals from Google, Amazon, Meta, and 50+ companies
        </p>
      </div>
    </section>
  );
}
