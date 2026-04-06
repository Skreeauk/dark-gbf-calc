"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CrewPanel() {
  const { inputs, updateCrew } = useCalculatorStore()
  const { crewShipMod, crewSkillMod } = inputs.crew

  return (
    <InputSection title="Crew">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="crewShipMod">Crew Ship Mod (%)</Label>
          <Input
            id="crewShipMod"
            type="number"
            value={crewShipMod || ""}
            onChange={(e) =>
              updateCrew({ crewShipMod: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="crewSkillMod">Crew Skills Mod (%)</Label>
          <Input
            id="crewSkillMod"
            type="number"
            value={crewSkillMod || ""}
            onChange={(e) =>
              updateCrew({ crewSkillMod: Number(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </InputSection>
  )
}
