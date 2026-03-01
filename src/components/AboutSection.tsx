import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import workshopPhoto from "@/assets/james-cake-workshop.jpg";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#2b4734' }}>
      <div className="container mx-auto max-w-6xl">

        {/* Gold divider at top */}
        <div className="flex justify-center mb-12">
          <div style={{ width: 60, height: 3, backgroundColor: '#D4930D', borderRadius: 2 }} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">

          {/* Left — Photos */}
          <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-3">
            <img
              src={aboutPhoto}
              alt="James Bugden at a career event at Cake in Taiwan"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              style={{ border: '2px solid rgba(212,147,13,0.3)' }}
              loading="lazy"
            />
            <img
              src={workshopPhoto}
              alt="James Bugden leading a career workshop in Taiwan"
              className="w-full h-auto rounded-xl object-cover aspect-[16/9]"
              style={{ border: '2px solid rgba(212,147,13,0.3)' }}
              loading="lazy"
            />
          </div>

          {/* Right — Bio */}
          <div className="w-full md:w-1/2">
            <span
              className="text-sm font-bold tracking-widest uppercase mb-3 block"
              style={{ color: '#D4930D' }}
            >
              ABOUT
            </span>

            <h2
              className="font-heading mb-3"
              style={{ color: '#FBF7F0', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              James Bugden
            </h2>

            <p className="font-bold text-base md:text-lg mb-5" style={{ color: '#D4930D' }}>
              Senior Recruiter at Uber · Career Coach · Speaker
            </p>

            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#A8B5A9' }}>
              Helped 750+ people from multinational companies like Google, Uber, and Microsoft.
              Free tools used by 10,000+ professionals. Speaker at career events across Taiwan.
            </p>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#A8B5A9' }}>
              I'm British. Moved to Taiwan after uni and never left.
              13 years later, I've hired for some of the biggest companies in the world.
              I know what works. I know what doesn't.
            </p>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#A8B5A9' }}>
              Now I make free tools and guides that give you the insider knowledge most people never get.
              Want personal help? I also coach 1-on-1.
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                }}
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-semibold">15K followers</span>
              </a>

              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                }}
              >
                <ThreadsIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">12K followers</span>
              </a>
            </div>

            {/* CTA */}
            <a
              href="https://jamesbugden.com/coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#D4930D',
                color: '#FFFFFF',
              }}
            >
              Book a 1-on-1 Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
