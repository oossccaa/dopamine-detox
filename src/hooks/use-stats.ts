"use client"

import { useState, useEffect, useCallback } from "react"
import dayjs from "dayjs"
import { db } from "@/lib/db"
import type { CheckinRecord } from "@/types/checkin"
import type { MoodEntry } from "@/types/mood"

export interface DailySuccessRate {
  date: string
  label: string
  rate: number
  total: number
  success: number
}

export interface MoodTrendPoint {
  date: string
  label: string
  mood: number
}

export function useStats() {
  const [weeklyRates, setWeeklyRates] = useState<DailySuccessRate[]>([])
  const [monthlyRates, setMonthlyRates] = useState<DailySuccessRate[]>([])
  const [moodTrend, setMoodTrend] = useState<MoodTrendPoint[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const today = dayjs()

    // Weekly success rates (last 7 days)
    const weekData: DailySuccessRate[] = []
    for (let i = 6; i >= 0; i--) {
      const date = today.subtract(i, "day")
      const dateStr = date.format("YYYY-MM-DD")
      const records = await db.checkins
        .where("date")
        .equals(dateStr)
        .toArray()
      const total = records.length
      const success = records.filter((r: CheckinRecord) => r.checkedIn).length
      weekData.push({
        date: dateStr,
        label: date.format("M/D"),
        rate: total > 0 ? Math.round((success / total) * 100) : 0,
        total,
        success,
      })
    }
    setWeeklyRates(weekData)

    // Monthly success rates (last 30 days, grouped by week)
    const monthData: DailySuccessRate[] = []
    for (let w = 3; w >= 0; w--) {
      const weekStart = today.subtract(w * 7 + 6, "day")
      const weekEnd = today.subtract(w * 7, "day")
      const startStr = weekStart.format("YYYY-MM-DD")
      const endStr = weekEnd.format("YYYY-MM-DD")
      const records = await db.checkins
        .where("date")
        .between(startStr, endStr, true, true)
        .toArray()
      const total = records.length
      const success = records.filter((r: CheckinRecord) => r.checkedIn).length
      monthData.push({
        date: startStr,
        label: `${weekStart.format("M/D")}-${weekEnd.format("M/D")}`,
        rate: total > 0 ? Math.round((success / total) * 100) : 0,
        total,
        success,
      })
    }
    setMonthlyRates(monthData)

    // Mood trend (last 14 days)
    const moodData: MoodTrendPoint[] = []
    for (let i = 13; i >= 0; i--) {
      const date = today.subtract(i, "day")
      const dateStr = date.format("YYYY-MM-DD")
      const mood = await db.moods.where("date").equals(dateStr).first()
      if (mood) {
        moodData.push({
          date: dateStr,
          label: date.format("M/D"),
          mood: (mood as MoodEntry).mood,
        })
      }
    }
    setMoodTrend(moodData)

    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { weeklyRates, monthlyRates, moodTrend, loading, refresh }
}
