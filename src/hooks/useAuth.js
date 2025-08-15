import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export function computeRedirectPath({ platformRole, tenantRole }) {
  // Handle platform roles first
  const platformMap = {
    SUPER_ADMIN: '/super-admin-dashboard',
    SALES_CONSULTANT: '/sales-dashboard',
    PLATFORM_ADMIN: '/platform-admin-dashboard',
    USER: null // USER role requires tenant role check
  };

  // If it's a platform role, return its path
  const platformPath = platformMap[platformRole];
  if (platformPath) return platformPath;

  // If no tenant role and not a platform admin, go to employer selection
  if (!tenantRole) return '/select-employer';

  // Handle tenant roles
  const tenantMap = {
    hr: '/hr-dashboard',
    admin: '/admin-dashboard',
    manager: '/manager-dashboard',
    staff: '/staff-dashboard',
    finance: '/finance-dashboard',
    director: '/director-dashboard'
  };

  return tenantMap[tenantRole] ?? '/select-employer';
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/me');
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
      const response = await axiosInstance.post('/auth/login', credentials);
      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token);
      }

      // Step 2: Fetch user data - use setQueryData to avoid unnecessary refetch
      const userResponse = await axiosInstance.get('/auth/me');
      queryClient.setQueryData(['currentUser'], userResponse.data);
      const userData = userResponse.data;

      // Step 3: Handle role-based redirection
      const { platformRole } = userData;

      // Handle platform roles first (e.g., SUPER_ADMIN, SALES_CONSULTANT)
      if (platformRole && platformRole !== 'USER') {
        return computeRedirectPath({ 
          platformRole, 
          tenantRole: null 
        });
      }

      // Handle regular users who need tenant assignment
      setAuthState('resolving-tenant');
      
      // For regular users, try to get assignments
      if (platformRole === 'USER') {
        try {
          const assignmentsResponse = await axiosInstance.get('/auth/me/assignments', {
            // Prevent retry on failure
            signal: AbortSignal.timeout(5000), // 5 second timeout
          });
          
          const assignments = assignmentsResponse?.data || [];
          
          // Single assignment - auto-select tenant
          if (assignments.length === 1) {
            const [assignment] = assignments;
            localStorage.setItem('tenant_id', assignment.tenant_id);
            localStorage.setItem('tenant_role', assignment.tenant_role);
            return computeRedirectPath({ 
              platformRole, 
              tenantRole: assignment.tenant_role 
            });
          }
          
          // Multiple assignments or none - go to selection
          return '/select-employer';
        } catch (error) {
          // Log error but don't retry - just go to employer selection
          console.error('Failed to fetch tenant assignments:', error);
          return '/select-employer';
        }
      }
      
      // Fallback - go to employer selection
      return '/select-employer';
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