"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export function useTimer(initialMinutes: number = 5) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60)
  const [remaining, setRemaining] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    clearTimer()
    setIsRunning(true)
    setIsFinished(false)
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer()
          setIsRunning(false)
          setIsFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer])

  const pause = useCallback(() => {
    clearTimer()
    setIsRunning(false)
  }, [clearTimer])

  const reset = useCallback(
    (minutes?: number) => {
      clearTimer()
      const secs = (minutes ?? initialMinutes) * 60
      setTotalSeconds(secs)
      setRemaining(secs)
      setIsRunning(false)
      setIsFinished(false)
    },
    [clearTimer, initialMinutes]
  )

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0
  const minutesLeft = Math.floor(remaining / 60)
  const secondsLeft = remaining % 60

  return {
    remaining,
    minutesLeft,
    secondsLeft,
    isRunning,
    isFinished,
    progress,
    start,
    pause,
    reset,
  }
}
