"use client"

import { useState, useEffect, useCallback } from "react"
import dayjs from "dayjs"
import { db } from "@/lib/db"
import type { MoodEntry } from "@/types/mood"

export function useMoodJournal() {
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null)
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(true)

  const today = dayjs().format("YYYY-MM-DD")

  const refresh = useCallback(async () => {
    const todayEntry = await db.moods.where("date").equals(today).first()
    setTodayMood(todayEntry ?? null)

    const recent = await db.moods.orderBy("date").reverse().limit(30).toArray()
    setRecentEntries(recent)
    setLoading(false)
  }, [today])

  useEffect(() => {
    refresh()
  }, [refresh])

  const saveMood = async (
    mood: MoodEntry["mood"],
    symptoms: string[],
    note?: string
  ) => {
    const existing = await db.moods.where("date").equals(today).first()
    if (existing) {
      await db.moods.update(existing.id!, { mood, symptoms, note })
    } else {
      await db.moods.add({
        date: today,
        mood,
        symptoms,
        note,
        createdAt: new Date(),
      })
    }
    await refresh()
  }

  const getMoodsByDateRange = async (
    startDate: string,
    endDate: string
  ): Promise<MoodEntry[]> => {
    return db.moods
      .where("date")
      .between(startDate, endDate, true, true)
      .toArray()
  }

  return { todayMood, recentEntries, loading, saveMood, getMoodsByDateRange, refresh }
}
