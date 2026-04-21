import dayjs from "dayjs"
import type { CheckinRecord } from "@/types/checkin"
import type { StreakInfo } from "@/types/checkin"

export function calculateCurrentStreak(records: CheckinRecord[]): number {
  const sorted = [...records]
    .filter((r) => r.checkedIn)
    .sort((a, b) => b.date.localeCompare(a.date))

  if (sorted.length === 0) return 0

  const today = dayjs().format("YYYY-MM-DD")
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD")

  if (sorted[0].date !== today && sorted[0].date !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = dayjs(sorted[i - 1].date)
    const curr = dayjs(sorted[i].date)
    if (prev.diff(curr, "day") === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export function calculateLongestStreak(records: CheckinRecord[]): number {
  const sorted = [...records]
    .filter((r) => r.checkedIn)
    .sort((a, b) => a.date.localeCompare(b.date))

  if (sorted.length === 0) return 0

  let longest = 1
  let current = 1

  for (let i = 1; i < sorted.length; i++) {
    const prev = dayjs(sorted[i - 1].date)
    const curr = dayjs(sorted[i].date)
    if (curr.diff(prev, "day") === 1) {
      current++
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }
  return Math.max(longest, current)
}

export function calculateStreakInfo(records: CheckinRecord[]): StreakInfo {
  return {
    currentStreak: calculateCurrentStreak(records),
    longestStreak: calculateLongestStreak(records),
    totalDays: records.length,
    successDays: records.filter((r) => r.checkedIn).length,
  }
}
