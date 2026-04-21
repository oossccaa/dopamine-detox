"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MoodSelector } from "./mood-selector"
import { SymptomTags } from "./symptom-tags"
import { Check } from "lucide-react"
import type { MoodEntry } from "@/types/mood"

interface MoodEntryFormProps {
  todayMood: MoodEntry | null
  onSave: (mood: MoodEntry["mood"], symptoms: string[], note?: string) => Promise<void>
}

export function MoodEntryForm({ todayMood, onSave }: MoodEntryFormProps) {
  const [mood, setMood] = useState<MoodEntry["mood"] | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (todayMood) {
      setMood(todayMood.mood)
      setSymptoms(todayMood.symptoms)
      setNote(todayMood.note ?? "")
    }
  }, [todayMood])

  const handleSave = async () => {
    if (!mood) return
    await onSave(mood, symptoms, note || undefined)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">今天的心情</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MoodSelector value={mood} onChange={setMood} />

        <div>
          <p className="mb-2 text-sm font-medium">症狀</p>
          <SymptomTags selected={symptoms} onChange={setSymptoms} />
        </div>

        <Textarea
          placeholder="寫下今天的感受..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />

        <Button
          onClick={handleSave}
          disabled={!mood}
          className="w-full"
          variant={saved ? "outline" : "default"}
        >
          {saved ? (
            <>
              <Check className="mr-1 h-4 w-4" />
              已儲存
            </>
          ) : todayMood ? (
            "更新紀錄"
          ) : (
            "儲存紀錄"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
