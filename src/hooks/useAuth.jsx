import { useState, useEffect, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: decoded.sub,
            role: decoded.role,
            tenant: decoded.tenant,
            email: decoded.email,
            name: decoded.name,
            token
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      setUser({
        id: decoded.sub,
        role: decoded.role,
        tenant: decoded.tenant,
        email: decoded.email,
        name: decoded.name,
        token
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isPlatformRole = () => {
    return user && ['super_admin', 'sales_consultant', 'platform_manager'].includes(user.role);
  };

  const isTenantRole = () => {
    return user && ['admin', 'hr', 'staff', 'manager', 'finance', 'director'].includes(user.role);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isPlatformRole,
    isTenantRole
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