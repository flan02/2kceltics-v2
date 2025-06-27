// store/useStatsStore.ts
import { PlayerStatsType, StatsResponse } from '@/lib/types'
import { create } from 'zustand'


interface StatsState {
  data: StatsResponse | null
  isLoading: boolean
  error: unknown
  selectedKey?: Exclude<keyof PlayerStatsType, "id" | "season" | "gamespan" | "gp" | "gs" | "pos" | "name"> // "plusMinus"
  setData: (data: StatsResponse) => void
  setIsLoading: (state: boolean) => void
  setError: (err: unknown) => void
  setSelectedKey?: (key: Exclude<keyof PlayerStatsType, "id" | "season" | "gamespan" | "gp" | "gs" | "pos" | "name" | "plusMinus">) => void
  reset: () => void
}

interface MenuState {
  isOpen: boolean
  setIsOpen?: (state: boolean) => void
}

interface MultiplierState {
  multiplier: "per game" | "total"
  setMultiplier: (state: "per game" | "total") => void
}

// interface FilterState {
//   season: string
//   gamespan: number
//   setSeason: (state: string) => void
//   setGamespan: (state: number) => void
// }

interface FilterState {
  filters: {
    season: string
    gamespan: number
    // ? Add more filter fields as needed
  }
  setFilters: (updates: Partial<FilterState['filters']>) => void
}

export const useStatsStore = create<StatsState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  selectedKey: 'pts',
  setData: (data) => set({ data }),
  setIsLoading: (state) => set({ isLoading: state }),
  setError: (error) => set({ error }),
  setSelectedKey: (key) => set({ selectedKey: key }),
  reset: () => set({ data: null, isLoading: false, error: null }),
}))

export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export const useMultiplierStore = create<MultiplierState>((set) => ({
  multiplier: "per game",
  setMultiplier: (state) => set({ multiplier: state }),
}));

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    season: 'NBA2K25',
    gamespan: 10
  },
  setFilters: (updates) => set((state) => ({
    filters: {
      ...state.filters,
      ...updates
    }
  })),
  resetFilters: () => set({
    filters: {
      season: 'NBA2K25',
      gamespan: 10
    }
  })
}));