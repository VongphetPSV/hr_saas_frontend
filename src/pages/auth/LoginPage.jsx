import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { Building2, Phone, Lock, Globe } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en'); // en, th, or lo
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'HRM SaaS Platform',
      subtitle: 'Sign in to your account',
      phone: 'Phone Number',
      password: 'Password',
      signin: 'Sign In',
      forgotPassword: 'Forgot your password?',
      noAccount: "Don't have an account?",
      contactAdmin: 'Contact Administrator',
      orContinueWith: 'Or continue with',
      welcomeBack: 'Welcome back',
      secureLogin: 'Secure login to your HRM dashboard'
    },
    th: {
      title: 'แพลตฟอร์ม HRM SaaS',
      subtitle: 'เข้าสู่ระบบบัญชีของคุณ',
      phone: 'หมายเลขโทรศัพท์',
      password: 'รหัสผ่าน',
      signin: 'เข้าสู่ระบบ',
      forgotPassword: 'ลืมรหัสผ่าน?',
      noAccount: 'ไม่มีบัญชี?',
      contactAdmin: 'ติดต่อผู้ดูแลระบบ',
      orContinueWith: 'หรือเข้าสู่ระบบด้วย',
      welcomeBack: 'ยินดีต้อนรับกลับ',
      secureLogin: 'เข้าสู่ระบบอย่างปลอดภัยสู่แดชบอร์ด HRM ของคุณ'
    },
    lo: {
      title: 'ແພລດຟອມ HRM SaaS',
      subtitle: 'ເຂົ້າສູ່ລະບົບບັນຊີຂອງເຈົ້າ',
      phone: 'ເບີໂທລະສັບ',
      password: 'ລະຫັດຜ່ານ',
      signin: 'ເຂົ້າສູ່ລະບົບ',
      forgotPassword: 'ລືມລະຫັດຜ່ານ?',
      noAccount: 'ບໍ່ມີບັນຊີ?',
      contactAdmin: 'ຕິດຕໍ່ຜູ້ຄຸ້ມຄອງລະບົບ',
      orContinueWith: 'ຫຼືເຂົ້າສູ່ລະບົບດ້ວຍ',
      welcomeBack: 'ຍິນດີຕ້ອນຮັບກັບຄືນ',
      secureLogin: 'ເຂົ້າສູ່ລະບົບຢ່າງປອດໄພສູ່ແດັສບອດ HRM ຂອງເຈົ້າ'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call - Replace with actual authentication
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwidGVuYW50IjoiYWNtZS1jb3JwIiwiZW1haWwiOiJqb2huQGFjbWUuY29tIiwiZXhwIjoxNzM3MzE0MDM3fQ.ZXLpF7xj6yx-TaoJX3FIsyV9nAd8Cn5RtPgp7YfM5T4';
      
      if (login(mockToken)) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <Building2 size={40} />
            <h1 className="text-3xl font-bold">{t.title}</h1>
          </div>
          <div className="mt-12">
            <h2 className="text-4xl font-bold mb-4">{t.welcomeBack}</h2>
            <p className="text-xl text-primary-100">{t.secureLogin}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-primary-700/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Multi-tenant Architecture</h3>
            <p className="text-primary-100">Secure, scalable HRM solution for organizations of all sizes</p>
          </div>
          <div className="bg-primary-700/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Role-based Access</h3>
            <p className="text-primary-100">Granular permissions for platform and tenant administrators</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                const nextLanguage = language === 'en' ? 'th' : language === 'th' ? 'lo' : 'en';
                setLanguage(nextLanguage);
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Globe size={16} />
              <span>
                {language === 'en' ? 'ไทย' : language === 'th' ? 'ລາວ' : 'ENG'}
              </span>
            </button>
          </div>

          <Card padding="lg" shadow="lg">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
                <Building2 size={32} className="text-primary-600" />
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.subtitle}</h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label={t.phone}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+66 xx xxx xxxx"
                required
                className="pl-10"
              />
              <div className="absolute left-3 top-9 text-gray-400">
                <Phone size={16} />
              </div>

              <div className="relative">
                <Input
                  label={t.password}
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
                <div className="absolute left-3 top-9 text-gray-400">
                  <Lock size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                  {t.forgotPassword}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                loading={loading}
                disabled={!formData.phone || !formData.password}
              >
                {t.signin}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.noAccount}{' '}
                <Link to="/contact" className="text-primary-600 hover:text-primary-500 font-medium">
                  {t.contactAdmin}
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Admin:</strong> +66123456789 / admin123</p>
                <p><strong>HR:</strong> +66987654321 / hr123</p>
                <p><strong>Staff:</strong> +66555666777 / staff123</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;