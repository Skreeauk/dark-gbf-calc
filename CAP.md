**Damage cap** is an upper limit on how much damage can be dealt under
various circumstances. Nearly all forms of damage cap in the game work
on a system of tiered reductions instead of fixed cut-offs. This results
in damage values fluctuating around the cap rather than hitting a
specific value ceiling. Normal attacks, charge attacks, and skills have
various individual caps based on the source, these are commonly referred
to as **soft damage caps**.

There are various ways to temporarily increase soft caps, such as with
the `{{status|DMG Cap Boosted}}`{=mediawiki} and similar buffs or with
weapon skills. [Damage
Amplified](Damage_Amplified "Damage Amplified"){.wikilink} effects also
increase soft caps and stack with all sources of normal DMG Cap Up.
`{{status|ATK Sharply Boosted|icon}}`{=mediawiki}[Assassin
buffs](Assassin_(Buff) "Assassin buffs"){.wikilink} are notable for
increasing ATK while also significantly increasing the soft cap for
normal attacks and charge attacks.

Besides individual soft damage caps there are also **hard damage caps**;
the two most common hard damage caps in the game are 13.1 million or 6.6
million depending on the battle. Unlike soft caps, hard caps cannot be
increased or surpassed by a significant amount under normal
circumstances.

## How Damage Caps Works

Damage Cap works by lowering your initial \"raw\" damage input through
multiple tiers of reduction modifiers. Every damage source has its own
corresponding damage cap table of thresholds and reduction modifiers,
which is where the corresponding soft damage cap comes from.

For example, normal attacks use the following damage cap table:

:   {\| class=\"wikitable\"

\|- !Damage Thresholds!!Reduction \|- !0 - 300,000 \|0% \|- !300,000 -
400,000 \|20% \|- !400,000 - 500,000 \|40% \|- !500,000 - 600,000 \|95%
\|- !600k - \|99% \|}

- This table shows that normal attacks will keep 300,000 of your raw
  damage before any reduction occurs, and any raw damage beyond 600,000
  is reduced by 99%
  - Character skill data accessed via the browser developer console will
    list the complementary percentage of the reduction modifiers- the %
    of damage that \"makes it through\" the tier and assumes the first
    tier of 0% reduction
- Damage per tier can be calculated by multiplying the difference of the
  tier\'s thresholds with the complementary percentage of the reduction
  multiplier
  - e.g. the second tier of normal attacks, 300,000 - 400,000 with a 20%
    reduction:

`400,000 - 300,000 = 100,000`\
`          1 - 20% =     80%`\
`          `\
`    100,000 * 80% =  80,000`

- The soft cap can thus be calculated by totaling the damage that makes
  it through each of the first 4 threshold ranges:

`300,000 * 100% = 300,000`\
`100,000 *  80% =  80,000`\
`100,000 *  60% =  60,000`\
`100,000 *   5% =   5,000`\
`          ----------`\
`                 445,000`

- Normal attacks have a soft cap of 445,000 achieved at 600,000 raw
  damage, any raw beyond that has greatly diminishing returns
  - 1,000,000 raw damage will result in \~449,000 normal attacks
  - 2,000,000 raw damage will result in \~459,000 normal attacks

An updated table to reflect this would look like this:

:   {\| class=\"wikitable\"

\|- !Damage Thresholds!!Reduction!!Damage From Tier!!Cumulative Damage
\|- !0 - 300,000 \|0%\|\|300,000\|\|300,000 \|- !300,000 - 400,000
\|20%\|\|80,000\|\|380,000 \|- !400,000 - 500,000
\|40%\|\|60,000\|\|440,000 \|- !500,000 - 600,000
\|95%\|\|5,000\|\|445,000 \|- !600k - \|99% \| colspan=\"2\"
style=\"text-align:center;\" \|N/A \|- ! colspan=\"4\" \|Soft Cap:
445,000 \|} The massive reduction in damage after the final threshold
can be overcome by excessive amounts of raw damage, however the easier
and more reliable method to increase damage output is to increase the
soft cap of the damage source with Damage Cap Up effects.

### Damage Cap Up {#damage_cap_up}

Most sources of damage cap up will stack additively with each other if
they are from different types of sources (e.g. weapon skills, character
passives, and buffs will stack but some character passives are mutually
exclusive and only the higher value will take effect). Damage Amplify
effects also act as a damage cap up effect and will stack additively.
The sum of all damage cap up and damage amplify effects is then
multiplied with the damage cap thresholds for a given damage source to
produce an adjusted damage cap table.

Alongside generic damage cap up, each damage type has its own sources of
damage type specific damage cap up effects which stack additively with
generic cap up. See [N.A. DMG Cap
Up](N.A._DMG_Cap_Up "N.A. DMG Cap Up"){.wikilink}, [Skill DMG Cap
Up](Skill_DMG_Cap_Up "Skill DMG Cap Up"){.wikilink}, [C.A. DMG Cap
Up](C.A._DMG_Cap_Up "C.A. DMG Cap Up"){.wikilink}, and [C.B. DMG Cap
Up](C.B._DMG_Cap_Up "C.B. DMG Cap Up"){.wikilink} for more information.

For example, with 20% damage cap up, damage thresholds for normal
attacks would be each by multiplied by 1.2 (1 + 20%)

`300,000 * 1.2 = 360,000`\
`400,000 * 1.2 = 480,000`\
`500,000 * 1.2 = 600,000`\
`600,000 * 1.2 = 720,000`

Which produces the new damage cap table for normal attacks:

+----------------------------------------------------------------------+
| 0% Damage Cap Up                                                     |
+===================+===========+==================+===================+
| Damage Thresholds | Reduction | Damage From Tier | Cumulative Damage |
+-------------------+-----------+------------------+-------------------+
| 0 - 300,000       | 0%        | 300,000          | 300,000           |
+-------------------+-----------+------------------+-------------------+
| 300,000 - 400,000 | 20%       | 80,000           | 380,000           |
+-------------------+-----------+------------------+-------------------+
| 400,000 - 500,000 | 40%       | 60,000           | 440,000           |
+-------------------+-----------+------------------+-------------------+
| 500,000 - 600,000 | 95%       | 5,000            | 445,000           |
+-------------------+-----------+------------------+-------------------+
| 600k -            | 99%       | N/A                                  |
+-------------------+-----------+--------------------------------------+
| Soft Cap: 445,000                                                    |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
| 20% Damage Cap Up                                                    |
+===================+===========+==================+===================+
| Damage Thresholds | Reduction | Damage From Tier | Cumulative Damage |
+-------------------+-----------+------------------+-------------------+
| 0 - 360,000       | 0%        | 360,000          | 360,000           |
+-------------------+-----------+------------------+-------------------+
| 360,000 - 480,000 | 20%       | 96,000           | 456,000           |
+-------------------+-----------+------------------+-------------------+
| 480,000 - 600,000 | 40%       | 72,000           | 528,000           |
+-------------------+-----------+------------------+-------------------+
| 600,000 - 720,000 | 95%       | 6,000            | 534,000           |
+-------------------+-----------+------------------+-------------------+
| 720,000 -         | 99%       | N/A                                  |
+-------------------+-----------+--------------------------------------+
| Soft Cap: 534,000                                                    |
+----------------------------------------------------------------------+

- The new *boosted* soft damage cap of normal attacks is 534,000
  - 1,000,000 raw damage now results in \~536,800 normal attacks
  - 2,000,000 raw damage now results in \~546,800 normal attacks

Boosted soft cap can also be calculated by multiplying the original soft
cap by the damage cap up modifier:

`445,000 * 1.2 = 534,000`

However this method of determining the new soft damage cap will not work
if there is damage cap penetration from the grid.

### Damage Cap Penetration

Damage Cap Penetration is an
[overskill] gained
when Damage Cap or Damage Cap (Special) in the grid reach values above
20%. Unlike damage cap up, which increases the damage thresholds of the
damage cap table, damage cap penetration increases the damage from each
tier by lower the Reduction modifier.

For example, 5% (1.05) damage cap penetration would lower the Reduction
modifiers of normal attacks as follows:

`1 - ((1 - 20%) * 1.05) = 16%`\
`1 - ((1 - 40%) * 1.05) = 37%`\
`1 - ((1 - 95%) * 1.05) = 94.75%`\
`1 - ((1 - 99%) * 1.05) = 98.95%`

- Note that damage cap penetration cannot decrease the Reduction
  modifier below 0%, thus it will never affect the amount of damage
  before damage cap\'s reduction begins

Which would produce the new damage cap table for normal attacks:

+----------------------------------------------------------------------+
| 20% Damage Cap Up                                                    |
+===================+===========+==================+===================+
| Damage Thresholds | Reduction | Damage From Tier | Cumulative Damage |
+-------------------+-----------+------------------+-------------------+
| 0 - 360,000       | 0%        | 360,000          | 360,000           |
+-------------------+-----------+------------------+-------------------+
| 360,000 - 480,000 | 20%       | 96,000           | 456,000           |
+-------------------+-----------+------------------+-------------------+
| 480,000 - 600,000 | 40%       | 72,000           | 528,000           |
+-------------------+-----------+------------------+-------------------+
| 600,000 - 720,000 | 95%       | 6,000            | 534,000           |
+-------------------+-----------+------------------+-------------------+
| 720,000 -         | 99%       | N/A                                  |
+-------------------+-----------+--------------------------------------+
| Soft Cap: 534,000                                                    |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
| 20% Damage Cap Up +\                                                 |
| 5% Damage Cap Penetration                                            |
+===================+===========+==================+===================+
| Damage Thresholds | Reduction | Damage From Tier | Cumulative Damage |
+-------------------+-----------+------------------+-------------------+
| 0 - 360,000       | 0%        | 360,000          | 360,000           |
+-------------------+-----------+------------------+-------------------+
| 360,000 - 480,000 | 16%       | 100,800          | 460,800           |
+-------------------+-----------+------------------+-------------------+
| 480,000 - 600,000 | 37%       | 75,600           | 536,400           |
+-------------------+-----------+------------------+-------------------+
| 600,000 - 720,000 | 94.75%    | 6,300            | 542,700           |
+-------------------+-----------+------------------+-------------------+
| 720,000 -         | 98.95%    | N/A                                  |
+-------------------+-----------+--------------------------------------+
| Soft Cap: 542,700                                                    |
+----------------------------------------------------------------------+


- The new soft damage cap of normal attacks is 542,700
  - 1,000,000 raw damage now results in \~545,640 normal attacks
  - 2,000,000 raw damage now results in \~556,140 normal attacks

## Hard Damage Caps

Hard damage caps function the same way as soft caps- reducing damage
gradually through multiple reduction steps- but are applied to the
damage values after soft cap, and have much more aggressive reduction
modifiers. This results in damage caps that become incredibly difficult
to surpass significantly through normal means. ![Beelzebub summon call
dealing more than 13.1m damage by an insignificant
amount.](help_damage_cap_surpassing_hard_cap.png "Beelzebub summon call dealing more than 13.1m damage by an insignificant amount."){width="300"}

Unlike soft caps, hard caps are not affect by damage cap up and damage
cap penetration modifiers, the only way to modify them is through
`{{status|Special C.A. DMG Cap Up}}`{=mediawiki} effects which only
affect charge attack damage.

The hard cap is applied at different points in the damage formula
depending on the damage type. For skills and charge attacks, the hard
cap is applied as the last step in the formula. For normal attacks it is
applied *before* supplemental damage and
`{{status|DMG Taken Amplified}}`{=mediawiki} are accounted for, allowing
normal attacks to theoretically surpass the hard cap by a
non-insignificant amount.

### 6.6 Hard Cap {#hard_cap}

+-------------------+-----------+------------------+-------------------+
| Damage Thresholds | Reduction | Damage From Tier | Cumulative Damage |
+===================+===========+==================+===================+
| 6,000,000 -       | 50%       | 500,000          | 6,500,000         |
| 7,000,000         |           |                  |                   |
+-------------------+-----------+------------------+-------------------+
| 7,000,000 -       | 90%       | 100,000          | 6,600,000         |
| 8,000,000         |           |                  |                   |
+-------------------+-----------+------------------+-------------------+
| 8,000,000 -       | 99.9%     | N/A                                  |
+-------------------+-----------+--------------------------------------+
| Hard Cap: 6,600,000                                                  |
+----------------------------------------------------------------------+

### 13.1 Hard Cap {#hard_cap_1}

+-------------------+-----------+------------------+-------------------+
| Damage Thresholds | Reduction | Damage From Tier | Cumulative Damage |
+===================+===========+==================+===================+
| 12,000,000 -      | 50%       | 1,000,000        | 13,000,000        |
| 14,000,000        |           |                  |                   |
+-------------------+-----------+------------------+-------------------+
| 14,000,000 -      | 90%       | 100,000          | 13,100,000        |
| 15,000,000        |           |                  |                   |
+-------------------+-----------+------------------+-------------------+
| 15,000,000 -      | 99.9%     | N/A                                  |
+-------------------+-----------+--------------------------------------+
| Hard Cap: 13,100,000                                                 |
+----------------------------------------------------------------------+

## Fixed Damage Cap {#fixed_damage_cap}

Fixed damage cap is an uncommon mechanic that unlike soft and harp caps,
does not use tiered reductions; instead all damage beyond the set cap is
ignored. This effect is mostly commonly see in [Unite and
Fight](Unite_and_Fight "Unite and Fight"){.wikilink} raids through
`{{status|DMG Fixed}}`{=mediawiki} buffs,
`{{raidicon|faahl}}`{=mediawiki} [Dark Rapture
(Hard)](Dark_Rapture_(Hard) "Dark Rapture (Hard)"){.wikilink}\'s
`{{status|Wings of the Word}}`{=mediawiki}, and
`{{raidicon|sieg}}`{=mediawiki} [Siegfried
(Raid)](Siegfried_(Raid) "Siegfried (Raid)"){.wikilink}\'s
`{{status|Black Dragon Scale}}`{=mediawiki}. Some characters and classes
have access to fixed damage cap such as the
`{{tt|ward buffs|{{status|Ignis Ward}}<br>{{status|Glacies Ward}}<br>{{status|Terra Ward}}<br>{{status|Tempestas Iudicium}}}}`{=mediawiki}
provided by the
`{{tt|tetra element primarchs|{{itm|Michael}}<br>{{itm|Gabriel}}<br>{{itm|Uriel}}<br>{{itm|Raphael}}}}`{=mediawiki}
or `{{itm|Paladin}}`{=mediawiki}\'s passive
`{{ClassSupportSkill|Paladin|1}}`{=mediawiki}.

Fixed Damage Cap is not affected by any effects that increase soft caps
or the hard cap.

## Normal Attack Damage Cap {#normal_attack_damage_cap}

### Standard

:   {\| class=\"wikitable\"

\|- !Damage Thresholds!!Reduction!!Damage From Tier!!Cumulative Damage
\|- !0 - 300,000 \|0%\|\|300,000\|\|300,000 \|- !300,000 - 400,000
\|20%\|\|80,000\|\|380,000 \|- !400,000 - 500,000
\|40%\|\|60,000\|\|440,000 \|- !500,000 - 600,000
\|95%\|\|5,000\|\|445,000 \|- !600k - \|99% \| colspan=\"2\"
style=\"text-align:center;\" \|N/A \|- ! colspan=\"4\" \|Soft Cap:
445,000 \|}

### Assassin

While under the effects of
`{{status|ATK Sharply Boosted|icon}}`{=mediawiki}[Assassin
buffs](Assassin_(Buff) "Assassin buffs"){.wikilink}, normal attack soft
cap is drastically boosted.

:   {\| class=\"wikitable\"

\|- !Damage Thresholds!!Reduction!!Damage From Tier!!Cumulative Damage
\|- !0 - 1,000,000 \|0%\|\|1,000,000\|\|1,000,000 \|- !1,000,000 -
1,200,000 \|40%\|\|120,000\|\|1,120,000 \|- !1,200,000 - 1,300,000
\|70%\|\|30,000\|\|1,150,000 \|- !1,300,000 - 1,500,000
\|95%\|\|10,000\|\|1,160,000 \|- !1,500,000 - \|99% \| colspan=\"2\"
style=\"text-align:center;\" \|N/A \|- ! colspan=\"4\" \|Soft Cap:
1,160,000 \|}

### Normal Attack Damage Cap Up {#normal_attack_damage_cap_up}

- N.A. Damage Cap weapon skills stack additively with each other up to a
  maximum of 20%. Detailed information about which weapons and weapon
  skills contribute to the shared cap be read about on the [Weapon
  Skills](Weapon_Skills#Weapon_Skills_by_Boost-0 "Weapon Skills"){.wikilink}
  page.
  - However `{{itm|Gauph Key α}}`{=mediawiki},
    `{{itm| α Pendulum}}`{=mediawiki},
    `{{itm|Anklet of Oblivion}}`{=mediawiki}, and
    `{{ItmGSI|title=Astral Weapons|Fateless|Innocent Love|Claws of Terror}}`{=mediawiki}
    do not stack with each other.

## C.A. Damage Cap {#c.a._damage_cap}

### Standard {#standard_1}

:   {\| class=\"wikitable\"

\|- !Damage Thresholds!!Reduction!!Damage From Tier!!Cumulative Damage
\|- !0 - 1,500,000 \|0%\|\|1,500,000\|\|1,500,000 \|- !1,500,000 -
1,700,000 \|40%\|\|120,000\|\|1,620,000 \|- !1,700,000 - 1,800,000
\|70%\|\|30,000\|\|1,650,000 \|- !1,800,000 - 2,500,000
\|95%\|\|35,000\|\|1,685,000 \|- !2,500,000 - \|99% \| colspan=\"2\"
style=\"text-align:center;\" \|N/A \|- ! colspan=\"4\" \|Soft Cap:
1,685,000 \|}

- Includes Main Character
- Unaffected by character or mainhand rarity
  - Characters and weapons with Unwordly charge attack damage modifiers
    use a variety of different damage cap tables
- Unlike normal attacks,
  `{{status|ATK Sharply Boosted|icon}}`{=mediawiki}[assassin
  buffs](Assassin_(Buff) "assassin buffs"){.wikilink} do not cause
  charge attacks to use a separate damage cap table; instead they
  provide a static 30% boost to damage cap.

### 5★ [Eternals](Eternals "Eternals"){.wikilink} Characters {#eternals_characters}

:   {\| class=\"wikitable\"

\|- !Damage Thresholds!!Reduction!!Damage From Tier!!Cumulative Damage
\|- !0 - 1,800,000 \|0%\|\|1,800,000\|\|1,800,000 \|- !1,800,000 -
2,000,000 \|40%\|\|120,000\|\|1,920,000 \|- !2,000,000 - 2,200,000
\|70%\|\|60,000\|\|1,980,000 \|- !2,200,000 - 3,000,000
\|95%\|\|40,000\|\|2,020,000 \|- !3,000,000 - \|99% \| colspan=\"2\"
style=\"text-align:center;\" \|N/A \|- ! colspan=\"4\" \|Soft Cap:
2,020,000 \|}

### 6★ 110 [Eternals](Eternals "Eternals"){.wikilink} Characters {#eternals_characters_1}

- Upon acquiring first stage of
  [Transcendence](Eternals_Transcendence "Transcendence"){.wikilink},
  the Eternal\'s charge attack cap is raised to \~2,300,000.

### 6★ 150 [Eternals](Eternals "Eternals"){.wikilink} Characters {#eternals_characters_2}

- Upon reaching level 150, the Eternal\'s charge attack damage is
  increased to an Unwordly modifier and the charge attack damage cap is
  increased to \~3,400,000.

### C.A. Damage Cap Up {#c.a._damage_cap_up}

- C.A. Damage Cap weapons skills stack additively with each other up to
  a maximum of 100%. Detailed information about which weapons and weapon
  skills contribute to the shared cap be read about on the [Weapon
  Skills](Weapon_Skills#Weapon_Skills_by_Boost-0 "Weapon Skills"){.wikilink}
  page.
  - However, `{{itm|Gauph Key {{gamma}}}}`{=mediawiki},
    `{{itm|{{gamma}} Pendulum}}`{=mediawiki}, and
    `{{itm|Anklet of Maximality}}`{=mediawiki} do not stack with each
    other.

\*[Special C.A. Damage
Cap](Special_C.A._DMG_Cap_Up "Special C.A. Damage Cap"){.wikilink}
weapon skills and buffs do not affect the soft cap of charge attacks,
instead they affect the hard cap. This allows charge attacks to deal
significant amounts of damage beyond the regular hard cap.