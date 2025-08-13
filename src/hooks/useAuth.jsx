import { useState, useEffect, createContext, useContext } from 'react';
import { 
  decodeToken, 
  getPlatformRole, 
  getTenantRoles, 
  getTenantInfo,
  getStoredToken,
  storeToken,
  removeToken,
  clearAllTokens,
  TOKEN_KEYS,
  getRedirectRoute,
  isPlatformRole as checkIsPlatformRole,
  isTenantRole as checkIsTenantRole
} from '../utils/token.js';
import { useLogin as useLoginApi, useGetCurrentUser } from './api/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCurrentUser } = useGetCurrentUser();
  const { login: loginApi, loading: loginLoading } = useLoginApi();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const platformToken = getStoredToken(TOKEN_KEYS.PLATFORM);
      const tenantToken = getStoredToken(TOKEN_KEYS.TENANT);

      if (platformToken || tenantToken) {
        // Try to get current user data from API
        const userData = await getCurrentUser();
        if (userData) {
          const platformDecoded = platformToken ? decodeToken(platformToken) : null;
          const tenantDecoded = tenantToken ? decodeToken(tenantToken) : null;
          const platformRole = platformDecoded ? getPlatformRole(platformToken) : null;
          const tenantRoles = tenantDecoded ? getTenantRoles(tenantToken) : null;
          const tenantInfo = tenantDecoded ? getTenantInfo(tenantToken) : null;

          setUser({
            ...userData,
            platform_role: platformRole,
            tenant_roles: tenantRoles,
            current_tenant_role: tenantRoles ? tenantRoles[0] : null,
            tenant: tenantInfo,
            platform_token: platformToken,
            tenant_token: tenantToken,
            tokens: {
              platform: platformToken,
              tenant: tenantToken
            }
          });
        } else {
          clearAllTokens();
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      clearAllTokens();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, tokenType = 'platform') => {
    try {
      const response = await loginApi(credentials.email, credentials.password);
      const token = response.access_token;

      const decoded = decodeToken(token);
      if (!decoded) {
        return { success: false, error: 'Invalid token' };
      }

      const storageKey = tokenType === 'tenant' ? TOKEN_KEYS.TENANT : TOKEN_KEYS.PLATFORM;
      storeToken(storageKey, token);

      // Get existing user data or create new
      const existingUser = user || {};
      
      if (tokenType === 'platform') {
        const platformRole = getPlatformRole(token);
        const updatedUser = {
          ...existingUser,
          id: decoded.sub || decoded.user_id,
          email: decoded.email,
          name: decoded.name || decoded.full_name,
          platform_role: platformRole,
          platform_token: token,
          tokens: {
            ...existingUser.tokens,
            platform: token
          }
        };
        setUser(updatedUser);
        
        return { 
          success: true, 
          redirectTo: getRedirectRoute(platformRole, true),
          role: platformRole
        };
      } else {
        // Tenant token
        const tenantRoles = getTenantRoles(token);
        const tenantInfo = getTenantInfo(token);
        const primaryRole = tenantRoles ? tenantRoles[0] : null;
        
        const updatedUser = {
          ...existingUser,
          tenant_roles: tenantRoles,
          current_tenant_role: primaryRole,
          tenant: tenantInfo,
          tenant_token: token,
          tokens: {
            ...existingUser.tokens,
            tenant: token
          }
        };
        setUser(updatedUser);
        
        return { 
          success: true, 
          redirectTo: getRedirectRoute(primaryRole, false),
          role: primaryRole
        };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    clearAllTokens();
    setUser(null);
  };

  const switchTenantRole = (role) => {
    if (user && user.tenant_roles && user.tenant_roles.includes(role)) {
      setUser({
        ...user,
        current_tenant_role: role
      });
      return true;
    }
    return false;
  };

  const isPlatformUser = () => {
    return user && user.platform_role && checkIsPlatformRole(user.platform_role);
  };

  const isTenantUser = () => {
    return user && user.current_tenant_role && checkIsTenantRole(user.current_tenant_role);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.platform_role === role || (user.tenant_roles && user.tenant_roles.includes(role));
  };

  const hasPlatformRole = (role) => {
    return user && user.platform_role === role;
  };

  const hasTenantRole = (role) => {
    return user && user.tenant_roles && user.tenant_roles.includes(role);
  };

  const getCurrentRole = () => {
    return user?.current_tenant_role || user?.platform_role || null;
  };

  const needsEmployerSelection = () => {
    return user && user.platform_role && 
           ['user', 'staff'].includes(user.platform_role) && 
           !user.tenant_token;
  };

  const value = {
    user,
    loading: loading || loginLoading,
    login,
    logout,
    switchTenantRole,
    isPlatformUser,
    isTenantUser,
    hasRole,
    hasPlatformRole,
    hasTenantRole,
    getCurrentRole,
    needsEmployerSelection,
    // Legacy compatibility
    isPlatformRole: isPlatformUser,
    isTenantRole: isTenantUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;