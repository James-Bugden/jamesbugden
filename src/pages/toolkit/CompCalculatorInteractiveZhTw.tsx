import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, RotateCcw, Plus, X, Minus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";
import { CalculatorSection } from "@/components/toolkit/calculator/CalculatorSection";
import { CurrencyInput, PercentInput } from "@/components/toolkit/calculator/CurrencyInput";
import { ResultsPanelZhTw } from "@/components/toolkit/calculator/ResultsPanelZhTw";
import { useCompCalculatorZhTw } from "@/components/toolkit/calculator/useCompCalculatorZhTw";
import { VESTING_SCHEDULES_TW, OfferDataTw } from "@/components/toolkit/calculator/types-tw";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useEmailGate } from "@/hooks/useEmailGate";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";
import { SEO } from "@/components/SEO";

function formatNTD(value: number): string {
  if (value === 0) return "NT$0";
  return `NT$${Math.round(value).toLocaleString("en-US")}`;
}

function TipIcon({ text }: { text: string }) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button type="button" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="更多說明">
          <HelpCircle className="w-4 h-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

function RowLabel({ children, tip, isSubtracted }: { children: React.ReactNode; tip?: string; isSubtracted?: boolean }) {
  return (
      <div className="flex items-center gap-2 mb-2">
      {isSubtracted && <Minus className="w-3.5 h-3.5 text-destructive flex-shrink-0" />}
      <label className="text-sm font-medium text-foreground">{children}</label>
      {tip && <TipIcon text={tip} />}
    </div>
  );
}

function useVisibleOffers(offers: OfferDataTw[], isMobile: boolean, mobileTab: number) {
  if (isMobile) {
    const idx = Math.min(mobileTab, offers.length - 1);
    return { visible: [offers[idx]], indices: [idx] };
  }
  return { visible: offers, indices: offers.map((_, i) => i) };
}

const hrQuestions = [
  "這個職級去年的平均年終獎金是幾個月？扣除保障月數之後呢？",
  "這個職級去年的平均員工分紅（現金 + 股票）大約是多少？",
  "員工分紅是每年發一次還是每季？什麼時候發放？",
  "保障年薪是幾個月？",
  "有沒有 RSU 或員工認股計畫？年度價值大約多少？",
  "團保有包含哪些項目？眷屬可以加保嗎？",
  "年假幾天？到職第一年就有嗎？",
  "有簽約獎金或搬遷補助嗎？",
  "有哪些津貼？伙食、交通、住宅、教育訓練、員工旅遊？",
  "多久調薪一次？年度調薪的平均幅度大約多少？",
  "這個職位平均每月加班時數和加班費大約多少？",
];


const howToUseSteps = [
  "先填月薪和保障月數。光這兩個欄位就能看出保障年薪的差距。",
  "展開「股票與分紅」填入員工分紅。在台灣科技業，分紅往往是薪資差距最大的項目。",
  "如果是製造業、半導體廠或有輪班的職位，記得展開「加班/輪班津貼」。這個數字常常被忽略，但年度加起來可能超過 NT$200,000。",
  "最後填「保險、假期與津貼」。團保升級和津貼是容易被忽略的隱藏價值。",
  "比較「每月等效薪資」。這是最直觀的蘋果比蘋果數字，適合用在還價信中。",
  "按「複製摘要」保存比較結果，可直接貼到筆記或還價準備文件中。",
];

const CompCalculatorInteractiveZhTw = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { isUnlocked, unlock } = useEmailGate();
  const {
    offers,
    results,
    updateOffer,
    addOffer,
    removeOffer,
    resetAll,
    loadExample,
    exampleLoaded,
    cascadeInsight,
  } = useCompCalculatorZhTw();

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [mobileTab, setMobileTab] = useState(0);

  const { visible, indices } = useVisibleOffers(offers, isMobile, mobileTab);
  const colCount = visible.length;
  const gridCols = `repeat(${colCount}, 1fr)`;

  const copySummary = useCallback(() => {
    const lines = offers.map((o, i) => {
      const r = results[i];
      return `${o.name || `Offer ${i + 1}`}：第一年 = ${formatNTD(r.year1Total)} | 第二年起 = ${formatNTD(r.year2Total)}`;
    });
    if (offers.length > 1) {
      const best = results.reduce((bi, r, i) => (r.year1Total > results[bi].year1Total ? i : bi), 0);
      const worst = results.reduce((bi, r, i) => (r.year1Total < results[bi].year1Total ? i : bi), 0);
      if (best !== worst) {
        const diff = results[best].year1Total - results[worst].year1Total;
        lines.push(`差距：${offers[best].name} 第一年多 ${formatNTD(diff)}`);
      }
    }
    navigator.clipboard.writeText(`年度總薪酬比較\n\n${lines.join("\n")}`);
    setCopied(true);
    toast({ title: "已複製！", description: "摘要已複製到剪貼簿。" });
    setTimeout(() => setCopied(false), 2000);
  }, [offers, results, toast]);

  const shareUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "已複製連結！", description: "分享給需要的人。" });
    setTimeout(() => setShared(false), 2000);
  }, [toast]);

  const activeOfferIndex = Math.min(mobileTab, offers.length - 1);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SEO />
      <ToolkitHeaderZhTw />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-[1200px] text-center relative z-10">
          <Link to="/zh-tw/toolkit" className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> 返回工具包
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-3">Offer Calculator</h1>
          <p className="text-lg text-cream-90 max-w-2xl mx-auto mb-2">你的 offer 不只是月薪數字。算出完整年薪，才能看見真正的贏家。</p>
          <p className="text-sm text-cream-70">最多比較 3 份 offer，所有欄位即時更新計算結果。</p>
        </div>
      </section>


      <div className="pt-8"><ToolkitNavZhTw currentTemplate="calculator" /></div>

      {/* Calculator */}
      <section className="px-5 md:px-6 pb-8">
        <div className="mx-auto max-w-[1200px]">
          {/* Action bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex gap-2">
              {!exampleLoaded && (
                <button onClick={loadExample} className="text-sm text-gold hover:underline">載入範例資料</button>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={copySummary} variant="outline" size="sm" className="h-9">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "已複製！" : "複製摘要"}
              </Button>
              <Button onClick={shareUrl} variant="outline" size="sm" className="h-9">
                {shared ? <Check className="w-4 h-4 mr-1" /> : <Share2 className="w-4 h-4 mr-1" />}
                分享
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <RotateCcw className="w-4 h-4 mr-1" /> 全部清除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>確定清除所有輸入？</AlertDialogTitle>
                    <AlertDialogDescription>此動作無法復原。</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={resetAll}>全部清除</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Example callout */}
          {exampleLoaded && (
            <div className="mb-6 bg-gold/10 border-l-4 border-gold rounded-r-xl p-4">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-gold">注意：</span> Offer B 的月薪比 Offer A 低 NT$10,000，但因為員工分紅 NT$600,000、加班費 NT$216,000/年、交通津貼和團保升級，Offer B 的年度總薪酬反而高出許多。千萬不要只看月薪數字做決定。
              </p>
            </div>
          )}

          {/* Mobile tab bar */}
          {isMobile && (
            <div className="flex gap-1 bg-muted rounded-lg p-1 mb-6 overflow-x-auto">
              {offers.map((o, i) => (
                <button
                  key={i}
                  onClick={() => setMobileTab(i)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors min-w-0 truncate ${mobileTab === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {o.name || `Offer ${i + 1}`}
                </button>
              ))}
              {offers.length < 3 && (
                <button onClick={addOffer} className="px-3 py-2 text-sm text-gold font-medium rounded-md hover:bg-gold/10 transition-colors flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Column headers (desktop) */}
          {!isMobile && (
            <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: `200px ${gridCols}${offers.length < 3 ? " auto" : ""}` }}>
              <div />
              {offers.map((offer, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={offer.name}
                    onChange={(e) => updateOffer(i, { name: e.target.value })}
                    className="font-semibold text-sm bg-transparent border-b border-dashed border-border focus:border-gold focus:outline-none px-1 py-1 w-full"
                    placeholder={`Offer ${String.fromCharCode(65 + i)}`}
                  />
                  {offers.length > 1 && (
                    <button onClick={() => removeOffer(i)} className="text-muted-foreground hover:text-destructive transition-colors" aria-label="移除">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {offers.length < 3 && (
                <button onClick={addOffer} className="flex items-center gap-1 px-3 py-1 text-sm text-gold hover:bg-gold/10 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> 新增 Offer
                </button>
              )}
            </div>
          )}

          {/* Sections */}
          <div className="space-y-4">
            {/* SECTION 1: 現金薪酬 */}
            <CalculatorSection title="現金薪酬" description="月薪、保障年薪、獎金、簽約金" defaultOpen>
              {/* 每月底薪 */}
              <div>
                <RowLabel tip="Offer 上寫的固定月薪金額。這是所有計算的基礎。">每月底薪（本薪）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.monthlySalary} onChange={(v) => updateOffer(indices[vi], { monthlySalary: v })} placeholder="例：85,000" prefix="NT$" isLarge ariaLabel={`月薪 ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* 保障月數 */}
              <div>
                <RowLabel tip="12 個月 + 保障年終月數。台灣常見為 13-14 個月。">保障月數</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.guaranteedMonths} onChange={(v) => updateOffer(indices[vi], { guaranteedMonths: v })} placeholder="14" prefix="" ariaLabel={`保障月數 ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* 保障年薪 (auto-calculated) */}
              <div>
                <RowLabel tip="月薪 × 保障月數，自動計算。">保障年薪</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <div key={indices[vi]} className="h-12 rounded-lg border border-input bg-muted/50 px-3 flex items-center text-sm font-semibold text-foreground">
                      {formatNTD(offer.monthlySalary * offer.guaranteedMonths)}
                    </div>
                  ))}
                </div>
              </div>

              {/* 年終獎金超出 */}
              <div>
                <RowLabel tip="問 HR：去年這個職級的平均年終，扣除保障月數之後是多少？">年終獎金（超出保障的部分）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.yearEndBonusExtra} onChange={(v) => updateOffer(indices[vi], { yearEndBonusExtra: v })} placeholder="例：170,000" prefix="NT$" ariaLabel={`年終超出 ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* 績效獎金 */}
              <div>
                <RowLabel tip="年度績效獎金。有些公司是固定金額，有些按底薪百分比計算。">績效獎金</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs ${offer.bonusMode === "percent" ? "text-foreground font-medium" : "text-muted-foreground"}`}>依底薪%</span>
                          <Switch checked={offer.bonusMode === "fixed"} onCheckedChange={(checked) => updateOffer(i, { bonusMode: checked ? "fixed" : "percent" })} />
                          <span className={`text-xs ${offer.bonusMode === "fixed" ? "text-foreground font-medium" : "text-muted-foreground"}`}>固定金額</span>
                        </div>
                        {offer.bonusMode === "percent" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-24 flex-shrink-0">
                              <PercentInput value={offer.bonusPercent} onChange={(v) => updateOffer(i, { bonusPercent: v })} placeholder="10" max={200} ariaLabel={`獎金% ${offer.name}`} />
                            </div>
                            {offer.monthlySalary > 0 && offer.bonusPercent > 0 && (
                              <span className="text-xs text-muted-foreground whitespace-nowrap">= {formatNTD(offer.monthlySalary * 12 * offer.bonusPercent / 100)}</span>
                            )}
                          </div>
                        ) : (
                          <CurrencyInput value={offer.bonusFixed} onChange={(v) => updateOffer(i, { bonusFixed: v })} placeholder="例：50,000" prefix="NT$" ariaLabel={`獎金 ${offer.name}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 簽約獎金 */}
              <div>
                <RowLabel tip="入職一次性獎金。部分外商提供。">簽約獎金 (Sign-on Bonus)</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.signOnBonus} onChange={(v) => updateOffer(i, { signOnBonus: v })} placeholder="例：100,000" prefix="NT$" disabled={offer.isCurrentJob} disabledPlaceholder="不適用" ariaLabel={`簽約獎金 ${offer.name}`} />
                        {!offer.isCurrentJob && (
                          <>
                            {!offer.showYear2SignOn ? (
                              <button onClick={() => updateOffer(i, { showYear2SignOn: true })} className="text-xs text-gold hover:underline mt-1">+ 新增第二年簽約金</button>
                            ) : (
                              <div className="mt-2">
                                <label className="text-xs text-muted-foreground">第二年</label>
                                <CurrencyInput value={offer.signOnYear2} onChange={(v) => updateOffer(i, { signOnYear2: v })} placeholder="例：50,000" prefix="NT$" ariaLabel={`第二年簽約金 ${offer.name}`} />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 搬遷補助 */}
              <div>
                <RowLabel tip="搬家補助或到職補貼。若無搬遷則填 0。">搬遷補助</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.relocation} onChange={(v) => updateOffer(indices[vi], { relocation: v })} placeholder="例：50,000" prefix="NT$" disabled={offer.isCurrentJob} disabledPlaceholder="不適用" ariaLabel={`搬遷補助 ${offer.name}`} />
                  ))}
                </div>
              </div>
            </CalculatorSection>

            {/* SECTION 2: 股票與分紅 */}
            <CalculatorSection title="股票與分紅" description="員工分紅、RSU、ESPP、認股權">
              {/* 員工分紅（現金） */}
              <div>
                <RowLabel tip="問 HR：去年這個職級的平均員工分紅（現金部分）是多少？半導體和大型科技公司常有此項。">員工分紅（現金）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.profitSharingCash} onChange={(v) => updateOffer(indices[vi], { profitSharingCash: v })} placeholder="例：400,000" prefix="NT$" ariaLabel={`現金分紅 ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* 員工分紅（股票） */}
              <div>
                <RowLabel tip="部分公司的分紅以股票形式發放。填入估算年度價值。">員工分紅（股票）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.profitSharingStock} onChange={(v) => updateOffer(indices[vi], { profitSharingStock: v })} placeholder="例：200,000" prefix="NT$" ariaLabel={`股票分紅 ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* RSU */}
              <div>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    if (!offer.showRSU) {
                      return (
                        <button key={i} onClick={() => updateOffer(i, { showRSU: true })} className="text-sm text-gold hover:underline text-left">
                          + 新增 RSU{colCount > 1 ? ` (${offer.name})` : ""}
                        </button>
                      );
                    }
                    const vestPcts = offer.vestingSchedule === "自訂" ? offer.customVesting : VESTING_SCHEDULES_TW[offer.vestingSchedule] || [25, 25, 25, 25];
                    return (
                      <div key={i} className="space-y-3 bg-muted/30 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">RSU（限制型股票）{colCount > 1 ? ` — ${offer.name}` : ""}</p>
                          <button onClick={() => updateOffer(i, { showRSU: false, rsuGrant: 0 })} className="text-xs text-muted-foreground hover:text-destructive">移除</button>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">RSU 總授予價值 (NT$)</label>
                          <CurrencyInput value={offer.rsuGrant} onChange={(v) => updateOffer(i, { rsuGrant: v })} placeholder="例：1,200,000" prefix="NT$" ariaLabel={`RSU ${offer.name}`} />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">授予期間</label>
                          <select value={offer.vestingSchedule} onChange={(e) => updateOffer(i, { vestingSchedule: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                            {Object.keys(VESTING_SCHEDULES_TW).map((key) => <option key={key} value={key}>{key}</option>)}
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground">注意：部分外商有 1 年 cliff vesting（第一年 0%，滿一年後才開始授予）。如果你的 offer 有 cliff，請選「自訂」並將第一年設為 0%。</p>
                        {offer.vestingSchedule === "自訂" && (
                          <div className="grid grid-cols-4 gap-2">
                            {[0, 1, 2, 3].map((yi) => (
                              <div key={yi}>
                                <label className="text-xs text-muted-foreground">第{yi + 1}年</label>
                                <PercentInput value={offer.customVesting[yi]} onChange={(v) => { const next = [...offer.customVesting] as [number, number, number, number]; next[yi] = v; updateOffer(i, { customVesting: next }); }} placeholder="25" />
                              </div>
                            ))}
                          </div>
                        )}
                        {offer.rsuGrant > 0 && (
                          <p className="text-xs text-muted-foreground">{vestPcts.map((p, yi) => `第${yi + 1}年：${formatNTD(offer.rsuGrant * p / 100)}`).join(" | ")}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 認股權 */}
              <div>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    if (!offer.showStockOptions) {
                      return (
                        <button key={i} onClick={() => updateOffer(i, { showStockOptions: true })} className="text-sm text-gold hover:underline text-left">
                          + 新增認股權{colCount > 1 ? ` (${offer.name})` : ""}
                        </button>
                      );
                    }
                    const annualVal = Math.max(0, ((offer.optionFMV - offer.optionStrike) * offer.optionShares) / (offer.optionVestingYears || 4));
                    const underwater = offer.optionStrike >= offer.optionFMV && offer.optionShares > 0;
                    return (
                      <div key={i} className="bg-muted/30 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium">認股權{colCount > 1 ? ` (${offer.name})` : ""}</p>
                          <button onClick={() => updateOffer(i, { showStockOptions: false, optionShares: 0 })} className="text-xs text-muted-foreground hover:text-destructive">移除</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><label className="text-xs text-muted-foreground">股數</label><CurrencyInput value={offer.optionShares} onChange={(v) => updateOffer(i, { optionShares: v })} prefix="" placeholder="例：10,000" /></div>
                          <div><label className="text-xs text-muted-foreground">行使價格 (NT$)</label><CurrencyInput value={offer.optionStrike} onChange={(v) => updateOffer(i, { optionStrike: v })} prefix="NT$" placeholder="例：50" /></div>
                          <div><label className="text-xs text-muted-foreground">目前每股市值 (NT$)</label><CurrencyInput value={offer.optionFMV} onChange={(v) => updateOffer(i, { optionFMV: v })} prefix="NT$" placeholder="例：120" /></div>
                          <div>
                            <label className="text-xs text-muted-foreground">授予期間</label>
                            <select value={offer.optionVestingYears} onChange={(e) => updateOffer(i, { optionVestingYears: Number(e.target.value) })} className="w-full h-12 rounded-lg border border-input bg-background px-3 text-sm"><option value={3}>3 年</option><option value={4}>4 年</option><option value={5}>5 年</option></select>
                          </div>
                        </div>
                        {underwater ? <p className="text-xs text-muted-foreground mt-2">目前為水下期權（價值 $0）</p> : annualVal > 0 ? <p className="text-xs text-gold mt-2">預估年度價值：{formatNTD(annualVal)}</p> : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ESPP */}
              <div>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    if (!offer.showESPP) {
                      return <button key={i} onClick={() => updateOffer(i, { showESPP: true })} className="text-sm text-gold hover:underline text-left">+ 新增 ESPP{colCount > 1 ? ` (${offer.name})` : ""}</button>;
                    }
                    const benefit = offer.esppContribution * (offer.esppDiscount / 100);
                    return (
                      <div key={i} className="bg-muted/30 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium">ESPP（員工持股信託）{colCount > 1 ? ` — ${offer.name}` : ""}</p>
                          <button onClick={() => updateOffer(i, { showESPP: false, esppContribution: 0 })} className="text-xs text-muted-foreground hover:text-destructive">移除</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><label className="text-xs text-muted-foreground">年度投入金額 (NT$)</label><CurrencyInput value={offer.esppContribution} onChange={(v) => updateOffer(i, { esppContribution: v })} prefix="NT$" placeholder="例：100,000" /></div>
                          <div><label className="text-xs text-muted-foreground">折扣比例 (%)</label><PercentInput value={offer.esppDiscount} onChange={(v) => updateOffer(i, { esppDiscount: v })} placeholder="15" max={25} /></div>
                        </div>
                        {benefit > 0 && <p className="text-xs text-gold mt-2">年度 ESPP 收益：{formatNTD(benefit)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CalculatorSection>


            {/* SECTION 4: 保險、假期與津貼 */}
            <CalculatorSection title="保險、假期與津貼" description="團保升級、年假、通勤、各類津貼">
              {/* 團保升級 */}
              <div>
                <RowLabel tip="如果公司提供優於基本的團體保險（含牙醫、眷屬、進階健檢等），估算其年度價值。基本團保填 0。">團保升級估算（年度價值）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.insuranceUpgrade} onChange={(v) => updateOffer(indices[vi], { insuranceUpgrade: v })} placeholder="例：15,000" prefix="NT$" ariaLabel={`團保 ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* 伙食津貼 */}
              <div>
                <RowLabel tip="每月伙食津貼金額。">伙食津貼（每月）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.mealAllowanceMonthly} onChange={(v) => updateOffer(i, { mealAllowanceMonthly: v })} placeholder="例：2,400" prefix="NT$" ariaLabel={`伙食 ${offer.name}`} />
                        {offer.mealAllowanceMonthly > 0 && <p className="text-xs text-muted-foreground mt-1">年度：{formatNTD(offer.mealAllowanceMonthly * 12)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 交通津貼 */}
              <div>
                <RowLabel tip="每月交通津貼金額。">交通津貼（每月）</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.transportAllowanceMonthly} onChange={(v) => updateOffer(i, { transportAllowanceMonthly: v })} placeholder="例：3,000" prefix="NT$" ariaLabel={`交通 ${offer.name}`} />
                        {offer.transportAllowanceMonthly > 0 && <p className="text-xs text-muted-foreground mt-1">年度：{formatNTD(offer.transportAllowanceMonthly * 12)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 加班費 / 輪班津貼 */}
              <div>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    if (!offer.showOvertime) {
                      return (
                        <button key={i} onClick={() => updateOffer(i, { showOvertime: true })} className="text-sm text-gold hover:underline text-left">
                          + 新增加班費 / 輪班津貼{colCount > 1 ? ` (${offer.name})` : ""}
                        </button>
                      );
                    }
                    return (
                      <div key={i} className="bg-muted/30 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">加班費 / 輪班津貼（每月）</p>
                          <button onClick={() => updateOffer(i, { showOvertime: false, overtimeMonthly: 0 })} className="text-xs text-muted-foreground hover:text-destructive">移除</button>
                        </div>
                        <CurrencyInput value={offer.overtimeMonthly} onChange={(v) => updateOffer(i, { overtimeMonthly: v })} placeholder="例：15,000" prefix="NT$" ariaLabel={`加班費 ${offer.name}`} />
                        {offer.overtimeMonthly > 0 && <p className="text-xs text-muted-foreground mt-1">年度：{formatNTD(offer.overtimeMonthly * 12)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 年假 */}
              <div>
                <RowLabel tip="每年有薪休假天數。不包含國定假日和病假。">年假天數</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    const ptoVal = offer.ptoDays * (offer.monthlySalary / 30);
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.ptoDays} onChange={(v) => updateOffer(i, { ptoDays: v })} placeholder="例：15" prefix="" ariaLabel={`年假 ${offer.name}`} />
                        {offer.ptoDays > 0 && offer.monthlySalary > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">價值：{formatNTD(ptoVal)}（已含在保障年薪中，不重複計入）</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 其他津貼 */}
              <div>
                <RowLabel tip="合計所有年度福利：員工旅遊、教育訓練、健身、生日禮金等。">其他年度津貼 / 福利</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.otherStipends} onChange={(v) => updateOffer(indices[vi], { otherStipends: v })} placeholder="例：20,000" prefix="NT$" ariaLabel={`其他津貼 ${offer.name}`} />
                  ))}
                </div>
                <Collapsible>
                  <CollapsibleTrigger className="text-xs text-gold hover:underline mt-2 flex items-center gap-1">
                    常見津貼參考 <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                    員工旅遊補助（5,000-15,000）、教育訓練（10,000-50,000）、健身補助（6,000-12,000）、生日禮金（1,000-3,600）
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CalculatorSection>
          </div>
        </div>
      </section>

      {/* Results Panel */}
      <ResultsPanelZhTw offers={offers} results={results} cascadeInsight={cascadeInsight} mobileSelectedIndex={activeOfferIndex} isUnlocked={isUnlocked} onUnlock={unlock} />


      {/* Reference Sections */}
      <section className="px-5 md:px-6 py-8">
        <div className="mx-auto max-w-[1200px] space-y-4">
          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between bg-card rounded-xl px-6 py-4 border border-border hover:bg-muted/50 transition-colors">
              <span className="font-semibold text-foreground">面試時該問 HR 的問題</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-card rounded-b-xl border border-t-0 border-border px-6 py-4">
              <ol className="space-y-2">
                {hrQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    {q}
                  </li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>


          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between bg-card rounded-xl px-6 py-4 border border-border hover:bg-muted/50 transition-colors">
              <span className="font-semibold text-foreground">怎麼使用這個工具</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-card rounded-b-xl border border-t-0 border-border px-6 py-4">
              <ol className="space-y-2">
                {howToUseSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-executive/20 text-executive text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default CompCalculatorInteractiveZhTw;