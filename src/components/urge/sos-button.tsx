"use client"

import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SosButton() {
  return (
    <Link href="/urge">
      <Button
        size="lg"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-red-500 p-0 shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
      >
        <ShieldAlert className="h-6 w-6 text-white" />
      </Button>
    </Link>
  )
}
