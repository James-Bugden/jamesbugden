import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";

const SalaryStarterKit = () => {

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/" className="text-sm text-cream-70 hover:text-cream transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            Negotiate 20-30% More at Your Next Offer
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            Word-for-word scripts for every salary conversation
          </p>
          <p className="text-base text-cream/60">
            Copy them. Fill in the blanks. Send.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground text-lg leading-relaxed">
              Here's everything. Every script, every template, every tactic I teach. No paywall, no catch. Use these the next time you're interviewing, reviewing an offer, or preparing for a performance review.
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              If they help, share them with someone who needs them. And when you're negotiating a big move, come find me.
            </p>
            <p className="text-foreground text-lg font-semibold">James</p>
          </div>
        </div>
      </section>

      {/* How to Use This Guide */}
      <section className="py-12 px-5 md:px-6 bg-muted">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">How to Use This Guide</h2>
          <p className="text-foreground mb-6">This guide follows the natural arc of a salary negotiation:</p>
          <ol className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <span><strong>Before the offer:</strong> What to say when they ask about salary</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <span><strong>The moment you get an offer:</strong> The 30-second response that changes everything</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span><strong>Evaluating the full package:</strong> The money hiding inside your offer</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">4</span>
              <span><strong>Sending your counter:</strong> 4 email templates you copy and send</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">5</span>
              <span><strong>When they push back:</strong> Scripts for the 4 most common objections</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">6</span>
              <span><strong>Getting a raise later:</strong> How to build your case from day one</span>
            </li>
          </ol>
          <p className="text-muted-foreground mt-6 italic">
            Everything below uses Taiwan market data (NT$). The scripts work at any level. They work even better when you're prepared.
          </p>
        </div>
      </section>

      {/* Part 1 */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 1: What to Say When They Ask Your Salary</h2>
          <p className="text-foreground mb-6">
            This question comes up in almost every hiring process. How you answer swings your offer by NT$3,000 to 10,000/month. Over a year with bonuses, that's NT$50K to 150K+ you'll never get back.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Why you should never answer directly</h3>
          <p className="text-foreground mb-4">
            The moment you say a number, you've set a ceiling. If their budget was NT$55K/month and you said NT$45K, you cost yourself NT$120,000/year. Before bonuses.
          </p>
          <p className="text-foreground mb-8">
            You might feel like you don't have leverage to deflect. You do. These scripts work at every level because they're professional, not aggressive.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-6">5 Scripts for Every Scenario</h3>

          {/* Script 1 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">① First time they ask</p>
            <p className="text-muted-foreground mb-2">THEM: "Can you share your salary expectations?"</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "Right now, I'm focused on learning more about the role and how I contribute. Compensation is important, but I'd love to understand more about the responsibilities, team, and expectations before discussing specific numbers."
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              This works because you're not dodging. You're redirecting. You sound like someone who cares about the work.
            </p>
          </div>

          {/* Script 2 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">② They push harder</p>
            <p className="text-muted-foreground mb-2">THEM: "We want to make sure we're in the same range."</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "I'd be happy to discuss compensation once we've determined I'm the right fit. What is the salary range for this role?"
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              You flip the dynamic. Now they reveal their budget instead of anchoring you low.
            </p>
          </div>

          {/* Script 3 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">③ They won't budge</p>
            <p className="text-muted-foreground mb-2">THEM: "We need a number to move forward."</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "I'm flexible and open to competitive offers. I know compensation varies based on experience and impact. What range are you targeting for this position?"
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              Notice the pattern: every script ends with a question back to them.
            </p>
          </div>

          {/* Script 4 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">④ You must give a number</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "Based on my research and industry benchmarks, similar roles at this level typically offer a monthly base of NT$[X] to [Y], but I'm open to discussing the full compensation package including bonuses and benefits."
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              Pro tip: Take the monthly salary you'd be happy with and add 10 to 20%. That gives them room to "negotiate you down" to your real target. Frame everything in terms of total annual compensation (年薪). Year-end bonuses add 2 to 4+ months.
            </p>
          </div>

          {/* Script 5 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-gold font-semibold mb-3">⑤ Application requires a number</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              Write "面議" (to be discussed) or "依公司規定" (per company standards). If the field only accepts numbers, enter a range based on market research. Never your current salary.
            </p>
          </div>

          {/* Pattern insight */}
          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-6 mb-6">
            <p className="text-foreground">
              <span className="font-semibold text-gold">💡 The pattern behind every script:</span> Every script ends with a question that sends the conversation back to them. You're not being difficult. You're a professional who does their homework. This works at entry level and executive level equally.
            </p>
          </div>

          <p className="text-foreground">
            <strong>For women:</strong> Don't say "I want." Try "My research shows that this role typically pays..." Citing external data (104人力銀行, Glassdoor) takes the focus off you and onto the market.
          </p>
        </div>
      </section>

      {/* Part 2 */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 2: The 30 Seconds After They Say a Number</h2>
          <p className="text-foreground mb-4">
            You've made it through interviews. They want you. Then HR says:
          </p>
          <p className="text-foreground bg-card p-4 rounded-lg border border-border mb-6 font-medium">
            "We'd like to offer you NT$[X] per month."
          </p>
          <p className="text-foreground mb-8">
            This is the most expensive moment of your career. Most people blow it by saying "好，沒問題！" (you left NT$50 to 150K/year behind) or by panicking and blurting out a random counter.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-6">The 3-Step Offer Response</h3>

          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-3">Step 1: Repeat the number</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">YOU: "NT$[X]..."</p>
              <p className="text-muted-foreground mt-3 text-sm">Say it with a slight tone of thoughtfulness. Not shock. Like you're processing it carefully.</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-3">Step 2: Go silent for 15 to 30 seconds</p>
              <p className="text-foreground">
                This will feel uncomfortable. That's exactly why it works. The recruiter's brain starts working against their own offer. In many cases, they'll add context ("of course, that doesn't include the year-end bonus...") or improve the number before you respond.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-3">Step 3: Respond with enthusiasm plus a question</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                YOU: "Thank you, I'm excited about this opportunity and the team. I'd love to take a day or two to review the full package. Would you send me the complete offer details in writing, including the bonus structure and benefits?"
              </p>
              <p className="text-muted-foreground mt-3 text-sm">That's it. You haven't said yes. You haven't said no. You've bought time to prepare a real counter.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">What NOT to do</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <ul className="space-y-2 text-foreground">
              <li>❌ Say "That sounds great!" You accepted without negotiating.</li>
              <li>❌ Blurt out a counter with no preparation. You sound desperate.</li>
              <li>❌ Say "I currently make NT$X." Anchors you to an irrelevant number.</li>
              <li>❌ Negotiate over the phone or LINE. You lose composure and miss details.</li>
              <li>❌ Feel pressure to answer on the spot. Taking time is normal and expected.</li>
            </ul>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-executive">🔰 Early-career note:</span> You might be thinking: "I'm junior. I don't have leverage to push back." The truth: the company already decided to hire you. They invested time and money in interviews. They don't want to restart the process. That's your leverage. You don't feel it yet. The silence technique works regardless of your experience level because it's not about power. It's about giving yourself time to think.
            </p>
          </div>
        </div>
      </section>

      {/* Part 3 */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 3: The Money Hiding Inside Your Offer</h2>
          <p className="text-foreground mb-4">
            When most people in Taiwan get an offer, they see one number: the monthly base (月薪). They negotiate that, or don't, and move on.
          </p>
          <p className="text-foreground mb-8">
            That's a mistake. Monthly base is one piece of your total annual compensation. Some pieces are easier to negotiate because they don't touch the company's salary structure.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Highest NT$ Impact</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">Monthly Base Salary (本薪)</p>
              <p className="text-muted-foreground">The foundation everything is calculated from. Year-end bonuses, overtime pay, and insurance contributions all use this number. Even NT$3,000/month more means NT$36K/year in base plus higher bonuses on top.</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">Year-End Bonus (年終獎金)</p>
              <p className="text-muted-foreground">The single biggest variable in Taiwan compensation. Legal minimum is half a month. Most tech companies pay 2 to 4 months. Top performers at TSMC, MediaTek, and others see 6 to 10+ months. Always ask: "What was the average year-end bonus for this role last year?"</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">Profit Sharing (員工分紅)</p>
              <p className="text-muted-foreground">At many Taiwan tech companies, this is where the big money sits. Profit sharing at companies like MediaTek or Novatek regularly doubles your effective salary. Ask: "What's the typical profit-sharing payout for this level?"</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">Sign-on Bonus (簽約獎金)</p>
              <p className="text-muted-foreground">Less common for junior roles but increasingly offered. One-time cost to the company. Easier to negotiate than base.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Easier to Win, High Personal Value</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• Meal allowance (伙食津貼) and transportation subsidy</li>
              <li>• Remote work flexibility or compressed schedule</li>
              <li>• Professional development budget (training, conferences, certifications)</li>
              <li>• Accelerated performance review (6 months instead of 12 months)</li>
              <li>• Technology allowance (laptop, phone, home office setup)</li>
              <li>• Group insurance upgrades (團保), including dental, health checkups, family coverage</li>
              <li>• Additional annual leave beyond the Labour Standards Act (勞基法) minimum</li>
            </ul>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6 mb-8">
            <p className="text-foreground mb-4">
              <span className="font-semibold text-executive">🔰 Early-career note: Which items to negotiate first</span>
            </p>
            <p className="text-foreground mb-3">As a junior hire, your strongest negotiation points are:</p>
            <ol className="space-y-2 text-foreground">
              <li><strong>1. Year-end bonus guarantee.</strong> Ask for a guaranteed minimum (e.g., 2 months instead of the vague "depends on performance"). This is effective because it doesn't change your pay grade.</li>
              <li><strong>2. Accelerated review.</strong> "Could we schedule a 6-month review instead of waiting 12 months? I'd love the chance to demonstrate my value sooner." This signals ambition and gives you a faster path to a raise.</li>
              <li><strong>3. Training/development budget.</strong> Companies like investing in new hires. Ask for NT$20,000 to 50,000 for courses, certifications, or conferences. Easy for them to approve, and it makes you grow faster.</li>
            </ol>
            <p className="text-foreground mt-3">Don't negotiate everything at once. Pick one item, get a resolution, then move to the next.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">How to calculate your total compensation</h3>
          <p className="text-foreground mb-4">The formula most people don't know:</p>
          <div className="bg-executive text-cream p-6 rounded-xl mb-6 font-mono text-sm">
            <p>TOTAL ANNUAL COMPENSATION =</p>
            <p className="pl-4">Monthly Base × Guaranteed Months (usually 14)</p>
            <p className="pl-4">+ Year-End Bonus above guarantee</p>
            <p className="pl-4">+ Profit Sharing</p>
            <p className="pl-4">+ Stock / ESPP annual value</p>
            <p className="pl-4">+ Sign-on Bonus (Year 1 only)</p>
            <p className="pl-4">+ (Meal + Transport Allowances) × 12</p>
          </div>

          <p className="text-foreground font-semibold mb-4">Two offers that look the same but aren't:</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What You Get Paid</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Offer A</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Offer B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">Monthly Base</td><td className="px-4 py-3">NT$50,000</td><td className="px-4 py-3">NT$48,000</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">Guaranteed Year-End Bonus</td><td className="px-4 py-3">NT$50,000 (1 month)</td><td className="px-4 py-3">NT$96,000 (2 months)</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Avg. Performance Year-End Bonus</td><td className="px-4 py-3">NT$25,000</td><td className="px-4 py-3">NT$96,000</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">Profit Sharing</td><td className="px-4 py-3">NT$0</td><td className="px-4 py-3">NT$100,000</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Meal Allowance (annual)</td><td className="px-4 py-3">NT$28,800</td><td className="px-4 py-3">NT$28,800</td></tr>
                <tr className="border-t border-border bg-gold text-white font-bold"><td className="px-4 py-3">Total Annual Compensation</td><td className="px-4 py-3">NT$703,800</td><td className="px-4 py-3">NT$896,800</td></tr>
                <tr className="border-t border-border bg-executive text-cream font-bold"><td className="px-4 py-3">Effective Monthly</td><td className="px-4 py-3">NT$58,650</td><td className="px-4 py-3">NT$74,733</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-gold">💡 Key Insight:</span> Offer B pays NT$2,000/month less in base. But it puts NT$193,000 more in your pocket per year. Never compare offers by monthly base alone.
            </p>
            <p className="text-foreground mt-3">
              Ask HR: "What was the average total year-end payout last year?" This tells you the guaranteed plus performance bonus combined.
            </p>
          </div>
        </div>
      </section>

      {/* Part 4 */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 4: The Counteroffer Email</h2>
          <p className="text-foreground mb-8">
            Once you have the written offer, use one of these emails. Four versions for four situations. Pick the one that fits, replace the [brackets], and send.
          </p>

          {/* Version 1 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-heading text-lg text-gold mb-2">Version 1: Standard Counter</h3>
            <p className="text-muted-foreground mb-4 text-sm">Use when: You have one offer and want to negotiate the terms.</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>Subject:</strong> Follow-Up on Offer Discussion</p>
              <p>Hi [HR Name],</p>
              <p>Thank you for the offer. I'm excited about the opportunity to join [Company] and contribute to [team/project].</p>
              <p>After reviewing the offer in detail, I'd like to discuss a few adjustments to better align with market rates and my experience.</p>
              <p>Based on my research through 104人力銀行 and Glassdoor, I was expecting:</p>
              <p><strong>Monthly Base Salary:</strong> NT$[target] to better match the market range for this role and experience level</p>
              <p>I'd like to discuss this and explore what flexibility exists. I'm excited about the team and confident we'll find a package that works for both sides.</p>
              <p>Please let me know a good time to connect.</p>
              <p>Best regards,<br />[Your Name]</p>
            </div>
          </div>

          {/* Version 2 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-heading text-lg text-gold mb-2">Version 2: You Have a Competing Offer</h3>
            <p className="text-muted-foreground mb-4 text-sm">Use when: You have a written offer from another company.</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>Subject:</strong> Follow-Up on Offer, Additional Context</p>
              <p>Hi [HR Name],</p>
              <p>Thank you again for the offer to join [Company]. I'm excited about the role and the team's work on [project].</p>
              <p>I want to be transparent: I've received another offer with a total annual package of approximately NT$[competing TC]. I'm sharing this not as an ultimatum, but because [Company] remains my top choice and I'd like to find a way to make it work.</p>
              <p>Based on the competing offer and market data, I was hoping we could discuss adjusting:</p>
              <p><strong>Monthly Base Salary:</strong> NT$[target] to align the total annual compensation more closely</p>
              <p>I'm confident in the value I'll bring to [team], and I'd like to discuss what flexibility exists so I commit fully to [Company].</p>
              <p>Best regards,<br />[Your Name]</p>
            </div>
          </div>

          {/* Version 3 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-heading text-lg text-gold mb-2">Version 3: Currently Unemployed or Between Jobs</h3>
            <p className="text-muted-foreground mb-4 text-sm">Use when: You don't want your situation to weaken your position.</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>Subject:</strong> Follow-Up on Offer Discussion</p>
              <p>Hi [HR Name],</p>
              <p>Thank you for the offer. I'm excited about the opportunity to bring my experience in [domain] to [Company] and contribute to [team/project].</p>
              <p>After reviewing the full package, I'd like to discuss one adjustment. Based on my research through 104人力銀行, Glassdoor, and conversations with industry peers, the market range for this role is NT$[X] to [Y] per month. Given my track record of [specific achievement with metric], I believe a monthly base of NT$[target] would better reflect the value I'll deliver.</p>
              <p>I'm excited about joining the team and confident we'll find a package that works for both sides.</p>
              <p>Best regards,<br />[Your Name]</p>
            </div>
          </div>

          {/* Version 4 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <h3 className="font-heading text-lg text-gold mb-2">Version 4: First Job Out of School</h3>
            <p className="text-muted-foreground mb-4 text-sm">Use when: You're a recent graduate with limited experience but strong preparation.</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>Subject:</strong> Follow-Up on Offer Discussion</p>
              <p>Hi [HR Name],</p>
              <p>Thank you for the offer. I'm excited about the opportunity to start my career at [Company] and contribute to [team/project].</p>
              <p>After reviewing the offer, I'd like to discuss the package. Based on my research through 104人力銀行 and CakeResume, the market range for entry-level [role] positions in [city] is NT$[X] to [Y] per month. Given my [relevant internship / thesis project / certification / skill], I believe NT$[target] would better align with what I'll contribute from day one.</p>
              <p>If the base salary is fixed by pay grade, I'd also like to discuss a guaranteed year-end bonus minimum or an accelerated 6-month performance review.</p>
              <p>I'm eager to join the team and confident we'll find a package that works for both sides.</p>
              <p>Best regards,<br />[Your Name]</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">5 Rules for Every Counteroffer Email</h3>
          <div className="bg-card rounded-xl p-6 border border-border">
            <ol className="space-y-3 text-foreground">
              <li><strong>1. Open with enthusiasm.</strong> They need to know you're not about to walk away.</li>
              <li><strong>2. One ask per email.</strong> Once base is resolved, follow up separately for the next item.</li>
              <li><strong>3. Market data, not personal need.</strong> "Industry benchmarks show..." not "I need to pay rent."</li>
              <li><strong>4. End with an open door.</strong> "I'd like to discuss" not "I need an answer by Friday."</li>
              <li><strong>5. Even if you're happy, ask:</strong> "Are there any areas of the package that have flexibility?" The answer is usually yes.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Part 5 */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 5: When They Push Back</h2>
          <p className="text-foreground mb-4">
            You sent the counteroffer. Then HR says something like: "This is the standard package for this level."
          </p>
          <p className="text-foreground mb-8">
            Most people hear that and think it's over. It usually isn't.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-6">The 4 Most Common Pushback Lines</h3>

          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">① "This is the standard offer for this level." (這是這個職等的標準薪資)</p>
              <p className="text-muted-foreground mb-3 text-sm">Translation: Base is locked to a pay grade. But bonuses and review timing usually aren't.</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                YOU: "I understand the pay structure. If the monthly base is firm, is there flexibility on the guaranteed year-end bonus or the timing of my first performance review? An earlier review would give me a chance to demonstrate my value sooner."
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">② "We don't have the budget." (我們的預算有限)</p>
              <p className="text-muted-foreground mb-3 text-sm">Translation: Base budget is locked. But sign-on bonuses and training budgets often come from different budgets.</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                YOU: "I understand budget constraints. I also know that similar roles at comparable companies are offering packages in the NT$[X to Y] range. If the base is firm, is there room to adjust the year-end guarantee or add a training budget?"
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">③ "This is already a competitive offer." (這已經是很有競爭力的條件了)</p>
              <p className="text-muted-foreground mb-3 text-sm">Translation: "Competitive" means in the range. It doesn't mean at the top.</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                YOU: "I agree it's a strong offer, and I appreciate it. Based on market data for this role, I was expecting something closer to NT$[X]/month. I'd like to work together to find a package that reflects that."
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">④ "We need to maintain internal equity." (我們需要維持內部公平性)</p>
              <p className="text-muted-foreground mb-3 text-sm">Translation: Pay grades are rigid. Non-salary components are your negotiation space.</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                YOU: "That makes complete sense. Since internal equity is important, could we look at a guaranteed 2-month year-end bonus or an accelerated review cycle? Those wouldn't affect the salary structure but would help align the total package."
              </p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Competing Offer Script</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "I want to be transparent. I've received another offer with a strong package. [Company] remains my top choice. Is there flexibility to adjust the offer to align more closely?"
            </p>
            <p className="text-muted-foreground mt-3 text-sm">No ultimatum, no threat. You're giving them a reason to move while making it clear you want to be there.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Deadline Extension Script</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "I appreciate the offer and I'm excited about the opportunity. Making a career decision is important to me. Would it be possible to extend the deadline by one week so I evaluate properly?"
            </p>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-executive">🔰 Early-career note:</span> As a junior candidate, you might feel like pushing back is risky. It's not. Rescinding offers because someone negotiated politely almost never happens. Recruiters expect negotiation. And if a company rescinds because you asked a professional, data-backed question, that tells you everything you need to know about the culture.
            </p>
            <p className="text-foreground mt-3">
              The real risk is not negotiating. That first salary sets the baseline for every raise, bonus, and future offer for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Part 6 */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 6: Getting a Raise, Starting From Day One</h2>
          <p className="text-foreground mb-4">
            The first 5 parts were about negotiating a new offer. But most of your career earnings come from what happens after you're hired.
          </p>
          <p className="text-foreground mb-8">
            The uncomfortable truth: your manager is not thinking about your salary. Good performance does not automatically equal more money. Especially in Taiwan's annual review cycles. You have to build the case. The best time to start is your first week.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">The 5-Minute Friday Habit</h3>
          <p className="text-foreground mb-4">Every Friday at 4:30 PM, spend 5 minutes writing down what you accomplished that week. Be specific:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">❌ Vague</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">✅ Specific</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">Worked on the project</td><td className="px-4 py-3">Shipped user authentication module, 3 days ahead of deadline</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">Had meetings</td><td className="px-4 py-3">Led cross-team sync that resolved a 2-week blocker on API integration</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Helped a colleague</td><td className="px-4 py-3">Mentored junior dev through first code review. She now reviews independently</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">Did sales stuff</td><td className="px-4 py-3">Closed NT$800K deal with [Client]. Shortest sales cycle this quarter</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Fixed bugs</td><td className="px-4 py-3">Resolved P1 production outage in 45 minutes. Affected 12K users</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-foreground mb-4">Track each entry in a simple log:</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Achievement</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Impact / Metric</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">_______</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">💰 ⚡ 👥 💡</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">_______</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">💰 ⚡ 👥 💡</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">_______</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">💰 ⚡ 👥 💡</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">Categories: 💰 Revenue. ⚡ Efficiency. 👥 Leadership. 💡 Innovation.</p>
          <p className="text-foreground mb-8">In 6 months you'll have 120+ documented achievements. More evidence than 99% of people bring to a raise conversation.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">Make Your Work Visible (2 to 3 months before asking)</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• Send your manager brief updates when you hit milestones: "Quick update: the new module went live, cutting processing time by 35%."</li>
              <li>• Volunteer for presentations or cross-team projects.</li>
              <li>• If you've automated something, trained someone, or saved money, make sure your manager knows.</li>
            </ul>
            <p className="text-muted-foreground mt-4 text-sm italic">This isn't bragging (自吹自擂). This is making sure the decision-maker has the information they need when budget time comes.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Time It Right</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• Right after a major accomplishment (when impact is most visible).</li>
              <li>• When your responsibilities have expanded beyond your original role.</li>
              <li>• 1 to 2 months before annual reviews (most Taiwan companies review in Q4, adjustments in January).</li>
              <li>• After your manager has publicly acknowledged your results.</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The Raise Script</h3>
          <p className="text-foreground mb-2">Don't say: "I think I deserve a raise because I've been working hard."</p>
          <p className="text-foreground mb-4">Say this:</p>
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-foreground bg-muted p-4 rounded-lg">
              YOU: "Over the past [timeframe], I've [specific achievements with numbers]. Based on market data from 104人力銀行 and Glassdoor, comparable roles are compensating at NT$[X to Y]/month. I'd like to discuss adjusting my compensation to reflect my contributions and align with market rates."
            </p>
          </div>
          <p className="text-foreground mb-4">This works because you're speaking in terms your manager repeats to their manager. You're giving them the case to take upstairs, not making a personal plea.</p>
          <p className="text-foreground mb-8">
            <strong>Taiwan-specific tip:</strong> If your company has a rigid pay grade system, ask for a level/title promotion instead of a salary increase. This opens a higher pay band entirely.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">If They Say No</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-foreground bg-muted p-4 rounded-lg mb-4">
              YOU: "I understand. What specific goals or milestones would need to be met for a compensation adjustment at the next review cycle? I'd like to make sure we're aligned."
            </p>
            <p className="text-foreground">Get their answer in writing. This creates accountability.</p>
            <p className="text-foreground mt-3">If salary is frozen, shift to: additional annual leave, training budget, flexible work, title change, or guaranteed bonus improvement. These usually sit outside the freeze.</p>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6">
            <p className="text-foreground mb-3">
              <span className="font-semibold text-executive">🔰 Early-career note: Your first raise</span>
            </p>
            <p className="text-foreground">
              Your first raise is the hardest to ask for and the most important to get. The earlier you establish that you negotiate, the more your compensation compounds over your career. A NT$5,000/month raise in year 1 equals NT$60K/year. But with bonuses calculated on base, it's closer to NT$80 to 100K/year. Over a decade, that one conversation is worth NT$800K to 1M+.
            </p>
            <p className="text-foreground mt-3 font-semibold">
              Start the achievement log on day one. Not when you "feel ready." Not when you've "proven yourself." Day one.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Quick Reference: All Scripts on One Page</h2>
          <p className="text-muted-foreground mb-8">Save this section to your phone for real-time reference during calls.</p>

          <h3 className="font-heading text-lg text-foreground mb-4">Deflecting Salary Questions</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Situation</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Say This</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">First time asked</td><td className="px-4 py-3">"I'd love to understand more about the role before discussing numbers."</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">They push</td><td className="px-4 py-3">"What is the salary range for this role?"</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Won't budge</td><td className="px-4 py-3">"I'm flexible. What range are you targeting?"</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">Must give a number</td><td className="px-4 py-3">"Based on benchmarks, NT$[X] to [Y], but I'm open to the full package."</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Written application</td><td className="px-4 py-3">Write "面議" or use a market-researched range</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">Responding to an Offer</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Step</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">1</td><td className="px-4 py-3">Repeat: "NT$[X]..." (thoughtful tone)</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">2</td><td className="px-4 py-3">Silence: 15 to 30 seconds</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">3</td><td className="px-4 py-3">"I'm excited. Would you send the full offer in writing?"</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">Handling Pushback</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">They Say</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">You Say</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">"Best we can do"</td><td className="px-4 py-3">"If base is firm, is there flexibility on bonus or review timing?"</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">"No budget"</td><td className="px-4 py-3">"Is there room on year-end guarantee or sign-on?"</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">"Already competitive"</td><td className="px-4 py-3">"I was expecting closer to NT$[X] based on market data."</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">"Internal equity"</td><td className="px-4 py-3">"Could we look at guaranteed bonus or accelerated review?"</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">One Last Thing</h2>
          <p className="text-foreground mb-4">
            Every script in this guide works. I know because I've watched people use them. Across industries, experience levels, and company types. The only thing that doesn't work is not trying.
          </p>
          <p className="text-foreground mb-8">
            If this guide helped you, share it with a friend who's job hunting or preparing for a review. If you want to work together, when you're negotiating a move where the stakes are high and you want someone in your corner, you know where to find me.
          </p>
          <p className="text-foreground font-semibold mb-8">James</p>
          <p className="text-muted-foreground italic text-sm">
            This guide was created for people I want to help but am not able to work with right now. It contains the same frameworks, scripts, and templates I use in paid coaching sessions. No strings attached.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">Ready to Negotiate Your Next Offer?</h2>
          <p className="text-cream-90 mb-6">Get the complete Salary Negotiation Toolkit with interactive templates.</p>
          <Link to="/toolkit">
            <Button className="btn-gold px-8 py-3 h-auto">
              View Full Toolkit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground text-sm">
            From the Salary Negotiation Guide by{" "}
            <Link to="/" className="text-gold hover:underline">James Bugden</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SalaryStarterKit;
