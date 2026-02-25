import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

// Core pages - lazy load for smaller initial bundle
const Index = lazy(() => import("./pages/Index"));
const IndexZhTw = lazy(() => import("./pages/IndexZhTw"));
import NotFound from "./pages/NotFound";

// Lazy load all other pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminReviews = lazy(() => import("./pages/AdminReviews"));
const ClientReviewGate = lazy(() => import("./pages/ClientReviewGate"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const ResumeGuide = lazy(() => import("./pages/ResumeGuide"));
const ResumeGuideZhTw = lazy(() => import("./pages/ResumeGuideZhTw"));
const InterviewPrepGuide = lazy(() => import("./pages/InterviewPrepGuide"));
const InterviewPrepGuideZhTw = lazy(() => import("./pages/InterviewPrepGuideZhTw"));
const InterviewPreparationGuide = lazy(() => import("./pages/InterviewPreparationGuide"));
const InterviewPreparationGuideZhTw = lazy(() => import("./pages/InterviewPreparationGuideZhTw"));

const LinkedInGuideZhTw = lazy(() => import("./pages/LinkedInGuideZhTw"));
const LinkedInGuide = lazy(() => import("./pages/LinkedInGuide"));
const LinkedInBrandingGuideZhTw = lazy(() => import("./pages/LinkedInBrandingGuideZhTw"));
const LinkedInBrandingGuide = lazy(() => import("./pages/LinkedInBrandingGuide"));
const PivotMethodGuideZhTw = lazy(() => import("./pages/PivotMethodGuideZhTw"));
const PivotMethodGuide = lazy(() => import("./pages/PivotMethodGuide"));
const PivotMethodMiniGuide = lazy(() => import("./pages/PivotMethodMiniGuide"));
const PivotMethodMiniGuideZhTw = lazy(() => import("./pages/PivotMethodMiniGuideZhTw"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const GuidesPageZhTw = lazy(() => import("./pages/GuidesPageZhTw"));
const SalaryStarterKit = lazy(() => import("./pages/SalaryStarterKit"));
const SalaryStarterKitZhTw = lazy(() => import("./pages/SalaryStarterKitZhTw"));
const Quiz = lazy(() => import("./pages/Quiz"));
const QuizZhTw = lazy(() => import("./pages/QuizZhTw"));
const OfferCompass = lazy(() => import("./pages/OfferCompass"));
const OfferCompassCompare = lazy(() => import("./pages/OfferCompassCompare"));
const OfferCompassZhTw = lazy(() => import("./pages/OfferCompassZhTw"));
const SiteDirectory = lazy(() => import("./pages/SiteDirectory"));
const ResumeAnalyzer = lazy(() => import("./pages/ResumeAnalyzer"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const JobTracker = lazy(() => import("./pages/JobTracker"));
const TrackerPage = lazy(() => import("./pages/TrackerPage"));

// Toolkit pages - English
const ToolkitIndex = lazy(() => import("./pages/toolkit/ToolkitIndex"));
const DeflectionScripts = lazy(() => import("./pages/toolkit/DeflectionScripts"));
const OfferResponse = lazy(() => import("./pages/toolkit/OfferResponse"));
const CounterofferEmail = lazy(() => import("./pages/toolkit/CounterofferEmail"));
const CompensationCalculator = lazy(() => import("./pages/toolkit/CompensationCalculator"));
const CompCalculatorInteractive = lazy(() => import("./pages/toolkit/CompCalculatorInteractive"));
const PushbackCheatSheet = lazy(() => import("./pages/toolkit/PushbackCheatSheet"));
const RaiseOnePager = lazy(() => import("./pages/toolkit/RaiseOnePager"));
const AchievementLog = lazy(() => import("./pages/toolkit/AchievementLog"));

// Toolkit pages - Traditional Chinese
const ToolkitIndexZhTw = lazy(() => import("./pages/toolkit/ToolkitIndexZhTw"));
const DeflectionScriptsZhTw = lazy(() => import("./pages/toolkit/DeflectionScriptsZhTw"));
const OfferResponseZhTw = lazy(() => import("./pages/toolkit/OfferResponseZhTw"));
const CounterofferEmailZhTw = lazy(() => import("./pages/toolkit/CounterofferEmailZhTw"));
const CompensationCalculatorZhTw = lazy(() => import("./pages/toolkit/CompensationCalculatorZhTw"));
const CompCalculatorInteractiveZhTw = lazy(() => import("./pages/toolkit/CompCalculatorInteractiveZhTw"));
const PushbackCheatSheetZhTw = lazy(() => import("./pages/toolkit/PushbackCheatSheetZhTw"));
const RaiseOnePagerZhTw = lazy(() => import("./pages/toolkit/RaiseOnePagerZhTw"));
const AchievementLogZhTw = lazy(() => import("./pages/toolkit/AchievementLogZhTw"));

// Lazy load review pages
const CharleneLeeReview = lazy(() => import("./pages/reviews/CharleneLeeReview"));
const CharleneLeeReviewZhTw = lazy(() => import("./pages/reviews/CharleneLeeReviewZhTw"));
const ChienJungLiuReview = lazy(() => import("./pages/reviews/ChienJungLiuReview"));
const ChienJungLiuReviewZhTw = lazy(() => import("./pages/reviews/ChienJungLiuReviewZhTw"));
const JamesBugdenReview = lazy(() => import("./pages/reviews/JamesBugdenReview"));
const JamesBugdenReviewZhTw = lazy(() => import("./pages/reviews/JamesBugdenReviewZhTw"));
const SamLeeReview = lazy(() => import("./pages/reviews/SamLeeReview"));
const SamLeeReviewZhTw = lazy(() => import("./pages/reviews/SamLeeReviewZhTw"));
const RogerLeeReview = lazy(() => import("./pages/reviews/RogerLeeReview"));
const RogerLeeReviewZhTw = lazy(() => import("./pages/reviews/RogerLeeReviewZhTw"));
const PinWeiWuReview = lazy(() => import("./pages/reviews/PinWeiWuReview"));
const PinWeiWuReviewZhTw = lazy(() => import("./pages/reviews/PinWeiWuReviewZhTw"));
const PeihuaYehReview = lazy(() => import("./pages/reviews/PeihuaYehReview"));
const PeihuaYehReviewZhTw = lazy(() => import("./pages/reviews/PeihuaYehReviewZhTw"));
const SilviaChenReview = lazy(() => import("./pages/reviews/SilviaChenReview"));
const SilviaChenReviewZhTw = lazy(() => import("./pages/reviews/SilviaChenReviewZhTw"));
const YoutingChenReview = lazy(() => import("./pages/reviews/YoutingChenReview"));
const YoutingChenReviewZhTw = lazy(() => import("./pages/reviews/YoutingChenReviewZhTw"));
const RoyTsaiReview = lazy(() => import("./pages/reviews/RoyTsaiReview"));
const RoyTsaiReviewZhTw = lazy(() => import("./pages/reviews/RoyTsaiReviewZhTw"));
const JanelleChengReview = lazy(() => import("./pages/reviews/JanelleChengReview"));
const JanelleChengReviewZhTw = lazy(() => import("./pages/reviews/JanelleChengReviewZhTw"));
const WillyLinReview = lazy(() => import("./pages/reviews/WillyLinReview"));
const WillyLinReviewZhTw = lazy(() => import("./pages/reviews/WillyLinReviewZhTw"));
const HopeChenReview = lazy(() => import("./pages/reviews/HopeChenReview"));
const HopeChenReviewZhTw = lazy(() => import("./pages/reviews/HopeChenReviewZhTw"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/zh-tw" element={<IndexZhTw />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/reviews" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminReviews />
                </ProtectedRoute>
              } 
            />
            <Route path="/review" element={<ClientReviewGate />} />
            <Route path="/resume-guide" element={<ResumeGuide />} />
            <Route path="/zh-tw/resume-guide" element={<ResumeGuideZhTw />} />
            <Route path="/interview-prep-guide" element={<InterviewPrepGuide />} />
            <Route path="/zh-tw/interview-prep-guide" element={<InterviewPrepGuideZhTw />} />
            
            <Route path="/interview-preparation-guide" element={<InterviewPreparationGuide />} />
            
            <Route path="/zh-tw/interview-preparation-guide" element={<InterviewPreparationGuideZhTw />} />
            <Route path="/zh-tw/linkedin-guide" element={<LinkedInGuideZhTw />} />
            <Route path="/linkedin-guide" element={<LinkedInGuide />} />
            <Route path="/zh-tw/linkedin-branding-guide" element={<LinkedInBrandingGuideZhTw />} />
            <Route path="/linkedin-branding-guide" element={<LinkedInBrandingGuide />} />
            <Route path="/zh-tw/pivot-method-guide" element={<PivotMethodGuideZhTw />} />
            <Route path="/pivot-method-guide" element={<PivotMethodGuide />} />
            <Route path="/pivot-method-mini-guide" element={<PivotMethodMiniGuide />} />
            <Route path="/zh-tw/pivot-method-mini-guide" element={<PivotMethodMiniGuideZhTw />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/zh-tw/guides" element={<GuidesPageZhTw />} />
            <Route path="/salary-starter-kit" element={<SalaryStarterKit />} />
            <Route path="/zh-tw/salary-starter-kit" element={<SalaryStarterKitZhTw />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/zh-tw/quiz" element={<QuizZhTw />} />
            <Route path="/offer-calculator" element={<OfferCompass />} />
            <Route path="/offer-calculator/compare" element={<OfferCompassCompare />} />
            <Route path="/zh-tw/offer-calculator" element={<OfferCompassZhTw />} />
            {/* Redirects from old URLs */}
            <Route path="/offer-compass" element={<Navigate to="/offer-calculator" replace />} />
            <Route path="/offer-compass/compare" element={<Navigate to="/offer-calculator/compare" replace />} />
            <Route path="/zh-tw/offer-compass" element={<Navigate to="/zh-tw/offer-calculator" replace />} />
            {/* Salary Negotiation Toolkit */}
            <Route path="/toolkit" element={<ToolkitIndex />} />
            <Route path="/toolkit/scripts" element={<DeflectionScripts />} />
            <Route path="/toolkit/offer-response" element={<OfferResponse />} />
            <Route path="/toolkit/counteroffer" element={<CounterofferEmail />} />
            <Route path="/toolkit/calculator" element={<CompensationCalculator />} />
            <Route path="/toolkit/calculator-interactive" element={<CompCalculatorInteractive />} />
            <Route path="/toolkit/pushback" element={<PushbackCheatSheet />} />
            <Route path="/toolkit/raise" element={<RaiseOnePager />} />
            <Route path="/toolkit/log" element={<AchievementLog />} />
            {/* Traditional Chinese Toolkit */}
            <Route path="/zh-tw/toolkit" element={<ToolkitIndexZhTw />} />
            <Route path="/zh-tw/toolkit/scripts" element={<DeflectionScriptsZhTw />} />
            <Route path="/zh-tw/toolkit/offer-response" element={<OfferResponseZhTw />} />
            <Route path="/zh-tw/toolkit/counteroffer" element={<CounterofferEmailZhTw />} />
            <Route path="/zh-tw/toolkit/calculator" element={<CompensationCalculatorZhTw />} />
            <Route path="/zh-tw/toolkit/calculator-interactive" element={<CompCalculatorInteractiveZhTw />} />
            <Route path="/zh-tw/toolkit/pushback" element={<PushbackCheatSheetZhTw />} />
            <Route path="/zh-tw/toolkit/raise" element={<RaiseOnePagerZhTw />} />
            <Route path="/zh-tw/toolkit/log" element={<AchievementLogZhTw />} />
            {/* Client Review Pages */}
            <Route path="/reviews/charlene-lee" element={<CharleneLeeReview />} />
            <Route path="/zh-tw/reviews/charlene-lee" element={<CharleneLeeReviewZhTw />} />
            <Route path="/reviews/chien-jung-liu" element={<ChienJungLiuReview />} />
            <Route path="/zh-tw/reviews/chien-jung-liu" element={<ChienJungLiuReviewZhTw />} />
            <Route path="/reviews/james-bugden" element={<JamesBugdenReview />} />
            <Route path="/zh-tw/reviews/james-bugden" element={<JamesBugdenReviewZhTw />} />
            <Route path="/reviews/sam-lee" element={<SamLeeReview />} />
            <Route path="/zh-tw/reviews/sam-lee" element={<SamLeeReviewZhTw />} />
            <Route path="/reviews/roger-lee" element={<RogerLeeReview />} />
            <Route path="/zh-tw/reviews/roger-lee" element={<RogerLeeReviewZhTw />} />
            <Route path="/reviews/pin-wei-wu" element={<PinWeiWuReview />} />
            <Route path="/zh-tw/reviews/pin-wei-wu" element={<PinWeiWuReviewZhTw />} />
            <Route path="/reviews/peihua-yeh" element={<PeihuaYehReview />} />
            <Route path="/zh-tw/reviews/peihua-yeh" element={<PeihuaYehReviewZhTw />} />
            <Route path="/reviews/silvia-chen" element={<SilviaChenReview />} />
            <Route path="/zh-tw/reviews/silvia-chen" element={<SilviaChenReviewZhTw />} />
            <Route path="/reviews/youting-chen" element={<YoutingChenReview />} />
            <Route path="/zh-tw/reviews/youting-chen" element={<YoutingChenReviewZhTw />} />
            <Route path="/reviews/roy-tsai" element={<RoyTsaiReview />} />
            <Route path="/zh-tw/reviews/roy-tsai" element={<RoyTsaiReviewZhTw />} />
            <Route path="/reviews/janelle-cheng" element={<JanelleChengReview />} />
            <Route path="/zh-tw/reviews/janelle-cheng" element={<JanelleChengReviewZhTw />} />
            <Route path="/reviews/willy-lin" element={<WillyLinReview />} />
            <Route path="/zh-tw/reviews/willy-lin" element={<WillyLinReviewZhTw />} />
            <Route path="/reviews/hope-chen" element={<HopeChenReview />} />
            <Route path="/zh-tw/reviews/hope-chen" element={<HopeChenReviewZhTw />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/jobs" element={<JobTracker />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/site-directory" element={<SiteDirectory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
