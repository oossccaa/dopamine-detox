"use client"

import { Shield } from "lucide-react"

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-md items-center gap-3 px-4">
        <Shield className="h-6 w-6 text-emerald-600" />
        <h1 className="text-lg font-bold tracking-tight">
          {title ?? "多巴胺戒斷訓練"}
        </h1>
      </div>
    </header>
  )
}
