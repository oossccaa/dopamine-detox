"use client"

import { useState, useEffect, useCallback } from "react"
import { db } from "@/lib/db"
import type { TrackingItem } from "@/types/tracking-item"

export function useTrackingItems() {
  const [items, setItems] = useState<TrackingItem[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const all = await db.trackingItems.filter((item) => item.isActive).toArray()
    setItems(all)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addItem = async (item: Omit<TrackingItem, "id">) => {
    await db.trackingItems.add(item as TrackingItem)
    await refresh()
  }

  const toggleItem = async (id: number, isActive: boolean) => {
    await db.trackingItems.update(id, { isActive })
    await refresh()
  }

  const getAllItems = async () => {
    return db.trackingItems.toArray()
  }

  return { items, loading, addItem, toggleItem, getAllItems, refresh }
}
