"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function FAQDialog() {
  

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
