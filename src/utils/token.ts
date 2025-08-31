import { jwtDecode } from 'jwt-decode';

/**
 * Safely decode JWT token
 * @param {string} token - JWT token string
 * @returns {object|null} - Decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    // Handle mock tokens for demo
    if (token.startsWith('mock_token_')) {
      const encoded = token.replace('mock_token_', '');
      const decoded = JSON.parse(atob(encoded));
      
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
        console.warn('Token has expired');
        return null;
      }
      
      return decoded;
    }
    
    // Handle real JWT tokens
    const decoded = jwtDecode(token);
    
    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
      console.warn('Token has expired');
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token string
 * @returns {boolean} - True if expired, false if valid
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  return !decoded;
};

/**
 * Get token expiration time
 * @param {string} token - JWT token string
 * @returns {Date|null} - Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  return decoded?.exp ? new Date(decoded.exp * 1000) : null;
};

/**
 * Extract platform role from token
 * @param {string} token - JWT token string
 * @returns {string|null} - Platform role or null
 */
export const getPlatformRole = (token) => {
  const decoded = decodeToken(token);
  return decoded?.platform_role || decoded?.role || null;
};

/**
 * Extract tenant roles from token
 * @param {string} token - JWT token string
 * @returns {array|null} - Array of tenant roles or null
 */
export const getTenantRoles = (token) => {
  const decoded = decodeToken(token);
  return decoded?.tenant_roles || (decoded?.role ? [decoded.role] : null);
};

/**
 * Extract tenant information from token
 * @param {string} token - JWT token string
 * @returns {object|null} - Tenant info or null
 */
export const getTenantInfo = (token) => {
  const decoded = decodeToken(token);
  return decoded?.tenant ? {
    id: decoded.tenant.id || decoded.tenant_id,
    name: decoded.tenant.name || decoded.tenant_name,
    domain: decoded.tenant.domain || decoded.tenant_domain
  } : null;
};

/**
 * Storage keys for tokens
 */
export const TOKEN_KEYS = {
  PLATFORM: 'platform_token',
  TENANT: 'tenant_token'
};

/**
 * Get token from localStorage
 * @param {string} key - Storage key
 * @returns {string|null} - Token or null
 */
export const getStoredToken = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Failed to get token from storage:', error);
    return null;
  }
};

/**
 * Store token in localStorage
 * @param {string} key - Storage key
 * @param {string} token - JWT token
 */
export const storeToken = (key, token) => {
  try {
    localStorage.setItem(key, token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

/**
 * Remove token from localStorage
 * @param {string} key - Storage key
 */
export const removeToken = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

/**
 * Clear all tokens from localStorage
 */
export const clearAllTokens = () => {
  Object.values(TOKEN_KEYS).forEach(key => {
    removeToken(key);
  });
};

/**
 * Role-based route mapping
 */
export const ROLE_ROUTES = {
  // Platform roles
  super_admin: '/super-admin-dashboard',
  sales_consultant: '/sales-dashboard',
  platform_manager: '/platform-dashboard',
  
  // Tenant roles
  hr: '/hr-dashboard',
  admin: '/admin-dashboard',
  staff: '/staff-dashboard',
  manager: '/manager-dashboard',
  finance: '/finance-dashboard',
  director: '/director-dashboard'
};

/**
 * Get redirect route based on role
 * @param {string} role - User role
 * @param {boolean} isPlatform - Whether it's a platform role
 * @returns {string} - Route path
 */
export const getRedirectRoute = (role, isPlatform = false) => {
  if (isPlatform && (role === 'user' || role === 'staff')) {
    return '/select-employer';
  }
  
  return ROLE_ROUTES[role] || '/dashboard';
};

/**
 * Check if role is platform role
 * @param {string} role - User role
 * @returns {boolean} - True if platform role
 */
export const isPlatformRole = (role) => {
  return ['super_admin', 'sales_consultant', 'platform_manager', 'user'].includes(role);
};

/**
 * Check if role is tenant role
 * @param {string} role - User role
 * @returns {boolean} - True if tenant role
 */
export const isTenantRole = (role) => {
  return ['hr', 'admin', 'staff', 'manager', 'finance', 'director'].includes(role);
};