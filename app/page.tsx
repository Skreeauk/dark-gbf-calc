"use client"

import { CharacterPanel } from "@/components/calculator/character-panel"
import { ElementalPanel } from "@/components/calculator/elemental-panel"
import { NormalOmegaExPanel } from "@/components/calculator/normal-omega-ex-panel"
import { CharacterModsPanel } from "@/components/calculator/character-mods-panel"
import { AtkDebuffPanel } from "@/components/calculator/atk-debuff-panel"
import { CrewPanel } from "@/components/calculator/crew-panel"
import { EnemyPanel } from "@/components/calculator/enemy-panel"
import { CriticalPanel } from "@/components/calculator/critical-panel"
import { CaPanel } from "@/components/calculator/ca-panel"
import { SupplementalSeraphicPanel } from "@/components/calculator/supplemental-seraphic-panel"
import { DamageCapPanel } from "@/components/calculator/damage-cap-panel"
import { DamageOutput } from "@/components/calculator/damage-output"
import { FinalDamageOutput } from "@/components/calculator/final-damage-output"

export default function Page() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-3xl font-bold">GBF Damage Calculator</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <CharacterPanel />
          <ElementalPanel />
          <NormalOmegaExPanel />
          <CharacterModsPanel />
          <AtkDebuffPanel />
          <CrewPanel />
          <EnemyPanel />
          <CriticalPanel />
          <CaPanel />
          <SupplementalSeraphicPanel />
          <DamageCapPanel />
        </div>

        <div className="space-y-4 lg:sticky lg:top-6">
          <DamageOutput />
          <FinalDamageOutput />
        </div>
      </div>
    </div>
  )
}
