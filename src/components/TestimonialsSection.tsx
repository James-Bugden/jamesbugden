import monicaPhoto from "@/assets/testimonials/monica.jpg";
import juliePhoto from "@/assets/testimonials/julie.jpeg";
import cynthiaPhoto from "@/assets/testimonials/cynthia.jpeg";
import sunnyPhoto from "@/assets/testimonials/sunny.jpeg";

interface Testimonial {
  quote: string;
  pullQuote?: string;
  name: string;
  photo?: string;
  initial?: string;
  initialBg?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The feedback was super practical and useful. I'm applying now and learning so much from the guide. Thank you!",
    name: "Julie",
    photo: juliePhoto
  },
  {
    quote: "James's feedback was direct and hit every point. He helped me find blind spots I missed. I used AI tools to fix my resume based on his review. The results were amazing.",
    name: "Cynthia",
    photo: cynthiaPhoto
  },
  {
    quote: "Thank you for the detailed and insightful review. You helped me identify several important blind spots I didn't know about. Your guidance on the header format, strengthening the opening, and presenting a clear professional title was extremely helpful.",
    name: "Sunny",
    photo: sunnyPhoto
  },
  {
    quote: "The review was super clear. Each section had an explanation, good examples, and bad examples. After seeing both versions of my resume, the difference was huge. Way more professional.",
    name: "Lichen",
    initial: "L",
    initialBg: "bg-purple-100"
  },
  {
    quote: "I was shocked by how thorough James was. Even my HR friends and headhunters couldn't give me this level of feedback. He's super professional and detailed.",
    name: "David",
    initial: "D",
    initialBg: "bg-amber-50"
  }
];

const featuredTestimonial: Testimonial = {
  quote: "James reviewed my resume from a recruiter's view. He showed me what hiring managers actually care about.",
  pullQuote: "He didn't just tell me WHAT was wrong. He showed me HOW to fix it and WHY it mattered.",
  name: "Monica",
  photo: monicaPhoto
};

interface TestimonialsSectionProps {
  title?: string;
}

const TestimonialsSection = ({ title = "What Clients Say" }: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          {title}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Featured Testimonial - Monica */}
          <div className="lg:w-[40%]">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative">
              {/* Large decorative quote */}
              <span className="absolute top-6 left-8 text-6xl text-gold/20 font-serif leading-none">"</span>
              
              {/* Photo */}
              <div className="flex justify-center mb-6">
                <img
                  src={featuredTestimonial.photo}
                  alt={featuredTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-[3px] border-gold shadow-md"
                />
              </div>
              
              {/* Quote */}
              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 relative z-10">
                "{featuredTestimonial.quote}"
              </p>
              
              {/* Pull Quote */}
              <div className="bg-accent/10 rounded-lg p-4 mb-6">
                <p className="text-foreground text-base md:text-lg font-medium leading-relaxed">
                  "{featuredTestimonial.pullQuote}"
                </p>
              </div>
              
              <p className="text-foreground leading-relaxed mb-6">
                "Even after fixing my resume 10+ times, I still learned so much."
              </p>
              
              {/* Attribution */}
              <div className="text-center">
                <p className="font-bold text-foreground text-lg">— {featuredTestimonial.name}</p>
              </div>
            </div>
          </div>
          
          {/* Grid Testimonials */}
          <div className="lg:w-[60%]">
            <div className="grid sm:grid-cols-2 gap-6">
              {testimonials.slice(0, 4).map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Photo or Initial */}
                  <div className="flex justify-center mb-4">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gold transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className={`w-[60px] h-[60px] rounded-full ${testimonial.initialBg} flex items-center justify-center border-2 border-gold`}>
                        <span className="text-xl font-bold text-foreground">{testimonial.initial}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-foreground text-sm md:text-base leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Attribution */}
                  <div className="text-center">
                    <p className="font-bold text-foreground">— {testimonial.name}</p>
                  </div>
                </div>
              ))}
              
              {/* Sunny - spans both columns */}
              <div className="sm:col-span-2 bg-card rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Photo */}
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonials[4].photo}
                    alt={testimonials[4].name}
                    className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gold transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Quote */}
                <p className="text-foreground text-sm md:text-base leading-relaxed mb-4 text-center max-w-xl mx-auto">
                  "{testimonials[4].quote}"
                </p>
                
                {/* Attribution */}
                <div className="text-center">
                  <p className="font-bold text-foreground">— {testimonials[4].name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
