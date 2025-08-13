import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

// Query key constants
const CURRENT_USER_QUERY_KEY = 'currentUser';

// Helper function to get redirect path based on role
const getRedirectPath = async (platformRole, api) => {
  console.log('Computing redirect path for:', { platformRole });
  
  // Handle platform roles first
  if (platformRole) {
    switch (platformRole.toUpperCase()) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return '/super-admin-dashboard';
      case 'SALES_CONSULTANT':
        return '/sales-dashboard';
      case 'USER': {
        // Fetch tenant assignments
        try {
          const response = await api.get('/me/assignments');
          const assignments = response.data;
          
          // Cache assignments
          sessionStorage.setItem('employers', JSON.stringify(assignments));
          
          if (assignments.length === 0) {
            return '/select-employer'; // Will show error + logout
          }
          
          if (assignments.length === 1) {
            const { tenant_id, tenant_role } = assignments[0];
            localStorage.setItem('tenant_id', tenant_id);
            localStorage.setItem('tenant_role', tenant_role);
            
            // Return role-based path
            switch (tenant_role.toLowerCase()) {
              case 'hr': return '/hr-dashboard';
              case 'admin': return '/admin-dashboard';
              case 'staff': return '/staff-dashboard';
              case 'manager': return '/manager-dashboard';
              case 'finance': return '/finance-dashboard';
              case 'director': return '/director-dashboard';
              default: return '/';
            }
          }
          
          return '/select-employer';
        } catch (error) {
          console.error('Error fetching assignments:', error);
          return '/select-employer';
        }
      }
      default:
        return '/';
    }
  }
  return '/';
};

// Current user query hook
export const useCurrentUser = () => {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/me');
        return response.data;
      } catch (error) {
        // If 401, clear tokens
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
  });
};

// Main auth hook
export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // Accept either phone_number or phone from caller; prefer phone_number
      const input = String(
        credentials.phone_number ?? credentials.phone ?? ''
      );
      const digitsOnly = input.replace(/\D/g, '');

      // Enforce 8-digit local number
      if (!/^\d{8}$/.test(digitsOnly)) {
        const error = new Error('Phone number must be exactly 8 digits');
        error.response = {
          data: {
            detail: [
              {
                loc: ['body', 'phone_number'],
                msg: 'Phone number must be exactly 8 digits',
                type: 'value_error',
              },
            ],
          },
        };
        throw error;
      }

      // Always send the schema the backend expects: { phone_number, password }
      const payload = {
        phone_number: digitsOnly,
        password: credentials.password,
      };

      try {
        console.log('Sending login payload:', payload);
        const resp = await api.post('/auth/login', payload);
        console.log('Server response:', resp.data);
        return resp.data;
      } catch (error) {
        console.error('Login request failed:', error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: async (data) => {
      try {
        console.log('Login successful, received tokens:', {
          has_access_token: !!data.access_token,
          has_refresh_token: !!data.refresh_token
        });

        // Store tokens
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }

        // Fetch user data
        console.log('Fetching user data from /auth/me...');
        const userResponse = await api.get('/auth/me');
        const userData = userResponse.data;
        console.log('Raw user data:', userData);

        // Update user data in cache
        queryClient.setQueryData([CURRENT_USER_QUERY_KEY], userData);

        // Log user data for debugging
        console.log('Extracted roles:', {
          platform_role: userData.platform_role,
          tenant_role: userData.tenant_role,
          roles: userData.roles,
        });

        // Handle redirection based on roles
        if (!userData.platform_role) {
          console.warn('No platform role found in user data!');
          navigate('/', { replace: true });
          return userData;
        }

        // Get redirect path (handles tenant resolution for USER role)
        const redirectPath = await getRedirectPath(userData.platform_role, api);
        
        console.log('Computed redirect path:', redirectPath);
        console.log('Attempting navigation...');
        
        // Force navigation with replace to avoid back-button issues
        navigate(redirectPath, { replace: true });
        console.log('Navigation completed');

        return userData;
      } catch (error) {
        console.error('Error in onSuccess:', error);
        throw error;
      }
    },
    onError: (error) => {
      // Log server validation details to help diagnose errors
      const detail = error?.response?.data?.detail;
      if (detail) {
        try {
          console.error('Login failed details:', JSON.stringify(detail, null, 2));
        } catch {
          console.error('Login failed details:', detail);
        }
      } else {
        console.error('Login failed:', error?.response?.data || error?.message || error);
      }

      // Clear any existing tokens on login error
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('employers');
    queryClient.clear(); // Clear all query cache
    navigate('/auth/login', { replace: true });
  };

  return {
    login: loginMutation.mutateAsync,
    logout,
    isLoggingIn: loginMutation.isLoading,
    loginError: loginMutation.error,
  };
};

export default useAuth;