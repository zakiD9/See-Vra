import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AuthService } from "@/services/AuthService"

interface User {
  id: string
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
  admins: User[]
  isAuthenticated: boolean
  loading: boolean
  error: string | null

  login: (email: string, password: string) => Promise<void>
  registerAccount: (email: string, password: string) => Promise<void>
  registerSuperUser: (email: string, password: string) => Promise<void>
  deleteAdmin: (id:number) => Promise<void>
  fetchMe: () => Promise<void>
  fetchAdmins: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      admins: [],
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const res = await AuthService.login({ email, password })
          set({
            token: res.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Login failed",
            loading: false,
          })
        }
      },

      deleteAdmin: async (id:number) => {
        set({ loading: true, error: null })
        try {
          await AuthService.deleteAdmin(id)
          console.log("deleted successfuly")
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "deletion failed",
            loading: false,
          })
        }
      },
      registerAccount: async (email, password) => {
        set({ loading: true, error: null })
        try {
          await AuthService.createAccount({ email, password })
          set({ loading: false })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Registration failed",
            loading: false,
          })
        }
      },

      registerSuperUser: async (email, password) => {
        set({ loading: true, error: null })
        try {
          await AuthService.registerSuperUser({ email, password })
          set({ loading: false })
        } catch (err: any) {
          set({
            error:
              err.response?.data?.message ||
              "SuperUser registration failed",
            loading: false,
          })
        }
      },

      fetchMe: async () => {
        try {
          const token = get().token
          if (!token) return
          const me = await AuthService.getMe()
          set({ user: me, isAuthenticated: true })
        } catch (err) {
          console.error("Failed to fetch current user:", err)
          set({ user: null, isAuthenticated: false })
        }
      },

      fetchAdmins: async () => {
        set({ loading: true, error: null })
        try {
          const admins = await AuthService.getAdmins()
          set({ admins, loading: false })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Failed to fetch admins",
            loading: false,
          })
        }
      },

      logout: () => {
        AuthService.logout()
        set({ token: null, user: null, isAuthenticated: false, admins: [] })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
)
