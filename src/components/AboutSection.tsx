import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import { motion } from "framer-motion";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import workshopPhoto from "@/assets/james-cake-workshop.jpg";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container mx-auto max-w-6xl">


        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">

          {/* Left — Photos */}
          <motion.div
            className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={aboutPhoto}
              alt="James Bugden at a career event at Cake in Taiwan"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              style={{ border: '2px solid rgba(212,147,13,0.3)' }}
              loading="lazy"
            />
            <motion.img
              src={workshopPhoto}
              alt="James Bugden leading a career workshop in Taiwan"
              className="w-full h-auto rounded-xl object-cover aspect-[16/9]"
              style={{ border: '2px solid rgba(212,147,13,0.3)' }}
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <span
              className="text-sm font-bold tracking-widest uppercase mb-3 block"
              style={{ color: '#D4930D' }}
            >
              ABOUT
            </span>

            <h2
              className="font-heading mb-3"
              style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              James Bugden
            </h2>

            <p className="font-bold text-base md:text-lg mb-5" style={{ color: '#2b4734' }}>
              Senior Recruiter at Uber · Career Coach · Speaker
            </p>

            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#1A1A1A' }}>
              Free tools used by 10,000+ professionals from companies like Google, Uber, and Microsoft.
            </p>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#6B6B6B' }}>
              I'm British. Moved to Taiwan after uni and never left.
              13 years later, I've hired for some of the biggest companies in the world.
              I know what works. I know what doesn't.
            </p>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
              Now I make free tools and guides that give you the insider knowledge most people never get.
              Want personal help? I also coach 1-on-1.
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(43,71,52,0.06)',
                  border: '1px solid rgba(43,71,52,0.12)',
                  color: '#1A1A1A',
                }}
              >
                <Linkedin className="w-5 h-5" style={{ color: '#2b4734' }} />
                <span className="text-sm font-semibold">15K followers</span>
              </a>

              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(43,71,52,0.06)',
                  border: '1px solid rgba(43,71,52,0.12)',
                  color: '#1A1A1A',
                }}
              >
                <ThreadsIcon className="w-5 h-5" style={{ color: '#2b4734' }} />
                <span className="text-sm font-semibold">12K followers</span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
