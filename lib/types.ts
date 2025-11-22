//Pet type definition
export type PetType = "dog" | "cat" | "rabbit" | "hamster"
export type PetStage = "baby" | "child" | "adult"
export type PetMood = "happy" | "sad" | "sick" | "energetic" | "tired" | "hungry" | "dirty"

export interface Pet {
  name: string
  type: PetType
  stage: PetStage
  level: number
  experience: number

  //Core stats
  hunger: number
  happiness: number
  health: number
  energy: number
  hygiene: number

  //Timestamps
  createdAt: number
  lastFed: number
  lastPlayed: number
  lastCleaned: number
  lastGameDay: number 
  completedActionsToday: Record<string, boolean> 

  unlockedAchievements: string[]
  daysPassed: number

  //Achievement tracking counters
  cleanCount?: number
  vetCount?: number
  treatCount?: number
  sleepCount?: number
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
