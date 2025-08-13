import { Link } from 'react-router-dom';
import { useCurrentSubscription } from '../../hooks/api/useCurrentSubscription';
import Button from '../../components/Button';
import Card from '../../components/Card';

const Paywall = () => {
  const { data: subscription } = useCurrentSubscription();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg text-center">
        <div className="space-y-6 p-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription {subscription?.status || 'Inactive'}
          </h1>

          {/* Message */}
          <div className="text-gray-600 space-y-4">
            <p>
              Your subscription is currently not active. To access HR modules, please
              ensure your subscription is up to date.
            </p>
            {subscription?.status === 'expired' && (
              <p className="text-red-600">
                Your subscription expired on{' '}
                {new Date(subscription.expiry_date).toLocaleDateString()}
              </p>
            )}
            {subscription?.status === 'suspended' && (
              <p className="text-red-600">
                Your subscription has been suspended due to payment issues.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link to="/billing">
              <Button variant="primary" className="w-full">
                View Invoices
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at support@example.com
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Paywall;
