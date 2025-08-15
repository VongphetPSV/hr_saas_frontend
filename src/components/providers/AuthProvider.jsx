import { createContext, useContext, useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/useAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: user, isLoading } = useCurrentUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized once we have the initial user state
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  const value = {
    user,
    isLoading,
    isInitialized,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
