

export default function CoachingCTA() {
  return (
    <section id="coaching" className="py-14 md:py-20 px-5 md:px-6 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, hsl(153 38% 17%) 0%, hsl(153 42% 13%) 100%)' }}>
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-8">
          Want 1-on-1 Help?
        </h2>




        <p className="text-base text-cream/70 leading-relaxed mb-8 max-w-lg mx-auto">
          I work with a small number of clients each month on resume reviews, interview preparation, and salary negotiation.
        </p>

        <a
          href="#qualify"
          className="inline-flex h-12 px-8 items-center justify-center rounded-lg btn-gold text-base font-semibold"
        >
          See If You're a Fit
        </a>

        <p className="text-xs text-cream/50 mt-3">
          Takes 2 minutes · No commitment
        </p>
      </div>
    </section>
  );
}
