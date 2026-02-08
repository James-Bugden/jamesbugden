import { useState } from "react";
import { ChevronDown } from "lucide-react";
import monicaPhoto from "@/assets/testimonials/monica.jpg";
import juliePhoto from "@/assets/testimonials/julie.jpeg";
import cynthiaPhoto from "@/assets/testimonials/cynthia.jpeg";
import sunnyPhoto from "@/assets/testimonials/sunny.jpeg";
import pinweiPhoto from "@/assets/testimonials/pinwei.png";

interface Testimonial {
  name: string;
  hook: string;
  full: string;
  photo?: string;
  initial?: string;
  initialBg?: string;
}

const allTestimonials: Testimonial[] = [
  {
    name: "Pin-Wei Wu",
    hook: "It felt more like a high-density career session than just a resume check.",
    full: "This is awesome! These days, everyone is using AI to polish their resumes, but having a professional recruiter do a deep-dive review is on a whole different level. It felt more like a high-density career session than just a resume check. You helped me spot those 'hidden' wins that I would've never noticed on my own. Really appreciate the help, James! This gave me a lot more confidence for my next steps.",
    photo: pinweiPhoto,
  },
  {
    name: "David",
    hook: "Even after refining my resume over ten times, I still gained so many valuable insights from James's review!",
    full: "James's resume review is incredibly practical. He carefully addresses every detail with specific feedback and revision suggestions, and shares what HR values from a talent acquisition perspective. He doesn't just tell you what the problems are (What) — he shows you how to fix them (How) and why (Why). Even after refining my resume over ten times, I still gained so many valuable insights from James's review!",
  },
  {
    name: "Sunny",
    hook: "This is advice that even my HR friends and headhunter friends couldn't give me.",
    full: "Thank you James for the thorough resume review. I was truly surprised when I received the feedback — how could someone be this meticulous! I felt like I gained so much. This is advice that even my HR friends and headhunter friends couldn't give me. Highly recommended — James is incredibly dedicated and professional.",
    photo: sunnyPhoto,
  },
  {
    name: "Sam Lee",
    hook: "If he offered an advanced service like interview coaching, I'd definitely be interested.",
    full: "I think this resume review was super professional. James used his expertise to give me a clear, structured breakdown of where I could improve, along with examples for how to revise my content. If he offered an advanced service, like interview coaching, I'd definitely be interested. If you're aiming for an overseas opportunity, he's someone who can really help.",
  },
  {
    name: "Monica",
    hook: "I now have a much clearer direction and confidence in how to write a resume with real content and strategy.",
    full: "After comparing my original resume with the revised version, it looked significantly more professional. The feedback for every section was very specific — tailored to my years of experience and background, with logical and actionable suggestions. This also gave me a reusable framework and way of thinking that I can adapt for different companies and roles in the future, greatly improving my efficiency and precision. I now have a much clearer direction and confidence in how to write a resume with real content and strategy.",
    photo: monicaPhoto,
  },
  {
    name: "Cynthia Chiang",
    hook: "You helped me identify several important blind spots, especially around ATS optimisation, impact-driven writing, and role alignment.",
    full: "Thank you for the detailed and insightful CV review. You helped me identify several important blind spots that I wasn't aware of, especially around ATS optimisation, impact-driven writing, and role alignment. Your guidance on improving the header format, strengthening the first 15 words, and presenting a clear professional title was extremely helpful. Overall, your review was concise, professional, and full of actionable recommendations. It's exactly the type of structured feedback I needed.",
    photo: cynthiaPhoto,
  },
  {
    name: "Julie Huang",
    hook: "James's feedback is direct and hits the nail on the head every time.",
    full: "James's feedback is direct and hits the nail on the head every time. Afterwards, I used his comments together with AI tools to have ongoing conversations, and ultimately made the bold decision to remove less relevant education and a short internship. I'll continue to improve and train my writing skills. Thank you for taking the time to review my resume.",
    photo: juliePhoto,
  },
  {
    name: "Roger Lee",
    hook: "James truly puts his heart into customising his advice for each person's situation and target roles!",
    full: "He clearly identified the areas I should improve based on my background and current situation. The item-by-item review made it easy to pinpoint problems and make improvements. James truly puts his heart into customising his advice for each person's situation and target roles!",
  },
  {
    name: "Charlene Lee",
    hook: "Your review helped me discover my own strengths and where I can keep improving!",
    full: "Although this resume review came a bit late, I think it helped a lot! Sometimes we have blind spots, and your review really helped me discover my own strengths and where I can keep improving on my resume!",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasPhoto = !!testimonial.photo;

  return (
    <div className="bg-card rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Photo if available */}
      {hasPhoto && (
        <div className="flex justify-center mb-4">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-gold"
          />
        </div>
      )}
      
      {/* Decorative Quote (only if no photo) */}
      {!hasPhoto && (
        <span className="block text-3xl text-gold/30 font-serif leading-none mb-2">"</span>
      )}
      
      {/* Hook Quote */}
      <p className={`text-foreground text-sm leading-relaxed mb-2 ${hasPhoto ? 'text-center' : ''}`}>
        "{testimonial.hook}"
      </p>
      
      {/* Expandable Full Content */}
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <p className="text-muted-foreground text-xs leading-relaxed border-t border-border pt-3">
          {testimonial.full}
        </p>
      </div>
      
      {/* Name + Read More */}
      <div className={`flex items-center justify-between mt-3 ${hasPhoto ? '' : ''}`}>
        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-gold hover:text-gold/80 transition-colors text-xs font-medium"
        >
          {isExpanded ? "Less" : "More"}
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

interface TestimonialsSectionProps {
  title?: string;
}

const TestimonialsSection = ({ title = "What Clients Say" }: TestimonialsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  
  const featured = allTestimonials[0];
  const gridTestimonials = allTestimonials.slice(1, 5);
  const hiddenTestimonials = allTestimonials.slice(5);

  return (
    <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          {title}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Featured Testimonial - Pin-Wei Wu */}
          <div className="lg:w-[40%]">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 h-full relative border-l-4 border-gold">
              {/* Large decorative quote */}
              <span className="absolute top-6 left-8 text-6xl text-gold/20 font-serif leading-none">"</span>
              
              {/* Photo */}
              <div className="flex justify-center mb-6">
                <img
                  src={featured.photo}
                  alt={featured.name}
                  className="w-20 h-20 rounded-full object-cover border-[3px] border-gold shadow-md"
                />
              </div>
              
              {/* Hook Quote */}
              <p className="font-heading text-lg md:text-xl text-foreground leading-relaxed mb-6 relative z-10 text-center">
                "{featured.hook}"
              </p>
              
              {/* Full Testimonial */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                {featured.full}
              </p>
              
              {/* Attribution */}
              <div className="text-center">
                <p className="font-bold text-foreground text-lg">{featured.name}</p>
              </div>
            </div>
          </div>
          
          {/* Grid Testimonials */}
          <div className="lg:w-[60%]">
            <div className="grid sm:grid-cols-2 gap-4">
              {gridTestimonials.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Hidden Testimonials - Expandable */}
        <div className={`mt-8 overflow-hidden transition-all duration-500 ease-out ${showAll ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hiddenTestimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </div>
        </div>
        
        {/* See All Toggle */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
          >
            {showAll ? "Show Less" : "See All Testimonials"}
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
