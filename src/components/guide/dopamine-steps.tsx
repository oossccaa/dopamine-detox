"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { DOPAMINE_STEPS } from "@/lib/constants"

export function DopamineSteps() {
  return (
    <div className="space-y-3">
      {DOPAMINE_STEPS.map((step) => (
        <Card key={step.letter}>
          <CardContent className="flex gap-3 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
              {step.letter}
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
              {step.link && (
                <Link
                  href={step.link.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "-ml-2 mt-1 text-primary"
                  )}
                >
                  {step.link.label}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
