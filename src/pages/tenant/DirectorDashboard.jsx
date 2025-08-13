import { useAuth } from '@/hooks/useAuth';
import Card from '../../components/Card';
import { TrendingUp, Users, Target, BarChart3, Award, Globe } from 'lucide-react';

const DirectorDashboard = () => {
  const { user } = useAuth();

  const executiveMetrics = [
    { label: 'Company Performance', value: '94%', change: '+8%', icon: TrendingUp, color: 'green' },
    { label: 'Employee Satisfaction', value: '87%', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Strategic Goals', value: '76%', change: '+15%', icon: Target, color: 'purple' },
    { label: 'Revenue Growth', value: '+24%', change: '+6%', icon: BarChart3, color: 'orange' },
  ];

  const departmentOverview = [
    { name: 'Engineering', headcount: 45, performance: 92, budget: 78, growth: '+8%' },
    { name: 'Sales & Marketing', headcount: 28, performance: 88, budget: 85, growth: '+12%' },
    { name: 'Operations', headcount: 18, performance: 95, budget: 72, growth: '+5%' },
    { name: 'HR & Admin', headcount: 12, performance: 89, budget: 90, growth: '+3%' },
  ];

  const strategicInitiatives = [
    { 
      initiative: 'Digital Transformation', 
      progress: 75, 
      status: 'On Track', 
      owner: 'CTO',
      deadline: 'Q1 2024',
      budget: '$2.5M'
    },
    { 
      initiative: 'Market Expansion', 
      progress: 60, 
      status: 'In Progress', 
      owner: 'VP Sales',
      deadline: 'Q2 2024',
      budget: '$1.8M'
    },
    { 
      initiative: 'Talent Acquisition', 
      progress: 85, 
      status: 'Ahead', 
      owner: 'HR Director',
      deadline: 'Ongoing',
      budget: '$800K'
    },
    { 
      initiative: 'Process Optimization', 
      progress: 45, 
      status: 'Behind', 
      owner: 'COO',
      deadline: 'Q1 2024',
      budget: '$1.2M'
    },
  ];

  const keyInsights = [
    { 
      title: 'Employee Retention Rate', 
      value: '94%', 
      insight: 'Above industry average by 12%',
      trend: 'positive'
    },
    { 
      title: 'Operational Efficiency', 
      value: '89%', 
      insight: 'Productivity increased 15% this quarter',
      trend: 'positive'
    },
    { 
      title: 'Customer Satisfaction', 
      value: '91%', 
      insight: 'Highest score in company history',
      trend: 'positive'
    },
    { 
      title: 'Innovation Index', 
      value: '78%', 
      insight: 'New projects contributing 24% of revenue',
      trend: 'positive'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Ahead': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Director's Executive Dashboard</h1>
        <p className="text-gray-300">Welcome {user?.name}! Strategic overview and company-wide insights at your fingertips.</p>
        {user?.tenant && (
          <p className="text-gray-400 text-sm mt-1">Organization: {user.tenant.name}</p>
        )}
      </div>

      {/* Executive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                    {metric.change} this quarter
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                  <Icon className={`text-${metric.color}-600`} size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Department Overview */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Department</th>
                <th className="text-center py-2 text-sm font-medium text-gray-600">Headcount</th>
                <th className="text-center py-2 text-sm font-medium text-gray-600">Performance</th>
                <th className="text-center py-2 text-sm font-medium text-gray-600">Budget Usage</th>
                <th className="text-center py-2 text-sm font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {departmentOverview.map((dept, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm font-medium text-gray-900">{dept.name}</td>
                  <td className="py-3 text-sm text-gray-600 text-center">{dept.headcount}</td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dept.performance >= 90 ? 'bg-green-100 text-green-800' : 
                      dept.performance >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {dept.performance}%
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-600 text-center">{dept.budget}%</td>
                  <td className="py-3 text-sm font-medium text-green-600 text-center">{dept.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategic Initiatives */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Initiatives</h3>
          <div className="space-y-4">
            {strategicInitiatives.map((initiative, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{initiative.initiative}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                    {initiative.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(initiative.progress)}`}
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <span>Owner: {initiative.owner}</span>
                  <span>Due: {initiative.deadline}</span>
                  <span>Budget: {initiative.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Business Insights */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Business Insights</h3>
          <div className="space-y-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <span className="text-2xl font-bold text-blue-600">{insight.value}</span>
                </div>
                <p className="text-sm text-gray-600">{insight.insight}</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-xs text-green-600">Positive trend</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Executive Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <BarChart3 className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Strategic Planning</h4>
            <p className="text-sm text-gray-600">Review and set company goals</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="text-green-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Leadership Review</h4>
            <p className="text-sm text-gray-600">Assess department performance</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Award className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Recognition Program</h4>
            <p className="text-sm text-gray-600">Acknowledge achievements</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Globe className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Market Analysis</h4>
            <p className="text-sm text-gray-600">Industry trends and insights</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default DirectorDashboard;