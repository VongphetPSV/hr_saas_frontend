import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Building2, ArrowLeft, RefreshCw } from 'lucide-react';

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const phone = location.state?.phone || '+66 xxx xxx xxx';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.slice(0, 6).split('');
    
    if (pastedOtp.every(digit => !isNaN(digit))) {
      setOtp(pastedOtp.concat(Array(6 - pastedOtp.length).fill('')));
      inputRefs.current[Math.min(pastedOtp.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpCode === '123456') {
        navigate('/dashboard');
      } else {
        setError('Invalid OTP code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    setError('');
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('OTP resent to:', phone);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card padding="lg" shadow="lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building2 size={32} className="text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">HRM SaaS</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Phone</h2>
            <p className="text-gray-600">
              We've sent a 6-digit code to{' '}
              <span className="font-semibold text-gray-900">{phone}</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              ))}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              loading={loading}
              disabled={otp.join('').length !== 6}
            >
              Verify OTP
            </Button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-500 font-medium mx-auto"
              >
                <RefreshCw size={16} />
                <span>Resend OTP</span>
              </button>
            ) : (
              <p className="text-gray-600">
                Resend OTP in{' '}
                <span className="font-semibold text-primary-600">{countdown}s</span>
              </p>
            )}
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto"
            >
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </button>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo:</strong> Use OTP code <span className="font-mono">123456</span> to proceed
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OTPPage;