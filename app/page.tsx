"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FAQDialog } from "@/components/faq-dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AchievementsSection } from "@/components/achievements-section"
import { GameDirections } from "@/components/game-directions"

export default function HomePage() {
  // Sample earnings chart data showing earning trends
  const earningsData = [
    { day: "Mon", earnings: 0 },
    { day: "Tue", earnings: 25 },
    { day: "Wed", earnings: 45 },
    { day: "Thu", earnings: 75 },
    { day: "Fri", earnings: 110 },
    { day: "Sat", earnings: 155 },
    { day: "Sun", earnings: 200 },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-primary/10 to-secondary/20 p-4">
      <div className="w-full max-w-7xl space-y-12 text-center py-12">
        {/* Hero Section */}
        <div className="space-y-10">
          <div className="flex justify-center gap-6 text-8xl drop-shadow-xl">
            <span className="animate-bounce-slow">🐕</span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.2s" }}>
              🐱
            </span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.4s" }}>
              🐰
            </span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.6s" }}>
              🐹
            </span>
          </div>

          <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl drop-shadow-md">
            Virtual Pet Care
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl opacity-90">
            A calming, interactive world of pets & responsibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Card */}
            <div className="rounded-3xl border bg-card/40 p-10 shadow-2xl backdrop-blur-xl space-y-10">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-secondary/10 p-6 space-y-3">
                  <div className="text-5xl">💰</div>
                  <h3 className="font-semibold text-lg">Budget</h3>
                </div>

                <div className="rounded-2xl bg-primary/10 p-6 space-y-3">
                  <div className="text-5xl">🎯</div>
                  <h3 className="font-semibold text-lg">Care</h3>
                </div>

                <div className="rounded-2xl bg-accent/10 p-6 space-y-3">
                  <div className="text-5xl">📊</div>
                  <h3 className="font-semibold text-lg">Progress</h3>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Typical Earnings Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={earningsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4 pt-4">
                <Link href="/pet">
                  <Button size="lg" className="w-full text-lg rounded-xl shadow-md">
                    <span className="mr-2">🚀</span>
                    Play
                  </Button>
                </Link>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <GameDirections />
                  </div>
                  <div className="flex-1">
                    <FAQDialog />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements */}
          <div className="lg:col-span-1">
            <AchievementsSection unlockedAchievements={[]} daysPassed={0} petLevel={1} totalMoney={100} />
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="pt-4 text-sm text-muted-foreground opacity-75">
          <p>FBLA Introduction to Programming Project</p>
        </footer>
      </div>
    </div>
  )
}
