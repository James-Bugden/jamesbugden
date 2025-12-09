import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Linkedin, ChevronRight } from "lucide-react";
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 apple-blur border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-base font-medium tracking-tight">James Bugden</span>
          <div className="hidden md:flex items-center gap-10">
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Services</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">About</a>
            <a href="#results" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Results</a>
          </div>
          <div className="flex items-center gap-5">
            <LanguageToggle />
            <div className="flex items-center gap-4 pl-4 border-l border-border/50">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <ThreadsIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl text-center relative">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-6">
            Career Strategy
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight leading-[1.05] mb-8">
            <span className="text-gradient-silver">Transform</span> your career.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Elite career strategies for ambitious professionals. 
            Land the role you deserve, at the compensation you're worth.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-secondary/50 border-border/50 rounded-2xl text-base px-6 focus:border-accent/50 transition-colors"
              required
            />
            <Button type="submit" className="h-14 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(38_100%_50%_/_0.5)]">
              Get Started <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-6">
            Join <span className="text-foreground font-medium">12,847+</span> professionals receiving weekly insights
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 px-6 border-y border-border/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">$12M+</p>
              <p className="text-sm text-muted-foreground mt-3">Compensation Negotiated</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">500+</p>
              <p className="text-sm text-muted-foreground mt-3">Clients Placed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">94%</p>
              <p className="text-sm text-muted-foreground mt-3">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">47%</p>
              <p className="text-sm text-muted-foreground mt-3">Avg Salary Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <p className="text-accent text-sm font-medium tracking-widest uppercase mb-6">About</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
                Hi, I'm <span className="text-gradient">James</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I've helped 500+ professionals negotiate over $12M in additional compensation. 
                I've been on both sides of the hiring table at Fortune 500 companies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                My clients land roles at Google, Amazon, Meta, Goldman Sachs, and McKinsey. 
                I don't teach theory—I teach what actually works.
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/50 hover:bg-secondary hover:border-border transition-all duration-300">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/50 hover:bg-secondary hover:border-border transition-all duration-300">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </Button>
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl scale-110" />
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl object-cover ring-1 ring-border/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-6">Services</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              How I help you <span className="text-gradient">win</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group premium-card rounded-3xl p-8 hover:border-accent/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform duration-300">
                  📄
                </div>
                <h3 className="text-xl font-semibold mb-4">Resume</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your resume has 6 seconds to impress. I'll rebuild yours to pass ATS systems and make recruiters reach out.
                </p>
              </div>
            </div>

            <div className="group premium-card rounded-3xl p-8 hover:border-accent/30 transition-all duration-500 relative overflow-hidden ring-1 ring-accent/20">
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="absolute -top-2 right-0">
                  <span className="text-[10px] font-medium tracking-widest uppercase text-accent">Popular</span>
                </div>
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform duration-300">
                  🎯
                </div>
                <h3 className="text-xl font-semibold mb-4">Interviews</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stop hoping. I'll show you exactly what to say, how to say it, and how to handle any curveball.
                </p>
              </div>
            </div>

            <div className="group premium-card rounded-3xl p-8 hover:border-accent/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform duration-300">
                  💰
                </div>
                <h3 className="text-xl font-semibold mb-4">Negotiation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The average person leaves $50K+ on the table. I'll coach you to negotiate what you're worth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="results" className="py-32 px-6 border-y border-border/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-6">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Real <span className="text-gradient">results</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
              <div key={i} className="premium-card rounded-3xl p-8">
                <div className="flex gap-1 mb-6 text-accent">
                  {"★★★★★".split("").map((star, j) => (
                    <span key={j} className="text-sm">{star}</span>
                  ))}
                </div>
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-10">
            Where my clients work
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 text-xl md:text-2xl font-medium text-muted-foreground/30">
            <span className="hover:text-muted-foreground/60 transition-colors duration-300">Google</span>
            <span className="hover:text-muted-foreground/60 transition-colors duration-300">Meta</span>
            <span className="hover:text-muted-foreground/60 transition-colors duration-300">Amazon</span>
            <span className="hover:text-muted-foreground/60 transition-colors duration-300">Apple</span>
            <span className="hover:text-muted-foreground/60 transition-colors duration-300">Microsoft</span>
            <span className="hover:text-muted-foreground/60 transition-colors duration-300">Goldman Sachs</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-3xl text-center relative">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to <span className="text-gradient">level up</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Every week you wait is money left on the table. Let's change that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-base transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(38_100%_50%_/_0.5)]">
              Work With Me <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-medium text-base border-border/50 hover:bg-secondary hover:border-border transition-all duration-300">
              Get Free Tips
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <ThreadsIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;