# GBF Damage Calculator

A single-page web application for calculating Granblue Fantasy damage based on the game's damage formula.

**Note:** This is a vibecoding practice project.

## Features

- **Base Damage Calculation** — Core damage formula with all boost categories
- **Normal & Critical Damage** — Full damage type calculations with critical hits
- **Charge Attack Damage** — CA multiplier, buffs, weapon mods, and fixed CA damage
- **Post-Damage Modifiers** — Supplemental Damage, Seraphic Mod, DMG Taken Amplified
- **Damage Caps** — Soft and hard caps with Cap Up and Cap Penetration
- **Grid Builder** — Standalone weapon grid management (non-integrated with calculator)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The app is exported to the `out/` directory as a static site (no server required).

## Project Structure

```
lib/
  formula/          — Pure formula modules (no UI/store deps)
    types.ts        — TypeScript types for all calculations
    index.ts        — Main calculate() entry point
    ...             — Individual formula modules
  grid/             — Weapon grid types and database
  store/            — Zustand stores (calculator, grid)
components/
  calculator/       — Calculator input panels and outputs
  grid/             — Grid builder UI components
app/
  page.tsx          — Calculator page
  grid/page.tsx     — Grid builder page
```

## Available Scripts

| Script              | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start development server with Turbopack        |
| `npm run build`     | Build for production (static export to `out/`) |
| `npm run lint`      | Run ESLint                                     |
| `npm run format`    | Format code with Prettier                      |
| `npm run typecheck` | Run TypeScript type checking                   |

## Tech Stack

- **Framework** — Next.js 16.1.7 with App Router and Static Export
- **Language** — TypeScript (strict mode)
- **Styling** — Tailwind CSS
- **Components** — shadcn/ui
- **State Management** — Zustand
- **Linting/Formatting** — ESLint and Prettier
- **Package Manager** — npm

## License

Private project — All rights reserved.
