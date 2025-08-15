import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEmployers } from '@/hooks/api/useEmployers';
import Button from '../components/Button';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import { Building2, Search, ArrowRight, Users } from 'lucide-react';

const SelectEmployerPage = () => {
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: employers = [], isLoading, error } = useEmployers();

  // Handle auto-selection when only one employer is available
  useEffect(() => {
    if (!isLoading && employers.length === 1) {
      setSelectedEmployer(employers[0]);
    }
  }, [employers, isLoading]);

  // Mock employers data for development
  const mockEmployers = [
    {
      id: 1,
      name: 'Acme Corporation',
      domain: 'acme-corp',
      employees: 245,
      industry: 'Technology',
      logo: '🏢',
      description: 'Leading technology solutions provider'
    },
    {
      id: 2,
      name: 'Global Manufacturing Ltd',
      domain: 'global-mfg',
      employees: 1200,
      industry: 'Manufacturing',
      logo: '🏭',
      description: 'International manufacturing company'
    },
    {
      id: 3,
      name: 'Creative Agency Plus',
      domain: 'creative-plus',
      employees: 85,
      industry: 'Marketing & Design',
      logo: '🎨',
      description: 'Full-service creative and marketing agency'
    },
    {
      id: 4,
      name: 'FinTech Solutions',
      domain: 'fintech-sol',
      employees: 320,
      industry: 'Financial Services',
      logo: '💰',
      description: 'Innovative financial technology solutions'
    }
  ];

  // Use real employers data if available, fallback to mock data for development
  const activeEmployers = employers.length > 0 ? employers : mockEmployers;
  
  const filteredEmployers = activeEmployers.filter(employer =>
    employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employer.industry || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateMockTenantToken = (employer, userRole) => {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (24 * 60 * 60); // 24 hours

    const payload = {
      sub: user?.id || '123456789',
      name: user?.name || 'Demo User',
      email: user?.email || 'user@demo.com',
      tenant_roles: [userRole],
      tenant: {
        id: employer.id,
        name: employer.name,
        domain: employer.domain
      },
      iat: now,
      exp: exp
    };

    // Simple base64 encoding for demo (not secure, for demo only)
    return 'mock_token_' + btoa(JSON.stringify(payload));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginResult, setLoginResult] = useState(null);

  const handleSelectEmployer = async () => {
    if (!selectedEmployer || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // For demo purposes, assign a default role based on user or use 'staff'
      const defaultRole = user?.platform_role === 'user' ? 'staff' : 'admin';
      
      // Generate mock tenant token
      const tenantToken = generateMockTenantToken(selectedEmployer, defaultRole);
      
      // Login with tenant token
      const result = await login(tenantToken, 'tenant');
      setLoginResult(result);
    } catch (error) {
      console.error('Failed to set tenant context:', error);
      setLoginResult({ success: false, error });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle navigation after successful login
  useEffect(() => {
    if (loginResult?.success) {
      navigate(loginResult.redirectTo, { replace: true });
    } else if (loginResult?.error) {
      // Handle error case - could show error message
      console.error('Login failed:', loginResult.error);
    }
  }, [loginResult, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card padding="lg" shadow="lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building2 size={32} className="text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">HRM SaaS</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Employer</h2>
            <p className="text-gray-600">
              Hello {user?.name}, please select your employer to continue
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Spinner size="lg" />
              <p className="mt-4 text-gray-600">Loading employers...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load employers. Please try again later.</p>
            </div>
          )}

          {/* Employers Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filteredEmployers.map((employer) => (
              <div
                key={employer.id}
                onClick={() => setSelectedEmployer(employer)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEmployer?.id === employer.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{employer.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {employer.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{employer.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{employer.employees} employees</span>
                      </div>
                      <span>•</span>
                      <span>{employer.industry}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Domain: {employer.domain}.hrm.company
                    </p>
                  </div>
                  {selectedEmployer?.id === employer.id && (
                    <div className="text-primary-600">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          )}

          {!isLoading && !error && filteredEmployers.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-500">No employers found matching your search.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back to Login
            </button>
            
            <Button
              onClick={handleSelectEmployer}
              disabled={!selectedEmployer || isSubmitting}
              loading={isSubmitting}
              size="lg"
              className="min-w-32"
            >
              {isSubmitting ? 'Selecting...' : 'Continue'}
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Can't find your employer?</strong> Contact your HR administrator or 
              email support@hrmsaas.com for assistance.
            </p>
            {user?.platform_role && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-700">
                  <strong>Platform User:</strong> You have platform role "{user.platform_role}". 
                  Select an employer to access tenant-specific features.
                </p>
              </div>
            )}
          </div>

          {/* Demo Note */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Selecting an employer will assign you a default tenant role based on your platform permissions.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SelectEmployerPage;