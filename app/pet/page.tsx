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
          break
        case "vet":
          updatedPet.health = 100
          updatedPet.happiness = Math.max(0, updatedPet.happiness - 10)
          break
        case "toy":
          updatedPet.happiness = Math.min(100, updatedPet.happiness + 30)
          updatedPet.energy = Math.max(0, updatedPet.energy - 10)
          break
        case "treat":
          updatedPet.happiness = Math.min(100, updatedPet.happiness + 20)
          updatedPet.hunger = Math.min(100, updatedPet.hunger + 15)
          break
        case "sleep":
          updatedPet.energy = Math.min(100, updatedPet.energy + 50)
          updatedPet.health = Math.min(100, updatedPet.health + 15)
          break
      }

      // Update experience and level
      updatedPet.experience += 10
      const newLevel = Math.floor(updatedPet.experience / 100) + 1
      if (newLevel > updatedPet.level) {
        updatedPet.level = newLevel
        updatedPet.stage = newLevel < 5 ? "baby" : newLevel < 10 ? "child" : "adult"
      }

      if (action !== "sleep") {
        if (!updatedPet.completedActionsToday) {
          updatedPet.completedActionsToday = {}
        }
        updatedPet.completedActionsToday[action] = true
      }

      if (updatedPet.health <= 0) {
        setIsDead(true)
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
    setMoney((prev) => prev + amount)
    addTransaction(description, amount)
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
      const skippedPet = skipToNextDay(prevPet)
      skippedPet.daysPassed += 1
      return skippedPet
    })
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
              <h1 className="text-3xl font-bold text-foreground">Virtual Pet Care</h1>
              <p className="text-sm text-muted-foreground">
                Day {pet.daysPassed || 0} - Keep your pet alive and teach financial responsibility!
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSkipDay}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              Skip Day
            </button>
            <button
              onClick={handleReset}
              className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              Reset Pet
            </button>
          </div>
        </header>

        <ClockDisplay createdAt={pet.createdAt} />

        <div className="space-y-4">
          {/* Playground - primary focus */}
          <PetPlayground pet={pet} onAction={handleAction} />

          {/* Stats and Actions - secondary focus */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <PetDisplay pet={pet} petState={petState} />
              <PetActions onAction={handleAction} money={money} pet={pet} onSkipDay={handleSkipDay} />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <PetStats pet={pet} petState={petState} />
              <EarningsSystem onEarnMoney={handleEarnMoney} />
              <FinancialTracker money={money} transactions={transactions} />
              <AchievementsSection
                unlockedAchievements={pet.unlockedAchievements || []}
                daysPassed={pet.daysPassed || 0}
                petLevel={pet.level || 1}
                totalMoney={money}
              />
            </div>
          </div>
        </div>

        <FinancialAnalytics money={money} transactions={transactions} />
        <GameDirections />
      </div>
    </div>
  )
}
