"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CriticalPanel() {
  const { inputs, updateCritical } = useCalculatorStore()
  const { criticalMods } = inputs.critical

  return (
    <InputSection title="Critical Damage">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="criticalMods">Critical Mods (%)</Label>
          <Input
            id="criticalMods"
            type="number"
            value={criticalMods || ""}
            onChange={(e) =>
              updateCritical({ criticalMods: Number(e.target.value) || 0 })
            }
          />
          <p className="text-sm text-muted-foreground">
            X% chance to deal Y% supplemental damage
          </p>
        </div>
      </div>
    </InputSection>
  )
}
