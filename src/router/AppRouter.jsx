import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import SelectEmployerPage from '../pages/auth/SelectEmployer';

// Platform Pages
import SuperAdminDashboard from '../pages/platform/SuperAdminDashboard';
import PlatformDashboard from '../pages/platform/PlatformDashboard';
import SalesDashboard from '../pages/platform/SalesDashboard';

// Tenant Pages
import HRDashboard from '../pages/tenant/HRDashboard';
import AdminDashboard from '../pages/tenant/AdminDashboard';
import StaffDashboard from '../pages/tenant/StaffDashboard';
import ManagerDashboard from '../pages/tenant/ManagerDashboard';
import FinanceDashboard from '../pages/tenant/FinanceDashboard';
import DirectorDashboard from '../pages/tenant/DirectorDashboard';

// Billing Pages
import Paywall from '../pages/billing/Paywall';

// Components
import ProtectedRoute from './ProtectedRoute';
import RequirePaidTenant from './guards/RequirePaidTenant';
import DashboardLayout from '../layouts/DashboardLayout';
import { PlatformLayout } from '../layouts/PlatformLayout';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/select-employer" element={
            <ProtectedRoute roles={['USER', 'platform_user']} requireTenant={false}>
              <SelectEmployerPage />
            </ProtectedRoute>
          } />

          {/* Billing Routes */}
          <Route path="/billing/paywall" element={
            <ProtectedRoute>
              <Paywall />
            </ProtectedRoute>
          } />

          {/* Platform Routes */}
          <Route path="/super-admin-dashboard" element={
            <ProtectedRoute roles={['super_admin']}>
              <PlatformLayout>
                <SuperAdminDashboard />
              </PlatformLayout>
            </ProtectedRoute>
          } />

          <Route path="/platform-dashboard" element={
            <ProtectedRoute roles={['platform_user', 'USER']}>
              <PlatformLayout>
                <PlatformDashboard />
              </PlatformLayout>
            </ProtectedRoute>
          } />

          <Route path="/sales-dashboard" element={
            <ProtectedRoute roles={['sales_consultant']}>
              <PlatformLayout>
                <SalesDashboard />
              </PlatformLayout>
            </ProtectedRoute>
          } />

          {/* HR Module Routes - Protected by Subscription */}
          <Route path="/hr-dashboard" element={
            <ProtectedRoute roles={['hr']}>
              <RequirePaidTenant>
                <DashboardLayout>
                  <HRDashboard />
                </DashboardLayout>
              </RequirePaidTenant>
            </ProtectedRoute>
          } />

          <Route path="/staff-dashboard" element={
            <ProtectedRoute roles={['staff']}>
              <RequirePaidTenant>
                <DashboardLayout>
                  <StaffDashboard />
                </DashboardLayout>
              </RequirePaidTenant>
            </ProtectedRoute>
          } />

          <Route path="/manager-dashboard" element={
            <ProtectedRoute roles={['manager']}>
              <RequirePaidTenant>
                <DashboardLayout>
                  <ManagerDashboard />
                </DashboardLayout>
              </RequirePaidTenant>
            </ProtectedRoute>
          } />

          {/* Finance Routes - Not Protected by Subscription */}
          <Route path="/finance-dashboard" element={
            <ProtectedRoute roles={['finance']}>
              <DashboardLayout>
                <FinanceDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Admin Routes - Not Protected by Subscription */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/director-dashboard" element={
            <ProtectedRoute roles={['director']}>
              <DashboardLayout>
                <DirectorDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;