import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Check } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation - Executive Green */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-executive-green">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-cream-70 hover:text-cream transition-colors">Services</a>
            <a href="#about" className="text-sm text-cream-70 hover:text-cream transition-colors">About</a>
            <a href="#results" className="text-sm text-cream-70 hover:text-cream transition-colors">Results</a>
            <a href="#newsletter" className="text-sm text-cream-70 hover:text-cream transition-colors">Newsletter</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle variant="nav" />
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Email Signup First */}
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-up leading-tight">
            5 Minutes That Might<br />Change Your Career
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-2 animate-fade-up-delay">
            <span className="text-gold font-semibold">12,847+ professionals</span> have leveled up their careers so far.
          </p>
          <p className="text-lg md:text-xl text-foreground mb-8 animate-fade-up-delay">
            Will the next one be you?
          </p>
          <p className="text-muted-foreground mb-8 animate-fade-up-delay-2">
            Receive career strategies shared with thousands of ambitious professionals directly to your inbox every Tuesday.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-up-delay-2">
            <Input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-card border-border rounded-lg text-base px-4 flex-1"
              required
            />
            <Button type="submit" className="h-12 px-8 rounded-lg bg-foreground hover:bg-foreground/90 text-white font-medium uppercase tracking-wider text-sm border-2 border-foreground">
              Sign Up
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 italic animate-fade-up-delay-2">
            Your information is protected and I never spam, ever.
          </p>
        </div>
      </section>

      {/* About Section with Photo */}
      <section id="about" className="py-20 px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center mb-16">
            Hi, I'm James
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                I've helped <span className="font-bold">500+ professionals</span> negotiate <span className="text-gold font-bold">$12M+ in additional compensation</span>. I've been on both sides of the hiring table at Fortune 500 companies, and I know exactly what gets candidates rejected—and what makes them irresistible.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-8">
                My clients land roles at Google, Amazon, Meta, Goldman Sachs, McKinsey, and every major tech company you can think of. I don't teach theory. I teach what actually works.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </Button>
                </a>
                <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40">
                    <ThreadsIcon className="w-4 h-4" /> Threads
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-none p-10 card-hover border-t-2 border-t-gold border-x-0 border-b-0 shadow-sm">
              <span className="text-gold font-heading text-sm tracking-widest mb-6 block">01</span>
              <h3 className="font-heading text-2xl text-foreground mb-4">Resume That Opens Doors</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your resume has 6 seconds to impress. Most resumes fail in 2. I'll rebuild yours to pass ATS systems AND make recruiters reach out same day.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  ATS-optimized formatting
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Achievement-focused bullets
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Tailored for FAANG & MNCs
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-none p-10 card-hover border-t-2 border-t-gold border-x-0 border-b-0 shadow-sm">
              <span className="text-gold font-heading text-sm tracking-widest mb-6 block">02</span>
              <h3 className="font-heading text-2xl text-foreground mb-4">Interview Mastery</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Stop "hoping" you'll get the job. I'll show you exactly what to say, how to say it, and how to handle any curveball they throw at you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Mock interviews with feedback
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  STAR method frameworks
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Company-specific strategies
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-none p-10 card-hover border-t-2 border-t-gold border-x-0 border-b-0 shadow-sm">
              <span className="text-gold font-heading text-sm tracking-widest mb-6 block">03</span>
              <h3 className="font-heading text-2xl text-foreground mb-4">Salary Negotiation</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The average person leaves $50K+ on the table. Don't be average. I'll coach you to negotiate like a pro and get what you're actually worth.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Exact scripts & tactics
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Counter-offer strategies
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  Total comp optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Executive Green Background */}
      <section id="results" className="py-24 px-6 bg-executive-green">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4">
            Results That Speak
          </h2>
          <p className="text-cream-90 text-lg mb-16">
            Real numbers. Real people. Real transformations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">$12M+</p>
              <p className="text-sm text-cream-90">Additional Comp Negotiated</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">500+</p>
              <p className="text-sm text-cream-90">Clients Placed</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">94%</p>
              <p className="text-sm text-cream-90">Interview Success Rate</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">47%</p>
              <p className="text-sm text-cream-90">Avg Salary Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center mb-16">
            What Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I was stuck at $85K for 3 years. James helped me negotiate $142K at Google. That's a 67% increase.",
                name: "Sarah M.",
                role: "Software Engineer → Google"
              },
              {
                quote: "Failed 12 interviews before James. After his coaching, got offers from Meta AND Amazon.",
                name: "Michael T.",
                role: "Product Manager → Meta"
              },
              {
                quote: "I almost accepted their first offer. James coached me to counter and I got $45K more.",
                name: "Jennifer L.",
                role: "Data Scientist → Goldman Sachs"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 border-t-2 border-t-gold shadow-sm">
                <div className="flex gap-1 mb-4 text-gold">★★★★★</div>
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 px-6 border-y border-border bg-card">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-8">
            Where My Clients Work
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-xl md:text-2xl font-medium text-muted-foreground/50">
            <span className="hover:text-foreground transition-colors">Google</span>
            <span className="hover:text-foreground transition-colors">Meta</span>
            <span className="hover:text-foreground transition-colors">Amazon</span>
            <span className="hover:text-foreground transition-colors">Apple</span>
            <span className="hover:text-foreground transition-colors">Microsoft</span>
            <span className="hover:text-foreground transition-colors">Goldman Sachs</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="newsletter" className="py-24 px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-cream-90 text-lg mb-10 max-w-xl mx-auto">
            Every week you wait is money left on the table. Let's change that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 bg-gold hover:bg-gold/90 text-white font-medium text-base uppercase tracking-wider border-2 border-gold">
              Work With Me
            </Button>
            <Button size="lg" className="h-14 px-10 bg-transparent border-2 border-gold text-white hover:bg-gold/10 font-medium text-base uppercase tracking-wider">
              Get Free Tips
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
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
