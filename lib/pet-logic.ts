import type { Pet, PetState, PetMood } from "./types"

/**
 * Get current in-game time based on 2-minute cycle
 * Cycle: 7:00 AM - 8:00 PM (day), 8:00 PM - 7:00 AM (night)
 * 2 minutes real time = 1 full game day = 1440 game minutes
 * ~5 seconds real time = 1 hour in game
 */
export function getGameTime(createdAt: number): { hour: number; minute: number; isPeriod: "day" | "night" } {
  const now = Date.now()
  const elapsedMs = now - createdAt

  // 1 real second = 12 game minutes (2 minutes * 60 seconds = 120 seconds per day; 1440 / 120 = 12 minutes per second)
  const elapsedGameMinutes = Math.floor((elapsedMs / 1000) * 12)

  // Start at 7:00 AM (7 * 60 = 420 minutes from midnight)
  const startGameMinutes = 7 * 60
  const gameMinutesInDay = elapsedGameMinutes + startGameMinutes

  // Normalize to 0-1440 (24 hours)
  const normalizedMinutes = gameMinutesInDay % (24 * 60)

  const hour = Math.floor(normalizedMinutes / 60)
  const minute = normalizedMinutes % 60

  // Day: 7 AM (7) - 8 PM (20), Night: 8 PM (20) - 7 AM (7)
  const isPeriod = hour >= 7 && hour < 20 ? "day" : "night"

  return { hour, minute, isPeriod }
}

/**
 * Get the current game day number
 */
export function getGameDay(createdAt: number): number {
  const now = Date.now()
  const elapsedMs = now - createdAt
  const elapsedGameMinutes = Math.floor((elapsedMs / 1000) * 12)
  return Math.floor(elapsedGameMinutes / 1440) + 1
}

/**
 * Check if it's nighttime (sleep hours) - 8 PM to 6 AM
 */
export function isNightTime(createdAt: number): boolean {
  const { hour } = getGameTime(createdAt)
  return hour >= 20 || hour < 6
}

/**
 * Get today's game day for daily reset tracking
 */
export function getTodayGameDay(createdAt: number): number {
  return getGameDay(createdAt)
}

/**
 * Check if a new day has started (reset daily actions)
 */
export function shouldResetDailyActions(pet: Pet): boolean {
  const currentDay = getTodayGameDay(pet.createdAt)
  return (pet.lastGameDay || 0) !== currentDay
}

/**
 * Get today's date in ISO format for daily reset tracking
 */
export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0]
}

export function skipToNextDay(pet: Pet): Pet {
  const gameTime = getGameTime(pet.createdAt)

  // Only allow skipping during night (8 PM to 6 AM)
  if (gameTime.hour < 20 && gameTime.hour >= 6) {
    return pet
  }

  // Current time in minutes from midnight
  const currentTotalMinutes = gameTime.hour * 60 + gameTime.minute

  // Calculate minutes until 7 AM
  let minutesUntil7AM: number
  if (gameTime.hour >= 20) {
    // From 8 PM to 7 AM next day: (24 - currentHour) + 7 hours
    minutesUntil7AM = (24 * 60 - currentTotalMinutes) + (7 * 60)
  } else {
    // From midnight to 6 AM, skip to 7 AM same day
    minutesUntil7AM = (7 * 60) - currentTotalMinutes
  }

  // Convert game minutes to real milliseconds
  const skipMs = (minutesUntil7AM / 12) * 1000

  // Update createdAt by reducing it (moving time forward)
  const newCreatedAt = pet.createdAt - skipMs

  return {
    ...pet,
    createdAt: newCreatedAt,
    lastGameDay: getTodayGameDay(newCreatedAt),
    completedActionsToday: {},
    hunger: Math.max(0, pet.hunger - 40),
    energy: Math.max(0, pet.energy - 30),
    hygiene: Math.max(0, pet.hygiene - 25),
  }
}

/**
 * Calculate the current state and mood of the pet based on its stats
 */
export function calculatePetState(pet: Pet): PetState {
  const { hunger, happiness, health, energy, hygiene } = pet

  // Determine mood based on stats
  let mood: PetMood = "happy"
  let emoji = "😊"
  let message = `${pet.name} is doing great!`
  let color = "text-secondary"

  // Priority: health issues first
  if (health < 30) {
    mood = "sick"
    emoji = "🤒"
    message = `${pet.name} is feeling sick and needs a vet visit!`
    color = "text-destructive"
  } else if (hunger < 20) {
    mood = "hungry"
    emoji = "😋"
    message = `${pet.name} is very hungry!`
    color = "text-accent"
  } else if (hygiene < 25) {
    mood = "dirty"
    emoji = "🫧"
    message = `${pet.name} needs a bath!`
    color = "text-muted-foreground"
  } else if (energy < 20) {
    mood = "tired"
    emoji = "😴"
    message = `${pet.name} is exhausted and needs rest.`
    color = "text-muted-foreground"
  } else if (happiness < 30) {
    mood = "sad"
    emoji = "😢"
    message = `${pet.name} is feeling sad. Play with them!`
    color = "text-primary"
  } else if (energy > 70 && happiness > 70) {
    mood = "energetic"
    emoji = "🤩"
    message = `${pet.name} is full of energy and joy!`
    color = "text-secondary"
  } else if (happiness > 60 && health > 60 && hunger > 50) {
    mood = "happy"
    emoji = "😊"
    message = `${pet.name} is happy and healthy!`
    color = "text-secondary"
  }

  return { mood, emoji, message, color }
}

/**
 * Update pet needs based on time passed since last update
 */
export function updatePetNeeds(pet: Pet, lastUpdateTime: number): Pet {
  const now = Date.now()
  const minutesPassed = Math.floor((now - lastUpdateTime) / 60000)

  if (minutesPassed === 0) return pet

  // Decay rates per minute
  const hungerDecay = 0.5
  const happinessDecay = 0.3
  const energyDecay = 0.2
  const hygieneDecay = 0.25
  const healthDecay = 0.1

  let updatedPet = {
    ...pet,
    hunger: Math.max(0, pet.hunger - hungerDecay * minutesPassed),
    happiness: Math.max(0, pet.happiness - happinessDecay * minutesPassed),
    energy: Math.max(0, pet.energy - energyDecay * minutesPassed),
    hygiene: Math.max(0, pet.hygiene - hygieneDecay * minutesPassed),
    health: Math.max(0, pet.health - healthDecay * minutesPassed),
  }

  if (shouldResetDailyActions(updatedPet)) {
    updatedPet = {
      ...updatedPet,
      lastGameDay: getTodayGameDay(updatedPet.createdAt),
      completedActionsToday: {},
    }
  }

  return updatedPet
}

/**
 * Get pet emoji based on type and stage
 */
export function getPetEmoji(type: string, stage: string): string {
  const emojiMap: Record<string, Record<string, string>> = {
    dog: { baby: "🐕", child: "🐕", adult: "🐕" },
    cat: { baby: "🐱", child: "🐱", adult: "🐈" },
    rabbit: { baby: "🐰", child: "🐰", adult: "🐇" },
    hamster: { baby: "🐹", child: "🐹", adult: "🐹" },
  }

  return emojiMap[type]?.[stage] || "🐾"
}
