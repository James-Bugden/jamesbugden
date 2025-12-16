import monicaPhoto from "@/assets/testimonials/monica.jpg";
import juliePhoto from "@/assets/testimonials/julie.jpeg";
import cynthiaPhoto from "@/assets/testimonials/cynthia.jpeg";
import sunnyPhoto from "@/assets/testimonials/sunny.jpeg";

interface Testimonial {
  quote: string;
  pullQuote?: string;
  name: string;
  role: string;
  photo?: string;
  initial?: string;
  initialBg?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "回饋非常實用又有幫助。我現在正在投遞履歷，從指南中學到超多。謝謝！",
    name: "Julie",
    role: "行銷經理",
    photo: juliePhoto
  },
  {
    quote: "James 的回饋直接又切中要點。他幫我找到了我自己看不到的盲點。我根據他的建議用 AI 工具修改履歷，效果非常驚人。",
    name: "Cynthia",
    role: "產品設計師",
    photo: cynthiaPhoto
  },
  {
    quote: "這份健檢報告超級清楚。每個部分都有說明、好的範例和不好的範例。看到履歷修改前後的對比，差異太大了。專業很多。",
    name: "Lichen",
    role: "數據分析師",
    initial: "L",
    initialBg: "bg-purple-100"
  },
  {
    quote: "我很驚訝 James 的報告有多詳細。連我 HR 的朋友和獵頭都給不了這麼深入的回饋。他真的非常專業又細心。",
    name: "David",
    role: "營運主管",
    initial: "D",
    initialBg: "bg-amber-50"
  },
  {
    quote: "謝謝這麼詳細又有洞見的健檢報告。你幫我找到好幾個我不知道的重要盲點。你對於標題格式、加強開頭、還有清楚呈現職稱的建議都超有幫助。",
    name: "Sunny",
    role: "商業分析師",
    photo: sunnyPhoto
  }
];

const featuredTestimonial: Testimonial = {
  quote: "James 從招募人員的角度審閱我的履歷。他讓我知道用人主管真正在乎什麼。",
  pullQuote: "他不只告訴我哪裡有問題，還示範怎麼改、為什麼要這樣改。",
  name: "Monica",
  role: "軟體工程師",
  photo: monicaPhoto
};

const TestimonialsSectionZhTw = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-background">
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
                <p className="font-bold text-foreground text-lg">— {featuredTestimonial.name}</p>
                <p className="text-muted-foreground text-sm">{featuredTestimonial.role}</p>
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
                    <p className="font-bold text-foreground">— {testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
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
                  「{testimonials[4].quote}」
                </p>
                
                {/* Attribution */}
                <div className="text-center">
                  <p className="font-bold text-foreground">— {testimonials[4].name}</p>
                  <p className="text-muted-foreground text-xs">{testimonials[4].role}</p>
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
