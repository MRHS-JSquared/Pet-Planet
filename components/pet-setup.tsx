"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Pet, PetType } from "@/lib/types"

interface PetSetupProps {
  onPetCreated: (pet: Pet) => void
}

const petTypes: { type: PetType; emoji: string; name: string }[] = [
  { type: "dog", emoji: "🐕", name: "Dog" },
  { type: "cat", emoji: "🐱", name: "Cat" },
  { type: "rabbit", emoji: "🐰", name: "Rabbit" },
  { type: "hamster", emoji: "🐹", name: "Hamster" },
]

export function PetSetup({ onPetCreated }: PetSetupProps) {
  const [petName, setPetName] = useState("")
  const [selectedType, setSelectedType] = useState<PetType>("dog")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!petName.trim()) {
      alert("Please enter a name for your pet!")
      return
    }

    const newPet: Pet = {
      name: petName.trim(),
      type: selectedType,
      stage: "baby",
      level: 1,
      experience: 0,
      hunger: 80,
      happiness: 80,
      health: 100,
      energy: 80,
      hygiene: 100,
      createdAt: Date.now(),
      lastFed: Date.now(),
      lastPlayed: Date.now(),
      lastCleaned: Date.now(),
    }

    onPetCreated(newPet)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">Welcome to Virtual Pet!</CardTitle>
          <CardDescription className="text-lg">
            Create your pet and learn about the financial responsibility of pet ownership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="petName" className="text-lg font-semibold">
                What will you name your pet?
              </Label>
              <Input
                id="petName"
                type="text"
                placeholder="Enter pet name..."
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="text-lg"
                maxLength={20}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold">Choose your pet type:</Label>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {petTypes.map(({ type, emoji, name }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-6 transition-all hover:scale-105 ${
                      selectedType === type
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <span className="text-5xl">{emoji}</span>
                    <span className="font-semibold">{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-semibold text-foreground">Getting Started:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• You start with $100 to care for your pet</li>
                <li>• Feed, play, clean, and care for your pet regularly</li>
                <li>• Complete chores to earn more money</li>
                <li>• Watch your pet grow and evolve as you care for them</li>
                <li>• Track all your expenses to learn about budgeting</li>
              </ul>
            </div>

            <Button type="submit" size="lg" className="w-full text-lg">
              Create My Pet! 🎉
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
