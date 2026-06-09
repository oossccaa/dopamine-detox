"use client"

import { DopamineSteps } from "@/components/guide/dopamine-steps"
import { DopReflection } from "@/components/guide/dop-reflection"

export default function GuidePage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">DOPAMINE 八步驟</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          出自《多巴胺國度》。戒斷不是懲罰，而是讓大腦回到平衡的一段練習。
        </p>
      </div>

      <DopamineSteps />

      <DopReflection />
    </div>
  )
}
