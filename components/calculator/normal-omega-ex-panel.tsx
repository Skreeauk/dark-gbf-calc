"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { InputSection } from "./input-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NormalOmegaExPanel() {
  const { inputs, updateNormalOmegaEx } = useCalculatorStore()
  const {
    normalAtkMod,
    optimusAura,
    bahamutMod,
    ultimaMod,
    normSummonAura,
    normBuffs,
    normDebuffs,
    omegaAtkMod,
    omegaAura,
    usualExMod,
    mysteriousExMod,
    rankoAura,
    normalEnmityMod,
    omegaEnmityMod,
    exEnmityMod,
    normalStaminaMod,
    omegaStaminaMod,
    exStaminaMod,
    fixedAtkModifiers,
  } = inputs.normalOmegaEx

  return (
    <InputSection title="Normal / Omega / EX">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Normal ATK
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="normalAtkMod">Normal ATK Mod (%)</Label>
              <Input
                id="normalAtkMod"
                type="number"
                value={normalAtkMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    normalAtkMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="optimusAura">Optimus Aura (%)</Label>
              <Input
                id="optimusAura"
                type="number"
                value={optimusAura || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    optimusAura: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bahamutMod">Bahamut Mod (%)</Label>
              <Input
                id="bahamutMod"
                type="number"
                value={bahamutMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    bahamutMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="ultimaMod">Ultima Mod (%)</Label>
              <Input
                id="ultimaMod"
                type="number"
                value={ultimaMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    ultimaMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="normSummonAura">Normal Summon Aura (%)</Label>
              <Input
                id="normSummonAura"
                type="number"
                value={normSummonAura || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    normSummonAura: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="normBuffs">Normal Buffs (%)</Label>
              <Input
                id="normBuffs"
                type="number"
                value={normBuffs || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    normBuffs: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="normDebuffs">Normal Debuffs (%)</Label>
              <Input
                id="normDebuffs"
                type="number"
                value={normDebuffs || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    normDebuffs: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Omega ATK
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="omegaAtkMod">Omega ATK Mod (%)</Label>
              <Input
                id="omegaAtkMod"
                type="number"
                value={omegaAtkMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    omegaAtkMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="omegaAura">Omega Aura (%)</Label>
              <Input
                id="omegaAura"
                type="number"
                value={omegaAura || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    omegaAura: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            EX ATK
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="usualExMod">Usual EX Mod (%)</Label>
              <Input
                id="usualExMod"
                type="number"
                value={usualExMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    usualExMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="mysteriousExMod">Mysterious EX Mod (%)</Label>
              <Input
                id="mysteriousExMod"
                type="number"
                value={mysteriousExMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    mysteriousExMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="rankoAura">Ranko Aura (%)</Label>
              <Input
                id="rankoAura"
                type="number"
                value={rankoAura || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    rankoAura: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Enmity
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="normalEnmityMod">Normal Enmity Mod (%)</Label>
              <Input
                id="normalEnmityMod"
                type="number"
                value={normalEnmityMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    normalEnmityMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="omegaEnmityMod">Omega Enmity Mod (%)</Label>
              <Input
                id="omegaEnmityMod"
                type="number"
                value={omegaEnmityMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    omegaEnmityMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="exEnmityMod">EX Enmity Mod (%)</Label>
              <Input
                id="exEnmityMod"
                type="number"
                value={exEnmityMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    exEnmityMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Stamina
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="normalStaminaMod">Normal Stamina Mod (%)</Label>
              <Input
                id="normalStaminaMod"
                type="number"
                value={normalStaminaMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    normalStaminaMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="omegaStaminaMod">Omega Stamina Mod (%)</Label>
              <Input
                id="omegaStaminaMod"
                type="number"
                value={omegaStaminaMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    omegaStaminaMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="exStaminaMod">EX Stamina Mod (%)</Label>
              <Input
                id="exStaminaMod"
                type="number"
                value={exStaminaMod || ""}
                onChange={(e) =>
                  updateNormalOmegaEx({
                    exStaminaMod: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Fixed ATK Modifiers
          </h3>
          <div className="flex flex-col gap-2">
            <Label htmlFor="fixedAtkModifiers">Fixed ATK Modifiers (%)</Label>
            <Input
              id="fixedAtkModifiers"
              type="number"
              value={fixedAtkModifiers || ""}
              onChange={(e) =>
                updateNormalOmegaEx({
                  fixedAtkModifiers: Number(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
      </div>
    </InputSection>
  )
}
