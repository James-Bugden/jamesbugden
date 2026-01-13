import { useState, useEffect } from "react";
import { ArrowLeft, Download, Target, Lightbulb, MessageSquare, AlertTriangle, CheckCircle2, Calendar, HelpCircle, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Checklist items with localStorage persistence
const CHECKLIST_STORAGE_KEY = "interview-prep-checklist";

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
}

const checklistItems: ChecklistItem[] = [
  // Pre-Interview
  { id: "research-company", label: "Research company (1 hour)", category: "pre" },
  { id: "info-interviews", label: "Informational interviews (2 hours)", category: "pre" },
  { id: "power-examples", label: "Create 7-10 power examples (1 hour)", category: "pre" },
  { id: "spar-stories", label: "Prepare SPAR stories (1 hour)", category: "pre" },
  { id: "scenario-frameworks", label: "Prepare scenario frameworks (1 hour)", category: "pre" },
  { id: "practice-loud", label: "Practice out loud (1 hour)", category: "pre" },
  { id: "mock-1", label: "Mock interview #1 (1 hour)", category: "pre" },
  { id: "mock-2", label: "Mock interview #2 (1 hour)", category: "pre" },
  { id: "questions-ask", label: "Prepare questions to ask (30 min)", category: "pre" },
  { id: "outfit", label: "Plan outfit (15 min)", category: "pre" },
  // Day-Of
  { id: "review-examples", label: "Review power examples", category: "day" },
  { id: "arrive-early", label: "Arrive 10-15 min early", category: "day" },
  { id: "phone-silent", label: "Phone on silent", category: "day" },
  { id: "printed-resume", label: "Bring printed resume", category: "day" },
  { id: "notebook", label: "Bring notebook", category: "day" },
  { id: "smile", label: "Smile and make eye contact", category: "day" },
  // Online
  { id: "test-internet", label: "Test your internet connection", category: "online" },
  { id: "test-audio", label: "Test audio", category: "online" },
  { id: "test-video", label: "Test video", category: "online" },
  { id: "no-clutter", label: "No clutter in the background", category: "online" },
  { id: "quiet-place", label: "Make sure you are in a quiet place", category: "online" },
  { id: "camera-level", label: "Camera level with your face", category: "online" },
  // Post
  { id: "thank-you", label: "Send thank you email within 24 hours", category: "post" },
  { id: "note-feedback", label: "Note what went well/needs improvement", category: "post" },
  { id: "follow-up", label: "Follow up if no response by their timeline", category: "post" },
];

const InterviewPreparationGuide = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load checked items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when items change
  const handleCheckChange = (id: string, checked: boolean) => {
    const newChecked = { ...checkedItems, [id]: checked };
    setCheckedItems(newChecked);
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(newChecked));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/Interview_Preparation_Guide.pdf';
    link.download = 'Interview_Preparation_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const powerStories = [
    {
      title: "Power Story #1: Leadership",
      skill: "Team leadership and project management",
      story: `"In Q2 2024, I led a cross-functional team of 5 engineers and 2 designers to launch a new mobile app feature. We had a tight 6-week deadline. I organized daily standups, created a shared project tracker, and assigned clear ownership for each milestone.

When we hit a technical blocker in week 4, I reprioritized tasks and brought in a senior engineer to unblock us. We launched on time, and the feature drove a 35% increase in user engagement within the first month."`,
      whyItWorks: "Specific timeline, clear numbers, shows leadership actions, quantified result."
    },
    {
      title: "Power Story #2: Problem-Solving",
      skill: "Analytical thinking and data analysis",
      story: `"At my last company, our customer support costs increased 40% year-over-year, but nobody knew why. I pulled 6 months of ticket data and discovered that 60% of tickets were about the same 3 issues.

I created a simple knowledge base with solutions to those 3 problems and added links to our product interface. Within 3 months, support tickets dropped 28%, saving the company approximately $45K annually. The knowledge base is still being used today."`,
      whyItWorks: "Identified specific problem, shows analytical approach, concrete financial impact, lasting solution."
    },
    {
      title: "Power Story #3: Communication/Stakeholder Management",
      skill: "Working with difficult stakeholders",
      story: `"I was managing a marketing campaign when our biggest client suddenly demanded we change the entire creative direction 1 week before launch. The design team was frustrated because they'd already completed the work.

Instead of pushing back immediately, I scheduled a call with the client to understand their concerns. I discovered they'd received negative feedback from their CEO. I worked with our team to create 3 new options that addressed the CEO's feedback while keeping 70% of our original work.

We presented all options, the client chose one, and we delivered on time. They increased their contract value by 30% the following quarter."`,
      whyItWorks: "Shows diplomacy, problem-solving under pressure, specific actions taken, business outcome."
    }
  ];

  const renderChecklist = (category: string) => {
    const items = checklistItems.filter(item => item.category === category);
    const checkedCount = items.filter(item => checkedItems[item.id]).length;
    
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">
            {checkedCount}/{items.length} completed
          </span>
          {checkedCount === items.length && (
            <span className="text-xs text-gold font-semibold">✓ All done!</span>
          )}
        </div>
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.id} className="flex items-start gap-3">
              <Checkbox
                id={item.id}
                checked={checkedItems[item.id] || false}
                onCheckedChange={(checked) => handleCheckChange(item.id, checked as boolean)}
                className="mt-0.5 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <label
                htmlFor={item.id}
                className={`text-sm cursor-pointer transition-all ${
                  checkedItems[item.id] ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

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
            <button 
              onClick={() => navigate("/zh-tw/interview-preparation-guide")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              中文
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            Interview Preparation Guide
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            Stop Stressing. Start Performing. Get the Job.
          </p>
          <p className="text-base text-cream/60">
            By James Bugden, Senior Recruiter at Uber
          </p>
        </div>
      </section>

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            Framework Attribution: This guide is based on Sam Owens' "I Hate Job Interviews: Stop Stressing. Start Performing. Get the Job You Want" methodology, adapted with my insider recruiting knowledge from 500+ hires and 20,000+ resume reviews.
          </p>
        </div>
      </section>

      {/* Introduction - Accordion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="intro">
            <AccordionItem value="intro" className="border-border">
              <AccordionTrigger className="font-heading text-2xl md:text-3xl text-foreground hover:no-underline">
                Why Most People Fail Interviews
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-foreground">
                    I've been on both sides of the table.
                  </p>
                  <p className="text-base md:text-lg text-foreground">
                    I bombed interviews early in my career. Now I've hired 500+ people as a recruiter.
                  </p>
                  <p className="text-base md:text-lg text-foreground">
                    Here's what I learned: <span className="text-gold font-semibold">The best candidate doesn't get the job. The best person at interviewing gets the job.</span>
                  </p>
                  <p className="text-base md:text-lg text-foreground">
                    Good news for you.
                  </p>
                  <p className="text-base md:text-lg text-foreground">
                    You can beat more qualified candidates if you prepare better. Most people don't prepare enough.
                  </p>
                  <p className="text-base md:text-lg text-foreground">
                    They prepare 1-2 hours for an interview, prepare the wrong things, and wonder why they didn't get an offer.
                  </p>
                  <p className="text-xl md:text-2xl font-heading text-gold">
                    Interviewing is a skill. You can learn it. This guide shows you how.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="myths" className="border-border">
              <AccordionTrigger className="font-heading text-2xl md:text-3xl text-foreground hover:no-underline">
                Kill These Lies First
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  Let's destroy the myths keeping you from interview success.
                </p>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground mb-2">"Just be yourself"</p>
                    <p className="text-muted-foreground">
                      Which self? The one that binge-watched Netflix all weekend? You have multiple selves. Be your best prepared self.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground mb-2">"I can't prepare without knowing the questions"</p>
                    <p className="text-muted-foreground">
                      Wrong. There are 5 main question types. You can prepare for all of them.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground mb-2">"Interviewers are experts"</p>
                    <p className="text-muted-foreground">
                      Most hiring managers get zero training. They're winging it too. Also, most don't do any preparation for the interview beyond looking at your resume.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground mb-2">"I lost because someone was more qualified"</p>
                    <p className="text-muted-foreground">
                      Yes, this happens. We can't change how qualified you are compared to others but we can prepare the best we can for the highest chance of success.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 10-Hour Framework Overview */}
      <section className="py-8 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">
            The 10-Hour Prep Framework
          </h2>
          <p className="text-cream/80 mb-4">
            Most candidates spend 1 hour preparing. You're about to spend 10 hours. That's your advantage.
          </p>
        </div>
      </section>

      {/* Framework Breakdown with Tabs */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-card">
              <TabsTrigger value="research" className="data-[state=active]:bg-gold data-[state=active]:text-executive-green">
                <Target className="w-4 h-4 mr-2" />
                Research
              </TabsTrigger>
              <TabsTrigger value="formulation" className="data-[state=active]:bg-gold data-[state=active]:text-executive-green">
                <Lightbulb className="w-4 h-4 mr-2" />
                Formulation
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:bg-gold data-[state=active]:text-executive-green">
                <MessageSquare className="w-4 h-4 mr-2" />
                Practice
              </TabsTrigger>
            </TabsList>

            {/* Research Tab */}
            <TabsContent value="research" className="animate-fade-in">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl text-foreground">Research Phase</h2>
                    <p className="text-gold font-medium">3 Hours Total</p>
                  </div>
                </div>

                <Accordion type="single" collapsible defaultValue="company">
                  <AccordionItem value="company" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Hour 1:</span> Company Research</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-foreground mb-4">Before you walk in, you need to know:</p>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground"><strong>Company history:</strong> Where they've been, where they're going</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground"><strong>Mission and values:</strong> These will come up in your answers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground"><strong>Financials:</strong> Revenue, profits, growth trajectory (basics only unless it's a finance role)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground"><strong>Products/services:</strong> Actually use the product if you can</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground"><strong>Current news:</strong> What's happening with them right now?</span>
                        </li>
                      </ul>
                      <p className="text-muted-foreground italic">
                        Most of this is on their website, Wikipedia, or recent news articles.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="inside" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Hours 2-3:</span> Inside Information - Your Secret Weapon</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-foreground mb-4">
                        This separates good candidates from great ones. <span className="font-semibold text-gold">Talk to people who actually work there.</span>
                      </p>
                      
                      <h4 className="font-semibold text-foreground mb-3">You'll get:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">Real insights Google can't give you</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">Names to drop in interviews (have people inside the company advocate for you)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">Problems the team is actually facing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">Insider language (the jargon they use in the company shows you understand them)</span>
                        </li>
                      </ul>

                      <div className="bg-card border border-border rounded-lg p-5 mb-6">
                        <p className="text-sm text-muted-foreground mb-2">Message template:</p>
                        <p className="text-foreground italic">
                          "Hey [name], interviewing for [role] at [company]. Can I grab 15 minutes of your time?"
                        </p>
                      </div>

                      <h4 className="font-semibold text-foreground mb-3">What to ask:</h4>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">What's the culture really like?</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">What does success look like in this role?</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">What challenges is the team facing?</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">What do you wish you knew before starting?</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <GoldCheckBadge />
                          <span className="text-foreground">What advice for someone interviewing?</span>
                        </li>
                      </ul>

                      <p className="text-muted-foreground italic">
                        Do 2-3 of these. Will you get rejected a lot? Yes. But you only need to talk to one person to get insider information.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Formulation Tab */}
            <TabsContent value="formulation" className="animate-fade-in">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl text-foreground">Formulation Phase</h2>
                    <p className="text-gold font-medium">3 Hours Total</p>
                  </div>
                </div>

                <Accordion type="single" collapsible defaultValue="power">
                  <AccordionItem value="power" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Hour 1:</span> Create Your Power Examples</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-foreground mb-4">
                        Power examples = stories that prove you can do the job. They're your foundation for every answer.
                      </p>

                      <h4 className="font-semibold text-foreground mb-3">How to pick them:</h4>
                      <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
                        <li>Read job description</li>
                        <li>Find top 7-10 skills they want</li>
                        <li>Match one story to each skill</li>
                      </ol>

                      <h4 className="font-semibold text-foreground mb-3">Good power examples are:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">Specific ("March 2024, led team of 5" not "I often worked with teams")</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">Quantified (numbers, metrics, outcomes)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">Recent (last 2-3 years)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">About YOU (not just "the team")</span>
                        </li>
                      </ul>

                      <h4 className="font-semibold text-foreground mb-3">Bad power examples:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-destructive text-xl">✕</span>
                          <span className="text-foreground">"I'm a good communicator"</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-destructive text-xl">✕</span>
                          <span className="text-foreground">"We increased sales" (who's we?)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-destructive text-xl">✕</span>
                          <span className="text-foreground">Vague, no numbers, no specifics</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="frameworks" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Hours 2-3:</span> Learn Answer Frameworks</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="bg-card border border-border rounded-lg p-5 mb-6">
                        <h4 className="font-semibold text-foreground mb-3">How many examples should you prepare?</h4>
                        <ul className="space-y-2 text-foreground">
                          <li>• <strong>Behavioral questions (SPAR):</strong> Prepare 7-10 stories</li>
                          <li>• <strong>Scenario questions (Home Base):</strong> Practice 5-7 different frameworks</li>
                          <li>• <strong>About You questions (SEE):</strong> Reuse your behavioral stories, just reframe them</li>
                        </ul>
                        <p className="text-gold mt-4 font-semibold">
                          The beauty: Your 7-10 power examples can answer most questions.
                        </p>
                      </div>

                      <Tabs defaultValue="spar" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-4 bg-background">
                          <TabsTrigger value="spar" className="text-xs sm:text-sm data-[state=active]:bg-gold data-[state=active]:text-executive-green">SPAR</TabsTrigger>
                          <TabsTrigger value="homebase" className="text-xs sm:text-sm data-[state=active]:bg-gold data-[state=active]:text-executive-green">Home Base</TabsTrigger>
                          <TabsTrigger value="see" className="text-xs sm:text-sm data-[state=active]:bg-gold data-[state=active]:text-executive-green">SEE</TabsTrigger>
                        </TabsList>

                        <TabsContent value="spar" className="bg-background border border-border rounded-lg p-6">
                          <h4 className="font-heading text-lg text-gold mb-3">SPAR Model (For Behavioral Questions)</h4>
                          <p className="text-muted-foreground mb-4 italic text-sm">
                            "Tell me about a time when...", "Give me an example of..."
                          </p>
                          <ul className="space-y-3 mb-4">
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">S</span>
                              <span className="text-foreground"><strong>Situation</strong> (10-15 sec): Set the scene briefly</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">P</span>
                              <span className="text-foreground"><strong>Problem</strong> (15-20 sec): Create tension</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">A</span>
                              <span className="text-foreground"><strong>Action</strong> (60-90 sec): What YOU did (3 steps)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">R</span>
                              <span className="text-foreground"><strong>Result</strong> (15-20 sec): Quantify the outcome</span>
                            </li>
                          </ul>
                        </TabsContent>

                        <TabsContent value="homebase" className="bg-background border border-border rounded-lg p-6">
                          <h4 className="font-heading text-lg text-gold mb-3">Home Base Model (For Scenario Questions)</h4>
                          <p className="text-muted-foreground mb-4 italic text-sm">
                            "How would you approach...?", "What would you do if...?"
                          </p>
                          
                          <div className="bg-card border border-border rounded p-4 mb-4">
                            <pre className="text-xs text-muted-foreground whitespace-pre font-mono overflow-x-auto flex justify-center">
{`         PATH 1
    (Specific idea)
          |
PATH 2 -------- HOME BASE -------- PATH 3
(Specific idea)  (Foundation)  (Specific idea)
          |
       PATH 4
    (Specific idea)`}
                            </pre>
                          </div>

                          <div className="space-y-3">
                            <p className="text-foreground"><strong>1. Establish</strong> (20-30 sec): "I'd approach this in three phases..."</p>
                            <p className="text-foreground"><strong>2. Explore</strong> (60-90 sec each): Go through each part</p>
                            <p className="text-foreground"><strong>3. Summarize</strong> (15-20 sec): Tie it together</p>
                          </div>
                        </TabsContent>

                        <TabsContent value="see" className="bg-background border border-border rounded-lg p-6">
                          <h4 className="font-heading text-lg text-gold mb-3">SEE Model (For "About You" Questions)</h4>
                          <p className="text-muted-foreground mb-4 italic text-sm">
                            "What's your biggest weakness?", "Why should we hire you?"
                          </p>
                          <ul className="space-y-3 mb-4">
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">S</span>
                              <span className="text-foreground"><strong>Statement:</strong> Say it directly. No hedging.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">E</span>
                              <span className="text-foreground"><strong>Example:</strong> Give a specific instance.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold text-gold min-w-[24px]">E</span>
                              <span className="text-foreground"><strong>Effect:</strong> Explain why this matters for the role.</span>
                            </li>
                          </ul>
                          <p className="text-muted-foreground text-sm italic">
                            Don't say "I'm a perfectionist" or "I work too hard."
                          </p>
                        </TabsContent>
                      </Tabs>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Power Stories Carousel */}
                <div className="mt-8">
                  <h4 className="font-heading text-lg text-gold mb-4">Example Power Stories</h4>
                  <p className="text-muted-foreground text-sm mb-4">Swipe to see examples →</p>
                  
                  <Carousel className="w-full">
                    <CarouselContent>
                      {powerStories.map((story, index) => (
                        <CarouselItem key={index}>
                          <div className="bg-card border border-border rounded-lg p-6">
                            <h5 className="font-semibold text-foreground mb-2">{story.title}</h5>
                            <p className="text-sm text-muted-foreground mb-3">Skill: {story.skill}</p>
                            <p className="text-foreground text-sm mb-4 whitespace-pre-line">{story.story}</p>
                            <p className="text-gold text-sm italic">Why it works: {story.whyItWorks}</p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              </div>
            </TabsContent>

            {/* Practice Tab */}
            <TabsContent value="practice" className="animate-fade-in">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl text-foreground">Practice Phase</h2>
                    <p className="text-gold font-medium">4 Hours Total</p>
                  </div>
                </div>

                <p className="text-xl text-gold font-semibold">
                  This is where 90% of candidates quit. Don't be them.
                </p>

                <Accordion type="single" collapsible defaultValue="phase1">
                  <AccordionItem value="phase1" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Phase 1:</span> Read-Through (30-60 min)</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-foreground mb-2">Say your answers out loud.</p>
                      <p className="text-muted-foreground italic">You'll hear what's awkward. Fix it now.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="phase2" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Phase 2:</span> Memorize (60-90 min)</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-foreground">Learn your frameworks and stories.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="phase3" className="border-border">
                    <AccordionTrigger className="font-heading text-xl text-foreground hover:no-underline">
                      <span><span className="text-gold">Phase 3:</span> Mock Interviews (2-3 hours)</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <p className="text-gold font-semibold mb-4">This is the most important part.</p>
                      <p className="text-foreground mb-4">Get someone to interview you: Friend, Colleague, Career coach, Spouse, or AI.</p>

                      <h4 className="font-semibold text-foreground mb-3">Mock interview rules:</h4>
                      <ol className="list-decimal list-inside text-foreground space-y-2 mb-6">
                        <li>Treat it like it's real</li>
                        <li>No stopping mid-answer</li>
                        <li>Feedback at the END only</li>
                        <li>Do 2 minimum</li>
                      </ol>

                      <div className="bg-card border border-border rounded-lg p-5">
                        <p className="text-gold font-semibold mb-2">Why practice works:</p>
                        <p className="text-foreground">
                          It reveals your weaknesses before they cost you the job. That awkward pause? Fix it now, not in the real interview. Most candidates skip this. That's your advantage.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Difficult Questions - Accordion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Handling Difficult Questions</h2>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="weakness" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">Weakness Questions</AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-foreground mb-4">
                  Don't say "I'm a perfectionist" or "I work too hard." Pick a real weakness that won't disqualify you, you're actively fixing, and shows self-awareness.
                </p>
                <div className="bg-background border border-border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-2">Template:</p>
                  <p className="text-foreground italic">
                    "I [weakness], which led to [consequence]. I'm fixing this by [action]. I've already seen [progress]."
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="salary" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">Salary Questions</AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <div className="bg-background border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground mb-2">If they ask first:</p>
                    <p className="text-foreground">
                      "I'm looking for competitive compensation for this role and market. What's the range you have budgeted?"
                    </p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground mb-2">If you must give a number:</p>
                    <p className="text-foreground">
                      Give a range based on market research, and say "depending on the full compensation package."
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gap" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">Gap Questions</AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-foreground mb-4">Be honest but brief. Don't over-explain.</p>
                <div className="bg-background border border-border rounded-lg p-5">
                  <p className="text-foreground italic">
                    "I took time off to [reason]. During that time I [stayed sharp by...]. Now I'm ready to jump back in."
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="weird" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">Weird Questions</AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-foreground mb-4">
                  Some interviewers ask wacky stuff ("If you were an animal..."). They want to see how you think.
                </p>
                <div className="bg-background border border-border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-2">Template: Answer + "because" + tie back to job</p>
                  <p className="text-foreground italic">
                    "I'd be a golden retriever because I'm eager to please and work well with others. That's how I approach teamwork at work too."
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Questions to Ask */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Your Questions to Ask
          </h2>
          <p className="text-foreground mb-6">
            Always have 3-5 questions ready. This is your chance to interview THEM.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Good Questions:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What does success look like in the first 6 months?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What are the biggest challenges facing the team?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"How would you describe the culture here?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What do you like most about working here?"</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-destructive mb-4">Don't Ask:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">Anything you could Google</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">"What does this company do?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">Only questions about benefits/vacation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Day */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Interview Day</h2>
          </div>

          <Accordion type="single" collapsible defaultValue="before">
            <AccordionItem value="before" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">Before the Interview</AccordionTrigger>
              <AccordionContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground">Get there 10-15 minutes early (no more, no less)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground">Turn off your phone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground">Review your power examples one last time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground">Take 3 deep breaths: breathe in 1 second, breathe out 4 seconds</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="during" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">During the Interview</AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-foreground mb-2">First impression:</p>
                    <ul className="space-y-1 text-foreground text-sm">
                      <li>• Strong handshake</li>
                      <li>• Eye contact</li>
                      <li>• Smile</li>
                      <li>• Mirror their energy</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Body language:</p>
                    <ul className="space-y-1 text-foreground text-sm">
                      <li>• Sit up straight</li>
                      <li>• Don't cross arms</li>
                      <li>• Use hand gestures naturally</li>
                      <li>• Eye contact 70-80%</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="after" className="border-border">
              <AccordionTrigger className="font-heading text-lg text-gold hover:no-underline">After the Interview</AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-foreground mb-4">Send a thank you email within 24 hours.</p>
                <div className="bg-background border border-border rounded p-4">
                  <p className="text-sm text-muted-foreground mb-2">Template:</p>
                  <p className="text-foreground text-sm mb-2">Hi [Name],</p>
                  <p className="text-foreground text-sm mb-2">
                    Thank you for taking the time to speak with me today about the [role] position.
                  </p>
                  <p className="text-foreground text-sm mb-2">
                    I really enjoyed learning about [specific thing] and I'm excited about the opportunity to [contribution].
                  </p>
                  <p className="text-foreground text-sm">Best,<br />[Your name]</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              Common Mistakes That Kill Offers
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Talking too much</strong> - Answer the question. Then stop.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Trashing previous employers</strong> - Stay diplomatic.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>No specific examples</strong> - Everything needs details.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Not asking questions</strong> - Shows you don't care.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>No follow-up</strong> - Send that thank you email.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Lying</strong> - They'll find out. Don't.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Showing up unprepared</strong> - If you don't care to prep, they won't care to hire.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Interactive Checklists */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Interactive Checklists</h2>
              <p className="text-sm text-muted-foreground">Your progress is saved automatically</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Pre-Interview</h3>
              {renderChecklist("pre")}
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Day-Of</h3>
              {renderChecklist("day")}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Online Interviews</h3>
              {renderChecklist("online")}
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Post-Interview</h3>
              {renderChecklist("post")}
            </div>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-6">
            Final Thoughts
          </h2>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            I've seen incredibly talented people bomb interviews. Many times it's because they haven't prepared.
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            I've seen average candidates get offers. They showed up ready.
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            Interviewing is a skill. Practice makes you better.
          </p>
          <p className="text-xl md:text-2xl text-gold font-heading">
            Use this guide. Do the 10 hours. Watch your interview performance transform.
          </p>
        </div>
      </section>

      {/* Need More Help */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 text-center">
            Want Personalized Help?
          </h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Resume Reviews</h3>
              <p className="text-muted-foreground">
                I review 5 resumes per month for free using an exhaustive report. <a href="https://tally.so/r/Pd1jlB" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Join the waitlist here.</a>
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">1-on-1 Coaching</h3>
              <p className="text-muted-foreground">
                I offer 1-on-1 coaching and resume reviews for professionals targeting high-paying roles.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-foreground mb-4">
              Email: <a href="mailto:james@jamesbugden.com" className="text-gold hover:underline">james@jamesbugden.com</a> for more information
            </p>
            <p className="text-sm text-muted-foreground italic">
              This guide is based on Sam Owens' "I Hate Job Interviews" methodology. Support the author and buy his book.
            </p>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            Save This Guide
          </h2>
          <p className="text-muted-foreground mb-6">
            Download the PDF to reference before your next interview.
          </p>
          <Button 
            onClick={handleDownload}
            size="lg" 
            className="h-14 px-8 btn-gold font-medium text-base uppercase tracking-wider"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Guide
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/resume-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Resume Guide
              </Link>
            </div>
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
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

export default InterviewPreparationGuide;
