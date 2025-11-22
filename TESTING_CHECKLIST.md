# Pet Planet - Testing Checklist

## Core Features to Test

### 1. Time System
- [ ] Game starts at 7 AM (Day 1)
- [ ] Time progresses at 12 game minutes per real second
- [ ] Day/night cycle works (Day: 7 AM - 8 PM, Night: 8 PM - 6 AM)
- [ ] Day counter increments correctly when crossing midnight
- [ ] Background color transitions smoothly between day and night

### 2. Skip Day Functionality
- [ ] Skip Day button ONLY appears during night (8 PM - 6 AM)
- [ ] Skip Day correctly advances to 7 AM
- [ ] Day counter increments when skipping to next day
- [ ] Daily actions reset after skip
- [ ] Pet stats decrease appropriately after skip

### 3. Pet Care Actions
- [ ] Feed ($5) - increases hunger and health
- [ ] Rest (Free) - increases energy and health
- [ ] Give Treat ($8) - increases happiness and hunger
- [ ] Clean ($4) - once per day, increases hygiene
- [ ] Vet Visit ($25) - once per day, fully restores health
- [ ] Sleep (night only) - increases energy and health significantly

### 4. Financial System
- [ ] Start with $100
- [ ] Earn money from chores
- [ ] Cannot perform paid actions without sufficient funds
- [ ] Transaction history tracked correctly
- [ ] Financial analytics display properly

### 5. Achievements System
- [ ] First Week - 7 days survived
- [ ] Pet Master - Level 10
- [ ] Financial Master - $500 total earned
- [ ] Clean Freak - Clean 20 times
- [ ] Veterinarian - 10 vet visits
- [ ] Treat Giver - 50 treats given
- [ ] Night Owl - 30 sleeps
- [ ] Marathon - 30 days survived
- [ ] Legend - Level 50 + $1000
- [ ] Notification appears in top right with X button

### 6. 3D Playground
- [ ] Pet model renders correctly for each type
- [ ] Background color changes based on time of day
- [ ] Toys are interactive
- [ ] Smooth transitions and animations

### 7. Pet Death System
- [ ] Pet dies when health reaches 0
- [ ] Death screen displays correctly
- [ ] Can reset and start over

### 8. UI/UX
- [ ] Pet Planet branding throughout
- [ ] Organized sections (Pet Care vs Financial)
- [ ] Responsive design
- [ ] Clear visual hierarchy
- [ ] No unnecessary components

## Bug Fixes Applied

1. Fixed skip day logic to only work between 8 PM - 6 AM
2. Fixed day counter to increment logically based on game time
3. Fixed achievement triggers to work correctly
4. Added achievement notification system
5. Removed earnings graph from home page
6. Compacted pet page layout
7. Rebranded everything to "Pet Planet"
8. Improved day/night cycle transitions
9. Updated favicon and title
10. Fixed daily action resets
