"use client"

import { useEffect } from "react"

interface AchievementNotificationProps {
  achievement: {
    title: string
    unlockedIcon: string
  } | null
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-accent to-secondary text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-bottom-4 z-50">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{achievement.unlockedIcon}</div>
        <div>
          <p className="font-bold">Achievement Unlocked!</p>
          <p className="text-sm">{achievement.title}</p>
        </div>
        <button onClick={onClose} className="ml-2 text-lg font-bold">
          ✕
        </button>
      </div>
    </div>
  )
}
