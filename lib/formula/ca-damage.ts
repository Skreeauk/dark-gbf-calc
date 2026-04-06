import { CaDamageInputs } from "./types"

export function calculateCaDamage(
  normalDamage: number,
  inputs: CaDamageInputs
): number {
  const { caMultiplier, caBuffMods, caWeaponMods, fixedCaDamage } = inputs

  const caBuffBoost = 1 + caBuffMods / 100
  const caWeaponBoost = 1 + caWeaponMods / 100

  return (
    normalDamage * (caMultiplier / 100) * caBuffBoost * caWeaponBoost +
    fixedCaDamage
  )
}
