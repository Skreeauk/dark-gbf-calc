```{=mediawiki}
{{PageGroupDamage}}
```
Apart from fixed damage instances, all damage in Granblue Fantasy is
based on the characters\' ATK stat, which is then affected by a series
of modifiers coming from skills effects, weapon skills, summon calls,
etc.

For computations, the notion of *Base Damage* is useful to factor in all
these modifiers. It is then used to compute actual damage values such of
normal attacks, charge attacks, etc.

## Base damage {#base_damage}

Base damage is a virtual damage value that is used as a basis in the
computation of the actual damage values for in-game attack types
(normal, counters, charge attacks, etc.).

It can be expressed as:

`Base damage =`\
`  `[`Character total ATK`](#Character_total_ATK "Character total ATK"){.wikilink}` ×`\
`  `[`Elemental boost`](#Elemental_boost "Elemental boost"){.wikilink}` ×`\
`  NormalOmegaEx boosts ×`\
`  `[`Char Enmity boost`](#Char_Enmity/Stamina_boost "Char Enmity boost"){.wikilink}` × `[`Char Stamina boost`](#Char_Enmity/Stamina_boost "Char Stamina boost"){.wikilink}` × `[`Perpetuity boost`](#Perpetuity_boost "Perpetuity boost"){.wikilink}` × `[`Unique Stackable boost`](#Unique_Stackable_boost "Unique Stackable boost"){.wikilink}` × `[`Assassin boost`](#Assassin_boost "Assassin boost"){.wikilink}` × `[`Total Char Unique ATK boosts`](#Total_Char_Unique_ATK_boosts "Total Char Unique ATK boosts"){.wikilink}` ×`\
`  `[`Crew Ship boost`](#Crew_Ship_boost_/_Crew_Skills_boost "Crew Ship boost"){.wikilink}` × `[`Crew Skills boost`](#Crew_Ship_boost_/_Crew_Skills_boost "Crew Skills boost"){.wikilink}` ×`\
`  `[`ATK down debuff effect`](#ATK_down_debuff_effect "ATK down debuff effect"){.wikilink}

`NormalOmegaEx boosts` is a composite value:

`NormalOmegaEX boosts = (`\
`  `[`Normal ATK boost`](#Normal_ATK_boost "Normal ATK boost"){.wikilink}` × `[`Normal Enmity boost`](#Normal/Omega/EX_Enmity_and_Stamina_boosts "Normal Enmity boost"){.wikilink}` × `[`Normal Stamina boost`](#Normal/Omega/EX_Enmity_and_Stamina_boosts "Normal Stamina boost"){.wikilink}` ×`\
`  `[`Omega ATK boost`](#Omega_ATK_boost "Omega ATK boost"){.wikilink}` × `[`Omega Enmity boost`](#Normal/Omega/EX_Enmity_and_Stamina_boosts "Omega Enmity boost"){.wikilink}` × `[`Omega Stamina boost`](#Normal/Omega/EX_Enmity_and_Stamina_boosts "Omega Stamina boost"){.wikilink}` ×`\
`  `[`EX ATK boost`](#EX_ATK_boost "EX ATK boost"){.wikilink}` × `[`EX Enmity boost`](#Normal/Omega/EX_Enmity_and_Stamina_boosts "EX Enmity boost"){.wikilink}\
`  ) - `[`Fixed ATK Modifiers`](#Fixed_ATK_Modifiers "Fixed ATK Modifiers"){.wikilink}

The different boost categories that appear in these formulas are
detailed below. **Within a boost category, the modifiers always stack
additively.** Sometimes, two modifiers will not stack with each other:
in that case, priority rules appear, which depend on the type of
modifiers.^\[Citation\ needed\]^

### Character total ATK {#character_total_atk}

The sum of the character\'s base ATK, grid weapons\' ATK values, and
summon ATK values. If a weapon matches the character\'s [weapon
specialty](weapon_specialty "weapon specialty"){.wikilink}, it
contributes at 120% of its base ATK instead of 100%.

### Elemental boost {#elemental_boost}

`Elemental boost = 1 + Elem superiority + Elem summon mod + Elem EMP buffs + Elem ATK buffs - Elem ATK debuffs`

Elemental superiority is 50% when the character is element-superior to
the enemy, -25% when element-inferior, 0% otherwise.

Elemental summon modifiers are auras of the type *X% boost to
\[Element\] Elemental ATK*.

Elemental EMP buffs are EMPs of the type *\[Element\] ATK up*.

Elemental ATK buffs and debuffs are the *\[Element\] ATK up/down*
effects that can come from skills, weapons, enemies or summon calls.

### Normal ATK boost {#normal_atk_boost}

`Normal ATK boost = 1 + Norm ATK mod × (1 + Optimus aura) + Bahamut mod + Ultima mod + NormSummon aura + Norm buffs - Norm debuffs`

Normal ATK modifier encompasses all the Normal weapon skills that
increase ATK with no requirement on character HP level.

Optimus aura is the modifier from the Optimus Series summons aura (and
their Demi Optimus counterparts): [Agni](Agni "Agni"){.wikilink},
[Varuna](Varuna "Varuna"){.wikilink}, [Titan](Titan "Titan"){.wikilink},
[Zephyrus](Zephyrus "Zephyrus"){.wikilink},
[Zeus](Zeus "Zeus"){.wikilink} and [Hades](Hades "Hades"){.wikilink}.

Normal summon aura is the *X% boost to Normal ATK* modifer from summons
such as [Grand Order](Grand_Order "Grand Order"){.wikilink}.

Normal buffs/debuffs are the *ATK up/down* effects that can come from
skills, enemies or summon calls.

### Omega ATK boost {#omega_atk_boost}

`Omega ATK boost = 1 + Omega ATK mod × (1 + Omega aura)`

Omega ATK modifiers encompass all the Omega weapon skills that increase
ATK with no requirement on character HP level.

Omega aura is the modifier from the Omega Series SSR summons aura:
[Colossus](Colossus_Omega "Colossus"){.wikilink},
[Leviathan](Leviathan_Omega "Leviathan"){.wikilink},
[Yggdrasil](Yggdrasil_Omega "Yggdrasil"){.wikilink},
[Tiamat](Tiamat_Omega "Tiamat"){.wikilink},
[Luminiera](Luminiera_Omega "Luminiera"){.wikilink} and
[Celeste](Celeste_Omega "Celeste"){.wikilink}.

### EX ATK boost {#ex_atk_boost}

`EX ATK boost = 1 + Usual EX ATK mod + Mysterious EX ATK mod × (1 + Ranko aura)`

Usual EX ATK modifiers encompass all the EX weapon skills that increase
ATK with no requirement on character HP level, excluding the iDOLM@STER
event weapon *Mysterious* EX skills.

The [Ranko Kanzaki](Ranko_Kanzaki_(Summon) "Ranko Kanzaki"){.wikilink}
aura affects the Mysterious EX ATK modifiers from iDOLM@STER event EX
weapons.

### Normal/Omega/EX Enmity and Stamina boosts {#normalomegaex_enmity_and_stamina_boosts}

`Normal Enmity boost = 1 + Norm Enmity mod × (1 + Optimus aura)`\
`Normal Stamina boost = 1 + Norm Stamina mod × (1 + Optimus aura)`\
`Omega Enmity boost = 1 + Omega Enmity mod × (1 + Omega aura)`\
`Omega Stamina boost = 1 + Omega Stamina mod × (1 + Omega aura)`\
`EX Enmity boost = 1 + EX Enmity mod`\
`EX Stamina boost = 1 + EX Stamina mod`

[Enmity](Weapon_Skills#Enmity "Enmity"){.wikilink} and
[Stamina](Weapon_Skills#Stamina "Stamina"){.wikilink} modifiers are the
ATK up weapon skill modifiers that depend on the HP level of the
character. They are present on Normal, Omega and EX weapons.

Normal and Omega Enmity/Stamina modifiers are affected by the
Optimus/Omega auras, but not the EX modifiers.

### Fixed ATK Modifiers {#fixed_atk_modifiers}

Absolute modifiers of the ATK computation, such as the 15% ATK cut from
[Qinglong Manewhip](Qinglong_Manewhip "Qinglong Manewhip"){.wikilink}.

### Char Enmity/Stamina boost {#char_enmitystamina_boost}

`Char Enmity boost = 1 + Jammed mod + Enmity EMP mod + Ring Enmity mod + AX Enmity mod`\
`Char Stamina boost = 1 + Strength mod + Stamina EMP mod + Ring Stamina mod + AX Stamina mod`

Jammed and Strength are character buffs originating from skills,
weapons, summons or charge attacks.

EMP modifiers and Ring modifiers respectively come from the EMP perks
and the [Coronation
Rings](Coronation_Ring "Coronation Ring"){.wikilink}, [Lineage
Rings](Lineage_Ring "Lineage Ring"){.wikilink}, and [Intricacy
Rings](Intricacy_Ring "Intricacy Ring"){.wikilink} associated to the
character.

AX modifiers come from AX skill in the grid that\'s currently being used
and is added to all characters.

### Perpetuity boost {#perpetuity_boost}

`Perpetuity boost = 1 + Perpetuity mod`

Perpetuity modifiers are ATK up effects originating from the [Perpetuity
Ring](Perpetuity_Ring "Perpetuity Ring"){.wikilink}, the [Shield of
Eternal
Splendor](Shield_of_Eternal_Splendor "Shield of Eternal Splendor"){.wikilink},
the [Divine Stamp
Book](Divine_Stamp_Book "Divine Stamp Book"){.wikilink}, and some buffs,
such as `{{status|Heavenly Howl}}`{=mediawiki}.

### Unique Stackable boost {#unique_stackable_boost}

`Unique Stackable boosts = 1 + Unique Stackable mod`

Unique Stackable modifiers are ATK up effects that come from
`{{status|ATK Up (Stackable)|m=us}}`{=mediawiki} and its variants.
Unique Stackable boosts that use the same frame will stack additively
and count toward the same cap. The cap used is dependent on highest
active effect. Unique Stackable boosts will only count to the cap if it
is applied while the current boost is below its individual cap (e.g. If
`{{Itm|Lunalu (SSR)|title=Lunalu}}`{=mediawiki} copies
`{{CharacterSkill|Fraux|3}}`{=mediawiki} 5 times then
`{{CharacterSkill|Lancelot|1}}`{=mediawiki} 1 time, she will have a 50%
boost. If the order of copied skills is switched, she will have a 60%
boost.) Unique Stackable boosts in separate frames count toward separate
caps (e.g. at max stacks, `{{CharacterSkill|Fraux|3}}`{=mediawiki} and
`{{Itm|Satyr (Summon)}}`{=mediawiki} will have 100% + 30% = 130%). These
are different from other stackable ATK boosts, like
`{{Itm|Assassin}}`{=mediawiki}\'s Motivating Draft, which are under the
[Normal ATK
modifier](#Normal_ATK_boost "Normal ATK modifier"){.wikilink}.

### Assassin boost {#assassin_boost}

:   *See also: [Assassin
    (Buff)](Assassin_(Buff) "Assassin (Buff)"){.wikilink}*

`Assassin boosts = 1 + Assassin mod`

Assassin modifiers are ATK up effects that come from buffs such
`{{status|Salted Wound}}`{=mediawiki},
`{{status|Defiance}}`{=mediawiki},
`{{status|Path of Destruction}}`{=mediawiki} and other variants. In
addition to the boost, all known assassin boosts also increase the
damage cap.

### Total Char Unique ATK boosts {#total_char_unique_atk_boosts}

Total Char Unique ATK boosts is the **product** of all the Unique ATK up
effects present on a character. Essentially, each Unique ATK up effect
behaves like its own boost category, applied multiplicatively in the
damage formula.

`Each Char Unique ATK boost = 1 + Unique ATK mod`

### Crew Ship boost / Crew Skills boost {#crew_ship_boost_crew_skills_boost}

`Crew Ship boost = 1 + Crew Ship mod`\
`Crew Skill boost = 1 + Crew Skill mod`

Crew Ship modifier is the *X% \[Element\] ATK up* effect present on the
active crew airship.

Crew Skill boost is the *X% \[Element\] ATK up* effect triggered by
certain crew skills.

### ATK down debuff effect {#atk_down_debuff_effect}

`ATK down debuff effect = 1 - ATK down mod`

ATK down modifier encompasses all non-elemental *X% ATK down* debuffs
present on the character.

## Final Damage {#final_damage}

### Supplemental Damage {#supplemental_damage}

[Supplemental
Damage](Supplemental_Damage "Supplemental Damage"){.wikilink} is an
effect present on certain skills, such as [Halluel and
Malluel](Halluel_and_Malluel "Halluel and Malluel"){.wikilink}\'s
`{{status|Everbane}}`{=mediawiki} debuff, [Pact
Weapons](:Category:Pact_Skill_Weapons "Pact Weapons"){.wikilink}\'
[Pact](Weapon_Skills#Pact "Pact"){.wikilink} skills, or the [Hollowsky
Weapons](Hollowsky_Weapons "Hollowsky Weapons"){.wikilink}\'s Covenant
skills and are directly added without taking into account Base Damage or
Defense.

Please refer to [Supplemental
Damage](Supplemental_Damage "Supplemental Damage"){.wikilink} for more
information.

### Seraphic boost {#seraphic_boost}

Seraphic boost is an effect present on some characters\' passive skills
([Eternals](Eternals "Eternals"){.wikilink}, for instance), and on the
[Seraphic Weapons](Seraphic_Weapons "Seraphic Weapons"){.wikilink}
skills.

It is applied after every other modifier has been applied, on every
damage instance, and also affects the character\'s damage cap. However,
[Supplemental
Damage](Supplemental_Damage "Supplemental Damage"){.wikilink} is only
boosted by Seraphic boosts for skill damage and C.A. Damage. Normal
Attacks will not get their [Supplemental
Damage](Supplemental_Damage "Supplemental Damage"){.wikilink} increased
by a Seraphic boost.

Therefore, in all the following subsections describing the different
instances of damage (excluding the exception described above), the final
damage will be computed as such if a Seraphic modifier is present:

`Final Damage = Instance Damage × (1 + Seraphic mod)`\
`Final Damage cap = Instance Damage cap × (1 + Seraphic mod)`

### Normal Damage {#normal_damage}

Normal damage is the damage of one hit of a [normal
attack](Normal_Attack "normal attack"){.wikilink}. For multiattacks,
each hit will be computed independently.

`Normal Damage = (Base Damage × Sleeping boost × Random Modifier / Enemy DEF)`

Random Modifier is a random number between 0.95 and 1.05 (step size
0.01); in other words, there is a 5% variance in the expected value for
each hit.

Every enemy has an innate defense stat, which is then modified by the
DEF up buffs and DEF down debuffs.

`Enemy DEF = Innate DEF × Total DEF mods`\
`Total DEF mods = 1 + DEF up mods - DEF down mods - Unique DEF down mods`

Innate DEF has a nominal value of 10, with *high defense* enemies using
higher values and *low defense* enemies using lower values.

DEF up mods are all the *DEF up* effects present on the enemy. [Damage
Cuts](Damage_Cut "Damage Cut"){.wikilink} and
[Repel](Repel "Repel"){.wikilink} effects are not taken into account.

DEF down mods encompass all the *DEF down* or *\[Element\] DEF down*
debuffs present on the enemy.

`Note that the total value of DEF up and DEF down mods is `**`hard capped at 50%`**`.`

Unique DEF down mods are *DEF down* effects that are not affected by the
hard DEF down cap. These include for instance
[Feower](Feower "Feower"){.wikilink}\'s `{{status|Forfeit}}`{=mediawiki}
and [Gabriel
(Summon)](Gabriel_(Summon) "Gabriel (Summon)"){.wikilink}\'s
`{{status|Pureflow}}`{=mediawiki} (10% each, but don\'t stack).

Sleeping boost is associated to the
`{{status|Stared Stiff}}`{=mediawiki}, `{{status|Sleep}}`{=mediawiki}
and `{{status|Comatose}}`{=mediawiki} status effects applied to the
enemy. The boost depends on the status:
`{{status|Stared Stiff}}`{=mediawiki} = 10%,
`{{status|Sleep}}`{=mediawiki} = 25%, `{{status|Comatose}}`{=mediawiki}
= 50%.

### Critical Damage {#critical_damage}

[Critical attacks](Critical_hit_rate "Critical attacks"){.wikilink} have
a chance to replace [Normal
attacks](Normal_Attack "Normal attacks"){.wikilink} when using an
element-superior team (or under certain field effects). They are
described by a chance and a multiplier, usually labeled *X% chance to
deal Y% supplemental damage*.

`Critical Damage = Normal Damage × (1 + Critical mods)`

Critical mods is the sum of every multiplier linked to the critical
skills *that have successfully triggered for this damage instance*
(since critical damage only has a fixed chance to happen for each
critical skill).

### Bonus Damage {#bonus_damage}

`Bonus Damage = Normal Damage without Supplemental × Bonus multiplier`

[Bonus Damage](Bonus_Damage "Bonus Damage"){.wikilink}, colloquially
referred to as \"echo\", originates from certain skills, charge attacks,
summons or weapons. It is another instance of damage present alongside
the normal attacks. Each echo is computed independently.

Bonus multiplier is the *X% Bonus Damage* description of the
echo-providing skills.

### Counterattack damage {#counterattack_damage}

`Counterattack Damage = Normal Damage × (1 + Counter multiplier)`

Counter multiplier is the percentage value present on the Counter skill
description.

### Charge Attack damage {#charge_attack_damage}

`Charge Attack damage = (`\
`  Normal Damage ×`\
`  CA multiplier ×`\
`  CA buff boost ×`\
`  CA weapon boost`\
`  ) + Fixed CA damage`

`CA buff boost =  1 + CA Damage Up mods`\
`CA weapon boost = 1 + CA weapon mods`

[Charge Attack](Charge_Attack "Charge Attack"){.wikilink} multiplier is
a percentage value associated to the \"strength\" of the Charge Attack
(*medium*, *big*, *massive*, *unworldly*) and can vary from 3× up to
12.5×[^1].

CA Damage Up mods are *boost to Charge Attack DMG* effects, that can
originate from EMP perks, active or passive skills or summon calls.

CA weapon mods are *boost to Charge Attack DMG* effects present on
certain weapon skills, in particular [*Sentence* or
*Mystery*](Weapon_Skills#C.A._DMG_Up "Sentence or Mystery"){.wikilink}.

Fixed CA damage is present in very small amounts (2000 for
[Shiva](Shiva "Shiva"){.wikilink}) on all Charge Attacks and in large
amounts on certain characters\' Charge Attacks, such as [Yodarha
(SSR)](Yodarha_(SSR) "Yodarha (SSR)"){.wikilink}.

### Chain Burst damage {#chain_burst_damage}

`Burst damage = Total party Charge Attack damage ×`\
`  Burst constant ×`\
`  Elem superiority ×`\
`  Burst boost`

Burst constant depends on the number of Charge Attacks involved in the
Chain Burst: 25% for 2 CA, 33.3% for 3 CA, 50% for 4 CA and more.

Element superiority is the same modifier as in [the Elemental
boost](#Elemental_boost "the Elemental boost"){.wikilink}: +50%, -25% or
0%.

Burst boost is the sum of all stacking *Boost to Chain burst DMG*
effects from skills, weapons or summons.

### Skill Damage {#skill_damage}

`Skill Damage = Normal Damage [or Critical Damage] × (Specific skill's damage modifier + Total boost to skill damage mod)`

`Skill Damage Cap Mod = 1 + General damage cap + Skill damage cap`

`Soft cap(Skill Damage) = `\
`    Skill Damage from 0 up to (Skill Damage limit 1 × SDCM) × 100 % `\
`  + Skill Damage from limit 1 up to (Skill Damage limit 2 × SDCM) × Skill Damage limit 1 deduction %`\
`  + Skill Damage from limit 2 up to (Skill Damage limit 3 × SDCM) × Skill Damage limit 2 deduction %`\
`  + Skill Damage from limit 3 up to (Skill Damage limit 4 × SDCM) × Skill Damage limit 3 deduction %`\
`  + Skill Damage from limit 4 to infinity × Skill Damage limit 4 deduction % `

The values for skill damage cap thresholds and skill damage cap
deduction percentages depend on the specific skill.[^2] The value
displayed on the wiki is *not* the Skill Damage limit 4 threshold, but
is the resulting value after which it can be deduced that damage is
being added at the final deduction %. Not all skill limits and deduction
rates are recorded.

#### Skill Damage examples[^3] {#skill_damage_examples}

`examples with confirmed numbers:`\
`              assumed Skill Damage = 1million, no skill cap buffs`\
`              Charlotte's Sword of Lumiel`\
`                                         =  from 0  up to 500k * 100%`\
`                                         += from 500k to 600k * 60%`\
`                                         += from 600k to 700k * 40%`\
`                                         += from 700k to 1mil * 5% `\
`                                         += from 1million onwards * 1%.`\
`                                         => 500k + 60k + 40k + 15k + 0 = 615k`\
`                                         (this is the value displayed on the wiki page next to the skill as damage cap)`\
`              assumed Skill Damage = 1million, no skill cap buffs`\
`              Vaseraga's Instinction`\
`                                         = from 0 up to 700k * 100%`\
`                                         += from 700k to 800k * 70%`\
`                                         += from 800k to 900k * 25%`\
`                                         += from 900k to 1million * 5%`\
`                                         += from 1million onwards * 1%`\
`                                         => 700k + 70k + 25k + 5k + 0 = 800k`\
`                                         (this is the value displayed on the wiki page next to the skill as damage cap)`\
\
`              Vaseraga's Instinction with Aubade Grynoth buff (all skill damage limits x2, Skill Damage 500% up meaning Instinctions' 800% mod becomes 1300%, or an increase of 62.5%. This means the same 1million skill dmg becomes 1.625million skill dmg)`\
`                                         = from 0 up to 1.4million * 100%`\
`                                         += from 1.4million to 1.6million * 70%`\
`                                         += from 1.6million to 1.8million * 25%`\
`                                         += from 1.8million to 2million * 5%`\
`                                         += from 2million onwards * 1%`\
`                                         => 1.4mil + 140k + 6250 + 0 + 0 = 1.546.250`

### DMG Taken Amplified, Seraphic Boost and their application[^4][^5] {#dmg_taken_amplified_seraphic_boost_and_their_application}

The way Seraphic boost and Supplemental Damage is applied differs
between Normal attacks and other damage types.

DMG taken amplified debuffs are a type of supplemental damage based on
damage done, unlike most supplemental damage which is based upon an
enemy\'s max health, or a flat amount.

This can make it seem like DMG Taken boosted debuffs work like another
type of \'Seraphic Boost\' that multiplies with Seraphic Boost, but
that\'s not strictly true.

The difference is visible here:

`Final Skill Damage = [Soft Cap(Skill Damage) +  (Soft Cap(Skill Damage) * Sum of stackable DMG Taken Amplified Mods) + Supplemental Damage ] × (1 + Seraphic Modifier) (up to the hard cap)`\
\
`Final Normal Attack Damage = Soft Cap(Normal/Critical Damage) × (1 + Seraphic Modifier)  (up to the hard cap) + [(Soft Cap(Normal/Critical Damage)  * (1 + Seraphic Modifier)) *  (sum of stackable DMG Taken Amplified Mods)] + Supplemental Damage`

DMG Taken Amplified does not amplify other supplemental damage at all,
unlike Seraphic Boost which does when it\'s Skill Damage. It is also is
able to break the hard cap in Normal Attacks, unlike Seraphic Boost.

Sources for \"DMG Taken Amplified\" which are not raid specific like
[Defied](Ennead_Raids "Defied"){.wikilink} and [Fated
Chain](Fated_Chain "Fated Chain"){.wikilink}[^6] can be found
[here](Supplemental_Damage "here"){.wikilink}

## Resources

Further reading:

- [Weapon / Summon Optimization and
  Progression](http://gbf-english.proboards.com/thread/595/) (ProBoards)
- [Damage Calculations
  Explained](https://web.archive.org/web/20230612105650/https://www.reddit.com/r/Granblue_en/comments/4r9i8r/damage_calculations_explained/)
  (reddit)
