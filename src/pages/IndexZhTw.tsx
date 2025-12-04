import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Linkedin, MessageCircle } from "lucide-react";
import jamesPhoto from "@/assets/james-bugden.jpg";
import phoneMockup from "@/assets/phone-mockup.png";
import LanguageToggle from "@/components/LanguageToggle";

const IndexZhTw = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wide">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">服務項目</a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">關於我</a>
            <a href="#results" className="text-sm font-medium hover:text-accent transition-colors">成果</a>
            <a href="#newsletter" className="text-sm font-medium hover:text-accent transition-colors">電子報</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a href="https://www.linkedin.com/in/jamesbugden" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://threads.net/@james.careers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Newsletter */}
      <section id="newsletter" className="pt-24 pb-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-12 text-center">
            5分鐘
            <br />
            可能改變你的職涯
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Phone Mockups */}
            <div className="flex justify-center gap-4 -rotate-3">
              {/* Phone 1 */}
              <div className="relative w-40 md:w-48">
                <img src={phoneMockup} alt="" className="w-full" />
                <div className="absolute inset-[8%] top-[3%] bottom-[3%] bg-background rounded-[20px] overflow-hidden p-3 text-left">
                  <p className="text-xs font-bold mb-2">你的下一個突破</p>
                  <p className="text-[8px] text-muted-foreground mb-2">BY JAMES BUGDEN</p>
                  <p className="text-[7px] italic text-muted-foreground mb-2">"每週五分鐘，可能改變你的職涯。"</p>
                  <p className="text-[7px] font-bold mb-1">本週思考</p>
                  <p className="text-[6px] text-muted-foreground leading-relaxed">
                    如果你不選擇如何使用你的時間，別人會替你選擇。如果你不選擇什麼對你重要，別人會替你選擇。
                  </p>
                </div>
              </div>
              
              {/* Phone 2 */}
              <div className="relative w-40 md:w-48 rotate-6 mt-8">
                <img src={phoneMockup} alt="" className="w-full" />
                <div className="absolute inset-[8%] top-[3%] bottom-[3%] bg-background rounded-[20px] overflow-hidden p-3 text-left">
                  <p className="text-xs font-bold mb-2">本週嘗試一件事</p>
                  <p className="text-[6px] text-muted-foreground leading-relaxed mb-3">
                    奪回你的職涯主導權。找出生活中佔據你太多時間的事情，然後拿回一些時間。
                  </p>
                  <p className="text-[7px] font-bold mb-1">上週的突破</p>
                  <p className="text-[6px] italic text-muted-foreground leading-relaxed">
                    「我按照 James 的建議談判，多拿了 100 萬台幣。這是我讀過最棒的郵件。」
                  </p>
                </div>
              </div>
            </div>
            
            {/* Newsletter Form */}
            <div className="text-center lg:text-left">
              <p className="text-xl md:text-2xl mb-6">
                <span className="text-accent font-bold">12,847+ 專業人士</span>已經提升了他們的職涯。下一個會是你嗎？
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                每週二直接收到與數千名有抱負的專業人士分享的職涯策略。
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <Input
                  type="email"
                  placeholder="您的電子郵件地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                  立即訂閱
                </Button>
              </form>
              <p className="text-sm text-muted-foreground italic">
                您的資訊受到保護，我絕不會發送垃圾郵件。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-16">
            嗨，我是 James
          </h2>
          
          <div className="grid md:grid-cols-[1fr,auto] gap-12 items-start">
            {/* Text - left side on desktop, below photo on mobile */}
            <div className="order-2 md:order-1">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                我已經幫助超過 500 位專業人士談判了<strong className="text-foreground">超過 1200 萬美元的額外薪酬</strong>。
                我曾在財富 500 強公司擔任面試官和求職者兩種角色，我清楚知道什麼會讓候選人被淘汰——以及什麼會讓他們無法抗拒。
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                我的客戶在 Google、Amazon、Meta、Goldman Sachs、McKinsey 
                以及你能想到的每一家大型科技公司都獲得了職位。我不教理論，我教的是真正有效的方法。
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="https://www.linkedin.com/in/jamesbugden" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://threads.net/@james.careers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="w-4 h-4" /> Threads
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Photo - right side on desktop, first on mobile */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent rounded-full scale-125 blur-xl"></div>
                <img
                  src={jamesPhoto}
                  alt="James Bugden - 職涯教練"
                  className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              我如何幫助你成功
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              三種方式讓你的職涯軌跡提升 10 倍。選擇你的道路。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Resume */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-bold mb-3">打開大門的履歷</h3>
              <p className="text-muted-foreground mb-6">
                你的履歷只有 6 秒鐘來打動人心。大多數履歷在 2 秒內就失敗了。我會重建你的履歷，讓它通過 ATS 系統，
                並讓招聘人員當天就聯繫你。
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>ATS 優化格式</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>以成就為導向的重點</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>專為 FAANG 和跨國公司量身定制</span>
                </li>
              </ul>
            </div>

            {/* Interview */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                最受歡迎
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">面試精通</h3>
              <p className="text-muted-foreground mb-6">
                別再「祈禱」能得到這份工作。我會告訴你該說什麼、怎麼說，以及如何應對他們拋給你的任何難題。
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>帶有反饋的模擬面試</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>STAR 方法框架</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>針對特定公司的策略</span>
                </li>
              </ul>
            </div>

            {/* Salary Negotiation */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">薪資談判</h3>
              <p className="text-muted-foreground mb-6">
                一般人會損失超過 5 萬美元。別做一般人。我會教你像專業人士一樣談判，獲得你真正應得的報酬。
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>精確的話術和策略</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>反報價策略</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>總薪酬優化</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              成果說明一切
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              真實的數據。真實的人。真實的轉變。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">$12M+</p>
              <p className="text-primary-foreground/70">談判獲得的額外薪酬</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</p>
              <p className="text-primary-foreground/70">成功輔導的客戶</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">94%</p>
              <p className="text-primary-foreground/70">面試成功率</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">47%</p>
              <p className="text-primary-foreground/70">平均薪資增幅</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              別只聽我說
            </h2>
            <p className="text-muted-foreground text-lg">
              來自真正改變職涯的真實故事。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                「我在 85K 美元卡了 3 年。James 幫我在 Google 談到了 142K 美元。
                這是 67% 的增長。他的教練服務投資回報率真的是 100 倍。」
              </p>
              <div>
                <p className="font-bold">Sarah M.</p>
                <p className="text-sm text-muted-foreground">軟體工程師 → Google</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                「在找 James 之前我面試失敗了 12 次。經過他的輔導後，同時拿到了 Meta 和 Amazon 的 offer。
                選擇了 Meta。到現在還不敢相信。」
              </p>
              <div>
                <p className="font-bold">Michael T.</p>
                <p className="text-sm text-muted-foreground">產品經理 → Meta</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                「我差點就接受了他們的第一個報價。James 教我如何還價，結果我的總薪酬多了 45K 美元。
                這是我做過最好的投資。」
              </p>
              <div>
                <p className="font-bold">Jennifer L.</p>
                <p className="text-sm text-muted-foreground">數據科學家 → Goldman Sachs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-8 tracking-wide">
            我的客戶獲得 OFFER 的公司
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-2xl md:text-3xl font-bold text-muted-foreground/50">
            <span>Google</span>
            <span>Meta</span>
            <span>Amazon</span>
            <span>Apple</span>
            <span>Microsoft</span>
            <span>Goldman Sachs</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            你夢想的工作不會自己來申請你
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            你等待的每一週都是你留在桌上的錢，以及錯過的機會。讓我們來解決這個問題。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8">
              與我合作 <ArrowRight className="ml-2" />
            </Button>
            <a href="#newsletter">
              <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                獲取免費每週建議
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-lg font-bold">JAMES BUGDEN</span>
              <p className="text-sm text-muted-foreground mt-1">
                為有抱負的專業人士提供職涯策略
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/jamesbugden" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://threads.net/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} James Bugden. 版權所有。
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexZhTw;
