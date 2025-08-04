import { useAuth } from '../../hooks/useAuth.jsx';
import Card from '../../components/Card';
import { Clock, Calendar, FileText, Users, CheckCircle, AlertCircle } from 'lucide-react';

const StaffDashboard = () => {
  const { user } = useAuth();

  const todayStats = [
    { label: 'Check-in Time', value: '9:15 AM', status: 'on-time', icon: Clock, color: 'green' },
    { label: 'Hours Worked', value: '6.5h', target: '8h', icon: Clock, color: 'blue' },
    { label: 'Tasks Completed', value: '4/7', percentage: 57, icon: CheckCircle, color: 'purple' },
    { label: 'Leave Balance', value: '12 days', type: 'Annual', icon: Calendar, color: 'yellow' },
  ];

  const myTasks = [
    { task: 'Complete monthly report', department: 'Finance', due: 'Today 5:00 PM', priority: 'high', completed: false },
    { task: 'Review contract documents', department: 'Legal', due: 'Tomorrow', priority: 'medium', completed: false },
    { task: 'Team meeting preparation', department: 'Operations', due: 'Friday', priority: 'low', completed: true },
    { task: 'Client presentation slides', department: 'Sales', due: 'Next week', priority: 'medium', completed: false },
  ];

  const recentAnnouncements = [
    { title: 'Office Holiday Schedule', content: 'Please note the updated holiday calendar for next month.', time: '2 hours ago', important: true },
    { title: 'New Company Policy', content: 'Remote work policy has been updated. Please review the changes.', time: '1 day ago', important: false },
    { title: 'Team Building Event', content: 'Join us for the quarterly team building event next Friday.', time: '2 days ago', important: false },
  ];

  const upcomingEvents = [
    { event: 'Weekly Team Standup', time: 'Today 2:00 PM', type: 'meeting', participants: ['John', 'Sarah', 'Mike'] },
    { event: 'Training: New Software', time: 'Tomorrow 10:00 AM', type: 'training', participants: ['All Staff'] },
    { event: 'Monthly Review Meeting', time: 'Friday 3:00 PM', type: 'review', participants: ['Manager', 'HR'] },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return '📝';
      case 'training': return '🎓';
      case 'review': return '📊';
      default: return '📅';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}!</h1>
        <p className="text-purple-100">Ready to make today productive? Here's your personal dashboard.</p>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.status && (
                    <p className={`text-sm ${
                      stat.status === 'on-time' ? 'text-green-600' : 
                      stat.status === 'late' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {stat.status === 'on-time' ? '✓ On time' : stat.status}
                    </p>
                  )}
                  {stat.target && (
                    <p className="text-sm text-gray-600">Target: {stat.target}</p>
                  )}
                  {stat.percentage && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{stat.percentage}% complete</p>
                    </div>
                  )}
                  {stat.type && (
                    <p className="text-sm text-gray-600">{stat.type} leave</p>
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
        {/* My Tasks */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
          <div className="space-y-3">
            {myTasks.map((task, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                task.completed ? 'bg-green-50 border-l-green-500' : 'bg-gray-50 border-l-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {task.completed ? (
                      <CheckCircle className="text-green-600" size={16} />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    )}
                    <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.task}
                    </h4>
                  </div>
                  {!task.completed && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{task.department}</p>
                <p className="text-xs text-gray-500 mt-1">Due: {task.due}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Announcements</h3>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                announcement.important ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {announcement.important && <AlertCircle className="text-red-600" size={16} />}
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{announcement.time}</p>
                  </div>
                </div>
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
            <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                <h4 className="font-medium text-gray-900">{event.event}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{event.time}</p>
              <div className="flex items-center space-x-1">
                <Users size={12} className="text-gray-500" />
                <p className="text-xs text-gray-500">
                  {Array.isArray(event.participants) ? event.participants.join(', ') : event.participants}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Request Leave</h4>
            <p className="text-sm text-gray-600">Submit leave application</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Clock className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Time Sheet</h4>
            <p className="text-sm text-gray-600">View attendance records</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <FileText className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Documents</h4>
            <p className="text-sm text-gray-600">Access personal documents</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Directory</h4>
            <p className="text-sm text-gray-600">Find team members</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default StaffDashboard;