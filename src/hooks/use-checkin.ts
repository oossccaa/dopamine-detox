"use client"

import { useState, useEffect, useCallback } from "react"
import dayjs from "dayjs"
import { db } from "@/lib/db"
import type { CheckinRecord } from "@/types/checkin"
import type { StreakInfo } from "@/types/checkin"
import { calculateStreakInfo } from "@/lib/streak"

export function useCheckin(trackingItemId: number | undefined) {
  const [todayChecked, setTodayChecked] = useState(false)
  const [streakInfo, setStreakInfo] = useState<StreakInfo>({
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    successDays: 0,
  })
  const [loading, setLoading] = useState(true)

  const today = dayjs().format("YYYY-MM-DD")

  const refresh = useCallback(async () => {
    if (!trackingItemId) return
    const todayRecord = await db.checkins
      .where("[trackingItemId+date]")
      .equals([trackingItemId, today])
      .first()
    setTodayChecked(todayRecord?.checkedIn ?? false)

    const allRecords = await db.checkins
      .where("trackingItemId")
      .equals(trackingItemId)
      .toArray()
    setStreakInfo(calculateStreakInfo(allRecords))
    setLoading(false)
  }, [trackingItemId, today])

  useEffect(() => {
    refresh()
  }, [refresh])

  const checkIn = async () => {
    if (!trackingItemId) return
    const existing = await db.checkins
      .where("[trackingItemId+date]")
      .equals([trackingItemId, today])
      .first()

    if (existing) {
      // 取消打卡 → 直接刪除紀錄，避免日曆顯示紅色「失敗」
      await db.checkins.delete(existing.id!)
    } else {
      await db.checkins.add({
        trackingItemId,
        date: today,
        checkedIn: true,
        createdAt: new Date(),
      })
    }
    await refresh()
  }

  const getMonthRecords = async (
    year: number,
    month: number
  ): Promise<CheckinRecord[]> => {
    if (!trackingItemId) return []
    const startDate = dayjs(`${year}-${month}-01`).format("YYYY-MM-DD")
    const endDate = dayjs(`${year}-${month}-01`)
      .endOf("month")
      .format("YYYY-MM-DD")
    return db.checkins
      .where("trackingItemId")
      .equals(trackingItemId)
      .and((r) => r.date >= startDate && r.date <= endDate)
      .toArray()
  }

  return { todayChecked, streakInfo, loading, checkIn, getMonthRecords, refresh }
}
