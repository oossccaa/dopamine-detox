"use client"

import { useState } from "react"
import dayjs from "dayjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUrgeLog } from "@/hooks/use-urge-log"
import { useTrackingItems } from "@/hooks/use-tracking-items"
import { cn } from "@/lib/utils"
import { Check, ThumbsUp, ThumbsDown } from "lucide-react"

interface UrgeLogFormProps {
  strategyUsed: string
  onSaved: () => void
}

export function UrgeLogForm({ strategyUsed, onSaved }: UrgeLogFormProps) {
  const { logUrge } = useUrgeLog()
  const { items } = useTrackingItems()
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [intensity, setIntensity] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [helped, setHelped] = useState<boolean | null>(null)
  const [note, setNote] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!selectedItemId) return
    setSaving(true)
    await logUrge({
      date: dayjs().format("YYYY-MM-DD"),
      trackingItemId: selectedItemId,
      intensity,
      strategyUsed,
      helped,
      note: note || undefined,
    })
    setSaving(false)
    onSaved()
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">記錄這次衝動</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">相關項目</p>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id!)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm transition-all",
                  selectedItemId === item.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">衝動強度</p>
          <div className="flex gap-2">
            {([1, 2, 3, 4, 5] as const).map((level) => (
              <button
                key={level}
                onClick={() => setIntensity(level)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                  intensity === level
                    ? level <= 2
                      ? "bg-green-500 text-white"
                      : level <= 3
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">策略有幫助嗎？</p>
          <div className="flex gap-2">
            <Button
              variant={helped === true ? "default" : "outline"}
              size="sm"
              onClick={() => setHelped(true)}
              className={cn(helped === true && "bg-emerald-600 hover:bg-emerald-700")}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              有幫助
            </Button>
            <Button
              variant={helped === false ? "default" : "outline"}
              size="sm"
              onClick={() => setHelped(false)}
              className={cn(helped === false && "bg-red-500 hover:bg-red-600")}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              沒用
            </Button>
          </div>
        </div>

        <Textarea
          placeholder="備註（選填）"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
        />

        <Button
          onClick={handleSave}
          disabled={!selectedItemId || saving}
          className="w-full"
        >
          <Check className="mr-1 h-4 w-4" />
          儲存紀錄
        </Button>
      </CardContent>
    </Card>
  )
}
