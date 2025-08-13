import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export const NoAccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="rounded-full bg-red-100 p-3">
        <XCircle className="h-8 w-8 text-red-600" />
      </div>
      <h2 className="mt-4 text-lg font-medium text-gray-900">
        Access Denied
      </h2>
      <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
        You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};
