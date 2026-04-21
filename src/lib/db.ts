import Dexie, { type Table } from "dexie"
import type { TrackingItem } from "@/types/tracking-item"
import type { CheckinRecord } from "@/types/checkin"
import type { MoodEntry } from "@/types/mood"
import type { UrgeLog, CopingStrategy } from "@/types/urge"
import { DEFAULT_TRACKING_ITEMS, DEFAULT_COPING_STRATEGIES } from "./constants"

export class DetoxDatabase extends Dexie {
  trackingItems!: Table<TrackingItem>
  checkins!: Table<CheckinRecord>
  moods!: Table<MoodEntry>
  urgeLogs!: Table<UrgeLog>
  copingStrategies!: Table<CopingStrategy>

  constructor() {
    super("dopamine-detox")
    this.version(1).stores({
      trackingItems: "++id, name, isActive",
      checkins: "++id, trackingItemId, date, [trackingItemId+date]",
      moods: "++id, date",
      urgeLogs: "++id, date, trackingItemId",
      copingStrategies: "++id, name",
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
