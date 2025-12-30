import monicaPhoto from "@/assets/testimonials/monica.jpg";
import cynthiaPhoto from "@/assets/testimonials/cynthia.jpeg";
import sunnyPhoto from "@/assets/testimonials/sunny.jpeg";
import juliePhoto from "@/assets/testimonials/julie.jpeg";

interface Testimonial {
  keyResult: string;
  quote: string;
  name: string;
  photo?: string;
  initial?: string;
  initialBg?: string;
}

const testimonials: Testimonial[] = [
  {
    keyResult: "Found blind spots I never knew existed",
    quote: "James's feedback was direct and hit every point. He helped me find blind spots I missed. The results were amazing.",
    name: "Cynthia",
    photo: cynthiaPhoto
  },
  {
    keyResult: "Learned more than from 10+ revisions on my own",
    quote: "James reviewed my resume from a recruiter's view. He showed me what hiring managers actually care about.",
    name: "Monica",
    photo: monicaPhoto
  },
  {
    keyResult: "More professional than my HR friends' feedback",
    quote: "I was shocked by how thorough James was. Even my HR friends and headhunters couldn't give me this level of feedback.",
    name: "David",
    initial: "D",
    initialBg: "bg-amber-50"
  },
  {
    keyResult: "Clear guidance on what actually matters",
    quote: "You helped me identify several important blind spots. Your guidance on the header format and strengthening the opening was extremely helpful.",
    name: "Sunny",
    photo: sunnyPhoto
  }
];

interface TestimonialsSectionProps {
  title?: string;
}

const TestimonialsSection = ({ title = "What Clients Say" }: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-20 md:py-28 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-[40px] md:text-[56px] text-foreground text-center mb-14 md:mb-20 tracking-tight">
          {title}
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Large Circular Photo */}
              <div className="flex justify-center mb-6">
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-[3px] border-gold shadow-md"
                  />
                ) : (
                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${testimonial.initialBg} flex items-center justify-center border-[3px] border-gold shadow-md`}>
                    <span className="text-3xl font-bold text-foreground">{testimonial.initial}</span>
                  </div>
                )}
              </div>
              
              {/* Key Result - Bold Headline */}
              <p className="text-lg md:text-xl font-bold text-foreground text-center mb-4 leading-snug">
                "{testimonial.keyResult}"
              </p>
              
              {/* Trimmed Quote - 2-3 sentences */}
              <p className="text-foreground text-sm md:text-base leading-relaxed text-center mb-6 max-w-[45ch] mx-auto">
                "{testimonial.quote}"
              </p>
              
              {/* Name */}
              <div className="text-center">
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
