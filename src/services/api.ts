import api from '@/api/axios';
import type { AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@/types/core';

interface LoginCredentials {
  email: string;
  password: string;
}

interface OTPData {
  email: string;
  otp: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  password_confirmation: string;
}

interface ProfileData {
  full_name?: string;
  email?: string;
  phone_number?: string;
}

interface TenantData {
  name: string;
  domain?: string;
  settings?: Record<string, unknown>;
}

interface EmployeeData {
  full_name: string;
  email: string;
  phone_number?: string;
  position?: string;
  department?: string;
  hire_date?: string;
}

interface LeaveData {
  start_date: string;
  end_date: string;
  type: string;
  reason?: string;
}

interface PayrollPeriod {
  month: number;
  year: number;
}

class ApiService {
  // Authentication endpoints
  async login(credentials: LoginCredentials) {
    return api.post<ApiResponse<{ token: string }>>('/auth/login', credentials);
  }

  async verifyOTP(otpData: OTPData) {
    return api.post<ApiResponse<{ verified: boolean }>>('/auth/verify-otp', otpData);
  }

  async forgotPassword(data: ForgotPasswordData) {
    return api.post<ApiResponse<{ message: string }>>('/auth/forgot-password', data);
  }

  async resetPassword(data: ResetPasswordData) {
    return api.post<ApiResponse<{ message: string }>>('/auth/reset-password', data);
  }

  async refreshToken() {
    return api.post<ApiResponse<{ token: string }>>('/auth/refresh');
  }

  // User management endpoints
  async getCurrentUser() {
    return api.get<ApiResponse<ProfileData>>('/user/profile');
  }

  async updateProfile(profileData: ProfileData) {
    return api.put<ApiResponse<ProfileData>>('/user/profile', profileData);
  }

  // Platform admin endpoints
  async getTenants() {
    return api.get<ApiResponse<TenantData[]>>('/platform/tenants');
  }

  async createTenant(tenantData: TenantData) {
    return api.post<ApiResponse<TenantData>>('/platform/tenants', tenantData);
  }

  async updateTenant(tenantId: string, tenantData: Partial<TenantData>) {
    return api.put<ApiResponse<TenantData>>(`/platform/tenants/${tenantId}`, tenantData);
  }

  async getPlatformAnalytics() {
    return api.get<ApiResponse<Record<string, unknown>>>('/platform/analytics');
  }

  // Tenant admin endpoints
  async getEmployees() {
    return api.get<ApiResponse<EmployeeData[]>>('/tenant/employees');
  }

  async createEmployee(employeeData: EmployeeData) {
    return api.post<ApiResponse<EmployeeData>>('/tenant/employees', employeeData);
  }

  async updateEmployee(employeeId: string, employeeData: Partial<EmployeeData>) {
    return api.put<ApiResponse<EmployeeData>>(`/tenant/employees/${employeeId}`, employeeData);
  }

  async deleteEmployee(employeeId: string) {
    return api.delete<ApiResponse<void>>(`/tenant/employees/${employeeId}`);
  }

  // Attendance endpoints
  async getAttendance(filters: Record<string, string> = {}) {
    const params = new URLSearchParams(filters);
    return api.get<ApiResponse<unknown>>('/attendance', { params });
  }

  async clockIn() {
    return api.post<ApiResponse<{ timestamp: string }>>('/attendance/clock-in');
  }

  async clockOut() {
    return api.post<ApiResponse<{ timestamp: string }>>('/attendance/clock-out');
  }

  // Leave management endpoints
  async getLeaveRequests() {
    return api.get<ApiResponse<LeaveData[]>>('/leaves');
  }

  async createLeaveRequest(leaveData: LeaveData) {
    return api.post<ApiResponse<LeaveData>>('/leaves', leaveData);
  }

  async updateLeaveRequest(leaveId: string, action: 'approve' | 'reject', comments = '') {
    return api.put<ApiResponse<LeaveData>>(`/leaves/${leaveId}/${action}`, { comments });
  }

  // Payroll endpoints
  async getPayrollData(filters: Record<string, string> = {}) {
    const params = new URLSearchParams(filters);
    return api.get<ApiResponse<unknown>>('/payroll', { params });
  }

  async generatePayslip(employeeId: string, period: PayrollPeriod) {
    return api.post<ApiResponse<{ url: string }>>(`/payroll/payslip/${employeeId}`, period);
  }

  // Dashboard/Analytics endpoints
  async getDashboardStats() {
    return api.get<ApiResponse<Record<string, unknown>>>('/dashboard/stats');
  }

  async getAnalytics(dateRange: { start_date: string; end_date: string }) {
    return api.post<ApiResponse<Record<string, unknown>>>('/analytics', dateRange);
  }

  // File upload endpoint
  async uploadFile(file: File, type = 'document') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return api.post<ApiResponse<{ url: string }>>('/upload', formData, config);
  }

  // Notification endpoints
  async getNotifications() {
    return api.get<ApiResponse<unknown[]>>('/notifications');
  }

  async markNotificationAsRead(notificationId: string) {
    return api.put<ApiResponse<void>>(`/notifications/${notificationId}/read`);
  }
}

export default new ApiService();
