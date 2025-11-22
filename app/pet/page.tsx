"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PetSetup } from "@/components/pet-setup"
import { PetDisplay } from "@/components/pet-display"
import { PetActions } from "@/components/pet-actions"
import { PetStats } from "@/components/pet-stats"
import { FinancialTracker } from "@/components/financial-tracker"
import { EarningsSystem } from "@/components/earnings-system"
import { PetPlayground } from "@/components/pet-playground"
import { FinancialAnalytics } from "@/components/financial-analytics"
import { ClockDisplay } from "@/components/clock-display"
import { Button } from "@/components/ui/button"
import { AchievementsSection } from "@/components/achievements-section"
import { GameDirections } from "@/components/game-directions"
import { AchievementNotification } from "@/components/achievement-notification"
import type { Pet, Transaction } from "@/lib/types"
import {
  calculatePetState,
  updatePetNeeds,
  getTodayDate,
  shouldResetDailyActions,
  getTodayGameDay,
  skipToNextDay,
} from "@/lib/pet-logic"

export default function VirtualPetPage() {
  const [pet, setPet] = useState<Pet | null>(null)
  const [money, setMoney] = useState(100)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const [isDead, setIsDead] = useState(false)
  const [pendingAchievement, setPendingAchievement] = useState<any>(null)

  // Load pet data from localStorage on mount
  useEffect(() => {
    const savedPet = localStorage.getItem("virtualPet")
    const savedMoney = localStorage.getItem("petMoney")
    const savedTransactions = localStorage.getItem("petTransactions")
    const savedLastUpdate = localStorage.getItem("lastUpdate")

    if (savedPet) {
      const parsedPet = JSON.parse(savedPet)
      const lastUpdateTime = savedLastUpdate ? Number.parseInt(savedLastUpdate) : Date.now()

      // Update pet needs based on time passed
      const updatedPet = updatePetNeeds(parsedPet, lastUpdateTime)

      if (shouldResetDailyActions(updatedPet)) {
        updatedPet.lastGameDay = getTodayGameDay(updatedPet.createdAt)
        updatedPet.completedActionsToday = {}
      }

      setPet(updatedPet)
      if (updatedPet.health <= 0) {
        setIsDead(true)
      }
    }

    if (savedMoney) setMoney(Number.parseFloat(savedMoney))
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
    setLastUpdate(Date.now())
  }, [])

  // Save pet data to localStorage whenever it changes
  useEffect(() => {
    if (pet) {
      localStorage.setItem("virtualPet", JSON.stringify(pet))
      localStorage.setItem("petMoney", money.toString())
      localStorage.setItem("petTransactions", JSON.stringify(transactions))
      localStorage.setItem("lastUpdate", Date.now().toString())
    }
  }, [pet, money, transactions])

  // Auto-update pet needs every minute
  useEffect(() => {
    if (!pet || isDead) return

    const interval = setInterval(() => {
      setPet((prevPet) => {
        if (!prevPet) return null

        const updated = updatePetNeeds(prevPet, lastUpdate)

        if (shouldResetDailyActions(updated)) {
          updated.lastGameDay = getTodayGameDay(updated.createdAt)
          updated.completedActionsToday = {}
        }

        if (updated.health <= 0) {
          setIsDead(true)
        }

        return updated
      })
      setLastUpdate(Date.now())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [pet, lastUpdate, isDead])

  // Also trigger UI updates every second for clock
  useEffect(() => {
    if (!pet || isDead) return
    const interval = setInterval(() => {
      setLastUpdate(Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [pet, isDead])

  const handlePetCreated = (newPet: Pet) => {
    const petWithTracking = {
      ...newPet,
      lastGameDay: getTodayGameDay(newPet.createdAt),
      completedActionsToday: {},
      daysPassed: 0,
      unlockedAchievements: [],
      cleanCount: 0,
      vetCount: 0,
      treatCount: 0,
      sleepCount: 0,
    }
    setPet(petWithTracking)
    setIsDead(false)
    setLastUpdate(Date.now())
  }

  const handleAction = (action: string, cost: number) => {
    if (isDead) return

    if (cost > 0 && money < cost) {
      alert("Not enough money!")
      return
    }

    setPet((prevPet) => {
      if (!prevPet) return null

      const updatedPet = { ...prevPet }
      const today = getTodayDate()
      const newUnlockedAchievements = [...(updatedPet.unlockedAchievements || [])]
      let achievementUnlocked: any = null

      switch (action) {
        case "feed":
          updatedPet.hunger = Math.min(100, updatedPet.hunger + 30)
          updatedPet.health = Math.min(100, updatedPet.health + 5)
          break
        case "play":
          if (updatedPet.hunger < 30) {
            updatedPet.health = Math.max(0, updatedPet.health - 20)
          } else {
            updatedPet.happiness = Math.min(100, updatedPet.happiness + 25)
          }
          updatedPet.energy = Math.max(0, updatedPet.energy - 15)
          updatedPet.hunger = Math.max(0, updatedPet.hunger - 10)
          break
        case "rest":
          updatedPet.energy = Math.min(100, updatedPet.energy + 40)
          updatedPet.health = Math.min(100, updatedPet.health + 10)
          break
        case "clean":
          updatedPet.hygiene = Math.min(100, updatedPet.hygiene + 35)
          updatedPet.happiness = Math.min(100, updatedPet.happiness + 10)
          updatedPet.cleanCount = (updatedPet.cleanCount || 0) + 1
          if (updatedPet.cleanCount === 20 && !newUnlockedAchievements.includes("clean_freak")) {
            newUnlockedAchievements.push("clean_freak")
            achievementUnlocked = { title: "Clean Freak", unlockedIcon: "✨" }
          }
          break
        case "vet":
          updatedPet.health = 100
          updatedPet.happiness = Math.max(0, updatedPet.happiness - 10)
          updatedPet.vetCount = (updatedPet.vetCount || 0) + 1
          if (updatedPet.vetCount === 10 && !newUnlockedAchievements.includes("veterinarian")) {
            newUnlockedAchievements.push("veterinarian")
            achievementUnlocked = { title: "Veterinarian", unlockedIcon: "🏥" }
          }
          break
        case "toy":
          updatedPet.happiness = Math.min(100, updatedPet.happiness + 30)
          updatedPet.energy = Math.max(0, updatedPet.energy - 10)
          break
        case "treat":
          updatedPet.happiness = Math.min(100, updatedPet.happiness + 20)
          updatedPet.hunger = Math.min(100, updatedPet.hunger + 15)
          updatedPet.treatCount = (updatedPet.treatCount || 0) + 1
          if (updatedPet.treatCount === 50 && !newUnlockedAchievements.includes("treat_giver")) {
            newUnlockedAchievements.push("treat_giver")
            achievementUnlocked = { title: "Treat Giver", unlockedIcon: "🍪" }
          }
          break
        case "sleep":
          updatedPet.energy = Math.min(100, updatedPet.energy + 50)
          updatedPet.health = Math.min(100, updatedPet.health + 15)
          updatedPet.sleepCount = (updatedPet.sleepCount || 0) + 1
          if (updatedPet.sleepCount === 30 && !newUnlockedAchievements.includes("night_owl")) {
            newUnlockedAchievements.push("night_owl")
            achievementUnlocked = { title: "Night Owl", unlockedIcon: "🌙" }
          }
          break
      }

      // Update experience and level
      updatedPet.experience += 10
      const newLevel = Math.floor(updatedPet.experience / 100) + 1
      if (newLevel > updatedPet.level) {
        updatedPet.level = newLevel
        updatedPet.stage = newLevel < 5 ? "baby" : newLevel < 10 ? "child" : "adult"
        if (newLevel === 10 && !newUnlockedAchievements.includes("pet_master")) {
          newUnlockedAchievements.push("pet_master")
          achievementUnlocked = { title: "Pet Master", unlockedIcon: "👑" }
        }
        if (newLevel === 50 && money >= 1000 && !newUnlockedAchievements.includes("legend")) {
          newUnlockedAchievements.push("legend")
          achievementUnlocked = { title: "Legend", unlockedIcon: "⭐" }
        }
      }

      // Check day-based achievements
      const currentDay = getTodayGameDay(updatedPet.createdAt)
      if (currentDay >= 7 && !newUnlockedAchievements.includes("first_week")) {
        newUnlockedAchievements.push("first_week")
        achievementUnlocked = { title: "First Week", unlockedIcon: "🎉" }
      }
      if (currentDay >= 30 && !newUnlockedAchievements.includes("marathon")) {
        newUnlockedAchievements.push("marathon")
        achievementUnlocked = { title: "Marathon", unlockedIcon: "🏃" }
      }

      if (action !== "sleep" && action !== "rest" && action !== "play" && action !== "feed" && action !== "treat") {
        if (!updatedPet.completedActionsToday) {
          updatedPet.completedActionsToday = {}
        }
        updatedPet.completedActionsToday[action] = true
      }

      if (updatedPet.health <= 0) {
        setIsDead(true)
      }

      updatedPet.unlockedAchievements = newUnlockedAchievements

      if (achievementUnlocked) {
        setPendingAchievement(achievementUnlocked)
      }

      return updatedPet
    })

    if (cost > 0) {
      setMoney((prev) => prev - cost)
      addTransaction(action, -cost)
    }

    setLastUpdate(Date.now())
  }

  const handleEarnMoney = (amount: number, description: string) => {
    addTransaction(description, amount)
    setMoney((prev) => {
      const newMoney = prev + amount

      // Check total earned (not current balance)
      const totalEarned = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0) + amount

      setPet((prevPet) => {
        if (!prevPet) return null
        const newUnlockedAchievements = [...(prevPet.unlockedAchievements || [])]

        if (totalEarned >= 500 && !newUnlockedAchievements.includes("financial_master")) {
          newUnlockedAchievements.push("financial_master")
          setPendingAchievement({ title: "Financial Master", unlockedIcon: "💎" })
        }

        return {
          ...prevPet,
          unlockedAchievements: newUnlockedAchievements,
        }
      })
      return newMoney
    })
  }

  const addTransaction = (description: string, amount: number) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount,
      timestamp: Date.now(),
    }
    setTransactions((prev) => [transaction, ...prev].slice(0, 50)) // Keep last 50 transactions
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your pet? This cannot be undone.")) {
      localStorage.removeItem("virtualPet")
      localStorage.removeItem("petMoney")
      localStorage.removeItem("petTransactions")
      localStorage.removeItem("lastUpdate")
      setPet(null)
      setMoney(100)
      setTransactions([])
      setIsDead(false)
      setLastUpdate(Date.now())
    }
  }

  const handleSkipDay = () => {
    setPet((prevPet) => {
      if (!prevPet) return null
      const beforeDay = getTodayGameDay(prevPet.createdAt)
      const skippedPet = skipToNextDay(prevPet)
      const afterDay = getTodayGameDay(skippedPet.createdAt)

      // Increment daysPassed if we actually moved to a new day
      if (afterDay > beforeDay) {
        skippedPet.daysPassed = (prevPet.daysPassed || 0) + 1
      }

      return skippedPet
    })
    setLastUpdate(Date.now())
  }

  if (!pet) {
    return <PetSetup onPetCreated={handlePetCreated} />
  }

  const petState = calculatePetState(pet)

  if (isDead) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center space-y-8">
          <div className="text-8xl mb-4">🪦</div>
          <h1 className="text-5xl font-bold text-foreground">Rest in Peace</h1>
          <p className="text-2xl text-muted-foreground">{pet.name} has passed away...</p>
          <p className="text-lg text-muted-foreground">
            Your pet needed better care. Pet ownership teaches us financial responsibility and the importance of
            budgeting for necessities!
          </p>
          <div className="space-y-3 pt-6">
            <Button onClick={handleReset} size="lg" className="w-full">
              Start Over with a New Pet
            </Button>
            <Link href="/" className="block">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <AchievementNotification achievement={pendingAchievement} onClose={() => setPendingAchievement(null)} />
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <span className="mr-2">←</span>
                Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pet Planet</h1>
              <p className="text-sm text-muted-foreground">
                Day {getTodayGameDay(pet.createdAt)} - Learn financial responsibility through pet care!
              </p>
            </div>
          </div>
          <Button onClick={handleReset} variant="destructive" size="sm">
            Reset Pet
          </Button>
        </header>

        <ClockDisplay createdAt={pet.createdAt} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Pet Care */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Pet Care</h2>
              <div className="space-y-4">
                <PetPlayground pet={pet} onAction={handleAction} />
                <PetDisplay pet={pet} petState={petState} />
                <PetStats pet={pet} petState={petState} />
                <PetActions onAction={handleAction} money={money} pet={pet} onSkipDay={handleSkipDay} />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Financial Management</h2>
              <div className="space-y-4">
                <FinancialAnalytics money={money} transactions={transactions} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <EarningsSystem onEarnMoney={handleEarnMoney} />
            <FinancialTracker money={money} transactions={transactions} />
            <AchievementsSection
              unlockedAchievements={pet.unlockedAchievements || []}
              daysPassed={getTodayGameDay(pet.createdAt)}
              petLevel={pet.level || 1}
              totalMoney={money}
            />
            <GameDirections />
          </div>
        </div>
      </div>
    </div>
  )
}
