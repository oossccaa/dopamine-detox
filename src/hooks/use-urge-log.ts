"use client"

import { useState, useEffect, useCallback } from "react"
import { db } from "@/lib/db"
import type { UrgeLog, CopingStrategy } from "@/types/urge"

export function useUrgeLog() {
  const [strategies, setStrategies] = useState<CopingStrategy[]>([])
  const [recentLogs, setRecentLogs] = useState<UrgeLog[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const allStrategies = await db.copingStrategies.toArray()
    setStrategies(allStrategies)

    const recent = await db.urgeLogs
      .orderBy("date")
      .reverse()
      .limit(20)
      .toArray()
    setRecentLogs(recent)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const logUrge = async (log: Omit<UrgeLog, "id" | "createdAt">) => {
    await db.urgeLogs.add({ ...log, createdAt: new Date() } as UrgeLog)
    await refresh()
  }

  const addStrategy = async (strategy: Omit<CopingStrategy, "id">) => {
    await db.copingStrategies.add(strategy as CopingStrategy)
    await refresh()
  }

  return { strategies, recentLogs, loading, logUrge, addStrategy, refresh }
}
