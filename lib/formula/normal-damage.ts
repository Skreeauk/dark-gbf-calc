export function calculateNormalDamage(
  baseDamage: number,
  enemyDef: number,
  sleepingBoost: number,
  randomModifier: number = 1.0
): number {
  return (baseDamage * sleepingBoost * randomModifier) / enemyDef
}

export function calculateCriticalDamage(
  normalDamage: number,
  criticalMods: number
): number {
  return normalDamage * (1 + criticalMods / 100)
}
