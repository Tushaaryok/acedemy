import axios from 'axios';

import { useUIStore } from '@/store/ui-store';

const api = axios.create({
  baseURL: '/api/v1', // Updated to match Document #5 structure
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- CHANGED: Added Global Paywall Interceptor ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorCode = error.response?.data?.error?.code;

    if (status === 403 && errorCode === 'UPGRADE_REQUIRED') {
      useUIStore.getState().openPaywall();
    }

    if (status === 401) {
      // Redirect logic can be added here
    }
    
    return Promise.reject(error);
  }
);

export default api;
