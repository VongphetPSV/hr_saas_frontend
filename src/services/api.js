// API service for HRM SaaS application
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.hrmsaas.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Common request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyOTP(otpData) {
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
  }

  async forgotPassword(data) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // User management endpoints
  async getCurrentUser() {
    return this.request('/user/profile');
  }

  async updateProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Platform admin endpoints
  async getTenants() {
    return this.request('/platform/tenants');
  }

  async createTenant(tenantData) {
    return this.request('/platform/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
  }

  async updateTenant(tenantId, tenantData) {
    return this.request(`/platform/tenants/${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(tenantData),
    });
  }

  async getPlatformAnalytics() {
    return this.request('/platform/analytics');
  }

  // Tenant admin endpoints
  async getEmployees() {
    return this.request('/tenant/employees');
  }

  async createEmployee(employeeData) {
    return this.request('/tenant/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
    });
  }

  async updateEmployee(employeeId, employeeData) {
    return this.request(`/tenant/employees/${employeeId}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });
  }

  async deleteEmployee(employeeId) {
    return this.request(`/tenant/employees/${employeeId}`, {
      method: 'DELETE',
    });
  }

  // Attendance endpoints
  async getAttendance(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/attendance${queryParams ? `?${queryParams}` : ''}`);
  }

  async clockIn() {
    return this.request('/attendance/clock-in', {
      method: 'POST',
    });
  }

  async clockOut() {
    return this.request('/attendance/clock-out', {
      method: 'POST',
    });
  }

  // Leave management endpoints
  async getLeaveRequests() {
    return this.request('/leaves');
  }

  async createLeaveRequest(leaveData) {
    return this.request('/leaves', {
      method: 'POST',
      body: JSON.stringify(leaveData),
    });
  }

  async updateLeaveRequest(leaveId, action, comments = '') {
    return this.request(`/leaves/${leaveId}/${action}`, {
      method: 'PUT',
      body: JSON.stringify({ comments }),
    });
  }

  // Payroll endpoints
  async getPayrollData(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/payroll${queryParams ? `?${queryParams}` : ''}`);
  }

  async generatePayslip(employeeId, period) {
    return this.request(`/payroll/payslip/${employeeId}`, {
      method: 'POST',
      body: JSON.stringify({ period }),
    });
  }

  // Dashboard/Analytics endpoints
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getAnalytics(dateRange) {
    return this.request('/analytics', {
      method: 'POST',
      body: JSON.stringify(dateRange),
    });
  }

  // File upload endpoint
  async uploadFile(file, type = 'document') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let the browser set it
      },
    });
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }
}

export default new ApiService();