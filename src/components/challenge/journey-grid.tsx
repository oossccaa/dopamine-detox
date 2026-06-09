"use client"

import dayjs from "dayjs"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface JourneyGridProps {
  startDate: string
  targetDays: number
  countByDate: Map<string, number>
}

export function JourneyGrid({
  startDate,
  targetDays,
  countByDate,
}: JourneyGridProps) {
  const today = dayjs().format("YYYY-MM-DD")

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <p className="text-sm font-medium">旅程地圖</p>
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: targetDays }).map((_, i) => {
            const date = dayjs(startDate).add(i, "day").format("YYYY-MM-DD")
            const isToday = date === today
            const isFuture = date > today
            const count = countByDate.get(date) ?? 0

            return (
              <div
                key={i}
                title={`第 ${i + 1} 天${count > 0 ? `：${count} 次` : ""}`}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isFuture
                    ? "bg-muted/40 text-muted-foreground/50"
                    : count > 0
                    ? "bg-amber-400 text-white"
                    : "bg-emerald-500 text-white",
                  isToday && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {/* 過去/今天：有次數顯示次數，否則顯示天數 */}
                {isFuture ? i + 1 : count > 0 ? count : i + 1}
              </div>
            )
          })}
        </div>

        {/* 圖例 */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            克服（0 次）
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            數字＝當天次數
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
