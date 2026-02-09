import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const emailTemplates = [
  {
    id: "standard",
    label: "Standard",
    whenToUse: "You have one offer and want to negotiate the terms.",
    subject: "Follow-Up on Offer Discussion",
    body: `Hi [HR/Recruiter Name],

Thank you so much for the offer — I'm genuinely excited about the opportunity to join [Company] and contribute to [specific team or project].

After reviewing the offer in detail, I'd love to discuss a few adjustments to better align with market rates and my experience.

Based on my research through Glassdoor, LinkedIn Salary, and industry benchmarks, I was expecting:

• Monthly Base Salary: NT$[your target] to better match the market range for this role and experience level in [city/region]

I'd love to discuss this and explore what flexibility exists. I'm very excited about the team and confident we can find a package that works for both sides.

Please let me know a good time to connect.

Best regards,
[Your Name]`,
    whyItWorks: "Opens with enthusiasm so they know you're not about to walk away. Frames the ask around market data, not personal need. Asks for ONE thing — once base is resolved, you follow up for the next component. Ends with an open door, not an ultimatum.",
  },
  {
    id: "competing",
    label: "Competing Offer",
    whenToUse: "You have a written offer from another company and want this company to match or beat it.",
    subject: "Follow-Up on Offer — Additional Context",
    body: `Hi [HR/Recruiter Name],

Thank you again for the offer to join [Company] — I'm genuinely excited about the role and the team's work on [specific project].

I want to be transparent: I've received another offer with a total annual package of approximately NT$[competing TC]. I'm sharing this not as an ultimatum, but because [Company] remains my top choice and I'd love to find a way to make it work.

Based on the competing offer and market data, I was hoping we could discuss adjusting:

• Monthly Base Salary: NT$[target] to align the total annual compensation more closely

I'm confident in the value I'll bring to [team], and I'd love to discuss what flexibility exists so I can commit fully to [Company].

Best regards,
[Your Name]`,
    whyItWorks: "\"I'm sharing this not as an ultimatum\" removes the threat. Naming them as your top choice gives HR motivation to fight for budget. You're giving them a concrete number to match — which makes their job easier.",
  },
  {
    id: "unemployed",
    label: "Currently Unemployed",
    whenToUse: "You're between jobs and don't want your negotiating position to feel weak.",
    subject: "Follow-Up on Offer Discussion",
    body: `Hi [HR/Recruiter Name],

Thank you so much for the offer — I'm thrilled about the opportunity to bring my [X years] of experience in [domain] to [Company] and contribute to [specific team/project].

After reviewing the full package, I'd love to discuss one adjustment. Based on my research through Glassdoor, LinkedIn Salary, and conversations with industry peers, the market range for this role is NT$[X]–[Y] per month. Given my track record of [specific achievement with metric], I believe a monthly base of NT$[target] would better reflect the value I'll deliver.

I'm very excited about joining the team and confident we can find a package that works for both sides.

Please let me know a good time to connect.

Best regards,
[Your Name]`,
    whyItWorks: "Never mentions being unemployed — that's irrelevant to your market value. Leads with experience and specific results, not your situation. Uses the same market-data framing as the standard version. Your negotiating power comes from what you'll deliver, not where you're coming from.",
  },
  {
    id: "promoted",
    label: "Recently Promoted",
    whenToUse: "You've been promoted or taken on significantly more responsibility, and the new comp doesn't reflect it.",
    subject: "Discussion on Updated Compensation",
    body: `Hi [Manager/HR Name],

Thank you for the opportunity to step into the [new role/title] — I'm excited about the expanded scope and the chance to [specific goal or project].

As I transition into this role, I'd love to discuss aligning my compensation with the increased responsibilities. Over the past [timeframe], I've [specific achievements with metrics], and the new role involves [key new responsibilities].

Based on market data from Glassdoor and LinkedIn Salary, comparable roles at this level in [industry/region] are compensated at NT$[X]–[Y] per month. I'd love to discuss adjusting to NT$[target] to reflect the new scope.

I'm committed to delivering results in this role and would appreciate the chance to align the package accordingly.

Best regards,
[Your Name]`,
    whyItWorks: "Positions the raise as natural alignment with new responsibilities — not a demand. Acknowledges the promotion with gratitude while immediately connecting it to market data. Works for both internal promotions and role expansions that came without a formal title change.",
  },
];

const keyPrinciples = [
  { title: "Open with enthusiasm", text: "They need to know you're not about to walk away" },
  { title: "One ask per email", text: "Once base is resolved, follow up separately for bonus, equity, or benefits. Don't bundle." },
  { title: "Market data, not personal need", text: "\"Industry benchmarks show...\" not \"I have rent to pay\"" },
  { title: "End with an open door", text: "\"I'd love to discuss\" not \"I need an answer by Friday\"" },
  { title: "Even if you're happy with the offer", text: "Ask: \"Are there any areas of the package that have flexibility?\" The answer is usually yes." },
];

const CounterofferEmail = () => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const copyEmail = (template: typeof emailTemplates[0]) => {
    const emailText = `SUBJECT: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(emailText);
    setCopiedId(template.id);
    toast({ title: "Email copied!", description: "Paste it into your email client and fill in the brackets." });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
    setTimeout(() => setShared(false), 2000);
  };

  // Helper to highlight placeholders
  const highlightPlaceholders = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.match(/^\[[^\]]+\]$/)) {
        return (
          <span key={index} className="bg-gold/20 text-gold-dark px-1 rounded font-mono text-sm">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ToolkitHeader />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            The Counteroffer Email
          </h1>
          <p className="text-lg text-cream-90">
            4 versions for 4 situations. Find yours, fill in the blanks, hit send.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNav currentTemplate="T3" />
      </div>

      {/* Email Templates */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent mb-6">
              {emailTemplates.map((template) => (
                <TabsTrigger 
                  key={template.id} 
                  value={template.id}
                  className="flex-1 min-w-[140px] bg-muted text-muted-foreground data-[state=active]:bg-gold data-[state=active]:text-white rounded-lg px-4 py-3"
                >
                  {template.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {emailTemplates.map((template) => (
              <TabsContent key={template.id} value={template.id}>
                <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
                  {/* When to use */}
                  <div className="bg-muted px-6 py-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">When to use:</span> {template.whenToUse}
                    </p>
                  </div>

                  {/* Subject Line */}
                  <div className="bg-executive px-6 py-3">
                    <p className="text-sm text-cream-70">SUBJECT:</p>
                    <p className="text-cream font-mono">{template.subject}</p>
                  </div>

                  {/* Email Body */}
                  <div className="px-6 py-6">
                    <pre className="whitespace-pre-wrap font-sans text-foreground text-sm leading-relaxed">
                      {highlightPlaceholders(template.body)}
                    </pre>
                  </div>

                  {/* Copy Button */}
                  <div className="px-6 pb-4 flex justify-end">
                    <Button 
                      onClick={() => copyEmail(template)}
                      size="sm"
                      className="btn-gold"
                    >
                      {copiedId === template.id ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedId === template.id ? "Copied!" : "Copy Email"}
                    </Button>
                  </div>

                  {/* Why it works */}
                  <div className="bg-executive/5 px-6 py-4 border-t border-border">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-gold">💡 Why this version works:</span> {template.whyItWorks}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Key Principles */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">5 Rules for Every Counteroffer Email</h3>
            <ol className="space-y-4">
              {keyPrinciples.map((principle, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-gold text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{principle.title}</p>
                    <p className="text-muted-foreground text-sm">{principle.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl flex justify-center">
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "Link Copied!" : "Share This Page"}
          </Button>
        </div>
      </section>

      <ToolkitFooter />
    </div>
  );
};

export default CounterofferEmail;
