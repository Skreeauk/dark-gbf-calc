"use client"

import * as React from "react"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { WEAPON_DATABASE } from "@/lib/grid/weapons"
import type { Weapon } from "@/lib/grid/types"
import { WeaponType, Element } from "@/lib/grid/types"

interface WeaponSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (weapon: Weapon) => void
  onClear: () => void
  slotType: "mainhand" | "grid"
}

export function WeaponSelectDialog({
  open,
  onOpenChange,
  onSelect,
  onClear,
  slotType,
}: WeaponSelectDialogProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [weaponTypeFilter, setWeaponTypeFilter] = React.useState<string>("all")
  const [elementFilter, setElementFilter] = React.useState<string>("all")

  React.useEffect(() => {
    if (open) {
      setSearchTerm("")
      setWeaponTypeFilter("all")
      setElementFilter("all")
    }
  }, [open])

  const filteredWeapons = React.useMemo(() => {
    return WEAPON_DATABASE.filter((weapon) => {
      const matchesSearch =
        searchTerm === "" ||
        weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType =
        weaponTypeFilter === "all" || weapon.weaponType === weaponTypeFilter
      const matchesElement =
        elementFilter === "all" || weapon.element === elementFilter
      return matchesSearch && matchesType && matchesElement
    })
  }, [searchTerm, weaponTypeFilter, elementFilter])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Select {slotType === "mainhand" ? "Mainhand" : "Grid"} Weapon
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search weapons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select
              value={weaponTypeFilter}
              onValueChange={setWeaponTypeFilter}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Weapon Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.values(WeaponType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={elementFilter} onValueChange={setElementFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Element" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Elements</SelectItem>
                {Object.values(Element).map((el) => (
                  <SelectItem key={el} value={el}>
                    {el}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {filteredWeapons.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No weapons match your search
              </div>
            ) : (
              <div className="space-y-2">
                {filteredWeapons.map((weapon) => (
                  <div
                    key={weapon.id}
                    onClick={() => {
                      onSelect(weapon)
                      onOpenChange(false)
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold">
                          {weapon.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {weapon.atk.toLocaleString()} ATK
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-muted px-2 py-0.5">
                          {weapon.weaponType}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            weapon.element === Element.Fire
                              ? "bg-red-500"
                              : weapon.element === Element.Water
                                ? "bg-blue-500"
                                : weapon.element === Element.Earth
                                  ? "bg-amber-600"
                                  : weapon.element === Element.Wind
                                    ? "bg-emerald-500"
                                    : weapon.element === Element.Light
                                      ? "bg-yellow-400 text-black"
                                      : "bg-purple-600"
                          }`}
                        >
                          {weapon.element}
                        </span>
                      </div>
                      {weapon.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {weapon.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {skill.name} ({skill.value}%)
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onClear()
              onOpenChange(false)
            }}
          >
            Clear Slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
