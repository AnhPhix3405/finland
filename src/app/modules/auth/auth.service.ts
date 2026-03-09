/**
 * Auth Service for Frontend
 * Handles communication with Broker Auth APIs and updates Zustand stores
 */
import { useAuthStore } from "@/src/store/authStore";
import { useUserStore } from "@/src/store/userStore";

export const registerBroker = async (data: any) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        // If registration returns tokens (auto-login), update stores
        if (result.success && result.data?.access_token) {
            const { access_token, ...userData } = result.data;
            useAuthStore.getState().setAuth(access_token);
            useUserStore.getState().setUser(userData);
        }

        return result;
    } catch (error) {
        console.error('Frontend register error:', error);
        return { success: false, error: 'Không thể kết nối đến máy chủ' };
    }
};

export const loginBroker = async (phone: string, password: string) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password }),
        });
        const result = await response.json();

        if (result.success) {
            const { access_token, ...userData } = result.data;
            useAuthStore.getState().setAuth(access_token);
            useUserStore.getState().setUser(userData);
        }

        return result;
    } catch (error) {
        console.error('Frontend login error:', error);
        return { success: false, error: 'Không thể kết nối đến máy chủ' };
    }
};

export const refreshTokenBroker = async () => {
    try {
        const response = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        if (result.success && result.data?.access_token) {
            useAuthStore.getState().updateAccessToken(result.data.access_token);
        }

        return result;
    } catch (error) {
        console.error('Frontend refresh token error:', error);
        return { success: false, error: 'Không thể kết nối đến máy chủ' };
    }
};

export const logoutBroker = () => {
    useAuthStore.getState().clearAuth();
    useUserStore.getState().clearUser();
};
