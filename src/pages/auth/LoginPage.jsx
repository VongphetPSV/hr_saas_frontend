import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const validateLaoPhoneNumber = (phone) => {
  // Remove any spaces or dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Check if it's exactly 8 digits and starts with 2, 5, 7, or 8
  const isValid = /^[2578]\d{7}$/.test(cleanPhone);
  
  if (!isValid) {
    return 'Please enter a valid 8-digit Lao phone number starting with 2, 5, 7, or 8';
  }
  
  return '';
};

const formatPhoneNumber = (value) => {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format as XX-XXX-XXX
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5, 8)}`;
};

const LoginPage = () => {
  const { login, isLoggingIn, loginError } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow digits, spaces, and dashes
      const sanitizedValue = value.replace(/[^\d\s-]/g, '');
      const formattedValue = formatPhoneNumber(sanitizedValue);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      // Clear phone error when user starts typing
      setPhoneError('');
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPhoneError('');

    // Validate phone number
    const phoneValidationError = validateLaoPhoneNumber(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    try {
      // Remove formatting before sending to API and pass as phone_number
      const cleanPhone = formData.phone.replace(/[\s-]/g, '');
      await login({
        phone_number: cleanPhone,
        password: formData.password,
      });
      // No need to handle redirect here as it's handled in the useAuth hook
    } catch (err) {
      const errorData = err.response?.data;
      console.log('Login error details:', errorData);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (errorData) {
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // Handle validation errors array
            errorMessage = errorData.detail.map(e => e.msg || e.message || e).join(', ');
          } else {
            // Handle string error message
            errorMessage = String(errorData.detail);
          }
        } else if (errorData.message) {
          errorMessage = String(errorData.message);
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      }
      
      // Set specific error messages for phone/password fields if applicable
      if (errorMessage.toLowerCase().includes('phone')) {
        setPhoneError(errorMessage);
      } else {
        setError(errorMessage);
      }
    }
  };

  // Derive a safe, human-readable error string for rendering
  const normalizedLoginError = (() => {
    if (!loginError) return '';
    const data = loginError.response?.data;
    if (typeof data === 'string') return data;
    if (typeof data?.detail === 'string') return data.detail;
    if (Array.isArray(data?.detail)) {
      const msgs = data.detail.map((e) => e?.msg || e).filter(Boolean);
      if (msgs.length) return msgs.join(', ');
    }
    if (data?.message) return String(data.message);
    return loginError.message || 'Login failed. Please try again.';
  })();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Phone number (e.g., 20-234-567)"
                value={formData.phone}
                onChange={handleChange}
                error={phoneError}
                maxLength={11} // XX-XXX-XXX format
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {(error || normalizedLoginError) && (
            <div className="text-red-500 text-sm text-center">
              {typeof (error || normalizedLoginError) === 'string'
                ? (error || normalizedLoginError)
                : JSON.stringify(error || normalizedLoginError)}
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoggingIn}
              loading={isLoggingIn}
            >
              {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>

          <div className="text-sm text-center text-gray-600">
            Enter your 8-digit phone number starting with 2, 5, 7, or 8
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;