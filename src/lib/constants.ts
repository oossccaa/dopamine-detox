import type { TrackingItem } from "@/types/tracking-item"
import type { CopingStrategy } from "@/types/urge"

export const DEFAULT_TRACKING_ITEMS: Omit<TrackingItem, "id">[] = [
  {
    name: "手機/螢幕時間",
    icon: "Smartphone",
    color: "blue",
    isDefault: true,
    isActive: true,
    createdAt: new Date(),
  },
  {
    name: "色情網站",
    icon: "EyeOff",
    color: "red",
    isDefault: true,
    isActive: true,
    createdAt: new Date(),
  },
]

export const DEFAULT_COPING_STRATEGIES: Omit<CopingStrategy, "id">[] = [
  { name: "沖冷水澡", icon: "Droplets", isDefault: true },
  { name: "冥想", icon: "Brain", isDefault: true, timerMinutes: 5 },
  { name: "運動", icon: "Dumbbell", isDefault: true, timerMinutes: 15 },
  { name: "深呼吸", icon: "Wind", isDefault: true, timerMinutes: 3 },
  { name: "轉移注意力", icon: "Puzzle", isDefault: true },
]

export const SYMPTOM_OPTIONS = [
  { label: "衝動感", value: "urges" },
  { label: "焦慮", value: "anxiety" },
  { label: "失眠", value: "insomnia" },
  { label: "煩躁", value: "irritability" },
  { label: "注意力不集中", value: "lack_focus" },
  { label: "疲勞", value: "fatigue" },
  { label: "情緒低落", value: "low_mood" },
]

export const MOOD_EMOJIS = ["😞", "😟", "😐", "🙂", "😊"] as const

export const MOOD_LABELS = ["很差", "不好", "一般", "不錯", "很好"] as const

export const ITEM_COLORS: Record<string, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  yellow: "bg-yellow-500",
}
