"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getGameTime } from "@/lib/pet-logic"

interface ClockDisplayProps {
  createdAt: number
}

export function ClockDisplay({ createdAt }: ClockDisplayProps) {
  const [time, setTime] = useState<{ hour: number; minute: number; isPeriod: "day" | "night" } | null>(null)

  useEffect(() => {
    setTime(getGameTime(createdAt))
    const interval = setInterval(() => {
      setTime(getGameTime(createdAt))
    }, 1000)
    return () => clearInterval(interval)
  }, [createdAt])

  if (!time) return null

  const periodEmoji = time.isPeriod === "day" ? "☀️" : "🌙"
  const ampm = time.hour >= 12 ? "pm" : "am"
  const displayHour = time.hour % 12 === 0 ? 12 : time.hour % 12
  const formatTime = `${displayHour} ${ampm}`

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{periodEmoji}</span>
          <div>
            <p className="text-xs text-muted-foreground">In-game Time</p>
            <p className="text-2xl font-bold">{formatTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
