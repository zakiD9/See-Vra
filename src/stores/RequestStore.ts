import { create } from "zustand"
import { ContactRequest, RequestService } from "@/services/RequestService"



interface RequestState {
  requests: ContactRequest[]
  loading: boolean
  error: string | null

  fetchRequests: () => Promise<void>
  addRequest: (request: ContactRequest) => Promise<void>
  getRequestById: (id: number) => Promise<ContactRequest | null>
}

export const useRequestStore = create<RequestState>((set) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async () => {
    set({ loading: true, error: null })
    try {
      const response = await RequestService.getAllRequests()
      set({ requests: response, loading: false })
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch requests",
        loading: false,
      })
    }
  },

  addRequest: async (request) => {
    set({ loading: true, error: null })
    try {
      const newRequest = await RequestService.addNewRequest(request)
      set((state) => ({
        requests: [...state.requests, newRequest],
        loading: false,
      }))
    } catch (error: any) {
      set({
        error: error.message || "Failed to add request",
        loading: false,
      })
    }
  },

  getRequestById: async (id) => {
    set({ loading: true, error: null })
    try {
      const request = await RequestService.getRequestById(id)
      set({ loading: false })
      return request
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch request",
        loading: false,
      })
      return null
    }
  },
}))
