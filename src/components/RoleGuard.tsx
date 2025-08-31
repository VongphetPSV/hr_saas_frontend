import { useAuth } from '@/hooks/useAuth';

import { RoleGuardProps } from '@/types/auth';
import { PlatformRole, TenantRole } from '@/types/core';

interface Props extends RoleGuardProps {
  allowedRoles?: Array<PlatformRole | TenantRole>;
  allowPlatform?: boolean;
  allowTenant?: boolean;
}

const RoleGuard: React.FC<Props> = ({ children, allowedRoles, allowPlatform = false, allowTenant = false }) => {
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