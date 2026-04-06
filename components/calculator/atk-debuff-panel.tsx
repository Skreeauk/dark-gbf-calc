"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AtkDebuffPanel() {
  const { inputs, updateAtkDebuff } = useCalculatorStore()
  const { atkDownMod } = inputs.atkDebuff

  return (
    <InputSection title="ATK Debuff">
      <div className="flex flex-col gap-2">
        <Label htmlFor="atkDownMod">ATK Down Mod (%)</Label>
        <Input
          id="atkDownMod"
          type="number"
          value={atkDownMod || ""}
          onChange={(e) =>
            updateAtkDebuff({ atkDownMod: Number(e.target.value) || 0 })
          }
        />
      </div>
    </InputSection>
  )
}
