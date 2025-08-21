import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import api from '@/api/axios';
import { getAccessToken, setAccessToken, isTokenExpired, willTokenExpireSoon } from '@/lib/tokenUtils';

// Constants
const AUTH_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const USER_QUERY_KEY = ['currentUser'] as const;

export type PlatformRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface CurrentUser {
  id: string;
  phone_number: string;
  full_name: string;
  email: string;
  platform_role: PlatformRole;
}

export interface AuthError extends Error {
  code?: string;
  httpStatus?: number;
  detail?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface LoginCredentials {
  phone_number: string;
  password: string;
}

// Cache utilities
function getCachedUser(): CurrentUser | null {
  try {
    const cached = localStorage.getItem('current_user');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

function cacheUser(user: CurrentUser | null): void {
  try {
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  } catch {
    // Handle localStorage errors
  }
}

/**
 * Validates current token and attempts refresh if needed
 * @returns Promise<boolean> - true if token is valid or was refreshed successfully
 */
export async function validateAndRefreshToken(): Promise<boolean> {
  const token = getAccessToken();
  if (!token) return false;
  
  try {
    // First check if token is expired or will expire soon
    if (isTokenExpired(token) || willTokenExpireSoon(token)) {
      // Token needs refresh, try refreshing
      const refreshed = await refreshToken();
      return !!refreshed;
    }

    // Token looks good, verify with a test request
    await api.get('/auth/me');
    return true;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // Token invalid, try refresh
      try {
        const refreshed = await refreshToken();
        return !!refreshed;
      } catch (refreshError) {
        // Refresh failed, clear auth state
        clearAuthState();
        return false;
      }
    }
    return false;
  }
}

/**
 * Clears all auth-related state
 */
function clearAuthState(): void {
  setAccessToken(null);
  cacheUser(null);
  localStorage.removeItem('activeTenantId');
}

// Auth utilities
export async function fetchCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get<CurrentUser>('auth/me');
  if (!data?.id) throw new Error('Invalid /auth/me response');
  cacheUser(data);
  return data;
}

async function refreshToken(): Promise<string | null> {
  try {
    const { data } = await api.post<LoginResponse>('auth/refresh');
    if (!data?.access_token) throw new Error('Invalid refresh response');
    setAccessToken(data.access_token);
    return data.access_token;
  } catch (error: any) {
    const authError = new AuthError('Failed to refresh token');
    authError.code = error?.response?.data?.code;
    authError.httpStatus = error?.response?.status;
    authError.detail = error?.response?.data?.detail;
    throw authError;
  }
}

export async function login(credentials: LoginCredentials): Promise<CurrentUser> {
  try {
    const { data } = await api.post<LoginResponse>(
      'auth/login',
      credentials,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    if (!data?.access_token) throw new Error('Invalid login response');
    setAccessToken(data.access_token);
    
    const user = await fetchCurrentUser();
    cacheUser(user);
    return user;
  } catch (error: any) {
    const authError = new AuthError(
      error.response?.data?.message || 
      error.response?.data?.detail || 
      'Login failed'
    );
    authError.code = error.response?.data?.code;
    authError.httpStatus = error.response?.status;
    authError.detail = error.response?.data?.detail;
    throw authError;
  }
}

export function useCurrentUser(): UseQueryResult<CurrentUser, AuthError> {
  const token = getAccessToken();
  const queryClient = useQueryClient();
  const cachedUser = getCachedUser();

  // Token refresh logic
  const handleTokenRefresh = useCallback(async () => {
    return validateAndRefreshToken();
  }, []);

  // Check token on mount and setup refresh interval
  useEffect(() => {
    handleTokenRefresh();

    // Setup periodic token check
    const interval = setInterval(handleTokenRefresh, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [handleTokenRefresh]);

  return useQuery<CurrentUser, AuthError>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchCurrentUser,
    enabled: !!token,
    staleTime: AUTH_STALE_TIME,
    initialData: cachedUser,
    retry: (failureCount, error) => {
      // Don't retry auth errors
      if (error.httpStatus === 401 || error.httpStatus === 403) {
        return false;
      }
      // Exponential backoff for other errors
      return failureCount < 3;
    },
    onError: async (error) => {
      if (error.httpStatus === 401) {
        try {
          // Try one last token refresh
          const refreshed = await handleTokenRefresh();
          if (!refreshed) {
            clearAuthState();
            queryClient.setQueryData(USER_QUERY_KEY, null);
          }
        } catch {
          clearAuthState();
          queryClient.setQueryData(USER_QUERY_KEY, null);
        }
      }
    }
  });
}

interface UseAuthReturn {
  user: CurrentUser | null | undefined;
  token?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setActiveTenant: (tenantId: string) => Promise<void>;
  refetchUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const queryClient = useQueryClient();
  
  const { 
    data: user, 
    isLoading: isUserLoading,
    refetch: refetchUser 
  } = useCurrentUser();

  const handleLogin = async (credentials: LoginCredentials) => {
    setError(null);
    try {
      setIsLoading(true);
      const user = await login(credentials);
      queryClient.setQueryData(USER_QUERY_KEY, user);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Attempt to notify backend of logout
      await api.post('auth/logout');
    } catch {
      // Ignore backend errors during logout
    } finally {
      // Always clear all auth state
      clearAuthState();
      queryClient.setQueryData(USER_QUERY_KEY, null);
      queryClient.clear();
      setIsLoading(false);
    }
  };

  const setActiveTenant = async (tenantId: string) => {
    localStorage.setItem('activeTenantId', tenantId);
    
    try {
      await api.post('tenants/active', { tenant_id: tenantId }, {
        validateStatus: (status) => status === 200 || status === 404
      });
    } catch (error) {
      // Ignore errors - endpoint is optional
    }
  };

  return {
    user,
    token: getAccessToken() || undefined,
    isLoading: isLoading || isUserLoading,
    isAuthenticated: !!user && !!getAccessToken(),
    error,
    login: handleLogin,
    logout: handleLogout,
    setActiveTenant,
    refetchUser: () => refetchUser(),
  };
}

export function getRedirectPath(args: {
  platformRole?: string;
  hasActiveTenant: boolean;
  hasMultipleAssignments?: boolean;
}): string {
  const p = (args.platformRole || '').toUpperCase();
  
  if (['SUPER_ADMIN', 'ADMIN'].includes(p)) {
    return '/platform-dashboard';
  }
  
  if (p === 'USER' && args.hasMultipleAssignments) {
    return '/select-employer';
  }
  
  if (args.hasActiveTenant) {
    return '/dashboard';
  }
  
  return '/select-employer';
}