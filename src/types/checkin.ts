export interface CheckinRecord {
  id?: number
  trackingItemId: number
  date: string // 'YYYY-MM-DD'
  checkedIn: boolean
  note?: string
  createdAt: Date
}

export interface StreakInfo {
  currentStreak: number
  longestStreak: number
  totalDays: number
  successDays: number
}
