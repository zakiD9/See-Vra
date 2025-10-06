import { create } from "zustand"
import { StatisticService } from "@/services/StatisticService"

export interface Statistic {
  id: number
  name: string
  value: number
}

interface StatisticState {
  statistics: Statistic[]
  loading: boolean
  error: string | null

  fetchStatistics: () => Promise<void>
  addStatistic: (statistic: Omit<Statistic, "id">) => Promise<void>
  getStatisticById: (id: number) => Promise<Statistic | null>
  updateStatistic: (id: number, statistic: Partial<Statistic>) => Promise<void>
  deleteStatistic: (id: number) => Promise<void>
}

export const useStatisticStore = create<StatisticState>((set) => ({
  statistics: [],
  loading: false,
  error: null,

  fetchStatistics: async () => {
    set({ loading: true, error: null })
    try {
      const response = await StatisticService.getAllStatistics()
      set({ statistics: response, loading: false })
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch statistics",
        loading: false,
      })
    }
  },

  addStatistic: async (statistic) => {
    set({ loading: true, error: null })
    try {
      const newStatistic = await StatisticService.addNewStatistic(statistic)
      set((state) => ({
        statistics: [...state.statistics, newStatistic],
        loading: false,
      }))
    } catch (error: any) {
      set({
        error: error.message || "Failed to add statistic",
        loading: false,
      })
    }
  },

  getStatisticById: async (id) => {
    set({ loading: true, error: null })
    try {
      const statistic = await StatisticService.getStatisticById(id)
      set({ loading: false })
      return statistic
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch statistic",
        loading: false,
      })
      return null
    }
  },

  updateStatistic: async (id, statistic) => {
    set({ loading: true, error: null })
    try {
      const updatedStatistic = await StatisticService.updateStatistic(id, statistic)
      set((state) => ({
        statistics: state.statistics.map((s) =>
          s.id === id ? updatedStatistic : s
        ),
        loading: false,
      }))
    } catch (error: any) {
      set({
        error: error.message || "Failed to update statistic",
        loading: false,
      })
    }
  },

  deleteStatistic: async (id) => {
    set({ loading: true, error: null })
    try {
      await StatisticService.deleteStatistic(id)
      set((state) => ({
        statistics: state.statistics.filter((s) => s.id !== id),
        loading: false,
      }))
    } catch (error: any) {
      set({
        error: error.message || "Failed to delete statistic",
        loading: false,
      })
    }
  },
}))
