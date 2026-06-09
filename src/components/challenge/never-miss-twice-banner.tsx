"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Heart, ShieldAlert } from "lucide-react"

interface NeverMissTwiceBannerProps {
  todayCount: number
  yesterdayCount: number
}

/**
 * 原子習慣「絕不連續錯兩次」：
 * - 昨天有次數、今天還是 0 → 溫和鼓勵，今天是重新開始的好時機。
 * - 昨天有次數、今天也有 → 不羞辱，提議去衝動引導或散步。
 */
export function NeverMissTwiceBanner({
  todayCount,
  yesterdayCount,
}: NeverMissTwiceBannerProps) {
  if (yesterdayCount === 0) return null

  if (todayCount > 0) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="flex items-start gap-3 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div className="space-y-2">
            <p className="text-sm text-amber-900">
              連續兩天了，先別責備自己——這很常見。要不要打開「衝動引導」，或出門散個步、喝杯水？
            </p>
            <Link
              href="/urge"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              打開衝動引導
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 昨天有次數、今天還是 0
  return (
    <Card className="border-emerald-200 bg-emerald-50">
      <CardContent className="flex items-start gap-3 p-4">
        <Heart className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
        <p className="text-sm text-emerald-900">
          昨天有幾次失誤，沒關係。今天正是重新開始的最好時機——一次失誤不算什麼，重要的是別連續兩次。
        </p>
      </CardContent>
    </Card>
  )
}
