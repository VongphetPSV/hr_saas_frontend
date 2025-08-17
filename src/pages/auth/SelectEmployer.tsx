import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ChevronRight } from 'lucide-react';
import { useEmployers, type Employer } from '@/hooks/api/useEmployers';
import Spinner from '../../components/Spinner';

const ROLES_TO_ROUTES = {
  hr: '/hr-dashboard',
  admin: '/admin-dashboard',
  manager: '/manager-dashboard',
  staff: '/staff-dashboard',
  finance: '/finance-dashboard',
  director: '/director-dashboard',
} as const;

const SelectEmployer = () => {
  const navigate = useNavigate();
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const { data: employers, isLoading, error } = useEmployers();

  // Try to load cached employers on mount
  useEffect(() => {
    const cached = sessionStorage.getItem('employers');
    if (cached && !employers) {
      const parsedEmployers = JSON.parse(cached);
      if (parsedEmployers.length === 1) {
        handleSelectEmployer(parsedEmployers[0]);
      }
    }
  }, []);

  // Cache employers when received
  useEffect(() => {
    if (employers?.length > 0) {
      sessionStorage.setItem('employers', JSON.stringify(employers));
      if (employers.length === 1) {
        handleSelectEmployer(employers[0]);
      }
    }
  }, [employers]);

  const handleSelectEmployer = (employer: Employer) => {
    setSelectedEmployer(employer);
    localStorage.setItem('tenant_id', employer.id);
    localStorage.setItem('tenant_role', employer.type || 'staff');
    
    const role = (employer.type || 'staff').toLowerCase();
    const redirectPath = ROLES_TO_ROUTES[role as keyof typeof ROLES_TO_ROUTES];
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    } else {
      console.error('Unknown tenant role:', role);
      navigate('/', { replace: true });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('tenant_id');
    localStorage.removeItem('tenant_role');
    sessionStorage.removeItem('employers');
    navigate('/auth/login', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Spinner className="h-8 w-8 text-primary-600" />
        <p className="mt-4 text-sm text-gray-600">Loading your organizations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
            <Building2 className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Error Loading Organizations
          </h2>
          <p className="text-sm text-gray-500">
            {(error as any)?.response?.data?.message || 'Failed to load your organizations. Please try again.'}
          </p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (!employers?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
            <Building2 className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            No Available Organizations
          </h2>
          <p className="text-sm text-gray-500">
            You don't have access to any organizations. Please contact your administrator for assistance.
          </p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Select Organization
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Choose an organization to continue
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {employers.map((employer) => (
            <button
              key={employer.id}
              onClick={() => handleSelectEmployer(employer)}
              className="w-full flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Building2 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {employer.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {employer.type?.toLowerCase() || 'Staff'}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectEmployer;
