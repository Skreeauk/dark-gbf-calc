"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function CharacterPanel() {
  const { inputs, updateCharacter } = useCalculatorStore()
  const { baseATK, gridWeaponATK, summonATK, weaponSpecialty } =
    inputs.character

  return (
    <InputSection title="Character" defaultOpen={true}>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="baseATK">Base ATK</Label>
          <Input
            id="baseATK"
            type="number"
            value={baseATK || ""}
            onChange={(e) =>
              updateCharacter({ baseATK: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="gridWeaponATK">Grid Weapon ATK</Label>
          <Input
            id="gridWeaponATK"
            type="number"
            value={gridWeaponATK || ""}
            onChange={(e) =>
              updateCharacter({ gridWeaponATK: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="summonATK">Summon ATK</Label>
          <Input
            id="summonATK"
            type="number"
            value={summonATK || ""}
            onChange={(e) =>
              updateCharacter({ summonATK: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="weaponSpecialty"
            checked={weaponSpecialty}
            onCheckedChange={(checked) =>
              updateCharacter({ weaponSpecialty: checked })
            }
          />
          <Label htmlFor="weaponSpecialty">Weapon Specialty</Label>
        </div>
      </div>
    </InputSection>
  )
}
