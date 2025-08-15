import { Navigate, useLocation } from 'react-router-dom';
import { computeRedirectPath } from '@/hooks/useAuth';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { ResolvingTenant } from '../components/common/ResolvingTenant';
import { NoAccess } from '../components/common/NoAccess';

function ProtectedRoute({ children, roles, requireTenant = true }) {
  const location = useLocation();
  const { user, isLoading } = useAuthContext();

  // 1. Wait for auth check to complete
  if (isLoading) {
    return null;
  }

  // 2. Redirect to login if no user
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 3. Get tenant info once
  const tenantId = localStorage.getItem('tenant_id');
  const tenantRole = localStorage.getItem('tenant_role');

  // 4. Handle platform users (e.g., super admin) - they don't need tenant
  if (user.platformRole && user.platformRole !== 'USER') {
    // Allow access to their routes
    return children;
  }

  // 5. Handle regular users
  if (user.platformRole === 'USER') {
    // On employer selection page
    if (location.pathname === '/select-employer') {
      // Allow if they need to select employer
      if (!tenantId) {
        return children;
      }
      // Redirect to dashboard if they already have a tenant
      return <Navigate to={computeRedirectPath({ platformRole: 'USER', tenantRole })} replace />;
    }

    // Require tenant selection for other pages
    if (requireTenant && !tenantId) {
      return <Navigate to="/select-employer" replace />;
    }
  }

  // 6. Role-based access control
  if (roles?.length > 0) {
    const hasRequiredRole = roles.some(role => {
      const normalizedRole = role.toUpperCase().replace(/-/g, '_');
      const normalizedPlatformRole = user.platformRole.toUpperCase().replace(/-/g, '_');
      const normalizedTenantRole = (tenantRole || '').toUpperCase().replace(/-/g, '_');
      return normalizedPlatformRole === normalizedRole || normalizedTenantRole === normalizedRole;
    });

    if (!hasRequiredRole) {
      return <NoAccess />;
    }
  }

  return children;
}

export default ProtectedRoute;