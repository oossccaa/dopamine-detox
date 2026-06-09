"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"
import { useChallenge } from "@/hooks/use-challenge"

const FIELDS = [
  {
    key: "data" as const,
    label: "D · 數據盤點",
    placeholder: "誠實寫下目前的使用狀況：用了多少、多頻繁、什麼情境下？",
  },
  {
    key: "objectives" as const,
    label: "O · 目標與身份",
    placeholder: "為什麼要戒？想成為怎樣的人？例：我是一個能掌控自己注意力的人。",
  },
  {
    key: "problems" as const,
    label: "P · 問題與代價",
    placeholder: "過度使用帶來哪些問題？睡眠、專注、情緒、關係……",
  },
]

export function DopReflection() {
  const { challenge, updateChallenge } = useChallenge()
  const [draft, setDraft] = useState({ data: "", objectives: "", problems: "" })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (challenge) {
      setDraft({
        data: challenge.data ?? "",
        objectives: challenge.objectives ?? "",
        problems: challenge.problems ?? "",
      })
    }
  }, [challenge])

  if (!challenge) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          開始 30 天挑戰後，就能在這裡寫下你的 D / O / P 覺察。
        </CardContent>
      </Card>
    )
  }

  const handleSave = async () => {
    await updateChallenge(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">我的 D / O / P 覺察</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <p className="mb-1.5 text-sm font-medium">{f.label}</p>
            <Textarea
              placeholder={f.placeholder}
              value={draft[f.key]}
              onChange={(e) =>
                setDraft((d) => ({ ...d, [f.key]: e.target.value }))
              }
              rows={3}
            />
          </div>
        ))}
        <Button onClick={handleSave} className="w-full">
          <Check className="mr-1 h-4 w-4" />
          {saved ? "已儲存" : "儲存覺察"}
        </Button>
      </CardContent>
    </Card>
  )
}
