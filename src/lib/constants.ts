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

// 逐次衝動紀錄的「持續時間」快速選項（分鐘）
export const DURATION_PRESETS = [5, 10, 15, 30, 60] as const

// 多巴胺國度（Dopamine Nation）DOPAMINE 八步驟
export const DOPAMINE_STEPS: {
  letter: string
  title: string
  desc: string
  link?: { href: string; label: string }
}[] = [
  {
    letter: "D",
    title: "Data — 數據盤點",
    desc: "誠實記下你的使用狀況：用了多少、多頻繁、在什麼情境下。不評判，只是看清現實。",
  },
  {
    letter: "O",
    title: "Objectives — 目標與動機",
    desc: "問自己為什麼要戒。你想成為怎樣的人？把它寫成身份認同：「我是一個能掌控自己注意力的人。」",
  },
  {
    letter: "P",
    title: "Problems — 問題與代價",
    desc: "誠實面對過度使用帶來的問題：睡眠、專注、情緒、關係。看見代價，動機才會穩固。",
  },
  {
    letter: "A",
    title: "Abstinence — 戒斷（30 天挑戰）",
    desc: "給大腦一段休息期，讓多巴胺基線回到平衡。這就是你正在進行的 30 天覺察旅程。",
    link: { href: "/", label: "前往 30 天挑戰" },
  },
  {
    letter: "M",
    title: "Mindfulness — 正念覺察",
    desc: "戒斷初期會不舒服。練習觀察衝動與情緒，不被它牽著走。每天記錄心情，看見自己的變化。",
    link: { href: "/mood", label: "前往心情日記" },
  },
  {
    letter: "I",
    title: "Insight — 洞察",
    desc: "戒斷一段時間後，你會更清楚看見：自己真正在逃避什麼、哪些情境最危險。這份清明很珍貴。",
  },
  {
    letter: "N",
    title: "Next-steps — 下一步",
    desc: "30 天之後呢？決定哪些要繼續戒、哪些可以有節制地回來，並設計好你的環境與界線。",
  },
  {
    letter: "E",
    title: "Experiment — 實驗",
    desc: "把戒斷當成持續的實驗，而不是一次定生死。觀察、調整、再觀察——這是一輩子的練習。",
  },
]
