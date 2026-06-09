"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Sparkles } from "lucide-react"
import { useTrackingItems } from "@/hooks/use-tracking-items"

interface ChallengeOnboardingProps {
  onStart: (targets: string[]) => Promise<void>
}

export function ChallengeOnboarding({ onStart }: ChallengeOnboardingProps) {
  const { items, loading } = useTrackingItems()
  const [targets, setTargets] = useState<string[]>([])
  const [newTarget, setNewTarget] = useState("")
  const [starting, setStarting] = useState(false)
  const [prefilled, setPrefilled] = useState(false)

  // 用啟用中的追蹤項目預填戒斷目標（只填一次，之後讓使用者自由編輯）
  useEffect(() => {
    if (!loading && !prefilled) {
      setTargets(items.map((i) => i.name))
      setPrefilled(true)
    }
  }, [loading, prefilled, items])

  const addTarget = () => {
    const v = newTarget.trim()
    if (!v || targets.includes(v)) return
    setTargets((t) => [...t, v])
    setNewTarget("")
  }

  const removeTarget = (name: string) => {
    setTargets((t) => t.filter((x) => x !== name))
  }

  const handleStart = async () => {
    setStarting(true)
    await onStart(targets)
    setStarting(false)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <CardTitle className="text-lg">開始 30 天覺察旅程</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          這不是一場會把你打回原點的比賽，而是一段誠實面對自己的練習。每天記錄一次，看清楚就好。先選好你想戒斷的對象：
        </p>

        <div className="space-y-2">
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
              至少加入一個戒斷對象
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="新增戒斷對象，例：短影音"
            value={newTarget}
            onValueChange={(value) => setNewTarget(value)}
            onKeyDown={(e) => e.key === "Enter" && addTarget()}
          />
          <Button variant="outline" size="icon" onClick={addTarget}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleStart}
          disabled={targets.length === 0 || starting}
          className="w-full"
        >
          開始第 1 天
        </Button>
      </CardContent>
    </Card>
  )
}
