"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChallengeHeaderProps {
  dayNumber: number
  targetDays: number
  cleanStreak: number
  overcameDays: number
  todayCount: number
}

export function ChallengeHeader({
  dayNumber,
  targetDays,
  cleanStreak,
  overcameDays,
  todayCount,
}: ChallengeHeaderProps) {
  const pct = Math.round((dayNumber / targetDays) * 100)

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">30 天覺察旅程</p>
            <p className="text-2xl font-bold">
              第 {dayNumber}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / {targetDays} 天
              </span>
            </p>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold",
              todayCount === 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-100 text-amber-800"
            )}
          >
            今天 {todayCount} 次
          </span>
        </div>

        <Progress value={pct} />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-emerald-500" />
            連續克服 {cleanStreak} 天
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-400" />
            累積克服 {overcameDays} 天
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
