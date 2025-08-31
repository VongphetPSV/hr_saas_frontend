import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { Building2, ArrowLeft, Phone, Mail, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: request, 2: success
  const [method, setMethod] = useState('phone'); // phone or email
  const [formData, setFormData] = useState({
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card padding="lg" shadow="lg">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Building2 size={32} className="text-primary-600" />
                <h1 className="text-2xl font-bold text-gray-900">HRM SaaS</h1>
              </div>
              
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your {method === 'phone' ? 'Phone' : 'Email'}</h2>
              <p className="text-gray-600 mb-8">
                We've sent password reset instructions to{' '}
                <span className="font-semibold text-gray-900">
                  {method === 'phone' ? formData.phone : formData.email}
                </span>
              </p>

              <div className="space-y-4">
                <Button 
                  onClick={() => method === 'phone' ? navigate('/otp') : null}
                  className="w-full" 
                  size="lg"
                >
                  {method === 'phone' ? 'Enter Verification Code' : 'Open Email App'}
                </Button>
                
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Login</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card padding="lg" shadow="lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building2 size={32} className="text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">HRM SaaS</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-600">
              Choose how you'd like to reset your password
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Method Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod('phone')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  method === 'phone'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Phone size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">SMS</span>
              </button>
              <button
                onClick={() => setMethod('email')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  method === 'email'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Mail size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Email</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {method === 'phone' ? (
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+66 xx xxx xxxx"
                required
              />
            ) : (
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@company.com"
                required
              />
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              loading={loading}
              disabled={method === 'phone' ? !formData.phone : !formData.email}
            >
              Send Reset Instructions
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Remember your password?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign In
              </Link>
            </p>
            
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto"
            >
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;