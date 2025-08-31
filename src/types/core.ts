export type PlatformRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'SALES_CONSULTANT';
export type TenantRole = 'hr' | 'admin' | 'manager' | 'staff' | 'finance' | 'director';

export interface User {
  id: string;
  full_name: string;
  email?: string;
  platform_role?: PlatformRole;
  current_tenant_role?: TenantRole;
  current_tenant?: {
    id: string;
    name: string;
  };
}

export interface TenantAssignment {
  tenant_id: string;
  tenant_name: string;
  tenant_role: TenantRole;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}