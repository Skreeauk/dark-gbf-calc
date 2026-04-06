import { ElementalInputs } from "./types"

export function calculateElementalBoost(inputs: ElementalInputs): number {
  const {
    elementMatchup,
    elemSummonMod,
    elemEmpBuffs,
    elemAtkBuffs,
    elemAtkDebuffs,
  } = inputs

  const elemSuperiority = elementMatchup
  const elemSummonModValue = elemSummonMod / 100
  const elemEmpBuffsValue = elemEmpBuffs / 100
  const elemAtkBuffsValue = elemAtkBuffs / 100
  const elemAtkDebuffsValue = elemAtkDebuffs / 100

  return (
    1 +
    elemSuperiority +
    elemSummonModValue +
    elemEmpBuffsValue +
    elemAtkBuffsValue -
    elemAtkDebuffsValue
  )
}
