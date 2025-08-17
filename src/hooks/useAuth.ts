import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';

export type PlatformRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface CurrentUser {
  id: string;
  phone_number: string;
  full_name: string;
  email: string;
  platform_role: PlatformRole;
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get<CurrentUser>('auth/me');
  if (!data?.id) throw new Error('Invalid /auth/me response');
  return data;
}

export async function login(payload: { phone_number: string; password: string }): Promise<CurrentUser> {
  const { data } = await api.post<{ access_token: string; token_type: string }>(
    'auth/login',
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (!data?.access_token) throw new Error('Invalid login response');
  localStorage.setItem('access_token', data.access_token);
  const me = await fetchCurrentUser();
  localStorage.setItem('current_user', JSON.stringify(me));
  return me;
}

export function useCurrentUser() {
  const token = getAccessToken();
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: !!token,
    staleTime: 60_000,
    retry: false,
  });
}

interface UseAuthReturn {
  user: CurrentUser | null | undefined;
  token?: string;
  isLoading: boolean;
  login: (credentials: { phone_number: string; password: string }) => Promise<void>;
  logout: () => void;
  setActiveTenant: (tenantId: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const handleLogin = async (credentials: { phone_number: string; password: string }) => {
    try {
      setIsLoading(true);
      const user = await login(credentials);
      queryClient.setQueryData(['currentUser'], user);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('activeTenantId');
    queryClient.setQueryData(['currentUser'], null);
    queryClient.clear();
    
    // Best effort logout notification to backend
    api.post('auth/logout').catch(() => {});
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
    login: handleLogin,
    logout: handleLogout,
    setActiveTenant,
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