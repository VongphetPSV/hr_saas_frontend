/**
 * Token utilities without external JWT dependencies
 */

// Constants
const TOKEN_EXPIRY_THRESHOLD = 2 * 60 * 1000; // 2 minutes in milliseconds

interface DecodedToken {
  exp: number;
  sub: string;
  [key: string]: any;
}

/**
 * Decodes a JWT token without using external libraries
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Checks if a token is expired
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  
  const expirationTime = decoded.exp * 1000; // Convert to milliseconds
  return Date.now() >= expirationTime;
}

/**
 * Checks if a token will expire soon (within threshold)
 */
export function willTokenExpireSoon(token: string | null, thresholdMs: number = TOKEN_EXPIRY_THRESHOLD): boolean {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  
  const expirationTime = decoded.exp * 1000; // Convert to milliseconds
  return Date.now() >= (expirationTime - thresholdMs);
}

/**
 * Gets token expiration time in milliseconds
 */
export function getTokenExpirationTime(token: string | null): number | null {
  if (!token) return null;
  
  const decoded = decodeToken(token);
  if (!decoded?.exp) return null;
  
  return decoded.exp * 1000; // Convert to milliseconds
}

/**
 * Gets the stored access token
 */
export function getAccessToken(): string | null {
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
}

/**
 * Sets or removes the access token
 */
export function setAccessToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  } catch {
    // Handle localStorage errors
  }
}

/**
 * Clears all auth-related data
 */
export function clearAuthData(): void {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('activeTenantId');
  } catch {
    // Handle localStorage errors
  }
}

/**
 * Gets user info from token without decoding
 */
export function getUserFromToken(token: string | null): { sub: string; [key: string]: any } | null {
  if (!token) return null;
  
  const decoded = decodeToken(token);
  if (!decoded?.sub) return null;
  
  return decoded;
}

/**
 * Validates token format without verifying signature
 */
export function isValidTokenFormat(token: string | null): boolean {
  if (!token) return false;
  
  // Check token format (three parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  try {
    // Try decoding header and payload
    const header = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    
    // Verify JSON format
    JSON.parse(header);
    JSON.parse(payload);
    
    return true;
  } catch {
    return false;
  }
}