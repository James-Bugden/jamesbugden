import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import TestimonialsSection from "@/components/TestimonialsSection";

declare global {
  interface Window {
    ml: (action: string, ...args: unknown[]) => void;
  }
}

const Index = () => {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#results", label: "Results" },
  ];

  useEffect(() => {
    // Trigger MailerLite to render embedded forms after component mounts
    if (window.ml) {
      window.ml('webforms', 'bootstrap');
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation - Executive Green */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-cream-70 hover:text-cream transition-all duration-300">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <LanguageToggle variant="nav" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-all duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-all duration-300">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 md:pt-40 pb-20 md:pb-[120px] px-5 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            {/* Text Content - 60% */}
            <div className="w-full md:w-[60%] order-2 md:order-1">
              <h1 
                className="font-heading text-executive-green mb-8 leading-[1.1] tracking-[-0.5px] animate-fade-up"
                style={{ fontSize: 'clamp(48px, 5vw, 80px)' }}
              >
                Stop Getting<br />Ghosted By<br />Recruiters
              </h1>
              
              <div className="max-w-[600px]">
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-4 animate-fade-up-delay">
                  I'm an active Uber recruiter who sees what actually works.
                </p>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-4 animate-fade-up-delay">
                  I've reviewed <span className="text-gold-bright font-bold text-[120%]">20,000+ resumes</span> and hired <span className="text-gold-bright font-bold text-[120%]">500+ people</span>.
                </p>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 animate-fade-up-delay">
                  I know exactly why yours isn't getting callbacks.
                </p>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-1 animate-fade-up-delay-2">
                  Get on the waitlist for a free review.
                </p>
                <p className="text-gold font-semibold text-lg md:text-xl mb-8 animate-fade-up-delay-2">
                  (Worth $200 - 5 spots monthly)
                </p>
                
                {/* MailerLite Form Embed */}
                <div className="ml-embedded max-w-[400px] mb-4 animate-fade-up-delay-2" data-form="sM1X80"></div>
                
                <p className="text-sm text-muted-foreground mb-8 animate-fade-up-delay-2">
                  Your info stays private. No spam. Ever.
                </p>
              </div>
            </div>
            
            {/* Photo - 40% */}
            <div className="w-full md:w-[40%] flex justify-center order-1 md:order-2 animate-fade-up">
              <img
                src={jamesPhoto}
                alt="James Bugden"
                className="w-64 h-64 md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full object-cover hero-photo-shadow border-4 border-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />


      {/* Waitlist CTA Section */}
      <section id="results" className="py-16 md:py-20 px-5 md:px-6 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 
            className="font-heading text-foreground mb-4 leading-tight"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            Join The Waitlist: Free Resume Review
          </h2>
          <p className="text-gold font-semibold text-lg md:text-xl mb-6">
            (Worth $300 USD - 5 Spots Monthly)
          </p>
          <p className="text-lg md:text-xl text-foreground mb-2 max-w-[600px] mx-auto">
            I only review <span className="font-bold">5 resumes per month</span> while working full-time at Uber.
          </p>
          <p className="text-lg md:text-xl text-foreground mb-10 max-w-[600px] mx-auto">
            Right now I'm fully booked, but join the waitlist and I'll reach out when a spot opens.
          </p>
          
          {/* Premium Box */}
          <div 
            className="bg-cream-light border border-border rounded-2xl p-8 md:p-10 mb-10 text-left max-w-xl mx-auto"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
          >
            <p className="text-foreground mb-4 font-semibold text-lg">Here's why the waitlist exists:</p>
            <p className="text-foreground mb-6 text-base md:text-lg leading-relaxed">
              I could review 50 resumes a month and give surface-level feedback. Or I could review 5 and actually make them Fortune 500-ready.
            </p>
            <p className="text-foreground mb-8 text-base md:text-lg leading-relaxed font-medium">
              I chose option 2.
            </p>
            <p className="text-foreground font-semibold mb-4 text-lg">What you'll get when your spot opens:</p>
            <ul className="space-y-3 mb-0">
              <li className="flex items-start gap-3 text-base md:text-lg text-foreground">
                <GoldCheckBadge />
                <span>The exact changes that make recruiters reach out</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-foreground">
                <GoldCheckBadge />
                <span>Tips from someone who reviews resumes every day at Uber</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-foreground">
                <GoldCheckBadge />
                <span>Real feedback from an active Fortune 500 recruiter</span>
              </li>
            </ul>
          </div>

          <div className="ml-embedded max-w-[500px] mx-auto" data-form="sM1X80"></div>
          <p className="text-sm text-muted-foreground mt-4">
            Your info stays private. I don't spam. Ever.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-[120px] px-5 md:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 
            className="font-heading text-foreground mb-10"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            Hi, I'm James
          </h2>
          
          <div className="max-w-[600px] mx-auto text-left">
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              I'm a <span className="font-bold">Senior Recruiter at Uber</span> in Taiwan.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              I review resumes every day at Uber. I've reviewed <span className="text-gold-bright font-bold">20,000+ resumes</span> and hired <span className="text-gold-bright font-bold">500+ people</span>.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              Before recruiting, I was an English teacher in Taiwan. That's why I know how to break down complex feedback into changes you can actually use.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-10 font-medium">
              I don't teach theory. I teach what actually works today.
            </p>
          </div>
          
          {/* Social Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300">
              <Linkedin className="w-7 h-7 md:w-8 md:h-8" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300">
              <InstagramIcon className="w-7 h-7 md:w-8 md:h-8" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300">
              <ThreadsIcon className="w-7 h-7 md:w-8 md:h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-5 md:px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
