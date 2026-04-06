export enum ElementMatchup {
  Superior = 0.5,
  Neutral = 0,
  Inferior = -0.25,
}

export enum SleepStatus {
  None = 1.0,
  StaredStiff = 1.1,
  Sleep = 1.25,
  Comatose = 1.5,
}

export interface CharacterInputs {
  baseATK: number
  gridWeaponATK: number
  summonATK: number
  weaponSpecialty: boolean
}

export interface ElementalInputs {
  elementMatchup: ElementMatchup
  elemSummonMod: number
  elemEmpBuffs: number
  elemAtkBuffs: number
  elemAtkDebuffs: number
}

export interface NormalOmegaExInputs {
  normalAtkMod: number
  optimusAura: number
  bahamutMod: number
  ultimaMod: number
  normSummonAura: number
  normBuffs: number
  normDebuffs: number
  omegaAtkMod: number
  omegaAura: number
  usualExMod: number
  mysteriousExMod: number
  rankoAura: number
  normalEnmityMod: number
  normalStaminaMod: number
  omegaEnmityMod: number
  omegaStaminaMod: number
  exEnmityMod: number
  exStaminaMod: number
  fixedAtkModifiers: number
}

export interface CharacterModInputs {
  jammedMod: number
  enmityEmpMod: number
  ringEnmityMod: number
  axEnmityMod: number
  strengthMod: number
  staminaEmpMod: number
  ringStaminaMod: number
  axStaminaMod: number
  perpetuityMod: number
  uniqueStackableMod: number
  assassinMod: number
  uniqueAtkMods: number[]
}

export interface AtkDebuffInputs {
  atkDownMod: number
}

export interface CrewInputs {
  crewShipMod: number
  crewSkillMod: number
}

export interface EnemyInputs {
  innateDef: number
  defUpMods: number
  defDownMods: number
  uniqueDefDownMods: number
  sleepStatus: SleepStatus
}

export interface CaDamageInputs {
  caMultiplier: number
  caBuffMods: number
  caWeaponMods: number
  fixedCaDamage: number
}

export interface CriticalInputs {
  criticalMods: number
}

export interface BaseDamageResult {
  value: number
}

export interface NormalDamageResult {
  value: number
}

export interface CriticalDamageResult {
  value: number
}

export interface CaDamageResult {
  value: number
}

export interface CalculatorInputs {
  character: CharacterInputs
  elemental: ElementalInputs
  normalOmegaEx: NormalOmegaExInputs
  characterMods: CharacterModInputs
  atkDebuff: AtkDebuffInputs
  crew: CrewInputs
  enemy: EnemyInputs
  caDamage: CaDamageInputs
  critical: CriticalInputs
}

export interface CalculatorResult {
  baseDamage: BaseDamageResult
  normalDamage: NormalDamageResult
  criticalDamage: CriticalDamageResult
  caDamage: CaDamageResult
}
