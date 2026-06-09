"use client"

import { useState, useEffect, useCallback } from "react"
import dayjs from "dayjs"
import { db } from "@/lib/db"
import type { Challenge, RelapseEvent } from "@/types/challenge"

const CHALLENGE_ID = 1

export type NewRelapseEvent = Omit<RelapseEvent, "id" | "date" | "createdAt">

export function useChallenge() {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [events, setEvents] = useState<RelapseEvent[]>([])
  const [loading, setLoading] = useState(true)

  const today = dayjs().format("YYYY-MM-DD")
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD")

  const refresh = useCallback(async () => {
    const c = (await db.challenge.get(CHALLENGE_ID)) ?? null
    setChallenge(c)
    const all = await db.relapseEvents.orderBy("date").toArray()
    setEvents(all)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const startChallenge = async (targets: string[], targetDays = 30) => {
    await db.challenge.put({
      id: CHALLENGE_ID,
      startDate: today,
      targetDays,
      targets,
      createdAt: new Date(),
    })
    await refresh()
  }

  const updateChallenge = async (patch: Partial<Omit<Challenge, "id">>) => {
    if (!challenge) return
    await db.challenge.update(CHALLENGE_ID, patch)
    await refresh()
  }

  const resetChallenge = async () => {
    await db.challenge.clear()
    await db.relapseEvents.clear()
    await refresh()
  }

  const addRelapseEvent = async (input: NewRelapseEvent) => {
    await db.relapseEvents.add({
      date: dayjs(input.occurredAt).format("YYYY-MM-DD"),
      occurredAt: input.occurredAt,
      feeling: input.feeling,
      durationMinutes: input.durationMinutes,
      target: input.target,
      note: input.note,
      createdAt: new Date(),
    })
    await refresh()
  }

  const deleteRelapseEvent = async (id: number) => {
    await db.relapseEvents.delete(id)
    await refresh()
  }

  // 每日次數對照表
  const countByDate = new Map<string, number>()
  for (const e of events) {
    countByDate.set(e.date, (countByDate.get(e.date) ?? 0) + 1)
  }

  // 衍生狀態
  const dayNumber = challenge
    ? Math.min(
        Math.max(dayjs().diff(dayjs(challenge.startDate), "day") + 1, 1),
        challenge.targetDays
      )
    : 0
  const isComplete = challenge
    ? dayjs().diff(dayjs(challenge.startDate), "day") + 1 > challenge.targetDays
    : false

  const todayEvents = events
    .filter((e) => e.date === today)
    .sort((a, b) => dayjs(a.occurredAt).valueOf() - dayjs(b.occurredAt).valueOf())
  const todayCount = countByDate.get(today) ?? 0
  const yesterdayCount = countByDate.get(yesterday) ?? 0

  // 連續克服天數：從今天往回數，連續「0 次」的天數；遇到有次數即中斷，不早於起始日。
  let cleanStreak = 0
  if (challenge) {
    const start = dayjs(challenge.startDate)
    let cursor = dayjs()
    for (let i = 0; i < 400; i++) {
      if (cursor.isBefore(start, "day")) break
      if ((countByDate.get(cursor.format("YYYY-MM-DD")) ?? 0) > 0) break
      cleanStreak++
      cursor = cursor.subtract(1, "day")
    }
  }

  // 累積克服天數：起始日至今（最多到第 targetDays 天）中，沒有任何次數的天數。
  let overcameDays = 0
  if (challenge) {
    const start = dayjs(challenge.startDate)
    const lastDay = start.add(challenge.targetDays - 1, "day")
    const end = dayjs().isBefore(lastDay) ? dayjs() : lastDay
    let cursor = start
    while (!cursor.isAfter(end, "day")) {
      if ((countByDate.get(cursor.format("YYYY-MM-DD")) ?? 0) === 0) overcameDays++
      cursor = cursor.add(1, "day")
    }
  }

  return {
    challenge,
    events,
    countByDate,
    todayEvents,
    todayCount,
    yesterdayCount,
    loading,
    today,
    dayNumber,
    isComplete,
    cleanStreak,
    overcameDays,
    startChallenge,
    updateChallenge,
    resetChallenge,
    addRelapseEvent,
    deleteRelapseEvent,
    refresh,
  }
}
