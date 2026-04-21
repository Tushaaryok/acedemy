import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';
import { useUIStore } from '@/store/ui-store';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * High-fidelity API interceptor.
 * Orchestrates Bearer token injection and global error handling (401/403).
 */
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const errorCode = error.response?.data?.error?.code;

    // Handle Paywall trigger
    if (status === 403 && errorCode === 'UPGRADE_REQUIRED') {
      useUIStore.getState().openPaywall();
    }

    // Handle Token Expiry
    if (status === 401) {
      // Logic for refresh token call would go here
      // For now, logout if truly unauthorized 
      // useAuthStore.getState().logout();
    }
    
    return Promise.reject(error);
  }
);

export default api;
