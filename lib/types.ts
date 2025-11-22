// Pet type definition
export type PetType = "dog" | "cat" | "rabbit" | "hamster"
export type PetStage = "baby" | "child" | "adult"
export type PetMood = "happy" | "sad" | "sick" | "energetic" | "tired" | "hungry" | "dirty"

export interface Pet {
  name: string
  type: PetType
  stage: PetStage
  level: number
  experience: number

  // Core stats (0-100)
  hunger: number
  happiness: number
  health: number
  energy: number
  hygiene: number

  // Timestamps
  createdAt: number
  lastFed: number
  lastPlayed: number
  lastCleaned: number
  lastGameDay: number // Track game day instead of real date
  completedActionsToday: Record<string, boolean> // Track which chores were done today

  unlockedAchievements: string[]
  daysPassed: number
}

export interface PetState {
  mood: PetMood
  emoji: string
  message: string
  color: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  timestamp: number
}

export interface ActionCost {
  name: string
  cost: number
  icon: string
  description: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedIcon: string
}
