import { User, TenantRole, PlatformRole } from './core';

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface CreateTenantRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  tax_id?: string;
}

export interface Tenant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  tax_id?: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  role: TenantRole;
  department?: string;
  position?: string;
  status: 'active' | 'inactive';
  joined_date: string;
}

export interface CreateStaffRequest {
  full_name: string;
  email?: string;
  phone: string;
  role: TenantRole;
  department?: string;
  position?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  read_by: string[];
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface Leave {
  id: string;
  staff_id: string;
  staff_name: string;
  type: 'annual' | 'sick' | 'unpaid' | 'other';
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
}

export interface CreateLeaveRequest {
  type: Leave['type'];
  start_date: string;
  end_date: string;
  reason: string;
}

export interface Overtime {
  id: string;
  staff_id: string;
  staff_name: string;
  date: string;
  hours: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
}

export interface CreateOvertimeRequest {
  date: string;
  hours: number;
  reason: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  description?: string;
}

export interface CreateHolidayRequest {
  name: string;
  date: string;
  description?: string;
}

export interface Payroll {
  id: string;
  staff_id: string;
  staff_name: string;
  period: string;
  basic_salary: number;
  allowances: number;
  deductions: number;
  overtime_pay: number;
  net_salary: number;
  status: 'draft' | 'approved' | 'paid';
}

export interface CreatePayrollRequest {
  staff_id: string;
  period: string;
  basic_salary: number;
  allowances: number;
  deductions: number;
  overtime_pay: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}


