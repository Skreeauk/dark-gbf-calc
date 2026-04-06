import { NormalOmegaExInputs } from "./types"

export function calculateNormalAtkBoost(inputs: NormalOmegaExInputs): number {
  const {
    normalAtkMod,
    optimusAura,
    bahamutMod,
    ultimaMod,
    normSummonAura,
    normBuffs,
    normDebuffs,
  } = inputs

  return (
    1 +
    (normalAtkMod / 100) * (1 + optimusAura / 100) +
    bahamutMod / 100 +
    ultimaMod / 100 +
    normSummonAura / 100 +
    normBuffs / 100 -
    normDebuffs / 100
  )
}

export function calculateOmegaAtkBoost(inputs: NormalOmegaExInputs): number {
  const { omegaAtkMod, omegaAura } = inputs

  return 1 + (omegaAtkMod / 100) * (1 + omegaAura / 100)
}

export function calculateExAtkBoost(inputs: NormalOmegaExInputs): number {
  const { usualExMod, mysteriousExMod, rankoAura } = inputs

  return 1 + usualExMod / 100 + (mysteriousExMod / 100) * (1 + rankoAura / 100)
}

export function calculateNormalEnmityBoost(
  inputs: NormalOmegaExInputs
): number {
  const { normalEnmityMod, optimusAura } = inputs

  return 1 + (normalEnmityMod / 100) * (1 + optimusAura / 100)
}

export function calculateNormalStaminaBoost(
  inputs: NormalOmegaExInputs
): number {
  const { normalStaminaMod, optimusAura } = inputs

  return 1 + (normalStaminaMod / 100) * (1 + optimusAura / 100)
}

export function calculateOmegaEnmityBoost(inputs: NormalOmegaExInputs): number {
  const { omegaEnmityMod, omegaAura } = inputs

  return 1 + (omegaEnmityMod / 100) * (1 + omegaAura / 100)
}

export function calculateOmegaStaminaBoost(
  inputs: NormalOmegaExInputs
): number {
  const { omegaStaminaMod, omegaAura } = inputs

  return 1 + (omegaStaminaMod / 100) * (1 + omegaAura / 100)
}

export function calculateExEnmityBoost(inputs: NormalOmegaExInputs): number {
  const { exEnmityMod } = inputs

  return 1 + exEnmityMod / 100
}

export function calculateExStaminaBoost(inputs: NormalOmegaExInputs): number {
  const { exStaminaMod } = inputs

  return 1 + exStaminaMod / 100
}

export function calculateNormalOmegaExBoosts(
  inputs: NormalOmegaExInputs
): number {
  const normalAtk = calculateNormalAtkBoost(inputs)
  const omegaAtk = calculateOmegaAtkBoost(inputs)
  const exAtk = calculateExAtkBoost(inputs)
  const normalEnmity = calculateNormalEnmityBoost(inputs)
  const normalStamina = calculateNormalStaminaBoost(inputs)
  const omegaEnmity = calculateOmegaEnmityBoost(inputs)
  const omegaStamina = calculateOmegaStaminaBoost(inputs)
  const exEnmity = calculateExEnmityBoost(inputs)
  const exStamina = calculateExStaminaBoost(inputs)

  const product =
    normalAtk *
    omegaAtk *
    exAtk *
    normalEnmity *
    normalStamina *
    omegaEnmity *
    omegaStamina *
    exEnmity *
    exStamina

  return product - inputs.fixedAtkModifiers / 100
}
