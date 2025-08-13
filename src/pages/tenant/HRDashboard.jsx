import { useAuth } from '@/hooks/useAuth';
import Card from '../../components/Card';
import { Users, UserCheck, Calendar, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const HRDashboard = () => {
  const { user } = useAuth();

  const hrStats = [
    { label: 'Total Employees', value: '245', change: '+8', icon: Users, color: 'blue' },
    { label: 'Present Today', value: '228', percentage: 93, icon: UserCheck, color: 'green' },
    { label: 'Pending Leaves', value: '12', priority: 'medium', icon: Calendar, color: 'yellow' },
    { label: 'Late Arrivals', value: '5', trend: 'down', icon: Clock, color: 'red' },
  ];

  const recentActivities = [
    { action: 'New employee onboarded', employee: 'Sarah Johnson - Marketing', time: '2 hours ago', type: 'success' },
    { action: 'Leave request approved', employee: 'Mike Chen - Engineering', time: '4 hours ago', type: 'info' },
    { action: 'Attendance alert', employee: 'James Wilson - Sales', time: '1 day ago', type: 'warning' },
    { action: 'Document uploaded', employee: 'Emma Davis - HR', time: '2 days ago', type: 'info' },
  ];

  const pendingTasks = [
    { task: 'Review 3 leave applications', priority: 'high', due: 'Today' },
    { task: 'Conduct quarterly performance reviews', priority: 'medium', due: 'This week' },
    { task: 'Update employee handbook', priority: 'low', due: 'Next week' },
    { task: 'Organize team building event', priority: 'medium', due: 'Next month' },
  ];

  const upcomingEvents = [
    { event: 'All Hands Meeting', date: 'Today 3:00 PM', attendees: 245 },
    { event: 'New Hire Orientation', date: 'Tomorrow 9:00 AM', attendees: 5 },
    { event: 'Performance Review Training', date: 'Friday 2:00 PM', attendees: 12 },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Here's your HR overview for today at {user?.tenant?.name || 'Your Company'}.</p>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.percentage && (
                    <p className="text-sm text-green-600">
                      {stat.percentage}% attendance rate
                    </p>
                  )}
                  {stat.change && (
                    <p className="text-sm text-green-600">
                      {stat.change} new this month
                    </p>
                  )}
                  {stat.priority && (
                    <p className={`text-sm ${
                      stat.priority === 'high' ? 'text-red-600' :
                      stat.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {stat.priority} priority
                    </p>
                  )}
                  {stat.trend && (
                    <p className="text-sm text-green-600">
                      ↓ Improved from yesterday
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100 ml-4`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.employee}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
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
      </div>

      {/* Upcoming Events */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="text-primary-600" size={16} />
                <h4 className="font-medium text-gray-900">{event.event}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-1">{event.date}</p>
              <p className="text-xs text-gray-500">{event.attendees} attendees</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Add Employee</h4>
            <p className="text-sm text-gray-600">Onboard new team member</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Manage Leaves</h4>
            <p className="text-sm text-gray-600">Review leave applications</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <UserCheck className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Attendance</h4>
            <p className="text-sm text-gray-600">View attendance reports</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <TrendingUp className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Analytics</h4>
            <p className="text-sm text-gray-600">HR metrics and insights</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default HRDashboard;