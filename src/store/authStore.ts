import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    user: any | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (user: any, accessToken: string) => void;
    clearAuth: () => void;
    updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
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
