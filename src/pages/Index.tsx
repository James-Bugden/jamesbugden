import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Linkedin } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Navigation - Apple style frosted glass */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 apple-blur border-b border-border/50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-base font-semibold tracking-tight">James Bugden</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#results" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <ThreadsIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple massive typography */}
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-8">
            Transform your career.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Career strategies for ambitious professionals. 
            Get the job you deserve, at the salary you're worth.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-secondary border-0 rounded-xl text-base"
              required
            />
            <Button type="submit" className="h-12 px-8 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
              Get Started
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            Join 12,847+ professionals. Free weekly insights.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 px-6 border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight">$12M+</p>
              <p className="text-sm text-muted-foreground mt-2">Compensation Negotiated</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight">500+</p>
              <p className="text-sm text-muted-foreground mt-2">Clients Placed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight">94%</p>
              <p className="text-sm text-muted-foreground mt-2">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight">47%</p>
              <p className="text-sm text-muted-foreground mt-2">Avg Salary Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-accent text-sm font-medium mb-4">About</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Hi, I'm James.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I've helped 500+ professionals negotiate over $12M in additional compensation. 
                I've been on both sides of the hiring table at Fortune 500 companies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                My clients land roles at Google, Amazon, Meta, Goldman Sachs, and McKinsey. 
                I don't teach theory. I teach what actually works.
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </Button>
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src={jamesPhoto}
                alt="James Bugden"
                className="w-72 h-72 md:w-80 md:h-80 rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Apple card style */}
      <section id="services" className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-medium mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              How I help you win.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-2xl">
                📄
              </div>
              <h3 className="text-xl font-semibold mb-3">Resume</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your resume has 6 seconds to impress. I'll rebuild yours to pass ATS systems and make recruiters reach out.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-3 right-6 bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                Popular
              </div>
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-3">Interviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stop hoping. I'll show you exactly what to say, how to say it, and how to handle any curveball.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-2xl">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-3">Negotiation</h3>
              <p className="text-muted-foreground leading-relaxed">
                The average person leaves $50K+ on the table. I'll coach you to negotiate what you're actually worth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Dark inverse */}
      <section id="results" className="py-24 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-medium mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Real results.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background/5 rounded-2xl p-8 border border-background/10">
              <div className="flex gap-1 mb-4 text-accent">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-background/80 mb-6 leading-relaxed">
                "I was stuck at $85K for 3 years. James helped me negotiate $142K at Google. That's a 67% increase."
              </p>
              <div>
                <p className="font-medium">Sarah M.</p>
                <p className="text-sm text-background/60">Software Engineer → Google</p>
              </div>
            </div>

            <div className="bg-background/5 rounded-2xl p-8 border border-background/10">
              <div className="flex gap-1 mb-4 text-accent">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-background/80 mb-6 leading-relaxed">
                "Failed 12 interviews before James. After his coaching, got offers from Meta AND Amazon."
              </p>
              <div>
                <p className="font-medium">Michael T.</p>
                <p className="text-sm text-background/60">Product Manager → Meta</p>
              </div>
            </div>

            <div className="bg-background/5 rounded-2xl p-8 border border-background/10">
              <div className="flex gap-1 mb-4 text-accent">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-background/80 mb-6 leading-relaxed">
                "I almost accepted their first offer. James coached me to counter and I got $45K more."
              </p>
              <div>
                <p className="font-medium">Jennifer L.</p>
                <p className="text-sm text-background/60">Data Scientist → Goldman Sachs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 px-6 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-widest mb-8">
            WHERE MY CLIENTS WORK
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-xl md:text-2xl font-medium text-muted-foreground/40">
            <span>Google</span>
            <span>Meta</span>
            <span>Amazon</span>
            <span>Apple</span>
            <span>Microsoft</span>
            <span>Goldman Sachs</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to level up?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Every week you wait is money left on the table. Let's change that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-base">
              Work With Me <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <a href="#newsletter">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-medium text-base">
                Get Free Tips
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
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