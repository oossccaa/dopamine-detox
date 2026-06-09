import Dexie, { type Table } from "dexie"
import type { TrackingItem } from "@/types/tracking-item"
import type { CheckinRecord } from "@/types/checkin"
import type { MoodEntry } from "@/types/mood"
import type { UrgeLog, CopingStrategy } from "@/types/urge"
import type { Challenge, DailyLog, RelapseEvent } from "@/types/challenge"
import { DEFAULT_TRACKING_ITEMS, DEFAULT_COPING_STRATEGIES } from "./constants"

export class DetoxDatabase extends Dexie {
  trackingItems!: Table<TrackingItem>
  checkins!: Table<CheckinRecord>
  moods!: Table<MoodEntry>
  urgeLogs!: Table<UrgeLog>
  copingStrategies!: Table<CopingStrategy>
  challenge!: Table<Challenge>
  dailyLogs!: Table<DailyLog>
  relapseEvents!: Table<RelapseEvent>

  constructor() {
    super("dopamine-detox")
    this.version(1).stores({
      trackingItems: "++id, name, isActive",
      checkins: "++id, trackingItemId, date, [trackingItemId+date]",
      moods: "++id, date",
      urgeLogs: "++id, date, trackingItemId",
      copingStrategies: "++id, name",
    })
    // v2：只新增兩張表（challenge / dailyLogs），既有 store 不動、無需 upgrade callback，
    // 因此既有使用者的 IndexedDB 資料不會壞。
    this.version(2).stores({
      trackingItems: "++id, name, isActive",
      checkins: "++id, trackingItemId, date, [trackingItemId+date]",
      moods: "++id, date",
      urgeLogs: "++id, date, trackingItemId",
      copingStrategies: "++id, name",
      challenge: "++id",
      dailyLogs: "++id, &date, status",
    })
    // v3：新增逐次衝動紀錄表（一天可多筆），同樣只加表、不動既有 store。
    this.version(3).stores({
      trackingItems: "++id, name, isActive",
      checkins: "++id, trackingItemId, date, [trackingItemId+date]",
      moods: "++id, date",
      urgeLogs: "++id, date, trackingItemId",
      copingStrategies: "++id, name",
      challenge: "++id",
      dailyLogs: "++id, &date, status",
      relapseEvents: "++id, date",
    })
  }
}

export const db = new DetoxDatabase()

export async function seedDefaults() {
  const itemCount = await db.trackingItems.count()
  if (itemCount === 0) {
    await db.trackingItems.bulkAdd(DEFAULT_TRACKING_ITEMS as TrackingItem[])
  }
  const strategyCount = await db.copingStrategies.count()
  if (strategyCount === 0) {
    await db.copingStrategies.bulkAdd(
      DEFAULT_COPING_STRATEGIES as CopingStrategy[]
    )
  }
}
