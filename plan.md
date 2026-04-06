# GBF Damage Calculator — Implementation Plan

Each task is self-contained, committed individually, and builds on the previous. Follow the Agent Workflow in `AGENTS.md` for every task. Use **GLM-4.7** for all coding tasks and **GLM-4.5-air** for commits unless noted.

A task is only complete when both the checkbox is checked AND the corresponding commit exists in the git. **Do not check a box without committing**.

---

## Phase 1 — Formula Layer

All formula modules are pure functions. No UI or store imports. Types go in `types.ts` first.

### [x] Task 1.1 — Define all types (`types.ts`)

- Define input types for every formula input: `CharacterInputs`, `ElementalInputs`, `NormalOmegaExInputs`, `CharacterModInputs`, `AtkDebuffInputs`, `CrewInputs`, `EnemyInputs`, `CaDamageInputs`
- Define output types: `BaseDamageResult`, `NormalDamageResult`, `CriticalDamageResult`, `CaDamageResult`, `CalculatorResult`
- All percentage inputs typed as `number` (raw user value, e.g. `50` = 50%)
- **Commit:** `feat(formula): define all input and output types`

### [x] Task 1.2 — Elemental boost (`elemental.ts`)

- Implement `calculateElementalBoost(inputs: ElementalInputs): number`
- Formula: `1 + elemSuperiority + elemSummonMod + elemEmpBuffs + elemAtkBuffs - elemAtkDebuffs`
- Elemental superiority: `+0.5` (superior), `-0.25` (inferior), `0` (neutral) — use an enum or union type for element matchup
- **Commit:** `feat(formula): implement elemental boost`

### [x] Task 1.3 — Normal/Omega/EX boosts (`normal-omega-ex.ts`)

- Implement individual boost functions:
  - `calculateNormalAtkBoost` — `1 + normAtkMod × (1 + optimusAura) + bahamutMod + ultimaMod + normSummonAura + normBuffs - normDebuffs`
  - `calculateOmegaAtkBoost` — `1 + omegaAtkMod × (1 + omegaAura)`
  - `calculateExAtkBoost` — `1 + usualExMod + mysteriousExMod × (1 + rankoAura)`
  - `calculateNormalEnmityBoost`, `calculateNormalStaminaBoost` — affected by Optimus aura
  - `calculateOmegaEnmityBoost`, `calculateOmegaStaminaBoost` — affected by Omega aura
  - `calculateExEnmityBoost`, `calculateExStaminaBoost` — no aura
- Implement `calculateNormalOmegaExBoosts(inputs): number` — product of all the above minus Fixed ATK Modifiers
- **Commit:** `feat(formula): implement normal/omega/ex boosts`

### [x] Task 1.4 — Character mods (`character-mods.ts`)

- Implement:
  - `calculateCharEnmityBoost` — `1 + jammedMod + enmityEmpMod + ringEnmityMod + axEnmityMod`
  - `calculateCharStaminaBoost` — `1 + strengthMod + staminaEmpMod + ringStaminaMod + axStaminaMod`
  - `calculatePerpetualBoost` — `1 + perpetuityMod`
  - `calculateUniqueStackableBoost` — `1 + uniqueStackableMod`
  - `calculateAssassinBoost` — `1 + assassinMod`
  - `calculateTotalCharUniqueAtkBoosts` — product of all individual Unique ATK boosts
- **Commit:** `feat(formula): implement character mod boosts`

### [x] Task 1.5 — ATK down debuff (`atk-debuff.ts`)

- Implement `calculateAtkDebuffEffect(inputs: AtkDebuffInputs): number`
- Formula: `1 - atkDownMod / 100`
- **Commit:** `feat(formula): implement atk down debuff effect`

### [x] Task 1.6 — Crew boosts (`crew.ts`)

- Implement:
  - `calculateCrewShipBoost` — `1 + crewShipMod / 100`
  - `calculateCrewSkillsBoost` — `1 + crewSkillMod / 100`
- **Commit:** `feat(formula): implement crew ship and skills boosts`

### [x] Task 1.7 — Base damage (`base-damage.ts`)

- Implement `calculateBaseDamage(inputs): number`
- Multiply all boost results together with Character total ATK:
  `charATK × elemental × normalOmegaEx × charEnmity × charStamina × perpetuity × uniqueStackable × assassin × totalCharUniqueAtk × crewShip × crewSkills × atkDebuff`
- Character total ATK: sum of base ATK + grid weapon ATK values (weapon specialty weapons contribute at 120%)
- **Commit:** `feat(formula): implement base damage calculation`

### [x] Task 1.8 — Enemy DEF and Sleeping boost (`enemy.ts`)

- Implement `calculateEnemyDef(inputs: EnemyInputs): number`
  - `innate DEF × (1 + defUpMods - defDownMods - uniqueDefDownMods)`
  - Hard cap: total DEF up and DEF down mods capped at 50% each before applying
- Implement `calculateSleepingBoost(status: SleepStatus): number`
  - `Stared Stiff` = 1.10, `Sleep` = 1.25, `Comatose` = 1.50, `None` = 1.0
- **Commit:** `feat(formula): implement enemy def and sleeping boost`

### [x] Task 1.9 — Normal and Critical damage (`normal-damage.ts`)

- Implement `calculateNormalDamage(baseDamage, enemyDef, sleepingBoost, randomModifier): number`
  - `baseDamage × sleepingBoost × randomModifier / enemyDef`
  - Random modifier: fixed at `1.0` for calculator purposes (display expected value), or accept as input
- Implement `calculateCriticalDamage(normalDamage, criticalMods): number`
  - `normalDamage × (1 + criticalMods / 100)`
- **Commit:** `feat(formula): implement normal and critical damage`

### [x] Task 1.10 — Charge Attack damage (`ca-damage.ts`)

- Implement `calculateCaDamage(inputs: CaDamageInputs): number`
  - `(normalDamage × caMultiplier × caBuffBoost × caWeaponBoost) + fixedCaDamage`
  - `caBuffBoost = 1 + caBuffMods / 100`
  - `caWeaponBoost = 1 + caWeaponMods / 100`
- **Commit:** `feat(formula): implement charge attack damage`

### [x] Task 1.11 — Main entry point (`index.ts`)

- Implement `calculate(inputs: CalculatorInputs): CalculatorResult`
- Calls all formula modules in order and returns `{ baseDamage, normalDamage, criticalDamage, caDamage }`
- **Commit:** `feat(formula): wire up main calculate() entry point`

---

## Phase 2 — State Management

### [x] Task 2.1 — Zustand store (`calculator-store.ts`)

- Define store with all input fields (one field per formula input, matching `types.ts`)
- Define computed output fields: `baseDamage`, `normalDamage`, `criticalDamage`, `caDamage`
- On any input change, re-run `calculate()` and update all output fields
- Export typed `useCalculatorStore` hook
- **Commit:** `feat(store): implement calculator zustand store`

---

## Phase 3 — UI Components

Build panels in the same order as the formula layer. Each panel reads from and writes to the Zustand store.

### [x] Task 3.1 — Reusable input section (`input-section.tsx`)

- Collapsible wrapper using shadcn `Collapsible`
- Props: `title: string`, `children: React.ReactNode`, `defaultOpen?: boolean`
- **Commit:** `feat(components): add reusable collapsible input section`

### [x] Task 3.2 — Character panel (`character-panel.tsx`)

- Inputs: base ATK, grid weapon ATK values (with weapon specialty toggle), summon ATK
- **Commit:** `feat(components): add character panel`

### [ ] Task 3.3 — Elemental panel (`elemental-panel.tsx`)

- Inputs: element matchup (superior / inferior / neutral), summon mod, EMP buffs, ATK buffs, ATK debuffs
- **Commit:** `feat(components): add elemental panel`

### [ ] Task 3.4 — Normal/Omega/EX panel (`normal-omega-ex-panel.tsx`)

- Inputs: all Normal/Omega/EX ATK mods, Optimus/Omega/Ranko auras, Enmity/Stamina mods, Fixed ATK Modifiers
- **Commit:** `feat(components): add normal/omega/ex panel`

### [ ] Task 3.5 — Character mods panel (`character-mods-panel.tsx`)

- Inputs: Jammed, Strength, EMP mods, Ring mods, AX mods, Perpetuity mod, Unique Stackable mod, Assassin mod, Unique ATK boosts
- **Commit:** `feat(components): add character mods panel`

### [ ] Task 3.6 — ATK debuff panel (`atk-debuff-panel.tsx`)

- Inputs: ATK down mod (%)
- **Commit:** `feat(components): add atk debuff panel`

### [ ] Task 3.7 — Crew panel (`crew-panel.tsx`)

- Inputs: Crew Ship mod (%), Crew Skills mod (%)
- **Commit:** `feat(components): add crew panel`

### [ ] Task 3.8 — Enemy panel (`enemy-panel.tsx`)

- Inputs: innate DEF, DEF up mods, DEF down mods, Unique DEF down mods, sleep status (dropdown: None / Stared Stiff / Sleep / Comatose)
- **Commit:** `feat(components): add enemy panel`

### [ ] Task 3.9 — CA panel (`ca-panel.tsx`)

- Inputs: CA multiplier, CA buff mods (%), CA weapon mods (%), fixed CA damage
- **Commit:** `feat(components): add ca panel`

### [ ] Task 3.10 — Damage output (`damage-output.tsx`)

- Reads `baseDamage`, `normalDamage`, `criticalDamage`, `caDamage` from store
- Displays each value formatted with thousands separators
- Use `useStore(shallow)` to subscribe to all four values
- **Commit:** `feat(components): add damage output display`

---

## Phase 4 — App Layout

### [ ] Task 4.1 — Page layout (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`)

- Compose all panels into the 2-column layout: inputs left, output right (stacked on mobile)
- Wire `damage-output.tsx` into the right column
- Ensure `globals.css` sets up Tailwind base styles
- **Commit:** `feat(app): compose calculator page layout`

### [ ] Task 4.2 — Final build check

- Run `npm run lint` — fix any ESLint errors
- Run `npm run build` — verify static export succeeds with no errors
- **Commit:** `chore: verify lint and build pass`

---

## Phase 5 — Docs

### [ ] Task 5.1 — Update AGENTS.md if anything drifted during implementation

- Use **GLM-4.5-air** for this task
- Check that folder structure, conventions, and scope sections still match the actual code
- **Commit:** `docs: sync agents.md with final implementation`

---

## Task Order Summary

```
1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7 → 1.8 → 1.9 → 1.10 → 1.11
2.1
3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6 → 3.7 → 3.8 → 3.9 → 3.10
4.1 → 4.2
5.1
```

Phase 2 must be fully complete before Phase 3. Phase 3 must be complete before Phase 4. Phases 5 come last.
