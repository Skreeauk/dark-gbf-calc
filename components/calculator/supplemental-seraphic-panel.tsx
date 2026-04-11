"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SupplementalSeraphicPanel() {
  const { inputs, updateSupplementalSeraphic } = useCalculatorStore()
  const { supplementalDamage, seraphicMod, dmgTakenAmpMods } =
    inputs.supplementalSeraphic

  return (
    <InputSection title="Supplemental / Seraphic / DMG Taken Amp">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="supplementalDamage">Supplemental Damage</Label>
          <Input
            id="supplementalDamage"
            type="number"
            value={supplementalDamage || ""}
            onChange={(e) =>
              updateSupplementalSeraphic({
                supplementalDamage: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="seraphicMod">Seraphic Mod (%)</Label>
          <Input
            id="seraphicMod"
            type="number"
            value={seraphicMod || ""}
            onChange={(e) =>
              updateSupplementalSeraphic({
                seraphicMod: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dmgTakenAmpMods">DMG Taken Amplified Mods (%)</Label>
          <Input
            id="dmgTakenAmpMods"
            type="number"
            value={dmgTakenAmpMods || ""}
            onChange={(e) =>
              updateSupplementalSeraphic({
                dmgTakenAmpMods: Number(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>
    </InputSection>
  )
}
