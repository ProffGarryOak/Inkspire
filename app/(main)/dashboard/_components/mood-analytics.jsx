"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAnalytics } from "@/actions/analytics";
import { getMoodById, getMoodTrend } from "@/app/lib/moods";
import { format, parseISO } from "date-fns";
import useFetch from "@/hooks/use-fetch";
import MoodAnalyticsSkeleton from "./analytics-loading";
import { useUser } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { Pen } from "lucide-react";
import Image from "next/image";
import { getMoodRecommendations } from "@/lib/gemini-mood";

const timeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "15d", label: "Last 15 Days" },
  { value: "30d", label: "Last 30 Days" },
];

export default function MoodAnalytics() {
  const [period, setPeriod] = useState("7d");
  const [recommendations, setRecommendations] = useState({
    entertainment: "Loading recommendations...",
    healthTips: "Loading health tips...",
    quote: "Loading quote..."
  });
  const [loadingRecs, setLoadingRecs] = useState(false);

  const {
    loading,
    data: analytics,
    fn: fetchAnalytics,
  } = useFetch(getAnalytics);

  const { isLoaded } = useUser();

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  useEffect(() => {
    if (analytics?.data?.stats?.averageScore) {
      fetchRecommendations(analytics.data.stats.averageScore);
    }
  }, [analytics]);

  async function fetchRecommendations(averageScore) {
    setLoadingRecs(true);
    try {
      const recs = await getMoodRecommendations(averageScore);
      setRecommendations(recs);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      setRecommendations({
        entertainment: "Try refreshing the page",
        healthTips: "Content unavailable",
        quote: "Stay positive!"
      });
    } finally {
      setLoadingRecs(false);
    }
  }

  if (loading || !analytics?.data || !isLoaded) {
    return <MoodAnalyticsSkeleton />;
  }

  if (!analytics) return null;

  const { timeline, stats } = analytics.data;

  function CustomTooltip({ active, payload, label }) {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-4 border border-[#1c1c1c]/10 rounded-lg shadow-lg">
          <p className="font-medium text-[#1c1c1c]">
            {format(parseISO(label), "MMM d, yyyy")}
          </p>
          <p className="text-[#b33a3a]">Average Mood: {payload[0].value}</p>
          <p className="text-[#1c1c1c]/80">Entries: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {analytics.data.entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <Image 
            src="/japanese-journal.png" 
            alt="Empty journal" 
            width={200} 
            height={150}
            className="opacity-80"
          />
          <p className="text-[#1c1c1c]/80 text-lg">
            Your journal is as empty as a zen garden
          </p>
          <Link 
            href="/journal/write" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white rounded-lg shadow-md transition-all"
          >
            <Pen className="h-5 w-5" />
            <span className="font-medium">Begin Your Story</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-8 w-8 text-[#b33a3a]" />
              <h2 className="text-2xl font-bold text-[#b33a3a] font-shikamaru">
                Mood Analytics
              </h2>
            </div>

            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px] border-[#1c1c1c]/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#1c1c1c]/20 bg-[#e5e5e5]">
                {timeOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="hover:bg-[#b33a3a]/10"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-[#1c1c1c]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1c1c1c]">
                  Total Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1c1c1c]">
                  {stats.totalEntries}
                </div>
                <p className="text-xs text-[#1c1c1c]/60">
                  ~{stats.dailyAverage} entries per day
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#1c1c1c]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1c1c1c]">
                  Average Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#b33a3a]">
                  {stats.averageScore}/10
                </div>
                <p className="text-xs text-[#1c1c1c]/60">
                  Overall mood score
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#1c1c1c]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1c1c1c]">
                  Mood Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1c1c1c] flex items-center gap-2">
                  {getMoodById(stats.mostFrequentMood)?.emoji}{" "}
                  {getMoodTrend(stats.averageScore)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendation Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="border-[#1c1c1c]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1c1c1c]">
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-[#1c1c1c]">
                  {loadingRecs ? (
                    <div className="animate-pulse">Loading...</div>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {recommendations.entertainment.split('\n').map((item, i) => (
                        item.trim() && <li key={i}>{item.replace(/^- /, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#1c1c1c]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1c1c1c]">
                  Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-[#1c1c1c]">
                  {loadingRecs ? (
                    <div className="animate-pulse">Loading...</div>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {recommendations.healthTips.split('\n').map((item, i) => (
                        item.trim() && <li key={i}>{item.replace(/^- /, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#1c1c1c]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#1c1c1c]">
                  Daily Quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm italic text-[#1c1c1c]">
                  {loadingRecs ? (
                    <div className="animate-pulse">Loading...</div>
                  ) : (
                    `"${recommendations.quote}"`
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#1c1c1c]/10">
            <CardHeader>
              <CardTitle className="text-[#1c1c1c]">Mood Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeline}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c/20" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#1c1c1c' }}
                      tickFormatter={(date) => format(parseISO(date), "MMM d")}
                    />
                    <YAxis yAxisId="left" domain={[0, 10]} tick={{ fill: '#1c1c1c' }} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, "auto"]}
                      tick={{ fill: '#1c1c1c' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="averageScore"
                      stroke="#b33a3a"
                      name="Average Mood"
                      strokeWidth={2}
                      dot={{ fill: '#b33a3a', r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="entryCount"
                      stroke="#1c1c1c"
                      name="Number of Entries"
                      strokeWidth={2}
                      dot={{ fill: '#1c1c1c', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}