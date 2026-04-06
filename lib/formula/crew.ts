import { CrewInputs } from "./types"

export function calculateCrewShipBoost(inputs: CrewInputs): number {
  const { crewShipMod } = inputs

  return 1 + crewShipMod / 100
}

export function calculateCrewSkillsBoost(inputs: CrewInputs): number {
  const { crewSkillMod } = inputs

  return 1 + crewSkillMod / 100
}
