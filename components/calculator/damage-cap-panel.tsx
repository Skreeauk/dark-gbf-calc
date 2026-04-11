"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { HardCapMode } from "@/lib/formula/types"
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
import { Switch } from "@/components/ui/switch"

const HARD_CAP_MODE_OPTIONS = [
  { label: "None", value: HardCapMode.None },
  { label: "6.6M", value: HardCapMode.Cap6_6 },
  { label: "13.1M", value: HardCapMode.Cap13_1 },
] as const

export function DamageCapPanel() {
  const { inputs, updateDamageCap } = useCalculatorStore()
  const {
    genericDamageCapUp,
    normalDamageCapUp,
    caDamageCapUp,
    capPenetration,
    specialCaDmgCapUp,
    hardCapMode,
    assassinMode,
  } = inputs.damageCap

  const selectedHardCapModeOption = HARD_CAP_MODE_OPTIONS.find(
    (opt) => opt.value === hardCapMode
  )

  return (
    <InputSection title="Damage Cap">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="genericDamageCapUp">Generic Damage Cap Up (%)</Label>
          <Input
            id="genericDamageCapUp"
            type="number"
            value={genericDamageCapUp || ""}
            onChange={(e) =>
              updateDamageCap({
                genericDamageCapUp: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="normalDamageCapUp">N.A. Damage Cap Up (%)</Label>
          <Input
            id="normalDamageCapUp"
            type="number"
            value={normalDamageCapUp || ""}
            onChange={(e) =>
              updateDamageCap({
                normalDamageCapUp: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="caDamageCapUp">C.A. Damage Cap Up (%)</Label>
          <Input
            id="caDamageCapUp"
            type="number"
            value={caDamageCapUp || ""}
            onChange={(e) =>
              updateDamageCap({
                caDamageCapUp: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="capPenetration">Cap Penetration (%)</Label>
          <Input
            id="capPenetration"
            type="number"
            value={capPenetration || ""}
            onChange={(e) =>
              updateDamageCap({
                capPenetration: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="specialCaDmgCapUp">Special C.A. DMG Cap Up (%)</Label>
          <Input
            id="specialCaDmgCapUp"
            type="number"
            value={specialCaDmgCapUp || ""}
            onChange={(e) =>
              updateDamageCap({
                specialCaDmgCapUp: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="hardCapMode">Hard Cap Mode</Label>
          <Select
            value={hardCapMode}
            onValueChange={(value) =>
              updateDamageCap({ hardCapMode: value as HardCapMode })
            }
          >
            <SelectTrigger id="hardCapMode">
              <SelectValue>
                {selectedHardCapModeOption?.label || "Select hard cap mode"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {HARD_CAP_MODE_OPTIONS.map((opt) => (
                <SelectItem key={opt.label} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="assassinMode"
            checked={assassinMode}
            onCheckedChange={(checked) =>
              updateDamageCap({ assassinMode: checked })
            }
          />
          <Label htmlFor="assassinMode">Assassin Mode</Label>
        </div>
      </div>
    </InputSection>
  )
}
