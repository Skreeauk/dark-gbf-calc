"use client"

import * as React from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { useGridStore } from "@/lib/store/grid-store"
import { WeaponSlot } from "@/components/grid/weapon-slot"
import { WeaponSelectDialog } from "@/components/grid/weapon-select-dialog"
import type { Weapon } from "@/lib/grid/types"
import type { GridSlot } from "@/lib/grid/types"

export function GridLayout() {
  const {
    mainhand,
    grid,
    setMainhand,
    setGridSlot,
    clearMainhand,
    clearSlot,
    swapSlots,
  } = useGridStore()

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [activeSlot, setActiveSlot] = React.useState<"mainhand" | number>(
    "mainhand"
  )
  const [activeDragId, setActiveDragId] = React.useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const totalATK = React.useMemo(() => {
    let total = 0
    if (mainhand) {
      total += mainhand.atk
    }
    grid.forEach((slot) => {
      if (slot) {
        total += slot.atk
      }
    })
    return total
  }, [mainhand, grid])

  const handleSlotClick = (slot: "mainhand" | number) => {
    setActiveSlot(slot)
    setDialogOpen(true)
  }

  const handleSelectWeapon = (weapon: Weapon) => {
    if (activeSlot === "mainhand") {
      setMainhand(weapon)
    } else {
      setGridSlot(activeSlot, weapon)
    }
  }

  const handleClearSlot = () => {
    if (activeSlot === "mainhand") {
      clearMainhand()
    } else {
      clearSlot(activeSlot)
    }
  }

  const handleDragEnd = (event: {
    active: { id: string | number }
    over: { id: string | number } | null
  }) => {
    const { active, over } = event
    setActiveDragId(null)

    if (over && active.id !== over.id) {
      swapSlots(active.id.toString(), over.id.toString())
    }
  }

  const getSlotId = (variant: "mainhand" | "grid", index?: number): string => {
    return variant === "mainhand" ? "mainhand" : `slot-${index}`
  }

  const getSlotById = (id: string): GridSlot => {
    if (id === "mainhand") return mainhand
    const match = id.match(/^slot-(\d+)$/)
    if (match) return grid[parseInt(match[1], 10)]
    return null
  }

  return (
    <div className="space-y-6">
      <WeaponSelectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSelect={handleSelectWeapon}
        onClear={handleClearSlot}
        slotType={activeSlot === "mainhand" ? "mainhand" : "grid"}
      />

      <DndContext
        sensors={sensors}
        onDragStart={(event) => setActiveDragId(event.active.id.toString())}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <WeaponSlot
            weapon={mainhand}
            variant="mainhand"
            id={getSlotId("mainhand")}
            isDragging={activeDragId === getSlotId("mainhand")}
            onClick={() => handleSlotClick("mainhand")}
          />
          {grid.slice(0, 3).map((slot, index) => (
            <WeaponSlot
              key={index}
              weapon={slot}
              variant="grid"
              id={getSlotId("grid", index)}
              isDragging={activeDragId === getSlotId("grid", index)}
              onClick={() => handleSlotClick(index)}
            />
          ))}
          <div className="hidden sm:block" />
          {grid.slice(3, 6).map((slot, index) => (
            <WeaponSlot
              key={index + 3}
              weapon={slot}
              variant="grid"
              id={getSlotId("grid", index + 3)}
              isDragging={activeDragId === getSlotId("grid", index + 3)}
              onClick={() => handleSlotClick(index + 3)}
            />
          ))}
          <div className="hidden sm:block" />
          {grid.slice(6, 9).map((slot, index) => (
            <WeaponSlot
              key={index + 6}
              weapon={slot}
              variant="grid"
              id={getSlotId("grid", index + 6)}
              isDragging={activeDragId === getSlotId("grid", index + 6)}
              onClick={() => handleSlotClick(index + 6)}
            />
          ))}
          <div className="hidden sm:block" />
          {grid.slice(9, 12).map((slot, index) => (
            <WeaponSlot
              key={index + 9}
              weapon={slot}
              variant="grid"
              id={getSlotId("grid", index + 9)}
              isDragging={activeDragId === getSlotId("grid", index + 9)}
              onClick={() => handleSlotClick(index + 9)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDragId ? (
            <div className="w-64">
              <WeaponSlot
                weapon={getSlotById(activeDragId)}
                variant="mainhand"
                id={activeDragId}
                isDragging={true}
                onClick={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total Grid ATK</span>
          <span className="text-2xl font-bold">
            {totalATK.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
