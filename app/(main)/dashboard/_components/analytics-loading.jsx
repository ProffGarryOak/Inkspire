import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MoodAnalyticsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <Skeleton className="h-14 w-72 bg-[#ffd600]/20 rounded-xl mx-auto" />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-[#ffd600]/10 bg-[#232323] rounded-2xl shadow-lg">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-28 bg-[#ffd600]/20 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-20 mb-2 bg-[#ffd600]/40 rounded" />
              <Skeleton className="h-4 w-36 bg-[#ffd600]/20 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-[#ffd600]/10 bg-[#232323] rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-7 w-36 bg-[#ffd600]/20 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full relative">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="h-48 w-5/6 bg-gradient-to-r from-[#ffd600]/10 via-[#232323] to-[#ffd600]/10 rounded-lg mb-4" />
              <div className="flex justify-between w-full px-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-14 bg-[#ffd600]/20 rounded" />
                ))}
              </div>
              <div className="absolute left-0 top-0 h-full py-8 flex flex-col justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-10 bg-[#ffd600]/20 rounded" />
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