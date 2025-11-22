# Pet Planet - FBLA Introduction to Programming

A comprehensive virtual pet application that teaches financial responsibility and pet ownership through interactive gameplay.

## Features

### Core Pet Care System
- **Pet Customization**: Choose from 4 pet types (Dog, Cat, Rabbit, Hamster) and name your pet
- **Pet Stats**: Track hunger, happiness, health, energy, and hygiene (0-100 scale)
- **Pet Actions**: Feed, play, rest, clean, vet visits, toys, and treats
- **Pet Growth**: Experience system with levels and evolution stages (baby → child → adult)
- **Dynamic Moods**: Pet displays different emotions based on care level

### Financial Responsibility System
- **Starting Budget**: Begin with $100 in-game currency
- **Action Costs**: Each care action has an associated cost
  - Feed: $5
  - Play: $3
  - Clean: $4
  - Vet Visit: $25
  - Toy: $15
  - Treat: $8
  - Rest: Free
- **Earnings System**: Complete chores to earn money
  - Wash Dishes: $10
  - Vacuum Room: $15
  - Do Laundry: $12
  - Complete Homework: $20
  - Yard Work: $25
  - Organize Closet: $18
- **Transaction History**: Track all income and expenses
- **Budget Management**: Monitor balance, total earned, and total spent

### Technical Features
- **Data Persistence**: Pet data saved to localStorage
- **Auto-Updates**: Pet needs decay over time
- **Input Validation**: Prevents actions when insufficient funds
- **Modular Code**: Clean component structure with TypeScript
- **State Management**: React hooks for efficient state handling

## How to Use

1. **Create Your Pet**: Enter a name and choose a pet type
2. **Care for Your Pet**: Use action buttons to feed, play, clean, and care for your pet
3. **Earn Money**: Complete chores to earn money for pet care
4. **Monitor Stats**: Watch the stat bars to see what your pet needs
5. **Track Finances**: View your transaction history and budget
6. **Level Up**: Gain experience and watch your pet grow!

## Code Structure

- `/app/pet/page.tsx` - Main application logic and state management
- `/components/pet-setup.tsx` - Initial pet creation interface
- `/components/pet-display.tsx` - Visual pet representation
- `/components/pet-stats.tsx` - Stat bars and indicators
- `/components/pet-actions.tsx` - Care action buttons
- `/components/earnings-system.tsx` - Chore completion system
- `/components/financial-tracker.tsx` - Budget and transaction display
- `/lib/types.ts` - TypeScript type definitions
- `/lib/pet-logic.ts` - Pet state calculations and updates

## Educational Value

This project demonstrates:
- **Financial Literacy**: Understanding income, expenses, and budgeting
- **Responsibility**: Consequences of neglecting care
- **Time Management**: Balancing earning money and pet care
- **Cause and Effect**: Actions directly impact pet wellbeing
- **Goal Setting**: Working toward pet growth and evolution

## Templates/Libraries Used

- Next.js 16 (React Framework)
- TypeScript (Type Safety)
- Tailwind CSS v4 (Styling)
- shadcn/ui (UI Components)
- localStorage (Data Persistence)
- Three.js (3D Scene)
- Radix-UI (Clean UI Elements)

## Bibliography (MLA Citations)

**“Medium.” *Medium.com*, 2024.**
miro.medium.com/v2/resize:fit:1200/1.
Accessed 18 Nov. 2025.

**“Medium.” *Medium.com*, 2025.**
miro.medium.com/1.
Accessed 18 Nov. 2025.

**“Pet Sitting App Pitch Deck Template.” *Slidesgo.com*, 2025.**
slidesgo.com/theme/pet-sitting-app-pitch-deck.
Accessed 18 Nov. 2025.

***AtomicObject.com*, 2025.**
spin.atomicobject.com/wp-content/uploads/React-Typescript.png.
Accessed 18 Nov. 2025.

***Wikimedia.org*, 2024.**
upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1200px-Vitejs-logo.svg.png.
Accessed 18 Nov. 2025.

***DEV Community*, 2023.**
media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fi5vke8fu8g8659hjvv22.jpeg.
Accessed 18 Nov. 2025.

***Artezio.com*, 2025.**
artezio.com/wp-content/uploads/2016/08/postcss-logo.png.
Accessed 18 Nov. 2025.

**“Medium.” *Medium.com*, 2025.**
miro.medium.com/1.
Accessed 19 Nov. 2025.

"Toon Cat FREE" (https://skfb.ly/6TKrP) by Omabuarts Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"Shiba" (https://skfb.ly/6WxVW) by zixisun02 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"White Rabbit" (https://skfb.ly/oCwJF) by Mihail Vladimirovich is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"Hamster" (https://skfb.ly/o6F7R) by Chimachi is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).



