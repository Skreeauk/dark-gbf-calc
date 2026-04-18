"use client"

import {
  Plus,
  Swords,
  Arrow,
  Axe,
  Wand,
  Zap,
  Fist,
  Target,
  Music,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { GridSlot } from "@/lib/grid/types"
import { Element, WeaponType } from "@/lib/grid/types"

interface WeaponSlotProps {
  weapon: GridSlot
  variant: "mainhand" | "grid"
  onClick: () => void
}

const elementColors = {
  [Element.Fire]: "bg-red-500",
  [Element.Water]: "bg-blue-500",
  [Element.Earth]: "bg-amber-600",
  [Element.Wind]: "bg-emerald-500",
  [Element.Light]: "bg-yellow-400 text-black",
  [Element.Dark]: "bg-purple-600",
}

const weaponIcons = {
  [WeaponType.Sword]: Swords,
  [WeaponType.Dagger]: Swords,
  [WeaponType.Spear]: Arrow,
  [WeaponType.Axe]: Axe,
  [WeaponType.Wand]: Wand,
  [WeaponType.Gun]: Zap,
  [WeaponType.Fist]: Fist,
  [WeaponType.Bow]: Target,
  [WeaponType.Harp]: Music,
  [WeaponType.Katana]: Swords,
}

export function WeaponSlot({ weapon, variant, onClick }: WeaponSlotProps) {
  const isMainhand = variant === "mainhand"
  const isEmpty = weapon === null

  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${isEmpty ? "border-dashed" : ""} ${isMainhand ? "h-48 border-2 border-primary bg-accent/50" : "h-32"} `}
      onClick={onClick}
    >
      <CardContent className="flex h-full flex-col p-3">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <Plus className="mb-2 h-8 w-8" />
            <span className="text-sm">Empty</span>
          </div>
        ) : (
          <div className="flex h-full flex-col gap-2">
            {isMainhand && (
              <div className="text-xs font-semibold text-primary">Mainhand</div>
            )}
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="truncate font-semibold">{weapon.name}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span>{weapon.atk.toLocaleString()} ATK</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${elementColors[weapon.element]}`}
                  >
                    {weapon.element}
                  </span>
                </div>
              </div>
              {weaponIcons[weapon.weaponType] && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                  {(() => {
                    const Icon = weaponIcons[weapon.weaponType]
                    return <Icon className="h-5 w-5" />
                  })()}
                </div>
              )}
            </div>
            {weapon.skills.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1">
                {weapon.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {skill.name} ({skill.value}%)
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
