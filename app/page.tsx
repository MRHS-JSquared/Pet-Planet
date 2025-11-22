"use client"

//Importing Needed Components and Libraries
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FAQDialog } from "@/components/faq-dialog"
import { AchievementsSection } from "@/components/achievements-section"
import { GameDirections } from "@/components/game-directions"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-primary/10 to-secondary/20 p-4">
      <div className="w-full max-w-7xl space-y-12 text-center py-12">
        {/*Top Section*/}
        <div className="space-y-10">
          <div className="flex justify-center gap-6 text-8xl drop-shadow-xl">
            <span className="animate-bounce-slow">🌍</span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.2s" }}>
              🐕
            </span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.4s" }}>
              🐱
            </span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.6s" }}>
              🐰
            </span>
          </div>

           {/*Title and Main Idea*/}
          <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl drop-shadow-md">Pet Planet</h1>

          <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl opacity-90">
            Learn financial responsibility through caring for your virtual pet!
          </p>
        </div>

        {/*Quick Overview*/}
        <div className="rounded-3xl border bg-card/40 p-10 shadow-2xl backdrop-blur-xl space-y-8 max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-secondary/10 p-4 space-y-2">
              <div className="text-4xl">💰</div>
              <h3 className="font-semibold">Budget Wisely</h3>
              <p className="text-xs text-muted-foreground">Manage your money to afford pet care</p>
            </div>

            <div className="rounded-2xl bg-primary/10 p-4 space-y-2">
              <div className="text-4xl">🎯</div>
              <h3 className="font-semibold">Care Daily</h3>
              <p className="text-xs text-muted-foreground">Feed, clean, and play with your pet</p>
            </div>

            <div className="rounded-2xl bg-accent/10 p-4 space-y-2">
              <div className="text-4xl">📊</div>
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-xs text-muted-foreground">Watch your pet grow and level up</p>
            </div>
          </div>

          {/*Buttons to start, get directions, and open FAQ */}
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/pet">
              <Button size="lg" className="w-full text-lg rounded-xl shadow-md">
                <span className="mr-2">🚀</span>
                Start Your Pet Journey
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

        {/*Footer*/}
        <footer className="pt-4 text-sm text-muted-foreground opacity-75">
          <p>FBLA Introduction to Programming Project - Ehaan Akbar, Danyal Rehman, Guru Velivelli</p>
        </footer>
      </div>
    </div>
  )
}
