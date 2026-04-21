"use client"

import dayjs from "dayjs"
import { useTrackingItems } from "@/hooks/use-tracking-items"
import { CheckinCard } from "@/components/checkin/checkin-card"
import { SosButton } from "@/components/urge/sos-button"

export default function DashboardPage() {
  const { items, loading } = useTrackingItems()
  const today = dayjs().format("YYYY 年 M 月 D 日")

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">{today}</p>
        <h2 className="text-xl font-bold">今日打卡</h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <p>尚未設定追蹤項目</p>
          <p className="text-sm">前往設定頁面新增項目</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <CheckinCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <SosButton />
    </div>
  )
}
