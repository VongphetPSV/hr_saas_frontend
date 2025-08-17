import { useEffect, useMemo, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/lib/queryClient'
import { useCurrentUser, getRedirectPath } from '@/hooks/useAuth'
import { getActiveTenantId } from '@/lib/tenant'
import useEmployers from '@/hooks/useEmployers'

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage'
import SelectEmployerPage from '@/pages/select-employer/SelectEmployerPage'

// Platform Pages
import SuperAdminDashboard from '@/pages/platform/SuperAdminDashboard'
import PlatformDashboard from '@/pages/platform/PlatformDashboard'
import SalesDashboard from '@/pages/platform/SalesDashboard'

// Tenant Pages
import HRDashboard from '@/pages/tenant/HRDashboard'
import AdminDashboard from '@/pages/tenant/AdminDashboard'
import StaffDashboard from '@/pages/tenant/StaffDashboard'
import ManagerDashboard from '@/pages/tenant/ManagerDashboard'
import FinanceDashboard from '@/pages/tenant/FinanceDashboard'
import DirectorDashboard from '@/pages/tenant/DirectorDashboard'

// Billing Pages
import Paywall from '@/pages/billing/Paywall'

// Components
import ProtectedRoute from '@/router/ProtectedRoute'
import RequirePaidTenant from '@/router/guards/RequirePaidTenant'
import DashboardLayout from '@/layouts/DashboardLayout'
import PlatformLayout from '@/layouts/PlatformLayout'

function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: user, isLoading: authLoading } = useCurrentUser()
  const { data: employers = [], isLoading: employersLoading } = useEmployers()

  const hasActiveTenant = !!getActiveTenantId()
  const platformRole = user?.platform_role as string | undefined
  const hasMultipleAssignments = employers.length > 1

  const targetPath = useMemo(() => {
    if (!user) return '/auth/login'
    if (employersLoading) return undefined // wait for employers to load
    return getRedirectPath({ platformRole, hasActiveTenant, hasMultipleAssignments })
  }, [!!user, platformRole, hasActiveTenant, hasMultipleAssignments, employersLoading])

  const phaseRef = useRef<'unknown'|'unauth'|'auth'>('unknown')
  const didRedirectRef = useRef(false)

  useEffect(() => {
    if (authLoading || employersLoading) return

    const now = user ? 'auth' : 'unauth'
    const changed = phaseRef.current !== now
    if (changed) {
      phaseRef.current = now
      didRedirectRef.current = false
    }

    if (didRedirectRef.current) return

    if (!user) {
      if (location.pathname !== '/auth/login') {
        didRedirectRef.current = true
        navigate('/auth/login', { replace: true })
      }
      return
    }

    // Only redirect if we have a target path (after employers load)
    if (targetPath && location.pathname !== targetPath) {
      didRedirectRef.current = true
      navigate(targetPath, { replace: true })
    }
  }, [authLoading, employersLoading, !!user, platformRole, hasActiveTenant, targetPath, location.pathname, navigate])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route path="/select-employer" element={
        <ProtectedRoute required="any">
          <SelectEmployerPage />
        </ProtectedRoute>
      } />

      {/* Billing Routes */}
      <Route path="/billing/paywall" element={
        <ProtectedRoute required="any">
          <Paywall />
        </ProtectedRoute>
      } />

      {/* Platform Routes */}
      <Route path="/platform-dashboard" element={
        <ProtectedRoute required="platform">
          <PlatformLayout>
            <PlatformDashboard />
          </PlatformLayout>
        </ProtectedRoute>
      } />

      <Route path="/sales-dashboard" element={
        <ProtectedRoute required="platform">
          <PlatformLayout>
            <SalesDashboard />
          </PlatformLayout>
        </ProtectedRoute>
      } />

      {/* HR Module Routes - Protected by Subscription */}
      <Route path="/hr-dashboard" element={
        <ProtectedRoute required="tenant">
          <RequirePaidTenant>
            <DashboardLayout>
              <HRDashboard />
            </DashboardLayout>
          </RequirePaidTenant>
        </ProtectedRoute>
      } />

      <Route path="/staff-dashboard" element={
        <ProtectedRoute required="tenant">
          <RequirePaidTenant>
            <DashboardLayout>
              <StaffDashboard />
            </DashboardLayout>
          </RequirePaidTenant>
        </ProtectedRoute>
      } />

      <Route path="/manager-dashboard" element={
        <ProtectedRoute required="tenant">
          <RequirePaidTenant>
            <DashboardLayout>
              <ManagerDashboard />
            </DashboardLayout>
          </RequirePaidTenant>
        </ProtectedRoute>
      } />

      {/* Finance Routes - Not Protected by Subscription */}
      <Route path="/finance-dashboard" element={
        <ProtectedRoute required="tenant">
          <DashboardLayout>
            <FinanceDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes - Not Protected by Subscription */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute required="tenant">
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/director-dashboard" element={
        <ProtectedRoute required="tenant">
          <DashboardLayout>
            <DirectorDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Default Dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute required="tenant">
          <DashboardLayout>
            <StaffDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}

export default function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  )
}