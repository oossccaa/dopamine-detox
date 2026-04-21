"use client"

import { useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTimer } from "@/hooks/use-timer"

interface MeditationTimerProps {
  minutes: number
  label: string
  onComplete?: () => void
  onSkip?: () => void
}

export function MeditationTimer({
  minutes,
  label,
  onComplete,
  onSkip,
}: MeditationTimerProps) {
  const { minutesLeft, secondsLeft, isRunning, isFinished, progress, start, pause, reset } =
    useTimer(minutes)
  const completeCalled = useRef(false)

  useEffect(() => {
    if (isFinished && onComplete && !completeCalled.current) {
      completeCalled.current = true
      onComplete()
    }
  }, [isFinished, onComplete])

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-medium">{label}</p>

      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={isFinished ? "text-emerald-500" : "text-primary transition-all duration-1000"}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold tabular-nums">
            {String(minutesLeft).padStart(2, "0")}:
            {String(secondsLeft).padStart(2, "0")}
          </span>
        </div>
      </div>

      {isFinished ? (
        <div className="text-center">
          <p className="text-lg font-semibold text-emerald-600">完成！做得好！</p>
          <Button variant="outline" size="sm" onClick={() => reset(minutes)} className="mt-2">
            <RotateCcw className="mr-1 h-4 w-4" />
            重新開始
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {isRunning ? (
              <Button variant="outline" onClick={pause}>
                <Pause className="mr-1 h-4 w-4" />
                暫停
              </Button>
            ) : (
              <Button onClick={start}>
                <Play className="mr-1 h-4 w-4" />
                {progress > 0 ? "繼續" : "開始"}
              </Button>
            )}
            {progress > 0 && (
              <Button variant="ghost" onClick={() => reset(minutes)}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
          {onSkip && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => {
                pause()
                onSkip()
              }}
            >
              <SkipForward className="mr-1 h-4 w-4" />
              提前結束，直接記錄
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
