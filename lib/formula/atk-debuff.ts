import { AtkDebuffInputs } from "./types"

export function calculateAtkDebuffEffect(inputs: AtkDebuffInputs): number {
  const { atkDownMod } = inputs

  return 1 - atkDownMod / 100
}
