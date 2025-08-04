import { useAuth } from '../hooks/useAuth.jsx';

const RoleGuard = ({ children, allowedRoles, allowPlatform = false, allowTenant = false }) => {
  const { user, isPlatformRole, isTenantRole } = useAuth();

  if (!user) {
    return null;
  }

  // Check specific roles
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return null;
    }
  }

  // Check platform roles
  if (allowPlatform && !isPlatformRole()) {
    return null;
  }

  // Check tenant roles
  if (allowTenant && !isTenantRole()) {
    return null;
  }

  return children;
};

export default RoleGuard;