import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexZhTw from "./pages/IndexZhTw";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminReviews from "./pages/AdminReviews";
import ClientReviewGate from "./pages/ClientReviewGate";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeGuide from "./pages/ResumeGuide";
import InterviewPrepGuide from "./pages/InterviewPrepGuide";
import InterviewPrepGuideZhTw from "./pages/InterviewPrepGuideZhTw";
import InterviewPrepGuidePrint from "./pages/InterviewPrepGuidePrint";
import InterviewPreparationGuide from "./pages/InterviewPreparationGuide";
import InterviewPreparationGuideZhTw from "./pages/InterviewPreparationGuideZhTw";
import InterviewPreparationGuidePrint from "./pages/InterviewPreparationGuidePrint";
import CharleneLeeReview from "./pages/reviews/CharleneLeeReview";
import CharleneLeeReviewZhTw from "./pages/reviews/CharleneLeeReviewZhTw";
import ChienJungLiuReview from "./pages/reviews/ChienJungLiuReview";
import ChienJungLiuReviewZhTw from "./pages/reviews/ChienJungLiuReviewZhTw";
import JamesBugdenReview from "./pages/reviews/JamesBugdenReview";
import JamesBugdenReviewZhTw from "./pages/reviews/JamesBugdenReviewZhTw";
import SamLeeReview from "./pages/reviews/SamLeeReview";
import SamLeeReviewZhTw from "./pages/reviews/SamLeeReviewZhTw";
import RogerLeeReview from "./pages/reviews/RogerLeeReview";
import RogerLeeReviewZhTw from "./pages/reviews/RogerLeeReviewZhTw";
import PinWeiWuReview from "./pages/reviews/PinWeiWuReview";
import PinWeiWuReviewZhTw from "./pages/reviews/PinWeiWuReviewZhTw";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/interview-prep-guide" element={<InterviewPrepGuide />} />
          <Route path="/zh-tw/interview-prep-guide" element={<InterviewPrepGuideZhTw />} />
          <Route path="/interview-prep-guide/print" element={<InterviewPrepGuidePrint />} />
          <Route path="/interview-preparation-guide" element={<InterviewPreparationGuide />} />
          <Route path="/interview-preparation-guide/print" element={<InterviewPreparationGuidePrint />} />
          <Route path="/zh-tw/interview-preparation-guide" element={<InterviewPreparationGuideZhTw />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
