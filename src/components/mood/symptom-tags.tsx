"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SYMPTOM_OPTIONS } from "@/lib/constants"

interface SymptomTagsProps {
  selected: string[]
  onChange: (symptoms: string[]) => void
}

export function SymptomTags({ selected, onChange }: SymptomTagsProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {SYMPTOM_OPTIONS.map((option) => {
        const isActive = selected.includes(option.value)
        return (
          <Badge
            key={option.value}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all",
              isActive && "bg-primary text-primary-foreground"
            )}
            onClick={() => toggle(option.value)}
          >
            {option.label}
          </Badge>
        )
      })}
    </div>
  )
}
