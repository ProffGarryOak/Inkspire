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
import { BarChart2, Pen } from "lucide-react";
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
    quote: "Loading quote...",
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
        quote: "Stay positive!",
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
        <div className="bg-zinc-800 text-yellow-100 p-4 border border-yellow-300/20 rounded-lg shadow-lg">
          <p className="font-medium">
            {format(parseISO(label), "MMM d, yyyy")}
          </p>
          <p className="text-yellow-400">Average Mood: {payload[0].value}</p>
          <p>Entries: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {analytics.data.entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <p className="text-yellow-300 text-lg">
            Your journal is as empty as a zen garden
          </p>
          <Link
            href="/journal/write"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg shadow-md transition-all"
          >
            <Pen className="h-5 w-5" />
            <span className="font-medium">Begin Your Story</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-8 w-8 text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-400 font-shikamaru">
                Mood Analytics
              </h2>
            </div>

            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px] border-yellow-300/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-yellow-300/30 bg-zinc-900">
                {timeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="hover:bg-yellow-400/10 text-yellow-200"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-zinc-700 bg-zinc-900 text-yellow-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEntries}</div>
                <p className="text-xs text-yellow-300/70">
                  ~{stats.dailyAverage} entries per day
                </p>
              </CardContent>
            </Card>

            <Card className="border-zinc-700 bg-zinc-900 text-yellow-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.averageScore}/10
                </div>
                <p className="text-xs text-yellow-300/70">Overall mood score</p>
              </CardContent>
            </Card>

            <Card className="border-zinc-700 bg-zinc-900 text-yellow-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Mood Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {getMoodById(stats.mostFrequentMood)?.emoji} {getMoodTrend(stats.averageScore)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {['Recommendations', 'Health Tips', 'Daily Quote'].map((title, i) => (
              <Card key={i} className="border-zinc-700 bg-zinc-900 text-yellow-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    {loadingRecs ? (
                      <div className="animate-pulse">Loading...</div>
                    ) : title === 'Daily Quote' ? (
                      <div className="italic">"{recommendations.quote}"</div>
                    ) : (
                      <ul className="list-disc pl-5 space-y-1">
                        {(title === 'Recommendations'
                          ? recommendations.entertainment
                          : recommendations.healthTips
                        ).split('\n').map((item, i) => (
                          item.trim() && <li key={i}>{item.replace(/^- /, '').trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-zinc-700 bg-zinc-900 text-yellow-100">
            <CardHeader>
              <CardTitle>Mood Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeline}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#fef9c3' }}
                      tickFormatter={(date) => format(parseISO(date), "MMM d")}
                    />
                    <YAxis yAxisId="left" domain={[0, 10]} tick={{ fill: '#fef9c3' }} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, "auto"]}
                      tick={{ fill: '#fef9c3' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="averageScore"
                      stroke="#facc15"
                      name="Average Mood"
                      strokeWidth={2}
                      dot={{ fill: '#facc15', r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="entryCount"
                      stroke="#fef08a"
                      name="Number of Entries"
                      strokeWidth={2}
                      dot={{ fill: '#fef08a', r: 4 }}
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
