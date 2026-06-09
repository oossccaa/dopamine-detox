export type DailyStatus = "overcame" | "partial" | "relapsed" // 克服 / 部分 / 上癮

export interface Challenge {
  id?: number // 永遠是 1（單例）
  startDate: string // 'YYYY-MM-DD'
  targetDays: number // 30
  targets: string[] // 我在戒斷什麼，例：["手機/螢幕時間","色情網站"]
  data?: string // D：誠實盤點目前使用狀況
  objectives?: string // O：為什麼要戒 / 想成為的身份
  problems?: string // P：過度使用帶來的問題
  createdAt: Date
}

export interface DailyLog {
  id?: number
  date: string // 'YYYY-MM-DD'，每天一筆（唯一）
  status: DailyStatus
  note?: string // 覺察 / 反思
  createdAt: Date
}

// 逐次衝動 / 犯了的紀錄：一天可以有多筆，地圖以「當天筆數」呈現。
export interface RelapseEvent {
  id?: number
  date: string // 'YYYY-MM-DD'（occurredAt 所屬的當地日期，用於索引與每日計數）
  occurredAt: Date // 時間點（完整時間，用於排序與顯示 HH:mm）
  feeling: 1 | 2 | 3 | 4 | 5 // 感受（沿用心情表情量表 😞→😊）
  durationMinutes: number // 持續時間（分鐘）
  target?: string // 戒斷對象（選填）
  note?: string // 選填文字
  createdAt: Date
}
