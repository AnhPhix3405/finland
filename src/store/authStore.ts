import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (accessToken: string) => void;
    clearAuth: () => void;
    updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            isAuthenticated: false,
            setAuth: (accessToken) =>
                set({
                    accessToken,
                    isAuthenticated: true
                }),
            clearAuth: () =>
                set({
                    accessToken: null,
                    isAuthenticated: false
                }),
            updateAccessToken: (accessToken) =>
                set({
                    accessToken
                }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
