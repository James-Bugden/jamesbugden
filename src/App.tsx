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
import InterviewPreparationGuide from "./pages/InterviewPreparationGuide";

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
          <Route path="/review/:clientId" element={<ClientReviewGate />} />
          <Route path="/resume-guide" element={<ResumeGuide />} />
          <Route path="/interview-prep-guide" element={<InterviewPrepGuide />} />
          <Route path="/zh-tw/interview-prep-guide" element={<InterviewPrepGuideZhTw />} />
          <Route path="/interview-preparation-guide" element={<InterviewPreparationGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
