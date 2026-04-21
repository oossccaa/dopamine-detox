"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckinCalendar } from "@/components/checkin/checkin-calendar"
import { useTrackingItems } from "@/hooks/use-tracking-items"
import { cn } from "@/lib/utils"

export default function CalendarPage() {
  const { items, loading } = useTrackingItems()
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  const activeId = selectedItemId ?? items[0]?.id ?? null

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-muted" />
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">日曆紀錄</h2>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItemId(item.id!)}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-all",
              activeId === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      {activeId && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">打卡紀錄</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckinCalendar key={activeId} trackingItemId={activeId} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
