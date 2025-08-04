import { useAuth } from '../../hooks/useAuth.jsx';
import Card from '../../components/Card';
import { Target, TrendingUp, Users, DollarSign, Phone, Calendar } from 'lucide-react';

const SalesDashboard = () => {
  const { user } = useAuth();

  const salesStats = [
    { label: 'Monthly Target', value: '$50,000', progress: 78, icon: Target, color: 'blue' },
    { label: 'Deals Closed', value: '23', change: '+5', icon: TrendingUp, color: 'green' },
    { label: 'Active Leads', value: '47', change: '+12', icon: Users, color: 'yellow' },
    { label: 'Revenue This Month', value: '$39,200', change: '+$8,500', icon: DollarSign, color: 'green' },
  ];

  const recentLeads = [
    { company: 'TechStart Inc', contact: 'John Smith', value: '$15,000', status: 'Negotiation', priority: 'high' },
    { company: 'Global Manufacturing', contact: 'Sarah Johnson', value: '$25,000', status: 'Proposal', priority: 'medium' },
    { company: 'Creative Agency', contact: 'Mike Wilson', value: '$8,500', status: 'Demo', priority: 'low' },
    { company: 'Financial Services Ltd', contact: 'Emily Chen', value: '$35,000', status: 'Qualified', priority: 'high' },
  ];

  const upcomingTasks = [
    { task: 'Follow up with TechStart Inc', time: '10:00 AM', type: 'call' },
    { task: 'Product demo for Global Manufacturing', time: '2:00 PM', type: 'meeting' },
    { task: 'Send proposal to Creative Agency', time: '4:00 PM', type: 'email' },
    { task: 'Weekly sales review', time: 'Tomorrow 9:00 AM', type: 'meeting' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'negotiation': return 'bg-yellow-100 text-yellow-800';
      case 'proposal': return 'bg-blue-100 text-blue-800';
      case 'demo': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-green-100">Let's close some deals today! You're 78% towards your monthly target.</p>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.progress && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{stat.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stat.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {stat.change && (
                    <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
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
        {/* Recent Leads */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Leads</h3>
          <div className="space-y-3">
            {recentLeads.map((lead, index) => (
              <div key={index} className={`p-4 bg-gray-50 rounded-lg border-l-4 ${getPriorityColor(lead.priority)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{lead.company}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{lead.contact}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-green-600">{lead.value}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    lead.priority === 'high' ? 'bg-red-100 text-red-700' :
                    lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {lead.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {task.type === 'call' && <Phone className="text-blue-600" size={16} />}
                  {task.type === 'meeting' && <Calendar className="text-green-600" size={16} />}
                  {task.type === 'email' && <Users className="text-purple-600" size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-600">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Add Lead</h4>
            <p className="text-sm text-gray-600">Create new sales opportunity</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Schedule Demo</h4>
            <p className="text-sm text-gray-600">Book product demonstration</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <TrendingUp className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">View Pipeline</h4>
            <p className="text-sm text-gray-600">Analyze sales pipeline</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Target className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Reports</h4>
            <p className="text-sm text-gray-600">Generate sales reports</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SalesDashboard;