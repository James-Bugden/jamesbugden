import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 bg-executive-green h-14 flex items-center px-4 md:px-8">
        <Skeleton className="h-5 w-36 bg-white/10" />
        <div className="ml-auto flex gap-3">
          <Skeleton className="h-4 w-16 bg-white/10" />
          <Skeleton className="h-4 w-12 bg-white/10" />
        </div>
      </div>

      {/* Welcome */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10">
        <Skeleton className="h-8 w-64 mb-4" />
      </div>

      {/* Cards */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pb-12">
        <Skeleton className="h-5 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl p-6 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
