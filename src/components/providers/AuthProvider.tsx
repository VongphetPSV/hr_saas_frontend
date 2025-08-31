import { createContext, useMemo, useCallback, ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '@/hooks/useAuth'
import type { User } from '@/types/core'

import { AuthContextType, AuthProviderProps, AuthState } from '@/types/auth'
import { LoginRequest } from '@/types/api'

interface AuthContextValue extends Omit<AuthContextType, 'token' | 'error' | 'refreshToken' | 'updateUser'> {
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { throw new Error('AuthContext not initialized') },
  logout: () => { throw new Error('AuthContext not initialized') },
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient()
  const { data: user, isLoading } = useCurrentUser()

  const stableLogin = useCallback(async (credentials: { phone_number: string; password: string }) => {
    // Login handled by useAuth hook
    await qc.invalidateQueries({ queryKey: ['currentUser'] })
  }, [qc])

  const stableLogout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('tenant_id')
    localStorage.removeItem('tenant_role')
    qc.setQueryData(['currentUser'], null)
    qc.clear()
  }, [qc])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login: stableLogin,
    logout: stableLogout,
  }), [user, isLoading, stableLogin, stableLogout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}