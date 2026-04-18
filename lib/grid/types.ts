export enum WeaponType {
  Sword = "sword",
  Dagger = "dagger",
  Spear = "spear",
  Axe = "axe",
  Wand = "wand",
  Gun = "gun",
  Fist = "fist",
  Bow = "bow",
  Harp = "harp",
  Katana = "katana",
}

export enum Element {
  Fire = "fire",
  Water = "water",
  Earth = "earth",
  Wind = "wind",
  Light = "light",
  Dark = "dark",
}

export enum WeaponSkillType {
  NormalAtk = "normalAtk",
  NormalEnmity = "normalEnmity",
  NormalStamina = "normalStamina",
  OmegaAtk = "omegaAtk",
  OmegaEnmity = "omegaEnmity",
  OmegaStamina = "omegaStamina",
  ExAtk = "exAtk",
  ExMysterious = "exMysterious",
  ExEnmity = "exEnmity",
  ExStamina = "exStamina",
  Bahamut = "bahamut",
  Ultima = "ultima",
  None = "none",
}

export interface WeaponSkill {
  name: string
  type: WeaponSkillType
  value: number // percentage multiplier (e.g., 50 = 50%)
}

export interface Weapon {
  id: string
  name: string
  atk: number
  weaponType: WeaponType
  element: Element
  skills: WeaponSkill[]
}

export type GridSlot = Weapon | null

export interface WeaponGrid {
  mainhand: GridSlot
  grid: GridSlot[] // 12 slots: 3x4 grid
}
