import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useAuth';
import { ResolvingTenant } from '../components/common/ResolvingTenant';
import { NoAccess } from '../components/common/NoAccess';

const ProtectedRoute = ({ children, roles, requireTenant = true }) => {
  const location = useLocation();
  const { data: user, isLoading, error } = useCurrentUser();
  const isSelectEmployerRoute = location.pathname === '/select-employer';

  // Show loading spinner while checking auth
  if (isLoading) {
    return <ResolvingTenant />;
  }

  // Redirect to login if not authenticated
  if (!user || error) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Special case: /select-employer is accessible right after login
  if (isSelectEmployerRoute) {
    return children;
  }

  // For tenant routes, ensure we have tenant_id and tenant_role
  if (requireTenant && !localStorage.getItem('tenant_id')) {
    return <Navigate to="/select-employer" replace />;
  }

  // If roles are specified, check if user has required role
  if (roles?.length > 0) {
    const hasRequiredRole = roles.some(role => {
      const normalizedRole = role.toUpperCase().replace(/-/g, '_');
      const normalizedPlatformRole = (user.platform_role || '').toUpperCase().replace(/-/g, '_');
      const tenantRole = localStorage.getItem('tenant_role');
      const normalizedTenantRole = (tenantRole || '').toUpperCase().replace(/-/g, '_');
      
      // Special case: 'super_admin' matches 'ADMIN'
      if (normalizedRole === 'SUPER_ADMIN' && normalizedPlatformRole === 'ADMIN') {
        return true;
      }
      
      return normalizedPlatformRole === normalizedRole || normalizedTenantRole === normalizedRole;
    });

    if (!hasRequiredRole) {
      return <NoAccess />;
    }
  }

  return children;
};

export default ProtectedRoute;