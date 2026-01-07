import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileFields {
  jobTitle?: string;
  yearsOfExperience?: number;
  workingHours?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  profileFields: ProfileFields;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  updateProfileFields: (fields: ProfileFields) => void;
  logout: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      profileFields: {},
      isAuthenticated: false,
      setAuth: (token: string, user: User) => {
        set({ token, user, isAuthenticated: true });
      },
      updateProfileFields: (fields: ProfileFields) => {
        set((state) => ({
          profileFields: { ...state.profileFields, ...fields },
        }));
      },
      logout: () => {
        set({ token: null, user: null, profileFields: {}, isAuthenticated: false });
      },
      clearAuth: () => {
        set({ token: null, user: null, profileFields: {}, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        profileFields: state.profileFields,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!(state.token && state.user);
        }
      },
    }
  )
);
