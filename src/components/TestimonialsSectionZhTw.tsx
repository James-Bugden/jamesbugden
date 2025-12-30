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
    keyResult: "找到我自己看不到的盲點",
    quote: "James 的回饋直接又切中要點。他幫我找到了我自己看不到的盲點。效果非常驚人。",
    name: "Cynthia",
    photo: cynthiaPhoto
  },
  {
    keyResult: "比自己改 10 幾次還學到更多",
    quote: "James 從招募人員的角度審閱我的履歷。他讓我知道用人主管真正在乎什麼。",
    name: "Monica",
    photo: monicaPhoto
  },
  {
    keyResult: "比 HR 朋友的回饋還專業",
    quote: "我很驚訝 James 的報告有多詳細。連我 HR 的朋友和獵頭都給不了這麼深入的回饋。",
    name: "David",
    initial: "D",
    initialBg: "bg-amber-50"
  },
  {
    keyResult: "清楚說明什麼才是重點",
    quote: "你幫我找到好幾個重要盲點。對於標題格式、加強開頭的建議都超有幫助。",
    name: "Sunny",
    photo: sunnyPhoto
  }
];

interface TestimonialsSectionZhTwProps {
  title?: string;
}

const TestimonialsSectionZhTw = ({ title = "客戶怎麼說" }: TestimonialsSectionZhTwProps) => {
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
                「{testimonial.keyResult}」
              </p>
              
              {/* Trimmed Quote - 2-3 sentences */}
              <p className="text-foreground text-sm md:text-base leading-relaxed text-center mb-6 max-w-[45ch] mx-auto">
                「{testimonial.quote}」
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

export default TestimonialsSectionZhTw;
