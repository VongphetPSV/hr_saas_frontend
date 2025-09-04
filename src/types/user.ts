// src/types/user.ts
export type UserRole = "hr" | "admin" | "manager" | "employee";

export interface User {
  id: number;
  email: string;
  name: string;
  roles: UserRole[];
  tenant_id?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
