export type EmployerRole = 
  | 'OWNER' 
  | 'ADMIN' 
  | 'HR_ADMIN' 
  | 'MANAGER' 
  | 'STAFF' 
  | 'MEMBER';

export interface TenantDetails {
  id: string;
  name: string;
  company_name?: string;
  logo_url?: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  subscription_status?: 'TRIAL' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

export interface Assignment {
  id: string;
  tenant_id: string;
  user_id: string;
  role: EmployerRole;
  is_active: boolean;
  tenant: TenantDetails;
  created_at: string;
  updated_at: string;
}

export interface Employer {
  id: string;
  name: string;
  role: EmployerRole;
  isActive: boolean;
  logoUrl: string | null;
  status: TenantDetails['status'];
  subscriptionStatus: TenantDetails['subscription_status'];
}

export interface EmployerError extends Error {
  code?: string;
  status?: number;
  detail?: string;
}
