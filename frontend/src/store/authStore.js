import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store - Authentication state management
 * 
 * Issue #9 Subtask: Implement auth flow (signup/login)
 */

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setAuth: (user, accessToken) => 
        set({ 
          user, 
          accessToken, 
          isAuthenticated: true 
        }),

      clearAuth: () => 
        set({ 
          user: null, 
          accessToken: null, 
          isAuthenticated: false 
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'portcraft-auth-store',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
