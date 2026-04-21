"use client"

import { Flame, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { StreakInfo } from "@/types/checkin"

export function StreakBadge({ streakInfo }: { streakInfo: StreakInfo }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="gap-1">
        <Flame className="h-3 w-3 text-orange-500" />
        <span>{streakInfo.currentStreak} 天</span>
      </Badge>
      {streakInfo.longestStreak > 0 && (
        <Badge variant="outline" className="gap-1 text-muted-foreground">
          <Trophy className="h-3 w-3 text-yellow-500" />
          <span>最長 {streakInfo.longestStreak} 天</span>
        </Badge>
      )}
    </div>
  )
}
