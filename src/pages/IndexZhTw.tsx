import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import GoldCheckBadge from "@/components/GoldCheckBadge";

const IndexZhTw = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist signup:", email);
    setEmail("");
  };

  const navLinks = [
    { href: "#about", label: "關於我" },
    { href: "#testimonials", label: "客戶評價" },
    { href: "#results", label: "成果" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation - Executive Green */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-executive-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-cream-70 hover:text-cream transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <LanguageToggle variant="nav" />
            </div>
            <div className="hidden md:flex items-center gap-3">
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
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </nav>

      {/* Hero Section - Waitlist Lead Magnet */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 animate-fade-up leading-tight">
            加入等候名單：免費履歷健檢
          </h1>
          <p className="text-gold font-semibold text-lg md:text-xl mb-6 animate-fade-up-delay">
            （價值 $200 美元 - 名額有限）
          </p>
          <p className="text-base md:text-lg text-foreground mb-2 animate-fade-up-delay">
            我在 Uber 擔任招募人員，已經審閱過<span className="font-bold">超過 20,000 份履歷</span>。
          </p>
          <p className="text-base md:text-lg text-foreground mb-8 animate-fade-up-delay">
            目前我的預約已滿，但你可以加入等候名單，一有空位我就會通知你。
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-8 text-left max-w-xl mx-auto animate-fade-up-delay-2">
            <p className="text-foreground mb-4 font-medium">說實話：我真的很忙。</p>
            <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
              我在 Uber 有全職工作，同時也在經營這個事業。我沒辦法審閱每一份履歷。
            </p>
            <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
              但我知道那種感覺。你投了 50 份履歷，卻石沉大海。
            </p>
            <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
              所以我決定這樣做：加入免費履歷健檢的等候名單。當我有時間時，我會主動聯繫你。先到先得。
            </p>
            <p className="text-foreground font-medium mb-3">你會獲得：</p>
            <ul className="space-y-2 mb-0">
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>讓招募人員主動聯繫你的精準修改建議</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>來自每天在 Uber 審閱履歷的人的實用技巧</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>來自財富 500 強公司現役招募人員的真實回饋</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-up-delay-2">
            <Input
              type="email"
              placeholder="您的電子郵件地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 md:h-12 bg-card border-border rounded-lg text-base px-4 flex-1"
              required
            />
            <Button type="submit" className="h-12 md:h-12 px-8 rounded-lg btn-gold font-medium uppercase tracking-wider text-sm w-full sm:w-auto">
              加入等候名單
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 animate-fade-up-delay-2">
            你的資訊絕對保密。我不會發垃圾郵件。絕對不會。
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section id="about" className="py-16 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
            嗨，我是 James
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                我是台灣 <span className="font-bold">Uber 的資深招募人員</span>。
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                我已經錄用超過 <span className="font-bold">500 人</span>，審閱過超過 <span className="text-gold font-bold">20,000 份履歷</span>。
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                我清楚知道什麼會讓人被刷掉，什麼會讓人脫穎而出。
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                我不教理論。我教的是真正有效的方法。
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                我在台灣當了好幾年英文老師，後來轉入科技業招募領域。我希望能幫助更多人透過找到理想工作來實現他們的目標。
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-10 md:h-9">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-10 md:h-9">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </Button>
                </a>
                <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-10 md:h-9">
                    <ThreadsIcon className="w-4 h-4" /> Threads
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <img
                  src={jamesPhoto}
                  alt="James Bugden - 職涯教練"
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
            客戶怎麼說
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote: "回饋非常實用又有幫助。我現在正在投遞履歷，從指南中學到超多。謝謝！",
                name: "Julie"
              },
              {
                quote: "James 的回饋直接又切中要點。他幫我找到了我自己看不到的盲點。我根據他的建議用 AI 工具修改履歷，效果非常驚人。",
                name: "Cynthia"
              },
              {
                quote: "這份健檢報告超級清楚。每個部分都有說明、好的範例和不好的範例。看到履歷修改前後的對比，差異太大了。專業很多。",
                name: "Lichen"
              },
              {
                quote: "James 從招募人員的角度審閱我的履歷。他讓我知道用人主管真正在乎什麼。他不只告訴我哪裡有問題，還示範怎麼改、為什麼要這樣改。即使我已經改過履歷 10 幾次，還是學到超多。",
                name: "Monica"
              },
              {
                quote: "我很驚訝 James 的報告有多詳細。連我 HR 的朋友都給不了這麼深入的回饋。他真的非常專業又細心。",
                name: "David"
              },
              {
                quote: "謝謝這麼詳細的健檢報告。你幫我找到好幾個我不知道的盲點。你對於標題格式、加強開頭、還有清楚呈現職稱的建議都超有幫助。",
                name: "Sunny"
              }
            ].map((testimonial, i) => (
              <div key={i} className="testimonial-card p-6 md:p-8 border-t-2 border-t-accent">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <GoldCheckBadge key={j} />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed text-sm md:text-base">
                  「{testimonial.quote}」
                </p>
                <div>
                  <p className="font-medium text-foreground">— {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Results Section - Updated Stats */}
      <section id="results" className="py-16 md:py-24 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-12 md:mb-16">
            數據說話
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold-gradient mb-2">20,000+</p>
              <p className="text-sm md:text-base text-muted-foreground">審閱過的履歷</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold-gradient mb-2">500+</p>
              <p className="text-sm md:text-base text-muted-foreground">成功錄用人數</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold-gradient mb-2">22K+</p>
              <p className="text-sm md:text-base text-muted-foreground">LinkedIn + Threads 社群</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-executive-green relative border-t border-cream/10">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl text-cream mb-6">
            準備好提升了嗎？
          </h2>
          <p className="text-cream-90 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
            你等待的每一週都是你留在桌上的錢。讓我們來改變這個狀況。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 btn-gold font-medium text-base uppercase tracking-wider w-full sm:w-auto">
              與我合作
            </Button>
            <Button size="lg" className="h-14 px-10 btn-secondary-blur font-medium text-base uppercase tracking-wider w-full sm:w-auto">
              獲取免費建議
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
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
