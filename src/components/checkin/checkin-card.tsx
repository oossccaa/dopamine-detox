"use client"

import {
  Smartphone,
  EyeOff,
  HandMetal,
  Check,
  Circle,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StreakBadge } from "./streak-badge"
import { useCheckin } from "@/hooks/use-checkin"
import { cn } from "@/lib/utils"
import type { TrackingItem } from "@/types/tracking-item"
import { ITEM_COLORS } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  EyeOff,
  HandMetal,
}

export function CheckinCard({ item }: { item: TrackingItem }) {
  const { todayChecked, streakInfo, loading, checkIn } = useCheckin(item.id)
  const Icon = iconMap[item.icon] ?? Circle

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="h-20 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "transition-all",
        todayChecked && "ring-2 ring-emerald-500 bg-emerald-50"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-white",
                ITEM_COLORS[item.color] ?? "bg-gray-500"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <StreakBadge streakInfo={streakInfo} />
            </div>
          </div>
          <Button
            variant={todayChecked ? "default" : "outline"}
            size="sm"
            onClick={checkIn}
            className={cn(
              "min-w-[80px] transition-all",
              todayChecked &&
                "bg-emerald-600 hover:bg-emerald-700 text-white"
            )}
          >
            {todayChecked ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                已打卡
              </>
            ) : (
              "打卡"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
