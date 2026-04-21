export interface UrgeLog {
  id?: number
  date: string
  trackingItemId: number
  intensity: 1 | 2 | 3 | 4 | 5
  strategyUsed: string
  helped: boolean | null
  note?: string
  createdAt: Date
}

export interface CopingStrategy {
  id?: number
  name: string
  icon: string
  isDefault: boolean
  timerMinutes?: number
}
