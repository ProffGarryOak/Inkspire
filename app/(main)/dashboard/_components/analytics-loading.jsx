import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MoodAnalyticsSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-60 bg-[#1c1c1c]/10" />
      
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-[#1c1c1c]/10">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24 bg-[#1c1c1c]/10" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1 bg-[#b33a3a]/20" />
              <Skeleton className="h-3 w-32 bg-[#1c1c1c]/10" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Skeleton */}
      <Card className="border-[#1c1c1c]/10">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32 bg-[#1c1c1c]/10" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="animate-pulse space-y-4">
              {/* Chart area skeleton */}
              <div className="h-full w-full bg-gradient-to-r from-[#1c1c1c]/5 via-[#e5e5e5] to-[#1c1c1c]/5 rounded-lg" />

              {/* X-axis labels */}
              <div className="flex justify-between px-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-3 w-12 bg-[#1c1c1c]/10" />
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full py-8 flex flex-col justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-3 w-8 bg-[#1c1c1c]/10" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodAnalyticsSkeleton;