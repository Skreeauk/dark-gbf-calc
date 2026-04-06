import { CalculatorInputs, CalculatorResult } from "./types"
import { calculateBaseDamage } from "./base-damage"
import { calculateEnemyDef, calculateSleepingBoost } from "./enemy"
import { calculateNormalDamage, calculateCriticalDamage } from "./normal-damage"
import { calculateCaDamage } from "./ca-damage"

export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const baseDamage = calculateBaseDamage(inputs)
  const enemyDef = calculateEnemyDef(inputs.enemy)
  const sleepingBoost = calculateSleepingBoost(inputs.enemy.sleepStatus)
  const normalDamage = calculateNormalDamage(
    baseDamage,
    enemyDef,
    sleepingBoost
  )
  const criticalDamage = calculateCriticalDamage(
    normalDamage,
    inputs.critical.criticalMods
  )
  const caDamage = calculateCaDamage(normalDamage, inputs.caDamage)

  return {
    baseDamage: { value: baseDamage },
    normalDamage: { value: normalDamage },
    criticalDamage: { value: criticalDamage },
    caDamage: { value: caDamage },
  }
}
