"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload, AlertTriangle } from "lucide-react"
import { db, seedDefaults } from "@/lib/db"

export function DataExportImport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importing, setImporting] = useState(false)
  const [message, setMessage] = useState("")

  const handleExport = async () => {
    const data = {
      version: 3,
      exportedAt: new Date().toISOString(),
      trackingItems: await db.trackingItems.toArray(),
      checkins: await db.checkins.toArray(),
      moods: await db.moods.toArray(),
      urgeLogs: await db.urgeLogs.toArray(),
      copingStrategies: await db.copingStrategies.toArray(),
      challenge: await db.challenge.toArray(),
      dailyLogs: await db.dailyLogs.toArray(),
      relapseEvents: await db.relapseEvents.toArray(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dopamine-detox-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage("匯出成功！")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    try {
      const text = await file.text()
      const data = JSON.parse(text)

      if (!data.version || !data.trackingItems) {
        throw new Error("無效的備份檔案")
      }

      await db.trackingItems.clear()
      await db.checkins.clear()
      await db.moods.clear()
      await db.urgeLogs.clear()
      await db.copingStrategies.clear()
      await db.challenge.clear()
      await db.dailyLogs.clear()
      await db.relapseEvents.clear()

      if (data.trackingItems.length > 0)
        await db.trackingItems.bulkAdd(data.trackingItems)
      if (data.checkins?.length > 0) await db.checkins.bulkAdd(data.checkins)
      if (data.moods?.length > 0) await db.moods.bulkAdd(data.moods)
      if (data.urgeLogs?.length > 0) await db.urgeLogs.bulkAdd(data.urgeLogs)
      if (data.copingStrategies?.length > 0)
        await db.copingStrategies.bulkAdd(data.copingStrategies)
      // 新表格：v1 舊備份不會有，逐一判斷存在性
      if (data.challenge?.length > 0) await db.challenge.bulkAdd(data.challenge)
      if (data.dailyLogs?.length > 0) await db.dailyLogs.bulkAdd(data.dailyLogs)
      if (data.relapseEvents?.length > 0)
        await db.relapseEvents.bulkAdd(data.relapseEvents)

      setMessage("匯入成功！重新整理頁面以查看更新。")
    } catch {
      setMessage("匯入失敗：檔案格式錯誤")
    } finally {
      setImporting(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleReset = async () => {
    if (!confirm("確定要清除所有紀錄嗎？包含 30 天挑戰、每日覺察、心情與衝動紀錄。")) return
    await db.checkins.clear()
    await db.moods.clear()
    await db.urgeLogs.clear()
    await db.challenge.clear()
    await db.dailyLogs.clear()
    await db.relapseEvents.clear()
    // 重新種回預設項目和策略
    await db.trackingItems.clear()
    await db.copingStrategies.clear()
    await seedDefaults()
    window.location.reload()
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">資料管理</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleExport}>
            <Download className="mr-1 h-4 w-4" />
            匯出資料
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={importing}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-1 h-4 w-4" />
            匯入資料
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-destructive hover:text-destructive"
          onClick={handleReset}
        >
          <AlertTriangle className="mr-1 h-4 w-4" />
          清除所有資料
        </Button>

        {message && (
          <p className="text-center text-sm text-muted-foreground">{message}</p>
        )}
      </CardContent>
    </Card>
  )
}
