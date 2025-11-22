"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { isNightTime, getTodayGameDay } from "@/lib/pet-logic"
import type { Pet } from "@/lib/types"

interface PetActionsProps {
  onAction: (action: string, cost: number) => void
  money: number
  pet: Pet
  onSkipDay: () => void
}

// Chores - can only be done once per day
const chores = [
  { id: "clean", label: "Clean", icon: "🫧", cost: 4, description: "Give your pet a bath" },
  { id: "vet", label: "Vet Visit", icon: "🏥", cost: 25, description: "Take to the vet" },
]

// Pet care - can be done multiple times
const petCare = [
  { id: "feed", label: "Feed", icon: "🍖", cost: 5, description: "Give your pet food" },
  { id: "rest", label: "Rest", icon: "😴", cost: 0, description: "Let your pet sleep" },
  { id: "treat", label: "Give Treat", icon: "🍪", cost: 8, description: "Special treat" },
]

export function PetActions({ onAction, money, pet, onSkipDay }: PetActionsProps) {
  const isNight = isNightTime(pet.createdAt)
  const currentDay = getTodayGameDay(pet.createdAt)
  const completedToday = pet.completedActionsToday || {}

  let visibleActions = []
  if (isNight) {
    visibleActions = [{ id: "sleep", label: "Sleep", icon: "🛏️", cost: 0, description: "Rest overnight" }]
  } else {
    visibleActions = [...petCare, ...chores]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>🎮</span>
              {isNight ? "Night Time - Rest" : "Pet Care Actions"}
            </CardTitle>
            {isNight && <p className="text-sm text-muted-foreground mt-2">Your pet needs to sleep at night</p>}
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Your Money</div>
            <div className="text-2xl font-bold text-secondary">${money.toFixed(2)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleActions.map((action) => {
              const canAfford = money >= action.cost
              const isChore = chores.some((c) => c.id === action.id)
              const isCompleted = isChore && completedToday[action.id]
              const isDisabled = (!canAfford && action.cost > 0) || isCompleted

              return (
                <Button
                  key={action.id}
                  onClick={() => onAction(action.id, action.cost)}
                  disabled={isDisabled}
                  variant={!isDisabled ? "default" : "outline"}
                  className="h-auto flex-col gap-2 p-4"
                  title={isCompleted ? "Chore already completed today" : ""}
                >
                  <span className="text-3xl">{action.icon}</span>
                  <span className="font-semibold">{action.label}</span>
                  <span className="text-xs opacity-80">{action.description}</span>
                  {action.cost > 0 && (
                    <span className={`text-sm font-bold ${canAfford ? "text-primary-foreground" : "text-destructive"}`}>
                      ${action.cost}
                    </span>
                  )}
                  {action.cost === 0 && <span className="text-sm font-bold text-secondary">Free</span>}
                  {isCompleted && <span className="text-xs font-semibold text-accent">Done Today</span>}
                </Button>
              )
            })}
          </div>

          {isNight && (
            <Button onClick={onSkipDay} variant="secondary" className="w-full mt-4">
              ⏭️ Skip to Daytime
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
