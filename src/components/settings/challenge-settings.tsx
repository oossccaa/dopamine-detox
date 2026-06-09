"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useChallenge } from "@/hooks/use-challenge"

export function ChallengeSettings() {
  const { challenge, dayNumber, resetChallenge } = useChallenge()

  if (!challenge) return null

  const handleReset = async () => {
    if (
      !confirm(
        "確定要重新開始挑戰嗎？這會清除目前的每日紀錄並把起始日設回今天。（心情、衝動紀錄不受影響）"
      )
    )
      return
    await resetChallenge()
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">挑戰</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          目前進行到第 {dayNumber} / {challenge.targetDays} 天，起始日{" "}
          {challenge.startDate}。
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-destructive hover:text-destructive"
          onClick={handleReset}
        >
          <RotateCcw className="mr-1 h-4 w-4" />
          重新開始挑戰
        </Button>
      </CardContent>
    </Card>
  )
}
