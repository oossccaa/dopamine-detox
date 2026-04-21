"use client"

import { useState, useEffect, useCallback } from "react"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { db } from "@/lib/db"
import type { CheckinRecord } from "@/types/checkin"

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]

interface CheckinCalendarProps {
  trackingItemId: number
}

export function CheckinCalendar({ trackingItemId }: CheckinCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [records, setRecords] = useState<Map<string, boolean>>(new Map())

  const loadRecords = useCallback(async () => {
    const startDate = currentMonth.startOf("month").format("YYYY-MM-DD")
    const endDate = currentMonth.endOf("month").format("YYYY-MM-DD")
    const monthRecords = await db.checkins
      .where("trackingItemId")
      .equals(trackingItemId)
      .and((r: CheckinRecord) => r.date >= startDate && r.date <= endDate)
      .toArray()

    const map = new Map<string, boolean>()
    monthRecords.forEach((r) => map.set(r.date, r.checkedIn))
    setRecords(map)
  }, [trackingItemId, currentMonth])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  const daysInMonth = currentMonth.daysInMonth()
  const firstDayOfWeek = currentMonth.startOf("month").day()
  const today = dayjs().format("YYYY-MM-DD")

  const prevMonth = () => setCurrentMonth((m) => m.subtract(1, "month"))
  const nextMonth = () => setCurrentMonth((m) => m.add(1, "month"))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold">
          {currentMonth.format("YYYY 年 M 月")}
        </span>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1 font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = currentMonth
            .startOf("month")
            .add(i, "day")
            .format("YYYY-MM-DD")
          const isFuture = date > today
          const isToday = date === today
          const checkedIn = records.get(date)

          return (
            <div
              key={date}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm mx-auto",
                isFuture && "text-muted-foreground/40",
                isToday && "ring-2 ring-primary ring-offset-1",
                !isFuture && checkedIn === true && "bg-emerald-500 text-white",
                !isFuture &&
                  checkedIn !== true &&
                  date < today &&
                  "bg-muted text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span>成功</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-muted" />
          <span>未記錄</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-muted/40" />
          <span>未來</span>
        </div>
      </div>
    </div>
  )
}
