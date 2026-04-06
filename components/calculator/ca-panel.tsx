"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CaPanel() {
  const { inputs, updateCaDamage } = useCalculatorStore()
  const { caMultiplier, caBuffMods, caWeaponMods, fixedCaDamage } =
    inputs.caDamage

  return (
    <InputSection title="Charge Attack">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="caMultiplier">CA Multiplier (e.g. 450 = 4.5x)</Label>
          <Input
            id="caMultiplier"
            type="number"
            value={caMultiplier || ""}
            onChange={(e) =>
              updateCaDamage({ caMultiplier: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="caBuffMods">CA Buff Mods (%)</Label>
          <Input
            id="caBuffMods"
            type="number"
            value={caBuffMods || ""}
            onChange={(e) =>
              updateCaDamage({ caBuffMods: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="caWeaponMods">CA Weapon Mods (%)</Label>
          <Input
            id="caWeaponMods"
            type="number"
            value={caWeaponMods || ""}
            onChange={(e) =>
              updateCaDamage({ caWeaponMods: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="fixedCaDamage">Fixed CA Damage</Label>
          <Input
            id="fixedCaDamage"
            type="number"
            value={fixedCaDamage || ""}
            onChange={(e) =>
              updateCaDamage({ fixedCaDamage: Number(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </InputSection>
  )
}
