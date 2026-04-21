"use client"

import { useState } from "react"
import { ShieldAlert } from "lucide-react"
import { CopingStrategyList } from "@/components/urge/coping-strategy-list"
import { MeditationTimer } from "@/components/urge/meditation-timer"
import { UrgeLogForm } from "@/components/urge/urge-log-form"
import { useUrgeLog } from "@/hooks/use-urge-log"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"
import type { CopingStrategy } from "@/types/urge"

type Stage = "select" | "doing" | "log"

export default function UrgePage() {
  const { strategies, recentLogs, refresh } = useUrgeLog()
  const [selectedStrategy, setSelectedStrategy] = useState<CopingStrategy | null>(null)
  const [stage, setStage] = useState<Stage>("select")

  const handleSelect = (strategy: CopingStrategy) => {
    setSelectedStrategy(strategy)
    // 有計時器的進入 doing 階段��沒計時器的也進入 doing（顯示「完成了嗎？」）
    setStage("doing")
  }

  const handleSaved = async () => {
    setStage("select")
    setSelectedStrategy(null)
    await refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">衝動輔助</h2>
          <p className="text-sm text-muted-foreground">
            深呼吸，選擇一個策略來幫助你
          </p>
        </div>
      </div>

      <CopingStrategyList
        strategies={strategies}
        selected={selectedStrategy?.name ?? null}
        onSelect={handleSelect}
      />

      {/* 有計時器：顯示倒數 */}
      {selectedStrategy?.timerMinutes && stage === "doing" && (
        <Card>
          <CardContent className="py-6">
            <MeditationTimer
              key={selectedStrategy.name}
              minutes={selectedStrategy.timerMinutes}
              label={selectedStrategy.name}
              onComplete={() => setStage("log")}
              onSkip={() => setStage("log")}
            />
          </CardContent>
        </Card>
      )}

      {/* 無計時器：顯示「完成了嗎？」 */}
      {selectedStrategy && !selectedStrategy.timerMinutes && stage === "doing" && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-6">
            <p className="text-sm text-muted-foreground">
              去{selectedStrategy.name}吧！完成後回來記錄
            </p>
            <Button onClick={() => setStage("log")}>
              <CheckCircle className="mr-1 h-4 w-4" />
              完成了，記錄這次衝動
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 紀錄表單 */}
      {selectedStrategy && stage === "log" && (
        <UrgeLogForm
          strategyUsed={selectedStrategy.name}
          onSaved={handleSaved}
        />
      )}

      {recentLogs.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="mb-3 text-base font-semibold">最近紀錄</h3>
            <div className="space-y-2">
              {recentLogs.slice(0, 5).map((log) => (
                <Card key={log.id}>
                  <CardContent className="flex items-center justify-between p-3">
                    <div>
                      <p className="text-sm font-medium">{log.strategyUsed}</p>
                      <p className="text-xs text-muted-foreground">
                        強度 {log.intensity}/5 ·{" "}
                        {log.helped === true
                          ? "有幫助"
                          : log.helped === false
                          ? "沒用"
                          : "未評價"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {log.date}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
