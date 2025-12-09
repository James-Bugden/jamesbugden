import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Check } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";

const IndexZhTw = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation - Executive Green */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-executive-green">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-cream-70 hover:text-cream transition-colors">服務項目</a>
            <a href="#about" className="text-sm text-cream-70 hover:text-cream transition-colors">關於我</a>
            <a href="#results" className="text-sm text-cream-70 hover:text-cream transition-colors">成果</a>
            <a href="#newsletter" className="text-sm text-cream-70 hover:text-cream transition-colors">電子報</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle variant="nav" />
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Email Signup First */}
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-up leading-tight">
            5分鐘<br />可能改變你的職涯
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-2 animate-fade-up-delay">
            <span className="text-gold font-semibold">12,847+ 專業人士</span>已經提升了他們的職涯。
          </p>
          <p className="text-lg md:text-xl text-foreground mb-8 animate-fade-up-delay">
            下一個會是你嗎？
          </p>
          <p className="text-muted-foreground mb-8 animate-fade-up-delay-2">
            每週二直接收到與數千名有抱負的專業人士分享的職涯策略。
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-up-delay-2">
            <Input
              type="email"
              placeholder="您的電子郵件地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-card border-border rounded-lg text-base px-4 flex-1"
              required
            />
            <Button type="submit" className="h-12 px-8 rounded-lg bg-foreground hover:bg-foreground/90 text-white font-medium uppercase tracking-wider text-sm border-2 border-foreground">
              立即訂閱
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 italic animate-fade-up-delay-2">
            您的資訊受到保護，我絕不會發送垃圾郵件。
          </p>
        </div>
      </section>

      {/* About Section with Photo */}
      <section id="about" className="py-20 px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center mb-16">
            嗨，我是 James
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                我已經幫助超過 <span className="font-bold">500 位專業人士</span>談判了<span className="text-gold font-bold">超過 1200 萬美元的額外薪酬</span>。我曾在財富 500 強公司擔任面試官和求職者兩種角色，我清楚知道什麼會讓候選人被淘汰——以及什麼會讓他們無法抗拒。
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-8">
                我的客戶在 Google、Amazon、Meta、Goldman Sachs、McKinsey 以及你能想到的每一家大型科技公司都獲得了職位。我不教理論，我教的是真正有效的方法。
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </Button>
                </a>
                <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40">
                    <ThreadsIcon className="w-4 h-4" /> Threads
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src={jamesPhoto}
                  alt="James Bugden - 職涯教練"
                  className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-none p-10 card-hover border-t-2 border-t-gold border-x-0 border-b-0 shadow-sm">
              <span className="text-gold font-heading text-sm tracking-widest mb-6 block">01</span>
              <h3 className="font-heading text-2xl text-foreground mb-4">打開大門的履歷</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                你的履歷只有 6 秒鐘來打動人心。大多數履歷在 2 秒內就失敗了。我會重建你的履歷，讓它通過 ATS 系統，並讓招聘人員當天就聯繫你。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  ATS 優化格式
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  以成就為導向的重點
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  專為 FAANG 和跨國公司量身定制
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-none p-10 card-hover border-t-2 border-t-gold border-x-0 border-b-0 shadow-sm">
              <span className="text-gold font-heading text-sm tracking-widest mb-6 block">02</span>
              <h3 className="font-heading text-2xl text-foreground mb-4">面試精通</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                別再「祈禱」能得到這份工作。我會告訴你該說什麼、怎麼說，以及如何應對他們拋給你的任何難題。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  帶有反饋的模擬面試
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  STAR 方法框架
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  針對特定公司的策略
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-none p-10 card-hover border-t-2 border-t-gold border-x-0 border-b-0 shadow-sm">
              <span className="text-gold font-heading text-sm tracking-widest mb-6 block">03</span>
              <h3 className="font-heading text-2xl text-foreground mb-4">薪資談判</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                一般人會損失超過 5 萬美元。別做一般人。我會教你像專業人士一樣談判，獲得你真正應得的報酬。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  精確的話術和策略
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  反報價策略
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-gold" />
                  總薪酬優化
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Executive Green Background */}
      <section id="results" className="py-24 px-6 bg-executive-green">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4">
            成果說明一切
          </h2>
          <p className="text-cream-90 text-lg mb-16">
            真實的數據。真實的人。真實的轉變。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">$12M+</p>
              <p className="text-sm text-cream-90">談判獲得的額外薪酬</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">500+</p>
              <p className="text-sm text-cream-90">成功輔導的客戶</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">94%</p>
              <p className="text-sm text-cream-90">面試成功率</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold mb-2">47%</p>
              <p className="text-sm text-cream-90">平均薪資增幅</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center mb-16">
            客戶怎麼說
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "我在 85K 美元卡了 3 年。James 幫我在 Google 談到了 142K 美元。這是 67% 的增長。",
                name: "Sarah M.",
                role: "軟體工程師 → Google"
              },
              {
                quote: "在找 James 之前我面試失敗了 12 次。經過他的輔導後，同時拿到了 Meta 和 Amazon 的 offer。",
                name: "Michael T.",
                role: "產品經理 → Meta"
              },
              {
                quote: "我差點就接受了他們的第一個報價。James 教我如何還價，結果我的總薪酬多了 45K 美元。",
                name: "Jennifer L.",
                role: "數據科學家 → Goldman Sachs"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 border-t-2 border-t-gold shadow-sm">
                <div className="flex gap-1 mb-4 text-gold">★★★★★</div>
                <p className="text-foreground mb-6 leading-relaxed">
                  「{testimonial.quote}」
                </p>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 px-6 border-y border-border bg-card">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-8">
            我的客戶獲得 OFFER 的公司
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-xl md:text-2xl font-medium text-muted-foreground/50">
            <span className="hover:text-foreground transition-colors">Google</span>
            <span className="hover:text-foreground transition-colors">Meta</span>
            <span className="hover:text-foreground transition-colors">Amazon</span>
            <span className="hover:text-foreground transition-colors">Apple</span>
            <span className="hover:text-foreground transition-colors">Microsoft</span>
            <span className="hover:text-foreground transition-colors">Goldman Sachs</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="newsletter" className="py-24 px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
            準備好提升了嗎？
          </h2>
          <p className="text-cream-90 text-lg mb-10 max-w-xl mx-auto">
            你等待的每一週都是你留在桌上的錢。讓我們來改變這個狀況。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 bg-gold hover:bg-gold/90 text-white font-medium text-base uppercase tracking-wider border-2 border-gold">
              與我合作
            </Button>
            <Button size="lg" className="h-14 px-10 bg-transparent border-2 border-gold text-white hover:bg-gold/10 font-medium text-base uppercase tracking-wider">
              獲取免費建議
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. 版權所有。
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexZhTw;
