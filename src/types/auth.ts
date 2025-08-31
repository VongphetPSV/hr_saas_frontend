import { User, PlatformRole, TenantRole } from './core';

export interface DecodedToken {
  sub: string;
  platform_role?: PlatformRole;
  tenant_role?: TenantRole;
  tenant_id?: string;
  exp: number;
  iat: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: PlatformRole | TenantRole;
  fallback?: React.ReactNode;
}

// ✅ Add this to types/auth.ts
export class AuthError extends Error {
  code?: string;
  httpStatus?: number;
  detail?: string;

  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}