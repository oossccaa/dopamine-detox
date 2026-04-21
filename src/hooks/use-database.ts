"use client"

import { useEffect, useState } from "react"
import { db, seedDefaults } from "@/lib/db"

export function useDatabase() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedDefaults().then(() => setReady(true))
  }, [])

  return { db, ready }
}
