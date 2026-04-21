"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { useTrackingItems } from "@/hooks/use-tracking-items"
import { cn } from "@/lib/utils"
import { ITEM_COLORS } from "@/lib/constants"
import { db } from "@/lib/db"

const AVAILABLE_COLORS = ["blue", "red", "orange", "green", "purple", "pink", "teal", "yellow"]

export function TrackingItemManager() {
  const { items, addItem, refresh, getAllItems } = useTrackingItems()
  const [allItems, setAllItems] = useState<Awaited<ReturnType<typeof getAllItems>>>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState("")
  const [newColor, setNewColor] = useState("green")

  const loadAll = async () => {
    const all = await getAllItems()
    setAllItems(all)
  }

  const handleAdd = async () => {
    if (!newName.trim()) return
    await addItem({
      name: newName.trim(),
      icon: "Circle",
      color: newColor,
      isDefault: false,
      isActive: true,
      createdAt: new Date(),
    })
    setNewName("")
    setShowAdd(false)
    await loadAll()
  }

  const handleToggle = async (id: number, currentActive: boolean) => {
    await db.trackingItems.update(id, { isActive: !currentActive })
    await refresh()
    await loadAll()
  }

  const handleDelete = async (id: number) => {
    await db.trackingItems.delete(id)
    await db.checkins.where("trackingItemId").equals(id).delete()
    await refresh()
    await loadAll()
  }

  // Load all items on first render
  useState(() => {
    loadAll()
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">追蹤項目</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Plus className="mr-1 h-4 w-4" />
            新增
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showAdd && (
          <div className="space-y-2 rounded-lg border p-3">
            <Input
              placeholder="輸入項目名稱"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <div className="flex gap-2">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setNewColor(color)}
                  className={cn(
                    "h-6 w-6 rounded-full transition-all",
                    ITEM_COLORS[color],
                    newColor === color && "ring-2 ring-offset-2 ring-primary"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd} disabled={!newName.trim()}>
                確認
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAdd(false)}
              >
                取消
              </Button>
            </div>
          </div>
        )}

        {(allItems.length > 0 ? allItems : items).map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center justify-between rounded-lg border p-3 transition-colors",
              item.isActive ? "bg-emerald-50 border-emerald-200" : "bg-muted/30"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  item.isActive
                    ? (ITEM_COLORS[item.color] ?? "bg-gray-500")
                    : "bg-gray-300"
                )}
              />
              <span className={cn("text-sm", !item.isActive && "text-muted-foreground")}>
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(item.id!, item.isActive)}
                className="text-xs"
              >
                {item.isActive ? "停用" : "啟用"}
              </Button>
              {!item.isDefault && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDelete(item.id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
