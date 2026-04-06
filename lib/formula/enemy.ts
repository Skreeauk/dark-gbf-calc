import { EnemyInputs, SleepStatus } from "./types"

export function calculateEnemyDef(inputs: EnemyInputs): number {
  const { innateDef, defUpMods, defDownMods, uniqueDefDownMods } = inputs

  const cappedDefUp = Math.min(defUpMods / 100, 0.5)
  const cappedDefDown = Math.min(defDownMods / 100, 0.5)
  const uniqueDefDown = uniqueDefDownMods / 100

  return innateDef * (1 + cappedDefUp - cappedDefDown - uniqueDefDown)
}

export function calculateSleepingBoost(status: SleepStatus): number {
  return status
}
