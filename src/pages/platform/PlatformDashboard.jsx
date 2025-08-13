import { useAuth } from '../../hooks/useAuth.jsx';
import Card from '../../components/Card';
import { Settings, Users, BarChart3, Shield, Database, Globe } from 'lucide-react';

const PlatformDashboard = () => {
  const { user } = useAuth();

  const platformStats = [
    { label: 'Total Organizations', value: '89', change: '+7%', icon: Users, color: 'blue' },
    { label: 'Platform Health', value: '99.9%', change: '0%', icon: Shield, color: 'green' },
    { label: 'Active Users', value: '2,847', change: '+12%', icon: Globe, color: 'purple' },
    { label: 'Storage Used', value: '2.4TB', change: '+8%', icon: Database, color: 'orange' },
  ];

  const systemAlerts = [
    { type: 'info', message: 'System backup completed successfully', time: '5 minutes ago' },
    { type: 'warning', message: 'High memory usage detected on Server 2', time: '1 hour ago' },
    { type: 'success', message: 'Security patch deployed to all instances', time: '3 hours ago' },
  ];

  const recentActivities = [
    { action: 'New organization registered', details: 'TechCorp Solutions - 150 users', time: '10 minutes ago' },
    { action: 'Platform configuration updated', details: 'Email service settings modified', time: '2 hours ago' },
    { action: 'Security audit completed', details: 'All systems passed compliance check', time: '1 day ago' },
    { action: 'Database optimization performed', details: 'Query performance improved by 15%', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Platform Manager Dashboard</h1>
        <p className="text-purple-100">Welcome back, {user?.name}! Monitor and manage the entire platform ecosystem.</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-yellow-50 border-l-yellow-400' :
                alert.type === 'success' ? 'bg-green-50 border-l-green-400' :
                'bg-blue-50 border-l-blue-400'
              }`}>
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-600">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Management Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">System Configuration</h4>
            <p className="text-sm text-gray-600">Manage platform-wide settings</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Organization Management</h4>
            <p className="text-sm text-gray-600">Oversee tenant organizations</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <BarChart3 className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Analytics & Reports</h4>
            <p className="text-sm text-gray-600">Platform usage and performance</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PlatformDashboard;