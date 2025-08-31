import { useAuth } from '@/hooks/useAuth';
import Card from '../../components/Card';
import { DollarSign, TrendingUp, CreditCard, FileText, Calculator, PieChart } from 'lucide-react';

const FinanceDashboard = () => {
  const { user } = useAuth();

  const financeStats = [
    { label: 'Monthly Payroll', value: '$284,650', change: '+3.2%', icon: DollarSign, color: 'green' },
    { label: 'Benefits Cost', value: '$45,230', change: '+1.8%', icon: CreditCard, color: 'blue' },
    { label: 'Tax Obligations', value: '$38,920', change: '-2.1%', icon: FileText, color: 'red' },
    { label: 'Budget Utilization', value: '78%', change: '+5%', icon: PieChart, color: 'purple' },
  ];

  const payrollSummary = [
    { department: 'Engineering', employees: 45, amount: '$125,400', percentage: 44 },
    { department: 'Sales & Marketing', employees: 28, amount: '$89,200', percentage: 31 },
    { department: 'Operations', employees: 18, amount: '$52,600', percentage: 18 },
    { department: 'HR & Admin', employees: 12, amount: '$17,450', percentage: 7 },
  ];

  const pendingFinanceTasks = [
    { task: 'Process monthly payroll', priority: 'high', due: 'Today', amount: '$284,650' },
    { task: 'Review expense reports', priority: 'medium', due: 'Tomorrow', amount: '$12,340' },
    { task: 'Prepare tax filings', priority: 'high', due: 'Dec 15', amount: '$38,920' },
    { task: 'Update budget allocations', priority: 'low', due: 'Next week', amount: null },
  ];

  const recentTransactions = [
    { type: 'Payroll', description: 'Monthly salary payment', amount: '-$284,650', date: '2 hours ago', status: 'Completed' },
    { type: 'Benefits', description: 'Health insurance premium', amount: '-$15,200', date: '1 day ago', status: 'Completed' },
    { type: 'Expense', description: 'Office supplies reimbursement', amount: '-$1,240', date: '2 days ago', status: 'Completed' },
    { type: 'Tax', description: 'Quarterly tax payment', amount: '-$12,500', date: '1 week ago', status: 'Completed' },
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
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Finance Dashboard</h1>
        <p className="text-emerald-100">Welcome {user?.name}! Manage payroll, expenses, and financial operations.</p>
        {user?.tenant && (
          <p className="text-emerald-200 text-sm mt-1">Organization: {user.tenant.name}</p>
        )}
      </div>

      {/* Finance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financeStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change} vs last month
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
        {/* Payroll Summary by Department */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll by Department</h3>
          <div className="space-y-4">
            {payrollSummary.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{dept.department}</p>
                    <p className="text-xs text-gray-600">{dept.employees} employees</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{dept.amount}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Finance Tasks */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {pendingFinanceTasks.map((task, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Due: {task.due}</span>
                  {task.amount && <span className="font-medium">{task.amount}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Financial Transactions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Description</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Date</th>
                <th className="text-center py-2 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">{transaction.type}</td>
                  <td className="py-3 text-sm text-gray-600">{transaction.description}</td>
                  <td className="py-3 text-sm font-medium text-right text-red-600">{transaction.amount}</td>
                  <td className="py-3 text-sm text-gray-500 text-right">{transaction.date}</td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Finance Actions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Calculator className="text-emerald-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Process Payroll</h4>
            <p className="text-sm text-gray-600">Calculate and distribute salaries</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <FileText className="text-blue-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Generate Reports</h4>
            <p className="text-sm text-gray-600">Financial statements and analytics</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <TrendingUp className="text-purple-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Budget Planning</h4>
            <p className="text-sm text-gray-600">Plan and track budgets</p>
          </button>
          <button className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <CreditCard className="text-orange-600 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Expense Management</h4>
            <p className="text-sm text-gray-600">Review and approve expenses</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default FinanceDashboard;