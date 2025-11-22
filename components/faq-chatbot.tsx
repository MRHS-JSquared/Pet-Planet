"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface Message {
  type: "user" | "bot"
  text: string
}

const faqData = [
  {
    question: "What is Virtual Pet Care?",
    answer:
      "Virtual Pet Care is an interactive game that teaches financial responsibility through pet ownership. You create and care for a virtual pet while managing a budget, learning valuable lessons about earning, spending, and saving money.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply create your pet by choosing a name and type (dog, cat, rabbit, or hamster). You'll start with $100 to care for your pet. Use the action buttons to feed, play, clean, and care for your pet.",
  },
  {
    question: "How do I earn money?",
    answer:
      "Complete chores to earn money! Available chores include washing dishes ($10), vacuuming ($15), doing laundry ($12), completing homework ($20), yard work ($25), and organizing your closet ($18).",
  },
  {
    question: "What happens if I run out of money?",
    answer:
      "If your balance gets too low, you won't be able to purchase care items for your pet. Make sure to complete chores regularly to maintain a healthy balance and keep your pet happy!",
  },
  {
    question: "How do pet stats work?",
    answer:
      "Your pet has five main stats: Hunger, Happiness, Health, Energy, and Hygiene. Each stat ranges from 0-100%. These stats decrease over time and must be maintained through various care actions. Low stats will make your pet sad or sick.",
  },
  {
    question: "What are the different care actions?",
    answer:
      "Feed ($5) increases hunger and health. Play ($3) increases happiness but uses energy. Rest (Free) restores energy and health. Clean ($4) improves hygiene and happiness. Vet Visit ($25) fully restores health. Toys ($15) and Treats ($8) boost happiness.",
  },
  {
    question: "How does my pet grow?",
    answer:
      "Your pet gains experience points (XP) from care actions. Every 100 XP, your pet levels up. Pets evolve through three stages: Baby (levels 1-4), Child (levels 5-9), and Adult (level 10+).",
  },
  {
    question: "What is the 3D playground?",
    answer:
      "The 3D playground lets you watch your pet interact with toys in a virtual environment. You can throw balls, push blocks, toss rings, and give bones to your pet, making the experience more engaging and fun!",
  },
  {
    question: "How do the financial analytics help?",
    answer:
      "The analytics dashboard shows charts and insights about your spending and earning patterns. It helps you understand where your money goes, track your savings rate, and make better financial decisions.",
  },
  {
    question: "Is my progress saved?",
    answer:
      "Yes! All your pet data, money, and transaction history are automatically saved to your browser's local storage. You can close the app and return later to continue caring for your pet.",
  },
]

export function FAQChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: "Hi! I'm here to answer your questions about Virtual Pet Care. What would you like to know?" },
  ])
  const [isOpen, setIsOpen] = useState(false)

  const handleQuestionClick = (question: string) => {
    const faq = faqData.find((f) => f.question === question)
    if (faq) {
      setMessages((prev) => [...prev, { type: "user", text: question }, { type: "bot", text: faq.answer }])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent">
          <span className="mr-2">🤖</span>
          Ask AI Helper
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Pet Care AI Assistant</DialogTitle>
          <DialogDescription>Ask me anything about Virtual Pet Care</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 h-[500px]">
          <ScrollArea className="flex-1 border rounded-lg p-4 bg-muted/30">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary text-secondary-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-2">
            <p className="text-sm font-medium">Common Questions:</p>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {faqData.map((faq, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start text-left h-auto py-2 px-3 bg-transparent"
                  onClick={() => handleQuestionClick(faq.question)}
                >
                  <span className="text-xs">{faq.question}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
