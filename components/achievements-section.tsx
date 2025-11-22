"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Achievement } from "@/lib/types"

//Achievement Section Structure
interface AchievementsSectionProps {
  unlockedAchievements: string[]
  daysPassed: number
  petLevel: number
  totalMoney: number
}

//List of achievements
const achievements: Achievement[] = [
  {
    id: "first_week",
    title: "First Week",
    description: "Keep your pet alive for 7 days",
    icon: "😴",
    unlockedIcon: "🎉",
  },
  {
    id: "pet_master",
    title: "Pet Master",
    description: "Reach level 10 with your pet",
    icon: "😴",
    unlockedIcon: "👑",
  },
  {
    id: "financial_master",
    title: "Financial Master",
    description: "Earn $500 total",
    icon: "😴",
    unlockedIcon: "💎",
  },
  {
    id: "pets_best_friend",
    title: "Pet's Best Friend",
    description: "Keep pet happiness above 80 for 3 consecutive days",
    icon: "😴",
    unlockedIcon: "❤️",
  },
  {
    id: "clean_freak",
    title: "Clean Freak",
    description: "Clean your pet 20 times",
    icon: "😴",
    unlockedIcon: "✨",
  },
  {
    id: "veterinarian",
    title: "Veterinarian",
    description: "Visit the vet 10 times",
    icon: "😴",
    unlockedIcon: "🏥",
  },
  {
    id: "treat_giver",
    title: "Treat Giver",
    description: "Give 50 treats",
    icon: "😴",
    unlockedIcon: "🍪",
  },
  {
    id: "night_owl",
    title: "Night Owl",
    description: "Sleep 30 times",
    icon: "😴",
    unlockedIcon: "🌙",
  },
  {
    id: "marathon",
    title: "Marathon",
    description: "Keep your pet alive for 30 days",
    icon: "😴",
    unlockedIcon: "🏃",
  },
  {
    id: "legend",
    title: "Legend",
    description: "Reach level 50 and earn $1000",
    icon: "😴",
    unlockedIcon: "⭐",
  },
]

export function AchievementsSection({
  unlockedAchievements = [],
  daysPassed,
  petLevel,
  totalMoney,
}: AchievementsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const isUnlockedSafe = (id: string) => {
    return Array.isArray(unlockedAchievements) && unlockedAchievements.includes(id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏆</span>
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = isUnlockedSafe(achievement.id)

            return (
              <div
                key={achievement.id}
                className="relative flex flex-col items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredId(achievement.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`text-4xl transition-all ${
                    isUnlocked ? "opacity-100 scale-100" : "opacity-40 scale-95 grayscale"
                  }`}
                >
                  {isUnlocked ? achievement.unlockedIcon : achievement.icon}
                </div>

                {/*Hover*/}
                {hoveredId === achievement.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-foreground text-background text-xs rounded-lg p-2 text-center whitespace-normal z-10">
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-xs opacity-90">{achievement.description}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
