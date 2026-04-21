"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOOD_EMOJIS } from "@/lib/constants"
import type { MoodTrendPoint } from "@/hooks/use-stats"

interface MoodTrendChartProps {
  data: MoodTrendPoint[]
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">心情趨勢</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            尚無心情紀錄
          </p>
        </CardContent>
      </Card>
    )
  }

  const formatYAxis = (value: number) => {
    const index = Math.round(value) - 1
    return MOOD_EMOJIS[index] ?? ""
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">心情趨勢（近 14 天）</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 14 }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
