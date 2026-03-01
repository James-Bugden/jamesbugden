export default function CoachingCTAExperiment() {
  return (
    <section
      id="coaching"
      className="py-12 md:py-20 px-5 md:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2b4734 0%, #1f3a28 100%)',
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
          className="font-heading mb-6"
          style={{ color: '#FBF7F0', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}
        >
          Ready to Get More Interviews?
        </h2>

        <a
          href="/resume-analyzer"
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
          Score My Resume Now
        </a>

        <p style={{ color: '#A8B5A9', fontSize: '0.8125rem', marginTop: '8px' }}>
          Free. No sign-up. Takes 60 seconds.
        </p>
      </div>
    </section>
  );
}
