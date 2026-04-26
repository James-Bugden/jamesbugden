import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import { motion } from "framer-motion";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import workshopPhoto from "@/assets/james-cake-workshop.jpg";

export default function AboutSection() {
  return (
    <section className="py-14 md:py-24 px-5 md:px-6 bg-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Left, Photos in a hairline frame */}
          <motion.div
            className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="card-hairline overflow-hidden">
              <img
                src={aboutPhoto}
                alt="James Bugden at a career event at Cake in Taiwan"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            <motion.div
              className="card-hairline overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <img
                src={workshopPhoto}
                alt="James Bugden leading a career workshop in Taiwan"
                className="w-full h-auto object-cover aspect-[16/9]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right, Bio */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h2
              className="font-heading mb-3 text-foreground tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              James Bugden
            </h2>

            <p className="text-[1.0625rem] mb-6" style={{ color: 'hsl(var(--executive-green))', fontWeight: 500 }}>
              Senior Recruiter at Uber · Career Coach · Speaker
            </p>

            <p className="text-[1.0625rem] mb-5 leading-relaxed text-foreground">
              Free tools used by <span className="tnum-geist text-foreground" style={{ fontWeight: 600 }}>10,000+</span> professionals at companies like Google, Uber, and Microsoft.
            </p>

            <p className="text-[15px] leading-relaxed mb-4 text-muted-foreground">
              I'm British. Moved to Taiwan after uni and never left.
              13 years later, I've hired for some of the biggest companies in the world.
              I know what works. I know what doesn't.
            </p>

            <p className="text-[15px] leading-relaxed mb-8 text-muted-foreground">
              My mission is simple: every tool other career sites charge for, resume reviewers, salary databases, interview prep, offer calculators, I give away <span className="text-foreground font-semibold">free to everyone</span>. Insider knowledge shouldn't be locked behind a paywall when it's the difference between an offer and a no.
            </p>

            {/* Social pills, hairline */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hairline inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-executive-green" />
                <span className="text-foreground text-[13px] font-semibold">
                  <span className="tnum-geist">15K</span> followers
                </span>
              </a>

              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hairline inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200"
              >
                <ThreadsIcon className="w-4 h-4 text-executive-green" />
                <span className="text-foreground text-[13px] font-semibold">
                  <span className="tnum-geist">12K</span> followers
                </span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
