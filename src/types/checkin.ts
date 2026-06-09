// 保留供既有 IndexedDB v1 表格與資料匯出/匯入相容；不再於任何畫面讀寫。
export interface CheckinRecord {
  id?: number
  trackingItemId: number
  date: string // 'YYYY-MM-DD'
  checkedIn: boolean
  note?: string
  createdAt: Date
}
