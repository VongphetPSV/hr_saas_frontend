import { useAuth } from '../../hooks/useAuth.jsx';
import Card from '../../components/Card';
import { Users, Target, TrendingUp, Calendar, Clock, CheckCircle2 } from 'lucide-react';

const ManagerDashboard = () => {
  const { user } = useAuth();

  const managerStats = [
    { label: 'Team Members', value: '24', change: '+2', icon: Users, color: 'blue' },
    { label: 'Team Performance', value: '92%', change: '+5%', icon: Target, color: 'green' },
    { label: 'Active Projects', value: '8', change: '+1', icon: TrendingUp, color: 'purple' },
    { label: 'Pending Approvals', value: '5', change: '-2', icon: Clock, color: 'orange' },
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Senior Developer', status: 'Present', performance: 95 },
    { name: 'Mike Chen', role: 'UI/UX Designer', status: 'Present', performance: 88 },
    { name: 'Emily Davis', role: 'Backend Developer', status: 'On Leave', performance: 92 },
    { name: 'James Wilson', role: 'QA Engineer', status: 'Present', performance: 90 },
  ];

  const pendingApprovals = [
    { type: 'Leave Request', employee: 'Sarah Johnson', request: 'Annual Leave - 3 days', date: 'Dec 15-17' },
    { type: 'Overtime', employee: 'Mike Chen', request: 'Weekend overtime approval', date: 'This weekend' },
    { type: 'Training', employee: 'Emily Davis', request: 'React Advanced Workshop', date: 'Next month' },
    { type: 'Leave Request', employee: 'James Wilson', request: 'Sick Leave - 1 day', date: 'Tomorrow' },
  ];

  const teamGoals = [
    { goal: 'Q4 Project Delivery', progress: 78, target: 'Dec 31', status: 'on-track' },
    { goal: 'Code Quality Metrics', progress: 92, target: 'Ongoing', status: 'excellent' },
    { goal: 'Team Skill Development', progress: 65, target: 'Dec 30', status: 'needs-attention' },
    { goal: 'Client Satisfaction', progress: 88, target: 'Ongoing', status: 'good' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'on-track': return 'text-purple-600';
      case 'needs-attention': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-green-100">Welcome {user?.name}! Lead your team to success and track performance.</p>
        {user?.tenant && (
          <p className="text-green-200 text-sm mt-1">Organization: {user.tenant.name}</p>
        )}
      </div>

      {/* Manager Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {managerStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change} this month
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
        {/* Team Overview */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Overview</h3>
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Performance: {member.performance}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{approval.type}</p>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Pending
                  </span>
                </div>
                <p className="text-xs text-gray-600">{approval.employee}</p>
                <p className="text-xs text-gray-600">{approval.request}</p>
                <p className="text-xs text-gray-500 mt-1">{approval.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team Goals & Progress */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Goals & Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamGoals.map((goal, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Target: {goal.target}</span>
                <span className={getStatusColor(goal.status)}>
                  {goal.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Manager Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <CheckCircle2 className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Approve Requests</h4>
            <p className="text-sm text-gray-600">Review pending approvals</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Team Performance</h4>
            <p className="text-sm text-gray-600">View detailed analytics</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Schedule Meeting</h4>
            <p className="text-sm text-gray-600">Organize team meetings</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Target className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Set Goals</h4>
            <p className="text-sm text-gray-600">Define team objectives</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ManagerDashboard;