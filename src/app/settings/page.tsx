"use client"

import { TargetsManager } from "@/components/settings/targets-manager"
import { ChallengeSettings } from "@/components/settings/challenge-settings"
import { DataExportImport } from "@/components/settings/data-export-import"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">設定</h2>
      <TargetsManager />
      <ChallengeSettings />
      <DataExportImport />
    </div>
  )
}
