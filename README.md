# Pet Planet

An educational virtual pet game that teaches financial responsibility and pet care through interactive gameplay.

**FBLA Introduction to Programming Project**

## Overview

Pet Planet combines pet care simulation with financial literacy education. Students learn to manage budgets, make spending decisions, and understand the real costs of pet ownership in an engaging, interactive environment.

## Key Features

### Educational Components
- **Financial Management**: Start with $100 and learn to budget for pet care
- **Earning System**: Complete chores to earn money ($10-$25 per chore)
- **Expense Tracking**: Monitor spending through detailed transaction history
- **Financial Analytics**: Visual charts showing spending patterns and savings rates

### Pet Care System
- **Real-time Needs**: Pets have 5 stats (Hunger, Happiness, Health, Energy, Hygiene) that decay over time
- **Day/Night Cycle**: 2-minute real-time equals 1 full game day (7 AM - 7 AM)
- **Action System**: Feed, clean, play, rest, vet visits, and more
- **Growth System**: Pets gain XP and evolve through Baby, Child, and Adult stages
- **Consequences**: Pets die if health reaches 0, teaching responsibility

### Interactive 3D Playground
- Custom 3D pet models for dog, cat, rabbit, and hamster
- Interactive toys (ball, block, yarn ball, bone)
- Dynamic day/night skybox with smooth transitions
- Realistic animations and shadows

### Achievement System
- 10 achievements to unlock (First Week, Pet Master, Financial Master, etc.)
- Progress tracking for various milestones
- Visual notifications when achievements are earned

## Technologies Used

- Next.js 16 (React framework)
- TypeScript (Type safety)
- Three.js (3D graphics)
- Recharts (Data visualization)
- Tailwind CSS (Styling)
- Radix UI (Component primitives)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Educational Goals

This project teaches critical financial skills:
1. **Budgeting** - Managing limited resources effectively
2. **Income vs. Expenses** - Understanding cash flow
3. **Opportunity Cost** - Choosing between different spending options
4. **Emergency Funds** - Keeping reserves for unexpected vet visits
5. **Responsibility** - Consistent care prevents negative consequences
6. **Planning** - Anticipating future needs and costs

## Game Mechanics

- Start with $100 budget
- Complete chores to earn money
- Pet care costs $0-$25 per action
- Time flows at 12 game minutes per real second
- Day/night cycle (Day: 7 AM - 8 PM, Night: 8 PM - 6 AM)
- Daily chores (clean, vet) can only be done once per day
- Skip to morning feature available during night hours

## Competition Ready

This project meets FBLA Introduction to Programming requirements:
- Original code demonstrating programming concepts
- Educational purpose (financial literacy and responsibility)
- User-friendly, professional interface
- Comprehensive functionality with error handling
- Clear documentation