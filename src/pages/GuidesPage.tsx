import { Button } from "@/components/ui/button";
import { Linkedin, ArrowLeft, FileText, Briefcase, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";

interface Guide {
  icon: typeof FileText;
  title: string;
  description: string;
  href: string;
  category: string;
}

const guides: Guide[] = [
  // LinkedIn Guides
  {
    icon: Linkedin,
    title: "LinkedIn for Job Search: Get Recruiters to Find You (Mini Guide)",
    description: "Quick-start guide to optimizing your LinkedIn profile for job searching",
    href: "/linkedin-guide",
    category: "LinkedIn",
  },
  {
    icon: Linkedin,
    title: "LinkedIn for Job Seekers: Stop Applying, Start Getting Found",
    description: "Comprehensive tactical guide to building your personal brand on LinkedIn",
    href: "/linkedin-branding-guide",
    category: "LinkedIn",
  },
  // Career Change Guides
  {
    icon: Briefcase,
    title: "The Pivot Method: Quick Guide to Career Change (Mini Guide)",
    description: "Quick overview of the 5-stage framework for successful career transitions",
    href: "/pivot-method-mini-guide",
    category: "Career Change",
  },
  {
    icon: Briefcase,
    title: "The Pivot Method: A Full Guide to Career Change",
    description: "Complete recruiter's guide to navigating career changes with confidence",
    href: "/pivot-method-guide",
    category: "Career Change",
  },
  // Interview Guides
  {
    icon: MessageSquare,
    title: "10-Hour Interview Prep System",
    description: "Structured system to prepare for any interview in 10 focused hours",
    href: "/interview-prep-guide",
    category: "Interview Prep",
  },
  {
    icon: MessageSquare,
    title: "Full Interview Preparation Guide",
    description: "Comprehensive guide covering all aspects of interview preparation",
    href: "/interview-preparation-guide",
    category: "Interview Prep",
  },
];

const categories = ["LinkedIn", "Career Change", "Interview Prep"];

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
            <div className="hidden md:flex items-center gap-3">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Free Career Guides
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Practical frameworks and strategies from an active Fortune 100 recruiter to help you land your dream job.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-20 md:pb-28 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {categories.map((category) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 flex items-center gap-3">
                {category === "LinkedIn" && <Linkedin className="w-6 h-6 text-gold" />}
                {category === "Career Change" && <Briefcase className="w-6 h-6 text-gold" />}
                {category === "Interview Prep" && <MessageSquare className="w-6 h-6 text-gold" />}
                {category}
              </h2>
              
              <div className="grid gap-4">
                {guides
                  .filter((guide) => guide.category === category)
                  .map((guide, index) => {
                    const IconComponent = guide.icon;
                    return (
                      <Link
                        key={index}
                        to={guide.href}
                        className="group bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-gold" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-lg md:text-xl text-foreground font-semibold mb-1 group-hover:text-gold transition-colors">
                              {guide.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                              {guide.description}
                            </p>
                          </div>
                          <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-4xl">
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

export default GuidesPage;
