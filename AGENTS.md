# GBF Damage Calculator — Agents Guide

## Project Purpose
Single-page web application for calculating Granblue Fantasy damage based on the game's damage formula. Derived from `FORMULA.md` in the repo root.

## Tech Stack
- Next.js 16.2 with App Router and Static Export (`output: 'export'`)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui for components
- ESLint and Prettier for formatting and linting
- Zustand for state management
- npm as the package manager
- Git (local only, no remote)

---

## Model Routing

Use the appropriate model from **z.ai** based on task type:

| Model | Task Scope | Examples |
|---|---|---|
| `GLM-4.5-air` | Git & non-coding tasks | Commits, branch management, file moves, renaming, writing/updating `.md` files, editing config files |
| `GLM-4.7` | General coding | TypeScript, React components, Zustand store, formula logic, Tailwind styling, debugging, refactoring |
| `GLM-5.1` | Planning | Architecture decisions, feature scoping, breaking ambiguous tasks into subtasks, approach review |

### Routing Rules
- **Start with GLM-5.1** whenever a task is ambiguous, spans multiple files, or requires design decisions. Produce a concrete plan before writing any code.
- **Use GLM-4.7** as the default for all coding work once a plan exists.
- **Use GLM-4.5-air** for all Git operations and any edits to non-code files (`.md`, `.json`, `.env` templates, config).
- **Chain models** when a task crosses categories: plan (GLM-5.1) → implement (GLM-4.7) → commit (GLM-4.5-air).
- Do not use a heavier model when a lighter one is sufficient.

---

## Agent Workflow

Follow this sequence for every task:

1. **Understand** — Read the task carefully. If anything is unclear, state your assumption explicitly rather than guessing silently.
2. **Plan** (GLM-5.1 if multi-step) — Identify which files are affected and what order changes should happen in.
3. **Implement** (GLM-4.7) — Make changes incrementally. Do not rewrite files that don't need to change.
4. **Verify** — Check that ESLint passes (`npm run lint`) and the build succeeds (`npm run build`) after code changes.
5. **Commit** (GLM-4.5-air) — Stage and commit with a message following the Git Conventions below.
6. **Stop** — Do not continue past the defined task. Do not add unrequested features.

### Handling Blockers
- If a task cannot be completed as described, stop and explain why clearly.
- Do not silently work around a constraint or skip a step.
- If the formula in `FORMULA.md` conflicts with an implementation detail, flag it rather than choosing arbitrarily.

---

## Git Conventions

All commits use this format:
```
<type>(<scope>): <short description>
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`

Scopes map to the folder structure: `formula`, `store`, `components`, `app`, `config`

Examples:
```
feat(formula): add stamina boost calculation
fix(components): correct enmity panel input binding
chore(config): update eslint rules
docs: update AGENTS.md model routing section
```

- Keep the subject line under 72 characters
- Use present tense ("add", not "added")
- No ticket numbers or issue references needed (local repo only)

---

## Documentation Lookup

**Use Context7 tools** when looking up documentation for libraries and frameworks in the tech stack:
1. **Context7_resolve-library-id** — Resolve a package name to its Context7 library ID
2. **Context7_query-docs** — Query that ID for documentation with examples

Use Context7 for: Next.js, Tailwind CSS, shadcn/ui, Zustand, TypeScript, ESLint.

**Do not use Context7 for** GBF game mechanics or damage formulas — use `FORMULA.md` in the repo root as the sole source of truth for those.

---

## Constraints

- NO tests of any kind
- NO monorepo setup
- NO worktrees
- Single Next.js app at the repo root
- Static export only — no SSR or Node.js runtime at serve time

---

## v1 Scope — Do Not Implement Beyond This

v1 covers **Base Damage + Normal / Critical / Charge Attack damage only**.

The following are explicitly **out of scope for v1** and must not be implemented:
- Skill Damage
- Chain Burst
- Counter
- Bonus damage (echo)
- Supplemental / Seraphic
- DMG Taken Amplified

If a task references any of the above, flag it as out of scope rather than implementing it.

---

## Folder Structure

```
src/
  lib/
    formula/
      types.ts             — All input/output TypeScript types
      elemental.ts         — Elemental boost
      normal-omega-ex.ts   — Normal/Omega/EX ATK, Enmity, Stamina boosts; includes Fixed ATK Modifiers subtraction
      character-mods.ts    — Char Enmity/Stamina, Perpetuity, Unique Stackable, Assassin, Unique ATK
      atk-debuff.ts        — ATK down debuff effect (top-level Base Damage multiplier, separate from enemy DEF)
      crew.ts              — Crew Ship & Skills boosts
      base-damage.ts       — Base damage calculation
      enemy.ts             — Enemy DEF (innate, DEF up/down, Unique DEF down, hard cap), Sleeping boost
      normal-damage.ts     — Normal Damage and Critical Damage (replaces damage-types.ts)
      ca-damage.ts         — Charge Attack damage: CA multiplier, CA buff boost, CA weapon boost, fixed CA damage
      index.ts             — Main calculate() entry point
    store/
      calculator-store.ts  — Zustand store
  components/
    calculator/
      input-section.tsx        — Reusable collapsible section
      character-panel.tsx      — ATK, weapon specialty
      elemental-panel.tsx      — Elemental boost inputs
      normal-omega-ex-panel.tsx— Normal/Omega/EX ATK, Enmity, Stamina
      character-mods-panel.tsx — Char mods, Perpetuity, Assassin, etc.
      atk-debuff-panel.tsx     — ATK down debuff input
      crew-panel.tsx           — Crew Ship & Skills
      enemy-panel.tsx          — DEF, Sleeping
      ca-panel.tsx             — CA multiplier, buffs, weapon mods, fixed damage
      damage-output.tsx        — Computed damage display
  app/
    layout.tsx
    page.tsx
    globals.css
```

---

## Conventions

### Naming
- Formula modules: kebab-case (`normal-omega-ex.ts`)
- Components: PascalCase (`CharacterPanel.tsx`)
- Types: PascalCase (`CalculatorInputs`, `ElementalBoost`)
- Functions: camelCase (`calculateBaseDamage()`)
- Module-level constants (shared across files): `UPPER_SNAKE_CASE` (e.g., `BASE_MULTIPLIER`)
- Local/inline constants (single function scope): camelCase (e.g., `const cappedValue = ...`)

### State Management
- All inputs and computed outputs live in the Zustand store (`calculator-store.ts`)
- Formula modules are pure functions — no side effects, no store imports
- Use `useStore(shallow)` when subscribing to multiple values to avoid unnecessary re-renders
- Input updates trigger re-computation of all derived values automatically

### Component Patterns
- Each panel corresponds to one formula category
- Use shadcn `Collapsible` for all input sections
- Numeric inputs for percentage modifiers: user enters `50` meaning 50% — the formula layer handles the `/100` conversion
- Layout: 2-column on desktop (inputs left, output right), single column stacked on mobile

### Formula Module Design
- Each file exports pure functions only
- No UI or store dependencies inside formula modules
- All types are defined in `types.ts` and imported from there
- Data flow is strictly: inputs → boosts → base damage → final damage