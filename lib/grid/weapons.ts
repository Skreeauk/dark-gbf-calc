import { Weapon, WeaponType, Element, WeaponSkillType } from "./types"

export const WEAPON_DATABASE: Weapon[] = [
  {
    id: "standard_sword",
    name: "Standard Sword",
    atk: 450,
    weaponType: WeaponType.Sword,
    element: Element.Fire,
    skills: [],
  },
  {
    id: "omega_sword",
    name: "Omega Sword",
    atk: 520,
    weaponType: WeaponType.Sword,
    element: Element.Fire,
    skills: [
      {
        name: "Omega ATK Boost",
        type: WeaponSkillType.OmegaAtk,
        value: 20,
      },
    ],
  },
  {
    id: "bahamut_sword",
    name: "Bahamut Sword",
    atk: 600,
    weaponType: WeaponType.Sword,
    element: Element.Fire,
    skills: [
      {
        name: "Bahamut's Fury",
        type: WeaponSkillType.Bahamut,
        value: 30,
      },
      {
        name: "Normal ATK Boost",
        type: WeaponSkillType.NormalAtk,
        value: 15,
      },
    ],
  },
  {
    id: "standard_dagger",
    name: "Standard Dagger",
    atk: 300,
    weaponType: WeaponType.Dagger,
    element: Element.Water,
    skills: [],
  },
  {
    id: "enmity_dagger",
    name: "Enmity Dagger",
    atk: 350,
    weaponType: WeaponType.Dagger,
    element: Element.Water,
    skills: [
      {
        name: "Enmity",
        type: WeaponSkillType.NormalEnmity,
        value: 20,
      },
    ],
  },
  {
    id: "standard_spear",
    name: "Standard Spear",
    atk: 480,
    weaponType: WeaponType.Spear,
    element: Element.Earth,
    skills: [],
  },
  {
    id: "omega_spear",
    name: "Omega Spear",
    atk: 550,
    weaponType: WeaponType.Spear,
    element: Element.Earth,
    skills: [
      {
        name: "Omega Stamina Boost",
        type: WeaponSkillType.OmegaStamina,
        value: 25,
      },
    ],
  },
  {
    id: "standard_axe",
    name: "Standard Axe",
    atk: 420,
    weaponType: WeaponType.Axe,
    element: Element.Wind,
    skills: [],
  },
  {
    id: "mystery_axe",
    name: "Mystery Axe",
    atk: 580,
    weaponType: WeaponType.Axe,
    element: Element.Wind,
    skills: [
      {
        name: "Mysterious EX Boost",
        type: WeaponSkillType.ExMysterious,
        value: 30,
      },
    ],
  },
  {
    id: "standard_wand",
    name: "Standard Wand",
    atk: 350,
    weaponType: WeaponType.Wand,
    element: Element.Light,
    skills: [],
  },
  {
    id: "ex_wand",
    name: "EX Wand",
    atk: 480,
    weaponType: WeaponType.Wand,
    element: Element.Light,
    skills: [
      {
        name: "EX ATK Boost",
        type: WeaponSkillType.ExAtk,
        value: 25,
      },
    ],
  },
  {
    id: "standard_gun",
    name: "Standard Gun",
    atk: 380,
    weaponType: WeaponType.Gun,
    element: Element.Dark,
    skills: [],
  },
  {
    id: "ultimate_gun",
    name: "Ultimate Gun",
    atk: 620,
    weaponType: WeaponType.Gun,
    element: Element.Dark,
    skills: [
      {
        name: "Ultima's Power",
        type: WeaponSkillType.Ultima,
        value: 35,
      },
    ],
  },
  {
    id: "standard_fist",
    name: "Standard Fist",
    atk: 320,
    weaponType: WeaponType.Fist,
    element: Element.Fire,
    skills: [],
  },
  {
    id: "omega_fist",
    name: "Omega Fist",
    atk: 480,
    weaponType: WeaponType.Fist,
    element: Element.Fire,
    skills: [
      {
        name: "Omega Enmity Boost",
        type: WeaponSkillType.OmegaEnmity,
        value: 20,
      },
    ],
  },
  {
    id: "standard_bow",
    name: "Standard Bow",
    atk: 400,
    weaponType: WeaponType.Bow,
    element: Element.Water,
    skills: [],
  },
  {
    id: "stamina_bow",
    name: "Stamina Bow",
    atk: 450,
    weaponType: WeaponType.Bow,
    element: Element.Water,
    skills: [
      {
        name: "Stamina Boost",
        type: WeaponSkillType.NormalStamina,
        value: 25,
      },
    ],
  },
  {
    id: "standard_harp",
    name: "Standard Harp",
    atk: 380,
    weaponType: WeaponType.Harp,
    element: Element.Earth,
    skills: [],
  },
  {
    id: "bahamut_harp",
    name: "Bahamut Harp",
    atk: 580,
    weaponType: WeaponType.Harp,
    element: Element.Earth,
    skills: [
      {
        name: "Bahamut's Blessing",
        type: WeaponSkillType.Bahamut,
        value: 40,
      },
      {
        name: "Normal ATK Boost",
        type: WeaponSkillType.NormalAtk,
        value: 20,
      },
    ],
  },
  {
    id: "standard_katana",
    name: "Standard Katana",
    atk: 440,
    weaponType: WeaponType.Katana,
    element: Element.Wind,
    skills: [],
  },
  {
    id: "enmity_katana",
    name: "Enmity Katana",
    atk: 520,
    weaponType: WeaponType.Katana,
    element: Element.Wind,
    skills: [
      {
        name: "Enmity",
        type: WeaponSkillType.NormalEnmity,
        value: 30,
      },
    ],
  },
  {
    id: "ex_katana",
    name: "EX Katana",
    atk: 600,
    weaponType: WeaponType.Katana,
    element: Element.Light,
    skills: [
      {
        name: "EX ATK Boost",
        type: WeaponSkillType.ExAtk,
        value: 25,
      },
      {
        name: "EX Enmity",
        type: WeaponSkillType.ExEnmity,
        value: 15,
      },
    ],
  },
  {
    id: "versatile_spear",
    name: "Versatile Spear",
    atk: 540,
    weaponType: WeaponType.Spear,
    element: Element.Dark,
    skills: [
      {
        name: "Normal Stamina",
        type: WeaponSkillType.NormalStamina,
        value: 20,
      },
      {
        name: "Omega ATK",
        type: WeaponSkillType.OmegaAtk,
        value: 15,
      },
    ],
  },
]
