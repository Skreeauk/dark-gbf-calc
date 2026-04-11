import { create } from "zustand"
import type {
  CalculatorInputs,
  CalculatorResult,
  CharacterInputs,
  ElementalInputs,
  NormalOmegaExInputs,
  CharacterModInputs,
  AtkDebuffInputs,
  CrewInputs,
  EnemyInputs,
  CaDamageInputs,
  CriticalInputs,
  SupplementalSeraphicInputs,
  DamageCapInputs,
} from "../formula/types"
import { calculate } from "../formula"
import { ElementMatchup, SleepStatus, HardCapMode } from "../formula/types"

interface CalculatorState {
  inputs: CalculatorInputs
  outputs: {
    baseDamage: number
    normalDamage: number
    criticalDamage: number
    caDamage: number
    finalDamage: {
      normalStandard: number
      normalAssassin: number
      criticalStandard: number
      criticalAssassin: number
      caDamage: number
    }
  }
}

const defaultInputs: CalculatorInputs = {
  character: {
    baseATK: 0,
    gridWeaponATK: 0,
    summonATK: 0,
    weaponSpecialty: true,
  },
  elemental: {
    elementMatchup: ElementMatchup.Neutral,
    elemSummonMod: 0,
    elemEmpBuffs: 0,
    elemAtkBuffs: 0,
    elemAtkDebuffs: 0,
  },
  normalOmegaEx: {
    normalAtkMod: 0,
    optimusAura: 0,
    bahamutMod: 0,
    ultimaMod: 0,
    normSummonAura: 0,
    normBuffs: 0,
    normDebuffs: 0,
    omegaAtkMod: 0,
    omegaAura: 0,
    usualExMod: 0,
    mysteriousExMod: 0,
    rankoAura: 0,
    normalEnmityMod: 0,
    normalStaminaMod: 0,
    omegaEnmityMod: 0,
    omegaStaminaMod: 0,
    exEnmityMod: 0,
    exStaminaMod: 0,
    fixedAtkModifiers: 0,
  },
  characterMods: {
    jammedMod: 0,
    enmityEmpMod: 0,
    ringEnmityMod: 0,
    axEnmityMod: 0,
    strengthMod: 0,
    staminaEmpMod: 0,
    ringStaminaMod: 0,
    axStaminaMod: 0,
    perpetuityMod: 0,
    uniqueStackableMod: 0,
    assassinMod: 0,
    uniqueAtkMods: [],
  },
  atkDebuff: {
    atkDownMod: 0,
  },
  crew: {
    crewShipMod: 0,
    crewSkillMod: 0,
  },
  enemy: {
    innateDef: 10,
    defUpMods: 0,
    defDownMods: 0,
    uniqueDefDownMods: 0,
    sleepStatus: SleepStatus.None,
  },
  caDamage: {
    caMultiplier: 450,
    caBuffMods: 0,
    caWeaponMods: 0,
    fixedCaDamage: 0,
  },
  critical: {
    criticalMods: 0,
  },
  supplementalSeraphic: {
    supplementalDamage: 0,
    seraphicMod: 0,
    dmgTakenAmpMods: 0,
  },
  damageCap: {
    genericDamageCapUp: 0,
    normalDamageCapUp: 0,
    caDamageCapUp: 0,
    capPenetration: 0,
    specialCaDmgCapUp: 0,
    hardCapMode: HardCapMode.None,
    assassinMode: false,
  },
}

function calculateOutputs(inputs: CalculatorInputs) {
  const result: CalculatorResult = calculate(inputs)
  return {
    baseDamage: result.baseDamage.value,
    normalDamage: result.normalDamage.value,
    criticalDamage: result.criticalDamage.value,
    caDamage: result.caDamage.value,
    finalDamage: result.finalDamage,
  }
}

const initialOutputs = calculateOutputs(defaultInputs)

export const useCalculatorStore = create<
  CalculatorState & {
    updateCharacter: (partial: Partial<CharacterInputs>) => void
    updateElemental: (partial: Partial<ElementalInputs>) => void
    updateNormalOmegaEx: (partial: Partial<NormalOmegaExInputs>) => void
    updateCharacterMods: (partial: Partial<CharacterModInputs>) => void
    updateAtkDebuff: (partial: Partial<AtkDebuffInputs>) => void
    updateCrew: (partial: Partial<CrewInputs>) => void
    updateEnemy: (partial: Partial<EnemyInputs>) => void
    updateCaDamage: (partial: Partial<CaDamageInputs>) => void
    updateCritical: (partial: Partial<CriticalInputs>) => void
    updateSupplementalSeraphic: (
      partial: Partial<SupplementalSeraphicInputs>
    ) => void
    updateDamageCap: (partial: Partial<DamageCapInputs>) => void
  }
>((set) => ({
  inputs: defaultInputs,
  outputs: initialOutputs,

  updateCharacter: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        character: { ...state.inputs.character, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateElemental: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        elemental: { ...state.inputs.elemental, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateNormalOmegaEx: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        normalOmegaEx: { ...state.inputs.normalOmegaEx, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateCharacterMods: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        characterMods: { ...state.inputs.characterMods, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateAtkDebuff: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        atkDebuff: { ...state.inputs.atkDebuff, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateCrew: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        crew: { ...state.inputs.crew, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateEnemy: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        enemy: { ...state.inputs.enemy, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateCaDamage: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        caDamage: { ...state.inputs.caDamage, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateCritical: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        critical: { ...state.inputs.critical, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateSupplementalSeraphic: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        supplementalSeraphic: {
          ...state.inputs.supplementalSeraphic,
          ...partial,
        },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),

  updateDamageCap: (partial) =>
    set((state) => {
      const newInputs = {
        ...state.inputs,
        damageCap: { ...state.inputs.damageCap, ...partial },
      }
      return {
        inputs: newInputs,
        outputs: calculateOutputs(newInputs),
      }
    }),
}))
