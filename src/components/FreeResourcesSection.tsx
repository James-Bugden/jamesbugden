import { Mail, ClipboardList, Briefcase, BookOpen, CheckSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Resource {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  featured: boolean;
  showEmailIcon?: boolean;
  isInternalLink?: boolean;
}

const resources: Resource[] = [
  {
    icon: ClipboardList,
    title: "The Recruiter's Resume Checklist",
    description: "What I check in the first 6 seconds at Uber",
    buttonText: "Download Free",
    href: "#",
    featured: false,
  },
  {
    icon: Briefcase,
    title: "Interview Preparation Sheet",
    description: "Prepare for any interview using my proven framework",
    buttonText: "Get Prep Sheet",
    href: "#",
    featured: false,
  },
  {
    icon: BookOpen,
    title: "Career Guides Collection",
    description: "LinkedIn, interview prep, and career change guides",
    buttonText: "View Guides",
    href: "/guides",
    featured: false,
    isInternalLink: true,
  },
  {
    icon: CheckSquare,
    title: "Offer Decision Scorecard",
    description: "Evaluate job offers objectively with my decision framework",
    buttonText: "Get Scorecard",
    href: "#",
    featured: true,
    showEmailIcon: true,
  },
];

const FreeResourcesSection = () => {
  return (
    <section id="resources" className="py-16 md:py-24 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header - matching "What Clients Say" style */}
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          Free Resources
        </h2>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div
                key={index}
                className={`
                  relative bg-card rounded-2xl p-8 md:p-10 flex flex-col items-center text-center
                  transition-all duration-300 hover:-translate-y-1
                  ${resource.featured 
                    ? "border-2 border-gold/40 shadow-lg" 
                    : "border border-border shadow-md"
                  }
                  hover:shadow-xl
                `}
              >
                {/* Featured Badge */}
                {resource.featured && (
                  <div className="absolute top-4 right-4 bg-gold/15 text-gold text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gold" />
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-gold" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl md:text-2xl text-foreground font-semibold mb-3">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                  {resource.description}
                </p>

                {/* Button */}
                <Button
                  asChild
                  className="btn-gold h-11 px-6 font-medium text-sm uppercase tracking-wider"
                >
                  {resource.isInternalLink ? (
                    <Link to={resource.href} className="flex items-center justify-center gap-2">
                      {resource.showEmailIcon && <Mail className="w-4 h-4" />}
                      {resource.buttonText}
                    </Link>
                  ) : (
                    <a href={resource.href} className="flex items-center justify-center gap-2">
                      {resource.showEmailIcon && <Mail className="w-4 h-4" />}
                      {resource.buttonText}
                    </a>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreeResourcesSection;
