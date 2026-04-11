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

### [x] Task 3.3 — Elemental panel (`elemental-panel.tsx`)

- Inputs: element matchup (superior / inferior / neutral), summon mod, EMP buffs, ATK buffs, ATK debuffs
- **Commit:** `feat(components): add elemental panel`

### [x] Task 3.4 — Normal/Omega/EX panel (`normal-omega-ex-panel.tsx`)

- Inputs: all Normal/Omega/EX ATK mods, Optimus/Omega/Ranko auras, Enmity/Stamina mods, Fixed ATK Modifiers
- **Commit:** `feat(components): add normal/omega/ex panel`

### [x] Task 3.5 — Character mods panel (`character-mods-panel.tsx`)

- Inputs: Jammed, Strength, EMP mods, Ring mods, AX mods, Perpetuity mod, Unique Stackable mod, Assassin mod, Unique ATK boosts
- **Commit:** `feat(components): add character mods panel`

### [x] Task 3.6 — ATK debuff panel (`atk-debuff-panel.tsx`)

- Inputs: ATK down mod (%)
- **Commit:** `feat(components): add atk debuff panel`

### [x] Task 3.7 — Crew panel (`crew-panel.tsx`)

- Inputs: Crew Ship mod (%), Crew Skills mod (%)
- **Commit:** `feat(components): add crew panel`

### [x] Task 3.8 — Enemy panel (`enemy-panel.tsx`)

- Inputs: innate DEF, DEF up mods, DEF down mods, Unique DEF down mods, sleep status (dropdown: None / Stared Stiff / Sleep / Comatose)
- **Commit:** `feat(components): add enemy panel`

### [x] Task 3.9 — Critical panel (`critical-panel.tsx`)

- Inputs: Critical Mods (%)
- **Commit:** `feat(components): add critical damage panel`

### [x] Task 3.10 — CA panel (`ca-panel.tsx`)

- Inputs: CA multiplier, CA buff mods (%), CA weapon mods (%), fixed CA damage
- **Commit:** `feat(components): add ca panel`

### [x] Task 3.11 — Damage output (`damage-output.tsx`)

- Reads `baseDamage`, `normalDamage`, `criticalDamage`, `caDamage` from store
- Displays each value formatted with thousands separators
- Use `useStore(shallow)` to subscribe to all four values
- **Commit:** `feat(components): add damage output display`

---

## Phase 4 — App Layout

### [x] Task 4.1 — Page layout (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`)

- Compose all panels into the 2-column layout: inputs left, output right (stacked on mobile)
- Wire `damage-output.tsx` into the right column
- Ensure `globals.css` sets up Tailwind base styles
- **Commit:** `feat(app): compose calculator page layout`

### [x] Task 4.2 — Final build check

- Run `npm run lint` — fix any ESLint errors
- Run `npm run build` — verify static export succeeds with no errors
- **Commit:** `chore: verify lint and build pass`

---

## Phase 5 — Docs

### [x] Task 5.1 — Update AGENTS.md if anything drifted during implementation

- Use **GLM-4.5-air** for this task
- Check that folder structure, conventions, and scope sections still match the actual code
- **Commit:** `docs: sync agents.md with final implementation`

---

## Phase 6 — Supplemental, Seraphic, DMG Taken Amplified & Damage Caps

Extends the existing formula pipeline with post-base-damage modifiers and a tiered damage cap system. Derived from `FORMULA.md` (Supplemental Damage, Seraphic boost, DMG Taken Amplified sections) and `CAP.md` (soft/hard cap tables, Damage Cap Up, Cap Penetration, Assassin cap tables, Special C.A. DMG Cap Up).

### [x] Task 6.1 — Extend types (`types.ts`)

- Add `HardCapMode` enum: `None = 'none'`, `Cap6_6 = '6.6m'`, `Cap13_1 = '13.1m'`
- Add `SupplementalSeraphicInputs`: `supplementalDamage` (flat number), `seraphicMod` (%), `dmgTakenAmpMods` (%)
- Add `DamageCapInputs`: `genericDamageCapUp` (%), `normalDamageCapUp` (%), `caDamageCapUp` (%), `capPenetration` (%), `specialCaDmgCapUp` (%), `hardCapMode: HardCapMode`, `assassinMode: boolean`
- Add `FinalDamageResult`: `normalStandard`, `normalAssassin`, `criticalStandard`, `criticalAssassin`, `caDamage` (all `number`)
- Extend `CalculatorInputs` with `supplementalSeraphic` and `damageCap`
- Extend `CalculatorResult` with `finalDamage: FinalDamageResult`
- **Commit:** `feat(formula): add supplemental/seraphic/cap types` ✓
- **Commit:** `feat(formula): implement final damage with caps and post-modifiers` ✓

### [x] Task 6.2 — Final damage module (`final-damage.ts`)

- Define cap table constants (from `CAP.md`):
  - Normal Standard: thresholds `[300k, 400k, 500k, 600k]`, reductions `[0, 0.20, 0.40, 0.95, 0.99]` — soft cap 445,000
  - Normal Assassin: thresholds `[1M, 1.2M, 1.3M, 1.5M]`, reductions `[0, 0.40, 0.70, 0.95, 0.99]` — soft cap 1,160,000
  - CA Standard: thresholds `[1.5M, 1.7M, 1.8M, 2.5M]`, reductions `[0, 0.40, 0.70, 0.95, 0.99]` — soft cap 1,685,000
  - Hard cap 6.6M: thresholds `[6M, 7M, 8M]`, reductions `[0, 0.50, 0.90, 0.999]`
  - Hard cap 13.1M: thresholds `[12M, 14M, 15M]`, reductions `[0, 0.50, 0.90, 0.999]`
- Implement `applySoftCap(rawDamage, thresholds, reductions, damageCapUp, capPenetration)`:
  - Scale thresholds by `(1 + damageCapUp)`
  - Adjust reductions by penetration: `max(0, 1 - (1 - reduction) × (1 + penetration))`
  - Iterate tiers, summing `min(diff, tierWidth) × (1 - adjustedReduction)`
  - Reduction 0% tier is never affected by penetration
- Implement `applyHardCap(damage, thresholds, reductions, specialCaCapUp?)`:
  - Same tiered reduction logic, no Damage Cap Up effects (hard caps unaffected by cap up)
  - `specialCaCapUp` scales hard cap thresholds for CA only
- Implement `calculateFinalDamage(normalDamage, criticalDamage, caDamage, suppSeraphic, damageCap): FinalDamageResult`:
  - **Normal/Critical** (FORMULA.md "Normal Attack" pattern):
    1. `softCapped = applySoftCap(raw, table, totalCapUp, pen)` — compute for both standard and assassin cap tables
    2. `withSeraphic = softCapped × (1 + seraphicMod/100)`
    3. `hardCapped = applyHardCap(withSeraphic)` (if enabled)
    4. `dmgTakenAmp = hardCapped × (dmgTakenAmpMods/100)` — uses post-hard-cap value as base; can break hard cap per CAP.md
    5. `final = hardCapped + dmgTakenAmp + supplementalDamage` — supplemental NOT boosted by seraphic
  - **CA** (FORMULA.md "Skill Damage" pattern — same as CA per wiki):
    1. Total CA cap up = `genericDamageCapUp + caDamageCapUp + (30 if assassinMode else 0)`
    2. `softCapped = applySoftCap(rawCa, CA_TABLE, totalCapUp, pen)`
    3. `withAmpAndSupp = softCapped + (softCapped × dmgTakenAmpMods/100) + supplementalDamage`
    4. `withSeraphic = withAmpAndSupp × (1 + seraphicMod/100)` — seraphic DOES boost supplemental for CA
    5. `final = applyHardCap(withSeraphic, table, specialCaDmgCapUp)` (if enabled)
- Return all 5 values: `normalStandard`, `normalAssassin`, `criticalStandard`, `criticalAssassin`, `caDamage`
- **Commit:** `feat(formula): implement final damage with caps and post-modifiers`

### [x] Task 6.3 — Wire into main entry point (`index.ts`)

- Import `calculateFinalDamage` from `final-damage.ts`
- Call it after computing `normalDamage`, `criticalDamage`, `caDamage`
- Pass `supplementalSeraphic` and `damageCap` from inputs
- Add `finalDamage` to returned `CalculatorResult`
- **Commit:** `feat(formula): wire final damage into calculate() entry point` ✓

### [x] Task 6.4 — Update Zustand store (`calculator-store.ts`)

- Add `supplementalSeraphic` and `damageCap` to `defaultInputs` with appropriate defaults (`supplementalDamage: 0`, `seraphicMod: 0`, `dmgTakenAmpMods: 0`, `genericDamageCapUp: 0`, `normalDamageCapUp: 0`, `caDamageCapUp: 0`, `capPenetration: 0`, `specialCaDmgCapUp: 0`, `hardCapMode: HardCapMode.None`, `assassinMode: false`)
- Add `updateSupplementalSeraphic` and `updateDamageCap` updater functions (same pattern as existing updaters)
- Add `finalDamage` object (5 fields) to `outputs`
- Update `calculateOutputs` to extract `finalDamage` from result
- **Commit:** `feat(store): add supplemental/seraphic/cap inputs and outputs`

### [x] Task 6.5 — Supplemental/Seraphic/DMG Taken Amp panel (`supplemental-seraphic-panel.tsx`)

- Collapsible section using `InputSection`
- Inputs: Supplemental Damage (flat number), Seraphic Mod (%), DMG Taken Amplified Mods (%)
- **Commit:** `feat(components): add supplemental/seraphic/dmg-taken-amp panel`

### [x] Task 6.6 — Damage Cap panel (`damage-cap-panel.tsx`)

- Collapsible section using `InputSection`
- Inputs:
  - Generic Damage Cap Up (%)
  - N.A. Damage Cap Up (%)
  - C.A. Damage Cap Up (%)
  - Cap Penetration (%)
  - Special C.A. DMG Cap Up (%)
  - Hard Cap Mode (dropdown: None / 6.6M / 13.1M)
  - Assassin Mode (checkbox — separate from Assassin ATK mod)
- **Commit:** `feat(components): add damage cap panel`

### [x] Task 6.7 — Final Damage Output (`final-damage-output.tsx`)

- Card placed below existing `DamageOutput` in the right column
- Displays 5 final damage values formatted with thousands separators:
  - Normal (Standard Cap)
  - Normal (Assassin Cap)
  - Critical (Standard Cap)
  - Critical (Assassin Cap)
  - CA Damage
- Reads from `outputs.finalDamage` in the store
- **Commit:** `feat(components): add final damage output display`

### [x] Task 6.8 — Update page layout (`app/page.tsx`)

- Add `SupplementalSeraphicPanel` after `CaPanel` in left column
- Add `DamageCapPanel` after `SupplementalSeraphicPanel` in left column
- Add `FinalDamageOutput` below existing `DamageOutput` in right column
- **Commit:** `feat(app): add supplemental/cap panels and final damage output to page`

### [x] Task 6.9 — Final build check

- Run `npm run lint` — fix any ESLint errors
- Run `npm run build` — verify static export succeeds with no errors
- **Commit:** `chore: verify lint and build pass for phase 6`

---

## Task Order Summary

```
1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7 → 1.8 → 1.9 → 1.10 → 1.11
2.1
3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6 → 3.7 → 3.8 → 3.9 → 3.10 → 3.11
4.1 → 4.2
5.1
6.1 → 6.2 → 6.3 → 6.4 → 6.5 → 6.6 → 6.7 → 6.8 → 6.9
```

Phase 2 must be fully complete before Phase 3. Phase 3 must be complete before Phase 4. Phases 5 come last. Phase 6 depends on all prior phases being complete.
