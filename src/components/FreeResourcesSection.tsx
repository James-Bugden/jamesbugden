import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import MailerLiteForm from "@/components/MailerLiteForm";

const resources = [
  {
    emoji: "📋",
    title: "The Recruiter's Resume Checklist",
    description: "What I check in the first 6 seconds at Uber",
    buttonText: "Download Free",
    href: "#",
    featured: false,
  },
  {
    emoji: "💼",
    title: "Interview Preparation Sheet",
    description: "Prepare for any interview using my proven framework",
    buttonText: "Get Prep Sheet",
    href: "#",
    featured: false,
  },
  {
    emoji: "💰",
    title: "Offer Salary Calculator",
    description: "Calculate your market value and negotiation range",
    buttonText: "Calculate Salary",
    href: "#",
    featured: false,
  },
  {
    emoji: "✅",
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
    <section id="resources" className="py-20 md:py-28 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-[56px] text-executive-green mb-4 tracking-tight">
            FREE RESOURCES
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn what Fortune 500 recruiters actually look for (no BS, just insider knowledge)
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 md:mb-16">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`
                relative bg-card rounded-xl p-6 md:p-8 flex flex-col items-center text-center
                transition-all duration-300 hover:-translate-y-1
                ${resource.featured 
                  ? "border-2 border-gold/50 shadow-[0_4px_20px_rgba(0,0,0,0.12),0_0_0_1px_hsl(var(--gold)/0.2)]" 
                  : "border border-border shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                }
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
              `}
            >
              {/* Featured Badge */}
              {resource.featured && (
                <div className="absolute top-4 right-4 bg-gold/15 text-gold text-xs font-semibold px-2.5 py-1 rounded-full">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Icon */}
              <div className="text-5xl md:text-6xl mb-5 filter drop-shadow-sm">
                <span className="text-gold" style={{ filter: "grayscale(100%) sepia(100%) hue-rotate(0deg) saturate(300%) brightness(0.9)" }}>
                  {resource.emoji}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl md:text-2xl text-foreground font-semibold mb-2">
                {resource.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                {resource.description}
              </p>

              {/* Button */}
              <Button
                asChild
                className="btn-gold h-11 px-6 font-medium text-sm uppercase tracking-wider w-full md:w-auto"
              >
                <a href={resource.href} className="flex items-center justify-center gap-2">
                  {resource.showEmailIcon && <Mail className="w-4 h-4" />}
                  {resource.buttonText}
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Below Grid */}
        <div className="text-center">
          <p className="text-lg md:text-xl text-foreground font-medium mb-2">
            Want your resume reviewed by an Uber recruiter?
          </p>
          <p className="text-gold font-semibold mb-6">
            (Worth $500 - 5 spots monthly)
          </p>
          <MailerLiteForm formId="sM1X80" className="ml-embedded max-w-[420px] mx-auto" buttonText="Join Waitlist" />
        </div>
      </div>
    </section>
  );
};

export default FreeResourcesSection;
