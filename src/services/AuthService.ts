import api from "@/services/api"

interface User {
  id: string
  email: string
  password?: string
}

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  role: string
}

export const AuthService = {
  registerSuperUser: async (payload: { email: string; password: string }) => {
    const response = await api.post("/Auth/register-SuperUser", payload)
    return response.data
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/Auth/login", payload)
    const token = response.data?.token
    if (token) {
      localStorage.setItem("token", token)
    }
    return response.data
  },

  createAccount: async (payload: { email: string; password: string }) => {
    const response = await api.post("/Auth/create-account", payload)
    return response.data
  },

  getAdmins: async (): Promise<User[]> => {
    const response = await api.get("/Auth/admins")
    return response.data
  },

  getMe: async (): Promise<User> => {
    const response = await api.get("/Auth/me")
    return response.data
  },

  deleteAdmin: async (id: number) => {
    const response = await api.delete(`/Auth/admins/${id}`)
    return response.data
  },

  logout: () => {
    localStorage.removeItem("token")
  },
}
