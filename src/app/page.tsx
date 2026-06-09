"use client"

import Link from "next/link"
import { useChallenge } from "@/hooks/use-challenge"
import { ChallengeOnboarding } from "@/components/challenge/challenge-onboarding"
import { ChallengeHeader } from "@/components/challenge/challenge-header"
import { JourneyGrid } from "@/components/challenge/journey-grid"
import { RelapseLogger } from "@/components/challenge/relapse-logger"
import { NeverMissTwiceBanner } from "@/components/challenge/never-miss-twice-banner"
import { SosButton } from "@/components/urge/sos-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PartyPopper, ShieldAlert, BookOpen } from "lucide-react"

export default function HomePage() {
  const {
    challenge,
    countByDate,
    todayEvents,
    todayCount,
    yesterdayCount,
    loading,
    dayNumber,
    isComplete,
    cleanStreak,
    overcameDays,
    startChallenge,
    addRelapseEvent,
    deleteRelapseEvent,
    resetChallenge,
  } = useChallenge()

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="space-y-4">
        <ChallengeOnboarding onStart={startChallenge} />
        <SosButton />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isComplete ? (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="space-y-3 p-5 text-center">
            <PartyPopper className="mx-auto h-8 w-8 text-emerald-600" />
            <p className="text-lg font-bold text-emerald-900">
              你完成了 30 天的覺察旅程
            </p>
            <p className="text-sm text-emerald-800">
              不論這一路有幾次起伏，你都堅持在看清自己。這份覺察會留下來。
            </p>
            <Button onClick={resetChallenge} className="mt-1">
              再來一輪
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <ChallengeHeader
            dayNumber={dayNumber}
            targetDays={challenge.targetDays}
            cleanStreak={cleanStreak}
            overcameDays={overcameDays}
            todayCount={todayCount}
          />
          <NeverMissTwiceBanner
            todayCount={todayCount}
            yesterdayCount={yesterdayCount}
          />
        </>
      )}

      <JourneyGrid
        startDate={challenge.startDate}
        targetDays={challenge.targetDays}
        countByDate={countByDate}
      />

      {!isComplete && (
        <RelapseLogger
          todayEvents={todayEvents}
          todayCount={todayCount}
          targets={challenge.targets}
          onAdd={addRelapseEvent}
          onDelete={deleteRelapseEvent}
        />
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/urge"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto flex-col gap-1 py-3"
          )}
        >
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <span className="text-sm">衝動引導</span>
        </Link>
        <Link
          href="/guide"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto flex-col gap-1 py-3"
          )}
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-sm">DOPAMINE 指南</span>
        </Link>
      </div>

      <SosButton />
    </div>
  )
}
