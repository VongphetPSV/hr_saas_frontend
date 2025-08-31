import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useWorkingDays = (params = {}) => {
  const { year, month } = params;

  return useQuery({
    queryKey: ['working-days', { year, month }],
    queryFn: async () => {
      const response = await api.get('/working-days', {
        params: {
          year,
          month
        }
      });
      return response.data;
    },
    // Cache working days for longer as they don't change often
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 24 * 60 * 60 * 1000 // 24 hours
  });
};

export default useWorkingDays;
