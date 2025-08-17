export type PlatformRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'SALES_CONSULTANT';
export type TenantRole = 'hr' | 'admin' | 'manager' | 'staff' | 'finance' | 'director';

export interface User {
  id: string;
  full_name: string;
  email?: string;
  phone_number?: string;
  platform_role: PlatformRole;
  tenant_role?: TenantRole;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
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

export interface Paginated<T> { 
  items: T[]; 
  page: number; 
  page_size: number; 
  total: number; 
}
