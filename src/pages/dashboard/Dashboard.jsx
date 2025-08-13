import { useDashboardOverview } from '../../hooks/api/useDashboardOverview';
import { useAnnouncements } from '../../hooks/api/useAnnouncements';
import { useLeaves } from '../../hooks/api/useLeaves';
import { useOTRequests } from '../../hooks/api/useOTRequests';
import Card from '../../components/Card';
import useAuth from '../../hooks/useAuth';

const StatCard = ({ title, value, icon, trend }) => (
  <Card>
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${icon.bg}`}>
          {icon.svg}
        </div>
      </div>
      {trend && (
        <div className="mt-4">
          <div className={`text-sm ${
            trend.type === 'increase' 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {trend.type === 'increase' ? '↑' : '↓'} {trend.value}%
            <span className="text-gray-500"> vs last month</span>
          </div>
        </div>
      )}
    </div>
  </Card>
);

const Dashboard = () => {
  const { data: overview, isLoading } = useDashboardOverview();
  const { data: announcements } = useAnnouncements();
  const { data: leaves } = useLeaves({ status: 'pending' });
  const { data: overtimeRequests } = useOTRequests({ status: 'pending' });
  const { user } = useAuth();
  const isHRAdmin = ['hr', 'admin'].includes(user?.current_tenant_role?.toLowerCase());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Staff"
          value={overview?.total_staff || 0}
          icon={{
            bg: 'bg-blue-100',
            svg: (
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          }}
          trend={{ type: 'increase', value: overview?.staff_growth }}
        />

        <StatCard
          title="Leave Requests"
          value={overview?.pending_leaves || 0}
          icon={{
            bg: 'bg-yellow-100',
            svg: (
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )
          }}
        />

        <StatCard
          title="Overtime Requests"
          value={overview?.pending_overtime || 0}
          icon={{
            bg: 'bg-green-100',
            svg: (
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          }}
        />

        <StatCard
          title="Announcements"
          value={overview?.unread_announcements || 0}
          icon={{
            bg: 'bg-purple-100',
            svg: (
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            )
          }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Announcements
            </h2>
            <div className="space-y-4">
              {announcements?.slice(0, 3).map(announcement => (
                <div key={announcement.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {announcement.content}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Pending Requests */}
        {isHRAdmin && (
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pending Requests
              </h2>
              <div className="space-y-4">
                {leaves?.slice(0, 3).map(leave => (
                  <div key={leave.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{leave.employee_name}</p>
                      <p className="text-sm text-gray-500">Leave Request</p>
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                ))}
                {overtimeRequests?.slice(0, 3).map(ot => (
                  <div key={ot.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{ot.employee_name}</p>
                      <p className="text-sm text-gray-500">Overtime Request</p>
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
