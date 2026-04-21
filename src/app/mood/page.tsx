"use client"

import { MoodEntryForm } from "@/components/mood/mood-entry-form"
import { useMoodJournal } from "@/hooks/use-mood-journal"
import { Card, CardContent } from "@/components/ui/card"
import { MOOD_EMOJIS, SYMPTOM_OPTIONS } from "@/lib/constants"
import dayjs from "dayjs"
import "dayjs/locale/zh-tw"

dayjs.locale("zh-tw")

const getSymptomLabel = (value: string) =>
  SYMPTOM_OPTIONS.find((s) => s.value === value)?.label ?? value

export default function MoodPage() {
  const { todayMood, recentEntries, loading, saveMood } = useMoodJournal()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">心情日記</h2>

      <MoodEntryForm todayMood={todayMood} onSave={saveMood} />

      <div>
        <h3 className="mb-3 text-base font-semibold">歷史紀錄</h3>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : recentEntries.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            尚無紀錄
          </p>
        ) : (
          <div className="space-y-2">
            {recentEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="flex items-start gap-3 p-3">
                  <span className="text-2xl">
                    {MOOD_EMOJIS[entry.mood - 1]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {dayjs(entry.date).format("M/D (dd)")}
                    </p>
                    {entry.symptoms.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {entry.symptoms.map(getSymptomLabel).join("、")}
                      </p>
                    )}
                    {entry.note && (
                      <p className="mt-1 text-xs text-muted-foreground truncate">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
