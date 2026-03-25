import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";
import { SEO } from "@/components/SEO";

const exampleWeek = [
  { day: "一", achievement: "交付修訂後的 API 文件給合作團隊", impact: "解除了等了 2 週的 3 個下游整合的阻塞", category: "⚡ 效率" },
  { day: "二", achievement: "完成 [客戶 X] 的續約", impact: "保住 NT$1.2M ARR。加購進階方案（+NT$300K）", category: "💰 營收" },
  { day: "三", achievement: "向部門主管報告 Q4 成果（40 人）", impact: "收到 VP 在後續 email 中的公開肯定", category: "👥 領導力" },
  { day: "四", achievement: "提案並做出線上事故自動警報系統原型", impact: "若採用，預估回應時間減少 60%", category: "💡 創新" },
  { day: "五", achievement: "和初階工程師配對除錯線上問題", impact: "她在當天結束前獨立解決了一個 P1", category: "👥 領導力" },
];

const goodExamples = [
  { bad: "做了專案", good: "交付用戶認證模組，比截止日期提前 3 天" },
  { bad: "開了會", good: "主持跨團隊同步會議，解決了 API 整合的 2 週阻塞" },
  { bad: "幫了同事", good: "帶新人做第一次 code review。她現在獨立 review 了" },
  { bad: "做了業務", good: "成交 [客戶] NT$800K 案子。本季最短銷售週期（18 天）" },
  { bad: "修了 bug", good: "45 分鐘內解決 P1 線上事故。影響 12K 用戶" },
  { bad: "上了課", good: "完成 AWS 解決方案架構師認證。用 VPC 知識降低基礎設施成本" },
];

const categories = [
  { emoji: "💰", name: "營收", desc: "成交案子、產生營收、節省成本、留住客戶" },
  { emoji: "⚡", name: "效率", desc: "節省時間、改善流程、排除瓶頸、建立自動化" },
  { emoji: "👥", name: "領導力", desc: "帶人、簡報、跨團隊協調、招募" },
  { emoji: "💡", name: "創新", desc: "提出新想法、做原型、跑實驗、申請專利" },
];

const AchievementLogZhTw = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyTemplate = () => {
    const templateText = `每週成就記錄表

________ 那週
日 | 成就 | 影響 / 數據 | 類別
一 | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
二 | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
三 | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
四 | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
五 | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡`;

    navigator.clipboard.writeText(templateText);
    setCopied(true);
    toast({ title: "已複製模板！", description: "貼到文件中填寫。" });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = async () => {
    const shared = await nativeShare();
    if (!shared) {
      setShared(true);
      toast({ title: "已複製連結！", description: "分享給需要的人。" });
      setTimeout(() => setShared(false), 2000);
    }
    setTimeout(() => setShared(false), 2000);
  };

  return (
      <div className="min-h-screen bg-background">
        <SEO />
      <ToolkitHeaderZhTw />

      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative print:hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Link to="/zh-tw/toolkit" className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"><ArrowLeft className="w-4 h-4" />返回工具包</Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">每週成就記錄表</h1>
          <p className="text-lg text-cream-90">每週五花 5 分鐘。你職涯中最值得的習慣。</p>
        </div>
      </section>

      <div className="pt-8 print:hidden"><ToolkitNavZhTw currentTemplate="log" /></div>

      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive mb-8">
            <h3 className="font-heading text-lg text-executive mb-4">如何使用</h3>
            <ol className="space-y-2 text-foreground"><li>1. 每週五花 5 分鐘寫下這週的成果</li><li>2. 要具體。用數字、百分比、金額、結果</li><li>3. 加薪的時候，你會有幾個月的書面證據，而不是模糊的記憶</li></ol>
          </div>
        </div>
      </section>

      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xl text-foreground mb-4">填好的範例：2026 年 2 月 3 日那週</h2>
          {/* Desktop table */}
          <div className="hidden md:block bg-muted rounded-xl overflow-hidden shadow-premium print:hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-executive text-cream"><tr><th className="text-left px-4 py-3">日</th><th className="text-left px-4 py-3">成就</th><th className="text-left px-4 py-3">影響 / 數據</th><th className="text-left px-4 py-3">類別</th></tr></thead>
                <tbody>{exampleWeek.map((row, i) => (<tr key={i} className="border-t border-border"><td className="px-4 py-3">{row.day}</td><td className="px-4 py-3">{row.achievement}</td><td className="px-4 py-3">{row.impact}</td><td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${row.category.includes('營收') ? 'bg-green-100 text-green-800' : row.category.includes('效率') ? 'bg-blue-100 text-blue-800' : row.category.includes('領導力') ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>{row.category}</span></td></tr>))}</tbody>
              </table>
            </div>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3 print:hidden">
            {exampleWeek.map((row, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">週{row.day}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.category.includes('營收') ? 'bg-green-100 text-green-800' : row.category.includes('效率') ? 'bg-blue-100 text-blue-800' : row.category.includes('領導力') ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>{row.category}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{row.achievement}</p>
                <p className="text-xs text-muted-foreground">{row.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xl text-foreground mb-4">空白模板：________ 那週</h2>
          {/* Desktop table */}
          <div className="hidden md:block bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left px-4 py-3">日</th><th className="text-left px-4 py-3">成就</th><th className="text-left px-4 py-3">影響 / 數據</th><th className="text-left px-4 py-3">類別</th></tr></thead>
                <tbody>{["一","二","三","四","五"].map((day, i) => (<tr key={i} className="border-t border-dashed border-border"><td className="px-4 py-3">{day}</td><td className="px-4 py-3 text-muted-foreground">_________________________________</td><td className="px-4 py-3 text-muted-foreground">_________________________________</td><td className="px-4 py-3 text-muted-foreground text-xs">☐💰 ☐⚡ ☐👥 ☐💡</td></tr>))}</tbody>
              </table>
            </div>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {["一","二","三","四","五"].map((day, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-dashed border-border space-y-2">
                <span className="text-xs font-bold text-muted-foreground">週{day}</span>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">成就</p>
                  <div className="h-8 border-b border-dashed border-border" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">影響 / 數據</p>
                  <div className="h-8 border-b border-dashed border-border" />
                </div>
                <p className="text-xs text-muted-foreground">☐💰 ☐⚡ ☐👥 ☐💡</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xl text-foreground mb-4">什麼是好的記錄</h2>
          {/* Desktop table */}
          <div className="hidden md:block bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left px-4 py-3 text-destructive">❌ 模糊</th><th className="text-left px-4 py-3 text-gold">✅ 具體</th></tr></thead>
                <tbody>{goodExamples.map((row, i) => (<tr key={i} className="border-t border-border"><td className="px-4 py-3 text-muted-foreground">{row.bad}</td><td className="px-4 py-3">{row.good}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {goodExamples.map((row, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border space-y-2">
                <p className="text-sm text-muted-foreground line-through">❌ {row.bad}</p>
                <p className="text-sm text-foreground font-medium">✅ {row.good}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xl text-foreground mb-4">類別</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (<div key={cat.name} className="bg-card rounded-xl p-4 border border-border"><p className="text-2xl mb-2">{cat.emoji}</p><p className="font-semibold text-foreground">{cat.name}</p><p className="text-muted-foreground text-sm">{cat.desc}</p></div>))}
          </div>
        </div>
      </section>

      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gold/10 rounded-xl p-6 border-l-4 border-gold">
            <h3 className="font-heading text-lg text-gold mb-3">5 分鐘週五習慣</h3>
            <p className="text-foreground">設一個重複的日曆提醒：每週五下午 4:30。標題寫「記成果」。打開這頁，填入這週的那一列，關掉。就這樣。6 個月後你會有 120 條以上的書面成果記錄。比 99% 的人在加薪對話中能拿出的證據都多。</p>
          </div>
        </div>
      </section>

      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.print()} className="bg-executive hover:bg-executive-light text-cream px-6 py-3 h-auto"><Printer className="w-4 h-4 mr-2" />列印</Button>
          <Button onClick={copyTemplate} className="btn-gold px-6 py-3 h-auto">{copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}{copied ? "已複製！" : "複製模板"}</Button>
          <Button onClick={shareUrl} variant="outline" className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto">{shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}{shared ? "已複製連結！" : "分享"}</Button>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default AchievementLogZhTw;