"use client"

import {
  Droplets,
  Brain,
  Dumbbell,
  Wind,
  Puzzle,
  Circle,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CopingStrategy } from "@/types/urge"

const strategyIcons: Record<string, LucideIcon> = {
  Droplets,
  Brain,
  Dumbbell,
  Wind,
  Puzzle,
}

interface CopingStrategyListProps {
  strategies: CopingStrategy[]
  selected: string | null
  onSelect: (strategy: CopingStrategy) => void
}

export function CopingStrategyList({
  strategies,
  selected,
  onSelect,
}: CopingStrategyListProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {strategies.map((strategy) => {
        const Icon = strategyIcons[strategy.icon] ?? Circle
        const isActive = selected === strategy.name
        return (
          <Card
            key={strategy.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              isActive && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() => onSelect(strategy)}
          >
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <Icon
                className={cn(
                  "h-8 w-8",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className="text-sm font-medium">{strategy.name}</span>
              {strategy.timerMinutes && (
                <span className="text-[10px] text-muted-foreground">
                  {strategy.timerMinutes} 分鐘
                </span>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
