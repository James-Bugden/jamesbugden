import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  hook: string;
  full: string;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Pin-Wei Wu",
    hook: "It felt more like a high-density career session than just a resume check.",
    full: "This is awesome! These days, everyone is using AI to polish their resumes, but having a professional recruiter do a deep-dive review is on a whole different level. It felt more like a high-density career session than just a resume check. You helped me spot those 'hidden' wins that I would've never noticed on my own. Really appreciate the help, James! This gave me a lot more confidence for my next steps.",
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
  },
  {
    name: "Cynthia Chiang",
    hook: "You helped me identify several important blind spots, especially around ATS optimisation, impact-driven writing, and role alignment.",
    full: "Thank you for the detailed and insightful CV review. You helped me identify several important blind spots that I wasn't aware of, especially around ATS optimisation, impact-driven writing, and role alignment. Your guidance on improving the header format, strengthening the first 15 words, and presenting a clear professional title was extremely helpful. Overall, your review was concise, professional, and full of actionable recommendations. It's exactly the type of structured feedback I needed.",
  },
  {
    name: "Julie Huang",
    hook: "James's feedback is direct and hits the nail on the head every time.",
    full: "James's feedback is direct and hits the nail on the head every time. Afterwards, I used his comments together with AI tools to have ongoing conversations, and ultimately made the bold decision to remove less relevant education and a short internship. I'll continue to improve and train my writing skills. Thank you for taking the time to review my resume.",
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

  return (
    <div className="bg-card rounded-2xl p-8 md:p-10 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-gold">
      {/* Decorative Quote Mark */}
      <span className="block text-6xl md:text-7xl text-gold/30 font-serif leading-none mb-4 select-none">
        "
      </span>

      {/* Hook Quote */}
      <p className="font-heading text-lg md:text-xl text-foreground leading-relaxed mb-4">
        "{testimonial.hook}"
      </p>

      {/* Expandable Full Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-base leading-relaxed mb-4 pt-2 border-t border-border">
              {testimonial.full}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer: Name + Read More */}
      <div className="flex items-center justify-between mt-4">
        <p className="font-bold text-foreground text-base">{testimonial.name}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-gold hover:text-gold/80 transition-colors text-sm font-medium"
        >
          {isExpanded ? "Read less" : "Read more"}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      </div>
    </div>
  );
};

const TestimonialsSection = ({
  title = "What Clients Say",
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-muted">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          {title}
        </h2>

        <div className="flex flex-col gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
