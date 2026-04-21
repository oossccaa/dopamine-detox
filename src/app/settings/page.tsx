"use client"

import { TrackingItemManager } from "@/components/settings/tracking-item-manager"
import { DataExportImport } from "@/components/settings/data-export-import"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">設定</h2>
      <TrackingItemManager />
      <DataExportImport />
    </div>
  )
}
