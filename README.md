# 2EZ - Dual Character Platformer

A dark, minimalist 2D platformer where you control two characters simultaneously to solve physics-based puzzles.

## Current Status

### Implemented
- Basic Phaser 3 game setup with TypeScript
- Physics engine (Arcade Physics with gravity)
- Player character (white rectangle)
- Platform system with collision detection
- Level data structure for reusable level design

### Tech Stack
- **Framework**: Phaser 3
- **Language**: TypeScript
- **Dev Server**: Vite
- **Physics**: Arcade Physics

## Planned Features

### Core Mechanics
- [ ] Dual character control (control two characters at once with keyboard)
- [ ] Exit portal system (get one character to portal to advance)
- [ ] Jumping mechanics
- [ ] Character-to-character collision
- [ ] Advanced physics (bouncing, rope pulling between characters)

### Level Design
- [ ] Multiple levels with progressive difficulty
- [ ] Dark, minimalist aesthetic
- [ ] Puzzle elements requiring coordination of both characters

### Polish
- [ ] Proper sprite graphics (replacing rectangles)
- [ ] Visual effects
- [ ] Sound effects and music
- [ ] Menu system
- [ ] Level progression and completion tracking

## Running the Game
```bash
npm install
npm run dev
```

Open browser to `http://localhost:5173`

## Project Structure
```
├── game.ts          # Main game logic and GameScene class
├── levels.ts        # Level data definitions
├── index.html       # HTML container
├── package.json     # Dependencies
└── tsconfig.json    # TypeScript configuration
```

## Next Steps
1. Add keyboard controls for movement and jumping
2. Implement dual character mechanic
3. Add exit portal
4. Build out first complete level
5. Refine physics and game feel