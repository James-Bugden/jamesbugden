import monicaPhoto from "@/assets/testimonials/monica.jpg";
import juliePhoto from "@/assets/testimonials/julie.jpeg";
import cynthiaPhoto from "@/assets/testimonials/cynthia.jpeg";
import sunnyPhoto from "@/assets/testimonials/sunny.jpeg";

interface Testimonial {
  headline: string;
  quote: string;
  name: string;
  photo?: string;
  initial?: string;
  initialBg?: string;
}

const testimonials: Testimonial[] = [
  {
    headline: "Showed me what hiring managers actually care about",
    quote: "Reviewed my resume from a recruiter's perspective. Even after fixing my resume 10+ times, I still learned so much.",
    name: "Monica",
    photo: monicaPhoto
  },
  {
    headline: "Super practical feedback - learning so much",
    quote: "The feedback was practical and useful. I'm applying now and the guide has been incredibly helpful.",
    name: "Julie",
    photo: juliePhoto
  },
  {
    headline: "Direct feedback that found my blind spots",
    quote: "James's feedback was direct and hit every point. Used his tips with AI tools — amazing results.",
    name: "Cynthia",
    photo: cynthiaPhoto
  },
  {
    headline: "Found blind spots I didn't know about",
    quote: "Detailed review with clear guidance on formatting and positioning. Extremely helpful.",
    name: "Sunny",
    photo: sunnyPhoto
  }
];

interface TestimonialsSectionProps {
  title?: string;
}

const TestimonialsSection = ({ title = "What Clients Say" }: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-20 md:py-[120px] px-5 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 
          className="font-heading text-foreground text-center mb-16 md:mb-20"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
        >
          {title}
        </h2>
        
        {/* Grid Layout - 2 columns desktop, 1 mobile */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Large Photo */}
              <div className="flex justify-center mb-6">
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover border-3 border-gold shadow-lg"
                  />
                ) : (
                  <div className={`w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full ${testimonial.initialBg} flex items-center justify-center border-3 border-gold shadow-lg`}>
                    <span className="text-3xl font-bold text-foreground">{testimonial.initial}</span>
                  </div>
                )}
              </div>
              
              {/* Headline - Key Result */}
              <h3 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-4 leading-tight">
                "{testimonial.headline}"
              </h3>
              
              {/* Quote */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-center mb-6 max-w-md mx-auto">
                {testimonial.quote}
              </p>
              
              {/* Name */}
              <p className="font-bold text-foreground text-lg md:text-xl text-center">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;