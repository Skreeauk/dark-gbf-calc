import { CalculatorInputs } from "./types"
import { calculateElementalBoost } from "./elemental"
import { calculateNormalOmegaExBoosts } from "./normal-omega-ex"
import {
  calculateCharEnmityBoost,
  calculateCharStaminaBoost,
  calculatePerpetualBoost,
  calculateUniqueStackableBoost,
  calculateAssassinBoost,
  calculateTotalCharUniqueAtkBoosts,
} from "./character-mods"
import { calculateCrewShipBoost, calculateCrewSkillsBoost } from "./crew"
import { calculateAtkDebuffEffect } from "./atk-debuff"

export function calculateBaseDamage(inputs: CalculatorInputs): number {
  const {
    character,
    elemental,
    normalOmegaEx,
    characterMods,
    crew,
    atkDebuff,
  } = inputs

  const charATK =
    character.baseATK +
    (character.weaponSpecialty
      ? character.gridWeaponATK * 1.2
      : character.gridWeaponATK) +
    character.summonATK

  const elementalBoost = calculateElementalBoost(elemental)
  const normalOmegaExBoosts = calculateNormalOmegaExBoosts(normalOmegaEx)
  const charEnmityBoost = calculateCharEnmityBoost(characterMods)
  const charStaminaBoost = calculateCharStaminaBoost(characterMods)
  const perpetualBoost = calculatePerpetualBoost(characterMods)
  const uniqueStackableBoost = calculateUniqueStackableBoost(characterMods)
  const assassinBoost = calculateAssassinBoost(characterMods)
  const totalCharUniqueAtkBoosts =
    calculateTotalCharUniqueAtkBoosts(characterMods)
  const crewShipBoost = calculateCrewShipBoost(crew)
  const crewSkillsBoost = calculateCrewSkillsBoost(crew)
  const atkDebuffEffect = calculateAtkDebuffEffect(atkDebuff)

  return (
    charATK *
    elementalBoost *
    normalOmegaExBoosts *
    charEnmityBoost *
    charStaminaBoost *
    perpetualBoost *
    uniqueStackableBoost *
    assassinBoost *
    totalCharUniqueAtkBoosts *
    crewShipBoost *
    crewSkillsBoost *
    atkDebuffEffect
  )
}
