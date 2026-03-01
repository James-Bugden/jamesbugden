import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import uberLogo from "@/assets/logos/uber.svg";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#1B3A2F' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Left — Photo */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <img
              src={aboutPhoto}
              alt="James Bugden speaking at a career event at Cake in Taiwan"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>

          {/* Right — Bio */}
          <div className="w-full md:w-1/2">
            <h2
              className="font-heading mb-3"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              James Bugden
            </h2>

            <p className="font-bold text-base md:text-lg mb-5" style={{ color: '#D4930D' }}>
              Senior Recruiter at Uber · Career Coach · Speaker
            </p>

            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#E8E8E8' }}>
              Helped 750+ people from multinational companies like Google, Uber, and Microsoft.
              Free tools used by 10,000+ professionals. Speaker at career events across Taiwan.
            </p>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#D1D1D1' }}>
              I'm British. Moved to Taiwan after uni and never left.
              13 years later, I've hired for some of the biggest companies in the world.
              I know what works. I know what doesn't.
            </p>

            <p className="text-base leading-relaxed mb-10" style={{ color: '#D1D1D1' }}>
              Now I make free tools and guides that give you the insider knowledge most people never get.
              Want personal help? I also coach 1-on-1.
            </p>

            {/* Bottom logos row */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              {/* Uber */}
              <img
                src={uberLogo}
                alt="Uber"
                className="h-5 md:h-6 opacity-70"
                style={{ filter: 'brightness(0) invert(1)' }}
              />

              {/* Cake */}
              <span className="font-bold text-lg tracking-tight opacity-70" style={{ color: '#FFFFFF' }}>
                🏠 Cake
              </span>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-100 transition-opacity opacity-70"
              >
                <Linkedin className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>15K</span>
              </a>

              {/* Threads */}
              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-100 transition-opacity opacity-70"
              >
                <ThreadsIcon className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>12K</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
