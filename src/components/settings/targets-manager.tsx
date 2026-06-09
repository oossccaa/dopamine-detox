"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import { useChallenge } from "@/hooks/use-challenge"

export function TargetsManager() {
  const { challenge, loading, updateChallenge } = useChallenge()
  const [newTarget, setNewTarget] = useState("")

  if (loading) {
    return <div className="h-32 animate-pulse rounded-xl bg-muted" />
  }

  if (!challenge) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">我在戒斷什麼</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          開始 30 天挑戰後，就能在這裡管理你的戒斷對象。
        </CardContent>
      </Card>
    )
  }

  const targets = challenge.targets

  const addTarget = async () => {
    const v = newTarget.trim()
    if (!v || targets.includes(v)) return
    await updateChallenge({ targets: [...targets, v] })
    setNewTarget("")
  }

  const removeTarget = async (name: string) => {
    await updateChallenge({ targets: targets.filter((x) => x !== name) })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">我在戒斷什麼</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {targets.map((name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
          >
            <span className="text-sm">{name}</span>
            <button
              onClick={() => removeTarget(name)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {targets.length === 0 && (
          <p className="py-2 text-center text-sm text-muted-foreground">
            還沒有戒斷對象，加一個吧
          </p>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="新增戒斷對象"
            value={newTarget}
            onValueChange={(value) => setNewTarget(value)}
            onKeyDown={(e) => e.key === "Enter" && addTarget()}
          />
          <Button variant="outline" size="icon" onClick={addTarget}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
