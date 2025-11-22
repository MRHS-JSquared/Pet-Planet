"use client"

import { useEffect } from "react"

//Structure for notifications
interface AchievementNotificationProps {
  achievement: {
    title: string
    unlockedIcon: string
  } | null
  onClose: () => void
}

//Notification Popup
export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 rounded-lg shadow-2xl animate-in slide-in-from-top-4 z-50 border-2 border-accent">
      <div className="flex items-center gap-3">
        <div className="text-4xl animate-bounce">{achievement.unlockedIcon}</div>
        <div className="flex-1">
          <p className="font-bold text-lg">Achievement Unlocked!</p>
          <p className="text-sm opacity-90">{achievement.title}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-xl font-bold hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  )
}
