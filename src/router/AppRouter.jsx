import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import DashboardLayout from '../layouts/DashboardLayout';
import RoleGuard from '../components/RoleGuard';

// Auth pages
import LoginPage from '../pages/auth/LoginPage';
import OTPPage from '../pages/auth/OTPPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import SelectEmployerPage from '../pages/SelectEmployerPage';

// Platform pages
import SuperAdminDashboard from '../pages/platform/SuperAdminDashboard';
import SalesDashboard from '../pages/platform/SalesDashboard';

// Tenant pages
import HRDashboard from '../pages/tenant/HRDashboard';
import StaffDashboard from '../pages/tenant/StaffDashboard';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Role-based Dashboard Route
const DashboardRoute = () => {
  const { user, isPlatformRole, isTenantRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Platform role routing
  if (isPlatformRole()) {
    switch (user.role) {
      case 'super_admin':
      case 'platform_manager':
        return <SuperAdminDashboard />;
      case 'sales_consultant':
        return <SalesDashboard />;
      default:
        return <SuperAdminDashboard />;
    }
  }

  // Tenant role routing
  if (isTenantRole()) {
    switch (user.role) {
      case 'admin':
      case 'director':
        return <HRDashboard />;
      case 'hr':
      case 'manager':
        return <HRDashboard />;
      case 'staff':
      case 'finance':
        return <StaffDashboard />;
      default:
        return <StaffDashboard />;
    }
  }

  // Fallback
  return <Navigate to="/select-employer" replace />;
};

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/otp" 
          element={user ? <Navigate to="/dashboard" replace /> : <OTPPage />} 
        />
        <Route 
          path="/forgot-password" 
          element={user ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />} 
        />

        {/* Employer selection for users without tenant context */}
        <Route 
          path="/select-employer" 
          element={
            <ProtectedRoute>
              <SelectEmployerPage />
            </ProtectedRoute>
          } 
        />

        {/* Protected routes with layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardRoute />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Platform specific routes */}
        <Route
          path="/tenants"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['super_admin', 'platform_manager']}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Tenant Management</h1>
                    <p className="text-gray-600 mt-2">Manage all tenant organizations</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['super_admin', 'sales_consultant']}>
                <DashboardLayout>
                  <SalesDashboard />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['super_admin', 'platform_manager']}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Platform Analytics</h1>
                    <p className="text-gray-600 mt-2">Comprehensive platform insights and metrics</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Tenant specific routes */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin', 'hr', 'manager', 'director']}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Employee Management</h1>
                    <p className="text-gray-600 mt-2">Manage employee records and information</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <RoleGuard allowTenant={true}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Attendance Tracking</h1>
                    <p className="text-gray-600 mt-2">View and manage attendance records</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <RoleGuard allowTenant={true}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Leave Management</h1>
                    <p className="text-gray-600 mt-2">Manage leave requests and approvals</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin', 'hr', 'finance', 'director']}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Payroll Management</h1>
                    <p className="text-gray-600 mt-2">Manage payroll processing and reports</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin', 'director']}>
                <DashboardLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-gray-600 mt-2">Configure system settings and preferences</p>
                  </div>
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 fallback */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a href="/dashboard" className="text-primary-600 hover:text-primary-500">
                  Go to Dashboard
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;