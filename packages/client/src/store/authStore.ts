import { create } from 'zustand';
import { AuthStore } from '../types/IAuthStore';

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    toggleAuth: (isAuthenticated) => set({ isAuthenticated }),

    user: null,
    setUser: (user) => set({ user })
}));