import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser, PlatformRole } from '@/hooks/useAuth';
import NoAccess from '@/components/common/NoAccess';

interface ProtectedRouteProps {
  children: JSX.Element;
  requirePlatformRole?: PlatformRole[];
}

export default function ProtectedRoute({ children, requirePlatformRole }: ProtectedRouteProps) {
  const { data: user, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) return null; // or a spinner

  if (!user) {
    // not logged in -> go to login, keep where we were going
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requirePlatformRole && !requirePlatformRole.includes(user.platform_role)) {
    return <NoAccess />;
  }

  return children;
}