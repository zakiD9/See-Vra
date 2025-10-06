import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../services/AuthService";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await AuthService.login({ email, password });
          set({ token: res.token, isAuthenticated: true, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Login failed",
            loading: false,
          });
        }
      },

      register: async (email, password) => {
        set({ loading: true, error: null });
        try {
          await AuthService.register({ email, password });
          set({ loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Register failed",
            loading: false,
          });
        }
      },

      logout: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
