import { useAuth } from '@/hooks/useAuth';
import Card from '../../components/Card';
import { Users, Settings, Shield, Database, Activity, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const adminStats = [
    { label: 'Total Employees', value: '248', change: '+12', icon: Users, color: 'blue' },
    { label: 'Active Sessions', value: '189', change: '+8%', icon: Activity, color: 'green' },
    { label: 'System Health', value: '98.5%', change: '+1%', icon: Shield, color: 'purple' },
    { label: 'Storage Usage', value: '67%', change: '+5%', icon: Database, color: 'orange' },
  ];

  const systemTasks = [
    { task: 'Review security permissions', priority: 'high', due: 'Today' },
    { task: 'Update employee access policies', priority: 'medium', due: 'This week' },
    { task: 'Backup database configurations', priority: 'low', due: 'Next week' },
    { task: 'Audit user activity logs', priority: 'medium', due: 'Tomorrow' },
  ];

  const recentAdminActions = [
    { action: 'User permissions updated', user: 'John Smith', time: '30 minutes ago' },
    { action: 'New department created', department: 'Data Analytics', time: '2 hours ago' },
    { action: 'System backup completed', status: 'Success', time: '6 hours ago' },
    { action: 'Security policy updated', module: 'Authentication', time: '1 day ago' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-indigo-100">Welcome {user?.name}! Manage your organization's HR system and users.</p>
        {user?.tenant && (
          <p className="text-indigo-200 text-sm mt-1">Organization: {user.tenant.name}</p>
        )}
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => {
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
        {/* System Tasks */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Tasks</h3>
          <div className="space-y-3">
            {systemTasks.map((task, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Due: {task.due}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Admin Actions */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Admin Activities</h3>
          <div className="space-y-3">
            {recentAdminActions.map((action, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{action.action}</p>
                <p className="text-xs text-gray-600">
                  {action.user && `User: ${action.user}`}
                  {action.department && `Department: ${action.department}`}
                  {action.status && `Status: ${action.status}`}
                  {action.module && `Module: ${action.module}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">{action.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Health Overview */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800">System Status</h4>
            <p className="text-sm text-green-600 mt-1">All services operational</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800">Last Backup</h4>
            <p className="text-sm text-blue-600 mt-1">6 hours ago - Success</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800">Pending Updates</h4>
            <p className="text-sm text-yellow-600 mt-1">3 security patches available</p>
          </div>
        </div>
      </Card>

      {/* Quick Admin Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">User Management</h4>
            <p className="text-sm text-gray-600">Manage users and permissions</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">System Settings</h4>
            <p className="text-sm text-gray-600">Configure system preferences</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Shield className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Security Center</h4>
            <p className="text-sm text-gray-600">Manage security settings</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Database className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Data Management</h4>
            <p className="text-sm text-gray-600">Backup and restore data</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;