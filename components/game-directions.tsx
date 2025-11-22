"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function GameDirections() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="w-full">
        <span className="mr-2">📚</span>
        How to Play
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>How to Play</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-base">Game Basics</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• A full day lasts 2 minutes in real time</li>
                <li>• Day runs from 7 AM to 8 PM, night from 8 PM to 7 AM</li>
                <li>• Your pet stats constantly decrease and need attention</li>
                <li>• Neglecting your pet results in death - teach responsibility!</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-base">Pet Care</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Feed your pet to reduce hunger</li>
                <li>• Play with toys to increase happiness</li>
                <li>• Clean your pet to improve hygiene</li>
                <li>• Visit the vet to restore health</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-base">Daily Chores & Money</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Chores (clean, vet) can only be done once per day</li>
                <li>• Pet care actions can be done multiple times</li>
                <li>• Each action costs money - budget wisely!</li>
                <li>• Complete chores to earn money</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-base">Night Time</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• At night (8 PM - 7 AM), only sleep is available</li>
                <li>• Use "Skip to Daytime" to fast-forward through night</li>
                <li>• Skipping reduces hunger and other stats significantly</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-base">Financial Responsibility</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Start with $100 - use it wisely</li>
                <li>• Expensive actions (vet: $25) are crucial but costly</li>
                <li>• Poor budgeting leads to pet neglect and death</li>
                <li>• Plan ahead and balance care with spending</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
