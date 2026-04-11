import {
  SupplementalSeraphicInputs,
  DamageCapInputs,
  FinalDamageResult,
} from "./types"

const NORMAL_STANDARD_THRESHOLDS = [300_000, 400_000, 500_000, 600_000]
const NORMAL_STANDARD_REDUCTIONS = [0, 0.2, 0.4, 0.95, 0.99]

const NORMAL_ASSASSIN_THRESHOLDS = [1_000_000, 1_200_000, 1_300_000, 1_500_000]
const NORMAL_ASSASSIN_REDUCTIONS = [0, 0.4, 0.7, 0.95, 0.99]

const CA_STANDARD_THRESHOLDS = [1_500_000, 1_700_000, 1_800_000, 2_500_000]
const CA_STANDARD_REDUCTIONS = [0, 0.4, 0.7, 0.95, 0.99]

const HARD_CAP_6_6_THRESHOLDS = [6_000_000, 7_000_000, 8_000_000]
const HARD_CAP_6_6_REDUCTIONS = [0, 0.5, 0.9, 0.999]

const HARD_CAP_13_1_THRESHOLDS = [12_000_000, 14_000_000, 15_000_000]
const HARD_CAP_13_1_REDUCTIONS = [0, 0.5, 0.9, 0.999]

function applySoftCap(
  rawDamage: number,
  thresholds: number[],
  reductions: number[],
  damageCapUp: number,
  capPenetration: number
): number {
  const scaleFactor = 1 + damageCapUp / 100
  const scaledThresholds = thresholds.map((t) => t * scaleFactor)
  const penetrationFactor = 1 + capPenetration / 100

  let remaining = rawDamage
  let result = 0
  let prevThreshold = 0

  for (let i = 0; i < scaledThresholds.length; i++) {
    const tierThreshold = scaledThresholds[i]
    const reduction = reductions[i]

    if (remaining <= 0) break

    const tierWidth = tierThreshold - prevThreshold
    const amountInTier = Math.min(remaining, tierWidth)

    let adjustedReduction = reduction
    if (reduction > 0) {
      adjustedReduction = Math.max(0, 1 - (1 - reduction) * penetrationFactor)
    }

    result += amountInTier * (1 - adjustedReduction)
    remaining -= amountInTier
    prevThreshold = tierThreshold
  }

  if (remaining > 0) {
    const finalReduction = reductions[reductions.length - 1]
    let adjustedFinalReduction = finalReduction
    if (finalReduction > 0) {
      adjustedFinalReduction = Math.max(
        0,
        1 - (1 - finalReduction) * penetrationFactor
      )
    }
    result += remaining * (1 - adjustedFinalReduction)
  }

  return result
}

function applyHardCap(
  damage: number,
  thresholds: number[],
  reductions: number[],
  specialCaCapUp?: number
): number {
  const scaleFactor =
    specialCaCapUp !== undefined ? 1 + specialCaCapUp / 100 : 1
  const scaledThresholds = thresholds.map((t) => t * scaleFactor)

  let remaining = damage
  let result = 0
  let prevThreshold = 0

  for (let i = 0; i < scaledThresholds.length; i++) {
    const tierThreshold = scaledThresholds[i]
    const reduction = reductions[i]

    if (remaining <= 0) break

    const tierWidth = tierThreshold - prevThreshold
    const amountInTier = Math.min(remaining, tierWidth)

    result += amountInTier * (1 - reduction)
    remaining -= amountInTier
    prevThreshold = tierThreshold
  }

  if (remaining > 0) {
    const finalReduction = reductions[reductions.length - 1]
    result += remaining * (1 - finalReduction)
  }

  return result
}

export function calculateFinalDamage(
  normalDamage: number,
  criticalDamage: number,
  caDamage: number,
  suppSeraphic: SupplementalSeraphicInputs,
  damageCap: DamageCapInputs
): FinalDamageResult {
  const { supplementalDamage, seraphicMod, dmgTakenAmpMods } = suppSeraphic

  const {
    genericDamageCapUp,
    normalDamageCapUp,
    caDamageCapUp,
    capPenetration,
    specialCaDmgCapUp,
    hardCapMode,
    assassinMode,
  } = damageCap

  const totalNormalCapUp = genericDamageCapUp + normalDamageCapUp
  const totalCaCapUp =
    genericDamageCapUp + caDamageCapUp + (assassinMode ? 30 : 0)

  const softCappedNormalStandard = applySoftCap(
    normalDamage,
    NORMAL_STANDARD_THRESHOLDS,
    NORMAL_STANDARD_REDUCTIONS,
    totalNormalCapUp,
    capPenetration
  )

  const softCappedNormalAssassin = applySoftCap(
    normalDamage,
    NORMAL_ASSASSIN_THRESHOLDS,
    NORMAL_ASSASSIN_REDUCTIONS,
    totalNormalCapUp,
    capPenetration
  )

  const softCappedCriticalStandard = applySoftCap(
    criticalDamage,
    NORMAL_STANDARD_THRESHOLDS,
    NORMAL_STANDARD_REDUCTIONS,
    totalNormalCapUp,
    capPenetration
  )

  const softCappedCriticalAssassin = applySoftCap(
    criticalDamage,
    NORMAL_ASSASSIN_THRESHOLDS,
    NORMAL_ASSASSIN_REDUCTIONS,
    totalNormalCapUp,
    capPenetration
  )

  const seraphicFactor = 1 + seraphicMod / 100

  const withSeraphicNormalStandard = softCappedNormalStandard * seraphicFactor
  const withSeraphicNormalAssassin = softCappedNormalAssassin * seraphicFactor
  const withSeraphicCriticalStandard =
    softCappedCriticalStandard * seraphicFactor
  const withSeraphicCriticalAssassin =
    softCappedCriticalAssassin * seraphicFactor

  const hardCapThresholds =
    hardCapMode === "6.6m"
      ? HARD_CAP_6_6_THRESHOLDS
      : hardCapMode === "13.1m"
        ? HARD_CAP_13_1_THRESHOLDS
        : undefined
  const hardCapReductions =
    hardCapMode === "6.6m"
      ? HARD_CAP_6_6_REDUCTIONS
      : hardCapMode === "13.1m"
        ? HARD_CAP_13_1_REDUCTIONS
        : undefined

  const hardCappedNormalStandard =
    hardCapMode !== "none" && hardCapThresholds && hardCapReductions
      ? applyHardCap(
          withSeraphicNormalStandard,
          hardCapThresholds,
          hardCapReductions
        )
      : withSeraphicNormalStandard

  const hardCappedNormalAssassin =
    hardCapMode !== "none" && hardCapThresholds && hardCapReductions
      ? applyHardCap(
          withSeraphicNormalAssassin,
          hardCapThresholds,
          hardCapReductions
        )
      : withSeraphicNormalAssassin

  const hardCappedCriticalStandard =
    hardCapMode !== "none" && hardCapThresholds && hardCapReductions
      ? applyHardCap(
          withSeraphicCriticalStandard,
          hardCapThresholds,
          hardCapReductions
        )
      : withSeraphicCriticalStandard

  const hardCappedCriticalAssassin =
    hardCapMode !== "none" && hardCapThresholds && hardCapReductions
      ? applyHardCap(
          withSeraphicCriticalAssassin,
          hardCapThresholds,
          hardCapReductions
        )
      : withSeraphicCriticalAssassin

  const dmgTakenAmpFactor = dmgTakenAmpMods / 100

  const dmgTakenAmpNormalStandard = hardCappedNormalStandard * dmgTakenAmpFactor
  const dmgTakenAmpNormalAssassin = hardCappedNormalAssassin * dmgTakenAmpFactor
  const dmgTakenAmpCriticalStandard =
    hardCappedCriticalStandard * dmgTakenAmpFactor
  const dmgTakenAmpCriticalAssassin =
    hardCappedCriticalAssassin * dmgTakenAmpFactor

  const normalStandard =
    hardCappedNormalStandard + dmgTakenAmpNormalStandard + supplementalDamage
  const normalAssassin =
    hardCappedNormalAssassin + dmgTakenAmpNormalAssassin + supplementalDamage
  const criticalStandard =
    hardCappedCriticalStandard +
    dmgTakenAmpCriticalStandard +
    supplementalDamage
  const criticalAssassin =
    hardCappedCriticalAssassin +
    dmgTakenAmpCriticalAssassin +
    supplementalDamage

  const softCappedCa = applySoftCap(
    caDamage,
    CA_STANDARD_THRESHOLDS,
    CA_STANDARD_REDUCTIONS,
    totalCaCapUp,
    capPenetration
  )

  const dmgTakenAmpCa = softCappedCa * dmgTakenAmpFactor
  const withAmpAndSuppCa = softCappedCa + dmgTakenAmpCa + supplementalDamage
  const withSeraphicCa = withAmpAndSuppCa * seraphicFactor

  const caHardCapped =
    hardCapMode !== "none" && hardCapThresholds && hardCapReductions
      ? applyHardCap(
          withSeraphicCa,
          hardCapThresholds,
          hardCapReductions,
          specialCaDmgCapUp
        )
      : withSeraphicCa

  const caDamageResult = caHardCapped

  return {
    normalStandard,
    normalAssassin,
    criticalStandard,
    criticalAssassin,
    caDamage: caDamageResult,
  }
}
