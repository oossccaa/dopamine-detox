"use client"

import { useState } from "react"
import dayjs from "dayjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Clock, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MOOD_EMOJIS, MOOD_LABELS, DURATION_PRESETS } from "@/lib/constants"
import type { RelapseEvent } from "@/types/challenge"
import type { NewRelapseEvent } from "@/hooks/use-challenge"

interface RelapseLoggerProps {
  todayEvents: RelapseEvent[]
  todayCount: number
  targets: string[]
  onAdd: (input: NewRelapseEvent) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export function RelapseLogger({
  todayEvents,
  todayCount,
  targets,
  onAdd,
  onDelete,
}: RelapseLoggerProps) {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(dayjs().format("HH:mm"))
  const [feeling, setFeeling] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [duration, setDuration] = useState<number>(10)
  const [target, setTarget] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [saving, setSaving] = useState(false)

  const resetForm = () => {
    setTime(dayjs().format("HH:mm"))
    setFeeling(3)
    setDuration(10)
    setTarget(null)
    setNote("")
  }

  const handleSave = async () => {
    setSaving(true)
    const occurredAt = dayjs(
      `${dayjs().format("YYYY-MM-DD")}T${time}`
    ).toDate()
    await onAdd({
      occurredAt,
      feeling,
      durationMinutes: duration,
      target: target ?? undefined,
      note: note || undefined,
    })
    setSaving(false)
    resetForm()
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">今天的衝動紀錄</CardTitle>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-sm font-semibold",
              todayCount === 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-100 text-amber-800"
            )}
          >
            今天 {todayCount} 次
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 今天已記錄的清單 */}
        {todayEvents.length > 0 && (
          <div className="space-y-2">
            {todayEvents.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
              >
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="flex items-center gap-1 tabular-nums text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {dayjs(e.occurredAt).format("HH:mm")}
                  </span>
                  <span className="text-base leading-none">
                    {MOOD_EMOJIS[e.feeling - 1]}
                  </span>
                  <span className="text-muted-foreground">
                    {e.durationMinutes} 分
                  </span>
                  {e.target && (
                    <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
                      {e.target}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => e.id && onDelete(e.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {!open ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              resetForm()
              setOpen(true)
            }}
          >
            <Plus className="mr-1 h-4 w-4" />
            記錄一次
          </Button>
        ) : (
          <div className="space-y-4 rounded-xl border p-3">
            {/* 時間點 */}
            <div>
              <p className="mb-1.5 text-sm font-medium">時間點</p>
              <input
                type="time"
                value={time}
                onChange={(ev) => setTime(ev.target.value)}
                className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            {/* 感受 */}
            <div>
              <p className="mb-1.5 text-sm font-medium">感受</p>
              <div className="flex justify-between gap-1">
                {MOOD_EMOJIS.map((emoji, i) => {
                  const level = (i + 1) as 1 | 2 | 3 | 4 | 5
                  return (
                    <button
                      key={level}
                      onClick={() => setFeeling(level)}
                      className={cn(
                        "flex flex-1 flex-col items-center gap-1 rounded-lg border py-2 transition-all",
                        feeling === level
                          ? "border-primary bg-primary/5"
                          : "border-transparent hover:bg-muted"
                      )}
                    >
                      <span className="text-xl leading-none">{emoji}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {MOOD_LABELS[i]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 持續時間 */}
            <div>
              <p className="mb-1.5 text-sm font-medium">持續時間</p>
              <div className="flex flex-wrap items-center gap-2">
                {DURATION_PRESETS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setDuration(m)}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm transition-all",
                      duration === m
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {m} 分
                  </button>
                ))}
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(ev) =>
                      setDuration(Math.max(1, Number(ev.target.value) || 0))
                    }
                    className="h-8 w-16 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                  <span className="text-sm text-muted-foreground">分</span>
                </div>
              </div>
            </div>

            {/* 戒斷對象（選填） */}
            {targets.length > 0 && (
              <div>
                <p className="mb-1.5 text-sm font-medium">
                  戒斷對象
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    選填
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {targets.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTarget(target === t ? null : t)}
                      className={cn(
                        "rounded-full px-3 py-1 text-sm transition-all",
                        target === t
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 備註 */}
            <Textarea
              placeholder="當下發生了什麼？觸發是什麼？（選填）"
              value={note}
              onChange={(ev) => setNote(ev.target.value)}
              rows={2}
            />

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} className="flex-1">
                <Check className="mr-1 h-4 w-4" />
                儲存
              </Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                <X className="mr-1 h-4 w-4" />
                取消
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          沒有要記錄就代表今天克服了——誠實面對就是練習。
        </p>
      </CardContent>
    </Card>
  )
}
