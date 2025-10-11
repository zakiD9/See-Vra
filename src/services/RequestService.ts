import api from "@/services/api"

export interface ContactRequest {
  id?: number
  company: string
  email: string
  phone: string
  service: string
  description: string
}

export const RequestService = {
  async addNewRequest(payload: ContactRequest) {
    const response = await api.post("/Request", payload)
    return response.data
  },

  async getAllRequests() {
    const response = await api.get("/Request")
    return response.data
  },

  async getRequestById(id: number) {
    const response = await api.get(`/Request/${id}`)
    return response.data
  },
}
