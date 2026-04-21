export interface MoodEntry {
  id?: number
  date: string // 'YYYY-MM-DD'
  mood: 1 | 2 | 3 | 4 | 5
  symptoms: string[]
  note?: string
  createdAt: Date
}
