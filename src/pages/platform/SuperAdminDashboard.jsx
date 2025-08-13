import { useAuth } from '../../hooks/useAuth.js';
import Card from '../../components/Card';
import { Users, Building2, TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  
  // Log user data to verify structure
  console.log('Dashboard user data:', user);

  const stats = [
    { label: 'Total Tenants', value: '156', change: '+12%', icon: Building2, color: 'blue' },
    { label: 'Active Users', value: '12,482', change: '+8%', icon: Users, color: 'green' },
    { label: 'Monthly Revenue', value: '$89,420', change: '+15%', icon: DollarSign, color: 'yellow' },
    { label: 'System Health', value: '99.8%', change: '0%', icon: Activity, color: 'green' },
  ];

  const recentActivity = [
    { action: 'New tenant registered', tenant: 'Acme Corp', time: '2 minutes ago' },
    { action: 'System maintenance completed', tenant: 'Platform', time: '1 hour ago' },
    { action: 'Payment received', tenant: 'Tech Solutions Ltd', time: '3 hours ago' },
    { action: 'Support ticket resolved', tenant: 'Global Industries', time: '5 hours ago' },
  ];

  const alerts = [
    { type: 'warning', message: 'Server CPU usage is above 80%', time: '10 minutes ago' },
    { type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.full_name || 'Admin'}!
        </h1>
        <p className="text-primary-100">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <div className="mt-1">
                    <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-emerald-100' :
                  stat.color === 'yellow' ? 'bg-amber-100' : 'bg-slate-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-emerald-600' :
                    stat.color === 'yellow' ? 'text-amber-600' : 'text-slate-600'
                  }`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.tenant}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* System Alerts */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <AlertCircle className={alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'} size={16} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Building2 className="text-primary-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Manage Tenants</h4>
            <p className="text-sm text-gray-600">View and manage all tenant accounts</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <TrendingUp className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Platform Analytics</h4>
            <p className="text-sm text-gray-600">View detailed platform metrics</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">User Management</h4>
            <p className="text-sm text-gray-600">Manage platform and tenant users</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;