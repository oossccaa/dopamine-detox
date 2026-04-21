"use client"

import { useState, useEffect } from "react"
import { Flame, Trophy, Target, CalendarCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/stats/stats-card"
import { SuccessRateChart } from "@/components/stats/success-rate-chart"
import { MoodTrendChart } from "@/components/stats/mood-trend-chart"
import { useStats } from "@/hooks/use-stats"
import { db } from "@/lib/db"
import { calculateStreakInfo } from "@/lib/streak"
import type { StreakInfo } from "@/types/checkin"

export default function StatsPage() {
  const { weeklyRates, monthlyRates, moodTrend, loading } = useStats()
  const [overallStreak, setOverallStreak] = useState<StreakInfo>({
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    successDays: 0,
  })

  useEffect(() => {
    async function loadOverall() {
      const allRecords = await db.checkins.toArray()
      setOverallStreak(calculateStreakInfo(allRecords))
    }
    loadOverall()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">統計圖表</h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  const successRate =
    overallStreak.totalDays > 0
      ? Math.round(
          (overallStreak.successDays / overallStreak.totalDays) * 100
        )
      : 0

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">統計圖表</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatsCard
          title="當前連續"
          value={`${overallStreak.currentStreak} 天`}
          icon={Flame}
        />
        <StatsCard
          title="最長紀錄"
          value={`${overallStreak.longestStreak} 天`}
          icon={Trophy}
        />
        <StatsCard
          title="總成功率"
          value={`${successRate}%`}
          icon={Target}
        />
        <StatsCard
          title="累計打卡"
          value={`${overallStreak.successDays} 天`}
          icon={CalendarCheck}
        />
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="w-full">
          <TabsTrigger value="weekly" className="flex-1">
            週報
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1">
            月報
          </TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="mt-3">
          <SuccessRateChart data={weeklyRates} title="每日成功率（近 7 天）" />
        </TabsContent>
        <TabsContent value="monthly" className="mt-3">
          <SuccessRateChart data={monthlyRates} title="每週成功率（近 4 週）" />
        </TabsContent>
      </Tabs>

      <MoodTrendChart data={moodTrend} />
    </div>
  )
}
