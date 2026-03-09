/**
 * Auth Service for Frontend
 * Handles communication with Broker Auth APIs
 */

export const registerBroker = async (data: any) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
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
        return await response.json();
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
        return await response.json();
    } catch (error) {
        console.error('Frontend refresh token error:', error);
        return { success: false, error: 'Không thể kết nối đến máy chủ' };
    }
};
