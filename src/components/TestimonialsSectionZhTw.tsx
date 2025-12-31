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
    quote: "回饋超實用，從指南學到超多！",
    name: "Julie",
    photo: juliePhoto
  },
  {
    quote: "直接找到盲點，用 AI 工具照建議修改，效果驚人。",
    name: "Cynthia",
    photo: cynthiaPhoto
  },
  {
    quote: "詳細又有洞見，幫我找到不知道的盲點，標題格式和開頭建議都超有幫助。",
    name: "Sunny",
    photo: sunnyPhoto
  },
  {
    quote: "說明清楚，有好壞範例對比，前後差異太大了，專業很多。",
    name: "Lichen",
    initial: "L",
    initialBg: "bg-purple-100"
  },
  {
    quote: "比我 HR 朋友和獵頭都詳細，非常專業細心。",
    name: "David",
    initial: "D",
    initialBg: "bg-amber-50"
  }
];

const featuredTestimonial: Testimonial = {
  quote: "從招募人員角度審閱履歷，讓我知道用人主管真正在乎什麼。",
  pullQuote: "不只告訴我哪裡有問題，還示範怎麼改、為什麼要這樣改。",
  name: "Monica",
  photo: monicaPhoto
};

const TestimonialsSectionZhTw = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          客戶怎麼說
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
                「{featuredTestimonial.quote}」
              </p>
              
              {/* Pull Quote */}
              <div className="bg-accent/10 rounded-lg p-4 mb-6">
                <p className="text-foreground text-base md:text-lg font-medium leading-relaxed">
                  「{featuredTestimonial.pullQuote}」
                </p>
              </div>
              
              <p className="text-foreground leading-relaxed mb-6">
                「即使我已經改過履歷 10 幾次，還是學到超多。」
              </p>
              
              {/* Attribution */}
              <div className="text-center">
                <p className="font-bold text-foreground text-lg">{featuredTestimonial.name}</p>
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
                    「{testimonial.quote}」
                  </p>
                  
                  {/* Attribution */}
                  <div className="text-center">
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                  </div>
                </div>
              ))}
              
              {/* Sunny - spans both columns */}
              <div className="sm:col-span-2 bg-card rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Initial Circle */}
                <div className="flex justify-center mb-4">
                  <div className={`w-[60px] h-[60px] rounded-full ${testimonials[4].initialBg} flex items-center justify-center border-2 border-gold`}>
                    <span className="text-xl font-bold text-foreground">{testimonials[4].initial}</span>
                  </div>
                </div>
                
                {/* Quote */}
                <p className="text-foreground text-sm md:text-base leading-relaxed mb-4 text-center max-w-xl mx-auto">
                  「{testimonials[4].quote}」
                </p>
                
                {/* Attribution */}
                <div className="text-center">
                  <p className="font-bold text-foreground">{testimonials[4].name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionZhTw;
