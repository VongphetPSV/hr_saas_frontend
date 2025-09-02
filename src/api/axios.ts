import axios from 'axios';
import {
  ApiRequestConfig,
  ApiError,
  RefreshTokenResponse,
  TokenRefreshSubscriber,
  ApiInterceptorRequest,
  ApiInterceptorRequestError,
  ApiInterceptorResponse,
  ApiInterceptorResponseError,
} from './types';
import { getAccessToken, setAccessToken, clearAuthData, willTokenExpireSoon, isValidTokenFormat } from '@/lib/tokenUtils';
import { joinUrl, ensureNoDoubleSegments } from '@/lib/url';

// API configuration
const base = import.meta.env.VITE_API_BASE_URL || '/api';
const prefix = import.meta.env.VITE_API_PREFIX || '/v1';

// Compose baseURL safely
let composed = joinUrl(base, prefix);
composed = ensureNoDoubleSegments(composed);

// Create main API instance
const api = axios.create({
  baseURL: composed,
  withCredentials: true, // Important for HttpOnly cookies
});

// Create separate instance for refresh requests to avoid interceptor loops
const refreshApi = axios.create({
  baseURL: composed,
  withCredentials: true,
});

// Track refresh token state
let isRefreshing = false;
let refreshSubscribers: TokenRefreshSubscriber[] = [];

/**
 * Subscribe to token refresh
 */
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

/**
 * Process queued requests after token refresh
 */
function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/**
 * Clear queued requests on refresh failure
 */
function onRefreshError() {
  refreshSubscribers = [];
}

/**
 * Refresh access token
 */
async function refreshAccessToken(): Promise<string> {
  try {
    const { data } = await refreshApi.post<RefreshTokenResponse>('/auth/refresh');
    
    if (!data?.access_token || !isValidTokenFormat(data.access_token)) {
      throw new Error('Invalid refresh token response');
    }
    
    setAccessToken(data.access_token);
    return data.access_token;
  } catch (error) {
    clearAuthData();
    throw error;
  }
}

// Request interceptor
api.interceptors.request.use(
  async (config: ApiRequestConfig) => {
    const token = getAccessToken();
    const tenantId = localStorage.getItem('activeTenantId'); // Add this
    
    // Skip token check for refresh requests
    if (config.url?.includes('auth/refresh')) {
      return config;
    }
    
    try {
      // Token refresh logic (existing code)
      if (token && willTokenExpireSoon(token)) {
        try {
          const newToken = await refreshAccessToken();
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch {
          // Continue with original request
        }
      }
      
      // Add token if exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add tenant ID header if exists (ADD THIS)
      if (tenantId) {
        config.headers['X-Tenant-Id'] = tenantId;
      }
    } catch {
      // Continue without token
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: ApiError) => {
    const originalRequest = error.config;
    
    // Handle 401 responses
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue request
      if (isRefreshing) {
        try {
          const token = await new Promise<string>((resolve) => {
            subscribeTokenRefresh(resolve);
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch {
          return Promise.reject(error);
        }
      }
      
      // Start refresh process
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const token = await refreshAccessToken();
        onTokenRefreshed(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        onRefreshError();
        clearAuthData();
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;