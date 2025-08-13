import { Navigate } from 'react-router-dom';
import { useCurrentSubscription } from '../../hooks/api/useCurrentSubscription';

const RequirePaidTenant = ({ children }) => {
  const { data: subscription, isLoading } = useCurrentSubscription();

  // Show loading state while checking subscription
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking subscription status...</p>
        </div>
      </div>
    );
  }

  // If subscription is not active, redirect to paywall
  if (!subscription || subscription.status !== 'active') {
    return <Navigate to="/billing/paywall" replace />;
  }

  // If subscription is active, render children
  return children;
};

export default RequirePaidTenant;
