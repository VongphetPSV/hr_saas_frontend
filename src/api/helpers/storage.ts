// Access Token
export const getAccessToken = () => localStorage.getItem('access_token');

export const setAccessToken = (token) => {
  if (!token) {
    throw new Error('Access token is required');
  }
  localStorage.setItem('access_token', token);
};

// Tenant ID
export const getTenantId = () => localStorage.getItem('tenant_id');

export const setTenantId = (id) => {
  if (!id) {
    throw new Error('Tenant ID is required');
  }
  localStorage.setItem('tenant_id', id);
};

// Auth
export const clearAuth = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('tenant_id');
};
