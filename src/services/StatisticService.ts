import api from "@/services/api"

export const StatisticService = {
  getAllStatistics: async () => {
    const response = await api.get("/Statistic")
    return response.data
  },

  getStatisticById: async (id: number) => {
    const response = await api.get(`/Statistic/${id}`)
    return response.data
  },

  addNewStatistic: async (payload: any) => {
    const response = await api.post("/Statistic", payload)
    return response.data
  },

  updateStatistic: async (id: number, payload: any) => {
    const response = await api.patch(`/Statistic/${id}`, payload)
    return response.data
  },

  deleteStatistic: async (id: number) => {
    const response = await api.delete(`/Statistic/${id}`)
    return response.data
  },
}
