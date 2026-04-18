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
}))
