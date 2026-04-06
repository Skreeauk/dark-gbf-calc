"use client"

import { Plus, X } from "lucide-react"
import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CharacterModsPanel() {
  const { inputs, updateCharacterMods } = useCalculatorStore()
  const {
    jammedMod,
    enmityEmpMod,
    ringEnmityMod,
    axEnmityMod,
    strengthMod,
    staminaEmpMod,
    ringStaminaMod,
    axStaminaMod,
    perpetuityMod,
    uniqueStackableMod,
    assassinMod,
    uniqueAtkMods,
  } = inputs.characterMods

  const handleAddUniqueAtkMod = () => {
    updateCharacterMods({
      uniqueAtkMods: [...uniqueAtkMods, 0],
    })
  }

  const handleRemoveUniqueAtkMod = (index: number) => {
    const updated = uniqueAtkMods.filter((_, i) => i !== index)
    updateCharacterMods({ uniqueAtkMods: updated })
  }

  const handleUniqueAtkModChange = (index: number, value: number) => {
    const updated = [...uniqueAtkMods]
    updated[index] = value
    updateCharacterMods({ uniqueAtkMods: updated })
  }

  return (
    <InputSection title="Character Mods">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Char Enmity
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="jammedMod">Jammed Mod (%)</Label>
              <Input
                id="jammedMod"
                type="number"
                value={jammedMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    jammedMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="enmityEmpMod">Enmity EMP Mod (%)</Label>
              <Input
                id="enmityEmpMod"
                type="number"
                value={enmityEmpMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    enmityEmpMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="ringEnmityMod">Ring Enmity Mod (%)</Label>
              <Input
                id="ringEnmityMod"
                type="number"
                value={ringEnmityMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    ringEnmityMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="axEnmityMod">AX Enmity Mod (%)</Label>
              <Input
                id="axEnmityMod"
                type="number"
                value={axEnmityMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    axEnmityMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Char Stamina
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="strengthMod">Strength Mod (%)</Label>
              <Input
                id="strengthMod"
                type="number"
                value={strengthMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    strengthMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="staminaEmpMod">Stamina EMP Mod (%)</Label>
              <Input
                id="staminaEmpMod"
                type="number"
                value={staminaEmpMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    staminaEmpMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="ringStaminaMod">Ring Stamina Mod (%)</Label>
              <Input
                id="ringStaminaMod"
                type="number"
                value={ringStaminaMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    ringStaminaMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="axStaminaMod">AX Stamina Mod (%)</Label>
              <Input
                id="axStaminaMod"
                type="number"
                value={axStaminaMod || ""}
                onChange={(e) =>
                  updateCharacterMods({
                    axStaminaMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Perpetuity
          </h3>
          <div className="flex flex-col gap-2">
            <Label htmlFor="perpetuityMod">Perpetuity Mod (%)</Label>
            <Input
              id="perpetuityMod"
              type="number"
              value={perpetuityMod || ""}
              onChange={(e) =>
                updateCharacterMods({
                  perpetuityMod: Number(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Unique Stackable
          </h3>
          <div className="flex flex-col gap-2">
            <Label htmlFor="uniqueStackableMod">Unique Stackable Mod (%)</Label>
            <Input
              id="uniqueStackableMod"
              type="number"
              value={uniqueStackableMod || ""}
              onChange={(e) =>
                updateCharacterMods({
                  uniqueStackableMod: Number(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Assassin
          </h3>
          <div className="flex flex-col gap-2">
            <Label htmlFor="assassinMod">Assassin Mod (%)</Label>
            <Input
              id="assassinMod"
              type="number"
              value={assassinMod || ""}
              onChange={(e) =>
                updateCharacterMods({
                  assassinMod: Number(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Unique ATK Boosts
          </h3>
          <div className="space-y-3">
            {uniqueAtkMods.map((mod, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor={`uniqueAtkMod-${index}`}>
                    Unique ATK Boost #{index + 1} (%)
                  </Label>
                  <Input
                    id={`uniqueAtkMod-${index}`}
                    type="number"
                    value={mod || ""}
                    onChange={(e) =>
                      handleUniqueAtkModChange(
                        index,
                        Number(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveUniqueAtkMod(index)}
                  className="mt-5"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddUniqueAtkMod}
            >
              <Plus className="size-4" />
              Add Unique ATK Boost
            </Button>
          </div>
        </div>
      </div>
    </InputSection>
  )
}
