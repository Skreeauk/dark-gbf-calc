import { create } from "zustand"
import type { GridSlot, Weapon } from "../grid/types"

interface GridState {
  mainhand: GridSlot
  grid: GridSlot[]
  setMainhand: (weapon: Weapon) => void
  setGridSlot: (index: number, weapon: Weapon) => void
  clearMainhand: () => void
  clearSlot: (index: number) => void
  clearAll: () => void
  swapSlots: (sourceId: string, targetId: string) => void
}

const initialState = {
  mainhand: null,
  grid: Array(12).fill(null) as GridSlot[],
}

export const useGridStore = create<GridState>((set) => ({
  ...initialState,

  setMainhand: (weapon) => set({ mainhand: weapon }),

  setGridSlot: (index, weapon) =>
    set((state) => {
      const newGrid = [...state.grid]
      newGrid[index] = weapon
      return { grid: newGrid }
    }),

  clearMainhand: () => set({ mainhand: null }),

  clearSlot: (index) =>
    set((state) => {
      const newGrid = [...state.grid]
      newGrid[index] = null
      return { grid: newGrid }
    }),

  clearAll: () => set(initialState),

  swapSlots: (sourceId, targetId) =>
    set((state) => {
      if (sourceId === targetId) return state

      const parseId = (id: string) => {
        if (id === "mainhand") return { type: "mainhand" as const, index: -1 }
        const match = id.match(/^slot-(\d+)$/)
        if (match)
          return { type: "grid" as const, index: parseInt(match[1], 10) }
        return null
      }

      const source = parseId(sourceId)
      const target = parseId(targetId)

      if (!source || !target) return state

      const getSlot = (slot: { type: "mainhand" | "grid"; index: number }) => {
        if (slot.type === "mainhand") return state.mainhand
        return state.grid[slot.index]
      }

      const sourceWeapon = getSlot(source)
      const targetWeapon = getSlot(target)

      if (!sourceWeapon && !targetWeapon) return state

      let newMainhand = state.mainhand
      let newGrid = [...state.grid]

      if (source.type === "mainhand" && target.type === "mainhand") {
        return state
      }

      if (source.type === "mainhand" && target.type === "grid") {
        newMainhand = targetWeapon
        newGrid[target.index] = sourceWeapon
      } else if (source.type === "grid" && target.type === "mainhand") {
        newMainhand = sourceWeapon
        newGrid[source.index] = targetWeapon
      } else {
        newGrid = [...state.grid]
        newGrid[target.index] = sourceWeapon
        newGrid[source.index] = targetWeapon
      }

      return { mainhand: newMainhand, grid: newGrid }
    }),
}))
