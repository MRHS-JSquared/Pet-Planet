"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function FAQDialog() {

  //FAQ List
  const faqs = [
  {
    question: "What is Pet Planet?",
    answer:
      "Pet Planet is an interactive game that teaches financial responsibility through pet ownership. You must create and care for a virtual pet while managing a budget, learning valuable lessons about earning, spending, and saving money.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply create your pet by choosing a name and type (dog, cat, rabbit, or hamster). You will start with $100 to care for your pet. Use the action buttons to feed, play, clean, and care for your pet.",
  },
  {
    question: "How do I earn money?",
    answer:
      "Complete chores to earn money. Available chores include: washing dishes, vacuuming, doing laundry, completing homework, yard work, and organizing your closet.",
  },
  {
    question: "What happens if I run out of money?",
    answer:
      "If your balance gets too low, you won't be able to purchase care items for your pet. Make sure to complete chores regularly to maintain a healthy balance and keep your pet happy.",
  },
  {
    question: "How do pet stats work?",
    answer:
      "Your pet has five main stats: Hunger, Happiness, Health, Energy, and Hygiene. Each stat ranges from 0-100. These stats decrease over time and must be maintained through various care actions. Low stats will make your pet sad or sick, and it may even die.",
  },
  {
    question: "What are the different care actions?",
    answer:
      "Feed increases hunger and health. Play increases happiness but uses energy. Rest restores energy and health. Clean improves hygiene and happiness. Vet Visit restores health. Toys and Treats boost happiness.",
  },
  {
    question: "How does my pet grow?",
    answer:
      "Your pet gains experience points from care actions. Every 100 XP, your pet levels up. Pets evolve through three stages: Baby (levels 1-4), Child (levels 5-9), and Adult (level 10+).",
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
  {
    question: "Does the game run while I'm not active?",
    answer: "Yes, the game runs while inactive, including when not on the tab. In order to pause the game, please return to the home page."
  }
]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="min-w-[200px]">
          <span className="mr-2">❓</span>
          FAQ & Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Frequently Asked Questions</DialogTitle>
          <DialogDescription>
            Everything you need to know about Pet Planet
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[500px] pr-4">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
