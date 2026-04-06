"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { ElementMatchup } from "@/lib/formula/types"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ELEMENT_OPTIONS = [
  { label: "Superior (+50%)", value: ElementMatchup.Superior },
  { label: "Neutral", value: ElementMatchup.Neutral },
  { label: "Inferior (-25%)", value: ElementMatchup.Inferior },
] as const

export function ElementalPanel() {
  const { inputs, updateElemental } = useCalculatorStore()
  const {
    elementMatchup,
    elemSummonMod,
    elemEmpBuffs,
    elemAtkBuffs,
    elemAtkDebuffs,
  } = inputs.elemental

  const selectedElementOption = ELEMENT_OPTIONS.find(
    (opt) => opt.value === elementMatchup
  )

  return (
    <InputSection title="Elemental">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="elementMatchup">Element Matchup</Label>
          <Select
            value={String(elementMatchup)}
            onValueChange={(value) =>
              updateElemental({
                elementMatchup: Number(value) as ElementMatchup,
              })
            }
          >
            <SelectTrigger id="elementMatchup">
              <SelectValue>
                {selectedElementOption?.label || "Select element matchup"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {ELEMENT_OPTIONS.map((opt) => (
                <SelectItem key={opt.label} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="elemSummonMod">Summon Mod (%)</Label>
          <Input
            id="elemSummonMod"
            type="number"
            value={elemSummonMod || ""}
            onChange={(e) =>
              updateElemental({ elemSummonMod: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="elemEmpBuffs">EMP Buffs (%)</Label>
          <Input
            id="elemEmpBuffs"
            type="number"
            value={elemEmpBuffs || ""}
            onChange={(e) =>
              updateElemental({ elemEmpBuffs: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="elemAtkBuffs">ATK Buffs (%)</Label>
          <Input
            id="elemAtkBuffs"
            type="number"
            value={elemAtkBuffs || ""}
            onChange={(e) =>
              updateElemental({ elemAtkBuffs: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="elemAtkDebuffs">ATK Debuffs (%)</Label>
          <Input
            id="elemAtkDebuffs"
            type="number"
            value={elemAtkDebuffs || ""}
            onChange={(e) =>
              updateElemental({ elemAtkDebuffs: Number(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </InputSection>
  )
}
