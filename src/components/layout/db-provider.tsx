"use client"

import { useDatabase } from "@/hooks/use-database"

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { ready } = useDatabase()

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
