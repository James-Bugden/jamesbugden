import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText, Calculator, MessageSquare, TrendingUp, ClipboardList } from "lucide-react";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import { SEO } from "@/components/SEO";

const templates = [
  {
    id: "T1",
    email: "Email 1",
    title: "閃避話術卡",
    description: "被問薪資期望時，5 套複製貼上的話術",
    href: "/zh-tw/toolkit/scripts",
    icon: MessageSquare,
  },
  {
    id: "T2",
    email: "Email 2",
    title: "Offer 回應話術",
    description: "3 步驟流程圖，用在拿到 offer 的那 30 秒",
    href: "/zh-tw/toolkit/offer-response",
    icon: FileText,
  },
  {
    id: "T3",
    email: "Email 3",
    title: "還價信模板",
    description: "4 封對應不同情境的預寫 email",
    href: "/zh-tw/toolkit/counteroffer",
    icon: FileText,
  },
  {
    id: "T4",
    email: "Email 3",
    title: "年度總薪酬計算表",
    description: "比較 offer 時，看的不只是月薪",
    href: "/zh-tw/toolkit/calculator",
    icon: Calculator,
  },
  {
    id: "T5",
    email: "Email 4",
    title: "回絕應對小抄",
    description: "對方說「沒預算」或「標準條件」時怎麼回",
    href: "/zh-tw/toolkit/pushback",
    icon: MessageSquare,
  },
  {
    id: "T6",
    email: "Email 5",
    title: "加薪準備單",
    description: "把你的論述整理在一頁上，帶進加薪對話",
    href: "/zh-tw/toolkit/raise",
    icon: TrendingUp,
  },
  {
    id: "T7",
    email: "Email 5",
    title: "每週成就記錄表",
    description: "每週五記錄成果，累積加薪籌碼",
    href: "/zh-tw/toolkit/log",
    icon: ClipboardList,
  },
];

const ToolkitIndexZhTw = () => {

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background">
      <ToolkitHeaderZhTw />

      {/* Hero */}
      <section className="bg-executive-green py-16 md:py-24 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
            薪資談判工具包
          </h1>
          <p className="text-lg md:text-xl text-cream-90 max-w-2xl mx-auto">
            7 個免費模板，讓你談薪水更有信心。
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-4">
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Link
                  key={template.id}
                  to={template.href}
                  className="group card-premium bg-card rounded-xl p-6 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-1">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email Series CTA */}
      <section className="pb-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-executive-green rounded-xl p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-3">
                取得完整的 5 封 Email 系列
              </h2>
              <p className="text-cream-90 mb-6 max-w-xl mx-auto">
                這些模板是免費 5 封薪資談判課程的一部分。訂閱即可獲得完整的策略和脈絡。
              </p>
              <Link
                to="/zh-tw"
                className="inline-flex items-center gap-2 btn-gold px-6 py-3 rounded-lg font-semibold"
              >
                免費訂閱
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default ToolkitIndexZhTw;
