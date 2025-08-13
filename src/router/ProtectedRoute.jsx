import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useCurrentUser } from '@/hooks/useAuth';
import { ResolvingTenant } from '../components/common/ResolvingTenant';
import { NoAccess } from '../components/common/NoAccess';

const ProtectedRoute = ({ children, roles, requireTenant = true }) => {
  const location = useLocation();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { authState } = useAuth();
  const isSelectEmployerRoute = location.pathname === '/select-employer';

  // Show loading spinner while checking auth
  if (isUserLoading) {
    return <ResolvingTenant />;
  }

  // Show loading spinner while resolving tenant
  if (authState === 'resolving-tenant' && !isSelectEmployerRoute) {
    return <ResolvingTenant />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Special case: /select-employer is accessible right after login
  if (isSelectEmployerRoute) {
    // Only allow access if user needs to select employer
    if (user.platformRole === 'USER' && !localStorage.getItem('tenant_id')) {
      return children;
    }
    // If user already has a tenant, redirect to their dashboard
    return <Navigate to={computeRedirectPath({ 
      platformRole: user.platformRole,
      tenantRole: localStorage.getItem('tenant_role')
    })} replace />;
  }

  // For tenant routes, ensure we have tenant_id and tenant_role
  if (requireTenant && !localStorage.getItem('tenant_id')) {
    return <Navigate to="/select-employer" replace />;
  }

  // If roles are specified, check if user has required role
  if (roles?.length > 0) {
    const hasRequiredRole = roles.some(role => {
      const normalizedRole = role.toUpperCase().replace(/-/g, '_');
      const normalizedPlatformRole = (user.platformRole || '').toUpperCase().replace(/-/g, '_');
      const tenantRole = localStorage.getItem('tenant_role');
      const normalizedTenantRole = (tenantRole || '').toUpperCase().replace(/-/g, '_');
      
      return normalizedPlatformRole === normalizedRole || normalizedTenantRole === normalizedRole;
    });

    if (!hasRequiredRole) {
      return <NoAccess />;
    }
  }

  return children;
};

export default ProtectedRoute;