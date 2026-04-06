"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { SleepStatus } from "@/lib/formula/types"
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

const SLEEP_STATUS_OPTIONS = [
  { label: "None", value: SleepStatus.None },
  { label: "Stared Stiff (+10%)", value: SleepStatus.StaredStiff },
  { label: "Sleep (+25%)", value: SleepStatus.Sleep },
  { label: "Comatose (+50%)", value: SleepStatus.Comatose },
] as const

export function EnemyPanel() {
  const { inputs, updateEnemy } = useCalculatorStore()
  const { innateDef, defUpMods, defDownMods, uniqueDefDownMods, sleepStatus } =
    inputs.enemy

  const selectedSleepStatusOption = SLEEP_STATUS_OPTIONS.find(
    (opt) => opt.value === sleepStatus
  )

  return (
    <InputSection title="Enemy">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="sleepStatus">Sleep Status</Label>
          <Select
            value={String(sleepStatus)}
            onValueChange={(value) =>
              updateEnemy({ sleepStatus: Number(value) as SleepStatus })
            }
          >
            <SelectTrigger id="sleepStatus">
              <SelectValue>
                {selectedSleepStatusOption?.label || "Select sleep status"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SLEEP_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.label} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="innateDef">Innate DEF</Label>
          <Input
            id="innateDef"
            type="number"
            value={innateDef || ""}
            onChange={(e) =>
              updateEnemy({ innateDef: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="defUpMods">DEF Up Mods (%)</Label>
          <Input
            id="defUpMods"
            type="number"
            value={defUpMods || ""}
            onChange={(e) =>
              updateEnemy({ defUpMods: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="defDownMods">DEF Down Mods (%)</Label>
          <Input
            id="defDownMods"
            type="number"
            value={defDownMods || ""}
            onChange={(e) =>
              updateEnemy({ defDownMods: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="uniqueDefDownMods">Unique DEF Down Mods (%)</Label>
          <Input
            id="uniqueDefDownMods"
            type="number"
            value={uniqueDefDownMods || ""}
            onChange={(e) =>
              updateEnemy({ uniqueDefDownMods: Number(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </InputSection>
  )
}
