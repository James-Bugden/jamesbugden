import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PublicScoreCardView = lazy(() => import("@/components/resume-analyzer/PublicScoreCardView"));

const PublicScoreCardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-48 mb-8" />
            <div className="grid gap-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      }
    >
      <PublicScoreCardView />
    </Suspense>
  );
};

export default PublicScoreCardPage;