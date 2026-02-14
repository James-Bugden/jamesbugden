import { useState, FormEvent } from "react";
import { ClipboardList, Target, DollarSign } from "lucide-react";

const stages = [
  {
    id: "getting-started",
    icon: ClipboardList,
    label: "剛開始準備",
    quote: "我想進外商，但不知道從哪裡開始",
    resource: "招募官的履歷檢查清單",
    description: "當履歷送到我在 Uber 的桌上時，我在前 6 秒會看什麼。",
    cta: "取得清單",
  },
  {
    id: "actively-applying",
    icon: Target,
    label: "正在投履歷",
    quote: "我一直在投履歷，但都沒有收到面試邀約",
    resource: "7 天內部招募課程",
    description: "外商招募官在台灣實際如何尋找和評估候選人。",
    cta: "開始課程",
  },
  {
    id: "got-an-offer",
    icon: DollarSign,
    label: "已拿到 Offer",
    quote: "我拿到了 offer，但不確定該不該接受或如何談判",
    resource: "Offer 決策評估表",
    description: "我提供給候選人的框架，用來客觀評估任何工作機會。別再因為壓力而倉促接受。",
    cta: "取得評估表",
  },
] as const;

type StageId = (typeof stages)[number]["id"];

export default function SelfSegmentationZhTw() {
  const [selected, setSelected] = useState<StageId | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState<StageId | null>(null);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("請輸入有效的電子信箱。");
      return;
    }
    setSubmitted(selected);
    setEmail("");
  };

  const handleSelect = (id: StageId) => {
    setSelected(id);
    setSubmitted(null);
    setEmailError("");
  };

  const selectedStage = stages.find((s) => s.id === selected);

  return (
    <section id="walkthrough" className="py-14 md:py-20 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            你現在在哪個階段？
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            你的下一步取決於你現在的位置。選擇最像你的那個。
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.map((stage, i) => {
            const isSelected = selected === stage.id;
            const isDimmed = selected !== null && !isSelected;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="contents md:block">
                <button
                  type="button"
                  onClick={() => handleSelect(stage.id)}
                  className={`w-full relative text-left rounded-xl border-2 p-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 ${
                    isSelected
                      ? "border-gold bg-card shadow-lg -translate-y-1"
                      : isDimmed
                      ? "border-border bg-card/60 opacity-60"
                      : "border-border bg-card hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isSelected
                          ? "bg-gold text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      階段 {i + 1}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground text-base mb-2">
                    {stage.label}
                  </p>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    「{stage.quote}」
                  </p>
                </button>

                {/* Inline panel — mobile only, shown directly below the selected card */}
                {isSelected && selectedStage && (
                  <div className="md:hidden mt-4">
                    <div className="bg-card border border-border rounded-xl p-6 text-center">
                      {submitted === selected ? (
                        <p className="text-executive-green font-medium text-base">
                          謝謝！請查看你的信箱 🎉
                        </p>
                      ) : (
                        <>
                          <h3 className="font-heading text-xl text-foreground mb-2">
                            {selectedStage.resource}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                            {selectedStage.description}
                          </p>
                          <form
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto flex flex-col gap-3"
                          >
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="輸入你的電子信箱"
                              className="flex-1 h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 text-base"
                            />
                            <input type="hidden" name="stage" value={selectedStage.id} />
                            <button
                              type="submit"
                              className="h-12 px-6 rounded-lg btn-gold text-base font-semibold whitespace-nowrap"
                            >
                              {selectedStage.cta}
                            </button>
                          </form>
                          {emailError && (
                            <p className="text-destructive text-sm mt-2">{emailError}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Panel — desktop only, full width below grid */}
        <div
          className={`hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${
            selectedStage ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          {selectedStage && (
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              {submitted === selected ? (
                <p className="text-executive-green font-medium text-base">
                  謝謝！請查看你的信箱 🎉
                </p>
              ) : (
                <>
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">
                    {selectedStage.resource}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-lg mx-auto">
                    {selectedStage.description}
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="輸入你的電子信箱"
                      className="flex-1 h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 text-base"
                    />
                    <input type="hidden" name="stage" value={selectedStage.id} />
                    <button
                      type="submit"
                      className="h-12 px-6 rounded-lg btn-gold text-base font-semibold whitespace-nowrap"
                    >
                      {selectedStage.cta}
                    </button>
                  </form>
                  {emailError && (
                    <p className="text-destructive text-sm mt-2">{emailError}</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {!selected && (
          <p className="text-center text-sm text-muted-foreground mt-6 animate-pulse flex items-center justify-center gap-2">
            <span className="inline-block text-gold text-lg animate-bounce">☝</span>
            點選最像你的階段
          </p>
        )}
      </div>
    </section>
  );
}
