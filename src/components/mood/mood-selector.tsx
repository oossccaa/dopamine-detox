"use client"

import { cn } from "@/lib/utils"
import { MOOD_EMOJIS, MOOD_LABELS } from "@/lib/constants"

interface MoodSelectorProps {
  value: number | null
  onChange: (mood: 1 | 2 | 3 | 4 | 5) => void
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {MOOD_EMOJIS.map((emoji, index) => {
        const moodValue = (index + 1) as 1 | 2 | 3 | 4 | 5
        const isSelected = value === moodValue
        return (
          <button
            key={moodValue}
            type="button"
            onClick={() => onChange(moodValue)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg p-2 transition-all",
              isSelected
                ? "bg-primary/10 scale-110 ring-2 ring-primary"
                : "hover:bg-muted"
            )}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-[10px] text-muted-foreground">
              {MOOD_LABELS[index]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
