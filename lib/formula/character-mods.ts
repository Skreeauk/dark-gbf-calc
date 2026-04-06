import { CharacterModInputs } from "./types"

export function calculateCharEnmityBoost(inputs: CharacterModInputs): number {
  const { jammedMod, enmityEmpMod, ringEnmityMod, axEnmityMod } = inputs

  return (
    1 +
    jammedMod / 100 +
    enmityEmpMod / 100 +
    ringEnmityMod / 100 +
    axEnmityMod / 100
  )
}

export function calculateCharStaminaBoost(inputs: CharacterModInputs): number {
  const { strengthMod, staminaEmpMod, ringStaminaMod, axStaminaMod } = inputs

  return (
    1 +
    strengthMod / 100 +
    staminaEmpMod / 100 +
    ringStaminaMod / 100 +
    axStaminaMod / 100
  )
}

export function calculatePerpetualBoost(inputs: CharacterModInputs): number {
  const { perpetuityMod } = inputs

  return 1 + perpetuityMod / 100
}

export function calculateUniqueStackableBoost(
  inputs: CharacterModInputs
): number {
  const { uniqueStackableMod } = inputs

  return 1 + uniqueStackableMod / 100
}

export function calculateAssassinBoost(inputs: CharacterModInputs): number {
  const { assassinMod } = inputs

  return 1 + assassinMod / 100
}

export function calculateTotalCharUniqueAtkBoosts(
  inputs: CharacterModInputs
): number {
  const { uniqueAtkMods } = inputs

  return uniqueAtkMods.reduce((product, mod) => product * (1 + mod / 100), 1)
}
