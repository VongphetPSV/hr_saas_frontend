import { useState } from 'react';
import { useHolidays } from '../../hooks/api/useHolidays';
import { useCreateHoliday } from '../../hooks/api/useCreateHoliday';
import { useDeleteHoliday } from '../../hooks/api/useDeleteHoliday';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const HolidayCalendar = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  const { data: holidays, isLoading } = useHolidays(selectedYear);
  const createHolidayMutation = useCreateHoliday();
  const deleteHolidayMutation = useDeleteHoliday();
  const { user } = useAuth();
  const isHRAdmin = ['hr', 'admin'].includes(user?.current_tenant_role?.toLowerCase());

  const handleCreateHoliday = async (data) => {
    try {
      await createHolidayMutation.mutateAsync(data);
      toast.success('Holiday created successfully');
    } catch (error) {
      toast.error('Failed to create holiday');
    }
  };

  const handleDeleteHoliday = async (holidayId) => {
    try {
      await deleteHolidayMutation.mutateAsync(holidayId);
      toast.success('Holiday deleted successfully');
    } catch (error) {
      toast.error('Failed to delete holiday');
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Year Selection and Create Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setSelectedYear(prev => prev - 1)}
          >
            Previous Year
          </Button>
          <span className="text-xl font-semibold">{selectedYear}</span>
          <Button
            variant="outline"
            onClick={() => setSelectedYear(prev => prev + 1)}
          >
            Next Year
          </Button>
        </div>

        {isHRAdmin && (
          <Button
            variant="primary"
            onClick={() => {/* Open create holiday modal */}}
          >
            Add Holiday
          </Button>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, index) => {
          const monthHolidays = holidays?.filter(
            h => new Date(h.date).getMonth() === index
          );

          return (
            <Card key={month}>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {month}
                </h3>
                <div className="space-y-3">
                  {monthHolidays?.map(holiday => (
                    <div
                      key={holiday.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {holiday.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(holiday.date).getDate()}{' '}
                          {month}
                        </p>
                      </div>
                      {isHRAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteHoliday(holiday.id)}
                        >
                          <svg
                            className="w-4 h-4 text-gray-500 hover:text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}
                  {(!monthHolidays || monthHolidays.length === 0) && (
                    <p className="text-sm text-gray-500 py-2">
                      No holidays
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HolidayCalendar;
