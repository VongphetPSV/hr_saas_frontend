import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export function computeRedirectPath({ platformRole, tenantRole }) {
  if (platformRole === 'SUPER_ADMIN') return '/super-admin-dashboard';
  if (platformRole === 'SALES_CONSULTANT') return '/sales-dashboard';
  if (!tenantRole) return '/select-employer';
  const map = {
    hr: '/hr-dashboard',
    admin: '/admin-dashboard',
    manager: '/manager-dashboard',
    staff: '/staff-dashboard',
    finance: '/finance-dashboard',
    director: '/director-dashboard'
  };
  return map[tenantRole] ?? '/select-employer';
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/auth/me');
      return response.data;
    },
    retry: false,
    staleTime: 300000, // 5 minutes
    cacheTime: 3600000, // 1 hour
  });
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState('idle');
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setAuthState('logging-in');
      
      // Step 1: Login and get token
      const response = await axiosInstance.post('/api/auth/login', credentials);
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);

      // Step 2: Fetch user data
      await queryClient.invalidateQueries(['currentUser']);
      const userData = await queryClient.fetchQuery(['currentUser']);

      // Step 3: Handle tenant resolution
      if (userData.platformRole === 'USER') {
        setAuthState('resolving-tenant');
        try {
          const assignmentsResponse = await axiosInstance.get('/api/me/assignments');
          const assignments = assignmentsResponse.data;

          if (assignments.length === 1) {
            const [assignment] = assignments;
            localStorage.setItem('tenant_id', assignment.tenant_id);
            localStorage.setItem('tenant_role', assignment.tenant_role);
            return computeRedirectPath({ 
              platformRole: userData.platformRole, 
              tenantRole: assignment.tenant_role 
            });
          } else {
            return '/select-employer';
          }
        } catch (error) {
          console.error('Failed to fetch tenant assignments:', error);
          return '/select-employer';
        }
      } else {
        return computeRedirectPath({ 
          platformRole: userData.platformRole, 
          tenantRole: null 
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
      setAuthState('idle');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('tenant_id');
    localStorage.removeItem('tenant_role');
    queryClient.clear();
  };

  return {
    user,
    isLoading: isLoading || isUserLoading,
    authState,
    login,
    logout
  };
}