import api from "@/services/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const AuthService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/Auth/login", payload);
    return response.data;
  },

  register: async (payload: { email: string; password: string }) => {
    const response = await api.post("/Auth/register-admin", payload);
    return response.data;
  },
};
